"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { ConvertImageIcon } from "../components/icons/convert-image-icon";
import { AdSlot } from "../components/ad-slot";
import { CopyButton } from "./copy-button";
import { useImageToBase64 } from "./use-image-to-base64";
import { STEPS } from "./pipeline-steps";

/** Encodes an image as a base64 data: URI, entirely client-side — a plain FileReader read, no dependency. */
export default function ImageToBase64Page() {
  const s = useImageToBase64();
  const step = s.dataUrl ? 2 : s.name ? 1 : 0;
  const kb = (s.size / 1024).toFixed(1);

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Image to Base64"
          busy={false}
          icon={(active) => <ConvertImageIcon active={active} size={24} />}
          blurb="Encodes an image as a base64 data: URI you can paste straight into CSS, HTML or JSON. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="image-to-base64">
            <Dropzone
              id="image-to-base64-input"
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

            {s.dataUrl && (
              <div className="mb-2">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[13.5px] text-[var(--text-dim)]">{kb} KB encoded</p>
                  <CopyButton text={s.dataUrl} />
                </div>
                <textarea
                  readOnly
                  data-lenis-prevent
                  value={s.dataUrl}
                  rows={10}
                  className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-[12px] leading-[1.6] break-all text-[var(--text)] overscroll-contain"
                />
              </div>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={s.dataUrl ?? undefined}
              count={s.name ? 1 : 0}
              itemLabel="image"
              addInputId="image-to-base64-input"
              action={
                <RunAction
                  label="Download as .txt"
                  busyLabel="Encoding…"
                  busy={false}
                  disabled={!s.txtUrl}
                  url={s.txtUrl}
                  fileName={`${s.name?.replace(/\.[^.]+$/, "") ?? "image"}-base64.txt`}
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
