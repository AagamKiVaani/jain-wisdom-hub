const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];

const features = [
  { id: 1, name: "3D Spatial Tilt Navigation Cards", selected: true, note: "" },
  { id: 2, name: "Mechanical Audio Clicks & Sound Toggle", selected: true, note: "" },
  { id: 3, name: "Celestial Golden Stardust Canvas", selected: false, note: "" },
  { id: 4, name: "Archival Manuscript Noise Texture", selected: false, note: "" }
];

function buildKeyboard() {
  const rows = [];
  features.forEach((f, idx) => {
    rows.push([
      {
        text: `${f.selected ? "✅" : "⬜"} ${f.id}. ${f.name}`,
        callback_data: `prop_toggle:${idx}`
      },
      {
        text: f.note ? `📝 Note: "${f.note.slice(0, 10)}..."` : `💬 Note #${f.id}`,
        callback_data: `prop_note:${idx}`
      }
    ]);
  });

  rows.push([
    { text: "🚀 Build Selected Features", callback_data: "prop_build" },
    { text: "❌ Skip This Cycle", callback_data: "prop_skip" }
  ]);

  return { inline_keyboard: rows };
}

async function sendProposal() {
  const messageText = `
🏛️ *JAIN WISDOM DESIGN PROPOSAL*

📍 *Target Page:* Home Page (\`/\`)
📁 *Source File:* \`app/[lang]/page.tsx\`
🌟 *Research Inspiration:* Apple VisionOS Spatial Physics & Tactile Haptics

_Tap any item to toggle (✅ / ⬜) or tap 💬 to add custom instructions:_
`.trim();

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
      parse_mode: "Markdown",
      reply_markup: buildKeyboard()
    })
  });

  const data = await res.json();
  if (data.ok) {
    console.log("🎉 Interactive proposal checklist sent to Telegram! Message ID:", data.result.message_id);
    return data.result.message_id;
  } else {
    console.error("Failed to send proposal:", data);
  }
}

sendProposal().catch(console.error);
