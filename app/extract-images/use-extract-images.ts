"use client";

import { useState } from "react";
import { extractPdfImages, type ExtractedImage } from "../lib/extract-pdf-images";
import { zipImages } from "../lib/zip-images";

export function useExtractImages() {
  const [name, setName] = useState<string | null>(null);
  const [images, setImages] = useState<ExtractedImage[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setZipUrl(null);
    setName(pdf.name);
    setBusy(true);
    try {
      const found = await extractPdfImages(pdf);
      if (found.length === 0) throw new Error("No JPEG images were found in that PDF.");
      setImages(found);
      setZipUrl(URL.createObjectURL(await zipImages(found)));
    } catch (e) {
      setName(null);
      setImages([]);
      setError(e instanceof Error ? e.message : "That PDF could not be read.");
    } finally {
      setBusy(false);
    }
  }

  return { name, images, zipUrl, busy, error, pick };
}
