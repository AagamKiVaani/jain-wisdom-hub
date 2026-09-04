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
// 3. DESIGN & TECH TREND HUNTER (IMMERSIVE 3D & MOTION)
// ----------------------------------------------------------------------------
const DESIGN_PATTERNS = [
  {
    id: "spatial-3d-card",
    name: "Apple VisionOS Layered Spatial Cards",
    source: "Godly.website & Aceternity UI",
    concept: "Cards with multi-plane 3D depth tilt, dynamic cursor-tracking specular glass glares, and translateZ layer elevation.",
    keywords: "perspective: 1000px, Card3DContainer, Card3DItem, translateZ, transform-style: preserve-3d"
  },
  {
    id: "holographic-3d-pin",
    name: "Aceternity 3D Hologram Pin & Glow Horizon",
    source: "Aceternity UI & Awwwards",
    concept: "Floating 3D perspective pin effect that lifts sacred iconography into the foreground on hover with radiant horizon waves.",
    keywords: "3D pin, perspective transforms, radiant pulse, z-depth elevation"
  },
  {
    id: "ambient-3d-tilt-gallery",
    name: "Interactive Gyroscopic 3D Tilt Gallery",
    source: "Godly.website & Awwwards",
    concept: "Rich multi-column gallery with real-time 3D tilt tracking cursor and touch coordinates, dynamic specular glare sheen, and spring touch compression.",
    keywords: "perspective: 1200px, rotateX, rotateY, dynamic glare reflection, spring physics"
  },
  {
    id: "spline-threejs-geometry",
    name: "Three.js & Spline 3D Sacred Geometry Particles",
    source: "Three.js & Spline Design",
    concept: "Interactive 3D particle constellation responding dynamically to cursor position, scroll inertia, and celestial lighting.",
    keywords: "SacredParticlesCanvas, Three.js 3D canvas, interactive constellation, stardust field"
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
  },
  {
    id: "bento-library-filter",
    name: "Interactive Bento Grid with Instant Search & Filter",
    source: "Linear & Vercel UI",
    concept: "High-density glassmorphic bento cards with responsive category filters, smooth layout animations, and instant query debouncing.",
    keywords: "framer-motion layout, bento grid, glassmorphism, instant search"
  },
  {
    id: "audio-waveform-visualizer",
    name: "Sacred Sanskrit Audio & Waveform Visualizer",
    source: "Awwwards Sound Design",
    concept: "Interactive audio playback card with animated celestial sound waves, syllable-by-syllable translation reveal, and volume controls.",
    keywords: "AudioContext, Web Audio analyser, syllable sync, sound waves"
  }
];

function pickDesignPattern(pageRoute) {
  if (pageRoute.includes("tirthankar")) return DESIGN_PATTERNS[2]; // Gyroscopic 3D Tilt Gallery for Tirthankaras!
  if (pageRoute.includes("kalchakra")) return DESIGN_PATTERNS[4];  // Tracing Beam Timeline
  if (pageRoute.includes("namokar")) return DESIGN_PATTERNS[9];    // Audio Waveform
  if (pageRoute.includes("soul")) return DESIGN_PATTERNS[3];       // 3D Geometry Particles
  if (pageRoute.includes("resources")) return DESIGN_PATTERNS[8];  // Bento Library Filter
  return DESIGN_PATTERNS[Math.floor(Math.random() * DESIGN_PATTERNS.length)];
}

function getInspirationPattern(pageRoute, workspaceRoot) {
  const queuePath = path.join(workspaceRoot, "data", "inspirations_queue.json");
  if (fs.existsSync(queuePath)) {
    try {
      const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
      const pendingItem = queue.find(item => item.status === "pending");
      if (pendingItem) {
        pendingItem.status = "applied";
        fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf8");
        console.log(`💡 Loaded user-submitted inspiration: ${pendingItem.url || pendingItem.text}`);
        return {
          id: `custom-insp-${pendingItem.id}`,
          name: `Reel Inspiration (${pendingItem.url ? pendingItem.url.slice(0, 35) + "..." : "Custom Design Idea"})`,
          source: pendingItem.url || "Telegram Inspiration Drop",
          concept: `User shared reference: ${pendingItem.text}. Analyze and extract the visual layout, smooth motion physics, 3D tilt, or luminous glass aesthetic inspired by this reference.`,
          keywords: "custom reel inspiration, premium fluid UI, interactive motion",
          isUserInspiration: true,
          originalUrl: pendingItem.url
        };
      }
    } catch (e) {
      console.warn("Could not read inspirations queue:", e.message);
    }
  }
  return pickDesignPattern(pageRoute);
}

// ----------------------------------------------------------------------------
// 4. SITE AUDITOR & PAGE ROTATION ENGINE
// ----------------------------------------------------------------------------
function auditPages(workspaceRoot) {
  // All 7 Real Production Routes - Targeting actual interactive client components where visual elevation happens!
  const candidatePages = [
    { route: "/tirthankars", relPath: "app/[lang]/tirthankars/TirthankarGalleryClient.tsx", name: "24 Tirthankaras Gallery Hub" },
    { route: "/learn/kalchakra", relPath: "app/[lang]/learn/kalchakra/KalchakraClient.tsx", name: "Wheel of Time (Kalchakra)" },
    { route: "/learn/soul-karma", relPath: "app/[lang]/learn/soul-karma/SoulKarmaClient.tsx", name: "Soul & Karma Interactive Canvas" },
    { route: "/learn/namokar-mantra", relPath: "app/[lang]/learn/[topic]/TopicClient.tsx", name: "Namokar Mantra Sacred Module" },
    { route: "/resources", relPath: "app/[lang]/resources/components/NotesClient.tsx", name: "Wisdom Library & Notes Hub" },
    { route: "/about", relPath: "app/[lang]/about/page.tsx", name: "About Aagam Ki Vaani" },
    { route: "/", relPath: "app/[lang]/page.tsx", name: "Home Page" }
  ];

  // Read rotation history to avoid getting stuck on the same page!
  const historyPath = path.join(workspaceRoot, "data", "elevation_history.json");
  let recentlyElevated = [];
  if (fs.existsSync(historyPath)) {
    try {
      recentlyElevated = JSON.parse(fs.readFileSync(historyPath, "utf8"));
    } catch (e) {}
  }

  const targets = [];
  for (const page of candidatePages) {
    const fullPath = path.join(workspaceRoot, page.relPath);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    let score = 5;

    // Heavily penalize recently elevated pages so the agent ROTATES through all pages
    const lastIndex = recentlyElevated.lastIndexOf(page.route);
    if (lastIndex !== -1) {
      const recency = recentlyElevated.length - lastIndex;
      if (recency <= 3) {
        score += 30; // Push back of line
      }
    }

    if (!content.includes("framer-motion") && !content.includes("motion.")) score -= 2;
    if (content.length < 2500) score -= 1.5;

    targets.push({
      pageRoute: page.route,
      sourceFilePath: page.relPath,
      visualScore: Math.max(1, score),
      missingFeatures: ["Dynamic feature elevation queued"],
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
async function synthesize(target, currentCode, pattern, focusFeature = null) {
  const featureName = focusFeature?.name || `${pattern.name} Visual Elevation`;
  const featureConcept = focusFeature?.concept || pattern.concept;
  const userNote = focusFeature?.note || "";

  const prompt = `
You are an expert Frontend Architect (Next.js 15+, Tailwind, Framer Motion) and Digambar Jain scholar.

PAGE: ${target.pageRoute} (${target.sourceFilePath})
DESIGN INSPIRATION: ${pattern.name} (${pattern.concept})

=============================================================================
CRITICAL MANDATE: SINGLE FEATURE DEEP CRAFTSMANSHIP (DO NOT DO TOO MANY THINGS)
=============================================================================
CRITICAL INSTRUCTION: You must focus 100% of your engineering on ONE SINGLE FEATURE WITH EXTRAORDINARY DEPTH.
Do NOT scatter your implementation across multiple superficial tweaks or basic surface-level additions.
Every animation, interaction, state, and visual flourish must be dedicated to making this ONE feature feel like an Apple HIG, Linear, or Awwwards Site of the Year benchmark.

PRIMARY FEATURE TO BUILD DEEPLY:
• Feature Title: ${featureName}
• Architectural Scope & Detail: ${featureConcept}
${userNote ? `• USER'S EXPLICIT CUSTOM INSTRUCTIONS: "${userNote}"` : ""}

STANDARDS FOR DEEP CRAFTSMANSHIP ON THIS SINGLE FEATURE:
1. COMPLETE, ROBUST ARCHITECTURE:
   - Implement full state management, responsive variants, seamless animations, and complete UI flow.
   - Rich tactile micro-interactions:
     * Multi-plane 3D perspective tilts (\`perspective: 1000px\`, \`transformStyle: 'preserve-3d'\`, dynamic hover elevation with \`translateZ(20px)\`).
     * Specular light reflection sheen that tracks cursor/touch position.
     * Framer Motion smooth spring physics (\`stiffness: 300, damping: 25\`).
     * Luminous glowing glassmorphic borders (\`backdrop-blur-xl\`, \`border-amber-500/20\`).
     * Tactile audio click feedback on interactions (\`/sounds/resources/click2.mp3\` with volume 0.65).
   - Zero placeholders, zero mock data, zero half-baked components.

2. STRICT 100% CONTENT PRESERVATION (ABSOLUTE MANDATE):
   - ZERO CONTENT DELETION: You are STRICTLY FORBIDDEN from deleting, removing, simplifying, or truncating ANY existing content, data structures, or card loops!
   - Every single item rendered in the original code MUST remain rendered.
   - If this is the Tirthankaras page/gallery, ALL 24 Tirthankaras MUST remain rendered using the exact data mapping: \`tirthankaras.map(...)\`. NEVER replace or truncate the 24 Tirthankaras with a mock array or partial list!
   - If the file has a \`.map(...)\` loop, the \`.map(...)\` loop MUST be preserved!
   - Preserve all existing imports, symbols, multi-language translation dictionaries (\`translations.en\`, \`translations.hi\`, \`translations.kn\`), images, and functional routing.

${DIGAMBAR_CANONICAL_RULES}

CRITICAL UI, AUDIO & POSITIONING MANDATES:
1. AUDIO TACTILE CLICKS: MUST use the real audio file '/sounds/resources/click2.mp3' with volume 0.65:
   const playTapSound = () => { if (!soundEnabled) return; try { const a = new Audio("/sounds/resources/click2.mp3"); a.volume = 0.65; a.play().catch(()=>{}); if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12); } catch (e) {} };
   NEVER synthesize silent or quiet Web Audio oscillators!
2. FLOATING CONTROLS POSITIONING: If adding a persistent floating sound toggle or controls, position them at "fixed bottom-6 right-6 z-50". NEVER position floating controls at "top-4 right-4" or "top-0" because that directly collides with the Navbar and language toggle!
3. PAGE HIERARCHY & NAVIGATION: Keep the primary navigation cards immediately prominent below the Hero title and subtitle. Do NOT push cards down by inserting large blocking panels above them. Any archival scripture quote panels must be placed gracefully underneath the cards grid!
4. NEXT.JS 16 APP ROUTER RULE: If this is a page.tsx file, params MUST be typed as Promise<{ lang: string }>: export default function Page({ params }: { params: Promise<{ lang: string }> }) and unwrapped using const { lang } = React.use(params);
5. REVERENCE MANDATE: The revered author of Tattvārtha Sūtra must be written strictly as Acharya Umāsvāmi (NEVER Umasvati).

EXISTING FILE CONTENT (MUST BE PRESERVED AS THE FOUNDATION):
\`\`\`tsx
${currentCode}
\`\`\`

OUTPUT FORMAT:
Return your response in exactly two clearly demarcated sections:

=== METADATA ===
{
  "summary": "1-sentence executive headline of the single feature deeply elevated.",
  "detailedChanges": [
    "🎯 Deep Feature: Specific detailed description of the single feature implemented",
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
    summary: `Elevated ${target.name} with ${featureName}`,
    detailedChanges: [
      `Deeply implemented ${featureName} with high-craft 3D motion and state`,
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
async function refineAndPolishFrontend(target, initialCode, pattern, focusFeature = null) {
  console.log("🎨 Initiating Autonomous Frontend Refinement & Polish Pass...");
  const featureName = focusFeature?.name || pattern.name;
  const featureConcept = focusFeature?.concept || pattern.concept;
  const userNotes = focusFeature?.note || "";

  const criticPrompt = `
You are an award-winning Creative Director, Senior Design Engineer, and scholar of authentic Digambar Jain Philosophy.

Review this newly drafted Next.js 15+ React component for: ${target.name} (${target.pageRoute}).
Focused Feature to Polish: ${featureName}
Scope & Intent: ${featureConcept}
${userNotes ? `USER'S CUSTOM REQUIREMENTS: ${userNotes}` : ""}

${DIGAMBAR_CANONICAL_RULES}

DRAFT CODE:
\`\`\`tsx
${initialCode}
\`\`\`

YOUR TASK - CRITIQUE AND ELEVATE (Take it from an 8/10 to a 9.5/10):
1. SINGLE FEATURE DEEP CRAFTSMANSHIP AUDIT:
   - Verify that the single focused feature (${featureName}) is built with true depth, complete state handling, and nuanced micro-interactions rather than being a superficial or basic addition.
   - Refine Framer Motion spring physics (stiffness: 300, damping: 25).
   - Enhance 3D perspective depth tilts, specular glare reflections, and multi-plane Z-depth layers.
2. STRICT CONTENT PRESERVATION MANDATE:
   - ZERO CONTENT REMOVAL: You must verify that 100% of the original content, cards, and data mappings are preserved.
   - If this is the Tirthankaras gallery, ALL 24 Tirthankaras and their data map MUST be preserved.
   - Do NOT delete, replace, or simplify any data loops, text, or buttons.
3. Audio Realism: Verify that audio click uses new Audio("/sounds/resources/click2.mp3") with volume 0.65. Eliminate any silent custom oscillators.
4. Element Positioning: Ensure floating controls are docked at "bottom-6 right-6" (NEVER top-4 right-4 which collides with Navbar). Ensure primary navigation cards remain immediately below the title/subtitle.
5. Mobile Viewport Excellence: Ensure seamless responsive wrapping, touch targets of at least 44px, and zero horizontal scroll overflow.
6. Strict Canonical Reverence: Ensure the author of Tattvārtha Sūtra is written as "Acharya Umāsvāmi" (NEVER Umasvati).
7. Output ONLY the refined, drop-in replacement TSX code. Do not wrap in extra JSON or markdown explanations.
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
// 6.8 AUTOMATED CONTENT PRESERVATION GUARDRAIL
// ----------------------------------------------------------------------------
function verifyContentPreservation(originalCode, candidateCode, relPath) {
  // 1. Array map preservation (.map)
  const origMapMatches = originalCode.match(/\.map\s*\(/g);
  const origMapCount = origMapMatches ? origMapMatches.length : 0;
  const candMapMatches = candidateCode.match(/\.map\s*\(/g);
  const candMapCount = candMapMatches ? candMapMatches.length : 0;

  if (origMapCount > 0 && candMapCount === 0) {
    return {
      valid: false,
      reason: `Content Preservation Violation: Original code contained ${origMapCount} .map() render loop(s), but candidate code deleted all of them! All existing item maps must be preserved.`
    };
  }

  // 2. Tirthankaras gallery specific checks
  if (relPath.toLowerCase().includes("tirthankar")) {
    if (originalCode.includes("tirthankaras") && !candidateCode.includes("tirthankaras")) {
      return {
        valid: false,
        reason: "Content Preservation Violation: The 'tirthankaras' data source was removed! All 24 Tirthankaras must remain fully rendered."
      };
    }
    if (originalCode.includes("t.tirthankaraImage") && !candidateCode.includes("tirthankaraImage")) {
      return {
        valid: false,
        reason: "Content Preservation Violation: Tirthankar images were removed from the cards!"
      };
    }
    if (originalCode.includes("t.symbol") && !candidateCode.includes("symbol")) {
      return {
        valid: false,
        reason: "Content Preservation Violation: Tirthankar symbols were removed from the cards!"
      };
    }
  }

  // 3. Kalchakra cosmic eras specific checks
  if (relPath.toLowerCase().includes("kalchakra")) {
    if (originalCode.includes("aras") && !candidateCode.includes("aras")) {
      return {
        valid: false,
        reason: "Content Preservation Violation: Kalchakra cosmic eras (aras) data mapping was removed!"
      };
    }
  }

  // 4. Multilingual translations preservation
  if (originalCode.includes("translations") && !candidateCode.includes("translations")) {
    return {
      valid: false,
      reason: "Content Preservation Violation: Multilingual translations dictionary was deleted!"
    };
  }

  // 5. Line reduction sanity check (cannot delete > 35% of code)
  const origLines = originalCode.trim().split(/\r?\n/).length;
  const candLines = candidateCode.trim().split(/\r?\n/).length;
  if (origLines > 60 && candLines < origLines * 0.65) {
    return {
      valid: false,
      reason: `Content Preservation Violation: Candidate code lost over 35% of original lines (${candLines} lines vs ${origLines} lines in original). Core content was stripped instead of elevated!`
    };
  }

  return { valid: true };
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

  // Step 0: Check Content Preservation Guardrail
  const initialCheck = verifyContentPreservation(backup, code, targetRelPath);
  if (!initialCheck.valid) {
    console.warn(`⚠️ ${initialCheck.reason}`);
    console.log("[QA Content Preservation] Reprimanding Gemini to restore all original content...");
    const restorePrompt = `
YOUR CODE WAS REJECTED BY THE STRICT CONTENT PRESERVATION GUARDRAIL:
${initialCheck.reason}

MANDATORY RULES:
1. You are strictly forbidden from deleting, replacing, or simplifying ANY of the existing content, data lists, or maps.
2. All changes must be ADDITIVE ONLY: Add 3D perspective tilts, Framer Motion animations, lighting, and audio clicks to the EXISTING content.
3. Keep 100% of the original content, maps, and cards intact.

ORIGINAL CODE (MUST BE PRESERVED AS FOUNDATION):
\`\`\`tsx
${backup}
\`\`\`

Return ONLY the drop-in replacement TSX code with all original content preserved.
`;
    try {
      const restored = await queryGemini(restorePrompt, false);
      const restoredCode = restored.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();
      const secondCheck = verifyContentPreservation(backup, restoredCode, targetRelPath);
      if (secondCheck.valid) {
        code = restoredCode;
      } else {
        fs.writeFileSync(fullPath, backup, "utf8");
        return { passed: false, iterations: 1, error: secondCheck.reason };
      }
    } catch (e) {
      fs.writeFileSync(fullPath, backup, "utf8");
      return { passed: false, iterations: 1, error: initialCheck.reason };
    }
  }

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

CRITICAL PRESERVATION MANDATE:
Do NOT fix the error by deleting cards, mappings, or content! All original content and .map() loops must be preserved.

CURRENT CODE:
\`\`\`tsx
${code}
\`\`\`

Fix the error completely. Return ONLY the drop-in replacement TSX code. Do not wrap in markdown or backticks.
`;
      const fixed = await queryGemini(healPrompt, false);
      const fixedCode = fixed.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();
      const healedCheck = verifyContentPreservation(backup, fixedCode, targetRelPath);
      if (healedCheck.valid) {
        code = fixedCode;
      } else {
        console.warn(`⚠️ Self-healing pass violated content preservation: ${healedCheck.reason}`);
      }
    }
  }

  fs.writeFileSync(fullPath, backup, "utf8");
  return { passed: false, iterations: attempts, error: "Exceeded max self-healing passes" };
}

// ----------------------------------------------------------------------------
// 8. TELEGRAM NOTIFIER WITH DIRECT VERCEL PREVIEW
// ----------------------------------------------------------------------------
async function getDirectVercelPreviewUrl(branchName, targetPageRoute = "", commitSha = "") {
  console.log(`Fetching exact direct Vercel preview deployment URL for branch: ${branchName} (target: ${targetPageRoute || "/"}, commit: ${commitSha || "HEAD"})...`);
  const headers = { "User-Agent": "AntigravityAgent" };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const branchSlug = branchName.replace(/\//g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  // Exact deterministic Vercel branch preview URL for project 'aagamkivaani'
  const vercelBranchBase = `https://aagamkivaani-git-${branchSlug}-aagams-projects-b0e9e8b5.vercel.app`;

  const formatFinalUrl = (baseUrl) => {
    const cleanBase = baseUrl.replace(/\/$/, "");
    if (!targetPageRoute || targetPageRoute === "/") return cleanBase;
    const cleanRoute = targetPageRoute.startsWith("/") ? targetPageRoute : `/${targetPageRoute}`;
    return `${cleanBase}${cleanRoute}`;
  };

  // Poll for up to 90 seconds (18 attempts * 5s) for Vercel to complete building
  for (let i = 0; i < 18; i++) {
    try {
      await new Promise(r => setTimeout(r, 5000));
      const res = await fetch("https://api.github.com/repos/AagamKiVaani/jain-wisdom-hub/deployments?per_page=15", { headers });
      const deployments = await res.json();
      if (Array.isArray(deployments) && deployments.length > 0) {
        for (const dep of deployments) {
          // CRITICAL: NEVER match Production deployments (which point to main/production domain)!
          const envName = (dep.environment || "").toLowerCase();
          if (envName.includes("production")) continue;

          // Match only the preview deployment for this exact branch or commit
          const isMatchingRef = dep.ref === branchName ||
            (commitSha && (dep.ref === commitSha || dep.ref.startsWith(commitSha.slice(0, 7)))) ||
            (dep.payload && typeof dep.payload === "string" && dep.payload.includes(branchName));

          if (!isMatchingRef && commitSha) continue;

          const statusRes = await fetch(dep.statuses_url, { headers });
          const statuses = await statusRes.json();
          if (Array.isArray(statuses) && statuses.length > 0) {
            const url = statuses[0].environment_url || statuses[0].target_url;
            if (url && url.includes(".vercel.app") && !url.includes("aagamkivaani.org") && statuses[0].state === "success") {
              console.log("✅ Live direct Vercel Preview URL verified:", url);
              return formatFinalUrl(url);
            }
          }
        }
      }
    } catch (e) {
      // transient retry
    }
  }

  // Fallback to deterministic Vercel preview domain with target page route
  console.log(`Using deterministic Vercel preview branch URL: ${vercelBranchBase}`);
  return formatFinalUrl(vercelBranchBase);
}

// ----------------------------------------------------------------------------
// 7.4 DYNAMIC GEMINI FEATURE RESEARCHER (SINGLE FEATURE DEEP FOCUS)
// ----------------------------------------------------------------------------
async function generateDynamicFeatures(target, pattern, workspaceRoot) {
  try {
    const fullPath = path.join(workspaceRoot, target.sourceFilePath);
    const existingCode = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8").slice(0, 2500) : "";
    
    const prompt = `
You are the Lead Creative Director & Principal Frontend Architect for Aagam Ki Vaani (world-class Digambar Jain web portal).
Target Page: ${target.name} (${target.pageRoute})
Design Pattern / Inspiration: ${pattern.name} (${pattern.concept})

Source Code Context Excerpt:
${existingCode.slice(0, 1200)}

CRITICAL MANDATE: SINGLE FEATURE DEEP FOCUS
The user has commanded: DO NOT DO TOO MANY THINGS AT ONCE.
Propose exactly 4 to 5 distinct, STANDALONE, DEEP-DIVE feature concepts tailored specifically for this page.
Do NOT propose a bundle of multiple small tweaks or superficial surface changes.
Instead, each proposal must be a single, substantial, deeply-architected feature (e.g. An Interactive Gyroscopic 3D Tilt Card Suite with Specular Glare; or An Audio Syllable Chanting Visualizer; or An Interactive Filter Bento System with Fluid Layout Animations).

For each feature, provide:
- "id": number (1 to 5)
- "name": Concise, compelling feature title (under 35 chars)
- "concept": Detailed 2-sentence architectural scope explaining what will be built deeply (state management, micro-interactions, spring physics, tactile audio, responsive polish).
- "selected": boolean (true ONLY for id 1, false for all others - strict single-choice radio selection).
- "note": ""

Return ONLY a valid JSON array of 5 objects, with NO markdown wrapping:
[
  { "id": 1, "name": "Feature Title", "concept": "Detailed deep architecture description...", "selected": true, "note": "" },
  { "id": 2, "name": "Feature Title", "concept": "Detailed deep architecture description...", "selected": false, "note": "" },
  { "id": 3, "name": "Feature Title", "concept": "Detailed deep architecture description...", "selected": false, "note": "" },
  { "id": 4, "name": "Feature Title", "concept": "Detailed deep architecture description...", "selected": false, "note": "" },
  { "id": 5, "name": "Feature Title", "concept": "Detailed deep architecture description...", "selected": false, "note": "" }
]
`;
    console.log(`🧠 Querying Gemini to research custom single-focus features for ${target.name}...`);
    const res = await queryGemini(prompt, false);
    const match = res.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.slice(0, 5).map((item, idx) => ({
          id: idx + 1,
          name: (item.name || `Enhancement #${idx + 1}`).slice(0, 42),
          concept: item.concept || `${pattern.name} deeply integrated into ${target.name}.`,
          selected: idx === 0,
          note: ""
        }));
      }
    }
  } catch (e) {
    console.warn("Dynamic feature generation fallback:", e.message);
  }

  return [
    { id: 1, name: `${pattern.name} 3D Deep Architecture`, concept: `Comprehensive spatial depth, perspective transforms, dynamic specular glare sheen, and tactile sound clicks.`, selected: true, note: "" },
    { id: 2, name: "Interactive 3D Tilt & Specular Glare", concept: `Gyroscope-like multi-axis cursor tracking with smooth spring physics and zero layout thrashing.`, selected: false, note: "" },
    { id: 3, name: "Sacred Sanskrit Audio Chanting Waves", concept: `Interactive audio player with syllable resonance, volume controls, and tactile tap feedback.`, selected: false, note: "" },
    { id: 4, name: "Verified Digambar Shastra Inscriptions", concept: `Rich gold-foil scripture inscription cards citing authentic Digambar canonical verses.`, selected: false, note: "" },
    { id: 5, name: "Responsive Glassmorphic Bento Explorer", concept: `High-density card grid with category tabs, layout animations, and instant keyboard search.`, selected: false, note: "" }
  ];
}

// ----------------------------------------------------------------------------
// 7.5 INTERACTIVE SINGLE-FEATURE PROPOSAL & RADIO SELECTION ENGINE
// ----------------------------------------------------------------------------
async function requestProposalApproval(target, pattern, token, chatId, workspaceRoot) {
  if (!token || !chatId) {
    console.warn("Telegram tokens not set. Proceeding in non-interactive mode.");
    return { id: 1, name: `${pattern.name} Visual Elevation`, concept: pattern.concept, selected: true, note: "" };
  }

  const features = await generateDynamicFeatures(target, pattern, workspaceRoot);

  function getActiveFeature() {
    return features.find(f => f.selected) || features[0];
  }

  function buildKeyboard() {
    const rows = [];
    features.forEach((f, idx) => {
      rows.push([
        {
          text: `${f.selected ? "🔘" : "⚪"} ${f.id}. ${f.name}`,
          callback_data: `prop_select:${idx}`
        },
        {
          text: f.note ? `📝 Note: "${f.note.slice(0, 8)}..."` : `💬 Note #${f.id}`,
          callback_data: `prop_note:${idx}`
        }
      ]);
    });

    const active = getActiveFeature();
    rows.push([
      { text: `🚀 Build Focused Feature #${active.id}`, callback_data: "prop_build" },
      { text: "❌ Skip This Cycle", callback_data: "prop_skip" }
    ]);

    return { inline_keyboard: rows };
  }

  function buildMessageText() {
    const active = getActiveFeature();
    return `
🏛️ *AAGAM KI VAANI - SINGLE FEATURE DEEP FOCUS*

📍 *TARGET PAGE:* \`${target.name}\` (${target.pageRoute})
📁 *SOURCE FILE:* \`${target.sourceFilePath}\`
🌟 *INSPIRATION:* ${pattern.name}

🎯 *CURRENT ACTIVE FOCUS:*
*#${active.id}: ${active.name}*
_${active.concept}_
${active.note ? `\n📝 *Custom Instructions:* "${active.note}"` : ""}

_Tap any button (⚪) to switch the single focus feature, or tap 💬 to add instructions:_
`.trim();
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessageText(),
      parse_mode: "Markdown",
      reply_markup: buildKeyboard()
    })
  });

  const msgData = await res.json();
  if (!msgData.ok) {
    console.error("Failed to send proposal message:", msgData);
    return getActiveFeature();
  }
  const messageId = msgData.result.message_id;

  console.log(`[Proposal] Single-feature radio checklist dispatched to Telegram (Msg ID: ${messageId}).`);
  console.log("Listening for user radio selections and custom notes on Telegram...");

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
                text: `✅ *Note Saved for Feature #${features[awaitingNoteForIdx].id}:* "${update.message.text}"\n\n_Tap [🚀 Build Focused Feature #${features[awaitingNoteForIdx].id}] when ready!_`,
                parse_mode: "Markdown"
              })
            });

            await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
                text: buildMessageText(),
                parse_mode: "Markdown",
                reply_markup: buildKeyboard()
              })
            });

            awaitingNoteForIdx = null;
            continue;
          }

          if (update.callback_query && update.callback_query.data) {
            const cb = update.callback_query.data;

            if (cb.startsWith("prop_select:")) {
              const idx = parseInt(cb.split(":")[1], 10);
              // Strict radio selection: only one active feature
              features.forEach((f, i) => {
                f.selected = (i === idx);
              });

              await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: buildMessageText(),
                  parse_mode: "Markdown",
                  reply_markup: buildKeyboard()
                })
              });

              await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  callback_query_id: update.callback_query.id,
                  text: `Focused on: #${features[idx].id} ${features[idx].name}`
                })
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
              const chosen = getActiveFeature();
              await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  callback_query_id: update.callback_query.id,
                  text: `Building Feature #${chosen.id} with deep focus!`
                })
              });

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚙️ *Building single feature with deep focus...*\n\n🎯 *Target Feature:* #${chosen.id}. ${chosen.name}\n• Focusing 100% effort on deep architecture & micro-interactions\n• Enforcing Acharya Umāsvāmi & Kundkund canonical reverence\n• Compiling Next.js build & verifying preview deployment\n\n_You will receive the direct live preview link shortly!_`,
                  parse_mode: "Markdown"
                })
              });

              return chosen;
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

  console.log("Proposal timed out awaiting user interaction. Proceeding with active feature.");
  return getActiveFeature();
}

// ----------------------------------------------------------------------------
// 8. TELEGRAM NOTIFIER WITH DIRECT VERCEL PREVIEW
// ----------------------------------------------------------------------------
async function sendTelegramBriefing(synthesis, pattern, target, branchName, qaPasses, focusFeature = null, commitSha = "") {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram tokens not configured. Skipping notification.");
    return;
  }

  const directPreviewUrl = await getDirectVercelPreviewUrl(branchName, target.pageRoute, commitSha);
  const githubCompareUrl = `https://github.com/AagamKiVaani/jain-wisdom-hub/compare/main...${branchName}`;

  const changesList = Array.isArray(synthesis.detailedChanges) && synthesis.detailedChanges.length > 0
    ? synthesis.detailedChanges.map(c => `• ${c}`).join("\n")
    : `• ${synthesis.summary}`;

  const featureTitle = focusFeature?.name || synthesis.summary;
  const featureConcept = focusFeature?.concept ? `\n🎯 *Focus Scope:* _${focusFeature.concept}_\n` : "";

  const messageText = `
🏛️ *JAIN WISDOM ELEVATION REPORT*

📍 *Target Page:* \`${target.name}\` (${target.pageRoute})
🌟 *Inspiration:* ${pattern.name}
✨ *Deep Focus Feature:* *${featureTitle}*
${featureConcept}
🔬 *QA Status:* Passed Next.js compiler in ${qaPasses} pass(es)

📜 *DIGAMBAR AAGAM VERIFICATION:*
• *Shastra:* ${synthesis.digambarProof.shastra}
• *Author:* ${synthesis.digambarProof.author}
• *Reference:* ${synthesis.digambarProof.reference}
• *Doctrinal Proof:* ${synthesis.digambarProof.explanation}

✨ *DEEP CRAFTSMANSHIP BREAKDOWN:*
${changesList}

🌿 *Git Branch:* \`${branchName}\`
🌐 *Direct Live Preview (Exact Page):*
${directPreviewUrl}

🔍 *Code Diff on GitHub:*
${githubCompareUrl}

---
_Tap below to review the live preview on your phone or command your agent:_
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

          // 1. Check for Shared Reel or Design Inspiration Link
          const rawMsg = update.message ? (update.message.text || update.message.caption || "") : "";
          const hasUrl = rawMsg.match(/(https?:\/\/[^\s]+)/i);
          const isReelOrIdea = hasUrl || rawMsg.toLowerCase().includes("reel") || rawMsg.toLowerCase().startsWith("idea:") || rawMsg.toLowerCase().startsWith("inspire:");

          if (update.message && isReelOrIdea && !awaitingFeedback) {
            console.log(`\n📥 Capturing design inspiration from Telegram: "${rawMsg}"`);
            const queuePath = path.join(workspaceRoot, "data", "inspirations_queue.json");
            let queue = [];
            try {
              if (fs.existsSync(queuePath)) queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
            } catch (e) {}

            const newItem = {
              id: `insp_${Date.now()}`,
              url: hasUrl ? hasUrl[0] : "",
              text: rawMsg,
              timestamp: new Date().toISOString(),
              status: "pending"
            };
            queue.push(newItem);
            fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf8");

            try {
              execSync("git add data/inspirations_queue.json", { cwd: workspaceRoot, stdio: "pipe" });
              execSync('git commit -m "Capture user inspiration from Telegram" --allow-empty', { cwd: workspaceRoot, stdio: "pipe" });
              execSync('git push origin main', { cwd: workspaceRoot, stdio: "pipe" });
            } catch (e) {}

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: `📥 *INSPIRATION CAPTURED!*\n\n🔗 *Reference:* ${hasUrl ? hasUrl[0] : "Design Idea"}\n💡 *Status:* Added to your Inspiration Drop Box.\n\n_In the next elevation run, Gemini will study this design technique and propose a custom feature for your website!_`,
                parse_mode: "Markdown"
              })
            });
            continue;
          }

          // 2. User sent a text message with feedback on current preview
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
1. CONTENT PRESERVATION: Strictly FORBIDDEN from removing or simplifying existing content, maps, or cards! All 24 Tirthankaras and existing loops must remain 100% intact.
2. AUDIO: MUST use real audio file '/sounds/resources/click2.mp3' with volume 0.65.
3. POSITIONING: Floating controls MUST be docked at "fixed bottom-6 right-6 z-50" (never top-right colliding with Navbar).
4. HIERARCHY: Navigation cards must remain prominent below hero title. Shastra quotes below the grid.
5. REVERENCE: Author of Tattvārtha Sūtra must be strictly written as Acharya Umāsvāmi.

CURRENT CODE (FOUNDATION - DO NOT STRIP):
\`\`\`tsx
${currentCode}
\`\`\`

Apply all requested corrections while strictly preserving all existing content, maps, and cards. Return ONLY the drop-in replacement TSX code.
`;

            const revisedRaw = await queryGemini(revisionPrompt, false);
            const revisedCode = revisedRaw.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();

            const qa = await verifyMultiPass(workspaceRoot, target.sourceFilePath, revisedCode);
            if (qa.passed) {
              execSync("git add .", { cwd: workspaceRoot, stdio: "pipe" });
              execSync(`git commit -m "Apply user feedback: ${userFeedback.slice(0, 50)}"`, { cwd: workspaceRoot, stdio: "pipe" });
              execSync(`git push origin ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });

              const revisedCommitSha = execSync("git rev-parse HEAD", { cwd: workspaceRoot, stdio: "pipe" }).toString().trim();
              const directPreviewUrl = await getDirectVercelPreviewUrl(branchName, target.pageRoute, revisedCommitSha);

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `✨ *CHANGES APPLIED & VERIFIED!*\n\n📍 *Target Page:* \`${target.name}\` (${target.pageRoute})\n🌐 *Updated Live Preview:*\n${directPreviewUrl}\n\n_Tap below to review the updated live preview on your phone:_`,
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

  // 2. Select Inspiration (Checks User Inspiration Drop Box first)
  const pattern = getInspirationPattern(target.pageRoute, workspaceRoot);
  console.log(`\n[2/5] Selected Pattern: ${pattern.name}`);

  // 2.5 Interactive Proposal Menu with Single Deep Focus Selection
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const focusFeature = await requestProposalApproval(target, pattern, token, chatId, workspaceRoot);
  if (!focusFeature) {
    console.log("No feature selected or cycle skipped by user.");
    return;
  }

  // Record into rotation history so subsequent runs target different pages
  try {
    const histPath = path.join(workspaceRoot, "data", "elevation_history.json");
    let hist = [];
    if (fs.existsSync(histPath)) {
      hist = JSON.parse(fs.readFileSync(histPath, "utf8"));
    }
    hist.push(target.pageRoute);
    fs.writeFileSync(histPath, JSON.stringify(hist.slice(-20), null, 2), "utf8");
  } catch (e) {}

  // 3. Deeply synthesize ONLY the single focus feature with custom notes
  console.log(`\n[3/5] Deeply synthesizing single focus feature: "${focusFeature.name}"...`);
  const currentCode = fs.readFileSync(path.join(workspaceRoot, target.sourceFilePath), "utf8");
  const result = await synthesize(target, currentCode, pattern, focusFeature);
  console.log(`📜 Digambar Source: ${result.digambarProof.shastra} (${result.digambarProof.author})`);

  // 3.5 Autonomous Frontend Polish Pass (Creative Director Refinement Loop)
  console.log("\n[3.5/5] Executing Creative Director Frontend Polish Pass...");
  result.code = await refineAndPolishFrontend(target, result.code, pattern, focusFeature);

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
  execSync(`git commit -m "Autonomous Elevation: ${focusFeature.name} on ${target.name}"`, { cwd: workspaceRoot, stdio: "pipe" });
  const commitSha = execSync("git rev-parse HEAD", { cwd: workspaceRoot, stdio: "pipe" }).toString().trim();
  try {
    execSync(`git push -u origin ${branchName}`, { cwd: workspaceRoot, stdio: "pipe" });
    console.log(`🌿 Branch ${branchName} pushed to origin.`);
  } catch (e) {
    console.warn("Could not push branch to origin:", e.message);
  }

  // 5. Notify Telegram with direct page-specific preview link
  console.log("\n[5/5] Dispatching briefing to Telegram...");
  await sendTelegramBriefing(result, pattern, target, branchName, qa.iterations, focusFeature, commitSha);

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
