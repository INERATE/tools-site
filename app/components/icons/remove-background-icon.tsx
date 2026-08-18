"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** The background square dissolves into a checkerboard while the subject stays solid. */
export function RemoveBackgroundIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.g
        transition={{ duration: 0.3 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 0.35 } }}
      >
        <path d="M4 4h4v4H4zM12 4h4v4h-4zM8 8h4v4H8zM16 8h4v4h-4zM4 12h4v4H4zM12 12h4v4h-4zM8 16h4v4H8zM16 16h4v4h-4z" />
      </motion.g>
      <motion.rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2.5"
        transition={spring}
        variants={{ idle: { opacity: 0.9 }, active: { opacity: 0 } }}
      />
      <circle cx="12" cy="10.5" r="3" />
      <path d="M6.5 18.5c1.2-3 3.4-4.5 5.5-4.5s4.3 1.5 5.5 4.5" />
    </IconShell>
  );
}
