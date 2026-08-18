import type { ImageItem } from "./image-item";

export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

/** Draws an image to a canvas at the given scale and re-encodes it — the shared op behind Compress/Resize/Convert Image. */
export async function transformImage(
  image: ImageItem,
  { scale = 1, quality = 0.85, format }: { scale?: number; quality?: number; format: ImageFormat },
): Promise<Blob> {
  const el = new Image();
  el.src = image.url;
  await new Promise((res, rej) => {
    el.onload = res;
    el.onerror = rej;
  });

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.w * scale));
  canvas.height = Math.max(1, Math.round(image.h * scale));
  const ctx = canvas.getContext("2d")!;
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(el, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, quality));
  if (!blob) throw new Error("Could not encode the image.");
  return blob;
}

export const EXT: Record<ImageFormat, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
