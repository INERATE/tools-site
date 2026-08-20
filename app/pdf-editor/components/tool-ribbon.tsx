"use client";

import {
  Droplets, Image as ImageIcon, Link2, Minus, MousePointer2, PenLine,
  PenTool, Plus, ShieldAlert, Square, Type,
} from "lucide-react";
import type { EditorMode } from "../types";

const TABS = ["Edit", "Annotate", "Pages", "Convert", "Protect"] as const;

export const TOOLS: { id: EditorMode; icon: typeof Type; label: string }[] = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "edit-text", icon: Type, label: "Text" },
  { id: "image", icon: ImageIcon, label: "Image" },
  { id: "draw", icon: PenLine, label: "Draw" },
  { id: "shapes", icon: Square, label: "Shape" },
  { id: "watermark", icon: Droplets, label: "Watermark" },
  { id: "esign", icon: PenTool, label: "eSign" },
  { id: "redact", icon: ShieldAlert, label: "Redact" },
  { id: "console", icon: Link2, label: "Link" },
];

export function ToolRibbon({
  tab, onTab, tool, onTool, zoom, onZoom,
}: {
  tab: string; onTab: (v: string) => void;
  tool: EditorMode; onTool: (v: EditorMode) => void;
  zoom: number; onZoom: (v: number) => void;
}) {
  return (
    <div className="relative z-20 flex shrink-0 flex-col gap-2 border-b border-[var(--border)] px-4 py-2.5">
      <div className="glass flex w-fit items-center gap-0.5 rounded-full p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => onTab(t)}
            className={`relative z-2 rounded-full px-3.5 py-1 text-[12.5px] font-semibold transition-colors ${
              tab === t ? "bg-[var(--accent)] text-[var(--on-accent)]" : "text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-1">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => onTool(t.id)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                tool === t.id
                  ? "bg-[var(--accent)]/15 text-[var(--text)] ring-1 ring-[var(--accent)]/40"
                  : "text-[var(--text-dim)] hover:bg-[var(--accent)]/8 hover:text-[var(--text)]"
              }`}
            >
              <t.icon aria-hidden className="size-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 text-[12px] text-[var(--text-dim)]">
          <button onClick={() => onZoom(Math.max(50, zoom - 25))} className="grid size-6 place-items-center rounded-md hover:bg-[var(--accent)]/10">
            <Minus aria-hidden className="size-3" />
          </button>
          <span className="w-11 text-center font-mono text-[var(--text)]">{zoom}%</span>
          <button onClick={() => onZoom(Math.min(200, zoom + 25))} className="grid size-6 place-items-center rounded-md hover:bg-[var(--accent)]/10">
            <Plus aria-hidden className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
