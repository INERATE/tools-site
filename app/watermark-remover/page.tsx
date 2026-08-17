"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolHead } from "../components/tool-head";
import { WatermarkIcon } from "../components/icons/watermark-icon";
import { CleanControls } from "./clean-controls";
import { CoverCanvas } from "./cover-canvas";
import { MarkReport } from "./mark-report";
import { useClean } from "./use-clean";

export default function WatermarkRemoverPage() {
  const c = useClean();
  const name = c.file?.name.replace(/\.pdf$/i, "") ?? "document";

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <ToolHead
          title="Watermark Remover"
          busy={c.busy}
          icon={(active) => <WatermarkIcon active={active} size={24} />}
          blurb="Deletes watermark and stamp annotations outright, and lets you cover anything printed into the page itself. Drag a box over a mark to hide it. Everything runs in your browser; nothing is uploaded."
        />

        <Dropzone
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
                <CoverCanvas
                  src={c.view}
                  boxes={c.boxes}
                  dark={c.dark}
                  onAdd={c.addBox}
                  onRemove={c.removeBox}
                />
              ) : (
                <div className="shimmer aspect-[595/842] w-full rounded-xl bg-white/[0.06]" />
              )}
            </div>

            <RunAction
              label={c.marks || c.boxes.length ? "Save the cleaned PDF" : "Save a copy"}
              busyLabel="Writing…"
              busy={c.busy}
              url={c.url}
              fileName={`${name}-clean.pdf`}
              onRun={c.run}
            />
          </>
        )}
      </main>
    </div>
  );
}
