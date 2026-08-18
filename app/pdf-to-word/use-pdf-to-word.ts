"use client";

import { useState } from "react";
import { pdfToDocx } from "../lib/pdf-to-docx";
import { renderPages } from "../lib/pdf-to-image";

/** Converts on pick, then previews the real .docx output (fed back through mammoth) rather than guessing at it. */
export function usePdfToWord() {
  const [name, setName] = useState<string | null>(null);
  const [thumb, setThumb] = useState<{ url: string; w: number; h: number } | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setPreviewHtml(null);
    setName(pdf.name);
    setBusy(true);
    setProgress(0);
    try {
      const [p1] = await renderPages(pdf, { format: "jpeg", scale: 1, quality: 0.6, limit: 1 });
      if (p1) setThumb({ url: p1.url, w: p1.width, h: p1.height });
      const blob = await pdfToDocx(pdf, (done, total) => setProgress(done / total));
      setUrl(URL.createObjectURL(blob));
      const mammoth = await import("mammoth");
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer: await blob.arrayBuffer() });
      setPreviewHtml(html || "<p><em>No text was found on the page(s).</em></p>");
    } catch (e) {
      setName(null);
      setError(e instanceof Error ? e.message : "That PDF could not be converted.");
    } finally {
      setBusy(false);
    }
  }

  return { name, thumb, previewHtml, url, busy, progress, error, pick };
}
