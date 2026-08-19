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
import { RemoveBlankPagesIcon } from "../components/icons/remove-blank-pages-icon";
import { AdSlot } from "../components/ad-slot";
import { useRemoveBlank } from "./use-remove-blank";
import { STEPS } from "./pipeline-steps";

export default function RemoveBlankPagesPage() {
  const s = useRemoveBlank();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Remove Blank Pages"
          busy={s.busy}
          icon={(active) => <RemoveBlankPagesIcon active={active} size={24} />}
          blurb="Finds and drops near-all-white pages from a scanned or exported PDF — a pixel-based heuristic, disclosed here: an unusually sparse page (a single small logo, for example) can be misread as blank. Runs entirely on-device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="remove-blank-pages">
            <Dropzone
              id="remove-blank-input"
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
                Scanning pages…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Removed {s.removed.length} blank page{s.removed.length === 1 ? "" : "s"}: {s.removed.join(", ")}.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="remove-blank-input"
              action={
                <RunAction
                  label="Download the trimmed PDF"
                  busyLabel="Scanning…"
                  busy={s.busy}
                  disabled={!s.url}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-trimmed.pdf`}
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
