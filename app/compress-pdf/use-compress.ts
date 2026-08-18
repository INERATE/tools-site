"use client";

import { useState } from "react";
import { compressPdf, type CompressLevel } from "../lib/compress-pdf";
import { renderPages } from "../lib/pdf-to-image";

export function useCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ url: string; w: number; h: number } | null>(null);
  const [level, setLevel] = useState<CompressLevel>("balanced");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setFile(pdf);
    const [p1] = await renderPages(pdf, { format: "jpeg", scale: 1, quality: 0.6, limit: 1 });
    if (p1) setPreview({ url: p1.url, w: p1.width, h: p1.height });
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    setProgress(0);
    try {
      const blob = await compressPdf(file, level, (done, total) => setProgress(done / total));
      setOutSize(blob.size);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not compress this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    preview,
    level,
    setLevel: (l: CompressLevel) => {
      setLevel(l);
      setUrl(null);
    },
    busy,
    progress,
    url,
    outSize,
    inSize: file?.size ?? 0,
    error,
    pick,
    run,
  };
}
