const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/);
if (!keyMatch) {
  console.error("No GEMINI_API_KEY found in .env.local");
  process.exit(1);
}
const key = keyMatch[1];

async function checkGemini() {
  console.log("Testing Gemini API Key...");
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  if (data.models) {
    console.log("✅ Gemini API Handshake SUCCESSFUL!");
    console.log("Available Models:", data.models.slice(0, 4).map(m => m.name));
  } else {
    console.log("❌ Error response from Gemini:", data);
  }
}

async function checkTelegram() {
  const tokenMatch = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/);
  const chatMatch = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/);
  if (!tokenMatch || !chatMatch) {
    console.error("No Telegram tokens found");
    return;
  }
  const token = tokenMatch[1];
  const chatId = chatMatch[1];
  console.log("Testing Telegram Bot...");
  const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const data = await res.json();
  if (data.ok) {
    console.log(`✅ Telegram Bot Verified: @${data.result.username} (${data.result.first_name})`);
  } else {
    console.log("❌ Telegram Bot Error:", data);
  }
}

async function main() {
  await checkGemini();
  await checkTelegram();
}

main().catch(console.error);
