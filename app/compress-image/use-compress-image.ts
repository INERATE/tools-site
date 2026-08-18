"use client";

import { useState } from "react";
import { useImageBatch } from "../components/image-board/use-image-batch";
import { transformImage, type ImageFormat } from "../lib/transform-image";
import { packageResults } from "../lib/package-results";

export function useCompressImage() {
  const batch = useImageBatch();
  const [quality, setQuality] = useState(0.7);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("compressed.zip");
  const [sizes, setSizes] = useState({ inSize: 0, outSize: 0 });
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (batch.images.length === 0) return;
    setBusy(true);
    try {
      // Each image keeps its own format — PNG is lossless, so the slider mainly helps JPEGs.
      const results = await Promise.all(
        batch.images.map(async (img) => {
          const format = img.file.type as ImageFormat;
          const blob = await transformImage(img, { quality, format });
          return { name: img.file.name, url: URL.createObjectURL(blob), size: blob.size };
        }),
      );
      const inSize = batch.images.reduce((n, i) => n + i.file.size, 0);
      const packaged = await packageResults(results, "compressed");
      setSizes({ inSize, outSize: packaged.outSize });
      setUrl(packaged.url);
      setFileName(packaged.fileName);
      setError(null);
    } catch {
      setError("Could not compress these images.");
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
    quality,
    setQuality: (q: number) => {
      setUrl(null);
      setQuality(q);
    },
    busy,
    url,
    fileName,
    sizes,
    run,
  };
}
