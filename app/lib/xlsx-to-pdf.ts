import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import * as XLSX from "xlsx";

const PAGE = { w: 841.89, h: 595.28 }; // A4 landscape — spreadsheets are wide
const MARGIN = 36;
const ROW_H = 16;
const FONT_SIZE = 8;
const MAX_COLS = 12;

/**
 * Reads the first sheet and draws it as a plain grid — content and column
 * order carry over, cell colors/merges/formulas and every sheet after the
 * first do not. Disclosed in the tool's own copy.
 */
export async function xlsxToPdf(file: File): Promise<{ blob: Blob; rows: number; sheet: string }> {
  const workbook = XLSX.read(new Uint8Array(await file.arrayBuffer()), { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error("That workbook has no sheets.");
  const sheet = workbook.Sheets[sheetName];
  const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: "" });
  if (rows.length === 0) throw new Error("That sheet is empty.");

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
  return { blob: new Blob([bytes.slice().buffer], { type: "application/pdf" }), rows: rows.length, sheet: sheetName };
}
