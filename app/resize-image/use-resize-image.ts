"use client";

import { useState } from "react";
import { useImageBatch } from "../components/image-board/use-image-batch";
import { transformImage, type ImageFormat } from "../lib/transform-image";
import { packageResults } from "../lib/package-results";

export function useResizeImage() {
  const batch = useImageBatch();
  const [percent, setPercent] = useState(50);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("resized.zip");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (batch.images.length === 0) return;
    setBusy(true);
    try {
      // Keeps each image's own format — resizing shouldn't silently change what you uploaded.
      const results = await Promise.all(
        batch.images.map(async (img) => {
          const format = img.file.type as ImageFormat;
          const blob = await transformImage(img, { scale: percent / 100, quality: 0.9, format });
          return { name: img.file.name, url: URL.createObjectURL(blob), size: blob.size };
        }),
      );
      const packaged = await packageResults(results, "resized");
      setUrl(packaged.url);
      setFileName(packaged.fileName);
      setError(null);
    } catch {
      setError("Could not resize these images.");
    } finally {
      setBusy(false);
    }
  }

  return {
    images: batch.images,
    error: error ?? batch.error,
    addFiles: (f: File[]) => {
      setUrl(null);
      return batch.addFiles(f);
    },
    move: batch.move,
    remove: (id: string) => {
      setUrl(null);
      batch.remove(id);
    },
    percent,
    setPercent: (v: number) => {
      setUrl(null);
      setPercent(v);
    },
    busy,
    url,
    fileName,
    run,
  };
}
