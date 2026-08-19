/** Crop mask applied inside the cropped rectangle — anything outside it becomes transparent. */
export type CropShape =
  | { kind: "rect" }
  | { kind: "circle" }
  | { kind: "rounded"; radius: number } // 0..0.5, fraction of min(w, h)
  | { kind: "custom"; d: string }; // raw SVG path `d`, authored on a 0..100 viewBox

/** Any shape but a plain rectangle needs a real alpha channel to show through — PNG, never JPEG. */
export function shapeNeedsAlpha(shape: CropShape): boolean {
  return shape.kind !== "rect";
}

/** Clips the current canvas path to `shape`, sized to the given w/h in pixels. No-op for "rect". */
export function applyShapeClip(ctx: CanvasRenderingContext2D, w: number, h: number, shape: CropShape) {
  if (shape.kind === "rect") return;
  ctx.beginPath();
  if (shape.kind === "circle") {
    const r = Math.min(w, h) / 2;
    ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
  } else if (shape.kind === "rounded") {
    ctx.roundRect(0, 0, w, h, Math.min(w, h) * shape.radius);
  } else {
    const scaled = new Path2D();
    scaled.addPath(new Path2D(shape.d), new DOMMatrix().scale(w / 100, h / 100));
    ctx.clip(scaled);
    return;
  }
  ctx.clip();
}
