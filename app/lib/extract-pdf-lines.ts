import type { PDFPageProxy } from "pdfjs-dist";

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

async function pageLines(page: PDFPageProxy): Promise<string[]> {
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

/** Every page's text, flattened into one ordered list of lines — used by Compare PDF and PDF to Word alike. */
export async function extractPdfLines(file: File): Promise<string[]> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  const doc = await task.promise;
  const out: string[] = [];
  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      out.push(...(await pageLines(page)));
      page.cleanup();
    }
  } finally {
    await task.destroy();
  }
  return out;
}
