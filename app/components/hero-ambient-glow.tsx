"use client";

import { motion } from "motion/react";

/**
 * Full-Bleed 100vw Ultra-Premium Animated Hero Ambient Aurora Canvas.
 * Covers the entire viewport width edge-to-edge with zero center/side mismatch.
 */
export function HeroAmbientGlow() {
  return (
    <div
      className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-screen h-[1100px] -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Primary Luminous Aurora Orb (Full-bleed center) */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1300px] h-[600px] sm:h-[800px] rounded-full blur-[120px] sm:blur-[150px] opacity-75 animate-hero-aurora bg-[radial-gradient(ellipse_at_center,var(--blob-b)_0%,var(--blob-a)_45%,var(--blob-c)_80%,transparent_100%)]" />

      {/* Orbiting Liquid Light Beam (Left Edge) */}
      <motion.div
        className="absolute top-[25%] left-[5%] w-[550px] h-[480px] rounded-full blur-[110px] opacity-60 bg-[radial-gradient(circle,var(--accent)_0%,var(--accent-2)_55%,transparent_80%)]"
        animate={{
          x: [0, 110, -90, 0],
          y: [0, -70, 60, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbiting Liquid Light Beam (Right Edge) */}
      <motion.div
        className="absolute top-[30%] right-[5%] w-[580px] h-[500px] rounded-full blur-[115px] opacity-60 bg-[radial-gradient(circle,var(--accent-3)_0%,var(--accent)_55%,transparent_80%)]"
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.85, 1.25, 1],
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
        className="absolute top-[20%] left-[25%] size-3 rounded-full bg-[var(--accent)] blur-[1px]"
        animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[45%] right-[22%] size-3.5 rounded-full bg-[var(--accent-3)] blur-[1px]"
        animate={{ y: [0, 35, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[30%] right-[32%] size-2.5 rounded-full bg-[var(--accent-2)] blur-[1px]"
        animate={{ y: [0, -25, 0], opacity: [0.2, 0.9, 0.2], scale: [0.9, 1.3, 0.9] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Mathematical Dot Grid Matrix spanning 100vw smoothly */}
      <div className="dot-matrix-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_35%,#000_65%,transparent_100%)]" />
    </div>
  );
}
