"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { PageNumbersIcon } from "../components/icons/page-numbers-icon";
import { NumberOptions } from "./number-options";
import { usePageNumbers } from "./use-page-numbers";
import { STEPS } from "./pipeline-steps";

export default function PageNumbersPage() {
  const n = usePageNumbers();
  const step = n.url ? 2 : n.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Page Numbers"
          busy={n.busy}
          icon={(active) => <PageNumbersIcon active={active} size={24} />}
          blurb="Stamp a running page number onto every page — pick where it sits, how it reads, and where it starts. Everything runs in your browser; nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="page-numbers">
            <Dropzone
              id="page-numbers-input"
              onFiles={n.pick}
              label={n.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {n.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {n.error}
              </p>
            )}

            {n.file && (
              <NumberOptions
                position={n.position}
                onPosition={n.setPosition}
                style={n.style}
                onStyle={n.setStyle}
                startAt={n.startAt}
                onStartAt={n.setStartAt}
              />
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={n.thumb?.url}
              ratio={n.thumb ? n.thumb.w / n.thumb.h : undefined}
              count={n.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="page-numbers-input"
              action={
                <RunAction
                  label="Add page numbers"
                  busyLabel="Stamping…"
                  busy={n.busy}
                  disabled={!n.file}
                  url={n.url}
                  fileName={`${n.file?.name.replace(/\.pdf$/i, "") ?? "document"}-numbered.pdf`}
                  onRun={n.run}
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
