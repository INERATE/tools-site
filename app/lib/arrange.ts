/** Pure list arrangement, shared by every page board. */

/**
 * Lifts the item at `from` out and drops it at `to`, closing the gap — the
 * behaviour a drag expects. Swapping instead would drag a neighbour backwards
 * through the list as the pointer travels. Out-of-range returns the same array
 * so callers can pass it straight to setState without a no-op render.
 */
export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (from === to) return list;
  if (from < 0 || from >= list.length || to < 0 || to >= list.length) return list;
  const next = [...list];
  const [lifted] = next.splice(from, 1);
  next.splice(to, 0, lifted);
  return next;
}

/** Nearest index whose tile centre is closest to a point, or -1 if none. */
export function nearestIndex(
  boxes: (DOMRect | undefined)[],
  x: number,
  y: number,
): number {
  let best = -1;
  let bestDist = Infinity;
  boxes.forEach((box, i) => {
    if (!box) return;
    const dx = box.left + box.width / 2 - x;
    const dy = box.top + box.height / 2 - y;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}
