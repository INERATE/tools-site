"use client";

import { motion } from "motion/react";
import { IconShell, spring, type IconProps } from "./icon-shell";

/** Two offset pages slide together and overlap; a `+` pops in. */
export function MergeIcon(p: IconProps) {
  return (
    <IconShell {...p}>
      <motion.rect
        x="3"
        y="5"
        width="10"
        height="13"
        rx="2"
        transition={spring}
        variants={{ idle: { x: -2, y: -1 }, active: { x: 2.5, y: 1 } }}
      />
      <motion.rect
        x="11"
        y="5"
        width="10"
        height="13"
        rx="2"
        transition={spring}
        variants={{ idle: { x: 2, y: 1 }, active: { x: -2.5, y: -1 } }}
      />
      <motion.path
        d="M12 9.5v5m-2.5-2.5h5"
        style={{ transformOrigin: "12px 12px" }}
        transition={{ ...spring, delay: 0.12 }}
        variants={{
          idle: { opacity: 0, scale: 0.6 },
          active: { opacity: 1, scale: 1 },
        }}
      />
    </IconShell>
  );
}
