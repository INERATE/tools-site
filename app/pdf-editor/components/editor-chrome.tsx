"use client";

import type { usePdfEditor } from "../hooks/use-pdf-editor";
import type { EditorMode } from "../types";
import { EditorTopbar } from "./editor-topbar";
import { ToolRibbon } from "./tool-ribbon";

/** Topbar + ribbon, wired to the editor state. Split out to keep page.tsx small. */
export function EditorChrome({
  e,
  live,
  tab,
  onTab,
  tool,
  onTool,
  zoom,
  onZoom,
  onToggleSearch,
  onToggleGrid,
  onOpenWatermark,
  onRotatePage,
  onDeletePage,
  onOpenAi,
  onAddText,
  onOpenOcr,
  onOpenForm,
  redactStyle,
  onRedactStyle,
}: {
  e: ReturnType<typeof usePdfEditor>;
  live: boolean;
  tab: string;
  onTab: (v: string) => void;
  tool: EditorMode;
  onTool: (v: EditorMode) => void;
  zoom: number;
  onZoom: (v: number) => void;
  onToggleSearch?: () => void;
  onToggleGrid?: () => void;
  onOpenWatermark?: () => void;
  onRotatePage?: () => void;
  onDeletePage?: () => void;
  onOpenAi?: () => void;
  onAddText?: () => void;
  onOpenOcr?: () => void;
  onOpenForm?: () => void;
  redactStyle?: "blackout" | "blur" | "whiteout";
  onRedactStyle?: (s: "blackout" | "blur" | "whiteout") => void;
}) {
  return (
    <>
      <EditorTopbar
        fileName={e.docName ?? "No document open"}
        edited={e.edited}
        busy={e.busy}
        outUrl={e.outUrl}
        onExport={e.exportPdf}
        canExport={live}
        risk={e.risk}
        onUndo={e.undo}
        onRedo={e.redo}
        canUndo={e.canUndo}
        canRedo={e.canRedo}
        onStartNew={e.startNew}
        onRename={e.renameDoc}
        hasDoc={live}
      />
      <ToolRibbon
        tab={tab}
        onTab={onTab}
        tool={tool}
        onTool={onTool}
        zoom={zoom}
        onZoom={onZoom}
        onToggleSearch={onToggleSearch}
        onToggleGrid={onToggleGrid}
        onOpenWatermark={onOpenWatermark}
        onRotatePage={onRotatePage}
        onDeletePage={onDeletePage}
        onOpenAi={onOpenAi}
        onAddText={onAddText}
        onOpenOcr={onOpenOcr}
        onOpenForm={onOpenForm}
        redactStyle={redactStyle}
        onRedactStyle={onRedactStyle}
      />
    </>
  );
}
