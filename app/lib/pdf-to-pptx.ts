import PptxGenJS from "pptxgenjs";
import { renderPages } from "./pdf-to-image";

/** Spreading a large Uint8Array into String.fromCharCode blows the call-stack argument limit — chunk it. */
function bytesToBase64(bytes: Uint8Array): string {
  const CHUNK = 8192;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/**
 * Rasterizes every PDF page and places it full-bleed on its own slide.
 * Chosen over text/layout reconstruction (like PDF to Word) because slide
 * design is visual-first — an image-per-slide keeps the layout pixel-exact,
 * at the cost of the text no longer being editable in PowerPoint. Disclosed
 * in the tool's own copy.
 */
export async function pdfToPptx(file: File, onProgress?: (done: number, total: number) => void): Promise<Blob> {
  const pages = await renderPages(file, { format: "jpeg", scale: 2, quality: 0.88, onProgress });
  if (pages.length === 0) throw new Error("That PDF has no pages.");

  const pptx = new PptxGenJS();
  const first = pages[0];
  const ratio = first.width / first.height;
  pptx.defineLayout({ name: "PDF_PAGE", width: 10, height: 10 / ratio });
  pptx.layout = "PDF_PAGE";

  for (const page of pages) {
    const bytes = await fetch(page.url).then((r) => r.arrayBuffer());
    const b64 = bytesToBase64(new Uint8Array(bytes));
    const slide = pptx.addSlide();
    slide.addImage({ data: `data:image/jpeg;base64,${b64}`, x: 0, y: 0, w: 10, h: 10 / ratio });
    URL.revokeObjectURL(page.url);
  }

  const out = await pptx.write({ outputType: "blob" });
  return out as Blob;
}
