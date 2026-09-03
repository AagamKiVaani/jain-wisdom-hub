// ============================================================================
// AUTONOMOUS DIGAMBAR ELEVATION AGENT - MASTER ORCHESTRATOR
// Usage: node scripts/run-elevation-agent.ts [--dry-run]
// ============================================================================

import fs from "fs";
import path from "path";
import { auditProjectPages } from "../lib/agent/siteAuditor";
import { getRecommendedDesignPattern } from "../lib/agent/trendHunter";
import { synthesizeElevation } from "../lib/agent/codeSynthesizer";
import { runMultiPassQA } from "../lib/agent/multiPassQA";
import { createElevationBranch, commitElevation } from "../lib/agent/gitBrancher";
import { sendElevationBriefing, waitForUserApproval } from "../lib/agent/telegramCommander";

// Manually load .env.local if not already in process.env
function loadEnv(workspaceRoot: string) {
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

async function runAutonomousElevation() {
  const workspaceRoot = process.cwd();
  loadEnv(workspaceRoot);

  console.log("==================================================================");
  console.log("🕊️ JAIN WISDOM HUB - AUTONOMOUS DIGAMBAR ELEVATION AGENT STARTING");
  console.log("==================================================================");

  // 1. Audit pages and select candidate
  console.log("\n[Step 1/6] Auditing website pages for visual/tactile gaps...");
  const targets = auditProjectPages(workspaceRoot);
  if (targets.length === 0) {
    console.log("All pages currently meet highest visual standards. Skipping elevation.");
    return;
  }

  const selectedTarget = targets[0];
  console.log(`🎯 Selected Target: ${selectedTarget.pageRoute} (Score: ${selectedTarget.currentVisualScore}/10)`);
  console.log(`Missing Features: ${selectedTarget.missingFeatures.join(", ")}`);

  // 2. Select design inspiration
  console.log("\n[Step 2/6] Selecting modern design & motion physics pattern...");
  const inspiration = getRecommendedDesignPattern(selectedTarget.pageRoute);
  console.log(`✨ Applied Pattern: ${inspiration.name} (${inspiration.source})`);

  // 3. Read current code
  const targetFullPath = path.join(workspaceRoot, selectedTarget.sourceFilePath);
  const currentCode = fs.readFileSync(targetFullPath, "utf8");

  // 4. Synthesize upgraded code with Digambar Aagam guardrails
  console.log("\n[Step 3/6] Synthesizing elevated Next.js code with Digambar canonical proofs...");
  const synthesis = await synthesizeElevation(selectedTarget, currentCode, inspiration);
  console.log(`📜 Digambar Source Verified: ${synthesis.digambarProof.shastra} by ${synthesis.digambarProof.author}`);
  console.log(`   Citation: ${synthesis.digambarProof.reference}`);

  // 5. Create isolated Git branch
  console.log("\n[Step 4/6] Creating isolated Git branch...");
  const branchSlug = selectedTarget.pageRoute.replace(/\//g, "").replace(/[^a-zA-Z0-9]/g, "-") || "home";
  const branchName = createElevationBranch(branchSlug, workspaceRoot);
  console.log(`🌿 Branch created: ${branchName}`);

  // 6. Multi-Pass QA & Self-Healing loop
  console.log("\n[Step 5/6] Executing Multi-Pass QA & Typecheck verification...");
  const qaResult = await runMultiPassQA(workspaceRoot, synthesis, 2);

  if (!qaResult.passed) {
    console.error(`❌ Multi-pass QA failed: ${qaResult.error}`);
    console.log("Restoring backup and exiting.");
    return;
  }
  console.log(`✅ Multi-Pass QA PASSED in ${qaResult.iterations} iteration(s)!`);

  // Commit changes
  commitElevation(branchName, `Autonomous Elevation: ${inspiration.name} on ${selectedTarget.pageRoute}`, workspaceRoot);
  console.log("💾 Changes committed to git.");

  // 7. Dispatch Telegram Briefing & wait for user command
  console.log("\n[Step 6/6] Dispatching interactive briefing to Telegram...");
  await sendElevationBriefing(synthesis, branchName, qaResult.iterations);

  console.log("\n==================================================================");
  console.log(`🚀 Briefing sent to Telegram! Awaiting your approval on mobile...`);
  console.log("==================================================================");

  // Background listen for your approval on Telegram
  await waitForUserApproval(branchName, workspaceRoot);
}

runAutonomousElevation().catch(err => {
  console.error("Agent encountered an unrecoverable error:", err);
  process.exit(1);
});
