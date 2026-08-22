/**
 * Exam portals reject an upload on exact pixel size AND a byte range, and give
 * you no way to fix it. Every preset here is the spec an application form
 * states — width/height in pixels, min/max in kilobytes.
 */
export type ExamPreset = {
  id: string;
  label: string;
  note: string;
  w: number;
  h: number;
  minKB: number;
  maxKB: number;
};

export const EXAM_PRESETS: ExamPreset[] = [
  { id: "ssc-photo", label: "SSC photo", note: "SSC CGL, CHSL, MTS, GD", w: 200, h: 230, minKB: 20, maxKB: 50 },
  { id: "ssc-sign", label: "SSC signature", note: "SSC CGL, CHSL, MTS, GD", w: 140, h: 60, minKB: 10, maxKB: 20 },
  { id: "upsc-photo", label: "UPSC photo", note: "Civil Services, CDS, NDA", w: 350, h: 350, minKB: 20, maxKB: 300 },
  { id: "upsc-sign", label: "UPSC signature", note: "Civil Services, CDS, NDA", w: 350, h: 350, minKB: 20, maxKB: 300 },
  { id: "ibps-photo", label: "IBPS / bank photo", note: "PO, Clerk, RRB", w: 200, h: 230, minKB: 20, maxKB: 50 },
  { id: "ibps-sign", label: "IBPS / bank signature", note: "PO, Clerk, RRB", w: 140, h: 60, minKB: 10, maxKB: 20 },
  { id: "rrb-photo", label: "Railway RRB photo", note: "NTPC, Group D, ALP", w: 320, h: 240, minKB: 20, maxKB: 50 },
  { id: "neet-photo", label: "NEET photo", note: "NTA NEET UG", w: 200, h: 230, minKB: 10, maxKB: 200 },
  { id: "neet-sign", label: "NEET signature", note: "NTA NEET UG", w: 140, h: 60, minKB: 4, maxKB: 30 },
  { id: "jee-photo", label: "JEE Main photo", note: "NTA JEE Main", w: 200, h: 230, minKB: 10, maxKB: 200 },
];

export const KB = 1024;

/**
 * Finds the highest JPEG quality whose encoded size still fits `maxBytes`.
 *
 * Bisecting beats stepping the quality down: an encode is the expensive part,
 * so ~7 of them gets within half a percent of the best quality that fits,
 * where a linear walk would need dozens. `encode` is injected so the search is
 * testable without a canvas.
 */
export async function pickQuality(
  encode: (q: number) => Promise<number>,
  maxBytes: number,
  steps = 7,
): Promise<{ quality: number; size: number }> {
  let lo = 0.05;
  let hi = 0.95;
  // Nothing under the ceiling is still the honest answer — return the smallest
  // we can make rather than pretending a too-large file passed.
  let best = { quality: lo, size: await encode(lo) };
  if (best.size > maxBytes) return best;

  const hiSize = await encode(hi);
  if (hiSize <= maxBytes) return { quality: hi, size: hiSize };

  for (let i = 0; i < steps; i++) {
    const mid = (lo + hi) / 2;
    const size = await encode(mid);
    if (size <= maxBytes) {
      best = { quality: mid, size };
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return best;
}

/**
 * How many bytes to append so a too-small JPEG clears the portal's floor.
 *
 * A 140x60 signature can be well under a 10 KB minimum even at full quality —
 * there simply are not enough pixels. Portals check the byte count, so the
 * file is padded past the JPEG end-of-image marker, which every decoder stops
 * reading at. The image is untouched; only the file grows.
 *
 * ponytail: padding is bytes-only. If a portal ever validates JPEG structure
 * past EOI, re-encode at a larger dimension and downscale instead.
 */
export function padBytes(size: number, minBytes: number): number {
  return size >= minBytes ? 0 : minBytes - size + 512;
}

/** The source rectangle that fills w x h without squashing the subject. */
export function coverCrop(sw: number, sh: number, w: number, h: number) {
  const scale = Math.max(w / sw, h / sh);
  const cw = w / scale;
  const ch = h / scale;
  return { sx: (sw - cw) / 2, sy: (sh - ch) / 2, sw: cw, sh: ch };
}
