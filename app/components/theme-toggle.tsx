"use client";

import { useEffect, useLayoutEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Flame, Gem, Monitor, Moon, Sparkles, Sun } from "lucide-react";
import { applyTheme, LABEL, ORDER, readStoredTheme, resolve, type Choice } from "../lib/theme";

const ICON: Record<Choice, typeof Monitor> = {
  auto: Monitor,
  iridescence: Gem,
  obsidian: Moon,
  daylight: Sun,
  aurora: Sparkles,
  ember: Flame,
};

export function ThemeToggle() {
  const [choice, setChoice] = useState<Choice>("auto");
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    setChoice(readStoredTheme());
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", resolve(choice));
    if (choice !== "auto") return;

    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => document.documentElement.setAttribute("data-theme", resolve("auto"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice, mounted]);

  function cycle(e: MouseEvent<HTMLButtonElement>) {
    const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];
    const commit = () => {
      applyTheme(next);
      setChoice(next);
    };

    if (!document.startViewTransition || reducedMotion) {
      commit();
      return;
    }
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(commit);
    vt.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "cubic-bezier(0.22,1,0.36,1)", pseudoElement: "::view-transition-new(root)" },
      ),
    );
  }

  const Icon = ICON[choice] || Monitor;

  return (
    <button
      onClick={cycle}
      title={mounted ? `Appearance: ${LABEL[choice]}` : "Appearance"}
      aria-label={mounted ? `Appearance: ${LABEL[choice]}. Click to change.` : "Appearance. Click to change."}
      suppressHydrationWarning
      className="glass grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={choice}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.8 }}
          transition={reducedMotion ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.35 }}
          className="grid place-items-center"
        >
          <Icon size={16} strokeWidth={1.75} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
