"use client";

import { useState } from "react";
import { watermarkPdf, type PdfWatermarkPosition } from "../lib/watermark-pdf";
import { renderPages } from "../lib/pdf-to-image";

export function useWatermarkPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [thumb, setThumb] = useState<{ url: string; w: number; h: number } | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [position, setPosition] = useState<PdfWatermarkPosition>("tiled");
  const [opacity, setOpacity] = useState(0.3);
  const [busy, setBusy] = useState(false);
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

  function edit<A extends unknown[]>(setter: (...a: A) => void) {
    return (...a: A) => {
      setUrl(null);
      setter(...a);
    };
  }

  async function run() {
    if (!file || !text.trim()) return;
    setBusy(true);
    try {
      const blob = await watermarkPdf(file, { text: text.trim(), position, opacity });
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not watermark this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    thumb,
    text,
    setText: edit(setText),
    position,
    setPosition: edit(setPosition),
    opacity,
    setOpacity: edit(setOpacity),
    busy,
    url,
    error,
    pick,
    run,
  };
}
