import * as XLSX from "xlsx";
import { rowsToPdf } from "./rows-to-pdf";

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

  return { blob: await rowsToPdf(rows), rows: rows.length, sheet: sheetName };
}
