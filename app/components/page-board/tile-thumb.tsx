"use client";

import { motion } from "motion/react";
import type { Thumb } from "./types";

export const SPRING = { type: "spring", bounce: 0, duration: 0.35 } as const;

/**
 * The rasterized page, rotated in place. A quarter turn would overflow the
 * tile, so odd turns also scale by the page's own aspect ratio — that is
 * exactly the factor that brings the long edge back inside the short one.
 */
export function TileThumb({ thumb, turns, ratio }: { thumb?: Thumb; turns: number; ratio: number }) {
  return (
    <motion.div
      className="absolute inset-0 grid place-items-center"
      animate={{ rotate: turns * 90, scale: turns % 2 === 1 ? ratio : 1 }}
      transition={SPRING}
    >
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumb.url} alt="" draggable={false} className="block h-full w-full object-contain" />
      ) : (
        <span className="shimmer block h-full w-full bg-white/[0.06]" />
      )}
    </motion.div>
  );
}
