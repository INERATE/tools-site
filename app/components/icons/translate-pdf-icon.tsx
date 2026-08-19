"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Text lines fade out while a language-swap glyph draws in. */
export function TranslatePdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M7.5 8h9M7.5 11h9M7.5 14h6M7.5 17h8"
        transition={spring}
        variants={{ idle: { opacity: 1 }, active: { opacity: 0.15 } }}
      />
      <motion.g transition={{ duration: 0.3, delay: 0.1 }} variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}>
        <path d="M8 10.5h4M10 9v1.5c0 2-1 3.3-2.5 4" />
        <path d="M8.8 11.8c.6.9 1.6 1.6 2.7 1.9" />
        <path d="M13.5 16.5l2-4.5 2 4.5M13.9 15.5h3.2" />
      </motion.g>
    </IconShell>
  );
}
