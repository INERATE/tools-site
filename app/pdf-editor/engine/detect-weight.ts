/**
 * Infers bold from the rendered pixels rather than the font name.
 *
 * pdf.js often reports an opaque id ("g_d0_f2") instead of a PostScript name,
 * so name-based detection silently returns regular for the whole document and
 * every bold heading loses its weight the moment it is edited. The glyphs are
 * already on the canvas, so measure them: bold strokes are simply thicker.
 *
 * Median horizontal run-length of dark pixels, over the font size, is a stable
 * ratio — roughly 0.05-0.09 em for regular text and 0.11+ for bold, and it
 * does not care how many characters the line happens to contain.
 */
const DARK = 384; // r+g+b below this counts as ink
const BOLD_RATIO = 0.105;

export function detectBold(
  ctx: CanvasRenderingContext2D,
  rect: { x: number; y: number; w: number; h: number },
  canvasW: number,
  canvasH: number,
): boolean {
  const x0 = Math.max(0, Math.round(rect.x));
  const y0 = Math.max(0, Math.round(rect.y));
  const w = Math.max(1, Math.min(canvasW - x0, Math.round(rect.w)));
  const h = Math.max(1, Math.min(canvasH - y0, Math.round(rect.h)));
  if (w < 8 || h < 6) return false;

  const { data } = ctx.getImageData(x0, y0, w, h);
  const runs: number[] = [];

  // Only the middle band: ascenders and descenders are sparse and would skew
  // the measurement toward thin.
  for (let y = Math.floor(h * 0.3); y < Math.ceil(h * 0.75); y++) {
    let run = 0;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const ink = data[i] + data[i + 1] + data[i + 2] < DARK;
      if (ink) {
        run++;
      } else if (run) {
        // A long run is a horizontal bar or a rule, not a stem.
        if (run <= h) runs.push(run);
        run = 0;
      }
    }
    if (run && run <= h) runs.push(run);
  }

  if (runs.length < 6) return false;
  runs.sort((a, b) => a - b);
  const median = runs[Math.floor(runs.length / 2)];
  return median / h > BOLD_RATIO;
}
