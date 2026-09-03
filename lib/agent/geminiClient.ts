// ============================================================================
// GEMINI 3.6 CLIENT FOR AUTONOMOUS ELEVATION AGENT
// Direct REST interface to Google AI Studio with structured JSON support.
// ============================================================================

export interface GeminiRequestOptions {
  model?: string;
  systemInstruction?: string;
  temperature?: number;
  jsonMode?: boolean;
}

export async function queryGemini(prompt: string, options: GeminiRequestOptions = {}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables (.env.local)");
  }

  const model = options.model || "gemini-3.6-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body: any = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.3,
    }
  };

  if (options.jsonMode) {
    body.generationConfig.responseMimeType = "application/json";
  }

  if (options.systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: options.systemInstruction }]
    };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  throw new Error(`Gemini API Error: ${JSON.stringify(data)}`);
}
