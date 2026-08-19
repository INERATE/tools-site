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
import { FlattenFormIcon } from "../components/icons/flatten-form-icon";
import { AdSlot } from "../components/ad-slot";
import { useFlatten } from "./use-flatten";
import { STEPS } from "./pipeline-steps";

export default function FlattenFormsPage() {
  const s = useFlatten();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Flatten PDF Forms"
          busy={s.busy}
          icon={(active) => <FlattenFormIcon active={active} size={24} />}
          blurb="Locks in a filled PDF form's values as permanent page content — fields stop being editable, checkboxes and text render exactly as they looked when filled. Entirely on-device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="flatten-forms">
            <Dropzone
              id="flatten-forms-input"
              onFiles={s.pick}
              label={s.name ? "Choose a different PDF" : "Drop a filled PDF form here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Flattening…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Flattened {s.fieldCount} field{s.fieldCount === 1 ? "" : "s"}. The PDF now looks the same
                everywhere but can&apos;t be edited.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="flatten-forms-input"
              action={
                <RunAction
                  label="Download the flattened PDF"
                  busyLabel="Flattening…"
                  busy={s.busy}
                  disabled={!s.url}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-flattened.pdf`}
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
