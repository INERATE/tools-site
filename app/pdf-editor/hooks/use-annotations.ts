"use client";

import { useCallback, useState } from "react";
import { patchBox, type BoxPatch } from "../anno-ops";
import type { Annotation, NewAnnotation } from "../annotation-types";
import { nextId, useDraft } from "./use-draft";

/** Placed annotations, plus the draft currently being dragged out. */
export function useAnnotations(onChange: () => void) {
  const [items, setItems] = useState<Annotation[]>([]);
  const [picked, setPicked] = useState<string | null>(null);

  const commit = useCallback((a: Annotation) => {
    setItems((v) => [...v, a]);
    onChange();
  }, [onChange]);

  const draft = useDraft(commit);

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
    setItems((v) => {
      const item = v.find((a) => a.id === id);
      const remaining = v.filter((a) => a.id !== id);
      if (item && item.kind === "image") {
        // Place whiteout mask to erase the underlying canvas image
        const mask: Annotation = {
          id: nextId(),
          pageIndex: item.pageIndex,
          kind: "redact",
          redactStyle: "whiteout",
          relX: (item as any).relX ?? 0,
          relY: (item as any).relY ?? 0,
          relWidth: (item as any).relWidth ?? 0.1,
          relHeight: (item as any).relHeight ?? 0.1,
        };
        return [...remaining, mask];
      }
      return remaining;
    });
    setPicked((p) => (p === id ? null : p));
    onChange();
  }, [onChange]);

  const update = useCallback((id: string, patch: BoxPatch) => {
    setItems((v) => patchBox(v, id, patch));
    onChange();
  }, [onChange]);

  /** `keep` re-installs restored annotations instead of clearing. */
  const resetAnnotations = useCallback((keep?: Annotation[]) => {
    setItems(keep ?? []);
    setPicked(null);
    draft.clearDraft();
  }, [draft]);

  return {
    items, picked, setPicked, place, placeSignature, remove, update, resetAnnotations,
    drafting: draft.drafting, begin: draft.begin, extend: draft.extend, finish: draft.finish,
  };
}
