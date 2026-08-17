"use client";

import { Lock } from "lucide-react";
import { TabSwitcher } from "./tab-switcher";
import type { ToolMode } from "./types";

/** Traffic lights, the mode switcher, and the "no network" status pill. */
export function WindowTitlebar({ active, onChange }: { active: ToolMode; onChange: (t: ToolMode) => void }) {
  return (
    <div className="relative z-10 flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full border border-[#E0443E]/50 bg-[#FF5F56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
        <span className="size-3 rounded-full border border-[#DEA123]/50 bg-[#FFBD2E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
        <span className="size-3 rounded-full border border-[#1AAB29]/50 bg-[#27C93F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />

        <div className="ml-3 hidden items-center gap-1.5 text-[11.5px] font-mono text-[var(--text-dim)] md:flex">
          <Lock className="size-3 text-emerald-400" />
          <span>local://this-browser-tab/pdf-merger</span>
        </div>
      </div>

      <TabSwitcher active={active} onChange={onChange} />

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
          <span className="size-1.5 animate-ping rounded-full bg-emerald-400" />
          <span className="whitespace-nowrap">No network</span>
        </span>
      </div>
    </div>
  );
}
