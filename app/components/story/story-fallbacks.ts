import gsap from "gsap";

export type Q = ReturnType<typeof gsap.utils.selector>;

/** Reduced motion: jump everything to its finished state. Zero triggers, zero loops. */
export function staticBeats(q: Q, cards: HTMLElement[], check: SVGPathElement) {
  gsap.set(cards, { x: 0, y: (i: number) => i * -8, rotate: 0, scale: 1 });
  gsap.set(cards.slice(1), { opacity: 0 });
  gsap.set([...q(".beat"), ...q(".seal")], { opacity: 1, y: 0 });
  gsap.set(q(".glow"), { opacity: 0.9 });
  gsap.set(check, { strokeDashoffset: 0 });
}

/**
 * Phones: no pin. A 100vh pin fights the iOS URL-bar resize (every dvh change
 * refreshes ScrollTrigger and the stage visibly jumps), and touch momentum on
 * top of Lenis stutters. Docs land pre-stacked; each beat is a one-shot reveal.
 */
export function mobileBeats(q: Q, check: SVGPathElement) {
  gsap.set(q(".doc"), {
    x: 0,
    y: (i: number) => i * -6,
    rotate: (i: number) => (i - 2.5) * 2.5,
    scale: 1,
  });
  gsap.set([...q(".seal")], { opacity: 1 });
  gsap.set(q(".glow"), { opacity: 0.7 });

  q(".beat").forEach((el) =>
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      },
    ),
  );

  gsap.to(check, {
    strokeDashoffset: 0,
    duration: 0.9,
    ease: "power1.inOut",
    scrollTrigger: { trigger: q(".stack")[0], start: "top 75%" },
  });
}
