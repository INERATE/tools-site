import type { Slot } from "./types";

/** Pure edits on the arrangement. The hook only wires these to setState. */

const quarter = (s: Slot, dir: 1 | -1): Slot => ({ ...s, rotate: s.rotate + 90 * dir });

export const removeSlot = (slots: Slot[], id: string) => slots.filter((s) => s.id !== id);

export const rotateSlot = (slots: Slot[], id: string, dir: 1 | -1) =>
  slots.map((s) => (s.id === id ? quarter(s, dir) : s));

export const rotateEvery = (slots: Slot[], dir: 1 | -1) => slots.map((s) => quarter(s, dir));

/** Copy lands directly after its original, which is where a duplicate reads. */
export function duplicateSlot(slots: Slot[], id: string, newId: string) {
  const i = slots.findIndex((s) => s.id === id);
  if (i < 0) return slots;
  return [...slots.slice(0, i + 1), { ...slots[i], id: newId }, ...slots.slice(i + 1)];
}

/** Swaps two whole-file blocks — every slot for `src` moves as one unit, page order kept within it. */
export function moveFileBlock(slots: Slot[], src: number, dir: 1 | -1) {
  const order = [...new Set(slots.map((s) => s.src))];
  const i = order.indexOf(src);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= order.length) return slots;
  [order[i], order[j]] = [order[j], order[i]];
  const groups = new Map(order.map((k) => [k, slots.filter((s) => s.src === k)]));
  return order.flatMap((k) => groups.get(k)!);
}
