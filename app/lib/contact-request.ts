import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Header injection: a newline in a header field can forge extra headers. */
export const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

export const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** The Workers binding is the source in production; process.env covers local runs. */
export function readSecret(name: string) {
  try {
    const { env } = getCloudflareContext();
    const bound = (env as Record<string, string | undefined>)[name];
    if (bound) return bound;
  } catch {
    // No Workers context (plain `next dev`) — fall through to the environment.
  }
  return process.env[name];
}

/** Calls Cloudflare's siteverify endpoint — the only way to trust a Turnstile token was solved by this page, not replayed. */
export async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
