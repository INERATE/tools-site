import { BODY, EYEBROW, FONT, LOGO, SITE, SMALL, TITLE, emailShell, esc, type Mail } from "./email-shell";

/** The auto-reply the visitor receives after submitting the contact form — the one branded touchpoint they get. */
export function contactConfirmationEmail({ name }: { name: string }): Mail {
  const greeting = name ? `Thanks, ${esc(name)}.` : "Thanks.";

  const footer = `      <tr><td align="center" style="padding:26px 16px 0;">
        <p class="dim" style="${SMALL}margin:0 0 10px;">You're receiving this because you messaged Inerate Tools at
          <a href="${SITE}" style="color:#6D28D9;text-decoration:none;">tools.inerate.com</a>.</p>
        <p class="mark" style="font-family:${FONT};font-size:11px;letter-spacing:.22em;color:#54506B;margin:0;">INERATE</p>
      </td></tr>`;

  return {
    subject: "We got your message",
    html: emailShell(
      `        <img src="${LOGO}" width="44" height="44" alt="Inerate Tools" style="display:block;width:44px;height:44px;border:0;border-radius:11px;margin:0 0 26px;">
        <p class="accent" style="${EYEBROW}color:#6D28D9;margin:0 0 10px;">Message received</p>
        <h1 class="t" style="${TITLE}margin:0 0 14px;">${greeting}</h1>
        <p class="dim" style="${BODY}margin:0;">Got your message. We read everything ourselves and reply within two working days.</p>
        <div class="rule" style="border-top:1px solid rgba(24,20,45,.10);margin:28px 0 0;"></div>
        <p class="dim" style="${SMALL}margin:20px 0 0;">Meanwhile, every tool at
          <a href="${SITE}" style="color:#6D28D9;text-decoration:none;">tools.inerate.com</a>
          runs entirely in your browser — nothing you open is ever uploaded.</p>`,
      footer,
    ),
    text: `${name ? `Thanks, ${name}.` : "Thanks."}

Got your message. We read everything ourselves and reply within two working days.

Meanwhile, every tool at tools.inerate.com runs entirely in your browser - nothing you open is ever uploaded.

You're receiving this because you messaged Inerate Tools at tools.inerate.com.

INERATE`,
  };
}
