import { getCloudflareContext } from "@opennextjs/cloudflare";
import { buildPrompt, type AiTask } from "../../lib/ai-prompts";

// The root layout is force-static; a POST handler has to opt back out.
export const dynamic = "force-dynamic";

const MODEL = "@cf/meta/llama-3.1-8b-instruct";
/** Free-tier budget is shared by everyone, so one request cannot eat it all. */
const MAX_CHARS = 12000;

interface Body {
  text?: string;
  task?: AiTask;
  question?: string;
}

export async function POST(req: Request) {
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
