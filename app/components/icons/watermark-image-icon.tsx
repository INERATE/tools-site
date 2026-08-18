"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/** A translucent diagonal stamp fades in across the photo. */
export function WatermarkImageIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" opacity="0.5" />
      <circle cx="9" cy="9" r="1.2" opacity="0.5" />
      <path d="M4.5 16l4.5-5 3.5 4 2.5-3 4.5 5" opacity="0.5" />
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.35 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      >
        <path d="M6 16l12-8" strokeWidth="3" opacity="0.55" />
      </motion.g>
    </IconShell>
  );
}
