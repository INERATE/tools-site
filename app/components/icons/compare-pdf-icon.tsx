"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Two pages slide apart to reveal the lines that differ between them. */
export function ComparePdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.rect
        x="3"
        y="4"
        width="11"
        height="16"
        rx="2"
        transition={spring}
        variants={{ idle: { x: 3 }, active: { x: 0 } }}
      />
      <motion.rect
        x="10"
        y="4"
        width="11"
        height="16"
        rx="2"
        transition={spring}
        variants={{ idle: { x: -3 }, active: { x: 0 } }}
      />
      <motion.path
        d="M8 9h4M8 13h4M14 9h4M14 13h4"
        transition={{ duration: 0.2, delay: 0.15 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
