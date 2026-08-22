/** node app/lib/email-contact.test.mjs — runs the real source (3 files) with types stripped. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const strip = (file) =>
  readFileSync(new URL(file, import.meta.url), "utf8")
    .replace(/^import .*$/gm, "")
    .replace(/^export /gm, "")
    .replace(/^type .*$/gm, "")
    .replace(/: (Mail|ContactFields|Fields)/g, "")
    .replace(/: \{ name: string \}/g, "")
    .replace(/: string/g, "");

// Shell first — the two templates call emailShell() at module-eval time inside
// their own function bodies, so declaration order just needs shell to exist
// before either function is *called*, which new Function's hoisting covers
// either way; keeping this order matches the real import graph regardless.
const src = [strip("./email-shell.ts"), strip("./email-contact-notification.ts"), strip("./email-contact-confirmation.ts")].join(
  "\n",
);
const { contactNotificationEmail, contactConfirmationEmail } = new Function(
  `${src}; return { contactNotificationEmail, contactConfirmationEmail };`,
)();

const notify = contactNotificationEmail({
  name: "Piyush",
  email: "hq@inerate.com",
  subject: "Broken PDF split",
  message: "Page 3 comes out blank.",
});
const confirm = contactConfirmationEmail({ name: "Piyush" });

for (const [label, mail] of [
  ["notification", notify],
  ["confirmation", confirm],
]) {
  // A blank field anywhere means Resend sends an empty or subject-less email.
  assert.ok(mail.subject.length > 0, `${label}: needs a subject`);
  assert.ok(mail.html.length > 0, `${label}: needs html`);
  assert.ok(mail.text.length > 0, `${label}: needs text`);

  // Inline styles cannot express a media query — losing this block silently
  // ships a white card into every dark-mode inbox.
  assert.ok(mail.html.includes("prefers-color-scheme"), `${label}: dark mode block missing`);
  assert.ok(mail.html.includes("tools.inerate.com"), `${label}: must name the site`);

  // Both dark and light backgrounds must be explicit, or client chrome bleeds through.
  assert.ok(mail.html.includes("#F2F1F7") && mail.html.includes("#0B0A14"), `${label}: both bg tokens`);

  // The name is the whole point of a personalised email — a dropped
  // interpolation would still render, just addressed to nobody.
  assert.ok(mail.html.includes("Piyush"), `${label}: name not interpolated`);

  // A hand-written plain-text part, not a tag-strip that missed something.
  assert.ok(!/<[a-z!/]/i.test(mail.text), `${label}: text part contains html`);
}

assert.equal(notify.subject, "Contact form: Broken PDF split");
assert.equal(contactNotificationEmail({ name: "Piyush", email: "a@b.co", subject: "", message: "hi" }).subject,
  "Contact form: Piyush", "falls back to the name when no subject was given");

// Images are blocked by default in many clients, but the src must still be the
// absolute production URL — a relative path can never resolve from an inbox.
assert.ok(confirm.html.includes("https://tools.inerate.com/icon.png"), "logo must be absolute");
assert.ok(/INERATE/.test(confirm.html), "text wordmark must survive image blocking");

// This is fed raw form input in production: an unescaped name is stored XSS in
// whatever webmail renders it.
const evil = contactConfirmationEmail({ name: `<script>alert(1)</script> & "co"` });
assert.ok(!evil.html.includes("<script>"), "script tag must be escaped");
assert.ok(evil.html.includes("&lt;script&gt;"), "escaped form should be present");
assert.ok(!/&(?!amp;|lt;|gt;|quot;|#39;)/.test(evil.html), "no bare & may survive anywhere in the document");
assert.ok(evil.html.includes("&amp;"), "ampersand must be escaped");

const evilNotify = contactNotificationEmail({
  name: "a & b",
  email: "x@y.co",
  subject: "<b>bold</b>",
  message: `<img src=x onerror=alert(1)>`,
});
assert.ok(!evilNotify.html.includes("<img src=x"), "message must not inject html");
assert.ok(!evilNotify.html.includes("<b>bold</b>"), "subject must not inject html");
assert.ok(evilNotify.subject.includes("<b>bold</b>"), "the mail subject header is not html, so it stays verbatim");

console.log("email-contact: all assertions passed");
