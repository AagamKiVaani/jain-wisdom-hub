const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];
const directUrl = "https://jain-wisdom-kb3okj7ws-aagams-projects-b0e9e8b5.vercel.app";
const branchName = "elevation/home-202609031050";

async function run() {
  const text = `
🏛️ *JAIN WISDOM ELEVATION UPDATE*

📍 *Target:* Home Page (\`/\`)
✨ *Tested & Verified Rectifications:*
• 🔊 *Audio Clicks:* Restored real audio click \`/sounds/resources/click2.mp3\` (crisp, loud, tactile micro-vibration)
• 📍 *Positioning:* Floating sound toggle docked at bottom-right (zero collision with navbar or language switch)
• 🃏 *Hierarchy:* Navigation cards positioned directly under title/subtitle
• 📜 *Canonical Shastra:* Positioned gracefully below the cards, strictly citing Acharya Umāsvāmi

🌐 *Direct Live Preview (Fixed):*
${directUrl}
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
          [{ text: "✅ Merge to Main", callback_data: `merge:${branchName}` }]
        ]
      }
    })
  });
  const data = await res.json();
  console.log("Sent update:", data.ok);
}

run().catch(console.error);
