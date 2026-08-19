"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { AiSummarizerIcon } from "../components/icons/ai-summarizer-icon";
import { AdSlot } from "../components/ad-slot";
import { useSummarize } from "./use-summarize";
import { STEPS } from "./pipeline-steps";

export default function AiSummarizerPage() {
  const s = useSummarize();
  const step = s.summary ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="AI Summarizer"
          busy={s.busy}
          icon={(active) => <AiSummarizerIcon active={active} size={24} />}
          blurb="Extracts a PDF's text and sends it — text only, never the file — to a summarization backend. This is the one deliberate exception to 'nothing is uploaded' in this suite. Not configured yet, so this tool won't run until it is."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="ai-summarizer" badge="Sends extracted text">
            <Dropzone
              id="ai-summarizer-input"
              onFiles={s.pick}
              label={s.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Summarizing…
              </p>
            )}

            {s.summary && !s.busy && (
              <div className="glass rounded-2xl p-5 text-[14px] leading-[1.7] text-[var(--text)]">{s.summary}</div>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="ai-summarizer-input"
              action={
                <RunAction
                  label="Download the summary"
                  busyLabel="Summarizing…"
                  busy={s.busy}
                  disabled={!s.url}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-summary.txt`}
                  onRun={() => {}}
                />
              }
            />
            <ToolPipeline active={step} steps={STEPS} />
            <AdSlot slot="tool-rail" />
          </div>
        </div>
      </main>
    </div>
  );
}
