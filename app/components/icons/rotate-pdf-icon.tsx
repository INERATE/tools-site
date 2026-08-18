"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** The page tilts on its centre while a circular arrow sweeps around it. */
export function RotatePdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.rect
        x="6"
        y="3"
        width="12"
        height="16"
        rx="2"
        style={{ transformOrigin: "12px 11px" }}
        transition={spring}
        variants={{ idle: { rotate: 0 }, active: { rotate: -14 } }}
      />
      <motion.path
        d="M17 19a7 7 0 10-2-8.5"
        transition={{ duration: 0.4, delay: 0.05 }}
        variants={{ idle: { pathLength: 0, opacity: 0 }, active: { pathLength: 1, opacity: 1 } }}
      />
      <motion.path
        d="M15.5 8l2-1.5 1 2.2"
        transition={{ duration: 0.2, delay: 0.35 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
