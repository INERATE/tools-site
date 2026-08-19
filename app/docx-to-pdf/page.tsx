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
import { AdSlot } from "../components/ad-slot";
import { ToolWindow } from "../components/tool-window";
import { DocxIcon } from "../components/icons/docx-icon";
import { ResultPages } from "./result-pages";
import { useDocx } from "./use-docx";
import { STEPS } from "./pipeline-steps";

export default function DocxToPdfPage() {
  const d = useDocx();
  const step = d.url && !d.busy ? 2 : d.name ? 1 : 0;
  const thumb = d.pages[0];

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="DOCX to PDF"
          busy={d.busy}
          icon={(active) => <DocxIcon active={active} size={24} />}
          blurb="Turns a Word document into a clean A4 PDF in your browser — nothing is uploaded. Headings, paragraphs and lists carry over; check the preview before you download."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="docx-to-pdf">
            <Dropzone
              id="docx-input"
              onFiles={d.pick}
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              label={d.name ? "Choose a different document" : "Drop a .docx here, or click to choose"}
              hint="Word documents only — they never leave this tab"
            />

            {d.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {d.error}
              </p>
            )}

            {d.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Converting {d.name}…
              </p>
            )}

            {d.url && !d.busy && <ResultPages blocks={d.blocks} pages={d.pages} />}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={thumb?.url}
              ratio={thumb ? thumb.width / thumb.height : undefined}
              count={d.pages.length}
              itemLabel={d.pages.length === 1 ? "page" : "pages"}
              addInputId="docx-input"
              action={
                <RunAction
                  label="Download the PDF"
                  busyLabel="Converting…"
                  busy={d.busy}
                  disabled={!d.url}
                  url={d.url}
                  fileName={`${d.name?.replace(/\.docx?$/i, "") ?? "document"}.pdf`}
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
