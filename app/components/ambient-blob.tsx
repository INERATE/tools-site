"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const LOBES = (
  <>
    <i />
    <i />
    <i />
    <i />
  </>
);

/**
 * Fixed iridescent gradient-mesh backdrop (styles: app/mesh.css).
 * Four blurred lobes drift on CSS keyframes; the whole plane parallaxes 1:1
 * with the scrollbar — no spring, direct manipulation.
 *
 * Parallax rides the wrapper, never the lobes: a CSS animation on `transform`
 * outranks inline styles in the cascade and would swallow the motion value.
 */
export function AmbientBlob() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1600], [0, 180]);

  if (reducedMotion) {
    return (
      <div className="mesh" aria-hidden>
        {LOBES}
      </div>
    );
  }

  return (
    <motion.div className="mesh" style={{ y }} aria-hidden>
      {LOBES}
    </motion.div>
  );
}
