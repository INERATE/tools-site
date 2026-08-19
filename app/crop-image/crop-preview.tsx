"use client";

import type { Insets } from "../lib/crop-pdf";
import type { CropShape } from "../lib/crop-shape";
import { CropOverlay } from "../crop-pdf/crop-overlay";
import { ShapeOverlay } from "./shape-overlay";

/** The dashed-rectangle crop preview, with the shape mask layered on top inside the insets. */
export function CropPreview({ imageUrl, ratio, insets, shape }: { imageUrl: string; ratio: number; insets: Insets; shape: CropShape }) {
  const { top, bottom, left, right } = insets;
  return (
    <div className="relative mb-4">
      <CropOverlay pageUrl={imageUrl} pageRatio={ratio} insets={insets} />
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{ top: `${top * 100}%`, bottom: `${bottom * 100}%`, left: `${left * 100}%`, right: `${right * 100}%` }}
      >
        <ShapeOverlay shape={shape} imageUrl={imageUrl} />
      </div>
    </div>
  );
}
