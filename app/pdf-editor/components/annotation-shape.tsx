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
      // Clean, premium frosted glass blur filter
      return (
        <div
          style={{
            ...style,
            backdropFilter: "blur(12px) saturate(1.2)",
            WebkitBackdropFilter: "blur(12px) saturate(1.2)",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
            borderRadius: 2,
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

  // Form fields — placeholders only. These become real AcroForm widgets on
  // export, so what is drawn here is a preview, not the thing itself.
  if (b.kind === "text-field" || b.kind === "checkbox" || b.kind === "sig-field") {
    const label = b.kind === "checkbox" ? "✓" : b.kind === "sig-field" ? "Sign here" : "Text field";
    return (
      <div
        style={{
          ...style,
          border: "1.5px dashed #4f46e5",
          background: "rgba(79,70,229,0.06)",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: b.kind === "checkbox" ? "center" : "flex-start",
          padding: b.kind === "checkbox" ? 0 : "0 4px",
          font: "500 10px system-ui, sans-serif",
          color: "#4f46e5",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    );
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
