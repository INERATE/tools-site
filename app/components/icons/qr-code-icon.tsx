"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Three corner finder-squares of a QR code lock in, then a scan line sweeps once. */
export function QrCodeIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.g transition={spring} variants={{ idle: { opacity: 0.6 }, active: { opacity: 1 } }}>
        <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
        <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
        <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
        <path d="M14.5 15h2.5v2.5h-2.5z" />
        <path d="M19 19.5h1.5" />
        <path d="M14.5 19.5h1.5" />
      </motion.g>
      <motion.line
        x1="3"
        x2="21"
        y1="12"
        y2="12"
        strokeWidth={1.2}
        variants={{ idle: { opacity: 0, y: -8 }, active: { opacity: [0, 1, 1, 0], y: [-8, 8] } }}
        transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
      />
    </IconShell>
  );
}
