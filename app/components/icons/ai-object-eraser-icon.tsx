"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A magic eraser wand that tilts on hover, casting radiant sparkle stars and particle sweeps. */
export function AiObjectEraserIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      {/* Magic Wand that swings and points dynamically */}
      <motion.g
        style={{ transformOrigin: "4px 20px" }}
        transition={spring}
        variants={{
          idle: { rotate: 0, scale: 1 },
          active: { rotate: -15, scale: 1.05 },
        }}
      >
        <path d="m14 5 5 5L7 22l-4.5-.5L2 17 14 5z" />
        <path d="m12.5 6.5 5 5" strokeWidth={1.2} opacity={0.6} />
      </motion.g>

      {/* Main Radiant Star Burst at wand tip */}
      <motion.g
        style={{ transformOrigin: "18px 4px" }}
        transition={{ ...spring, delay: 0.08 }}
        variants={{
          idle: { scale: 0.5, opacity: 0.3, rotate: 0 },
          active: { scale: 1.2, opacity: 1, rotate: 45 },
        }}
      >
        <path d="M18 1.5v5M15.5 4h5" strokeWidth={1.5} strokeLinecap="round" />
      </motion.g>

      {/* Secondary sparkle at right */}
      <motion.g
        style={{ transformOrigin: "21px 14px" }}
        transition={{ ...spring, delay: 0.15 }}
        variants={{
          idle: { scale: 0, opacity: 0 },
          active: { scale: 1, opacity: 0.85 },
        }}
      >
        <path d="M21 12.5v3M19.5 14h3" strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>

      {/* Magic trail dust */}
      <motion.path
        d="M4 19c2.5-1.5 5-1.5 7.5 0"
        strokeWidth={1.2}
        strokeDasharray="2 2"
        transition={{ duration: 0.3 }}
        variants={{
          idle: { opacity: 0.15 },
          active: { opacity: 0.9 },
        }}
      />
    </IconShell>
  );
}
