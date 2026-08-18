"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A photo frame shrinks toward its corner while a resize handle glyph settles in. */
export function ResizeImageIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" opacity="0.35" />
      <motion.g
        style={{ transformOrigin: "6px 18px" }}
        transition={spring}
        variants={{ idle: { scale: 1 }, active: { scale: 0.6 } }}
      >
        <rect x="4" y="10" width="10" height="8" rx="1.6" />
        <circle cx="7.5" cy="13" r="1" />
        <path d="M4.5 17l2.3-2.6 1.8 2 1.3-1.5 2.1 2.1" />
      </motion.g>
      <motion.path
        d="M16 8l4-4M14 4h5v5M8 20l-4-4M10 20H5v-5"
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 0.85 } }}
      />
    </IconShell>
  );
}
