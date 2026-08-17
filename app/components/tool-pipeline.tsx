"use client";

import { Check, Lock, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { ComponentType } from "react";

export type PipelineStep = { icon: ComponentType<{ className?: string }>; label: string; detail: string };

const TRUST = [
  { icon: ShieldCheck, text: "Nothing is ever uploaded" },
  { icon: Zap, text: "Runs instantly, on this device" },
  { icon: Lock, text: "No account, no sign-up" },
];

/**
 * The right-rail "what this does" panel every tool page shares: the 3-step
 * pipeline with the current step lit up, and the trust points that explain
 * why the tool can promise "nothing uploaded." Fills what was empty space
 * next to the work surface, and answers the question before it's asked.
 */
export function ToolPipeline({ active, steps }: { active: number; steps: PipelineStep[] }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="glass rounded-2xl p-4">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">How it works</p>
        <ol className="flex flex-col gap-3">
          {steps.map((s, i) => {
            const done = i < active;
            const on = i === active;
            return (
              <li key={s.label} className="flex items-start gap-3">
                <motion.span
                  animate={{ scale: on ? 1.08 : 1 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  className={`grid size-8 shrink-0 place-items-center rounded-full border text-[13px] font-semibold ${
                    done
                      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                      : on
                        ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--text-dim)]"
                  }`}
                >
                  {done ? <Check className="size-4" /> : <s.icon className="size-4" />}
                </motion.span>
                <div className="pt-1">
                  <p className={`text-[13px] font-semibold ${on ? "text-[var(--text)]" : "text-[var(--text-dim)]"}`}>
                    {s.label}
                  </p>
                  <p className="text-[12px] text-[var(--text-dim)]">{s.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="glass flex flex-col gap-2.5 rounded-2xl p-4">
        {TRUST.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-[12.5px] text-[var(--text-dim)]">
            <Icon className="size-3.5 shrink-0 text-[var(--accent)]" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
