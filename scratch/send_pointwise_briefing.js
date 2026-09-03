const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.match(/TELEGRAM_BOT_TOKEN=["']?([^"'\r\n]+)/)[1];
const chatId = env.match(/TELEGRAM_CHAT_ID=["']?([^"'\r\n]+)/)[1];

const branchName = "elevation/home-202609030845";
const directVercelPreview = "https://jain-wisdom-eyb7ptqke-aagams-projects-b0e9e8b5.vercel.app";
const githubCompareUrl = `https://github.com/AagamKiVaani/jain-wisdom-hub/compare/main...${branchName}`;

const messageText = `
🏛️ *JAIN WISDOM ELEVATION REPORT*

📍 *Target:* Home Page (\`/\`)
✨ *Inspiration:* Apple-grade Haptic & Audio Feedback + Celestial Stardust
🔬 *QA Status:* Passed compiler & Next.js 16 build (Code 0)

📜 *DIGAMBAR AAGAM VERIFICATION:*
• *Shastra:* Samayasāra, Tattvārtha Sūtra, Āptamīmānsā, Pravachanasāra
• *Author:* Acharya Kundakunda, Acharya Umasvati, Acharya Samantabhadra
• *Reference:* Samayasāra Gāthā 38, Tattvārtha Sūtra 1.1, Āptamīmānsā 4
• *Doctrinal Proof:* Affirms pure Digambar tenets: soul's innate purity (Samayasāra 38), the threefold path of liberation (Tattvārtha 1.1), Kevali omniscient freedom from morsel food (Kavalahāra, Āptamīmānsā 4), and Digambar ascetic renunciation.

✨ *DETAILED POINTWISE ELEVATION BREAKDOWN:*
• 🔊 *Tactile & Audio Feedback:* Added Web Audio API micro-haptics and mechanical audio clicks on hover/click with a floating toggle control.
• 🃏 *3D Spatial Depth:* Replaced flat navigation tiles with dynamic multi-plane 3D cards that tilt towards the user's mouse/touch with spring physics.
• 🌌 *Celestial Atmosphere:* Embedded a lightweight HTML5 2D canvas with upward-drifting golden temple embers and pulsing stardust.
• 📜 *Archival Parchment Glass:* Integrated a noise-overlay filter giving the cards an ancient manuscript glass aesthetic.
• 🏛️ *Digambar Aagam Sanctuary:* Added a dedicated canonical section presenting authoritative Digambar scriptural proofs and citations.
• 📱 *Responsive Mobile Polish:* Formatted full-width spring cards and optimized touch targets for zero-jank mobile scrolling.

🌿 *Git Branch:* \`${branchName}\`
🌐 *Direct Live Preview:*
${directVercelPreview}

🔍 *Code Diff on GitHub:*
${githubCompareUrl}

---
_Tap below to review live or command your agent:_
`.trim();

const inlineKeyboard = {
  inline_keyboard: [
    [
      { text: "🌐 Open Direct Live Preview", url: directVercelPreview },
      { text: "🔍 Review Diff on GitHub", url: githubCompareUrl }
    ],
    [
      { text: "✅ Merge to Main", callback_data: `merge:${branchName}` },
      { text: "❌ Discard", callback_data: `discard:${branchName}` }
    ],
    [
      { text: "🔁 Request Changes (Reply in chat)", callback_data: `feedback:${branchName}` }
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
  if (d.ok) console.log("✅ Detailed briefing with direct preview link delivered to Telegram!");
  else console.error("Error:", d);
}).catch(console.error);
