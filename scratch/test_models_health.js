const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/)[1];

const testModels = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-pro-latest"
];

async function check() {
  for (const m of testModels) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "ping" }] }] })
      });
      const data = await res.json();
      if (data.candidates) {
        console.log(`✅ ${m}: SUCCESS (Status: ${res.status})`);
      } else {
        console.log(`❌ ${m}: FAILED (Status: ${res.status}) - ${data.error?.message?.slice(0, 100)}`);
      }
    } catch (e) {
      console.log(`❌ ${m}: Network error: ${e.message}`);
    }
  }
}

check().catch(console.error);
