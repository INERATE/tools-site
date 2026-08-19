"use client";

import { useState } from "react";
import { flattenPdfForm } from "../lib/flatten-pdf-forms";

export function useFlatten() {
  const [name, setName] = useState<string | null>(null);
  const [fieldCount, setFieldCount] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setName(pdf.name);
    setBusy(true);
    try {
      const out = await flattenPdfForm(pdf);
      setUrl(URL.createObjectURL(out.blob));
      setFieldCount(out.fieldCount);
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be flattened.");
    } finally {
      setBusy(false);
    }
  }

  return { name, fieldCount, url, busy, error, pick };
}
