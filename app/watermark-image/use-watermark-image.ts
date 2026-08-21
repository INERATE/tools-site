"use client";

import { useState } from "react";
import { useImageBatch } from "../components/image-board/use-image-batch";
import { watermarkImage, type WatermarkPosition } from "../lib/watermark-image";
import { packageResults } from "../lib/package-results";

export function useWatermarkImage() {
  const batch = useImageBatch();
  const [text, setText] = useState("");
  const [position, setPosition] = useState<WatermarkPosition>("tiled");
  const [opacity, setOpacity] = useState(0.35);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("watermarked.zip");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    const markText = text.trim() || "CONFIDENTIAL";
    if (batch.images.length === 0) return;
    setBusy(true);
    try {
      const results = await Promise.all(
        batch.images.map(async (img) => {
          const blob = await watermarkImage(img, { text: markText, position, opacity });
          return { name: img.file.name, url: URL.createObjectURL(blob), size: blob.size };
        }),
      );
      const packaged = await packageResults(results, "watermarked");
      setUrl(packaged.url);
      setFileName(packaged.fileName);
      setError(null);
    } catch {
      setError("Could not watermark these images.");
    } finally {
      setBusy(false);
    }
  }

  function edit<A extends unknown[]>(setter: (...a: A) => void) {
    return (...a: A) => {
      setUrl(null);
      setter(...a);
    };
  }

  return {
    images: batch.images,
    error: error ?? batch.error,
    addFiles: edit(batch.addFiles),
    move: batch.move,
    remove: edit(batch.remove),
    text,
    setText: edit(setText),
    position,
    setPosition: edit(setPosition),
    opacity,
    setOpacity: edit(setOpacity),
    busy,
    url,
    fileName,
    run,
  };
}
