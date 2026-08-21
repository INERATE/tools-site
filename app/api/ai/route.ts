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
  } catch {
    // Most often the daily free allowance is spent. Say so plainly — the UI
    // then points at bring-your-own-key rather than looking broken.
    return Response.json(
      { error: "The free AI allowance is unavailable right now. Add your own API key to keep going." },
      { status: 429 },
    );
  }
}
