"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A blank page slides out from behind a stack of written pages. */
export function RemoveBlankPagesIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="4" width="13" height="16" rx="2" />
      <path d="M7.5 9h6" opacity="0.5" />
      <path d="M7.5 13h6" opacity="0.5" />
      <path d="M7.5 17h4" opacity="0.5" />
      <motion.g
        transition={spring}
        variants={{ idle: { x: 0, opacity: 1 }, active: { x: 7, opacity: 0 } }}
      >
        <rect x="9" y="2" width="13" height="16" rx="2" />
      </motion.g>
    </IconShell>
  );
}
