"use client";

import { useState } from "react";
import { useImageBatch } from "../components/image-board/use-image-batch";
import { assembleImagesToPdf } from "../lib/assemble-images-pdf";

export function useImageToPdf() {
  const batch = useImageBatch();
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    try {
      const blob = await assembleImagesToPdf(batch.images);
      setUrl(URL.createObjectURL(blob));
      setRunError(null);
    } catch {
      setRunError("Could not build the PDF — try different images.");
    } finally {
      setBusy(false);
    }
  }

  return {
    images: batch.images,
    error: runError ?? batch.error,
    busy,
    url,
    addFiles: (files: File[]) => {
      setUrl(null);
      return batch.addFiles(files);
    },
    move: (from: number, to: number) => {
      setUrl(null);
      batch.move(from, to);
    },
    remove: (id: string) => {
      setUrl(null);
      batch.remove(id);
    },
    run,
    clearUrl: () => setUrl(null),
  };
}
