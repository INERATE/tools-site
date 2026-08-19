"use client";

import { useState } from "react";
import { useImageBatch } from "../components/image-board/use-image-batch";
import { cropImage } from "../lib/crop-image";
import { packageResults } from "../lib/package-results";
import type { Insets } from "../lib/crop-pdf";
import { shapeNeedsAlpha, type CropShape } from "../lib/crop-shape";

const DEFAULT_INSETS: Insets = { top: 0, bottom: 0, left: 0, right: 0 };
const DEFAULT_SHAPE: CropShape = { kind: "rect" };

export function useCropImage() {
  const batch = useImageBatch();
  const [insets, setInsets] = useState<Insets>(DEFAULT_INSETS);
  const [shape, setShape] = useState<CropShape>(DEFAULT_SHAPE);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("cropped.zip");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (batch.images.length === 0) return;
    setBusy(true);
    try {
      const toPng = shapeNeedsAlpha(shape);
      const results = await Promise.all(
        batch.images.map(async (img) => {
          const blob = await cropImage(img, insets, shape);
          const name = toPng ? `${img.file.name.replace(/\.[^.]+$/, "")}.png` : img.file.name;
          return { name, url: URL.createObjectURL(blob), size: blob.size };
        }),
      );
      const packaged = await packageResults(results, "cropped");
      setUrl(packaged.url);
      setFileName(packaged.fileName);
      setError(null);
    } catch {
      setError("Could not crop these images.");
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
    insets,
    setInsets: (next: Insets) => {
      setUrl(null);
      setInsets(next);
    },
    shape,
    setShape: (next: CropShape) => {
      setUrl(null);
      setShape(next);
    },
    busy,
    url,
    fileName,
    run,
  };
}
