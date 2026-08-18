"use client";

import { useState } from "react";
import { xlsxToPdf } from "../lib/xlsx-to-pdf";
import { renderPages, type Rendered } from "../lib/pdf-to-image";

const isXlsx = (f: File) =>
  /\.xlsx$/i.test(f.name) || f.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export function useExcelToPdf() {
  const [name, setName] = useState<string | null>(null);
  const [sheet, setSheet] = useState<string | null>(null);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState<Rendered[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const xlsx = picked.find(isXlsx);
    if (!xlsx) return setError(picked.length ? "Pick an .xlsx file — the older .xls format is not readable here." : null);
    setError(null);
    setUrl(null);
    setPages([]);
    setName(xlsx.name);
    setBusy(true);
    try {
      const out = await xlsxToPdf(xlsx);
      setUrl(URL.createObjectURL(out.blob));
      setRows(out.rows);
      setSheet(out.sheet);
      const shots = await renderPages(out.blob, { scale: 1.3, format: "jpeg", quality: 0.85 });
      setPages(shots);
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That workbook could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, sheet, rows, pages, url, busy, error, pick };
}
