import { PDFDocument } from "pdf-lib";
import type { Annotation } from "../annotation-types";
import { redactPageToImage, type Box } from "../../lib/redact-page";

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

/**
 * Flattens only the pages carrying a redaction, so the covered text has no
 * underlying text object left to select or extract. Pages without one are
 * copied through untouched and keep their vector text — the same trade the
 * standalone Redact PDF tool makes, reusing its exact page rasterizer.
 */
export async function rasterizeRedacted(pdfBytes: Uint8Array, redactions: Annotation[]): Promise<Blob> {
  const byPage: Record<number, Box[]> = {};
  for (const a of redactions) {
    if (a.kind !== "redact") continue;
    (byPage[a.pageIndex] ??= []).push({ x: a.relX, y: a.relY, w: a.relWidth, h: a.relHeight });
  }

  const pdfjs = await loadPdfjs();
  const task = pdfjs.getDocument({ data: new Uint8Array(pdfBytes.slice(0)) });
  const srcDoc = await task.promise;
  const src = await PDFDocument.load(pdfBytes.slice(0));
  const out = await PDFDocument.create();

  try {
    for (let i = 0; i < src.getPageCount(); i++) {
      const boxes = byPage[i];
      if (!boxes?.length) {
        const [copy] = await out.copyPages(src, [i]);
        out.addPage(copy);
        continue;
      }
      const page = await srcDoc.getPage(i + 1);
      await redactPageToImage(out, page, boxes);
      page.cleanup();
    }
  } finally {
    await task.destroy();
  }

  const bytes = await out.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
