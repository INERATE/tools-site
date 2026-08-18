"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A crack across the page mends itself and a checkmark settles in. */
export function RepairPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M9 3l3 6-2 2 4 8"
        transition={spring}
        variants={{ idle: { opacity: 0.6, pathLength: 1 }, active: { opacity: 0, pathLength: 0 } }}
      />
      <path d="M8 8h4M8 11.5h8M8 15h6" opacity="0.4" />
      <motion.g
        style={{ transformOrigin: "17px 17px" }}
        transition={{ ...spring, delay: 0.15 }}
        variants={{ idle: { scale: 0, opacity: 0 }, active: { scale: 1, opacity: 1 } }}
      >
        <circle cx="17" cy="17" r="3.6" fill="currentColor" stroke="none" />
        <path d="M15.3 17l1.2 1.2 2.2-2.4" stroke="white" strokeWidth="1.4" />
      </motion.g>
    </IconShell>
  );
}
