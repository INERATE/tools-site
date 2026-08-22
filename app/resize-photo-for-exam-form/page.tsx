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
import { ResizeImageIcon } from "../components/icons/resize-image-icon";
import { EXAM_PRESETS, KB } from "../lib/exam-presets";
import { useExamFit } from "./use-exam-fit";
import { STEPS } from "./pipeline-steps";
import { useMemo } from "react";

const kb = (n: number) => `${Math.round(n / KB)} KB`;

export default function ExamPhotoPage() {
  const e = useExamFit();
  const step = e.result ? 2 : e.image ? 1 : 0;
  const url = useMemo(() => (e.result ? URL.createObjectURL(e.result.blob) : null), [e.result]);
  const fits = e.result && e.result.size <= e.preset.maxKB * KB;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Resize Photo & Signature for Exam Forms"
          busy={e.busy}
          icon={(active) => <ResizeImageIcon active={active} size={24} />}
          blurb="Pick your exam and get a JPG at exactly the pixel size and file size the portal demands — no guessing at a quality slider until it finally accepts. Your photo never leaves your device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="resize-photo-for-exam-form">
            <Dropzone
              id="exam-photo-input"
              accept="image/jpeg,image/png,image/webp"
              onFiles={e.addFiles}
              label={e.image ? "Choose a different photo" : "Drop your photo or signature here, or click to choose"}
            />

            {e.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {e.error}
              </p>
            )}

            <fieldset className="mb-4">
              <legend className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">
                Which form is this for?
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {EXAM_PRESETS.map((p) => (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer flex-col rounded-xl border px-3 py-2 transition-colors ${
                      p.id === e.presetId
                        ? "border-[var(--accent)] bg-[var(--accent)]/5"
                        : "border-[var(--border)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-[13.5px] font-semibold text-[var(--text)]">
                      <input
                        type="radio"
                        name="exam-preset"
                        value={p.id}
                        checked={p.id === e.presetId}
                        onChange={() => e.setPresetId(p.id)}
                        className="accent-[var(--accent)]"
                      />
                      {p.label}
                    </span>
                    <span className="mt-0.5 pl-6 text-[11.5px] text-[var(--text-dim)]">
                      {p.w}&times;{p.h} px &middot; {p.minKB}&ndash;{p.maxKB} KB &middot; {p.note}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {e.result && (
              <p className="mb-4 text-[12.5px] text-[var(--text-dim)]">
                Result: {e.preset.w}&times;{e.preset.h} px,{" "}
                <span className={`font-semibold ${fits ? "text-emerald-500" : "text-amber-500"}`}>{kb(e.result.size)}</span>{" "}
                {fits ? `— inside the ${e.preset.minKB}–${e.preset.maxKB} KB range.` : "— still over the limit."}
                {e.result.padded && " Padded up to clear the portal's minimum size."}
              </p>
            )}

            {e.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={e.image.url}
                alt="Your selected photo"
                className="mb-2 max-h-64 rounded-xl border border-[var(--border)] object-contain"
              />
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={e.image?.url}
              ratio={e.image ? e.image.w / e.image.h : undefined}
              count={e.image ? 1 : 0}
              itemLabel="photo"
              addInputId="exam-photo-input"
              action={
                <RunAction
                  label="Resize for the form"
                  busyLabel="Resizing…"
                  busy={e.busy}
                  disabled={!e.image}
                  url={url}
                  fileName={`${e.preset.id}.jpg`}
                  onRun={e.run}
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
