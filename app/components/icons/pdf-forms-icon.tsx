"use client";

import { motion } from "motion/react";
import { IconShell, type IconProps } from "./icon-shell";

/** Empty field boxes fill in one by one, then a checkmark settles into the last one. */
export function PdfFormsIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <rect x="7.5" y="7.5" width="9" height="2.6" rx="0.6" opacity="0.5" />
      <rect x="7.5" y="12" width="9" height="2.6" rx="0.6" opacity="0.5" />
      <motion.rect
        x="7.8"
        y="7.8"
        width="0"
        height="2"
        rx="0.4"
        fill="currentColor"
        stroke="none"
        transition={{ duration: 0.3 }}
        variants={{ idle: { width: 0 }, active: { width: 8.4 } }}
      />
      <motion.rect
        x="7.8"
        y="12.3"
        width="0"
        height="2"
        rx="0.4"
        fill="currentColor"
        stroke="none"
        transition={{ duration: 0.3, delay: 0.15 }}
        variants={{ idle: { width: 0 }, active: { width: 8.4 } }}
      />
      <motion.path
        d="M8 17l2 2 4-4.5"
        transition={{ duration: 0.3, delay: 0.35 }}
        variants={{ idle: { pathLength: 0, opacity: 0 }, active: { pathLength: 1, opacity: 1 } }}
      />
    </IconShell>
  );
}
