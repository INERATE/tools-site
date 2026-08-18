import { PDFDocument, StandardFonts } from "pdf-lib";
import { drawOcrPage, flattenWords } from "./ocr-page";
import { renderPages } from "./pdf-to-image";

const SCALE = 2; // renders at ~144dpi for OCR accuracy; bbox coords are divided back by this to land in PDF points

/**
 * Rasterizes every page, runs tesseract.js on each, and rebuilds a PDF with
 * the original page image visible and an invisible text layer positioned
 * over each recognized word — a real searchable/selectable PDF, not just a
 * .txt export. tesseract's model download is the one deliberate exception
 * to "no network" in this suite; the tool's own copy discloses it.
 */
export async function ocrPdf(file: File, onProgress?: (done: number, total: number) => void): Promise<Blob> {
  const { createWorker } = await import("tesseract.js");
  const pages = await renderPages(file, { format: "jpeg", scale: SCALE, quality: 0.9 });
  const worker = await createWorker("eng");

  const out = await PDFDocument.create();
  const font = await out.embedFont(StandardFonts.Helvetica);

  try {
    for (const [i, rendered] of pages.entries()) {
      const { data } = await worker.recognize(rendered.url, {}, { blocks: true });
      await drawOcrPage(out, font, rendered, flattenWords(data.blocks), SCALE);
      URL.revokeObjectURL(rendered.url);
      onProgress?.(i + 1, pages.length);
    }
  } finally {
    await worker.terminate();
  }

  const bytes = await out.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
