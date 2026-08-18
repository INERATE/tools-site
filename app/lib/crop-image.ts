import type { ImageItem } from "./image-item";
import type { Insets } from "./crop-pdf";

/** Crops a fraction-based margin off every side and re-encodes at the image's own format. */
export async function cropImage(image: ImageItem, insets: Insets): Promise<Blob> {
  const el = new Image();
  el.src = image.url;
  await new Promise((res, rej) => {
    el.onload = res;
    el.onerror = rej;
  });

  const x = Math.round(image.w * insets.left);
  const y = Math.round(image.h * insets.top);
  const w = Math.max(1, Math.round(image.w * (1 - insets.left - insets.right)));
  const h = Math.max(1, Math.round(image.h * (1 - insets.top - insets.bottom)));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const format = image.file.type || "image/png";
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(el, x, y, w, h, 0, 0, w, h);

  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, 0.9));
  if (!blob) throw new Error("Could not encode the cropped image.");
  return blob;
}
