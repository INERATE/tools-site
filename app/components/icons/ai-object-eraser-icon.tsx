"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** A magic eraser wand with radiating sparkle bursts that animate when hovered/active. */
export function AiObjectEraserIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      {/* Magic Wand Handle */}
      <motion.path
        d="M14.5 4.5l5 5L7 22l-4.5-0.5L2 17L14.5 4.5z"
        transition={spring}
        variants={{ idle: { opacity: 0.85 }, active: { opacity: 1 } }}
      />
      {/* Wand Tip Glow Accent */}
      <motion.path
        d="M13 6l5 5"
        strokeWidth="1.5"
        transition={spring}
        variants={{ idle: { opacity: 0.4 }, active: { opacity: 0.9 } }}
      />
      {/* Sparkle 1 (Top Left) */}
      <motion.path
        d="M8.5 2.5v3M7 4h3"
        strokeWidth="1.5"
        strokeLinecap="round"
        transition={{ ...spring, delay: 0.05 }}
        variants={{
          idle: { opacity: 0.3, scale: 0.7, y: 1 },
          active: { opacity: 1, scale: 1.2, y: -1 },
        }}
      />
      {/* Sparkle 2 (Right) */}
      <motion.path
        d="M21 14v3M19.5 15.5h3"
        strokeWidth="1.5"
        strokeLinecap="round"
        transition={{ ...spring, delay: 0.15 }}
        variants={{
          idle: { opacity: 0.3, scale: 0.7, x: -1 },
          active: { opacity: 1, scale: 1.2, x: 1 },
        }}
      />
      {/* Magic Eraser Dust Path */}
      <motion.path
        d="M4 19c2-1 4-1 6 0"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        transition={{ ...spring, delay: 0.2 }}
        variants={{ idle: { opacity: 0.2 }, active: { opacity: 0.8 } }}
      />
    </IconShell>
  );
}
