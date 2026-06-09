export type ChatRole = "user" | "model";
export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const SYSTEM_PROMPT =
  "You are the Gemini AI Copilot for AdmitOS (by BGD). You act as an elite, analytical admissions consultant for Ivy League and top-tier universities. Focus on actionable advice, PDCA cycles, bottleneck elimination, and risk management. Keep answers concise, highly strategic, and formatted cleanly.";

export class MissingApiKeyError extends Error {
  constructor() {
    super("MISSING_GEMINI_API_KEY");
    this.name = "MissingApiKeyError";
  }
}

export async function sendGeminiMessage(
  history: ChatMessage[],
  model = "gemini-1.5-flash",
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) throw new MissingApiKeyError();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    systemInstruction: { role: "system", parts: [{ text: SYSTEM_PROMPT }] },
    contents: history.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ??
    "";
  if (!text) throw new Error("Empty response from Gemini.");
  return text;
}
