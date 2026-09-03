import fs from "fs";
import path from "path";

function loadEnv(workspaceRoot: string) {
  const envPath = path.join(workspaceRoot, ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([\w_]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2];
      }
    }
  }
}

async function sendTestBriefing() {
  loadEnv(process.cwd());
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing Telegram tokens");
    return;
  }

  const messageText = `
🕊️ *JAIN WISDOM HUB - AUTONOMOUS AGENT ACTIVE*

Jai Jinendra! Your Autonomous Digambar Elevation Agent is now fully configured and connected.

⚙️ *System Health:*
• 🧠 *AI Intelligence:* Gemini 3.6 Flash (Active via Google AI Studio)
• 📜 *Doctrinal Shield:* Digambar Jain Aagams Only (Kundkund Acharya, Tattvartha Sutra, Mahapurana)
• 🔬 *QA Engine:* Multi-pass compiler check & auto-healing
• ⏱️ *Cadence:* Every 5–6 hours

Tap below to test your command capabilities:
`.trim();

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Test Approval Button", callback_data: "test_approve" },
        { text: "ℹ️ View Agent Status", callback_data: "test_status" }
      ]
    ]
  };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
      parse_mode: "Markdown",
      reply_markup: inlineKeyboard
    })
  });

  const data = await res.json();
  if (data.ok) {
    console.log("🎉 Test briefing successfully delivered to Telegram!");
  } else {
    console.error("Failed to send:", data);
  }
}

sendTestBriefing().catch(console.error);
