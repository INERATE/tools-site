/** A rectangle drawn on a page preview, as fractions of the displayed page. */
export type Box = { id: string; x: number; y: number; w: number; h: number };

export type UserRect = { x: number; y: number; width: number; height: number };

/**
 * Maps a box drawn on screen to pdf-lib's drawing space.
 *
 * Two coordinate systems have to be crossed. On screen, y grows downward from
 * the top-left of the page *as displayed*; in a PDF, y grows upward from the
 * bottom-left of the page *before* its /Rotate is applied. Ignoring /Rotate
 * would put the cover in the wrong place on any page a scanner turned, so all
 * four quarter turns are handled.
 */
export function toUserRect(box: Box, width: number, height: number, rotate: number): UserRect {
  const turn = ((Math.round(rotate / 90) % 4) + 4) % 4;
  const sideways = turn % 2 === 1;
  const dw = sideways ? height : width;
  const dh = sideways ? width : height;

  const bx = box.x * dw;
  const by = box.y * dh;
  const bw = box.w * dw;
  const bh = box.h * dh;

  if (turn === 1) return { x: by, y: bx, width: bh, height: bw };
  if (turn === 2) return { x: width - bx - bw, y: by, width: bw, height: bh };
  if (turn === 3) return { x: width - by - bh, y: height - bx - bw, width: bh, height: bw };
  return { x: bx, y: height - by - bh, width: bw, height: bh };
}

/** Drags can go in any direction; a rectangle cannot have negative size. */
export function normalize(x1: number, y1: number, x2: number, y2: number) {
  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    w: Math.abs(x2 - x1),
    h: Math.abs(y2 - y1),
  };
}
