"use client";

import { useState } from "react";
import { cropPdf, type Insets } from "../lib/crop-pdf";
import { renderPages } from "../lib/pdf-to-image";

const DEFAULT: Insets = { top: 0, bottom: 0, left: 0, right: 0 };

export function useCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ url: string; ratio: number } | null>(null);
  const [insets, setInsets] = useState<Insets>(DEFAULT);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setInsets(DEFAULT);
    setFile(pdf);
    const [p1] = await renderPages(pdf, { format: "jpeg", scale: 1.4, quality: 0.8, limit: 1 });
    if (p1) setPreview({ url: p1.url, ratio: p1.width / p1.height });
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await cropPdf(file, insets);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not crop this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    preview,
    insets,
    setInsets: (next: Insets) => {
      setUrl(null);
      setInsets(next);
    },
    busy,
    url,
    error,
    pick,
    run,
  };
}
