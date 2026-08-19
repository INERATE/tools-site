export type FieldMatch = { pageIndex: number; kind: "text" | "checkbox"; x: number; y: number; w: number; h: number };

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  return pdfjs;
}

const BLANK_RE = /_{3,}/g;
const CHECKBOX_RE = /\[\s?\]|☐/g;

/**
 * Finds blank-line and checkbox-like patterns in each page's text and maps
 * them back to PDF coordinates — a heuristic (character offset →
 * proportional x-position within a text run), not per-glyph precision.
 */
export async function detectFormFields(file: File): Promise<FieldMatch[]> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  const doc = await task.promise;
  const matches: FieldMatch[] = [];

  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const content = await page.getTextContent();
      for (const item of content.items) {
        if (!("str" in item) || !item.str.trim()) continue;
        const [, , , , x, y] = item.transform;
        for (const [re, kind] of [[BLANK_RE, "text"], [CHECKBOX_RE, "checkbox"]] as const) {
          re.lastIndex = 0;
          for (const m of item.str.matchAll(re)) {
            const start = m.index ?? 0;
            const frac = start / item.str.length;
            const lenFrac = m[0].length / item.str.length;
            matches.push({
              pageIndex: n - 1,
              kind,
              x: x + frac * item.width,
              y,
              w: Math.max(14, lenFrac * item.width),
              h: Math.max(12, item.height),
            });
          }
        }
      }
      page.cleanup();
    }
  } finally {
    await task.destroy();
  }
  return matches;
}
