"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { WordCounterIcon } from "../components/icons/word-counter-icon";
import { AdSlot } from "../components/ad-slot";
import { useWordCounter } from "./use-word-counter";
import { StatsGrid } from "./stats-grid";
import { STEPS } from "./pipeline-steps";

export default function WordCounterPage() {
  const s = useWordCounter();
  const step = s.text ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Word Counter"
          busy={false}
          icon={(active) => <WordCounterIcon active={active} size={24} />}
          blurb="Live word, character, sentence and reading-time stats as you type or paste — nothing ever leaves this tab."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="word-counter">
            <textarea
              value={s.text}
              onChange={(e) => s.setText(e.target.value)}
              rows={14}
              placeholder="Start typing, or paste your text here…"
              className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[14.5px] leading-[1.65] text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <StatsGrid stats={s.stats} />
            <ToolPipeline active={step} steps={STEPS} />
            <AdSlot slot="tool-rail" />
          </div>
        </div>
      </main>
    </div>
  );
}
