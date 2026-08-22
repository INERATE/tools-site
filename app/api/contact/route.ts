import { clean, looksLikeEmail, readSecret, verifyTurnstile } from "../../lib/contact-request";
import { sendContactMails } from "../../lib/contact-mail";

// The root layout is force-static; a POST handler has to opt back out.
export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 254, message: 5000 };

export async function POST(request: Request) {
  // Set both with: npx wrangler secret put RESEND_API_KEY / TURNSTILE_SECRET_KEY — never in the repo.
  const key = readSecret("RESEND_API_KEY");
  const turnstileSecret = readSecret("TURNSTILE_SECRET_KEY");
  if (!key || !turnstileSecret) return Response.json({ error: "Contact form is not configured." }, { status: 503 });

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
  const turnstileToken = clean(body.turnstileToken, 2048);

  if (!name || !message || !looksLikeEmail(email)) {
    return Response.json({ error: "Please fill in your name, a valid email, and a message." }, { status: 400 });
  }
  if (!turnstileToken) {
    return Response.json({ error: "Please complete the verification check." }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip");
  if (!(await verifyTurnstile(turnstileToken, turnstileSecret, ip))) {
    return Response.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const failure = await sendContactMails(key, { name, email, message });
  return failure ?? Response.json({ ok: true });
}
