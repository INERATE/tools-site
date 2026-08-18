"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/** A cursive signature draws itself across the bottom of the page. */
export function SignPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h6M7.5 11.5h9" opacity="0.5" />
      <motion.path
        d="M7 17.5c1-2 2-2 2.5-.5s1.2 1.5 2-.3 1.5-2.2 2.3-.5 1.7 1.5 3.2-1"
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        variants={{ idle: { pathLength: 0, opacity: 0 }, active: { pathLength: 1, opacity: 1 } }}
      />
    </IconShell>
  );
}
