"use client";

import { Eye, Image as ImageIcon, Layers, Square, Type } from "lucide-react";
import type { WatermarkConfig } from "../element-types";
import type { FontFamily, TextBlock } from "../types";
import { TypographyPanel } from "./typography-panel";
import { WatermarkPanel } from "./watermark-panel";

const HEAD = "mb-2.5 text-[10.5px] font-bold tracking-[0.09em] text-[var(--text-dim)] uppercase";

const LAYERS = [
  { icon: Type, name: "Text", on: true },
  { icon: ImageIcon, name: "Image", on: true },
  { icon: Square, name: "Shape", on: true },
  { icon: Layers, name: "Background", on: true },
];

export function Inspector({
  block, onFamily, match, watermark, onWatermark, hasDoc = false,
}: {
  block?: TextBlock | null;
  onFamily?: (id: string, family: FontFamily) => void;
  /** Placeholder copy shown before any PDF is open or any block selected. */
  match: string;
  watermark?: WatermarkConfig;
  onWatermark?: (patch: Partial<WatermarkConfig>) => void;
  hasDoc?: boolean;
}) {
  const confidence = block?.fontMatchConfidence;
  const low = confidence !== undefined && confidence < 60;

  return (
    <aside className="hidden w-[264px] shrink-0 overflow-y-auto border-l border-[var(--border)] p-4 xl:block">
      <div
        className={`mb-4 rounded-xl border px-3 py-2 ${
          low ? "border-amber-500/30 bg-amber-500/8" : "border-[var(--accent)]/30 bg-[var(--accent)]/8"
        }`}
      >
        <p className={`text-[10.5px] font-semibold ${low ? "text-amber-400" : "text-[var(--accent)]"}`}>
          {block ? "Font matched" : "No block selected"}
        </p>
        <p className="mt-0.5 text-[11px] text-[var(--text-dim)]">
          {block ? `${block.matchedFontName} · ${confidence}% confidence` : match}
        </p>
        {low && <p className="mt-1 text-[10.5px] text-amber-400/90">Low confidence — pick the family below to override.</p>}
      </div>

      <TypographyPanel block={block} onFamily={onFamily} />

      {watermark && onWatermark && (
        <WatermarkPanel value={watermark} onChange={onWatermark} disabled={!hasDoc} />
      )}

      <section className="border-t border-[var(--border)] pt-4">
        <h3 className={HEAD}>Layers</h3>
        <div className="flex flex-col gap-0.5">
          {LAYERS.map((l, i) => (
            <div
              key={l.name}
              className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[12px] ${
                i === 0 ? "bg-[var(--accent)]/12 text-[var(--accent)]" : "text-[var(--text-dim)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <l.icon aria-hidden className="size-3.5" />
                {l.name}
              </span>
              <Eye aria-hidden className="size-3.5 opacity-60" />
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
