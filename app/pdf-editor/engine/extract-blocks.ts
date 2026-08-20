import type { PDFPageProxy } from "pdfjs-dist";

/** One run of text as pdf.js reports it, in PDF point space (origin bottom-left). */
export interface Span {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontName: string;
}

/** A line of spans sharing a baseline, then grouped into paragraph blocks. */
export interface Line {
  spans: Span[];
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

const BASELINE_TOL = 2.2; // pt — spans within this share a baseline

/**
 * pdf.js reports an internal font id, but the underlying PostScript name is
 * usually carried in it (e.g. "g_d0_f1" is opaque, but many files yield
 * "Times-Bold" / "ABCDEF+Helvetica-BoldOblique"). Read what we can; Phase 2
 * replaces this with real FontDescriptor-flag matching.
 */
export function styleOf(fontName: string) {
  const n = fontName.toLowerCase();
  return {
    bold: /bold|black|heavy|semibold|[-,]bd\b/.test(n),
    italic: /italic|oblique|[-,]it\b/.test(n),
  };
}

export async function pageSpans(page: PDFPageProxy): Promise<Span[]> {
  const content = await page.getTextContent();
  const out: Span[] = [];
  for (const item of content.items) {
    if (!("str" in item) || !item.str.trim()) continue;
    // transform = [a, b, c, d, e, f]; e/f are the translation, d the vertical scale.
    const [, , , d, e, f] = item.transform;
    out.push({
      str: item.str,
      x: e,
      y: f,
      width: item.width,
      height: Math.abs(d) || item.height,
      fontName: item.fontName,
    });
  }
  return out;
}

/** Groups spans into lines by shared baseline, left-to-right. */
export function toLines(spans: Span[]): Line[] {
  const rows: Span[][] = [];
  for (const s of [...spans].sort((a, b) => b.y - a.y || a.x - b.x)) {
    const row = rows.find((r) => Math.abs(r[0].y - s.y) <= BASELINE_TOL);
    if (row) row.push(s);
    else rows.push([s]);
  }
  return rows.map((row) => {
    const sorted = row.sort((a, b) => a.x - b.x);
    const x = Math.min(...sorted.map((s) => s.x));
    const right = Math.max(...sorted.map((s) => s.x + s.width));
    const height = Math.max(...sorted.map((s) => s.height));
    return {
      spans: sorted,
      x,
      y: sorted[0].y,
      width: right - x,
      height,
      text: sorted.map((s) => s.str).join(""),
    };
  });
}
