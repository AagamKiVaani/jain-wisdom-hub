// ============================================================================
// SITE AUDITOR & ELEVATION TARGET SELECTOR
// Scans the codebase to identify under-elevated sections needing visual upgrade.
// ============================================================================

import fs from "fs";
import path from "path";

export interface AuditTarget {
  pageRoute: string;
  sourceFilePath: string;
  currentVisualScore: number; // 1 to 10
  missingFeatures: string[];
  recommendedUpgrade: string;
  reason: string;
}

export function auditProjectPages(workspaceRoot: string): AuditTarget[] {
  const targets: AuditTarget[] = [];

  const candidatePages = [
    {
      route: "/tirthankar",
      relPath: "app/[lang]/tirthankar/page.tsx",
      name: "Tirthankar Gallery"
    },
    {
      route: "/soul-karma",
      relPath: "app/[lang]/soul-karma/page.tsx",
      name: "Soul & Karma Page"
    },
    {
      route: "/kalchakra",
      relPath: "app/[lang]/kalchakra/page.tsx",
      name: "Wheel of Time (Kalchakra)"
    },
    {
      route: "/namokar-mantra",
      relPath: "app/[lang]/namokar-mantra/page.tsx",
      name: "Namokar Mantra Page"
    },
    {
      route: "/",
      relPath: "app/[lang]/page.tsx",
      name: "Home Page"
    },
    {
      route: "/resources",
      relPath: "app/[lang]/resources/page.tsx",
      name: "Resources & Notes"
    }
  ];

  for (const page of candidatePages) {
    const fullPath = path.join(workspaceRoot, page.relPath);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    const missing: string[] = [];
    let score = 5;

    // Check for tactile sounds
    if (!content.includes("playTapSound") && !content.includes("click2.mp3")) {
      missing.push("Audio tactile micro-haptics");
      score -= 1;
    } else {
      score += 1;
    }

    // Check for 3D physics
    if (!content.includes("Card3D") && !content.includes("perspective")) {
      missing.push("3D spatial perspective tilt");
      score -= 1;
    } else {
      score += 1.5;
    }

    // Check for particle atmosphere
    if (!content.includes("SacredParticlesCanvas")) {
      missing.push("Celestial stardust canvas atmosphere");
    } else {
      score += 1;
    }

    // Check for noise overlay
    if (!content.includes("noise-overlay")) {
      missing.push("Archival parchment glass texture");
    }

    // Check for kinetic typography or border beam
    if (!content.includes("BorderBeam")) {
      missing.push("Conic border beam highlights");
    }

    score = Math.max(2, Math.min(10, score));

    targets.push({
      pageRoute: page.route,
      sourceFilePath: page.relPath,
      currentVisualScore: score,
      missingFeatures: missing,
      recommendedUpgrade: missing.length > 0 ? missing[0] : "Fine polish & responsive optimization",
      reason: `${page.name} currently scores ${score}/10 with ${missing.length} visual/tactile upgrades pending.`
    });
  }

  // Sort so the lowest visual score / highest need comes first!
  return targets.sort((a, b) => a.currentVisualScore - b.currentVisualScore);
}
