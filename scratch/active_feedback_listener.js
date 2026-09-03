const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];
const apiKey = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/)[1];

const branchName = "elevation/home-202609031050";
const targetFile = "app/[lang]/page.tsx";

console.log("Listening for feedback on Telegram for branch:", branchName);

let lastUpdateId = 0;
let awaitingFeedback = false;

async function queryGemini(prompt) {
  const models = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.6-flash"];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (e) {}
  }
  throw new Error("Gemini failed");
}

async function loop() {
  while (true) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=10`);
      const data = await res.json();

      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;

          // 0. Check for Shared Reel or Design Inspiration Link
          const rawMsg = update.message ? (update.message.text || update.message.caption || "") : "";
          const hasUrl = rawMsg.match(/(https?:\/\/[^\s]+)/i);
          const isReelOrIdea = hasUrl || rawMsg.toLowerCase().includes("reel") || rawMsg.toLowerCase().startsWith("idea:") || rawMsg.toLowerCase().startsWith("inspire:");

          if (update.message && isReelOrIdea && !awaitingFeedback) {
            console.log("Captured inspiration:", rawMsg);
            const queuePath = "data/inspirations_queue.json";
            let queue = [];
            try {
              if (fs.existsSync(queuePath)) queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
            } catch (e) {}

            queue.push({
              id: `insp_${Date.now()}`,
              url: hasUrl ? hasUrl[0] : "",
              text: rawMsg,
              timestamp: new Date().toISOString(),
              status: "pending"
            });
            fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf8");

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: `📥 *INSPIRATION CAPTURED!*\n\n🔗 *Reference:* ${hasUrl ? hasUrl[0] : "Design Idea"}\n💡 *Status:* Added to your Inspiration Drop Box.\n\n_In the next elevation run, Gemini will study this design technique and propose a custom feature for your website!_`,
                parse_mode: "Markdown"
              })
            });
            continue;
          }

          // 1. Text feedback
          if (awaitingFeedback && update.message && update.message.text) {
            const feedbackText = update.message.text;
            console.log("Received feedback:", feedbackText);

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: `⚙️ *Applying your feedback...*\n"${feedbackText}"\n\n_Revising code, running compiler tests, and updating preview..._`,
                parse_mode: "Markdown"
              })
            });

            // Make sure we're on the elevation branch
            execSync(`git checkout ${branchName}`, { stdio: "pipe" });
            const currentCode = fs.readFileSync(targetFile, "utf8");

            const prompt = `
You are an expert Next.js engineer and Digambar Jain scholar.
The user gave this feedback on the Home Page:
"""
${feedbackText}
"""

CRITICAL MANDATES:
1. AUDIO: MUST use real audio file '/sounds/resources/click2.mp3' with volume 0.65.
2. POSITIONING: Floating controls MUST be docked at "fixed bottom-6 right-6 z-50".
3. HIERARCHY: Navigation cards must remain prominent below hero title.
4. REVERENCE: Author of Tattvārtha Sūtra must be strictly written as Acharya Umāsvāmi.

CURRENT CODE:
\`\`\`tsx
${currentCode}
\`\`\`

Apply all requested corrections. Return ONLY the drop-in replacement TSX code.
`;

            const revised = await queryGemini(prompt);
            const cleaned = revised.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();

            fs.writeFileSync(targetFile, cleaned, "utf8");

            // Compile check
            try {
              execSync("node ./node_modules/typescript/bin/tsc --noEmit", { stdio: "pipe" });
              execSync("git add app/[lang]/page.tsx", { stdio: "pipe" });
              execSync(`git commit -m "Apply user feedback: ${feedbackText.slice(0, 40)}"`, { stdio: "pipe" });
              execSync(`git push origin ${branchName}`, { stdio: "pipe" });

              // Poll for Vercel
              await new Promise(r => setTimeout(r, 20000));
              const deps = await (await fetch("https://api.github.com/repos/AagamKiVaani/jain-wisdom-hub/deployments?per_page=1")).json();
              const statuses = await (await fetch(deps[0].statuses_url)).json();
              const previewUrl = statuses[0]?.environment_url || "https://jain-wisdom-kb3okj7ws-aagams-projects-b0e9e8b5.vercel.app";

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `✨ *CHANGES APPLIED & VERIFIED!*\n\n🌐 *Updated Live Preview:*\n${previewUrl}\n\n_Tap below to review or merge:_`,
                  parse_mode: "Markdown",
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "🌐 Open Direct Live Preview", url: previewUrl }],
                      [{ text: "✅ Merge to Main", callback_data: `merge:${branchName}` }],
                      [{ text: "🔁 Request More Changes", callback_data: `feedback:${branchName}` }]
                    ]
                  }
                })
              });
            } catch (err) {
              fs.writeFileSync(targetFile, currentCode, "utf8");
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚠️ Revision failed compiler check. Reverting to previous state.`
                })
              });
            }

            awaitingFeedback = false;
            continue;
          }

          // 2. Callback button
          if (update.callback_query && update.callback_query.data) {
            const cb = update.callback_query.data;

            await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ callback_query_id: update.callback_query.id })
            });

            if (cb.startsWith("feedback:")) {
              awaitingFeedback = true;
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: "✍️ *Please reply to this message with all the corrections and mistakes you want fixed:*\n\n_(Type anything you want changed, and I will revise the code and update the preview!)_",
                  parse_mode: "Markdown",
                  reply_markup: {
                    force_reply: true,
                    input_field_placeholder: "Type your corrections here..."
                  }
                })
              });
            } else if (cb.startsWith("merge:")) {
              execSync("git checkout main", { stdio: "pipe" });
              execSync(`git merge ${branchName}`, { stdio: "pipe" });
              execSync("git push origin main", { stdio: "pipe" });

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `🎉 *SUCCESS!* Branch \`${branchName}\` merged into *main* and is live in production!`
                })
              });
              process.exit(0);
            }
          }
        }
      }
    } catch (e) {
      console.error("Listener error:", e.message);
      await new Promise(r => setTimeout(r, 4000));
    }
  }
}

loop().catch(err => {
  console.error("Fatal loop error:", err);
});
