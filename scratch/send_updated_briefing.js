const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];

const branchName = "elevation/home-202609030845";
const githubCompareUrl = `https://github.com/AagamKiVaani/jain-wisdom-hub/compare/main...${branchName}`;
const vercelDeploymentsUrl = `https://vercel.com/aagamkivaanis-projects/jain-wisdom-hub`;

const messageText = `
🏛️ *JAIN WISDOM ELEVATION UPDATE*

Branch: \`${branchName}\`
Status: Fixed Next.js 16 PageProps & build verified (exit code 0)

🔗 *DIRECT LINKS TO TEST:*
🌐 *Live Vercel Preview & Deployments:*
${vercelDeploymentsUrl}

🔍 *Review Code Diff on GitHub:*
${githubCompareUrl}

---
_Tap below to command your autonomous agent:_
`.trim();

const inlineKeyboard = {
  inline_keyboard: [
    [
      { text: "🌐 Open Vercel Deployments", url: vercelDeploymentsUrl },
      { text: "🔍 Review Diff on GitHub", url: githubCompareUrl }
    ],
    [
      { text: "✅ Merge to Main", callback_data: `merge:${branchName}` },
      { text: "❌ Discard", callback_data: `discard:${branchName}` }
    ]
  ]
};

fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: messageText,
    parse_mode: "Markdown",
    reply_markup: inlineKeyboard
  })
}).then(r => r.json()).then(d => {
  if (d.ok) console.log("✅ Updated briefing with verified direct links delivered to Telegram!");
  else console.error("Error:", d);
}).catch(console.error);
