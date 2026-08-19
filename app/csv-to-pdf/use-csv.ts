"use client";

import { useState } from "react";
import { csvToPdf } from "../lib/csv-to-pdf";

export function useCsv() {
  const [name, setName] = useState<string | null>(null);
  const [rows, setRows] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const csv = picked.find((f) => f.name.toLowerCase().endsWith(".csv") || f.type === "text/csv");
    if (!csv) return setError(picked.length ? "That file was not a CSV." : null);
    setError(null);
    setUrl(null);
    setName(csv.name);
    setBusy(true);
    try {
      const out = await csvToPdf(csv);
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
