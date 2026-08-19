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
import { SmartFormsIcon } from "../components/icons/smart-forms-icon";
import { AdSlot } from "../components/ad-slot";
import { useSmartForm } from "./use-smart-form";
import { STEPS } from "./pipeline-steps";

export default function SmartFormsPage() {
  const s = useSmartForm();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Smart PDF Forms"
          busy={s.busy}
          icon={(active) => <SmartFormsIcon active={active} size={24} />}
          blurb="Finds blank lines (___) and [ ] checkboxes in a PDF and turns each one into a real, fillable form field — entirely on-device, no AI call needed. Field edges are a heuristic, not per-glyph precision, so unusual layouts may need a nudge afterward. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="smart-forms">
            <Dropzone
              id="smart-forms-input"
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
                Detecting fields…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Found and created {s.fieldCount} field{s.fieldCount === 1 ? "" : "s"}. Open the download in PDF Forms
                to fill it in, or any PDF reader that supports AcroForms.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="smart-forms-input"
              action={
                <RunAction
                  label="Download the fillable PDF"
                  busyLabel="Detecting…"
                  busy={s.busy}
                  disabled={!s.url}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-fillable.pdf`}
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
