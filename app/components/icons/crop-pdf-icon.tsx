"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Crop corner brackets close in from each edge onto the page. */
export function CropPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" opacity="0.4" />
      <motion.path
        d="M8 6v-1a1 1 0 011-1h1M16 4h1a1 1 0 011 1v1M18 16v1a1 1 0 01-1 1h-1M6 14v1a1 1 0 001 1h1"
        style={{ transformOrigin: "12px 11px" }}
        transition={spring}
        variants={{ idle: { scale: 1.3, opacity: 0.5 }, active: { scale: 0.82, opacity: 1 } }}
      />
    </IconShell>
  );
}
