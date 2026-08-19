import * as XLSX from "xlsx";

/** Reads the first sheet and writes it out as plain CSV — content and column order carry over. */
export async function xlsxToCsv(file: File): Promise<{ blob: Blob; rows: number; sheet: string }> {
  const workbook = XLSX.read(new Uint8Array(await file.arrayBuffer()), { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error("That workbook has no sheets.");
  const sheet = workbook.Sheets[sheetName];
  const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: "" });
  if (rows.length === 0) throw new Error("That sheet is empty.");

  const csv = XLSX.utils.sheet_to_csv(sheet);
  return { blob: new Blob([csv], { type: "text/csv" }), rows: rows.length, sheet: sheetName };
}
