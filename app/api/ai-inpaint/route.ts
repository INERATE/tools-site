import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

const MODEL = "@cf/runwayml/stable-diffusion-v1-5-inpainting";

// In-memory sliding window rate limiter per IP: max 10 inpaint requests/minute
const ipRequests = new Map<string, number[]>();

interface Body {
  image?: string; // base64 data url
  mask?: string;  // base64 data url
  prompt?: string;
}

export async function POST(req: Request) {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "anonymous";
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReqs = 10;

  const timestamps = (ipRequests.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxReqs) {
    return Response.json(
      { error: "Too many requests. Please wait a minute or use Fast Client AI / BYOK." },
      { status: 429 },
    );
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const { image, mask, prompt = "clean natural background, seamless inpainting" } = body;
  if (!image || !mask) {
    return Response.json({ error: "Missing image or mask data." }, { status: 400 });
  }

  try {
    const { env } = getCloudflareContext();
    const ai = (env as { AI?: { run: (m: string, o: unknown) => Promise<ArrayBuffer | Response> } }).AI;
    if (!ai) {
      return Response.json(
        { error: "Cloudflare AI binding is not available in this environment. Please use Fast Client AI." },
        { status: 503 },
      );
    }

    // Convert base64 data URLs to byte arrays
    const imgBase64 = image.includes(",") ? image.split(",")[1] : image;
    const maskBase64 = mask.includes(",") ? mask.split(",")[1] : mask;

    const imgBuffer = Buffer.from(imgBase64, "base64");
    const maskBuffer = Buffer.from(maskBase64, "base64");

    const imgBytes = Array.from(new Uint8Array(imgBuffer));
    const maskBytes = Array.from(new Uint8Array(maskBuffer));

    const res = await ai.run(MODEL, {
      image: imgBytes,
      mask: maskBytes,
      prompt: prompt.trim() || "clean background, high resolution, seamless realistic continuation",
      num_steps: 20,
      guidance: 7.5,
    });

    const buffer = res instanceof Response ? await res.arrayBuffer() : res;
    const base64Out = Buffer.from(buffer).toString("base64");

    return Response.json({
      result: `data:image/png;base64,${base64Out}`,
      provider: "cloudflare",
      model: MODEL,
    });
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message : String(err);
    const quota = /quota|limit|exceed|neuron|capacity|429/i.test(detail);
    return Response.json(
      {
        error: quota
          ? "Cloudflare free daily AI allowance reached. Switch to Fast Client AI or add your own API key."
          : "Cloudflare Workers AI model is currently busy. Please use Fast Client AI.",
        detail,
      },
      { status: quota ? 429 : 502 },
    );
  }
}
