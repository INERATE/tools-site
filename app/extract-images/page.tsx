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
import { ExtractImagesIcon } from "../components/icons/extract-images-icon";
import { useExtractImages } from "./use-extract-images";
import { STEPS } from "./pipeline-steps";

export default function ExtractImagesPage() {
  const x = useExtractImages();
  const step = x.zipUrl ? 2 : x.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Extract Images from PDF"
          busy={x.busy}
          icon={(active) => <ExtractImagesIcon active={active} size={24} />}
          blurb="Pulls every JPEG embedded in a PDF's pages out at full quality, bundled as a .zip. Other image encodings inside a PDF are not decoded — the count reflects what was actually recoverable. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="extract-images">
            <Dropzone
              id="extract-images-input"
              onFiles={x.pick}
              label={x.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {x.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {x.error}
              </p>
            )}

            {x.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Reading images…
              </p>
            )}

            {x.images.length > 0 && (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {x.images.map((img) => (
                  <li key={img.name} className="glass overflow-hidden rounded-xl p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.name} className="block w-full rounded-lg" />
                  </li>
                ))}
              </ul>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={x.images[0]?.url}
              count={x.images.length}
              itemLabel={x.images.length === 1 ? "image" : "images"}
              addInputId="extract-images-input"
              action={
                <RunAction
                  label="Download the .zip"
                  busyLabel="Reading…"
                  busy={x.busy}
                  disabled={!x.zipUrl}
                  url={x.zipUrl}
                  fileName={`${x.name?.replace(/\.pdf$/i, "") ?? "images"}.zip`}
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
