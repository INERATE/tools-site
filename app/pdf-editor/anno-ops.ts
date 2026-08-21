import type { Annotation } from "./annotation-types";

export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export interface BoxPatch {
  relX?: number;
  relY?: number;
  relWidth?: number;
  relHeight?: number;
}

/** Moves or resizes one placed box, clamped so it cannot leave the page. */
export function patchBox(items: Annotation[], id: string, patch: BoxPatch): Annotation[] {
  return items.map((a) => {
    if (a.id !== id || a.kind === "draw") return a;
    const relWidth = clamp(patch.relWidth ?? a.relWidth, 0.01, 1);
    const relHeight = clamp(patch.relHeight ?? a.relHeight, 0.01, 1);
    return {
      ...a,
      relWidth,
      relHeight,
      relX: clamp(patch.relX ?? a.relX, 0, 1 - relWidth),
      relY: clamp(patch.relY ?? a.relY, 0, 1 - relHeight),
    };
  });
}

/** The box being dragged out by the pointer, from its anchor to the cursor. */
export function dragRect(origin: { x: number; y: number }, x: number, y: number): Required<BoxPatch> {
  return {
    relX: Math.min(origin.x, x),
    relY: Math.min(origin.y, y),
    relWidth: Math.abs(x - origin.x),
    relHeight: Math.abs(y - origin.y),
  };
}
