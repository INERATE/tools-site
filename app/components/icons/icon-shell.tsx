"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type IconProps = { active?: boolean; size?: number; className?: string };

/** Critically-damped default — Apple fluid-interface law. */
export const spring = { type: "spring", bounce: 0, duration: 0.35 } as const;

/**
 * Owns the viewBox, every stroke attribute, and hover-state broadcast.
 * Children declare `variants={{ idle, active }}` and inherit the state.
 * Reduced motion is handled once, here: every icon pins to `idle`.
 */
export function IconShell({
  active,
  size = 24,
  className,
  children,
}: IconProps & { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      initial="idle"
      animate={reduced || !active ? "idle" : "active"}
    >
      {children}
    </motion.svg>
  );
}
