"use client";

import { motion } from "motion/react";

/**
 * Premium Animated Hero Ambient Glow & Liquid Aurora Halo
 */
export function HeroAmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -top-32 -bottom-28 -z-10 overflow-hidden" aria-hidden>
      {/* Central Pulsing Liquid Aurora Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[920px] h-[480px] sm:h-[620px] rounded-full blur-[110px] opacity-40 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-a)_0%,var(--blob-b)_45%,var(--blob-c)_75%,transparent_100%)]" />

      {/* Secondary Orbiting Accent Light */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[350px] rounded-full blur-[90px] opacity-35 bg-[radial-gradient(circle,var(--accent)_0%,var(--accent-2)_50%,transparent_80%)]"
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary Orbiting Accent Light */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-[420px] h-[380px] rounded-full blur-[95px] opacity-30 bg-[radial-gradient(circle,var(--accent-3)_0%,var(--accent)_50%,transparent_80%)]"
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Mathematical Dot Grid Matrix Mask */}
      <div className="dot-matrix-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,#000_65%,transparent_100%)]" />
    </div>
  );
}
