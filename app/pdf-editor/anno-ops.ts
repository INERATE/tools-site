import type { Annotation } from "./annotation-types";

export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export interface BoxPatch {
  relX?: number;
  relY?: number;
  relWidth?: number;
  relHeight?: number;
  color?: string;
  redactStyle?: "blackout" | "blur" | "whiteout";
}

/** Moves, resizes, or updates styling of a placed box/annotation. */
export function patchBox(items: Annotation[], id: string, patch: BoxPatch): Annotation[] {
  return items.map((a) => {
    if (a.id !== id) return a;
    if (a.kind === "draw") {
      return patch.color ? { ...a, color: patch.color } : a;
    }
    const relWidth = patch.relWidth !== undefined ? clamp(patch.relWidth, 0.01, 1) : a.relWidth;
    const relHeight = patch.relHeight !== undefined ? clamp(patch.relHeight, 0.01, 1) : a.relHeight;
    return {
      ...a,
      relWidth,
      relHeight,
      relX: patch.relX !== undefined ? clamp(patch.relX, 0, 1 - relWidth) : a.relX,
      relY: patch.relY !== undefined ? clamp(patch.relY, 0, 1 - relHeight) : a.relY,
      ...(patch.color !== undefined ? { color: patch.color } : {}),
      ...(patch.redactStyle !== undefined ? { redactStyle: patch.redactStyle } : {}),
    };
  });
}

/** The box being dragged out by the pointer, from its anchor to the cursor. */
export function dragRect(origin: { x: number; y: number }, x: number, y: number): Required<Pick<BoxPatch, "relX" | "relY" | "relWidth" | "relHeight">> {
  return {
    relX: Math.min(origin.x, x),
    relY: Math.min(origin.y, y),
    relWidth: Math.abs(x - origin.x),
    relHeight: Math.abs(y - origin.y),
  };
}
