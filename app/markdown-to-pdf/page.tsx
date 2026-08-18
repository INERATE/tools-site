"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { MarkdownToPdfIcon } from "../components/icons/markdown-to-pdf-icon";
import { ResultPages } from "../docx-to-pdf/result-pages";
import { useMarkdownToPdf } from "./use-md-to-pdf";
import { STEPS } from "./pipeline-steps";

export default function MarkdownToPdfPage() {
  const m = useMarkdownToPdf();
  const step = m.url ? 2 : m.markdown.trim() ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Markdown to PDF"
          busy={m.busy}
          icon={(active) => <MarkdownToPdfIcon active={active} size={24} />}
          blurb="Paste markdown and convert it to a clean A4 PDF, with a preview before you download. Headings, paragraphs and lists carry over; inline formatting and tables do not. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="markdown-to-pdf">
            <textarea
              value={m.markdown}
              onChange={(e) => m.setMarkdown(e.target.value)}
              spellCheck={false}
              rows={10}
              className="glass mb-4 w-full resize-y rounded-2xl p-4 font-mono text-[12.5px] leading-[1.6] text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />

            {m.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {m.error}
              </p>
            )}

            {m.url && m.pages.length > 0 && (
              <ResultPages
                blocks={m.blocks}
                pages={m.pages}
                note="Headings, paragraphs and lists carry over; inline formatting, tables and images do not."
              />
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              thumbUrl={m.pages[0]?.url}
              ratio={m.pages[0] ? m.pages[0].width / m.pages[0].height : undefined}
              count={m.pages.length}
              itemLabel={m.pages.length === 1 ? "page" : "pages"}
              action={
                <RunAction
                  label="Convert to PDF"
                  busyLabel="Converting…"
                  busy={m.busy}
                  disabled={!m.markdown.trim()}
                  url={m.url}
                  fileName="document.pdf"
                  onRun={m.run}
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
