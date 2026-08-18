"use client";

import { useState } from "react";
import { pdfToPptx } from "../lib/pdf-to-pptx";
import { renderPages } from "../lib/pdf-to-image";

export function usePdfToPptx() {
  const [name, setName] = useState<string | null>(null);
  const [thumb, setThumb] = useState<{ url: string; w: number; h: number } | null>(null);
  const [slideCount, setSlideCount] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setName(pdf.name);
    setBusy(true);
    setProgress(0);
    try {
      const [p1] = await renderPages(pdf, { format: "jpeg", scale: 1, quality: 0.6, limit: 1 });
      if (p1) setThumb({ url: p1.url, w: p1.width, h: p1.height });
      const blob = await pdfToPptx(pdf, (done, total) => {
        setProgress(done / total);
        setSlideCount(total);
      });
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, thumb, slideCount, url, busy, progress, error, pick };
}
