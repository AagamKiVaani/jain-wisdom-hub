const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];
const directUrl = "https://jain-wisdom-kb3okj7ws-aagams-projects-b0e9e8b5.vercel.app";
const branchName = "elevation/home-202609031050";

async function run() {
  const text = `
🏛️ *JAIN WISDOM REVIEW & FEEDBACK PORTAL*

📍 *Target:* Home Page (\`/\`)
🌿 *Branch:* \`${branchName}\`
🌐 *Live Preview:* ${directUrl}

👇 *Have any corrections, visual adjustments, or layout changes?*
Tap the button below or reply with your exact feedback, and the AI will immediately revise and update the live preview!
`.trim();

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐 Open Direct Live Preview", url: directUrl }],
          [
            { text: "🔁 Request Changes / Reply Feedback", callback_data: `feedback:${branchName}` }
          ],
          [
            { text: "✅ Merge to Main", callback_data: `merge:${branchName}` },
            { text: "❌ Discard", callback_data: `discard:${branchName}` }
          ]
        ]
      }
    })
  });
  const data = await res.json();
  console.log("Sent feedback card:", data.ok);
}

run().catch(console.error);
