"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { DocxIcon } from "../components/icons/docx-icon";
import { ResultPages } from "./result-pages";
import { useDocx } from "./use-docx";
import { STEPS } from "./pipeline-steps";

export default function DocxToPdfPage() {
  const d = useDocx();
  const step = d.url && !d.busy ? 2 : d.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="DOCX to PDF"
          busy={d.busy}
          icon={(active) => <DocxIcon active={active} size={24} />}
          blurb="Turns a Word document into a clean A4 PDF in your browser — nothing is uploaded. Headings, paragraphs and lists carry over; check the preview before you download."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="docx-to-pdf">
            <Dropzone
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

            {d.url && !d.busy && (
              <ResultPages
                url={d.url}
                fileName={`${d.name?.replace(/\.docx?$/i, "") ?? "document"}.pdf`}
                blocks={d.blocks}
                pages={d.pages}
              />
            )}
          </ToolWindow>

          <ToolPipeline active={step} steps={STEPS} />
        </div>
      </main>
    </div>
  );
}
