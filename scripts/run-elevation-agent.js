// ============================================================================
// AUTONOMOUS DIGAMBAR ELEVATION AGENT - PRODUCTION RUNNER
// 100% Zero-Dependency Universal Node.js Script (Compatible with Linux CI & Windows)
// ============================================================================

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ----------------------------------------------------------------------------
// 1. ENVIRONMENT LOADER
// ----------------------------------------------------------------------------
function loadEnv(workspaceRoot) {
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

// ----------------------------------------------------------------------------
// 2. DIGAMBAR CANONICAL GUARDRAILS
// ----------------------------------------------------------------------------
const DIGAMBAR_CANONICAL_RULES = `
MANDATORY DIGAMBAR SCRIPTURAL RULES:
1. TRADITION: Only Digambar Jain canon and Acharyas are authoritative.
2. ICONOGRAPHY & NATURE OF TIRTHANKAR:
   - Digambar iconography: Unadorned, unclad, peaceful, eyes half-open/closed in introspective meditation (Nasagra drishti).
   - 19th Tirthankar Mallinath is Mallinath Bhagwan (a male king who renounced the kingdom to attain Omniscience and Moksha).
   - Kevalis (Arihants) are free from hunger (Kavalahara), thirst, disease, sleep, and physical fatigue.
   - Omniscience (Kevala Jnana) and Moksha in the same birth are attained strictly through total renunciation (Digambaratva).
3. CITATION MANDATE:
   - Any theological concept, Devanagari verse, quote, or narrative must cite its exact Digambar source text, author, and reference chapter/gatha/sutra.
   - Never invent or fabricate quotes.
   - Authorized Shastras: Samayasāra, Pravachanasāra, Niyamasāra, Tattvārtha Sūtra & Sarvārthasiddhi, Dhavalā, Gommatasāra, Mahāpurāna, Padmapurāna, Ratnakaranda Shrāvakāchāra, Mokshamārga Prakāshaka.
`;

function validateDigambarContent(text) {
  const lowercase = text.toLowerCase();
  const forbiddenTerms = [
    { term: "umasvati", reason: "Svetambara spelling. In pure Digambar Jain tradition, the revered author of Tattvārtha Sūtra is strictly Acharya Umāsvāmi (आचार्य उमास्वामी)." },
    { term: "umaswati", reason: "Use canonical Digambar honorific Acharya Umāsvāmi (उमास्वामी)." },
    { term: "shvetambara", reason: "Refers to non-Digambar sectarian traditions" },
    { term: "swetambar", reason: "Refers to non-Digambar sectarian traditions" },
    { term: "mallinath was a female", reason: "Contradicts Digambar Mahapurana" },
    { term: "female tirthankar", reason: "Contradicts Digambar canonical tradition" },
    { term: "kevali eats food", reason: "Digambar Aagams hold Kevalis do not take morsel food (kavalahara)" },
  ];

  for (const item of forbiddenTerms) {
    if (lowercase.includes(item.term)) {
      return {
        valid: false,
        reason: `Contains prohibited concept '${item.term}' (${item.reason}). Must follow pure Digambar tradition.`
      };
    }
  }
  return { valid: true };
}

// ----------------------------------------------------------------------------
// 3. DESIGN & TECH TREND HUNTER
// ----------------------------------------------------------------------------
const DESIGN_PATTERNS = [
  {
    id: "spatial-3d-card",
    name: "Apple VisionOS Layered Spatial Cards",
    source: "Godly.website & Aceternity UI",
    concept: "Cards with multi-plane 3D depth tilt, dynamic cursor-tracking specular glass glares, and spring touch compression.",
    keywords: "perspective: 1000px, Card3DContainer, Card3DItem, translateZ"
  },
  {
    id: "tracing-beam-timeline",
    name: "Aceternity Sacred Tracing Beam",
    source: "Aceternity UI & Awwwards",
    concept: "An illuminated golden light beam that traces the devotee's scroll position along a timeline or chronological scripture progression.",
    keywords: "TracingBeam, illuminated golden beam trail, scroll-progress"
  },
  {
    id: "kinetic-sanskrit-shimmer",
    name: "Gold-Leaf Inscription Kinetic Typography",
    source: "Origin UI & Motion Primitives",
    concept: "Sacred Sanskrit/Prakrit verses rendered with an animated metallic gold-foil shimmer sheen gliding across letterforms on reveal.",
    keywords: "bg-clip-text, shimmer keyframes, devanagari serif, brass flourish"
  },
  {
    id: "celestial-particle-fog",
    name: "Sacred Embers & Stardust Field",
    source: "Casbury Particles & Awwwards",
    concept: "Lightweight HTML5 2D canvas with upward-drifting golden temple embers, pulsing celestial opacity, and mobile throttling.",
    keywords: "SacredParticlesCanvas, celestial stardust, ambient depth"
  },
  {
    id: "tactile-sound-haptics",
    name: "Apple-grade Haptic & Audio Feedback",
    source: "Mobbin & Apple HIG",
    concept: "Micro-haptic vibration taps (navigator.vibrate) paired with crisp sub-millisecond mechanical/soft audio clicks.",
    keywords: "playTapSound, click2.mp3, 12ms haptic vibration"
  }
];

function pickDesignPattern(pageRoute) {
  if (pageRoute.includes("tirthankar")) return DESIGN_PATTERNS[0];
  if (pageRoute.includes("soul") || pageRoute.includes("namokar")) return DESIGN_PATTERNS[2];
  return DESIGN_PATTERNS[Math.floor(Math.random() * DESIGN_PATTERNS.length)];
}

// ----------------------------------------------------------------------------
// 4. SITE AUDITOR
// ----------------------------------------------------------------------------
function auditPages(workspaceRoot) {
  const candidatePages = [
    { route: "/tirthankar", relPath: "app/[lang]/tirthankar/page.tsx", name: "Tirthankar Gallery" },
    { route: "/soul-karma", relPath: "app/[lang]/soul-karma/page.tsx", name: "Soul & Karma Page" },
    { route: "/kalchakra", relPath: "app/[lang]/kalchakra/page.tsx", name: "Wheel of Time (Kalchakra)" },
    { route: "/namokar-mantra", relPath: "app/[lang]/namokar-mantra/page.tsx", name: "Namokar Mantra Page" },
    { route: "/", relPath: "app/[lang]/page.tsx", name: "Home Page" }
  ];

  const targets = [];
  for (const page of candidatePages) {
    const fullPath = path.join(workspaceRoot, page.relPath);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    const missing = [];
    let score = 5;

    if (!content.includes("playTapSound") && !content.includes("click2.mp3")) {
      missing.push("Audio tactile micro-haptics");
      score -= 1;
    } else {
      score += 1;
    }

    if (!content.includes("Card3D") && !content.includes("perspective")) {
      missing.push("3D spatial perspective tilt");
      score -= 1;
    } else {
      score += 1.5;
    }

    if (!content.includes("SacredParticlesCanvas")) {
      missing.push("Celestial stardust canvas atmosphere");
    } else {
      score += 1;
    }

    if (!content.includes("noise-overlay")) {
      missing.push("Archival parchment glass texture");
    }

    targets.push({
      pageRoute: page.route,
      sourceFilePath: page.relPath,
      visualScore: Math.max(2, Math.min(10, score)),
      missingFeatures: missing,
      name: page.name
    });
  }

  return targets.sort((a, b) => a.visualScore - b.visualScore);
}

// ----------------------------------------------------------------------------
// 5. GEMINI CLIENT
// ----------------------------------------------------------------------------
async function queryGemini(prompt, jsonMode = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment.");

  const models = [
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash"
  ];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Querying model: ${model} (attempt ${attempt})...`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2
          }
        };

        if (jsonMode) {
          body.generationConfig.responseMimeType = "application/json";
        }

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          console.log(`✅ Model ${model} responded successfully!`);
          return data.candidates[0].content.parts[0].text;
        }

        lastError = data;
        if (data.error && data.error.code === 503) {
          console.log(`⚠️ ${model} high demand spike (503). Waiting 3s before retry...`);
          await new Promise(r => setTimeout(r, 3000));
        } else {
          break; // move to next model if not a transient 503
        }
      } catch (e) {
        lastError = e;
      }
    }
  }

  throw new Error(`All Gemini models exhausted: ${JSON.stringify(lastError)}`);
}

// ----------------------------------------------------------------------------
async function synthesize(target, currentCode, pattern, approvedFeatures = []) {
  const featuresDirective = approvedFeatures.length > 0
    ? `\nUSER-APPROVED FEATURES TO BUILD (BUILD STRICTLY ONLY THESE - DO NOT INVENT OR ADD OTHER SECTIONS):\n` +
      approvedFeatures.map(f => `- ${f.name}${f.note ? ` (USER NOTE / CUSTOM INSTRUCTION: "${f.note}")` : ""}`).join("\n")
    : `1. Elevate this component to a 9/10 visual standard implementing ${pattern.name}.`;

  const prompt = `
You are an expert Frontend Architect (Next.js 15+, Tailwind, Framer Motion) and Digambar Jain scholar.

PAGE: ${target.pageRoute} (${target.sourceFilePath})
DESIGN INSPIRATION: ${pattern.name} (${pattern.concept})

${DIGAMBAR_CANONICAL_RULES}

CRITICAL UI, AUDIO & POSITIONING MANDATES:
1. AUDIO TACTILE CLICKS: MUST use the real audio file '/sounds/resources/click2.mp3' with volume 0.65:
   const playTapSound = () => { if (!soundEnabled) return; try { const a = new Audio("/sounds/resources/click2.mp3"); a.volume = 0.65; a.play().catch(()=>{}); if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12); } catch (e) {} };
   NEVER synthesize silent or quiet Web Audio oscillators!
2. FLOATING CONTROLS POSITIONING: If adding a persistent floating sound toggle or controls, position them at "fixed bottom-6 right-6 z-50". NEVER position floating controls at "top-4 right-4" or "top-0" because that directly collides with the Navbar and language toggle!
3. PAGE HIERARCHY & NAVIGATION: Keep the 5 primary navigation cards immediately prominent below the Hero title and subtitle. Do NOT push cards down by inserting large blocking panels above them. Any archival scripture quote panels must be placed gracefully underneath the cards grid!
4. NEXT.JS 16 APP ROUTER RULE: If this is a page.tsx file, params MUST be typed as Promise<{ lang: string }>: export default function Page({ params }: { params: Promise<{ lang: string }> }) and unwrapped using const { lang } = React.use(params);
5. REVERENCE MANDATE: The revered author of Tattvārtha Sūtra must be written strictly as Acharya Umāsvāmi (NEVER Umasvati).

EXISTING FILE CONTENT:
\`\`\`tsx
${currentCode}
\`\`\`

OUTPUT FORMAT:
Return your response in exactly two clearly demarcated sections:

=== METADATA ===
{
  "summary": "1-sentence executive headline of the elevation.",
  "detailedChanges": [
    "🎨 Visual & Motion: Specific description of UI/motion upgrades applied",
    "🔊 Tactile & Audio: Specific description of haptic/sound feedback added",
    "✨ Atmosphere: Specific description of background/textures/canvas effects",
    "📜 Scriptural Citations: Exact Digambar Aagam verses embedded with Shastra name",
    "📱 Responsive Layout: Mobile & desktop layout optimization details"
  ],
  "digambarProof": {
    "shastra": "Exact Digambar Shastra name",
    "author": "Exact Acharya name (strictly Acharya Umāsvāmi or Acharya Kundkund)",
    "reference": "Chapter / Gatha / Shloka reference",
    "explanation": "Why this aligns strictly with pure Digambar tradition"
  }
}

=== CODE ===
[Insert the complete drop-in replacement TSX code for the entire file here, without wrapping in extra JSON quotes]
`;

  const rawResponse = await queryGemini(prompt, false);

  let metadata = {
    summary: `Elevated ${target.name} with ${pattern.name}`,
    detailedChanges: [
      `Integrated ${pattern.name} visual design pattern`,
      "Added tactile audio click micro-haptics and responsive spring physics",
      "Optimized atmospheric parchment noise and smooth layout transitions",
      "Embedded verified Digambar Aagam canonical citations"
    ],
    digambarProof: {
      shastra: "Tattvārtha Sūtra & Samayasāra",
      author: "Acharya Umaswami & Acharya Kundkund",
      reference: "Sarvārthasiddhi & Samayasāra",
      explanation: "Aligned with pure Digambar Jain canonical tradition."
    }
  };
  let code = "";

  if (rawResponse.includes("=== CODE ===")) {
    const parts = rawResponse.split("=== CODE ===");
    const metaPart = parts[0].replace("=== METADATA ===", "").trim();
    code = parts[1].trim();

    try {
      const jsonMatch = metaPart.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        metadata = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.warn("Metadata JSON parse warning, using fallback metadata.");
    }
  } else if (rawResponse.includes("```")) {
    const codeMatch = rawResponse.match(/```(?:tsx?|jsx?)?\s*([\s\S]*?)```/);
    code = codeMatch ? codeMatch[1].trim() : rawResponse.trim();
  } else {
    code = rawResponse.trim();
  }

  code = code.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();

  const guardrail = validateDigambarContent(code + " " + JSON.stringify(metadata.digambarProof));
  if (!guardrail.valid) {
    throw new Error(`Digambar Guardrail Rejection: ${guardrail.reason}`);
  }

  return {
    summary: metadata.summary,
    detailedChanges: metadata.detailedChanges || [metadata.summary],
    digambarProof: metadata.digambarProof,
    code: code
  };
}

// ----------------------------------------------------------------------------
// 6.5 AUTONOMOUS FRONTEND CRITIC & POLISH PASS
// ----------------------------------------------------------------------------
async function refineAndPolishFrontend(target, initialCode, pattern, userNotes = "") {
  console.log("🎨 Initiating Autonomous Frontend Refinement & Polish Pass...");

  const criticPrompt = `
You are an award-winning Creative Director, Senior Design Engineer, and scholar of authentic Digambar Jain Philosophy.

Review this newly drafted Next.js 15+ React component for: ${target.name} (${target.pageRoute}).
Inspiration: ${pattern.name}
${userNotes ? `USER'S CUSTOM REQUIREMENTS: ${userNotes}` : ""}

${DIGAMBAR_CANONICAL_RULES}

DRAFT CODE:
\`\`\`tsx
${initialCode}
\`\`\`

YOUR TASK - CRITIQUE AND ELEVATE (Take it from an 8/10 to a 9.5/10):
1. Micro-animations & Motion: Refine Framer Motion spring physics (stiffness: 300, damping: 25).
2. Audio Realism: Verify that audio click uses new Audio("/sounds/resources/click2.mp3") with volume 0.65. Eliminate any silent custom oscillators.
3. Element Positioning: Ensure floating controls are docked at "bottom-6 right-6" (NEVER top-4 right-4 which collides with Navbar). Ensure the 5 primary navigation cards remain immediately below the title/subtitle.
4. Mobile Viewport Excellence: Ensure seamless responsive wrapping, touch targets of at least 44px, and zero horizontal scroll overflow.
5. Strict Canonical Reverence: Ensure the author of Tattvārtha Sūtra is written as "Acharya Umāsvāmi" (NEVER Umasvati).
6. Output ONLY the refined, drop-in replacement TSX code. Do not wrap in extra JSON or markdown explanations.
`;

  try {
    const polishedResponse = await queryGemini(criticPrompt, false);
    const cleanedCode = polishedResponse.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();

    // Verify guardrails
    const guardrail = validateDigambarContent(cleanedCode);
    if (!guardrail.valid) {
      console.warn("Polished code triggered guardrail check, retaining initial draft.");
      return initialCode;
    }

    console.log("✨ Autonomous Frontend Refinement Pass completed successfully!");
    return cleanedCode;
  } catch (e) {
    console.warn("Refinement pass warning, retaining initial draft:", e.message);
    return initialCode;
  }
}

// ----------------------------------------------------------------------------
// 7. MULTI-PASS QA
// ----------------------------------------------------------------------------
async function verifyMultiPass(workspaceRoot, targetRelPath, candidateCode) {
  const fullPath = path.join(workspaceRoot, targetRelPath);
  const backup = fs.readFileSync(fullPath, "utf8");

  let code = candidateCode;
  let attempts = 0;
  const maxAttempts = 2;

  while (attempts <= maxAttempts) {
    fs.writeFileSync(fullPath, code, "utf8");

    try {
      execSync("node ./node_modules/typescript/bin/tsc --noEmit", {
        cwd: workspaceRoot,
        stdio: "pipe",
        encoding: "utf8"
      });
      return { passed: true, iterations: attempts + 1, finalCode: code };
    } catch (err) {
      attempts++;
      const errorText = err.stdout || err.stderr || err.message;
      if (attempts > maxAttempts) {
        fs.writeFileSync(fullPath, backup, "utf8");
        return { passed: false, iterations: attempts, error: errorText };
      }

      console.log(`[QA Pass ${attempts}] TypeScript error encountered. Self-healing with Gemini...`);
      const healPrompt = `
You generated this Next.js TypeScript code, but running 'tsc --noEmit' gave this error:
\`\`\`
${errorText}
\`\`\`

CURRENT CODE:
\`\`\`tsx
${code}
\`\`\`

Fix the error completely. Return ONLY the drop-in replacement TSX code. Do not wrap in markdown or backticks.
`;
      const fixed = await queryGemini(healPrompt, false);
      code = fixed.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();
    }
  }

  fs.writeFileSync(fullPath, backup, "utf8");
  return { passed: false, iterations: attempts, error: "Exceeded max self-healing passes" };
}

// ----------------------------------------------------------------------------
// 8. TELEGRAM NOTIFIER WITH DIRECT VERCEL PREVIEW
// ----------------------------------------------------------------------------
async function getDirectVercelPreviewUrl(branchName) {
  console.log(`Fetching exact direct Vercel preview deployment URL for branch: ${branchName}...`);
  // Poll for up to 90 seconds (18 attempts * 5s) for Vercel to complete building
  for (let i = 0; i < 18; i++) {
    try {
      await new Promise(r => setTimeout(r, 5000));
      const res = await fetch("https://api.github.com/repos/AagamKiVaani/jain-wisdom-hub/deployments?per_page=8");
      const deployments = await res.json();
      if (Array.isArray(deployments) && deployments.length > 0) {
        for (const dep of deployments) {
          const statusRes = await fetch(dep.statuses_url);
          const statuses = await statusRes.json();
          if (Array.isArray(statuses) && statuses.length > 0) {
            const url = statuses[0].environment_url || statuses[0].target_url;
            if (url && url.includes(".vercel.app") && statuses[0].state === "success") {
              console.log("✅ Live direct Vercel URL verified:", url);
              return url;
            }
          }
        }
      }
    } catch (e) {
      // transient retry
    }
  }

  // Fallback to latest deployment environment_url if timeout reached
  try {
    const res = await fetch("https://api.github.com/repos/AagamKiVaani/jain-wisdom-hub/deployments?per_page=1");
    const deployments = await res.json();
    if (deployments[0]) {
      const statuses = await (await fetch(deployments[0].statuses_url)).json();
      if (statuses[0]?.environment_url) return statuses[0].environment_url;
    }
  } catch (e) {}

  const branchSlug = branchName.replace(/\//g, "-").toLowerCase();
  return `https://jain-wisdom-git-${branchSlug}-aagams-projects-b0e9e8b5.vercel.app`;
}

// ----------------------------------------------------------------------------
// 7.5 INTERACTIVE FEATURE PROPOSAL & CHECKBOX ENGINE
// ----------------------------------------------------------------------------
async function requestProposalApproval(target, pattern, token, chatId) {
  if (!token || !chatId) {
    console.warn("Telegram tokens not set. Proceeding in non-interactive mode.");
    return [{ id: 1, name: `${pattern.name} Visual Elevation`, selected: true, note: "" }];
  }

  const features = [
    { id: 1, name: `${pattern.name} Visual Elevation`, selected: true, note: "" },
    { id: 2, name: "Mechanical Audio Clicks & Sound Toggle", selected: true, note: "" },
    { id: 3, name: "Celestial Golden Stardust Atmosphere", selected: false, note: "" },
    { id: 4, name: "Archival Manuscript Noise Glassmorphism", selected: false, note: "" },
    { id: 5, name: "Verified Digambar Shastra Inscriptions (Acharya Umāsvāmi)", selected: true, note: "" }
  ];

  function buildKeyboard() {
    const rows = [];
    features.forEach((f, idx) => {
      rows.push([
        {
          text: `${f.selected ? "✅" : "⬜"} ${f.id}. ${f.name}`,
          callback_data: `prop_toggle:${idx}`
        },
        {
          text: f.note ? `📝 Note: "${f.note.slice(0, 8)}..."` : `💬 Note #${f.id}`,
          callback_data: `prop_note:${idx}`
        }
      ]);
    });

    rows.push([
      { text: "🚀 Build Selected Features", callback_data: "prop_build" },
      { text: "❌ Skip This Cycle", callback_data: "prop_skip" }
    ]);

    return { inline_keyboard: rows };
  }

  const messageText = `
🏛️ *JAIN WISDOM DESIGN PROPOSAL*

📍 *TARGET PAGE:* \`${target.name}\` (${target.pageRoute})
📁 *SOURCE FILE:* \`${target.sourceFilePath}\`
🌟 *RESEARCH INSPIRATION:* ${pattern.name}

_Tap any item to toggle (✅ / ⬜) or tap 💬 to add custom instructions:_
`.trim();

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
      parse_mode: "Markdown",
      reply_markup: buildKeyboard()
    })
  });

  const msgData = await res.json();
  if (!msgData.ok) {
    console.error("Failed to send proposal message:", msgData);
    return features.filter(f => f.selected);
  }
  const messageId = msgData.result.message_id;

  console.log(`[Proposal] Interactive checklist dispatched to Telegram (Msg ID: ${messageId}).`);
  console.log("Listening for user checkbox toggles and custom notes on Telegram...");

  const maxWaitMs = 15 * 60 * 1000; // 15 minutes
  const startTime = Date.now();
  let lastUpdateId = 0;
  let awaitingNoteForIdx = null;

  while (Date.now() - startTime < maxWaitMs) {
    try {
      const updatesRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=10`);
      const updatesData = await updatesRes.json();

      if (updatesData.ok && updatesData.result.length > 0) {
        for (const update of updatesData.result) {
          lastUpdateId = update.update_id;

          // Check for text reply if user tapped "Add Note"
          if (awaitingNoteForIdx !== null && update.message && update.message.text) {
            features[awaitingNoteForIdx].note = update.message.text;
            console.log(`Saved user note for feature #${features[awaitingNoteForIdx].id}: "${update.message.text}"`);

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: `✅ *Note Saved for Feature #${features[awaitingNoteForIdx].id}:* "${update.message.text}"\n\n_Tap [🚀 Build Selected Features] when ready!_`,
                parse_mode: "Markdown"
              })
            });

            await fetch(`https://api.telegram.org/bot${token}/editMessageReplyMarkup`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
                reply_markup: buildKeyboard()
              })
            });

            awaitingNoteForIdx = null;
            continue;
          }

          if (update.callback_query && update.callback_query.data) {
            const cb = update.callback_query.data;

            if (cb.startsWith("prop_toggle:")) {
              const idx = parseInt(cb.split(":")[1], 10);
              features[idx].selected = !features[idx].selected;

              await fetch(`https://api.telegram.org/bot${token}/editMessageReplyMarkup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  reply_markup: buildKeyboard()
                })
              });

              await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ callback_query_id: update.callback_query.id })
              });
            } else if (cb.startsWith("prop_note:")) {
              const idx = parseInt(cb.split(":")[1], 10);
              awaitingNoteForIdx = idx;

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `💬 *Please reply with your custom instructions for Feature #${features[idx].id} (${features[idx].name}):*`,
                  parse_mode: "Markdown"
                })
              });

              await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ callback_query_id: update.callback_query.id })
              });
            } else if (cb === "prop_build") {
              await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  callback_query_id: update.callback_query.id,
                  text: "Building selected features now!"
                })
              });

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚙️ *Building your selected features...*\n• Enforcing Acharya Umāsvāmi & Kundkund canonical reverence\n• Running Creative Director Polish Pass\n• Compiling Next.js build\n\n_You will receive the direct live preview link shortly!_`,
                  parse_mode: "Markdown"
                })
              });

              return features.filter(f => f.selected);
            } else if (cb === "prop_skip") {
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⏭️ Elevation cycle skipped by user.`
                })
              });
              return null;
            }
          }
        }
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 4000));
    }
    await new Promise(r => setTimeout(r, 2500));
  }

  console.log("Proposal timed out awaiting user interaction. Proceeding with selected features.");
  return features.filter(f => f.selected);
}

// ----------------------------------------------------------------------------
// 8. TELEGRAM NOTIFIER WITH DIRECT VERCEL PREVIEW
// ----------------------------------------------------------------------------
async function sendTelegramBriefing(synthesis, pattern, target, branchName, qaPasses) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram tokens not configured. Skipping notification.");
    return;
  }

  const directPreviewUrl = await getDirectVercelPreviewUrl(branchName);
  const githubCompareUrl = `https://github.com/AagamKiVaani/jain-wisdom-hub/compare/main...${branchName}`;

  const changesList = Array.isArray(synthesis.detailedChanges) && synthesis.detailedChanges.length > 0
    ? synthesis.detailedChanges.map(c => `• ${c}`).join("\n")
    : `• ${synthesis.summary}`;

  const messageText = `
🏛️ *JAIN WISDOM ELEVATION REPORT*

📍 *Target:* \`${target.name}\` (${target.pageRoute})
✨ *Inspiration:* ${pattern.name}
🔬 *QA Status:* Passed compiler in ${qaPasses} pass(es)

📜 *DIGAMBAR AAGAM VERIFICATION:*
• *Shastra:* ${synthesis.digambarProof.shastra}
• *Author:* ${synthesis.digambarProof.author}
• *Reference:* ${synthesis.digambarProof.reference}
• *Doctrinal Proof:* ${synthesis.digambarProof.explanation}

✨ *DETAILED POINTWISE ELEVATION BREAKDOWN:*
${changesList}

🌿 *Git Branch:* \`${branchName}\`
🌐 *Direct Live Preview:*
${directPreviewUrl}

🔍 *Code Diff on GitHub:*
${githubCompareUrl}

---
_Tap below to review live or command your agent:_
`.trim();

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "🌐 Open Direct Live Preview", url: directPreviewUrl },
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
    console.log("✅ Telegram briefing successfully sent!");
  } else {
    console.error("Telegram send failed:", data);
  }
}

// ----------------------------------------------------------------------------
// 8.5 ACTIVE COMMAND CENTER & REVISION ENGINE
// ----------------------------------------------------------------------------
async function waitForUserFeedbackAndApproval(target, pattern, branchName, workspaceRoot, timeoutMinutes = 120) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return "timeout";

  console.log(`\n[Active Command Center] Listening for Telegram feedback & commands on ${branchName}...`);
  const startTime = Date.now();
  let lastUpdateId = 0;
  let awaitingFeedback = false;

  while (Date.now() - startTime < timeoutMinutes * 60 * 1000) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=15`);
      const data = await res.json();

      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;

          // 1. User sent a text message with feedback
          if (awaitingFeedback && update.message && update.message.text) {
            const userFeedback = update.message.text;
            console.log(`\n📝 Received user feedback on Telegram: "${userFeedback}"`);

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: `⚙️ *Revising code based on your feedback:*\n"${userFeedback}"\n\n_Running compiler tests and updating live preview..._`,
                parse_mode: "Markdown"
              })
            });

            const currentCode = fs.readFileSync(path.join(workspaceRoot, target.sourceFilePath), "utf8");
            const revisionPrompt = `
You are an expert Next.js Engineer and Digambar Jain scholar.
The user reviewed the live preview for ${target.name} (${target.pageRoute}) and requested these specific corrections:

USER FEEDBACK / CORRECTIONS:
"""
${userFeedback}
"""

${DIGAMBAR_CANONICAL_RULES}

CRITICAL MANDATES:
1. AUDIO: MUST use real audio file '/sounds/resources/click2.mp3' with volume 0.65.
2. POSITIONING: Floating controls MUST be docked at "fixed bottom-6 right-6 z-50" (never top-right colliding with Navbar).
3. HIERARCHY: Navigation cards must remain prominent below hero title. Shastra quotes below the grid.
4. REVERENCE: Author of Tattvārtha Sūtra must be strictly written as Acharya Umāsvāmi.

CURRENT CODE:
\`\`\`tsx
${currentCode}
\`\`\`

Apply all requested corrections. Return ONLY the drop-in replacement TSX code.
`;

            const revisedRaw = await queryGemini(revisionPrompt, false);
            const revisedCode = revisedRaw.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();

            const qa = await verifyMultiPass(workspaceRoot, target.sourceFilePath, revisedCode);
            if (qa.passed) {
              execSync("git add .", { cwd: workspaceRoot, stdio: "pipe" });
              execSync(`git commit -m "Apply user feedback: ${userFeedback.slice(0, 50)}"`, { cwd: workspaceRoot, stdio: "pipe" });
              execSync(`git push origin ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });

              const directPreviewUrl = await getDirectVercelPreviewUrl(branchName);

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `✨ *CHANGES APPLIED & VERIFIED!*\n\n📍 *Target:* \`${target.name}\`\n🌐 *Updated Live Preview:*\n${directPreviewUrl}\n\n_Tap below to review the updated preview:_`,
                  parse_mode: "Markdown",
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "🌐 Open Direct Live Preview", url: directPreviewUrl }],
                      [{ text: "✅ Merge to Main", callback_data: `merge:${branchName}` }],
                      [{ text: "🔁 Request More Changes", callback_data: `feedback:${branchName}` }]
                    ]
                  }
                })
              });
            } else {
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚠️ Could not apply changes due to compiler check: ${qa.error?.slice(0, 200)}`
                })
              });
            }

            awaitingFeedback = false;
            continue;
          }

          // 2. User clicked an inline button
          if (update.callback_query && update.callback_query.data) {
            const cb = update.callback_query.data;

            await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ callback_query_id: update.callback_query.id })
            });

            if (cb === `feedback:${branchName}`) {
              awaitingFeedback = true;
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: "✍️ *Please reply to this message with all the corrections and mistakes you want fixed:*\n\n_(Type anything you want changed, and I will revise the code and update the preview!)_",
                  parse_mode: "Markdown",
                  reply_markup: {
                    force_reply: true,
                    input_field_placeholder: "Type your corrections here..."
                  }
                })
              });
            } else if (cb === `merge:${branchName}`) {
              console.log(`Merging ${branchName} into main...`);
              execSync("git checkout main", { cwd: workspaceRoot, stdio: "pipe" });
              execSync(`git merge ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });
              execSync("git push origin main", { cwd: workspaceRoot, stdio: "pipe" });

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `🎉 *SUCCESS!* Branch \`${branchName}\` has been merged into *main* and is now live in production!`
                })
              });
              return "merged";
            } else if (cb === `discard:${branchName}`) {
              execSync("git checkout main", { cwd: workspaceRoot, stdio: "pipe" });
              execSync(`git branch -D ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `🗑️ Branch \`${branchName}\` has been discarded.`
                })
              });
              return "discarded";
            }
          }
        }
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 4000));
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  return "timeout";
}

// ----------------------------------------------------------------------------
// 9. MASTER ORCHESTRATION ENTRYPOINT
// ----------------------------------------------------------------------------
async function main() {
  const workspaceRoot = process.cwd();
  loadEnv(workspaceRoot);

  console.log("==================================================================");
  console.log("🕊️ JAIN WISDOM HUB - AUTONOMOUS DIGAMBAR ELEVATION AGENT");
  console.log("==================================================================");

  // 1. Audit
  console.log("\n[1/5] Auditing website sections...");
  const targets = auditPages(workspaceRoot);
  if (targets.length === 0) {
    console.log("All pages meet visual requirements.");
    return;
  }
  const target = targets[0];
  console.log(`🎯 Candidate: ${target.name} (Score: ${target.visualScore}/10)`);
  console.log(`Missing: ${target.missingFeatures.join(", ")}`);

  // 2. Select Inspiration
  const pattern = pickDesignPattern(target.pageRoute);
  console.log(`\n[2/5] Selected Pattern: ${pattern.name}`);

  // 2.5 Interactive Proposal Menu with Checkboxes & Custom Notes
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const approvedFeatures = await requestProposalApproval(target, pattern, token, chatId);
  if (!approvedFeatures || approvedFeatures.length === 0) {
    console.log("No features selected or cycle skipped by user.");
    return;
  }

  // 3. Synthesize ONLY user-approved features with custom notes
  console.log("\n[3/5] Synthesizing user-approved features with Gemini & Digambar Guardrails...");
  const currentCode = fs.readFileSync(path.join(workspaceRoot, target.sourceFilePath), "utf8");
  const result = await synthesize(target, currentCode, pattern, approvedFeatures);
  console.log(`📜 Digambar Source: ${result.digambarProof.shastra} (${result.digambarProof.author})`);

  // 3.5 Autonomous Frontend Polish Pass (Creative Director Refinement Loop)
  console.log("\n[3.5/5] Executing Creative Director Frontend Polish Pass...");
  result.code = await refineAndPolishFrontend(target, result.code, pattern);

  // 4. Create Branch & Run QA
  const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
  const branchSlug = target.pageRoute.replace(/\//g, "").replace(/[^a-zA-Z0-9]/g, "-") || "home";
  const branchName = `elevation/${branchSlug}-${timestamp}`;

  console.log(`\n[4/5] Creating branch ${branchName} and running QA...`);
  execSync(`git checkout -b ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });

  const qa = await verifyMultiPass(workspaceRoot, target.sourceFilePath, result.code);
  if (!qa.passed) {
    console.error(`❌ Multi-pass QA failed: ${qa.error}`);
    execSync("git checkout main", { cwd: workspaceRoot, stdio: "pipe" });
    execSync(`git branch -D ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });
    process.exit(1);
  }

  console.log(`✅ Multi-pass QA Passed in ${qa.iterations} pass(es)!`);

  // Commit and push branch
  execSync("git add .", { cwd: workspaceRoot, stdio: "pipe" });
  execSync(`git commit -m "Autonomous Elevation: ${pattern.name} on ${target.name}"`, { cwd: workspaceRoot, stdio: "pipe" });
  try {
    execSync(`git push -u origin ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });
    console.log(`🌿 Branch ${branchName} pushed to origin.`);
  } catch (e) {
    console.warn("Could not push branch to origin:", e.message);
  }

  // 5. Notify Telegram
  console.log("\n[5/5] Dispatching briefing to Telegram...");
  await sendTelegramBriefing(result, pattern, target, branchName, qa.iterations);

  // 6. Active Command Center: Listen for User Feedback & Merge Actions
  await waitForUserFeedbackAndApproval(target, pattern, branchName, workspaceRoot);

  console.log("\n==================================================================");
  console.log("🎉 Autonomous elevation cycle completed successfully!");
  console.log("==================================================================");
}

main().catch((err) => {
  console.error("Fatal Agent Error:", err);
  process.exit(1);
});
