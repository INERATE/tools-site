"use client";

import type { BoxPatch } from "../anno-ops";
import { isStroke, type Annotation } from "../annotation-types";
import { AnnotationShape } from "./annotation-shape";
import { PlacedAnnotation } from "./placed-annotation";

/** Renders placed annotations plus the one being dragged out. */
export function AnnotationLayer({
  items, drafting, picked, onPick, onRemove, onUpdate, interactive,
}: {
  items: Annotation[];
  drafting: Annotation | null;
  picked: string | null;
  onPick: (id: string | null) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: BoxPatch) => void;
  /** False while a placement tool is armed — dragging existing items would fight it. */
  interactive: boolean;
}) {
  return (
    <>
      {items.map((a) =>
        isStroke(a) || !interactive ? (
          <div key={a.id} className="pointer-events-none absolute inset-0">
            <AnnotationShape a={a} />
          </div>
        ) : (
          <PlacedAnnotation
            key={a.id}
            a={a}
            selected={picked === a.id}
            onSelect={onPick}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ),
      )}
      {drafting && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <AnnotationShape a={drafting} />
        </div>
      )}
    </>
  );
}
