"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A photo frame squeezes inward while corner arrows close in — same squeeze motif as Compress PDF, photo-flavored. */
export function CompressImageIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        transition={spring}
        variants={{ idle: { scale: 1 }, active: { scale: 0.72 } }}
      >
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
        <circle cx="9" cy="9" r="1.3" />
        <path d="M4.5 16l4.5-5 3.5 4 2.5-3 4.5 5" />
      </motion.g>
      <motion.path
        d="M9 5.5l3 1.8 3-1.8M9 18.5l3-1.8 3 1.8"
        transition={spring}
        variants={{ idle: { y: 0, opacity: 0.5 }, active: { y: 0, opacity: 1 } }}
      />
    </IconShell>
  );
}
