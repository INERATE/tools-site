/** node app/api/contact/validate.test.mjs — runs the route's guards with types stripped. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./route.ts", import.meta.url), "utf8");
const guards = src
  .slice(src.indexOf("const clean"), src.indexOf("export async function POST"))
  .replace(/: unknown/g, "")
  .replace(/: number/g, "")
  .replace(/: string/g, "");
const { clean, looksLikeEmail } = new Function(`${guards}; return { clean, looksLikeEmail };`)();

// A CR/LF in a header field is how an attacker forges extra headers — it must
// never survive into the Resend payload.
assert.equal(clean("Piyush\r\nBcc: victim@example.com", 100), "Piyush Bcc: victim@example.com");
assert.ok(!clean("a\nb", 100).includes("\n"), "no newline may survive");

// Length caps hold, and non-strings never reach the mail body.
assert.equal(clean("x".repeat(500), 100).length, 100);
assert.equal(clean(null, 100), "");
assert.equal(clean({ evil: true }, 100), "");
assert.equal(clean(12345, 100), "");

// Empty-ish input is falsy, so the route's own required-field check rejects it.
assert.equal(clean("   ", 100), "");

assert.ok(looksLikeEmail("hq@inerate.com"));
assert.ok(!looksLikeEmail("not-an-email"));
assert.ok(!looksLikeEmail("a@b"), "needs a real TLD");
assert.ok(!looksLikeEmail("a b@c.com"), "no spaces");
assert.ok(!looksLikeEmail(""), "empty is not an address");

console.log("contact validate: all assertions passed");
