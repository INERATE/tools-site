"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A photo shrinks to a thumbnail and docks into a page; a folded corner and two text lines settle in beside it. */
export function JpgToPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M13.5 3v4.5a1 1 0 0 0 1 1H19"
        style={{ transformOrigin: "16px 4.5px" }}
        transition={spring}
        variants={{ idle: { opacity: 0, scale: 0.6 }, active: { opacity: 1, scale: 1 } }}
      />
      <motion.g
        style={{ transformOrigin: "9px 9px" }}
        transition={spring}
        variants={{ idle: { scale: 1.15, x: 0, y: 0 }, active: { scale: 0.85, x: -0.5, y: -1 } }}
      >
        <rect x="6.5" y="6" width="7" height="6" rx="1" />
        <circle cx="9.5" cy="8" r="0.9" />
        <path d="M6.5 11l2-2.2 1.6 1.6 1.4-1.4 2 2" />
      </motion.g>
      <motion.path
        d="M6.5 15h11M6.5 18h7"
        transition={{ duration: 0.25, delay: 0.1 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
