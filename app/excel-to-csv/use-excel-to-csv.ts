"use client";

import { useState } from "react";
import { xlsxToCsv } from "../lib/xlsx-to-csv";

const isXlsx = (f: File) =>
  /\.xlsx$/i.test(f.name) || f.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export function useExcelToCsv() {
  const [name, setName] = useState<string | null>(null);
  const [sheet, setSheet] = useState<string | null>(null);
  const [rows, setRows] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(files: File[]) {
    const xlsx = files.find(isXlsx);
    if (!xlsx) return setError(files.length ? "Pick an .xlsx file — the older .xls format is not readable here." : null);
    setError(null);
    setUrl(null);
    setBusy(true);
    setName(xlsx.name);
    try {
      const out = await xlsxToCsv(xlsx);
      setUrl(URL.createObjectURL(out.blob));
      setRows(out.rows);
      setSheet(out.sheet);
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That workbook could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, sheet, rows, url, busy, error, pick };
}
