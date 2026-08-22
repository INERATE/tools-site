import type { ImageItem } from "./image-item";
import { coverCrop, KB, padBytes, pickQuality, type ExamPreset } from "./exam-presets";

export type FitResult = { blob: Blob; size: number; quality: number; padded: boolean };

/**
 * Redraws an image at a preset's exact pixel size, then hits its byte range —
 * quality is bisected down to clear the ceiling, and the file is padded up if
 * even full quality lands under the floor.
 */
export async function fitToExam(image: ImageItem, preset: ExamPreset): Promise<FitResult> {
  const el = new Image();
  el.src = image.url;
  await new Promise((res, rej) => {
    el.onload = res;
    el.onerror = rej;
  });

  const canvas = document.createElement("canvas");
  canvas.width = preset.w;
  canvas.height = preset.h;
  const ctx = canvas.getContext("2d")!;
  // JPEG has no alpha; without this a transparent PNG signature turns black.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, preset.w, preset.h);
  const c = coverCrop(image.w, image.h, preset.w, preset.h);
  ctx.drawImage(el, c.sx, c.sy, c.sw, c.sh, 0, 0, preset.w, preset.h);

  const encoded = new Map<number, Blob>();
  const encode = async (q: number) => {
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", q));
    if (!blob) throw new Error("Could not encode the image.");
    encoded.set(q, blob);
    return blob.size;
  };

  const { quality } = await pickQuality(encode, preset.maxKB * KB);
  const blob = encoded.get(quality)!;

  const pad = padBytes(blob.size, preset.minKB * KB);
  if (pad === 0) return { blob, size: blob.size, quality, padded: false };

  const padded = new Blob([blob, new Uint8Array(pad)], { type: "image/jpeg" });
  return { blob: padded, size: padded.size, quality, padded: true };
}
