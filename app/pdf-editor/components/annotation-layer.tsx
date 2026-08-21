"use client";

import { X } from "lucide-react";
import { isStroke, type Annotation } from "../annotation-types";

const pct = (n: number) => `${n * 100}%`;

function Shape({ a }: { a: Annotation }) {
  if (isStroke(a)) {
    return (
      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible">
        <polyline
          points={a.points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")}
          fill="none"
          stroke={a.color}
          strokeWidth={a.size}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ transform: "scale(0.01)", transformOrigin: "0 0" }}
        />
      </svg>
    );
  }

  const style = { left: pct(a.relX), top: pct(a.relY), width: pct(a.relWidth), height: pct(a.relHeight) };
  if (a.kind === "redact") return <div className="absolute bg-black" style={style} />;
  if (a.kind === "highlight") return <div className="absolute" style={{ ...style, background: a.color, opacity: 0.35 }} />;
  if ((a.kind === "signature" || a.kind === "image") && a.dataUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={a.dataUrl} alt="" className="absolute object-contain" style={style} />;
  }
  return (
    <div
      className="absolute border-[1.5px]"
      style={{ ...style, borderColor: a.color, borderRadius: a.kind === "circle" ? "50%" : 2 }}
    />
  );
}

/** Renders placed annotations plus the one being dragged, and offers a delete affordance. */
export function AnnotationLayer({
  items, drafting, onRemove, interactive,
}: {
  items: Annotation[];
  drafting: Annotation | null;
  onRemove: (id: string) => void;
  interactive: boolean;
}) {
  return (
    <>
      {items.map((a) => (
        <div key={a.id} className="group pointer-events-none absolute inset-0">
          <Shape a={a} />
          {interactive && !isStroke(a) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(a.id);
              }}
              aria-label="Remove annotation"
              className="pointer-events-auto absolute grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ left: pct(a.relX + a.relWidth), top: pct(a.relY) }}
            >
              <X aria-hidden className="size-2.5" />
            </button>
          )}
        </div>
      ))}
      {drafting && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <Shape a={drafting} />
        </div>
      )}
    </>
  );
}
