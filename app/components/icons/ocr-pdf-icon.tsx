"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/** A scan line sweeps down the page, leaving recognized text lines behind it. */
export function OcrPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h6M7.5 12h9M7.5 16h7" opacity="0.4" />
      <motion.path
        d="M7.5 8h6M7.5 12h9M7.5 16h7"
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        variants={{ idle: { pathLength: 0, opacity: 0 }, active: { pathLength: 1, opacity: 1 } }}
      />
      <motion.line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
        stroke="var(--accent)"
        strokeWidth="1.6"
        transition={{ duration: 0.9, ease: "linear" }}
        variants={{ idle: { y: 6, opacity: 0 }, active: { y: [6, 19, 6], opacity: 1 } }}
      />
    </IconShell>
  );
}
