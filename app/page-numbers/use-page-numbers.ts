"use client";

import { useState } from "react";
import { stampPageNumbers, type NumberPosition, type NumberStyle } from "../lib/stamp-page-numbers";
import { renderPages } from "../lib/pdf-to-image";

export function usePageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [thumb, setThumb] = useState<{ url: string; w: number; h: number } | null>(null);
  const [position, setPosition] = useState<NumberPosition>("bottom-center");
  const [style, setStyle] = useState<NumberStyle>("n");
  const [startAt, setStartAt] = useState(1);
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
    if (!file) return;
    setBusy(true);
    try {
      const blob = await stampPageNumbers(file, { position, style, startAt });
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not number this PDF — it may be encrypted or damaged.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    thumb,
    position,
    setPosition: edit(setPosition),
    style,
    setStyle: edit(setStyle),
    startAt,
    setStartAt: edit(setStartAt),
    busy,
    url,
    error,
    pick,
    run,
  };
}
