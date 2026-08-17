import { PDFDocument, type PDFFont, type PDFPage, rgb } from "pdf-lib";
import { wrapText } from "./pdf-wrap";

export const A4 = { w: 595.28, h: 841.89 };
const M = 52;

/**
 * A sequential text cursor over one or more A4 pages.
 * pdf-lib draws at absolute coordinates with no concept of flow, wrapping or
 * page breaks — this adds exactly those three things and nothing more.
 */
export class Writer {
  private page: PDFPage;
  private y: number;
  readonly width = A4.w - M * 2;

  constructor(
    private doc: PDFDocument,
    private fonts: { body: PDFFont; bold: PDFFont },
  ) {
    this.page = doc.addPage([A4.w, A4.h]);
    this.y = A4.h - M;
  }

  private room(need: number) {
    if (this.y - need < M) {
      this.page = this.doc.addPage([A4.w, A4.h]);
      this.y = A4.h - M;
    }
  }

  gap(h: number) {
    this.y -= h;
  }

  text(body: string, { size = 10.5, bold = false, color = 0.15, indent = 0, lead = 1.42 } = {}) {
    if (!body.trim()) return;
    const font = bold ? this.fonts.bold : this.fonts.body;
    const step = size * lead;
    for (const line of wrapText(body, size, font, this.width - indent)) {
      this.room(step);
      this.y -= step;
      this.page.drawText(line, { x: M + indent, y: this.y, size, font, color: rgb(color, color, color) });
    }
  }

  /** Section heading with a hairline rule beneath it. */
  heading(label: string) {
    this.room(34);
    this.gap(14);
    this.text(label.toUpperCase(), { size: 9, bold: true, color: 0.35, lead: 1.1 });
    this.gap(5);
    this.page.drawLine({
      start: { x: M, y: this.y },
      end: { x: A4.w - M, y: this.y },
      thickness: 0.6,
      color: rgb(0.82, 0.82, 0.84),
    });
    this.gap(4);
  }

  /** Bold label left, right-aligned meta on the same baseline (role / dates). */
  row(left: string, right: string, size = 10.5) {
    const step = size * 1.42;
    this.room(step);
    this.y -= step;
    this.page.drawText(left, { x: M, y: this.y, size, font: this.fonts.bold, color: rgb(0.12, 0.12, 0.12) });
    if (!right) return;
    const w = this.fonts.body.widthOfTextAtSize(right, size - 0.5);
    this.page.drawText(right, {
      x: A4.w - M - w,
      y: this.y,
      size: size - 0.5,
      font: this.fonts.body,
      color: rgb(0.42, 0.42, 0.45),
    });
  }
}
