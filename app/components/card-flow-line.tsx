"use client";

import { motion } from "motion/react";

/** A compact looped "how it works" flow line for tool cards on the browse grid — the same motif as each tool's own pipeline reel, shrunk to fit a card footer. Pure SVG, always looping, nothing downloadable. */
export function CardFlowLine() {
  return (
    <svg viewBox="0 0 100 8" className="h-2 w-full" preserveAspectRatio="none" aria-hidden>
      <line x1="2" y1="4" x2="98" y2="4" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="2.5 2.5" />
      <motion.circle
        r="1.8"
        cy="4"
        fill="var(--accent)"
        initial={{ cx: 2, opacity: 0 }}
        animate={{ cx: [2, 98], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", times: [0, 0.12, 0.88, 1] }}
      />
    </svg>
  );
}
