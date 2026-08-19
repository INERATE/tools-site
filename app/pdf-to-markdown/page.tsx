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
import { PdfToMarkdownIcon } from "../components/icons/pdf-to-markdown-icon";
import { usePdfToMarkdown } from "./use-pdf-to-md";
import { STEPS } from "./pipeline-steps";

export default function PdfToMarkdownPage() {
  const m = usePdfToMarkdown();
  const step = m.url && !m.busy ? 2 : m.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="PDF to Markdown"
          busy={m.busy}
          icon={(active) => <PdfToMarkdownIcon active={active} size={24} />}
          blurb="Extracts a PDF's text and guesses at headings by font size — a best-effort re-derivation, not an exact reversal. Works on real, selectable text, not scanned images. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="pdf-to-markdown">
            <Dropzone
              id="pdf-to-md-input"
              onFiles={m.pick}
              label={m.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {m.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {m.error}
              </p>
            )}

            {m.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Converting…
              </p>
            )}

            {m.markdown && !m.busy && (
              <pre className="glass max-h-[60vh] overflow-auto rounded-2xl p-4 text-[12.5px] leading-[1.6] whitespace-pre-wrap text-[var(--text)]">
                {m.markdown}
              </pre>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail count={m.name ? 1 : 0} itemLabel="PDF" addInputId="pdf-to-md-input"
              action={
                <RunAction
                  label="Download the .md"
                  busyLabel="Converting…"
                  busy={m.busy}
                  disabled={!m.url}
                  url={m.url}
                  fileName={`${m.name?.replace(/\.pdf$/i, "") ?? "document"}.md`}
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
