"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/**
 * The W collapses on its vertical axis and the P opens out of it —
 * a card flip in 2D (real rotateY on SVG children is unreliable).
 */
export function DocxIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M8 9.5l1.5 5 1.5-3.4 1.5 3.4 1.5-5"
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.16 }}
        variants={{
          idle: { scaleX: 1, opacity: 1 },
          active: { scaleX: 0, opacity: 0 },
        }}
      />
      <motion.path
        d="M10 15.5v-6h2.4a1.8 1.8 0 010 3.6H10"
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.2, delay: 0.16 }}
        variants={{
          idle: { scaleX: 0, opacity: 0 },
          active: { scaleX: 1, opacity: 1 },
        }}
      />
    </IconShell>
  );
}
