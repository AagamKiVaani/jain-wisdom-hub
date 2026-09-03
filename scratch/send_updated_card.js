const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];

// The exact Vercel preview deployment for your requested changes
const directPreviewUrl = "https://jain-wisdom-qhc03tqxb-aagams-projects-b0e9e8b5.vercel.app";
const branchName = "elevation/home-202609031050";

async function send() {
  const text = `
🏛️ *JAIN WISDOM ELEVATION UPDATE*

📍 *Target:* Home Page (\`/\`)
🌿 *Branch:* \`${branchName}\`

✨ *Your 2 Feedback Requests Applied & Verified:*
1. 🗑️ *Digambar Iconography Box:* Completely removed from the page!
2. 🔊 *Sound Card Positioning:* Docked right below the Navbar on the right side, with fully responsive mobile & desktop padding!
3. 🔊 *Audio Feedback:* Real \`/sounds/resources/click2.mp3\` clicks and tactile haptics!

🌐 *Direct Live Preview (Working & Active):*
${directPreviewUrl}

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
          [{ text: "🌐 Open Direct Live Preview", url: directPreviewUrl }],
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
