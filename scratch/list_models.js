const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/)[1];

async function listModels() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  if (data.models) {
    const generateModels = data.models
      .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
      .map(m => m.name);
    console.log("All supported generateContent models:\n", generateModels.join('\n'));
  } else {
    console.error("Error:", data);
  }
}

listModels().catch(console.error);
