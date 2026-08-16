"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "./magnetic";

const HEAD = "Document tools that".split(" ");

const IRI =
  "bg-[linear-gradient(100deg,var(--accent),var(--accent-2)_45%,var(--accent-3))] bg-clip-text text-transparent";

export function Hero() {
  /** Critically-damped rise, offset per element. Reduced motion keeps the
   *  stagger but drops the travel — an opacity cross-fade and nothing else. */
  const y = useReducedMotion() ? 0 : "0.4em";
  const rise = (delay: number) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, bounce: 0, duration: 0.55, delay },
  });

  return (
    <div className="mb-20 flex flex-col items-center gap-6 text-center">
      <motion.span
        {...rise(0)}
        className="glass rounded-full px-4 py-1.5 text-[11px] leading-none font-bold tracking-[0.18em] text-[var(--accent)] uppercase"
      >
        Free · Private · Browser-based
      </motion.span>

      <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
        {HEAD.map((word, i) => (
          <motion.span key={word} {...rise(0.06 * i)} className="mr-[0.22em] inline-block">
            {word}
          </motion.span>
        ))}
        {/* Decorative: the sentence still reads if the gradient never paints. */}
        <motion.span {...rise(0.06 * HEAD.length)} className={`${IRI} -mb-[0.12em] inline-block pb-[0.12em]`}>
          feel premium
        </motion.span>
      </h1>

      <motion.p
        {...rise(0.3)}
        className="max-w-[34ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.6] text-[var(--text-dim)]"
      >
        Merge, split and convert in a browser tab. No uploads, no queue, no watermark.
      </motion.p>

      <motion.div {...rise(0.38)} className="mt-2">
        <Magnetic>
          <Link
            href="/pdf-merger"
            className="clay grid h-12 cursor-pointer place-items-center px-7 text-[15px] font-semibold"
          >
            Merge PDFs free
          </Link>
        </Magnetic>
      </motion.div>

      <motion.p
        {...rise(0.44)}
        className="flex h-11 items-center gap-2 text-[13px] font-medium tracking-[0.01em] text-[var(--text)]"
      >
        <ShieldCheck aria-hidden className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
        Nothing leaves your browser.
      </motion.p>
    </div>
  );
}
