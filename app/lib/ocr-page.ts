import { PDFDocument, TextRenderingMode, setTextRenderingMode, type PDFFont } from "pdf-lib";
import type { Rendered } from "./pdf-to-image";

export type Bbox = { x0: number; y0: number; x1: number; y1: number };
export type Word = { text: string; bbox: Bbox };
type Blocks = { paragraphs: { lines: { words: Word[] }[] }[] }[] | null;

/** tesseract nests recognized text as blocks → paragraphs → lines → words; flatten to what the PDF overlay needs. */
export function flattenWords(blocks: Blocks): Word[] {
  if (!blocks) return [];
  return blocks.flatMap((b) => b.paragraphs.flatMap((p) => p.lines.flatMap((l) => l.words)));
}

/** Draws one rasterized page plus an invisible, positioned text layer over its recognized words. */
export async function drawOcrPage(doc: PDFDocument, font: PDFFont, rendered: Rendered, words: Word[], scale: number) {
  const w = rendered.width / scale;
  const h = rendered.height / scale;
  const page = doc.addPage([w, h]);

  const imgBytes = await fetch(rendered.url).then((r) => r.arrayBuffer());
  const img = await doc.embedJpg(imgBytes);
  page.drawImage(img, { x: 0, y: 0, width: w, height: h });

  page.pushOperators(setTextRenderingMode(TextRenderingMode.Invisible));
  for (const word of words) {
    if (!word.text.trim()) continue;
    const bw = (word.bbox.x1 - word.bbox.x0) / scale;
    const bh = (word.bbox.y1 - word.bbox.y0) / scale;
    const x = word.bbox.x0 / scale;
    const y = h - word.bbox.y1 / scale;
    page.drawText(word.text, { x, y, size: Math.max(4, bh * 0.9), font, maxWidth: bw });
  }
  page.pushOperators(setTextRenderingMode(TextRenderingMode.Fill));
}
