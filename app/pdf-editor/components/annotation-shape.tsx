"use client";

import { isStroke, type Annotation, type BoxLike } from "../annotation-types";

/**
 * The visual for one annotation. `fill` renders it filling its parent box
 * (used by placed, draggable items); otherwise it positions itself absolutely
 * from its own fractional coordinates (used by strokes and the live draft).
 */
export function AnnotationShape({ a, fill = false }: { a: Annotation; fill?: boolean }) {
  if (isStroke(a)) {
    return (
      <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={a.points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")}
          fill="none"
          stroke={a.color}
          strokeWidth={a.size}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  const b = a as BoxLike;
  const box = fill
    ? { inset: 0 as const }
    : { left: `${b.relX * 100}%`, top: `${b.relY * 100}%`, width: `${b.relWidth * 100}%`, height: `${b.relHeight * 100}%` };
  const style = { position: "absolute" as const, ...box };

  if (b.kind === "redact") return <div style={{ ...style, background: "#000" }} />;
  if (b.kind === "highlight") return <div style={{ ...style, background: b.color, opacity: 0.35 }} />;
  if ((b.kind === "signature" || b.kind === "image") && b.dataUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={b.dataUrl} alt="" draggable={false} style={{ ...style, objectFit: "contain" }} />;
  }
  return (
    <div
      style={{
        ...style,
        border: `1.5px solid ${b.color ?? "#e11d48"}`,
        borderRadius: b.kind === "circle" ? "50%" : 2,
      }}
    />
  );
}
