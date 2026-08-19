"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A photo frame's mountain glyph resolves into text lines — pixels reading themselves. */
export function ImageToTextIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <motion.g transition={spring} variants={{ idle: { opacity: 1, y: 0 }, active: { opacity: 0, y: -2 } }}>
        <circle cx="8" cy="9" r="1.4" />
        <path d="M4.5 17.5 9 12l3 3.5 3-3L19.5 17.5" />
      </motion.g>
      <motion.g
        transition={{ ...spring, delay: 0.08 }}
        variants={{ idle: { opacity: 0, y: 2 }, active: { opacity: 1, y: 0 } }}
      >
        <path d="M6 9h5" />
        <path d="M6 12.5h12" />
        <path d="M6 16h9" />
      </motion.g>
    </IconShell>
  );
}
