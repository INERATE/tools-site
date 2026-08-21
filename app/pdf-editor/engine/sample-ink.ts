/**
 * The darkest pixel inside the box, as the ink colour.
 *
 * pdf.js does not report fill colour on a text item, so without this every
 * edited line was redrawn in flat black and coloured or grey text visibly
 * changed the moment you started editing it. The darkest pixel is the glyph
 * stroke; near-background pixels are ignored so antialiasing cannot wash it out.
 */
export function sampleInk(
  ctx: CanvasRenderingContext2D,
  rect: { x: number; y: number; w: number; h: number },
  canvasW: number,
  canvasH: number,
): string {
  const x0 = Math.max(0, Math.round(rect.x));
  const y0 = Math.max(0, Math.round(rect.y));
  const w = Math.max(1, Math.min(canvasW - x0, Math.round(rect.w)));
  const h = Math.max(1, Math.min(canvasH - y0, Math.round(rect.h)));
  if (w < 2 || h < 2) return "#000000";

  const { data } = ctx.getImageData(x0, y0, w, h);
  let best = 255 * 3;
  let hit: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < data.length; i += 4) {
    const sum = data[i] + data[i + 1] + data[i + 2];
    if (sum < best) {
      best = sum;
      hit = [data[i], data[i + 1], data[i + 2]];
    }
  }
  // An empty or near-white box has no ink to read; black is the safer default.
  if (best > 600) return "#000000";
  return "#" + hit.map((c) => c.toString(16).padStart(2, "0")).join("");
}
