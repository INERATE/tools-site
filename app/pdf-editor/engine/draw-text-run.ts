import { rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { TextBlock } from "../types";

/**
 * Draws one edited line with the styling the toolbar offers.
 *
 * pdf-lib's drawText has no notion of underline, strikethrough, alignment or
 * letter spacing, so each is applied here — otherwise those controls would
 * change the screen and quietly do nothing to the exported file, which is
 * worse than not offering them.
 */
export function drawTextRun(
  page: PDFPage,
  b: TextBlock,
  font: PDFFont,
  color: { r: number; g: number; b: number },
) {
  const size = b.fontSize;
  const tracking = b.letterSpacing || 0;
  const ink = rgb(color.r, color.g, color.b);
  const width = font.widthOfTextAtSize(b.text, size) + tracking * Math.max(0, b.text.length - 1);

  // Alignment is an x offset inside the block's own box. Justify has no second
  // line to stretch against here, so it lays out like left.
  let x = b.pdfX;
  if (b.align === "center") x = b.pdfX + (b.pdfWidth - width) / 2;
  else if (b.align === "right") x = b.pdfX + (b.pdfWidth - width);

  if (tracking === 0) {
    page.drawText(b.text, { x, y: b.pdfY, size, font, color: ink });
  } else {
    // Per-character placement is the only way to space glyphs apart; it costs
    // kerning, which is why it is skipped entirely when tracking is zero.
    let cursor = x;
    for (const ch of b.text) {
      page.drawText(ch, { x: cursor, y: b.pdfY, size, font, color: ink });
      cursor += font.widthOfTextAtSize(ch, size) + tracking;
    }
  }

  const rule = (y: number) =>
    page.drawLine({
      start: { x, y },
      end: { x: x + width, y },
      thickness: Math.max(0.5, size * 0.055),
      color: ink,
    });

  if (b.underline) rule(b.pdfY - size * 0.12);
  if (b.strikethrough) rule(b.pdfY + size * 0.26);
}
