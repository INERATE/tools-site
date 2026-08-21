import type { TextBlock } from "../types";
import { buildBlock } from "./build-block";
import { pageSpans, toLines } from "./extract-blocks";
import { readOutline } from "./read-outline";

export interface LoadedPage {
  index: number;
  width: number;
  height: number;
  url: string;
  /** True when pdf.js found no text at all on this page — a scanned/image-only page. */
  scanned: boolean;
}

export interface Bookmark {
  title: string;
  pageIndex: number;
  depth: number;
}

export interface Loaded {
  pages: LoadedPage[];
  blocks: TextBlock[];
  bookmarks: Bookmark[];
}

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

const SCALE = 2;

/** Renders every page and extracts its editable text lines in one pass. */
export async function loadDocument(
  file: File,
  onProgress?: (done: number, total: number) => void,
): Promise<Loaded> {
  const pdfjs = await loadPdfjs();
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const doc = await task.promise;
  const pages: LoadedPage[] = [];
  const blocks: TextBlock[] = [];
  const bookmarks = await readOutline(doc);

  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const p = await doc.getPage(n);
      const view = p.getViewport({ scale: SCALE });
      const canvas = document.createElement("canvas");
      canvas.width = view.width;
      canvas.height = view.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await p.render({ canvas, canvasContext: ctx, viewport: view }).promise;

      const pw = view.width / SCALE;
      const ph = view.height / SCALE;
      const lines = toLines(await pageSpans(p));
      pages.push({ index: n - 1, width: pw, height: ph, url: canvas.toDataURL("image/png"), scanned: lines.length === 0 });

      lines.forEach((line, i) => {
        blocks.push(buildBlock(`p${n - 1}-l${i}`, n - 1, line, ctx, canvas, pw, ph));
      });
      p.cleanup();
      onProgress?.(n, doc.numPages);
      // Yield to the event loop so the progress UI can actually paint between
      // pages — without this the whole parse blocks and the bar jumps 0 to 100.
      await new Promise((r) => setTimeout(r, 0));
    }
  } finally {
    await task.destroy();
  }

  return { pages, blocks, bookmarks };
}
