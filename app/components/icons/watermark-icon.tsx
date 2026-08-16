"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/**
 * A light sweep crosses the page; the diagonal watermark bar dissolves behind it.
 * The sweep is a decorative timeline, so durations are correct here, not springs.
 */
export function WatermarkIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8.5h6M7.5 12h9M7.5 15.5h5" />
      <motion.path
        d="M7 16.5 17 7.5"
        strokeWidth={2.5}
        transition={{ duration: 0.25, delay: 0.2 }}
        variants={{ idle: { opacity: 0.85 }, active: { opacity: 0 } }}
      />
      <motion.path
        d="M4 3v18"
        strokeWidth={2}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        variants={{
          idle: { x: 0, opacity: 0 },
          active: { x: 16, opacity: [0, 1, 0] },
        }}
      />
    </IconShell>
  );
}
