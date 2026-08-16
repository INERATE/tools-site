"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mobileBeats, staticBeats } from "./story-fallbacks";
import { pinnedBeats } from "./pinned-timeline";

gsap.registerPlugin(ScrollTrigger);
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useStoryTimeline() {
  const root = useRef<HTMLElement>(null);

  useIso(() => {
    // Scoped matchMedia: one revert() kills every tween and trigger it created,
    // so StrictMode's double-invoke can never leave a duplicate behind.
    const mm = gsap.matchMedia(root);
    const q = gsap.utils.selector(root);

    mm.add(
      {
        pinned: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        flow: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        still: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { pinned, flow } = ctx.conditions!;
        const cards = q<HTMLElement>(".doc");
        const check = q<SVGPathElement>(".check")[0];
        if (!check || !cards.length || !root.current) return;

        // DrawSVG is a paid plugin; a manual dasharray scrubs identically.
        const len = check.getTotalLength();
        gsap.set(check, { strokeDasharray: len, strokeDashoffset: len });

        if (pinned) pinnedBeats(q, root.current, cards, check);
        else if (flow) mobileBeats(q, check);
        else staticBeats(q, cards, check);
      },
    );

    return () => mm.revert();
  }, []);

  return root;
}
