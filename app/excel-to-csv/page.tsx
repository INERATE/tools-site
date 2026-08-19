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
import { ExcelToPdfIcon } from "../components/icons/excel-to-pdf-icon";
import { useExcelToCsv } from "./use-excel-to-csv";
import { STEPS } from "./pipeline-steps";

/** Real .xlsx -> plain .csv, via SheetJS (already in the bundle for excel-to-pdf) — entirely on-device. */
export default function ExcelToCsvPage() {
  const c = useExcelToCsv();
  const step = c.url && !c.busy ? 2 : c.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Excel to CSV"
          busy={c.busy}
          icon={(active) => <ExcelToPdfIcon active={active} size={24} />}
          blurb="Reads the first sheet of a .xlsx workbook and saves it as plain .csv, in your browser. Nothing is uploaded."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="excel-to-csv">
            <Dropzone
              id="excel-to-csv-input"
              onFiles={c.pick}
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              label={c.name ? "Choose a different workbook" : "Drop a .xlsx here, or click to choose"}
              hint="Excel workbooks only — they never leave this tab"
            />

            {c.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {c.error}
              </p>
            )}

            {c.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Converting {c.name}…
              </p>
            )}

            {c.url && !c.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Read {c.rows} row{c.rows === 1 ? "" : "s"} from sheet &ldquo;{c.sheet}&rdquo; — other sheets are not included.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={c.rows}
              itemLabel={c.rows === 1 ? "row" : "rows"}
              addInputId="excel-to-csv-input"
              action={
                <RunAction
                  label="Download the .csv"
                  busyLabel="Converting…"
                  busy={c.busy}
                  disabled={!c.url}
                  url={c.url}
                  fileName={`${c.name?.replace(/\.xlsx$/i, "") ?? "sheet"}.csv`}
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
