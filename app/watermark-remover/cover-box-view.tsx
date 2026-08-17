"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Box } from "../lib/cover-box";

/** One placed cover, with the handle that takes it off again. */
export function CoverBoxView({ box, dark, onRemove }: { box: Box; dark: boolean; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      className={`group absolute ${dark ? "bg-black" : "bg-white"} ring-1 ring-[var(--accent)]/70`}
      style={frame(box)}
    >
      <button
        type="button"
        /* Without this the press would start drawing a new box underneath. */
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onRemove}
        aria-label="Remove this cover"
        className="absolute -top-2.5 -right-2.5 grid size-6 cursor-pointer place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <X aria-hidden className="size-3.5" />
      </button>
    </motion.div>
  );
}

/** Fractions are stored, percentages are drawn — the page can be any size. */
export const frame = (b: { x: number; y: number; w: number; h: number }) => ({
  left: `${b.x * 100}%`,
  top: `${b.y * 100}%`,
  width: `${b.w * 100}%`,
  height: `${b.h * 100}%`,
});
