"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A page's info tag swings into view and its label lines write themselves in. */
export function PdfMetadataIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M7.5 8h5" opacity="0.5" />
      <motion.g
        transition={spring}
        variants={{ idle: { opacity: 0, y: 3 }, active: { opacity: 1, y: 0 } }}
      >
        <rect x="7" y="11.5" width="10" height="6" rx="1.2" />
        <path d="M9.2 14h5.6" />
        <path d="M9.2 16h3.6" />
      </motion.g>
    </IconShell>
  );
}
