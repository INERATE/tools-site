import { rgb, type PDFPage } from "pdf-lib";
import type { TextBlock } from "../types";
import { hexToRgb, pickFont, type FontSet } from "./font-pick";

const WHITE = { r: 1, g: 1, b: 1 };

/** Masks each edited block's original glyphs and redraws the new text on top. */
export function drawBlocks(pages: PDFPage[], blocks: TextBlock[], fonts: FontSet) {
  for (const b of blocks) {
    if (!b.isEdited && !b.isDeleted) continue;
    const page = pages[b.pageIndex];
    if (!page) continue;

    const bg = b.bgColor ?? WHITE;
    // pdfY is the BASELINE. Glyphs run from ~0.25em below it (descenders on
    // g/p/y) to ~1.0em above (ascenders/caps), so a rect anchored at the
    // baseline leaves descender stubs showing — caught on a real export.
    const size = b.fontSize;
    page.drawRectangle({
      x: b.pdfX - size * 0.1,
      y: b.pdfY - size * 0.28,
      width: b.pdfWidth + size * 0.2,
      height: size * 1.32,
      color: rgb(bg.r, bg.g, bg.b),
    });

    if (b.isDeleted || !b.text.trim()) continue;

    const c = hexToRgb(b.color);
    page.drawText(b.text, {
      x: b.pdfX,
      y: b.pdfY,
      size: b.fontSize,
      font: pickFont(b, fonts),
      color: rgb(c.r, c.g, c.b),
    });
  }
}
