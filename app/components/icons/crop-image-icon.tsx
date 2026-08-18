"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Crop corner brackets close in on a photo — same motif as Crop PDF, photo-flavored. */
export function CropImageIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" opacity="0.35" />
      <circle cx="9" cy="9" r="1.2" opacity="0.35" />
      <path d="M4.5 16l4.5-5 3.5 4 2.5-3 4.5 5" opacity="0.35" />
      <motion.path
        d="M8 6v-1a1 1 0 011-1h1M16 4h1a1 1 0 011 1v1M18 16v1a1 1 0 01-1 1h-1M6 14v1a1 1 0 001 1h1"
        style={{ transformOrigin: "12px 11px" }}
        transition={spring}
        variants={{ idle: { scale: 1.3, opacity: 0.5 }, active: { scale: 0.82, opacity: 1 } }}
      />
    </IconShell>
  );
}
