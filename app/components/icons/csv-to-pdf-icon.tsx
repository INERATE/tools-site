"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A comma-separated grid straightens into ruled PDF table rows. */
export function CsvToPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.g transition={spring} variants={{ idle: { opacity: 0.55 }, active: { opacity: 1 } }}>
        <path d="M7 9h10" />
        <path d="M7 13h10" />
        <path d="M7 17h10" />
      </motion.g>
      <motion.g
        transition={{ ...spring, delay: 0.1 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      >
        <path d="M9.5 9v8" />
        <path d="M14.5 9v8" />
      </motion.g>
    </IconShell>
  );
}
