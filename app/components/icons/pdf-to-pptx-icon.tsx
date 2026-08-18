"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** The page splits into a stack of slides fanning out from behind it. */
export function PdfToPptxIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.rect
        x="7"
        y="4"
        width="12"
        height="8"
        rx="1.2"
        style={{ transformOrigin: "13px 8px" }}
        transition={{ ...spring, delay: 0.06 }}
        variants={{ idle: { x: 0, y: 8, opacity: 0 }, active: { x: -2, y: -1, opacity: 1 } }}
      />
      <motion.rect
        x="7"
        y="4"
        width="12"
        height="8"
        rx="1.2"
        style={{ transformOrigin: "13px 8px" }}
        transition={spring}
        variants={{ idle: { x: 0, y: 4, opacity: 0 }, active: { x: 2, y: 3, opacity: 1 } }}
      />
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 8h5M8 11h8" opacity="0.6" />
    </IconShell>
  );
}
