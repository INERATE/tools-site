"use client";

import { useState } from "react";
import { makeSmartForm } from "../lib/smart-pdf-forms";

export function useSmartForm() {
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
      const out = await makeSmartForm(pdf);
      setUrl(URL.createObjectURL(out.blob));
      setFieldCount(out.fieldCount);
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be processed.");
    } finally {
      setBusy(false);
    }
  }

  return { name, fieldCount, url, busy, error, pick };
}
