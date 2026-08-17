"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

/** Idle, running, or done — whichever the demo is currently in. */
export function ResultState({ processing, done }: { processing: boolean; done: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {processing ? (
        <motion.div
          key="proc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-3"
        >
          <div className="flex justify-between text-[10.5px]">
            <span className="text-[var(--text)]">Writing pages</span>
            <span className="text-[var(--accent)]">Working…</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
            <motion.div
              className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3))]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.38, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      ) : done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3"
        >
          <div className="flex items-center gap-2 text-[11.5px] font-bold text-emerald-400">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Merged on this device</span>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-dim)]">
            <span>Egress: 0 B</span>
            <span>Output: Merged_Bundle.pdf</span>
          </div>
          <Link
            href="/pdf-merger"
            className="mt-1 flex items-center justify-center gap-1 rounded bg-emerald-500/20 py-1 text-[11px] font-bold text-emerald-300 transition-colors hover:bg-emerald-500/30"
          >
            <span>Open Real Tool</span>
            <ArrowRight className="size-3" />
          </Link>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-raised)]/50 p-2.5 text-[10.5px] text-[var(--text-dim)]">
          <span>Where it runs:</span>
          <span className="font-bold text-[var(--text)]">This browser tab</span>
        </div>
      )}
    </AnimatePresence>
  );
}
