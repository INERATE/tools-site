"use client";

import { useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { CanvasStage } from "./components/canvas-stage";
import { EditorTopbar } from "./components/editor-topbar";
import { FloatingDock } from "./components/floating-dock";
import { Inspector } from "./components/inspector";
import { PageRail } from "./components/page-rail";
import { ToolRibbon } from "./components/tool-ribbon";
import type { EditorMode } from "./types";

const PAGES = 24;

export default function PdfEditorPage() {
  const [tab, setTab] = useState("Edit");
  const [tool, setTool] = useState<EditorMode>("select");
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string | null>("abs");

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AmbientBlob />
      <EditorTopbar fileName="in-place-editing.pdf" />
      <ToolRibbon tab={tab} onTab={setTab} tool={tool} onTool={setTool} zoom={zoom} onZoom={setZoom} />

      <div className="relative flex min-h-0 flex-1">
        <PageRail pages={PAGES} active={page} onPick={setPage} />
        <div className="relative flex min-w-0 flex-1">
          <CanvasStage zoom={zoom} selected={selected} onSelect={setSelected} />
          <FloatingDock page={page} pages={PAGES} onPage={setPage} />
        </div>
        <Inspector match="Times New Roman 11pt · 96% confidence" />
      </div>
    </div>
  );
}
