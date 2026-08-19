import { type MotionValue, useTransform } from "motion/react";

/**
 * Per-segment enter/exit transforms for a pinned scroll-scrub panel.
 * Even index slides in from the left, odd from the right; first/last panels
 * skip the edge transition since there's nothing to fade in/out from.
 */
export function usePanelTransforms(scrollYProgress: MotionValue<number>, index: number, total: number) {
  const start = index / total;
  const end = (index + 1) / total;
  const buf = Math.min(0.05, (end - start) / 3);
  const first = index === 0;
  const last = index === total - 1;
  const side = index % 2 === 0 ? -1 : 1;
  const range = [start, start + buf, end - buf, end];

  const opacity = useTransform(scrollYProgress, range, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const x = useTransform(scrollYProgress, range, [first ? 0 : 120 * side, 0, 0, last ? 0 : -120 * side]);
  const rotate = useTransform(scrollYProgress, range, [first ? 0 : 6 * side, 0, 0, last ? 0 : -6 * side]);
  const scale = useTransform(scrollYProgress, range, [first ? 1 : 0.94, 1, 1, last ? 1 : 0.94]);

  return { opacity, x, rotate, scale };
}
