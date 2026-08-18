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
import { CompressPdfIcon } from "../components/icons/compress-pdf-icon";
import { LevelSelect } from "./level-select";
import { useCompress } from "./use-compress";
import { STEPS } from "./pipeline-steps";

export default function CompressPdfPage() {
  const c = useCompress();
  const step = c.url ? 2 : c.file ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Compress PDF"
          busy={c.busy}
          icon={(active) => <CompressPdfIcon active={active} size={24} />}
          blurb="Shrink a scanned or image-heavy PDF by re-encoding its pages. Best for photo-heavy files — the result's text is no longer selectable, since every page becomes a compressed image. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="compress-pdf">
            <Dropzone
              id="compress-input"
              onFiles={c.pick}
              label={c.file ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {c.file && <LevelSelect level={c.level} onLevel={c.setLevel} inSize={c.inSize} outSize={c.outSize} />}

            {c.busy && (
              <p className="flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Compressing… {Math.round(c.progress * 100)}%
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={c.preview?.url}
              ratio={c.preview ? c.preview.w / c.preview.h : undefined}
              count={c.file ? 1 : 0}
              itemLabel="PDF"
              addInputId="compress-input"
              action={
                <RunAction
                  label="Compress"
                  busyLabel="Compressing…"
                  busy={c.busy}
                  disabled={!c.file}
                  url={c.url}
                  fileName={`${c.file?.name.replace(/\.pdf$/i, "") ?? "document"}-compressed.pdf`}
                  onRun={c.run}
                />
              }
            />
            <ToolPipeline active={step} steps={STEPS} />
          </div>
        </div>
      </main>
    </div>
  );
}
