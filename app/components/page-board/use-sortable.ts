"use client";

import { useCallback, useRef, useState } from "react";
import { nearestIndex } from "../../lib/arrange";

/**
 * Pointer-driven sorting for a wrapping grid. Native HTML5 drag was the lazy
 * first choice and lost: it has no touch support and paints its own ghost we
 * cannot style. Framer's own Reorder is single-axis only, so the grid geometry
 * is measured here and the reorder is committed mid-drag — neighbours slide out
 * of the way live because every tile carries `layout`.
 */
export function useSortable(move: (from: number, to: number) => void) {
  const nodes = useRef(new Map<string, HTMLElement>());
  const order = useRef<string[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);

  /** Called by each tile on mount; the ref map is how geometry is read. */
  const register = useCallback((id: string, el: HTMLElement | null) => {
    if (el) nodes.current.set(id, el);
    else nodes.current.delete(id);
  }, []);

  const setOrder = useCallback((ids: string[]) => {
    order.current = ids;
  }, []);

  /** Pointer moved while dragging `id` — hand it to whichever tile it is over. */
  const onDrag = useCallback(
    (id: string, x: number, y: number) => {
      const ids = order.current;
      const from = ids.indexOf(id);
      if (from < 0) return;
      const to = nearestIndex(
        ids.map((other) => nodes.current.get(other)?.getBoundingClientRect()),
        x,
        y,
      );
      if (to >= 0 && to !== from) move(from, to);
    },
    [move],
  );

  return { register, setOrder, onDrag, dragging, setDragging };
}
