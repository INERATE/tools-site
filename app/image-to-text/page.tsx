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
import { ImageToTextIcon } from "../components/icons/image-to-text-icon";
import { AdSlot } from "../components/ad-slot";
import { useImageToText } from "./use-image-to-text";
import { STEPS } from "./pipeline-steps";

export default function ImageToTextPage() {
  const s = useImageToText();
  const step = s.text ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Image to Text"
          busy={s.busy}
          icon={(active) => <ImageToTextIcon active={active} size={24} />}
          blurb="Reads the text out of a photo, screenshot or scan and turns it into copyable, searchable plain text — OCR runs entirely on-device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="image-to-text">
            <Dropzone
              id="image-to-text-input"
              onFiles={s.pick}
              accept="image/*"
              hint="JPG, PNG, WEBP — they never leave this tab"
              label={s.name ? "Choose a different image" : "Drop an image here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Reading text… {s.progress}%
              </p>
            )}

            {s.text && !s.busy && (
              <div className="mb-2">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[13.5px] text-[var(--text-dim)]">
                    {Math.round(s.confidence)}% confidence
                  </p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(s.text)}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-[12.5px] font-semibold text-[var(--text-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                  >
                    Copy text
                  </button>
                </div>
                <textarea
                  readOnly
                  value={s.text}
                  rows={10}
                  className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[13.5px] leading-[1.6] text-[var(--text)]"
                />
              </div>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={s.previewUrl ?? undefined}
              count={s.name ? 1 : 0}
              itemLabel="image"
              addInputId="image-to-text-input"
              action={
                <RunAction
                  label="Download the text"
                  busyLabel="Reading…"
                  busy={s.busy}
                  disabled={!s.url}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.[^.]+$/, "") ?? "extracted"}.txt`}
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
