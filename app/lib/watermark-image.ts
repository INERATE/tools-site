import type { ImageItem } from "./image-item";

export type WatermarkPosition = "center" | "bottom-right" | "tiled";

/** Stamps translucent text onto a photo, once in a corner/center or tiled diagonally across the whole image. */
export async function watermarkImage(
  image: ImageItem,
  opts: { text: string; position: WatermarkPosition; opacity: number },
): Promise<Blob> {
  const el = new Image();
  el.src = image.url;
  await new Promise((res, rej) => {
    el.onload = res;
    el.onerror = rej;
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.w;
  canvas.height = image.h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(el, 0, 0);

  const size = Math.max(14, Math.round(image.w / 18));
  ctx.font = `700 ${size}px sans-serif`;
  ctx.fillStyle = `rgba(255,255,255,${opts.opacity})`;
  ctx.strokeStyle = `rgba(0,0,0,${opts.opacity * 0.6})`;
  ctx.lineWidth = Math.max(1, size / 14);

  if (opts.position === "tiled") {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.textAlign = "center";
    const stepX = size * 8;
    const stepY = size * 5;
    for (let y = -canvas.height; y < canvas.height; y += stepY) {
      for (let x = -canvas.width; x < canvas.width; x += stepX) {
        ctx.strokeText(opts.text, x, y);
        ctx.fillText(opts.text, x, y);
      }
    }
    ctx.restore();
  } else {
    const margin = size;
    ctx.textAlign = opts.position === "center" ? "center" : "right";
    const x = opts.position === "center" ? canvas.width / 2 : canvas.width - margin;
    const y = opts.position === "center" ? canvas.height / 2 : canvas.height - margin;
    ctx.strokeText(opts.text, x, y);
    ctx.fillText(opts.text, x, y);
  }

  const format = image.file.type || "image/png";
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, 0.92));
  if (!blob) throw new Error("Could not encode the watermarked image.");
  return blob;
}
