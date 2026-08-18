"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A grid of cells collapses into flowing text lines — spreadsheet becomes page. */
export function ExcelToPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.g
        transition={spring}
        variants={{ idle: { opacity: 1, scaleY: 1 }, active: { opacity: 0, scaleY: 0.7 } }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <path d="M7 8h10M7 12h10M7 16h10M10 6v13M14 6v13" />
      </motion.g>
      <motion.path
        d="M7.5 9h9M7.5 12.5h9M7.5 16h6"
        transition={{ duration: 0.25, delay: 0.1 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
