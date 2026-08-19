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
import { CsvToPdfIcon } from "../components/icons/csv-to-pdf-icon";
import { AdSlot } from "../components/ad-slot";
import { useCsv } from "./use-csv";
import { STEPS } from "./pipeline-steps";

export default function CsvToPdfPage() {
  const s = useCsv();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="CSV to PDF"
          busy={s.busy}
          icon={(active) => <CsvToPdfIcon active={active} size={24} />}
          blurb="Turns a CSV file into a clean, paginated table PDF — first row as a bold header, every column and row preserved. Runs entirely on-device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="csv-to-pdf">
            <Dropzone
              id="csv-to-pdf-input"
              onFiles={s.pick}
              accept=".csv,text/csv"
              hint="CSV files only — they never leave this tab"
              label={s.name ? "Choose a different CSV" : "Drop a CSV here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Converting…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Converted {s.rows} row{s.rows === 1 ? "" : "s"} into a paginated PDF table.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="CSV"
              addInputId="csv-to-pdf-input"
              action={
                <RunAction
                  label="Download the PDF"
                  busyLabel="Converting…"
                  busy={s.busy}
                  disabled={!s.url}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.csv$/i, "") ?? "table"}.pdf`}
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
