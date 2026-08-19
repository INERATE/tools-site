"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A blank underline and an empty checkbox snap into real bordered field boxes. */
export function SmartFormsIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h9" opacity="0.5" />
      <motion.path
        d="M7.5 12h6"
        transition={spring}
        variants={{ idle: { opacity: 0.6 }, active: { opacity: 0 } }}
      />
      <motion.rect
        x="7"
        y="10.5"
        width="7"
        height="3"
        rx="0.8"
        transition={{ ...spring, delay: 0.1 }}
        variants={{ idle: { opacity: 0, scale: 0.7 }, active: { opacity: 1, scale: 1 } }}
      />
      <motion.rect
        x="7"
        y="15.5"
        width="3"
        height="3"
        rx="0.6"
        transition={{ ...spring, delay: 0.2 }}
        variants={{ idle: { opacity: 0.5, scale: 0.85 }, active: { opacity: 1, scale: 1 } }}
      />
      <motion.path
        d="M7.6 17l.7.7 1.3-1.4"
        transition={{ duration: 0.2, delay: 0.35 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
