"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

const SPRING = { stiffness: 300, damping: 24, mass: 0.5 };

/**
 * Magnetic hover: the child leans toward the cursor inside a 40px field and
 * springs home on exit. The field is an invisible padded box (`p-10 -m-10`)
 * rather than a window listener — no global handler, no layout cost.
 *
 * Two nested nodes on purpose: the outer one owns the field and the pointer
 * events, the inner one owns the only transform, so nothing fights over it.
 */
export function Magnetic({ children, max = 12 }: { children: ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const scale = useSpring(1, SPRING);

  const rest = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div
      className="-m-10 inline-block p-10"
      onPointerLeave={rest}
      onPointerCancel={rest}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (reduced || !r) return;
        const pull = (v: number) => Math.max(-max, Math.min(max, v * 0.35));
        x.set(pull(e.clientX - (r.left + r.width / 2)));
        y.set(pull(e.clientY - (r.top + r.height / 2)));
      }}
    >
      <motion.div
        ref={ref}
        style={{ x, y, scale }}
        className="inline-block"
        onPointerDown={() => scale.set(reduced ? 1 : 0.97)}
        onPointerUp={() => scale.set(1)}
      >
        {children}
      </motion.div>
    </div>
  );
}
