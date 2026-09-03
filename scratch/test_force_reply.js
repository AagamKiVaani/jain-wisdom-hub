const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];

async function sendForceReply() {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "✍️ *Please reply to this message with all the corrections and mistakes you want fixed:*\n\n_(Your reply box is opened below. Type anything you want changed!)_",
      parse_mode: "Markdown",
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Type your corrections here..."
      }
    })
  });

  const data = await res.json();
  console.log("Force reply sent:", data.ok);
}

sendForceReply().catch(console.error);
