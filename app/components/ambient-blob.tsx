"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function AmbientBlob() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Two depths: the far blob drifts slower than the near one — classic
  // parallax read, driven 1:1 by scroll position (no spring, this follows
  // the scrollbar directly, same as the apple-design "direct manipulation" rule).
  const farY = useTransform(scrollY, [0, 1600], [0, 220]);
  const nearY = useTransform(scrollY, [0, 1600], [0, -160]);

  if (reducedMotion) {
    return (
      <div className="ambient-blob" aria-hidden>
        <div className="blob blob-a" />
        <div className="blob blob-b" />
      </div>
    );
  }

  return (
    <div className="ambient-blob" aria-hidden>
      <motion.div className="blob blob-a" style={{ y: farY }} />
      <motion.div className="blob blob-b" style={{ y: nearY }} />
    </div>
  );
}
