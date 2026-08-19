import type { ImageItem } from "./image-item";
import type { Insets } from "./crop-pdf";
import { applyShapeClip, shapeNeedsAlpha, type CropShape } from "./crop-shape";

/** Crops a fraction-based margin off every side, optionally masked to a shape, and re-encodes. */
export async function cropImage(image: ImageItem, insets: Insets, shape: CropShape = { kind: "rect" }): Promise<Blob> {
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
  const needsAlpha = shapeNeedsAlpha(shape);
  const format = needsAlpha ? "image/png" : image.file.type || "image/png";
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.save();
  applyShapeClip(ctx, w, h, shape);
  ctx.drawImage(el, x, y, w, h, 0, 0, w, h);
  ctx.restore();

  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, 0.9));
  if (!blob) throw new Error("Could not encode the cropped image.");
  return blob;
}
