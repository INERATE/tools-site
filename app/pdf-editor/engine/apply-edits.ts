import { PDFDocument } from "pdf-lib";
import type { Annotation } from "../annotation-types";
import type { SignatureElement, WatermarkConfig } from "../element-types";
import type { TextBlock } from "../types";
import { drawSignatures, drawWatermark } from "./apply-overlays";
import { drawAnnotations } from "./draw-annotations";
import { drawBlocks } from "./draw-blocks";
import { embedFontSet } from "./font-pick";
import { applyPageOps } from "./page-ops";
import { rasterizeRedacted } from "./rasterize-redacted";

/**
 * Cover-and-redraw export.
 *
 * pdf-lib's drawRectangle/drawText on a loaded page APPEND to the page's
 * content stream — the original operators survive verbatim, wrapped in q/Q.
 * Verified on a 3-page file: editing page 1 left pages 2-3 byte-identical and
 * kept page 1's original 93-byte stream intact as its own array entry.
 *
 * IMPORTANT: covering text is not removing it — the original glyphs stay in
 * the file and remain extractable. That is fine for editing, and unacceptable
 * for redaction, so any page carrying a redaction is rasterized instead
 * (rasterize-redacted.ts) rather than merely painted over.
 */

export interface Overlays {
  watermark?: WatermarkConfig;
  signatures?: SignatureElement[];
  annotations?: Annotation[];
  /** Per-page rotation/deletion, applied last so indices stay stable until then. */
  pageOps?: Record<number, { rotate: number; deleted: boolean }>;
}

export async function applyEdits(
  file: File | Blob,
  blocks: TextBlock[],
  overlays: Overlays = {},
): Promise<Blob> {
  const source = await file.arrayBuffer();
  const doc = await PDFDocument.load(source.slice(0));
  const pages = doc.getPages();
  const annotations = overlays.annotations ?? [];

  drawBlocks(pages, blocks, await embedFontSet(doc));
  await drawAnnotations(doc, pages, annotations);
  if (overlays.watermark) await drawWatermark(doc, pages, overlays.watermark);
  if (overlays.signatures?.length) await drawSignatures(doc, pages, overlays.signatures);
  applyPageOps(doc, overlays.pageOps);

  const bytes = await doc.save();
  const redacted = annotations.filter((a) => a.kind === "redact");
  if (!redacted.length) return new Blob([bytes.slice().buffer], { type: "application/pdf" });

  // Everything above is baked in first, then the redacted pages are flattened
  // so nothing under a black box survives as text.
  return rasterizeRedacted(bytes, redacted);
}
