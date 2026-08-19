/**
 * Set NEXT_PUBLIC_AI_ENDPOINT once a real summarization backend exists — a
 * Cloudflare Worker holding the actual API key, never the key itself here.
 * The endpoint receives extracted text (never the file) and returns
 * { summary: string }. Until it's set, AI tools show an honest "not yet
 * available" state instead of a fake result.
 */
export const AI_ENDPOINT = process.env.NEXT_PUBLIC_AI_ENDPOINT ?? "";
export const aiConfigured = AI_ENDPOINT.length > 0;
