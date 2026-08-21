import { getCloudflareContext } from "@opennextjs/cloudflare";
import { buildPrompt, type AiTask } from "../../lib/ai-prompts";

// The root layout is force-static; a POST handler has to opt back out.
export const dynamic = "force-dynamic";

// llama-3.1-8b-instruct was deprecated 2026-05-30 and now hard-fails. The
// -fast variant is current and carries a 128k context instead of 7,968.
const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
/** The model would take far more, but the free allowance is shared by every
 *  visitor, so one long document must not be able to spend it all. */
const MAX_CHARS = 24000;

interface Body {
  text?: string;
  task?: AiTask;
  question?: string;
}

// In-memory sliding window rate limiter per IP: max 10 requests/minute
const ipRequests = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "anonymous";
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReqs = 10;

  const timestamps = (ipRequests.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxReqs) {
    return Response.json(
      { error: "Too many requests. Please wait a minute or use your own API key." },
      { status: 429 },
    );
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  // Clean old IPs periodically
  if (ipRequests.size > 5000) {
    for (const [k, v] of ipRequests.entries()) {
      if (v.every((t) => now - t >= windowMs)) ipRequests.delete(k);
    }
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) return Response.json({ error: "No document text was sent." }, { status: 400 });

  const task: AiTask = body.task ?? "summarize";
  if (task === "qa" && !body.question?.trim()) {
    return Response.json({ error: "Ask a question first." }, { status: 400 });
  }

  const truncated = text.length > MAX_CHARS;
  const { system, user } = buildPrompt(task, text.slice(0, MAX_CHARS), body.question ?? "");

  try {
    const { env } = getCloudflareContext();
    const ai = (env as { AI?: { run: (m: string, o: unknown) => Promise<{ response?: string }> } }).AI;
    if (!ai) return Response.json({ error: "AI is not configured on this deployment." }, { status: 503 });

    const out = await ai.run(MODEL, {
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    return Response.json({ result: out.response ?? "", truncated, model: MODEL });
  } catch (err) {
    // Running out of the daily allowance and the model genuinely failing look
    // nothing alike to an operator, so do not collapse them into one message.
    const detail = err instanceof Error ? err.message : String(err);
    const quota = /quota|limit|exceed|neuron|capacity|429/i.test(detail);
    return Response.json(
      {
        error: quota
          ? "The free AI allowance is used up for today. Add your own API key to keep going."
          : "The AI request failed. Add your own API key to keep going.",
        detail,
      },
      { status: quota ? 429 : 502 },
    );
  }
}
