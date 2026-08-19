"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Full text lines condense down into two short summary lines with a spark. */
export function AiSummarizerIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M7.5 8h9M7.5 11h9M7.5 14h6M7.5 17h8"
        transition={spring}
        variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
      />
      <motion.path
        d="M8 10h8M8 13.5h5"
        transition={{ duration: 0.3, delay: 0.15 }}
        variants={{ idle: { opacity: 0, pathLength: 0 }, active: { opacity: 1, pathLength: 1 } }}
      />
      <motion.path
        d="M16.5 16l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"
        fill="currentColor"
        stroke="none"
        transition={{ duration: 0.25, delay: 0.35 }}
        variants={{ idle: { opacity: 0, scale: 0.4 }, active: { opacity: 1, scale: 1 } }}
      />
    </IconShell>
  );
}
