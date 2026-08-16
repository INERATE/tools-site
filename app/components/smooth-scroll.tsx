"use client";

import { useEffect } from "react";

/**
 * High-Performance Smooth Scroll with Lenis.
 * Tuned for instant responsiveness, butter-smooth wheel interpolation, and zero jitter.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dead = false;
    let stop = () => {};

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (dead) return;
        const lenis = new Lenis({
          duration: 0.85,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
          smoothWheel: true,
          autoRaf: false,
        });

        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        ScrollTrigger.refresh();

        stop = () => {
          lenis.off("scroll", ScrollTrigger.update);
          gsap.ticker.remove(raf);
          lenis.destroy();
        };
      },
    );

    return () => {
      dead = true;
      stop();
    };
  }, []);

  return null;
}
