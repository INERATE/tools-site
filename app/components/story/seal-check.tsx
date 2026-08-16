"use client";

import { useEffect, useRef } from "react";

const IRIS = "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)";

/**
 * The sealed document. GSAP scrubs the check stroke (it has to follow scroll);
 * anime.js owns the idle shimmer that lives on afterwards, view-gated by its
 * own scroll observer so it is not a permanent rAF on the landing page.
 */
export function SealCheck() {
  const shine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let dead = false;
    let anim: { revert: () => void } | undefined;

    import("animejs").then(({ animate, onScroll }) => {
      if (dead || !shine.current) return;
      anim = animate(shine.current, {
        translateX: ["-140%", "260%"],
        duration: 2600,
        loop: true,
        ease: "inOutQuad",
        autoplay: onScroll({ enter: "bottom top", leave: "top bottom", repeat: true }),
      });
    });

    return () => {
      dead = true;
      anim?.revert();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="seal pointer-events-none absolute top-1/2 left-1/2 z-20 -mt-[112px] -ml-[80px] grid h-[224px] w-[160px] place-items-center"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          ref={shine}
          className="absolute inset-y-0 left-0 w-1/2 skew-x-12"
          style={{ background: IRIS }}
        />
      </div>
      <div
        className="glow absolute size-32 rounded-full opacity-0 blur-2xl"
        style={{ background: "conic-gradient(from 210deg,#7C3AED,#D946EF,#22D3EE,#7C3AED)" }}
      />
      <svg viewBox="0 0 96 96" className="relative size-20" fill="none">
        <defs>
          <linearGradient id="seal-iris" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="40" stroke="url(#seal-iris)" strokeOpacity="0.4" strokeWidth="2" />
        <path
          className="check"
          d="M30 49.5 L43 62 L67 35"
          stroke="url(#seal-iris)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
        />
      </svg>
    </div>
  );
}
