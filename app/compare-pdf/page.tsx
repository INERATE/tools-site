"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { ComparePdfIcon } from "../components/icons/compare-pdf-icon";
import { DiffView } from "./diff-view";
import { useCompare } from "./use-compare";
import { STEPS } from "./pipeline-steps";

export default function ComparePdfPage() {
  const c = useCompare();
  const step = c.diff ? 2 : c.nameA || c.nameB ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Compare PDF"
          busy={c.busy}
          icon={(active) => <ComparePdfIcon active={active} size={24} />}
          blurb="Extracts the text from two PDFs and shows exactly what changed, line by line. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="compare-pdf">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <Dropzone id="compare-a" onFiles={c.pickA} label={c.nameA ?? "Drop the first PDF"} />
              <Dropzone id="compare-b" onFiles={c.pickB} label={c.nameB ?? "Drop the second PDF"} />
            </div>

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {c.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Comparing…
              </p>
            )}

            {c.diff && (
              <>
                <p className="mb-3 text-[12.5px] text-[var(--text-dim)]">
                  <span className="text-emerald-500">+{c.added} added</span> · <span className="text-rose-400">-{c.removed} removed</span>
                </p>
                <DiffView diff={c.diff} />
              </>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={c.diff ? c.added + c.removed : 0}
              itemLabel="change"
              action={
                <RunAction
                  label="Download the diff"
                  busyLabel="Comparing…"
                  busy={c.busy}
                  disabled={!c.reportUrl}
                  url={c.reportUrl}
                  fileName="compare.txt"
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
