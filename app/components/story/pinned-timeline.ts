import gsap from "gsap";
import type { Q } from "./story-fallbacks";

/** Desktop: the stage pins for 300vh while one scrubbed timeline tells all three beats. */
export function pinnedBeats(
  q: Q,
  trigger: HTMLElement,
  cards: HTMLElement[],
  check: SVGPathElement,
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "+=300%",
      pin: q(".stage")[0],
      scrub: 1,
      anticipatePin: 1,
    },
  });

  tl // parallax depths ride the whole pin
    .to(q(".depth-far"), { yPercent: -14, ease: "none" }, 0)
    .to(q(".depth-mid"), { yPercent: -7, ease: "none" }, 0)
    // BEAT 1 -> 2: converge inward, never upward. Nothing here is uploaded.
    .to(
      cards,
      {
        x: 0,
        rotate: 0,
        scale: 1,
        y: (i: number) => i * -8,
        ease: "power2.inOut",
        stagger: { each: 0.04, from: "edges" },
      },
      0.05,
    )
    .to(q(".beat-1"), { opacity: 0, y: -16 }, 0.05)
    .fromTo(q(".beat-2"), { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.12)
    // BEAT 2 -> 3: seal the stack, then draw the check
    .to(cards.slice(1), { opacity: 0, duration: 0.15 }, 0.55)
    .to(q(".stack"), { scale: 1.06, ease: "back.out(1.6)", duration: 0.2 }, 0.58)
    .to(q(".beat-2"), { opacity: 0, y: -16 }, 0.55)
    .to(q(".seal"), { opacity: 1, duration: 0.12 }, 0.6)
    .fromTo(q(".beat-3"), { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.62)
    .to(check, { strokeDashoffset: 0, ease: "power1.inOut", duration: 0.25 }, 0.66)
    .to(q(".glow"), { opacity: 0.9, scale: 1.15, duration: 0.2 }, 0.7);
}
