"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A padlock's shackle drops down and closes over the body. */
export function ProtectPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <motion.path
        d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"
        transition={spring}
        variants={{ idle: { y: -1.5, rotate: -8 }, active: { y: 0, rotate: 0 } }}
        style={{ transformOrigin: "18px 8px" }}
      />
      <motion.circle
        cx="12"
        cy="15"
        r="1.3"
        transition={{ ...spring, delay: 0.15 }}
        variants={{ idle: { opacity: 0.5 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
