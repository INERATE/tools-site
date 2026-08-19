"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Raised, editable field boxes press flat into the page. */
export function FlattenFormIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.rect
        x="7"
        y="8"
        width="10"
        height="3"
        rx="0.8"
        transition={spring}
        variants={{ idle: { y: -0.5, opacity: 1 }, active: { y: 0, opacity: 0.55 } }}
      />
      <motion.rect
        x="7"
        y="13"
        width="6"
        height="3"
        rx="0.8"
        transition={{ ...spring, delay: 0.1 }}
        variants={{ idle: { y: -0.5, opacity: 1 }, active: { y: 0, opacity: 0.55 } }}
      />
      <motion.path
        d="M7 17.5h10"
        transition={{ ...spring, delay: 0.2 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 0.5 } }}
      />
    </IconShell>
  );
}
