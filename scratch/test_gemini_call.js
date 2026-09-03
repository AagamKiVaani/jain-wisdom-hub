const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/)[1];

async function testGemini() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`;
  const body = {
    contents: [
      {
        parts: [
          { text: "Respond with a JSON object: {\"status\": \"ready\", \"message\": \"Jai Jinendra! Gemini 3.6 Flash is operational.\"}" }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (data.candidates && data.candidates[0].content.parts[0].text) {
    console.log("✅ Response from Gemini 3.6 Flash:\n", data.candidates[0].content.parts[0].text);
  } else {
    console.error("❌ Error response:", JSON.stringify(data, null, 2));
  }
}

testGemini().catch(console.error);
