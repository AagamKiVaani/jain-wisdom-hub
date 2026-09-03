const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/)[1];

const homeCode = fs.readFileSync('app/[lang]/page.tsx', 'utf8');

async function testSynthesis() {
  const models = [
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash"
  ];

  const prompt = `
You are an expert Frontend Architect (Next.js 15+, Tailwind, Framer Motion) and Digambar Jain scholar.
TARGET PAGE: Home Page (app/[lang]/page.tsx)
DESIGN INSPIRATION: Sacred Embers & Stardust Field

EXISTING CODE:
\`\`\`tsx
${homeCode}
\`\`\`

OUTPUT FORMAT:
Return exactly two sections:

=== METADATA ===
{
  "summary": "Brief 2-sentence summary of upgrades.",
  "digambarProof": {
    "shastra": "Samayasāra",
    "author": "Acharya Kundkund",
    "reference": "Gatha 1",
    "explanation": "Strictly aligned with Digambar Jain canonical tradition."
  }
}

=== CODE ===
[Insert the complete TSX code here]
`;

  for (const m of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(`Testing model: ${m} (attempt ${attempt})...`);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 }
        })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        console.log(`🎉 SUCCESS with ${m}! Output length:`, data.candidates[0].content.parts[0].text.length);
        return;
      } else {
        console.log(`⚠️ ${m} error:`, data.error?.message?.slice(0, 100));
        if (data.error?.code === 503) {
          await new Promise(r => setTimeout(r, 3000));
        }
      }
    }
  }
}

testSynthesis().catch(console.error);
