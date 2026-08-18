"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A numbered tag drops into the corner of the page and settles. */
export function PageNumbersIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h6M7.5 11.5h9M7.5 15h9" opacity="0.5" />
      <motion.g
        style={{ transformOrigin: "16px 19px" }}
        transition={spring}
        variants={{ idle: { y: -4, opacity: 0, scale: 0.7 }, active: { y: 0, opacity: 1, scale: 1 } }}
      >
        <circle cx="16" cy="19" r="3.4" fill="currentColor" stroke="none" />
        <text x="16" y="20.3" fontSize="4.2" textAnchor="middle" fill="white" stroke="none">
          1
        </text>
      </motion.g>
    </IconShell>
  );
}
