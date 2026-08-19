"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Text lines draw in left-to-right while a tally badge counts up in the corner. */
export function WordCounterIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <rect x="3" y="4" width="14" height="16" rx="2.5" />
      <motion.g
        transition={{ staggerChildren: 0.08 }}
        variants={{ idle: {}, active: {} }}
      >
        {[8, 11, 14].map((y, i) => (
          <motion.path
            key={y}
            d={`M6 ${y}h${i === 2 ? 6 : 8}`}
            variants={{ idle: { pathLength: 1, opacity: 0.55 }, active: { pathLength: [0, 1], opacity: 1 } }}
            transition={{ ...spring, delay: i * 0.1 }}
          />
        ))}
      </motion.g>
      <motion.circle
        cx="18.5"
        cy="17.5"
        r="4"
        fill="currentColor"
        stroke="none"
        variants={{ idle: { scale: 0.85 }, active: { scale: [0.85, 1.05, 1] } }}
        transition={{ ...spring, delay: 0.25 }}
      />
    </IconShell>
  );
}
