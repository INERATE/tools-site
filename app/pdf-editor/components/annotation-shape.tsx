"use client";

import { isStroke, type Annotation, type BoxLike } from "../annotation-types";

/**
 * Visual rendering for placed annotations, shapes, and mosaic/whiteout/blackout redactions.
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
    : {
        left: `${b.relX * 100}%`,
        top: `${b.relY * 100}%`,
        width: `${b.relWidth * 100}%`,
        height: `${b.relHeight * 100}%`,
      };
  const style = { position: "absolute" as const, ...box };

  // Redactions
  if (b.kind === "redact") {
    if (b.redactStyle === "blur") {
      // Authentic Mosaic Pixelated Censor Effect
      return (
        <div
          style={{
            ...style,
            backdropFilter: "blur(14px) contrast(1.1) brightness(0.95)",
            WebkitBackdropFilter: "blur(14px) contrast(1.1) brightness(0.95)",
            backgroundColor: "rgba(225, 230, 240, 0.45)",
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.14) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.14) 1px, transparent 1px),
              repeating-conic-gradient(rgba(0,0,0,0.06) 0% 25%, rgba(255,255,255,0.18) 0% 50%)
            `,
            backgroundSize: "10px 10px, 10px 10px, 20px 20px",
            border: "1px dashed rgba(99, 102, 241, 0.6)",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.08)",
          }}
        />
      );
    }
    if (b.redactStyle === "whiteout") {
      return (
        <div
          style={{
            ...style,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        />
      );
    }
    // Default blackout
    return <div style={{ ...style, background: "#000000" }} />;
  }

  // Highlight Box
  if (b.kind === "highlight") {
    return (
      <div
        style={{
          ...style,
          background: b.color || "#fef08a",
          opacity: 0.45,
          mixBlendMode: "multiply",
          borderRadius: 2,
        }}
      />
    );
  }

  // Circle / Oval
  if (b.kind === "circle") {
    return (
      <div
        style={{
          ...style,
          border: `2px solid ${b.color ?? "#4f46e5"}`,
          borderRadius: "50%",
          background: "transparent",
        }}
      />
    );
  }

  // Line
  if (b.kind === "line") {
    return (
      <svg className="pointer-events-none absolute inset-0 size-full" style={style}>
        <line x1="0%" y1="0%" x2="100%" y2="100%" stroke={b.color ?? "#4f46e5"} strokeWidth="2" />
      </svg>
    );
  }

  // Image or Signature
  if ((b.kind === "signature" || b.kind === "image") && b.dataUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={b.dataUrl} alt="" draggable={false} style={{ ...style, objectFit: "contain" }} />;
  }

  // Rectangle shape default
  return (
    <div
      style={{
        ...style,
        border: `2px solid ${b.color ?? "#4f46e5"}`,
        borderRadius: 2,
        background: "transparent",
      }}
    />
  );
}
