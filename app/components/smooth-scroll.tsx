"use client";

import { useEffect } from "react";

/**
 * Lenis + the global ScrollTrigger sync. Nothing needs the Lenis instance:
 * `ScrollTrigger.update` and `gsap.ticker` are singletons, so wiring them here
 * is the whole contract. Lenis v1 drives real window scroll — no scrollerProxy.
 * Everything is dynamically imported so tool routes never pay for GSAP.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dead = false;
    let stop = () => {};

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (dead) return;
        const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        const raf = (t: number) => lenis.raf(t * 1000); // ticker: seconds, Lenis: ms

        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();

        stop = () => {
          lenis.off("scroll", ScrollTrigger.update);
          gsap.ticker.remove(raf);
          lenis.destroy();
        };
      },
    );

    // StrictMode: `dead` cancels a pending import, `stop` tears down a live one.
    return () => {
      dead = true;
      stop();
    };
  }, []);

  return null;
}
