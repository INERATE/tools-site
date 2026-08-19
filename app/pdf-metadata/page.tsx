"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { PdfMetadataIcon } from "../components/icons/pdf-metadata-icon";
import { AdSlot } from "../components/ad-slot";
import { MetaFields } from "./meta-fields";
import { usePdfMetadata } from "./use-pdf-metadata";
import { STEPS } from "./pipeline-steps";

export default function PdfMetadataPage() {
  const s = usePdfMetadata();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Edit PDF Metadata"
          busy={s.busy}
          icon={(active) => <PdfMetadataIcon active={active} size={24} />}
          blurb="Reads and edits a PDF's title, author, subject and keywords — the document properties viewers and search engines see, not the page content. Runs entirely on-device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-metadata">
            <Dropzone
              id="pdf-metadata-input"
              onFiles={s.pick}
              label={s.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.name && <MetaFields meta={s.meta} update={s.update} />}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Working…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">Metadata updated. Content is unchanged.</p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="pdf-metadata-input"
              action={
                <RunAction
                  label="Download the updated PDF"
                  busyLabel="Saving…"
                  busy={s.busy}
                  disabled={!s.name}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-updated.pdf`}
                  onRun={s.run}
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
