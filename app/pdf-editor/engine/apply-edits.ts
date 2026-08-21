import { PDFDocument } from "pdf-lib";
import type { SignatureElement, WatermarkConfig } from "../element-types";
import type { TextBlock } from "../types";
import { drawSignatures, drawWatermark } from "./apply-overlays";
import { drawBlocks } from "./draw-blocks";
import { embedFontSet } from "./font-pick";

/**
 * Cover-and-redraw export.
 *
 * pdf-lib's drawRectangle/drawText on a loaded page APPEND to the page's
 * content stream — the original operators survive verbatim, wrapped in q/Q.
 * Verified on a 3-page file: editing page 1 left pages 2-3 byte-identical and
 * kept page 1's original 93-byte stream intact as its own array entry. So we
 * never parse or rewrite existing content.
 *
 * The replacement text is drawn over a rectangle filled with the colour
 * sampled from the rendered page at load time (block.bgColor). When
 * block.bgFlat is false the sample sits on a photo/gradient, so the mask will
 * show a faint seam — callers gate export on that via risk.ts rather than
 * pretend every edit is clean.
 */

export interface Overlays {
  watermark?: WatermarkConfig;
  signatures?: SignatureElement[];
}

export async function applyEdits(
  file: File | Blob,
  blocks: TextBlock[],
  overlays: Overlays = {},
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const pages = doc.getPages();

  drawBlocks(pages, blocks, await embedFontSet(doc));

  // Overlays go on last so they sit above any redrawn text.
  if (overlays.watermark) await drawWatermark(doc, pages, overlays.watermark);
  if (overlays.signatures?.length) await drawSignatures(doc, pages, overlays.signatures);

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
