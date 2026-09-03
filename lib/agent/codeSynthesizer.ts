// ============================================================================
// CODE SYNTHESIZER WITH DIGAMBAR JAIN GUARDRAILS
// Uses Gemini 3.6 to generate elevated Next.js/React code with verified scripture proofs.
// ============================================================================

import { queryGemini } from "./geminiClient";
import { DIGAMBAR_CANONICAL_RULES, DIGAMBAR_CANONICAL_TEXTS, validateDigambarContent } from "./digambarGuardrails";
import { DesignInspiration } from "./trendHunter";
import { AuditTarget } from "./siteAuditor";

export interface SynthesisResult {
  filePath: string;
  summary: string;
  digambarProof: {
    shastra: string;
    author: string;
    reference: string;
    explanation: string;
  };
  code: string;
  designInspirationApplied: string;
}

export async function synthesizeElevation(
  target: AuditTarget,
  existingCode: string,
  inspiration: DesignInspiration
): Promise<SynthesisResult> {
  const allowedShastrasSummary = DIGAMBAR_CANONICAL_TEXTS.map(t => `- ${t.title} (${t.author}): ${t.description}`).join("\n");

  const prompt = `
You are an expert Frontend Architect specializing in Awwwards/Apple-grade Next.js, Tailwind CSS, and Framer Motion, and a scholar of authentic Digambar Jain Philosophy.

TARGET PAGE: ${target.pageRoute} (${target.sourceFilePath})
CURRENT GAPS: ${target.missingFeatures.join(", ")}
DESIGN INSPIRATION: ${inspiration.name} (${inspiration.concept})

${DIGAMBAR_CANONICAL_RULES}

AUTHORIZED DIGAMBAR CANONICAL SHASTras:
${allowedShastrasSummary}

EXISTING FILE CONTENT:
\`\`\`tsx
${existingCode}
\`\`\`

YOUR TASK:
1. Elevate this component to a 9/10 visual standard applying the design inspiration (e.g. spring physics, 3D cards, noise overlays, sound clicks, tactile micro-interactions).
2. If any theological or scriptural content (verses, descriptions, quotes) is present or added, it MUST be strictly from an authorized Digambar shastra. Cite the exact Shastra, Author, and chapter/gatha reference.
3. Return a JSON object with this exact schema:
{
  "summary": "Concise 2-sentence summary of the visual and tactile elevation.",
  "digambarProof": {
    "shastra": "Exact Digambar Shastra name (e.g. Samayasāra / Tattvārtha Sūtra / Mahāpurāna)",
    "author": "Exact Acharya name (e.g. Acharya Kundkund / Acharya Umaswami)",
    "reference": "Chapter / Gatha / Shloka reference",
    "explanation": "Why this aligns strictly with pure Digambar tradition"
  },
  "code": "The complete, drop-in replacement TSX code for the entire file. Must compile without any missing imports."
}
`;

  const rawJson = await queryGemini(prompt, {
    model: "gemini-3.6-flash",
    jsonMode: true,
    temperature: 0.2
  });

  const parsed = JSON.parse(rawJson);

  // Validate output against Digambar guardrails
  const validation = validateDigambarContent(parsed.code + " " + JSON.stringify(parsed.digambarProof));
  if (!validation.valid) {
    throw new Error(`Digambar Guardrail Rejection: ${validation.reason}`);
  }

  return {
    filePath: target.sourceFilePath,
    summary: parsed.summary,
    digambarProof: parsed.digambarProof,
    code: parsed.code,
    designInspirationApplied: inspiration.name
  };
}
