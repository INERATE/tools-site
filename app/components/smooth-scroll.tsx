"use client";

import { useEffect } from "react";
import { setLenisInstance } from "../lib/lenis-instance";

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
        setLenisInstance(lenis);

        const raf = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        ScrollTrigger.refresh();

        // Any in-page #hash link (Live Simulator, "See it in action") must
        // scroll through Lenis, not the browser's native anchor jump — the
        // two fight over scroll position, which is what made those links
        // land somewhere in the middle of the page instead of on target.
        const headerOffset = () => -(document.querySelector("header")?.getBoundingClientRect().height ?? 90) + 20;
        const scrollToHash = (hash: string) => {
          const el = hash.length > 1 && document.querySelector(hash);
          if (el) lenis.scrollTo(el as HTMLElement, { offset: headerOffset() });
        };
        if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash));

        const onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement).closest("a[href*='#']") as HTMLAnchorElement | null;
          if (!a) return;
          const url = new URL(a.href);
          if (url.pathname !== location.pathname) return;
          e.preventDefault();
          history.pushState(null, "", url.hash);
          scrollToHash(url.hash);
        };
        document.addEventListener("click", onClick);

        stop = () => {
          document.removeEventListener("click", onClick);
          lenis.off("scroll", ScrollTrigger.update);
          gsap.ticker.remove(raf);
          lenis.destroy();
          setLenisInstance(null);
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
