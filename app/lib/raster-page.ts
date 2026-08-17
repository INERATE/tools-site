/* Type-only import: pdf.js itself stays out of this module's runtime bundle. */
import type { PDFPageProxy } from "pdfjs-dist";

export type Rendered = { page: number; url: string; width: number; height: number };

export const FORMATS = { png: "image/png", jpeg: "image/jpeg" } as const;
export type Format = keyof typeof FORMATS;

/** Draws one pdf.js page to an off-document canvas and encodes it. */
export async function rasterPage(
  page: PDFPageProxy,
  n: number,
  { format, scale, quality }: { format: Format; scale: number; quality: number },
): Promise<Rendered> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get a 2D canvas context.");

  // JPEG has no alpha: without a white ground, transparent PDF areas go black.
  if (format === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, FORMATS[format], quality));
  page.cleanup();
  if (!blob) throw new Error(`Page ${n} could not be encoded.`);

  return { page: n, url: URL.createObjectURL(blob), width: canvas.width, height: canvas.height };
}
