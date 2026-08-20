"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/** A translucent diagonal stamp fades in across the page. */
export function WatermarkPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h6M7.5 11.5h9M7.5 15h9" opacity="0.5" />
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.35 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      >
        <path d="M6 17l12-10" strokeWidth="3" opacity="0.55" />
      </motion.g>
    </IconShell>
  );
}
