const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];

const livePreviewUrl = "https://jain-wisdom-mkjntkxfq-aagams-projects-b0e9e8b5.vercel.app";
const branchName = "elevation/home-202609031050";

async function send() {
  const text = `
🏛️ *JAIN WISDOM ELEVATION - LATEST UPDATE*

📍 *Target:* Home Page (\`/\`)
✨ *Your Feedback Applied & Verified Live:*
• 📍 *Positioning:* The 'Sounds Enabled' card is now placed **exactly below the navbar on the top-right corner of the screen** (\`top-16 right-4 sm:right-6 md:right-8\`), perfectly attached and responsive!
• 🗑️ *Iconography Box:* Completely removed!
• 🔊 *Audio:* Real crisp \`/sounds/resources/click2.mp3\` clicks.

🌐 *Direct Live Preview:*
${livePreviewUrl}

_Tap below to review the changes live on your phone:_
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
          [{ text: "🌐 Open Direct Live Preview", url: livePreviewUrl }],
          [{ text: "✅ Merge to Main", callback_data: `merge:${branchName}` }],
          [{ text: "🔁 Request More Changes", callback_data: `feedback:${branchName}` }]
        ]
      }
    })
  });

  const data = await res.json();
  console.log("Card sent:", data.ok);
}

send().catch(console.error);
