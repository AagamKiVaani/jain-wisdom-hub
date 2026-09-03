// ============================================================================
// DESIGN & TECH TREND HUNTER
// Synthesizes cutting-edge UI/UX breakthroughs for spiritual web applications
// ============================================================================

export interface DesignInspiration {
  id: string;
  name: string;
  source: string; // e.g. Awwwards, Godly, Motion Primitives, Aceternity
  concept: string;
  visualKeywords: string[];
  suggestedComponents: string[];
  implementationTips: string;
}

export const DESIGN_PATTERNS_CATALOG: DesignInspiration[] = [
  {
    id: "spatial-3d-card",
    name: "Apple VisionOS Layered Spatial Cards",
    source: "Godly.website & Aceternity UI",
    concept: "Cards with multi-plane 3D depth tilt, dynamic cursor-tracking specular glass glares, and spring touch compression.",
    visualKeywords: ["perspective", "specular glare", "translateZ", "spring physics"],
    suggestedComponents: ["Card3DContainer", "Card3DItem", "FloatingBadges"],
    implementationTips: "Use perspective: 1000px, preserve-3d, and dynamic transform calculations with whileTap: scale 0.97."
  },
  {
    id: "tracing-beam-timeline",
    name: "Aceternity Sacred Tracing Beam",
    source: "Aceternity UI & Awwwards",
    concept: "An illuminated golden light beam that traces the devotee's scroll position along a timeline or chronological scripture progression.",
    visualKeywords: ["scroll-progress", "SVG path motion", "illuminated beam", "glow trail"],
    suggestedComponents: ["TracingBeam", "ChronologicalScrollLine"],
    implementationTips: "Use useScroll() and useSpring() on an SVG gradient path that dynamically lights up as you scroll."
  },
  {
    id: "kinetic-sanskrit-shimmer",
    name: "Gold-Leaf Inscription Kinetic Typography",
    source: "Origin UI & Motion Primitives",
    concept: "Sacred Sanskrit/Prakrit verses rendered with an animated metallic gold-foil shimmer sheen gliding across letterforms on hover or reveal.",
    visualKeywords: ["text-gradient", "shimmer keyframes", "devanagari serif", "brass flourish"],
    suggestedComponents: ["KineticVerse", "GoldFoilText"],
    implementationTips: "Use bg-clip-text with a 200% gradient background and animated background-position."
  },
  {
    id: "celestial-particle-fog",
    name: "Sacred Embers & Stardust Field",
    source: "Casbury Particles & Awwwards",
    concept: "Lightweight HTML5 2D canvas with upward-drifting golden temple embers, pulsing celestial opacity, and mobile throttling.",
    visualKeywords: ["canvas", "celestial stardust", "ambient depth", "zero-jank 60fps"],
    suggestedComponents: ["SacredParticlesCanvas"],
    implementationTips: "Keep particle count below 60 on mobile and 120 on desktop, requestAnimationFrame with opacity cycling."
  },
  {
    id: "tactile-sound-haptics",
    name: "Apple-grade Haptic & Audio Feedback",
    source: "Mobbin & Apple Human Interface Guidelines",
    concept: "Micro-haptic vibration taps (navigator.vibrate) paired with crisp sub-millisecond mechanical/soft audio clicks.",
    visualKeywords: ["audio clicks", "vibration", "tactile response", "micro-interactions"],
    suggestedComponents: ["playTapSound", "HapticButton"],
    implementationTips: "Pre-warm Audio instances and trigger navigator.vibrate(12) on touch devices."
  },
  {
    id: "bento-scripture-grid",
    name: "Editorial Parchment Bento Grid",
    source: "Linear & Bento Grids",
    concept: "Asymmetric bento cards featuring sacred geometric motifs, subtle noise parchment textures, and animated conic border beams.",
    visualKeywords: ["bento", "asymmetric grid", "parchment noise", "border-beam"],
    suggestedComponents: ["BentoGrid", "BentoItem", "BorderBeam"],
    implementationTips: "Combine rounded-3xl, noise overlay, border-zinc-200/90, and CSS keyframe conic border beams."
  }
];

/**
 * Selects an inspiration pattern that has not been recently applied,
 * or allows Gemini to synthesize a new hybrid design.
 */
export function getRecommendedDesignPattern(pageTarget: string): DesignInspiration {
  // Rotate and match best design based on page target
  if (pageTarget.includes("tirthankar")) {
    return DESIGN_PATTERNS_CATALOG.find(p => p.id === "tracing-beam-timeline") || DESIGN_PATTERNS_CATALOG[0];
  }
  if (pageTarget.includes("namokar") || pageTarget.includes("soul")) {
    return DESIGN_PATTERNS_CATALOG.find(p => p.id === "kinetic-sanskrit-shimmer") || DESIGN_PATTERNS_CATALOG[2];
  }
  return DESIGN_PATTERNS_CATALOG[Math.floor(Math.random() * DESIGN_PATTERNS_CATALOG.length)];
}
