"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Text lines fade out while a mountain draws and a sun scales in. */
export function ToImageIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M8 8h5M8 11h8"
        transition={{ duration: 0.2 }}
        variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
      />
      <motion.circle
        cx="9.5"
        cy="9"
        r="1.6"
        style={{ transformOrigin: "9.5px 9px" }}
        transition={{ ...spring, delay: 0.15 }}
        variants={{
          idle: { scale: 0, opacity: 0 },
          active: { scale: 1, opacity: 1 },
        }}
      />
      <motion.path
        d="M5 18l4-5 3 3.5 2.5-2.5L19 18"
        transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        variants={{
          idle: { pathLength: 0, opacity: 0 },
          active: { pathLength: 1, opacity: 1 },
        }}
      />
    </IconShell>
  );
}
