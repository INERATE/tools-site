"use client";

import { useState } from "react";
import { ocrPdf } from "../lib/ocr-pdf";
import { renderPages } from "../lib/pdf-to-image";

export function useOcr() {
  const [file, setFile] = useState<File | null>(null);
  const [thumb, setThumb] = useState<{ url: string; w: number; h: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setFile(pdf);
    const [p1] = await renderPages(pdf, { format: "jpeg", scale: 1, quality: 0.6, limit: 1 });
    if (p1) setThumb({ url: p1.url, w: p1.width, h: p1.height });
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    setProgress(0);
    try {
      const blob = await ocrPdf(file, (done, total) => setProgress(done / total));
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("OCR failed on this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return { file, thumb, busy, progress, url, error, pick, run };
}
