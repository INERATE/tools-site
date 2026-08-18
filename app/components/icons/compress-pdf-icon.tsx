"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** The page's content squeezes inward while two chevrons close in on it from top and bottom. */
export function CompressPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="1"
        style={{ transformOrigin: "12px 12px" }}
        transition={spring}
        variants={{ idle: { scaleY: 1 }, active: { scaleY: 0.5 } }}
      />
      <motion.path
        d="M9 5.5l3 1.8 3-1.8"
        transition={spring}
        variants={{ idle: { y: 0, opacity: 0.55 }, active: { y: 2.2, opacity: 1 } }}
      />
      <motion.path
        d="M9 18.5l3-1.8 3 1.8"
        transition={spring}
        variants={{ idle: { y: 0, opacity: 0.55 }, active: { y: -2.2, opacity: 1 } }}
      />
    </IconShell>
  );
}
