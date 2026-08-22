import { BODY, EYEBROW, SMALL, TITLE, emailShell, esc, type Mail } from "./email-shell";

type Fields = { name: string; email: string; subject: string; message: string };

/** Internal mail to support@inerate.com. The caller sets reply_to to the visitor. */
export function contactNotificationEmail({ name, email, subject, message }: Fields): Mail {
  const line = (label: string, value: string) =>
    `<tr><td style="${SMALL}padding:0 0 6px;"><span class="dim" style="color:#54506B;">${esc(label)}</span>
      <span class="t" style="color:#191722;">${esc(value)}</span></td></tr>`;

  return {
    subject: `Contact form: ${subject || name}`,
    html: emailShell(`        <p class="dim" style="${EYEBROW}color:#54506B;margin:0 0 10px;">New contact message</p>
        <h1 class="t" style="${TITLE}margin:0 0 20px;">${esc(subject || name)}</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">
${line("From", name)}
${line("Email", email)}
        </table>
        <div class="rule" style="border-top:1px solid rgba(24,20,45,.10);margin:0 0 20px;"></div>
        <p class="t" style="${BODY}color:#191722;margin:0;white-space:pre-wrap;">${esc(message).replace(/\n/g, "<br>")}</p>
        <p class="dim" style="${SMALL}margin:24px 0 0;">Hit reply to answer ${esc(name)} directly.
          Sent from the contact form at tools.inerate.com.</p>`),
    text: `New contact message\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject || "(none)"}\n\n${message}\n\nHit reply to answer ${name} directly. Sent from the contact form at tools.inerate.com.`,
  };
}
