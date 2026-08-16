"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Dashed seam fades as the page fans into two halves hinged at the cut. */
export function SplitIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.path
        d="M11 4v16"
        strokeDasharray="2 2"
        transition={spring}
        variants={{ idle: { opacity: 0.9 }, active: { opacity: 0 } }}
      />
      <motion.rect
        x="3"
        y="5"
        width="8"
        height="14"
        rx="2"
        style={{ transformOrigin: "11px 12px" }}
        transition={spring}
        variants={{ idle: { x: 0, rotate: 0 }, active: { x: -2.5, rotate: -7 } }}
      />
      <motion.rect
        x="13"
        y="5"
        width="8"
        height="14"
        rx="2"
        style={{ transformOrigin: "11px 12px" }}
        transition={spring}
        variants={{ idle: { x: -2, rotate: 0 }, active: { x: 0.5, rotate: 7 } }}
      />
    </IconShell>
  );
}
