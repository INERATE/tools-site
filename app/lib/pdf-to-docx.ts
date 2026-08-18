import { Document, Packer, Paragraph, TextRun } from "docx";
import type { PDFPageProxy } from "pdfjs-dist";

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

/** Groups a page's text items into lines using pdf.js's own line-break flag — a plain-text best effort, not a layout-accurate one. */
async function pageLines(page: PDFPageProxy) {
  const content = await page.getTextContent();
  const lines: string[] = [];
  let line = "";
  for (const item of content.items) {
    if (!("str" in item)) continue;
    line += item.str;
    if ("hasEOL" in item && item.hasEOL) {
      if (line.trim()) lines.push(line.trim());
      line = "";
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

/**
 * Extracts each page's text and rebuilds it as a plain-paragraph .docx —
 * fonts, columns and images are not reconstructed, only reading order and
 * page breaks. Disclosed in the tool's own copy, same as every competitor's
 * "best effort on complex layouts" fine print.
 */
export async function pdfToDocx(file: File, onProgress?: (done: number, total: number) => void): Promise<Blob> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  const doc = await task.promise;
  const paragraphs: Paragraph[] = [];

  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const lines = await pageLines(page);
      lines.forEach((text, i) => {
        paragraphs.push(new Paragraph({ pageBreakBefore: n > 1 && i === 0, children: [new TextRun(text)] }));
      });
      page.cleanup();
      onProgress?.(n, doc.numPages);
    }
  } finally {
    await task.destroy();
  }

  if (paragraphs.length === 0) throw new Error("No selectable text was found — this looks like a scanned PDF.");

  const out = new Document({ sections: [{ children: paragraphs }] });
  return Packer.toBlob(out);
}
