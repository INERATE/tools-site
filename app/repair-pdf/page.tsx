"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { RepairPdfIcon } from "../components/icons/repair-pdf-icon";
import { useRepair } from "./use-repair";
import { STEPS } from "./pipeline-steps";

export default function RepairPdfPage() {
  const r = useRepair();
  const step = r.url ? 2 : r.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Repair PDF"
          busy={r.busy}
          icon={(active) => <RepairPdfIcon active={active} size={24} />}
          blurb="Rebuilds a PDF's internal structure — broken cross-reference tables, dangling object references, duplicate objects. It cannot recover a page whose content stream is truly missing, only structural damage. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="repair-pdf">
            <Dropzone
              id="repair-input"
              onFiles={r.pick}
              label={r.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {r.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {r.error}
              </p>
            )}

            {r.url && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Repaired. The preview on the right is rendered from the actual output — if it looks right, the file is
                good.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={r.thumb?.url}
              ratio={r.thumb ? r.thumb.w / r.thumb.h : undefined}
              count={r.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="repair-input"
              action={
                <RunAction
                  label="Repair PDF"
                  busyLabel="Rebuilding…"
                  busy={r.busy}
                  disabled={!r.file}
                  url={r.url}
                  fileName={`${r.file?.name.replace(/\.pdf$/i, "") ?? "document"}-repaired.pdf`}
                  onRun={r.run}
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
