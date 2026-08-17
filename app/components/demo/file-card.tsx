"use client";

import { FileText } from "lucide-react";
import { motion } from "motion/react";

/** One illustrative loaded-file row in the demo workspace. */
export function FileCard({ name, meta, pages }: { name: string; meta: string; pages: string }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-[var(--accent)]/50"
    >
      <div className="flex items-center gap-3">
        <div className="clay-icon grid size-9 place-items-center text-[var(--accent)]">
          <FileText className="size-4.5" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[13px] font-semibold text-[var(--text)]">{name}</span>
          <span className="font-mono text-[11px] text-[var(--text-dim)]">{meta}</span>
        </div>
      </div>
      <span className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-dim)]">
        {pages}
      </span>
    </motion.div>
  );
}
