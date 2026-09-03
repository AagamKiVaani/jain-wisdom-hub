// ============================================================================
// MULTI-PASS QA & SELF-HEALING ENGINE
// Verifies compiler integrity, typesafety, and auto-fixes bugs before proposal.
// ============================================================================

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { queryGemini } from "./geminiClient";
import { SynthesisResult } from "./codeSynthesizer";

export async function runMultiPassQA(
  workspaceRoot: string,
  synthesis: SynthesisResult,
  maxFixAttempts = 2
): Promise<{ passed: boolean; iterations: number; error?: string }> {
  const targetFileFullPath = path.join(workspaceRoot, synthesis.filePath);
  const backup = fs.readFileSync(targetFileFullPath, "utf8");

  let currentCode = synthesis.code;
  let attempts = 0;

  try {
    while (attempts <= maxFixAttempts) {
      // Write candidate code
      fs.writeFileSync(targetFileFullPath, currentCode, "utf8");

      // Run TypeScript compiler verification
      try {
        execSync("node ./node_modules/typescript/bin/tsc --noEmit", {
          cwd: workspaceRoot,
          stdio: "pipe",
          encoding: "utf8"
        });

        // If we reach here, it compiled with 0 errors!
        synthesis.code = currentCode;
        return { passed: true, iterations: attempts + 1 };
      } catch (tscError: any) {
        const errorOutput = tscError.stdout || tscError.stderr || tscError.message;
        attempts++;

        if (attempts > maxFixAttempts) {
          // Restore backup on unresolvable failure
          fs.writeFileSync(targetFileFullPath, backup, "utf8");
          return { passed: false, iterations: attempts, error: errorOutput };
        }

        console.log(`[QA Pass ${attempts}] Found compilation error. Triggering autonomous self-healing...`);

        // Ask Gemini to heal its own code
        const healingPrompt = `
You generated this Next.js TypeScript code, but running 'tsc --noEmit' produced this compilation error:
\`\`\`
${errorOutput}
\`\`\`

CURRENT CODE:
\`\`\`tsx
${currentCode}
\`\`\`

YOUR TASK:
Fix the compilation error completely. Return ONLY the drop-in replacement TSX code. Do not wrap in backticks or markdown, return pure code.
`;

        const fixedCode = await queryGemini(healingPrompt, {
          model: "gemini-3.6-flash",
          temperature: 0.1
        });

        currentCode = fixedCode.replace(/^```tsx?\n?/i, "").replace(/```$/i, "").trim();
      }
    }
  } catch (err: any) {
    fs.writeFileSync(targetFileFullPath, backup, "utf8");
    return { passed: false, iterations: attempts, error: err.message };
  }

  fs.writeFileSync(targetFileFullPath, backup, "utf8");
  return { passed: false, iterations: attempts, error: "Exceeded max fix attempts" };
}
