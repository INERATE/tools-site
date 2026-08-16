"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger, svg } from "animejs";
import { IconShell, type IconProps } from "./icon-shell";

/** Five lines write on in sequence, hold, erase, repeat. anime.js v4. */
export function ResumeIcon({ active, ...p }: IconProps) {
  const g = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!active || !g.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ln = Array.from(g.current.querySelectorAll<SVGPathElement>("path"));
    const t = createTimeline({ loop: true })
      .add(svg.createDrawable(ln), {
        draw: ["0 0", "0 1"],
        duration: 420,
        ease: "outQuad",
        delay: stagger(110),
      })
      .add(ln, { opacity: [1, 0], duration: 240, delay: stagger(40) }, "+=600");
    return () => {
      t.revert();
      // createDrawable writes these onto the real element; revert leaves them,
      // which would strand the lines invisible. Strip them to restore the
      // authored (complete) resume, and let a later hover re-arm cleanly.
      for (const l of ln) {
        l.removeAttribute("stroke-dasharray");
        l.removeAttribute("stroke-dashoffset");
        l.removeAttribute("pathLength");
        l.style.removeProperty("opacity");
        l.style.removeProperty("stroke-linecap");
      }
    };
  }, [active]);

  return (
    <IconShell active={active} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <circle cx="8.5" cy="8" r="2" />
      <g ref={g}>
        <path d="M12.5 7h5" />
        <path d="M12.5 9.5h4" />
        <path d="M7 13.5h10" />
        <path d="M7 16h10" />
        <path d="M7 18.5h6" />
      </g>
    </IconShell>
  );
}
