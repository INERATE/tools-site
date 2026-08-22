import { getCloudflareContext } from "@opennextjs/cloudflare";

// The root layout is force-static; a POST handler has to opt back out.
export const dynamic = "force-dynamic";

const FROM = "Inerate Tools <hello@relay.inerate.com>";
const TO = "support@inerate.com";
const LIMITS = { name: 100, email: 254, message: 5000 };

/** Header injection: a newline in a header field can forge extra headers. */
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function POST(request: Request) {
  // Set with: npx wrangler secret put RESEND_API_KEY — never in the repo.
  const { env } = getCloudflareContext();
  const key = (env as { RESEND_API_KEY?: string }).RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Contact form is not configured." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see, so anything
  // in it is a bot. Answer 200 so the bot has no signal to adapt to.
  if (clean(body.company, 50)) return Response.json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (!name || !message || !looksLikeEmail(email)) {
    return Response.json({ error: "Please fill in your name, a valid email, and a message." }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    // The upstream body can carry account details — log it, never return it.
    console.error("Resend send failed", res.status, await res.text());
    return Response.json({ error: "Could not send your message. Please email us directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
