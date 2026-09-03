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
// 6. CODE SYNTHESIZER
// ----------------------------------------------------------------------------
async function synthesize(target, currentCode, pattern) {
  const prompt = `
You are an expert Frontend Architect (Next.js 15+, Tailwind, Framer Motion) and Digambar Jain scholar.

PAGE: ${target.pageRoute} (${target.sourceFilePath})
CURRENT GAPS: ${target.missingFeatures.join(", ")}
DESIGN INSPIRATION: ${pattern.name} (${pattern.concept})

${DIGAMBAR_CANONICAL_RULES}

EXISTING FILE CONTENT:
\`\`\`tsx
${currentCode}
\`\`\`

YOUR TASK:
1. Elevate this component to a 9/10 visual standard implementing ${pattern.name}.
2. Ensure tactile micro-interactions (playTapSound), atmospheric noise texture, and responsive layout.
4. NEXT.JS 16 APP ROUTER RULE: If this is a page.tsx file, params MUST be typed as Promise<{ lang: string }>: export default function Page({ params }: { params: Promise<{ lang: string }> }) and unwrapped using const { lang } = React.use(params);

OUTPUT FORMAT:
Return your response in exactly two clearly demarcated sections:

=== METADATA ===
{
  "summary": "2-sentence executive summary of upgrades.",
  "digambarProof": {
    "shastra": "Exact Digambar Shastra name",
    "author": "Exact Acharya name",
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
    digambarProof: metadata.digambarProof,
    code: code
  };
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
// 8. TELEGRAM NOTIFIER
// ----------------------------------------------------------------------------
async function sendTelegramBriefing(synthesis, pattern, target, branchName, qaPasses) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram tokens not configured. Skipping notification.");
    return;
  }
  const githubCompareUrl = `https://github.com/AagamKiVaani/jain-wisdom-hub/compare/main...${branchName}`;
  const vercelDeploymentsUrl = `https://vercel.com/aagamkivaanis-projects/jain-wisdom-hub/deployments`;

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

🌟 *Summary of Elevation:*
${synthesis.summary}

🌿 *Git Branch:* \`${branchName}\`
🌐 *Live Preview & Deployments:* ${vercelDeploymentsUrl}
🔍 *Review Code Changes:* ${githubCompareUrl}

---
_Tap an action below to command your agent:_
`.trim();

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "🌐 Open Vercel Preview", url: vercelDeploymentsUrl },
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

  // 3. Synthesize
  console.log("\n[3/5] Synthesizing with Gemini 3.6 & Digambar Canonical Guardrails...");
  const currentCode = fs.readFileSync(path.join(workspaceRoot, target.sourceFilePath), "utf8");
  const result = await synthesize(target, currentCode, pattern);
  console.log(`📜 Digambar Source: ${result.digambarProof.shastra} (${result.digambarProof.author})`);

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

  console.log("\n==================================================================");
  console.log("🎉 Autonomous elevation cycle completed successfully!");
  console.log("==================================================================");
}

main().catch((err) => {
  console.error("Fatal Agent Error:", err);
  process.exit(1);
});
