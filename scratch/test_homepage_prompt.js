const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/)[1];

const homeCode = fs.readFileSync('app/[lang]/page.tsx', 'utf8');
console.log("Home page character length:", homeCode.length);

async function testPrompt() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Evaluate this code and return 1 sentence:\n" + homeCode }] }]
    })
  });
  const data = await res.json();
  if (data.candidates) {
    console.log("✅ Prompt succeeded with gemini-3.6-flash! Response:\n", data.candidates[0].content.parts[0].text.slice(0, 100));
  } else {
    console.error("❌ Error response:", JSON.stringify(data, null, 2));
  }
}

testPrompt().catch(console.error);
