/**
 * PDF page rasterization via pdf.js. Dynamically imported so its ~1MB only
 * loads on routes that need it; worker served from /public, kept in sync by
 * the `pdfjs:worker` prebuild script.
 */
import { rasterPage, type Format, type Rendered } from "./raster-page";

export { FORMATS } from "./raster-page";
export type { Format, Rendered } from "./raster-page";

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

/** Renders pages to image object URLs. scale 2 ≈ 144dpi. */
export async function renderPages(
  file: File | Blob,
  { format = "png", scale = 2, quality = 0.92, limit, only, onProgress, onPage }: {
    format?: Format;
    scale?: number;
    quality?: number;
    /** Stop after this many pages — the resume preview only needs page 1. */
    limit?: number;
    /** Render exactly these 1-based pages instead of a prefix. */
    only?: number[];
    onProgress?: (done: number, total: number) => void;
    /** Hand each page over the moment it is ready, so grids fill live. */
    onPage?: (page: Rendered) => void;
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
    const wanted = only?.filter((n) => n >= 1 && n <= doc.numPages) ?? [];
    const list = wanted.length ? wanted : Array.from({ length: last }, (_, i) => i + 1);
    for (const n of list) {
      const done = await rasterPage(await doc.getPage(n), n, { format, scale, quality });
      out.push(done);
      onPage?.(done);
      onProgress?.(out.length, list.length);
    }
  } finally {
    await task.destroy();
  }

  return out;
}
