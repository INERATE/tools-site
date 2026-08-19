"use client";

import { useState } from "react";
import { csvToXlsx } from "../lib/csv-to-xlsx";

export function useCsvToExcel() {
  const [name, setName] = useState<string | null>(null);
  const [rows, setRows] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(files: File[]) {
    const file = files[0];
    if (!file) return;
    setError(null);
    setUrl(null);
    setBusy(true);
    setName(file.name);
    try {
      const out = await csvToXlsx(file);
      setUrl(URL.createObjectURL(out.blob));
      setRows(out.rows);
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That CSV could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, rows, url, busy, error, pick };
}
