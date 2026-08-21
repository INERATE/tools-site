"use client";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import type { FontFamily, TextBlock } from "../types";

const FIELD =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 px-2.5 py-1.5 text-[12px] text-[var(--text)] outline-none focus:border-[var(--accent)]";
const HEAD = "mb-2.5 text-[10.5px] font-bold tracking-[0.09em] text-[var(--text-dim)] uppercase";
const LABEL = "mb-1 block text-[10.5px] text-[var(--text-dim)]";

const FAMILIES: { value: FontFamily; label: string }[] = [
  { value: "serif", label: "Times (serif)" },
  { value: "sans", label: "Helvetica (sans)" },
  { value: "mono", label: "Courier (mono)" },
];

export function TypographyPanel({
  block, onFamily,
}: {
  block?: TextBlock | null;
  onFamily?: (id: string, family: FontFamily) => void;
}) {
  return (
    <section className="mb-5">
      <h3 className={HEAD}>Typography</h3>
      <label className={LABEL}>Family</label>
      <select
        className={FIELD}
        value={block?.matchedFamily ?? "sans"}
        disabled={!block}
        onChange={(e) => block && onFamily?.(block.id, e.target.value as FontFamily)}
      >
        {FAMILIES.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <select className={FIELD} defaultValue="Regular" disabled={!block} aria-label="Font weight">
          <option>Regular</option>
          <option>Bold</option>
        </select>
        <input
          type="number"
          min={1}
          aria-label="Font size"
          className={`${FIELD} text-center font-mono`}
          defaultValue={block?.fontSize ? Math.round(block.fontSize) : 11}
          disabled={!block}
        />
      </div>
      <div className="mt-2 flex gap-1">
        {[AlignLeft, AlignCenter, AlignRight, AlignJustify].map((I, i) => (
          <button
            key={i}
            className={`grid flex-1 place-items-center rounded-lg py-1.5 transition-colors ${
              i === 3 ? "bg-[var(--accent)]/15 text-[var(--accent)]" : "text-[var(--text-dim)] hover:bg-[var(--accent)]/8"
            }`}
          >
            <I aria-hidden className="size-3.5" />
          </button>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div>
          <label className={LABEL}>Line height</label>
          <input className={`${FIELD} text-center font-mono`} defaultValue="1.65" />
        </div>
        <div>
          <label className={LABEL}>Tracking</label>
          <input className={`${FIELD} text-center font-mono`} defaultValue="0" />
        </div>
      </div>
    </section>
  );
}
