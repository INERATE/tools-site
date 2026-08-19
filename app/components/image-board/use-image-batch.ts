"use client";

import { useState } from "react";
import { moveItem } from "../../lib/arrange";
import { readImage, type ImageItem } from "../../lib/image-item";

/** Add/reorder/remove for a batch of images — shared by every tool that works on more than one image at once. */
export function useImageBatch() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function addFiles(picked: File[]) {
    const valid = picked.filter((f) => f.type === "image/jpeg" || f.type === "image/png" || f.type === "image/webp");
    if (valid.length === 0) return setError(picked.length ? "Those files were not JPG, PNG or WEBP images." : null);
    setError(null);
    const fresh = await Promise.all(valid.map(readImage));
    setImages((prev) => [...prev, ...fresh]);
  }

  return {
    images,
    error,
    addFiles,
    move: (from: number, to: number) => setImages((v) => moveItem(v, from, to)),
    remove: (id: string) => setImages((v) => v.filter((i) => i.id !== id)),
    clear: () => setImages([]),
  };
}
