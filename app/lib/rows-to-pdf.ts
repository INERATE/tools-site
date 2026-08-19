import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAGE = { w: 841.89, h: 595.28 }; // A4 landscape — tables are wide
const MARGIN = 36;
const ROW_H = 16;
const FONT_SIZE = 8;
const MAX_COLS = 12;

/** Draws rows as a plain grid, paginating as needed. First row rendered bold as a header. */
export async function rowsToPdf(rows: string[][]): Promise<Blob> {
  const cols = Math.min(MAX_COLS, Math.max(...rows.map((r) => r.length)));
  const colWidth = (PAGE.w - MARGIN * 2) / cols;

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([PAGE.w, PAGE.h]);
  let y = PAGE.h - MARGIN;

  rows.forEach((row, r) => {
    if (y < MARGIN + ROW_H) {
      page = doc.addPage([PAGE.w, PAGE.h]);
      y = PAGE.h - MARGIN;
    }
    row.slice(0, cols).forEach((cell, c) => {
      const text = String(cell ?? "").slice(0, 40);
      page.drawText(text, {
        x: MARGIN + c * colWidth,
        y,
        size: FONT_SIZE,
        font: r === 0 ? bold : font,
        color: rgb(0.15, 0.15, 0.17),
      });
    });
    page.drawLine({
      start: { x: MARGIN, y: y - 4 },
      end: { x: PAGE.w - MARGIN, y: y - 4 },
      thickness: 0.4,
      color: rgb(0.85, 0.85, 0.87),
    });
    y -= ROW_H;
  });

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
