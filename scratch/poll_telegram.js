const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];

async function check() {
  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  const data = await res.json();
  console.log("Updates:", data.result ? data.result.length : 0);
  if (data.result && data.result.length > 0) {
    for (const u of data.result.slice(-5)) {
      console.log(JSON.stringify(u, null, 2));
    }
  }
}

check().catch(console.error);
