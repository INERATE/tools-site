"use client";

import { useCallback, useRef, useState } from "react";
import { dragRect } from "../anno-ops";
import type { Annotation, AnnotationKind } from "../annotation-types";

let seq = 0;
export const nextId = () => `a${++seq}`;

/**
 * The annotation currently being dragged out, before it is committed.
 *
 * The live draft is mirrored in a ref so `finish` can read it without calling
 * commit from inside a state updater: React double-invokes updaters in
 * StrictMode, which committed every shape twice and produced duplicate keys.
 */
export function useDraft(commit: (a: Annotation) => void) {
  const [drafting, setDrafting] = useState<Annotation | null>(null);
  const current = useRef<Annotation | null>(null);
  const origin = useRef<{ x: number; y: number } | null>(null);

  const put = useCallback((a: Annotation | null) => {
    current.current = a;
    setDrafting(a);
  }, []);

  const begin = useCallback((kind: AnnotationKind, pageIndex: number, x: number, y: number, color: string) => {
    origin.current = { x, y };
    put(
      kind === "draw"
        ? { id: nextId(), kind: "draw", pageIndex, points: [{ x, y }], color, size: 2 }
        : { id: nextId(), kind, pageIndex, relX: x, relY: y, relWidth: 0, relHeight: 0, color },
    );
  }, [put]);

  const extend = useCallback((x: number, y: number) => {
    const d = current.current;
    if (!d) return;
    put(d.kind === "draw" ? { ...d, points: [...d.points, { x, y }] } : { ...d, ...dragRect(origin.current!, x, y) });
  }, [put]);

  const finish = useCallback(() => {
    const d = current.current;
    // Ignore a stray click: a zero-area box or a single point is not a shape.
    const real = d && (d.kind === "draw" ? d.points.length > 1 : d.relWidth > 0.004 && d.relHeight > 0.004);
    if (d && real) commit(d);
    origin.current = null;
    put(null);
  }, [commit, put]);

  const clearDraft = useCallback(() => {
    origin.current = null;
    put(null);
  }, [put]);

  return { drafting, begin, extend, finish, clearDraft };
}
