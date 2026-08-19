"use client";

import type { CropShape } from "../lib/crop-shape";

/**
 * Live preview of the shape mask, laid over the (already inset-cropped) rectangle.
 * Built-ins use CSS clip-path; Custom renders through an inline SVG clipPath so the
 * 0-100 path viewBox matches exactly what the canvas export scales it to.
 */
export function ShapeOverlay({ shape, imageUrl }: { shape: CropShape; imageUrl: string }) {
  if (shape.kind === "rect") return null;

  if (shape.kind === "custom") {
    if (!shape.d.trim()) return null;
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <clipPath id="custom-crop-shape" clipPathUnits="userSpaceOnUse">
            <path d={shape.d} />
          </clipPath>
        </defs>
        <image href={imageUrl} width="100" height="100" preserveAspectRatio="none" clipPath="url(#custom-crop-shape)" />
      </svg>
    );
  }

  const clip = shape.kind === "circle" ? "circle(closest-side at 50% 50%)" : `inset(0 round ${shape.radius * 100}%)`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imageUrl} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: clip }} />
  );
}
