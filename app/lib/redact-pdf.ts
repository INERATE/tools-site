import { PDFDocument } from "pdf-lib";
import { redactPageToImage, type Box } from "./redact-page";

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

/**
 * Pages with a redaction box are rasterized (no text survives anywhere on
 * that page); pages with none are copied as untouched vector pages, so a
 * document isn't degraded beyond what was actually marked.
 */
export async function redactPdf(file: File, boxesByPage: Record<number, Box[]>): Promise<Blob> {
  const pdfjs = await loadPdfjs();
  const bytes = await file.arrayBuffer();
  // pdf.js's worker transfers (detaches) the buffer it's handed, so pdf-lib needs its own copy.
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes.slice(0)) });
  const srcDoc = await task.promise;
  const src = await PDFDocument.load(new Uint8Array(bytes.slice(0)));
  const out = await PDFDocument.create();

  try {
    for (let i = 0; i < src.getPageCount(); i++) {
      const boxes = boxesByPage[i];
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

  const outBytes = await out.save();
  return new Blob([outBytes.slice().buffer], { type: "application/pdf" });
}
