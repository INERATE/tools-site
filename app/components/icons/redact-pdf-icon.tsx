"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A solid bar sweeps in and permanently covers a line of text. */
export function RedactPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h9M7.5 16h6" opacity="0.5" />
      <motion.rect
        x="7"
        y="11"
        width="0"
        height="4"
        rx="0.6"
        fill="currentColor"
        stroke="none"
        style={{ transformOrigin: "7px 13px" }}
        transition={spring}
        variants={{ idle: { width: 0 }, active: { width: 10 } }}
      />
    </IconShell>
  );
}
