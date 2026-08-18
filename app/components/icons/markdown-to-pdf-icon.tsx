"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** The reverse of PdfToMarkdownIcon: a "#" heading mark fades out as full text lines settle in. */
export function MarkdownToPdfIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <motion.path
        d="M8.5 8v3.5M6.7 9h3.6M6.7 10.7h3.6M8 15h6"
        transition={spring}
        variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
      />
      <motion.path
        d="M8 8h8M8 11h6M8 14h7M8 17h5"
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={{ idle: { opacity: 0 }, active: { opacity: 1 } }}
      />
    </IconShell>
  );
}
