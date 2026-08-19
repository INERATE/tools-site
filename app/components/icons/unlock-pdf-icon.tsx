"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A padlock's shackle swings open, away from the body. */
export function UnlockPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <motion.path
        d="M8.5 11V8a3.5 3.5 0 0 1 7 0"
        transition={spring}
        variants={{ idle: { rotate: 0 }, active: { rotate: -35 } }}
        style={{ transformOrigin: "8.5px 8px" }}
      />
      <motion.circle
        cx="12"
        cy="15"
        r="1.3"
        transition={{ ...spring, delay: 0.15 }}
        variants={{ idle: { opacity: 1 }, active: { opacity: 0.4 } }}
      />
    </IconShell>
  );
}
