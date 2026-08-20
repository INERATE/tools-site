"use client";

import { useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { CanvasStage } from "./components/canvas-stage";
import { EditorTopbar } from "./components/editor-topbar";
import { FloatingDock } from "./components/floating-dock";
import { Inspector } from "./components/inspector";
import { LiveCanvas } from "./components/live-canvas";
import { PageRail } from "./components/page-rail";
import { ToolRibbon } from "./components/tool-ribbon";
import { usePdfEditor } from "./hooks/use-pdf-editor";
import type { EditorMode } from "./types";

export default function PdfEditorPage() {
  const [tab, setTab] = useState("Edit");
  const [tool, setTool] = useState<EditorMode>("select");
  const [zoom, setZoom] = useState(100);
  const [demoPick, setDemoPick] = useState<string | null>("abs");
  const e = usePdfEditor();

  const live = e.pages.length > 0;
  const current = e.pages[e.page];

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AmbientBlob />
      <EditorTopbar
        fileName={e.file?.name ?? "No document open"}
        edited={e.edited}
        busy={e.busy}
        outUrl={e.outUrl}
        onExport={e.exportPdf}
        canExport={live}
        risk={e.risk}
      />
      <ToolRibbon tab={tab} onTab={setTab} tool={tool} onTool={setTool} zoom={zoom} onZoom={setZoom} />

      <div className="relative flex min-h-0 flex-1">
        <PageRail pages={live ? e.pages.length : 4} active={e.page} onPick={e.setPage} thumbs={e.pages} />

        <div className="relative flex min-w-0 flex-1">
          {live && current ? (
            <main
              className="flex-1 overflow-auto p-6"
              style={{ background: "color-mix(in srgb, var(--bg) 92%, black)" }}
            >
              {current.scanned && (
                <div className="mx-auto mb-4 w-fit max-w-full rounded-xl border border-amber-500/30 bg-amber-500/8 px-4 py-2.5 text-[12.5px] text-amber-400">
                  This page is a scan — an image with no text layer. Nothing on it can be edited as text.
                  Run it through <a href="/ocr-pdf" className="underline">OCR PDF</a> first to make the text real.
                </div>
              )}
              <div className="mx-auto w-fit">
                <LiveCanvas
                  page={current}
                  blocks={e.blocks.filter((b) => b.pageIndex === e.page)}
                  zoom={zoom}
                  selected={e.selected}
                  onSelect={e.setSelected}
                  onEdit={e.editBlock}
                />
              </div>
            </main>
          ) : (
            <CanvasStage zoom={zoom} selected={demoPick} onSelect={setDemoPick} />
          )}

          {!live && (
            <div className="absolute inset-x-0 bottom-20 z-30 mx-auto w-[min(520px,90%)]">
              <div className="liquid-card p-4">
                <Dropzone
                  id="pdf-editor-input"
                  onFiles={e.open}
                  label="Drop a PDF here to edit it for real"
                  hint="Opens in this tab only — nothing is uploaded"
                />
                {e.error && (
                  <p role="alert" className="text-[13px] font-medium text-[#ff8fa3]">
                    {e.error}
                  </p>
                )}
              </div>
            </div>
          )}

          <FloatingDock page={e.page} pages={live ? e.pages.length : 24} onPage={e.setPage} />
        </div>

        <Inspector
          block={e.blocks.find((b) => b.id === e.selected)}
          onFamily={e.setFamily}
          match={live ? "Click a block to see its matched font" : "Open a PDF to begin"}
        />
      </div>
    </div>
  );
}
