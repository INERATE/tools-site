"use client";

import { useState } from "react";
import { readImage, type ImageItem } from "../lib/image-item";
import { EXAM_PRESETS, KB } from "../lib/exam-presets";
import { fitToExam, type FitResult } from "../lib/fit-to-exam";

export function useExamFit() {
  const [image, setImage] = useState<ImageItem | null>(null);
  const [presetId, setPresetId] = useState(EXAM_PRESETS[0].id);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const preset = EXAM_PRESETS.find((p) => p.id === presetId)!;

  async function addFiles(picked: File[]) {
    const file = picked.find((f) => f.type === "image/jpeg" || f.type === "image/png" || f.type === "image/webp");
    if (!file) return setError("That was not a JPG, PNG or WEBP image.");
    setError(null);
    setResult(null);
    setImage(await readImage(file));
  }

  async function run() {
    if (!image) return;
    setBusy(true);
    try {
      const fit = await fitToExam(image, preset);
      setResult(fit);
      setError(
        fit.size > preset.maxKB * KB
          ? `This photo will not compress under ${preset.maxKB} KB at ${preset.w}x${preset.h}. Try a less detailed photo or a plainer background.`
          : null,
      );
    } catch {
      setError("Could not resize this image.");
    } finally {
      setBusy(false);
    }
  }

  return {
    image,
    addFiles,
    preset,
    presetId,
    setPresetId: (id: string) => {
      setResult(null);
      setPresetId(id);
    },
    busy,
    result,
    error,
    run,
  };
}
