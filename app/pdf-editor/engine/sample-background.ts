export interface BackgroundSample {
  r: number;
  g: number;
  b: number;
  /** Solid colour behind the text -> cover rect is invisible. False means a
   * photo/gradient sits behind it, so the redraw will show a seam. */
  flat: boolean;
}

const FLAT_THRESHOLD = 14; // max per-channel std-dev still called "flat"

/** Samples a ring of pixels just outside the block's box, never inside it. */
export function sampleBackground(
  ctx: CanvasRenderingContext2D,
  rect: { x: number; y: number; w: number; h: number },
  canvasW: number,
  canvasH: number,
): BackgroundSample {
  const pad = 3;
  const x0 = Math.max(0, Math.round(rect.x - pad));
  const y0 = Math.max(0, Math.round(rect.y - pad));
  const x1 = Math.min(canvasW - 1, Math.round(rect.x + rect.w + pad));
  const y1 = Math.min(canvasH - 1, Math.round(rect.y + rect.h + pad));
  const w = Math.max(1, x1 - x0);
  const h = Math.max(1, y1 - y0);

  const points: [number, number][] = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push([x0 + t * w, y0], [x0 + t * w, y1], [x0, y0 + t * h], [x1, y0 + t * h]);
  }

  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  for (const [px, py] of points) {
    const [r, g, b] = ctx.getImageData(Math.min(canvasW - 1, Math.max(0, Math.round(px))), Math.min(canvasH - 1, Math.max(0, Math.round(py))), 1, 1).data;
    rs.push(r);
    gs.push(g);
    bs.push(b);
  }

  const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
  const std = (a: number[], m: number) => Math.sqrt(mean(a.map((v) => (v - m) ** 2)));
  const [mr, mg, mb] = [mean(rs), mean(gs), mean(bs)];
  const spread = Math.max(std(rs, mr), std(gs, mg), std(bs, mb));

  return { r: mr / 255, g: mg / 255, b: mb / 255, flat: spread <= FLAT_THRESHOLD };
}
