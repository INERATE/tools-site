/**
 * The shared chrome for both contact-form emails: the <head>, the dark-mode
 * block, and the centred 480px card.
 *
 * Email is not the web. There is no JS, no external CSS, no blur — so the
 * site's glass look is translated honestly: a solid card, a 1px border, a
 * soft shadow. Dark mode needs a real <style> block (inline styles cannot
 * hold a media query), and every dark rule needs !important to beat the
 * inline light-mode fallback that clients stripping <style> fall back to.
 */

export type Mail = { subject: string; html: string; text: string };

export const SITE = "https://tools.inerate.com";
export const LOGO = "https://tools.inerate.com/icon.png";
export const FONT = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

/** Everything here is user input from a public form — escape before it hits HTML. */
export const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** `footer` renders quietly below the card, outside it. */
export function emailShell(body: string, footer = "") {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  body { margin:0; padding:0; width:100%; background:#F2F1F7; }
  a { color:#6D28D9; }
  @media (prefers-color-scheme: dark) {
    body, .wrap { background:#0B0A14 !important; }
    .card { background:#161422 !important; border-color:rgba(255,255,255,.10) !important;
            box-shadow:0 1px 2px rgba(0,0,0,.55), 0 14px 36px rgba(0,0,0,.40) !important; }
    .t { color:#F4F2FF !important; }
    .dim, .mark { color:#ADA6C9 !important; }
    .accent, a { color:#A78BFA !important; }
    .rule { border-color:rgba(255,255,255,.10) !important; }
  }
</style>
</head>
<body class="wrap" style="margin:0;padding:0;background:#F2F1F7;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="wrap" style="background:#F2F1F7;">
  <tr><td align="center" style="padding:40px 20px;">
    <table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:480px;">
      <tr><td class="card" style="background:#FFFFFF;border:1px solid rgba(24,20,45,.10);border-radius:16px;padding:40px 36px;box-shadow:0 1px 2px rgba(24,20,45,.05),0 14px 36px rgba(24,20,45,.07);font-family:${FONT};">
${body}
      </td></tr>
${footer}
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export const EYEBROW = `font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;`;
export const TITLE = `font-family:${FONT};font-size:24px;line-height:1.25;font-weight:600;letter-spacing:-.02em;color:#191722;`;
export const BODY = `font-family:${FONT};font-size:16px;line-height:1.6;color:#54506B;`;
export const SMALL = `font-family:${FONT};font-size:13px;line-height:1.55;color:#54506B;`;
