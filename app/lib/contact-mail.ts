import { contactConfirmationEmail } from "./email-contact-confirmation";
import { contactNotificationEmail } from "./email-contact-notification";

type Mail = { subject: string; html: string; text: string };
const FROM = "Inerate Tools <hello@relay.inerate.com>";
const TO = "support@inerate.com";

/** One Resend send — used for both the internal notification and the visitor's confirmation. */
export function sendMail(key: string, opts: { from: string; to: string[]; replyTo?: string } & Mail) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });
}

/**
 * Sends the internal notification and the visitor's confirmation together.
 * Only the notification can fail the request — the visitor's message already
 * reached us either way, so a slow or bounced auto-reply isn't worth losing it.
 * Returns an error Response on notification failure, or null on success.
 */
export async function sendContactMails(key: string, fields: { name: string; email: string; message: string }) {
  const notification = contactNotificationEmail({ ...fields, subject: "" });
  const confirmation = contactConfirmationEmail({ name: fields.name });

  const [notifyRes, confirmRes] = await Promise.allSettled([
    sendMail(key, { from: FROM, to: [TO], replyTo: fields.email, ...notification }),
    sendMail(key, { from: FROM, to: [fields.email], ...confirmation }),
  ]);

  if (notifyRes.status === "rejected" || !notifyRes.value.ok) {
    // The upstream body can carry account details — log it, never return it.
    const detail = notifyRes.status === "rejected" ? notifyRes.reason : await notifyRes.value.text();
    console.error("Resend notification failed", detail);
    return Response.json({ error: "Could not send your message. Please email us directly." }, { status: 502 });
  }
  if (confirmRes.status === "rejected" || !confirmRes.value.ok) {
    console.error("Resend confirmation failed", confirmRes.status === "rejected" ? confirmRes.reason : await confirmRes.value.text());
  }
  return null;
}
