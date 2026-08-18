"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Angle-bracket tags fade out while page lines fade in — markup becomes text. */
export function HtmlToPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M8 8l-1.6 2L8 12M16 8l1.6 2L16 12M10.5 7l-1 6.5"
        style={{ transformOrigin: "12px 10px" }}
        transition={spring}
        variants={{ idle: { opacity: 1, scale: 1 }, active: { opacity: 0, scale: 0.8 } }}
      />
      <motion.path
        d="M7 9.5h10M7 12.5h10"
        transition={{ duration: 0.25, delay: 0.1 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
      <path d="M7.5 16h9M7.5 18.5h6" opacity="0.5" />
    </IconShell>
  );
}
