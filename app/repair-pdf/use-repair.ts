"use client";

import { useState } from "react";
import { repairPdf } from "../lib/repair-pdf";
import { renderPages } from "../lib/pdf-to-image";

export function useRepair() {
  const [file, setFile] = useState<File | null>(null);
  const [thumb, setThumb] = useState<{ url: string; w: number; h: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setThumb(null);
    setFile(pdf);
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await repairPdf(file);
      setUrl(URL.createObjectURL(blob));
      const [p1] = await renderPages(blob, { format: "jpeg", scale: 1, quality: 0.7, limit: 1 });
      if (p1) setThumb({ url: p1.url, w: p1.width, h: p1.height });
    } catch {
      setError("This PDF is too damaged to recover — key data appears to be missing, not just misordered.");
    } finally {
      setBusy(false);
    }
  }

  return { file, thumb, busy, url, error, pick, run };
}
