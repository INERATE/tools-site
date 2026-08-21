"use client";

import { useCallback, useRef, useState } from "react";
import type { Annotation, AnnotationKind, NewAnnotation } from "../annotation-types";

let seq = 0;
const nextId = () => `a${++seq}`;

/** Placement state for the shape/draw/redact/signature tools. */
export function useAnnotations(onChange: () => void) {
  const [items, setItems] = useState<Annotation[]>([]);
  const [drafting, setDrafting] = useState<Annotation | null>(null);
  const origin = useRef<{ x: number; y: number } | null>(null);

  const begin = useCallback((kind: AnnotationKind, pageIndex: number, x: number, y: number, color: string) => {
    origin.current = { x, y };
    setDrafting(
      kind === "draw"
        ? { id: nextId(), kind: "draw", pageIndex, points: [{ x, y }], color, size: 2 }
        : { id: nextId(), kind, pageIndex, relX: x, relY: y, relWidth: 0, relHeight: 0, color },
    );
  }, []);

  const extend = useCallback((x: number, y: number) => {
    setDrafting((d) => {
      if (!d) return d;
      if (d.kind === "draw") return { ...d, points: [...d.points, { x, y }] };
      const o = origin.current!;
      return { ...d, relX: Math.min(o.x, x), relY: Math.min(o.y, y), relWidth: Math.abs(x - o.x), relHeight: Math.abs(y - o.y) };
    });
  }, []);

  const finish = useCallback(() => {
    setDrafting((d) => {
      if (!d) return null;
      const big = d.kind === "draw" ? d.points.length > 1 : d.relWidth > 0.004 && d.relHeight > 0.004;
      if (big) {
        setItems((v) => [...v, d]);
        onChange();
      }
      return null;
    });
    origin.current = null;
  }, [onChange]);

  const place = useCallback((a: NewAnnotation) => {
    setItems((v) => [...v, { ...a, id: nextId() } as Annotation]);
    onChange();
  }, [onChange]);

  /** Default spot, keeping the signature's aspect against the page's own. */
  const placeSignature = useCallback(
    (pageIndex: number, dataUrl: string, sigRatio: number, pageRatio: number) => {
      const relWidth = 0.28;
      place({ kind: "signature", pageIndex, relX: 0.12, relY: 0.75, relWidth, relHeight: relWidth * sigRatio * pageRatio, dataUrl });
    },
    [place],
  );

  const remove = useCallback((id: string) => {
    setItems((v) => v.filter((a) => a.id !== id));
    onChange();
  }, [onChange]);

  const resetAnnotations = useCallback(() => {
    setItems([]);
    setDrafting(null);
  }, []);

  return { items, drafting, begin, extend, finish, place, placeSignature, remove, resetAnnotations };
}
