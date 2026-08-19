"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** The lens pulses and the handle tilts outward on hover — a little "looking around" gesture. */
export function DockSearchIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        transition={spring}
        variants={{ idle: { scale: 1 }, active: { scale: [1, 1.12, 1] } }}
      />
      <motion.path
        d="M15.5 15.5 20 20"
        transition={spring}
        variants={{ idle: { rotate: 0 }, active: { rotate: -8 } }}
        style={{ transformOrigin: "15.5px 15.5px" }}
      />
    </IconShell>
  );
}
