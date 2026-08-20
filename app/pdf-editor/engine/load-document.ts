import type { TextBlock } from "../types";
import { pageSpans, styleOf, toLines } from "./extract-blocks";
import { matchFont } from "./font-match";

export interface LoadedPage {
  index: number;
  width: number;
  height: number;
  url: string;
}

export interface Loaded {
  pages: LoadedPage[];
  blocks: TextBlock[];
}

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

const SCALE = 2;

/** Renders every page and extracts its editable text lines in one pass. */
export async function loadDocument(file: File): Promise<Loaded> {
  const pdfjs = await loadPdfjs();
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const doc = await task.promise;
  const pages: LoadedPage[] = [];
  const blocks: TextBlock[] = [];

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
      pages.push({ index: n - 1, width: pw, height: ph, url: canvas.toDataURL("image/png") });

      for (const [i, line] of toLines(await pageSpans(p)).entries()) {
        const rawFont = line.spans[0]?.fontName ?? "";
        const style = styleOf(rawFont);
        const match = matchFont(rawFont);
        blocks.push({
          id: `p${n - 1}-l${i}`,
          pageIndex: n - 1,
          pdfX: line.x,
          pdfY: line.y,
          pdfWidth: line.width,
          pdfHeight: line.height,
          relX: line.x / pw,
          // rel* is top-left origin for the DOM overlay; PDF y is bottom-left.
          relY: (ph - line.y - line.height) / ph,
          relWidth: line.width / pw,
          relHeight: line.height / ph,
          text: line.text,
          originalText: line.text,
          fontSize: line.height,
          fontFamily: match.label,
          fontWeight: style.bold ? "bold" : "normal",
          fontStyle: style.italic ? "italic" : "normal",
          color: "#000000",
          align: "left",
          lineHeight: 1.2,
          letterSpacing: 0,
          isEdited: false,
          isNew: false,
          isDeleted: false,
          matchedFontName: match.label,
          matchedFamily: match.family,
          fontMatchConfidence: match.confidence,
        });
      }
      p.cleanup();
    }
  } finally {
    await task.destroy();
  }

  return { pages, blocks };
}
