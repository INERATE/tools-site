import * as XLSX from "xlsx";

/** Reads CSV text straight into a workbook — SheetJS parses CSV natively, no hand-rolled parser needed. */
export async function csvToXlsx(file: File): Promise<{ blob: Blob; rows: number }> {
  const text = await file.text();
  const workbook = XLSX.read(text, { type: "string" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error("That CSV could not be read.");
  const sheet = workbook.Sheets[sheetName];
  const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: "" });
  if (rows.length === 0) throw new Error("That CSV is empty.");

  const out = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  return {
    blob: new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    rows: rows.length,
  };
}
