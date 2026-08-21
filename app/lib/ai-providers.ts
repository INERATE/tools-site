import { buildPrompt, type AiTask } from "./ai-prompts";

export type ProviderId = "free" | "gemini" | "openai" | "groq";

export const PROVIDERS: { id: ProviderId; label: string; note: string; keyUrl?: string }[] = [
  { id: "free", label: "Free (built in)", note: "Shared daily allowance. Text is sent to our server." },
  { id: "gemini", label: "Google Gemini", note: "Generous free tier.", keyUrl: "https://aistudio.google.com/apikey" },
  { id: "groq", label: "Groq", note: "Very fast, free tier.", keyUrl: "https://console.groq.com/keys" },
  { id: "openai", label: "OpenAI", note: "Paid, billed to your key.", keyUrl: "https://platform.openai.com/api-keys" },
];

/**
 * With a user's own key the browser calls the provider directly — the key
 * never touches our server, and neither does the document. Anthropic is
 * absent on purpose: it needs a header that opts out of its own
 * browser-key protection, which is not a default worth shipping.
 */
export async function runWithKey(
  provider: Exclude<ProviderId, "free">,
  key: string,
  task: AiTask,
  text: string,
  question = "",
): Promise<string> {
  const { system, user } = buildPrompt(task, text.slice(0, 24000), question);

  if (provider === "gemini") {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ parts: [{ text: user }] }],
        }),
      },
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message ?? "Gemini rejected the request.");
    return json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  }

  const base = provider === "groq" ? "https://api.groq.com/openai/v1" : "https://api.openai.com/v1";
  const model = provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? "The provider rejected the request.");
  return json?.choices?.[0]?.message?.content ?? "";
}
