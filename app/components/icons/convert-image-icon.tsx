"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/** A photo tile flips over a vertical axis, revealing a format label on its back. */
export function ConvertImageIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.2 }}
        variants={{ idle: { scaleX: 1, opacity: 1 }, active: { scaleX: 0, opacity: 0 } }}
      >
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
        <circle cx="9" cy="9" r="1.3" />
        <path d="M4.5 16l4.5-5 3.5 4 2.5-3 4.5 5" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.22, delay: 0.16 }}
        variants={{ idle: { scaleX: 0, opacity: 0 }, active: { scaleX: 1, opacity: 1 } }}
      >
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
        <path d="M8.5 15.5v-7h1.8a2.1 2.1 0 010 4.2H8.5" />
        <path d="M13.5 15.5l1.3-7h1l1.3 7" />
      </motion.g>
    </IconShell>
  );
}
