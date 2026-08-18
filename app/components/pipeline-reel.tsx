"use client";

import { motion } from "motion/react";
import type { ComponentType } from "react";

/**
 * The looped "how it works" strip every tool's pipeline card leads with —
 * an input icon and an output icon joined by a flowing dashed line, with a
 * glowing pulse riding the line on an infinite loop. Pure SVG + Framer
 * Motion, no video file: nothing here is ever a downloadable asset, it is
 * shapes animating through keyframes, forever, like Apple's own looping
 * product diagrams.
 */
export function PipelineReel({
  from: From,
  to: To,
}: {
  from: ComponentType<{ className?: string }>;
  to: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="glass mb-3 flex h-16 items-center justify-between overflow-hidden rounded-xl px-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--accent)]/10 text-[var(--accent)]"
      >
        <From className="size-4" />
      </motion.div>

      <svg viewBox="0 0 100 12" className="mx-2 h-3 w-full" preserveAspectRatio="none">
        <line x1="2" y1="6" x2="98" y2="6" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
        <motion.circle
          r="2.2"
          cy="6"
          fill="var(--accent)"
          initial={{ cx: 2, opacity: 0 }}
          animate={{ cx: [2, 98], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", times: [0, 0.15, 0.85, 1] }}
        />
      </svg>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        className="grid size-8 shrink-0 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      >
        <To className="size-4" />
      </motion.div>
    </div>
  );
}
