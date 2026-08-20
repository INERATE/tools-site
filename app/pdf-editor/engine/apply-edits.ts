import { PDFDocument, rgb } from "pdf-lib";
import type { TextBlock } from "../types";
import { embedFontSet, hexToRgb, pickFont } from "./font-pick";

/**
 * Cover-and-redraw export.
 *
 * pdf-lib's drawRectangle/drawText on a loaded page APPEND to the page's
 * content stream — the original operators survive verbatim, wrapped in q/Q.
 * Verified on a 3-page file: editing page 1 left pages 2-3 byte-identical and
 * kept page 1's original 93-byte stream intact as its own array entry. So we
 * never parse or rewrite existing content.
 *
 * The tradeoff: replacement text is drawn over a rectangle filled with the
 * sampled page background, so a flat background is invisible while a photo or
 * gradient shows a seam. Callers warn before exporting a non-flat edit.
 */

export interface ExportOptions {
  /** Background colour behind a block, sampled from the rendered page. */
  background?: (block: TextBlock) => { r: number; g: number; b: number };
}

const WHITE = { r: 1, g: 1, b: 1 };

export async function applyEdits(
  file: File | Blob,
  blocks: TextBlock[],
  opts: ExportOptions = {},
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const fonts = await embedFontSet(doc);
  const pages = doc.getPages();

  for (const b of blocks) {
    if (!b.isEdited && !b.isDeleted) continue;
    const page = pages[b.pageIndex];
    if (!page) continue;

    const bg = opts.background?.(b) ?? WHITE;
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

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
