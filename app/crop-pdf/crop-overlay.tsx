"use client";

import type { Insets } from "../lib/crop-pdf";

/** A live dashed rectangle over the source page, showing what the crop will keep. */
export function CropOverlay({ pageUrl, pageRatio, insets }: { pageUrl: string; pageRatio: number; insets: Insets }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white" style={{ aspectRatio: pageRatio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pageUrl} alt="Page to crop" className="block h-full w-full object-contain opacity-40" />
      <div
        className="absolute rounded-sm outline-dashed outline-2 outline-[var(--accent)]"
        style={{
          top: `${insets.top * 100}%`,
          bottom: `${insets.bottom * 100}%`,
          left: `${insets.left * 100}%`,
          right: `${insets.right * 100}%`,
        }}
      />
    </div>
  );
}
