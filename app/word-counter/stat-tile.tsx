"use client";

import { motion } from "motion/react";

const SPRING = { type: "spring", bounce: 0.35, duration: 0.4 } as const;

/** One live-updating stat — the number pops on every change, spring-damped. */
export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass flex flex-col items-center gap-1 rounded-xl px-3 py-4 text-center">
      <motion.span
        key={String(value)}
        initial={{ opacity: 0, y: -4, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={SPRING}
        className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--accent)]"
      >
        {value}
      </motion.span>
      <span className="text-[11px] font-medium tracking-[0.04em] text-[var(--text-dim)] uppercase">{label}</span>
    </div>
  );
}
