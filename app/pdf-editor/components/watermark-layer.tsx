"use client";

import type { WatermarkConfig } from "../element-types";

export function WatermarkLayer({
  watermark,
  pageIndex,
  pageCount,
}: {
  watermark?: WatermarkConfig | null;
  pageIndex: number;
  pageCount: number;
}) {
  if (!watermark || !watermark.enabled || !watermark.text) return null;

  // Check page filter
  if (watermark.pages === "first" && pageIndex !== 0) return null;
  if (watermark.pages === "custom" && watermark.customPages) {
    const list = watermark.customPages.split(",").map((s) => parseInt(s.trim(), 10) - 1);
    if (!list.includes(pageIndex)) return null;
  }

  const opacity = watermark.opacity ?? 0.3;
  const rotation = watermark.rotation ?? (watermark.layout === "diagonal" ? -35 : 0);
  const text = watermark.text || "CONFIDENTIAL";
  const color = watermark.color || "#e11d48";

  if (watermark.layout === "grid") {
    return (
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-around overflow-hidden select-none">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="flex justify-around">
            {[0, 1, 2].map((col) => (
              <span
                key={col}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  opacity,
                  color,
                  fontFamily: "Arial, sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (watermark.layout === "footer") {
    return (
      <div className="pointer-events-none absolute bottom-4 inset-x-0 z-20 flex justify-center overflow-hidden select-none">
        <span
          style={{
            opacity,
            color,
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  // Diagonal / Horizontal single center watermark
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden select-none">
      <span
        style={{
          transform: `rotate(${rotation}deg)`,
          opacity,
          color,
          fontFamily: "Arial, sans-serif",
          fontSize: "48px",
          fontWeight: 800,
          whiteSpace: "nowrap",
          letterSpacing: "4px",
        }}
      >
        {text}
      </span>
    </div>
  );
}
