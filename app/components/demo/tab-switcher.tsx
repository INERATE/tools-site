"use client";

import { motion } from "motion/react";
import { Layers, Scissors, Eraser } from "lucide-react";
import type { ToolMode } from "./types";

const TABS: { id: ToolMode; label: string; icon: typeof Layers; sm?: boolean }[] = [
  { id: "merge", label: "PDF Merger", icon: Layers },
  { id: "split", label: "Splitter", icon: Scissors },
  { id: "watermark", label: "Watermark", icon: Eraser, sm: true },
];

/** macOS segmented control with a shared layout-animated active pill. */
export function TabSwitcher({ active, onChange }: { active: ToolMode; onChange: (t: ToolMode) => void }) {
  return (
    <div className="relative flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg)]/60 p-1 text-[12px]">
      {TABS.map(({ id, label, icon: Icon, sm }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`relative z-10 flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors
            ${sm ? "hidden sm:flex" : ""}
            ${active === id ? "font-semibold text-[var(--text)]" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}
        >
          {active === id && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute inset-0 rounded-md bg-[var(--glass-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Icon className="size-3.5" />
            <span className="whitespace-nowrap">{label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
