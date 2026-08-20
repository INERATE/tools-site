"use client";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Eye, Image as ImageIcon, Layers, Square, Type } from "lucide-react";

const FIELD =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 px-2.5 py-1.5 text-[12px] text-[var(--text)] outline-none focus:border-[var(--accent)]";
const HEAD = "mb-2.5 text-[10.5px] font-bold tracking-[0.09em] text-[var(--text-dim)] uppercase";
const LABEL = "mb-1 block text-[10.5px] text-[var(--text-dim)]";

const LAYERS = [
  { icon: Type, name: "Text", on: true },
  { icon: ImageIcon, name: "Image", on: true },
  { icon: Square, name: "Shape", on: true },
  { icon: Layers, name: "Background", on: true },
];

export function Inspector({ match }: { match: string }) {
  return (
    <aside className="hidden w-[264px] shrink-0 overflow-y-auto border-l border-[var(--border)] p-4 xl:block">
      <div className="mb-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-3 py-2">
        <p className="text-[10.5px] font-semibold text-[var(--accent)]">Font matched</p>
        <p className="mt-0.5 text-[11px] text-[var(--text-dim)]">{match}</p>
      </div>

      <section className="mb-5">
        <h3 className={HEAD}>Typography</h3>
        <label className={LABEL}>Family</label>
        <select className={FIELD} defaultValue="Times New Roman">
          <option>Times New Roman</option>
          <option>Helvetica</option>
          <option>Inter</option>
          <option>Computer Modern</option>
        </select>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <select className={FIELD} defaultValue="Regular">
            <option>Regular</option>
            <option>Bold</option>
          </select>
          <input className={`${FIELD} text-center font-mono`} defaultValue={11} />
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

      <section className="mb-5 border-t border-[var(--border)] pt-4">
        <h3 className={HEAD}>Watermark</h3>
        <input className={FIELD} defaultValue="CONFIDENTIAL" />
        <label className={`${LABEL} mt-2`}>Angle — 30°</label>
        <input type="range" defaultValue={30} min={-90} max={90} className="w-full accent-[var(--accent)]" />
        <label className={`${LABEL} mt-1`}>Opacity — 30%</label>
        <input type="range" defaultValue={30} className="w-full accent-[var(--accent)]" />
      </section>

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
