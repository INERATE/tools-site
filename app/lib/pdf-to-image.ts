/**
 * PDF page rasterization via pdf.js. Dynamically imported so its ~1MB only
 * loads on routes that need it; worker served from /public, kept in sync by
 * the `pdfjs:worker` prebuild script.
 */
export type Rendered = { page: number; url: string; width: number; height: number };

export const FORMATS = { png: "image/png", jpeg: "image/jpeg" } as const;
export type Format = keyof typeof FORMATS;

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

/** Renders pages to image object URLs. scale 2 ≈ 144dpi. */
export async function renderPages(
  file: File | Blob,
  { format = "png", scale = 2, quality = 0.92, limit, onProgress }: {
    format?: Format;
    scale?: number;
    quality?: number;
    /** Stop after this many pages — the resume preview only needs page 1. */
    limit?: number;
    onProgress?: (done: number, total: number) => void;
  } = {},
): Promise<Rendered[]> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  // Hold the loading task: destroy() lives on it, not on the document proxy.
  const task = pdfjs.getDocument({ data });
  const doc = await task.promise;
  const out: Rendered[] = [];

  try {
    const last = Math.min(doc.numPages, limit ?? doc.numPages);
    for (let n = 1; n <= last; n++) {
      const page = await doc.getPage(n);
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
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, FORMATS[format], quality),
      );
      page.cleanup();
      if (!blob) throw new Error(`Page ${n} could not be encoded.`);

      out.push({ page: n, url: URL.createObjectURL(blob), width: canvas.width, height: canvas.height });
      onProgress?.(n, last);
    }
  } finally {
    await task.destroy();
  }

  return out;
}
