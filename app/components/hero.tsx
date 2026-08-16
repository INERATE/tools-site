"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      className="mb-16 flex flex-col items-center gap-5 text-center"
    >
      <span className="glass rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
        Free, Private, Browser-Based
      </span>
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
        Document tools that <span className="font-normal text-[var(--accent)] italic">just work</span>
      </h1>
      <p className="max-w-lg text-lg leading-relaxed text-[var(--text-dim)]">
        Merge, split, convert. Nothing leaves your browser — no uploads, no waiting, no watermark on the free plan.
      </p>
    </motion.div>
  );
}
