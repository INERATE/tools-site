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
import { WatermarkIcon } from "../components/icons/watermark-icon";
import { CleanControls } from "./clean-controls";
import { CoverCanvas } from "./cover-canvas";
import { MarkReport } from "./mark-report";
import { useClean } from "./use-clean";
import { STEPS } from "./pipeline-steps";

export default function WatermarkRemoverPage() {
  const c = useClean();
  const name = c.file?.name.replace(/\.pdf$/i, "") ?? "document";
  const step = c.url ? 2 : c.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Watermark Remover"
          busy={c.busy}
          icon={(active) => <WatermarkIcon active={active} size={24} />}
          blurb="Deletes watermark and stamp annotations outright, and lets you cover anything printed into the page itself. Drag a box over a mark to hide it. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="watermark-remover">
            <Dropzone
              id="wm-input"
              onFiles={c.pick}
              label={c.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {c.file && (
              <>
                <MarkReport marks={c.marks} boxes={c.boxes.length} />
                <CleanControls
                  index={c.index}
                  pages={c.pages}
                  everyPage={c.everyPage}
                  dark={c.dark}
                  boxes={c.boxes.length}
                  onIndex={c.setIndex}
                  onEveryPage={c.setEveryPage}
                  onDark={c.setDark}
                  onClear={c.clearBoxes}
                />

                <div className="glass rounded-2xl p-3">
                  {c.view ? (
                    <CoverCanvas src={c.view} boxes={c.boxes} dark={c.dark} onAdd={c.addBox} onRemove={c.removeBox} />
                  ) : (
                    <div className="shimmer aspect-[595/842] w-full rounded-xl bg-white/[0.06]" />
                  )}
                </div>
              </>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={c.view ?? undefined}
              count={c.pages}
              itemLabel={c.pages === 1 ? "page" : "pages"}
              addInputId="wm-input"
              action={
                <RunAction
                  label={c.marks || c.boxes.length ? "Save the cleaned PDF" : "Save a copy"}
                  busyLabel="Writing…"
                  busy={c.busy}
                  disabled={!c.file}
                  url={c.url}
                  fileName={`${name}-clean.pdf`}
                  onRun={c.run}
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
