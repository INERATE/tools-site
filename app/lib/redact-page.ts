import type { PDFDocument as PDFLibDoc } from "pdf-lib";
import type { PDFPageProxy } from "pdfjs-dist";

export type Box = { x: number; y: number; w: number; h: number }; // fractions of the page

const SCALE = 2;

/**
 * Rasterizes one page with solid boxes burned into the pixels before
 * encoding — the redacted area (and every other bit of text on that page)
 * has no underlying text object at all in the output, so there is nothing
 * to select or extract. This is why only pages with a redaction get
 * rasterized: it is a real trade of that page's selectable text for a
 * guarantee that nothing under a box survives.
 */
export async function redactPageToImage(out: PDFLibDoc, page: PDFPageProxy, boxes: Box[]) {
  const viewport = page.getViewport({ scale: SCALE });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;

  ctx.fillStyle = "#000000";
  for (const b of boxes) {
    ctx.fillRect(b.x * canvas.width, b.y * canvas.height, b.w * canvas.width, b.h * canvas.height);
  }

  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.9));
  if (!blob) throw new Error("Could not encode a redacted page.");
  const bytes = await blob.arrayBuffer();
  const img = await out.embedJpg(bytes);
  const w = canvas.width / SCALE;
  const h = canvas.height / SCALE;
  const outPage = out.addPage([w, h]);
  outPage.drawImage(img, { x: 0, y: 0, width: w, height: h });
}
