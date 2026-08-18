"use client";

import { useState } from "react";
import { moveItem } from "../lib/arrange";
import { assembleImagesToPdf, type ImageItem } from "../lib/assemble-images-pdf";

function readImage(file: File): Promise<ImageItem> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ id: crypto.randomUUID(), file, url, w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  });
}

export function useImageToPdf() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function addFiles(picked: File[]) {
    const valid = picked.filter((f) => f.type === "image/jpeg" || f.type === "image/png");
    if (valid.length === 0) return setError(picked.length ? "Those files were not JPG or PNG images." : null);
    setError(null);
    setUrl(null);
    const fresh = await Promise.all(valid.map(readImage));
    setImages((prev) => [...prev, ...fresh]);
  }

  async function run() {
    setBusy(true);
    try {
      const blob = await assembleImagesToPdf(images);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not build the PDF — try different images.");
    } finally {
      setBusy(false);
    }
  }

  return {
    images,
    error,
    busy,
    url,
    addFiles,
    move: (from: number, to: number) => {
      setUrl(null);
      setImages((v) => moveItem(v, from, to));
    },
    remove: (id: string) => {
      setUrl(null);
      setImages((v) => v.filter((i) => i.id !== id));
    },
    run,
    clearUrl: () => setUrl(null),
  };
}
