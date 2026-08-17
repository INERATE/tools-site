"use client";

import { Lock } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The macOS chrome every tool works inside — traffic lights, a real-looking
 * local:// path, and a "no network" pill — the same window language as the
 * `#demo-stage` mockup on the landing page, so a tool page doesn't read like
 * a plain form after the premium hero.
 */
export function ToolWindow({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/92 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.22),0_16px_38px_-12px_var(--glow),inset_0_1.5px_1px_var(--glass-hi)] backdrop-blur-[36px]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full border border-[#E0443E]/50 bg-[#FF5F56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
          <span className="size-3 rounded-full border border-[#DEA123]/50 bg-[#FFBD2E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
          <span className="size-3 rounded-full border border-[#1AAB29]/50 bg-[#27C93F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
          <div className="ml-3 flex items-center gap-1.5 font-mono text-[11.5px] text-[var(--text-dim)]">
            <Lock className="size-3 text-emerald-400" />
            <span className="hidden sm:inline">local://this-browser-tab/{path}</span>
            <span className="sm:hidden">{path}</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          No network
        </span>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </div>
  );
}
