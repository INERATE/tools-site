"use client";

import { motion } from "motion/react";

/**
 * Enhanced Ultra-Premium Animated Hero Ambient Aurora & Light Orbs
 */
export function HeroAmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -top-32 -bottom-28 -z-10 overflow-hidden" aria-hidden>
      {/* Primary Luminous Aurora Orb */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1020px] h-[520px] sm:h-[680px] rounded-full blur-[100px] sm:blur-[130px] opacity-70 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)]" />

      {/* Secondary Orbiting Liquid Light Beam (Left) */}
      <motion.div
        className="absolute top-[35%] left-[8%] w-[450px] h-[400px] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,var(--accent)_0%,var(--accent-2)_55%,transparent_80%)]"
        animate={{
          x: [0, 90, -70, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary Orbiting Liquid Light Beam (Right) */}
      <motion.div
        className="absolute top-[42%] right-[8%] w-[480px] h-[420px] rounded-full blur-[95px] opacity-55 bg-[radial-gradient(circle,var(--accent-3)_0%,var(--accent)_55%,transparent_80%)]"
        animate={{
          x: [0, -85, 65, 0],
          y: [0, 70, -50, 0],
          scale: [1, 0.88, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Floating Spark Particles */}
      <motion.div
        className="absolute top-[20%] left-[22%] size-2.5 rounded-full bg-[var(--accent)] blur-[1px]"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[48%] right-[20%] size-3 rounded-full bg-[var(--accent-3)] blur-[1px]"
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.95, 0.3], scale: [1, 1.4, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[32%] right-[30%] size-2 rounded-full bg-[var(--accent-2)] blur-[1px]"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.85, 0.2], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Mathematical Dot Grid Matrix with Radial Vignette */}
      <div className="dot-matrix-bg absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_65%,transparent_100%)]" />
    </div>
  );
}
