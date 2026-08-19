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
import { RemoveBackgroundIcon } from "../components/icons/remove-background-icon";
import { TransparentPreview } from "./transparent-preview";
import { useRemoveBg } from "./use-remove-bg";
import { STEPS } from "./pipeline-steps";

export default function RemoveBackgroundPage() {
  const r = useRemoveBg();
  const step = r.url ? 2 : r.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Remove Background"
          busy={r.busy}
          icon={(active) => <RemoveBackgroundIcon active={active} size={24} />}
          blurb="Segments the subject from its background — one clear subject works best. The segmentation model downloads once on first use, the one deliberate exception to 'nothing is uploaded' this suite makes; nothing about your photo ever leaves the device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="remove-background" badge="Downloads AI model">
            <Dropzone
              id="remove-bg-input"
              accept="image/jpeg,image/png"
              onFiles={r.pick}
              label={r.name ? "Choose a different photo" : "Drop a photo here, or click to choose"}
            />

            {r.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {r.error}
              </p>
            )}

            {r.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                {r.progress > 0 ? `Working… ${Math.round(r.progress * 100)}%` : "Downloading the model…"}
              </p>
            )}

            {r.url && !r.busy && <TransparentPreview url={r.url} />}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={r.url ?? r.srcUrl ?? undefined}
              count={r.name ? 1 : 0}
              itemLabel="photo"
              addInputId="remove-bg-input"
              action={
                <RunAction
                  label="Download the PNG"
                  busyLabel="Working…"
                  busy={r.busy}
                  disabled={!r.url}
                  url={r.url}
                  fileName={`${r.name?.replace(/\.[^.]+$/, "") ?? "photo"}-no-bg.png`}
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
