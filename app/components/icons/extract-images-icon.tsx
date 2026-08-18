"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A photo tile slides out from behind the page and settles beside it. */
export function ExtractImagesIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="12" height="16" rx="2" opacity="0.5" />
      <path d="M6.5 15l2.2-2.8 1.6 1.8 1.5-1.9 2.2 2.9" opacity="0.5" />
      <circle cx="8" cy="7.5" r="1.1" opacity="0.5" />
      <motion.g
        style={{ transformOrigin: "16px 14px" }}
        transition={spring}
        variants={{ idle: { x: -2, y: 0, opacity: 0, scale: 0.85 }, active: { x: 3, y: 1, opacity: 1, scale: 1 } }}
      >
        <rect x="12" y="8" width="9" height="7" rx="1.4" fill="currentColor" stroke="none" opacity="0.15" />
        <rect x="12" y="8" width="9" height="7" rx="1.4" />
        <circle cx="14.5" cy="10.3" r="0.8" />
        <path d="M12.5 14l2-1.8 1.3 1.1 1.7-1.6 2.5 2.3" />
      </motion.g>
    </IconShell>
  );
}
