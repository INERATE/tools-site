"use client";

import { useState, type PointerEvent } from "react";
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const SPRING = { stiffness: 260, damping: 26, mass: 0.6 };

/**
 * Pointer-tracked 3D tilt + cursor-following specular glare for a card.
 *
 * Every value is a spring, so a mid-flight pointer change is grabbed rather
 * than queued. Under reduced motion the handlers stay wired but write 0 —
 * only `glow` (opacity) and `active` survive, which is feedback, not motion.
 */
export function useTilt(max = 8) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const rx = useSpring(0, SPRING);
  const ry = useSpring(0, SPRING);
  const lift = useSpring(0, SPRING);
  const glow = useSpring(0, SPRING);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${mx}% ${my}%, rgba(255,255,255,.18), transparent 62%)`;

  return {
    active,
    rx,
    ry,
    lift,
    glow,
    glare,
    move: (e: PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx.set(-py * 2 * max);
      ry.set(px * 2 * max);
      mx.set((px + 0.5) * 100);
      my.set((py + 0.5) * 100);
    },
    enter: () => {
      setActive(true);
      glow.set(1);
      lift.set(reduced ? 0 : -8);
    },
    /** Pointer-down answers before the click, per the fluid-interface law. */
    down: () => lift.set(reduced ? 0 : -3),
    leave: () => {
      setActive(false);
      rx.set(0);
      ry.set(0);
      lift.set(0);
      glow.set(0);
    },
  };
}
