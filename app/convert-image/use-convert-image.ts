"use client";

import { useState } from "react";
import { useImageBatch } from "../components/image-board/use-image-batch";
import { runImageBatch } from "../lib/run-image-batch";
import type { ImageFormat } from "../lib/transform-image";

export function useConvertImage() {
  const batch = useImageBatch();
  const [format, setFormat] = useState<ImageFormat>("image/webp");
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("converted.zip");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (batch.images.length === 0) return;
    setBusy(true);
    try {
      const out = await runImageBatch(batch.images, { quality: 0.9, format }, "converted");
      setUrl(out.url);
      setFileName(out.fileName);
      setError(null);
    } catch {
      setError("Could not convert these images.");
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
    format,
    setFormat: (f: ImageFormat) => {
      setUrl(null);
      setFormat(f);
    },
    busy,
    url,
    fileName,
    run,
  };
}
