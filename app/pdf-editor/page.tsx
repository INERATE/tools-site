"use client";

import { useEffect, useRef, useState } from "react";
import { AiDrawer } from "./components/ai-drawer";
import { CanvasStage } from "./components/canvas-stage";
import { DocumentSearchBar } from "./components/document-search-bar";
import { EditorChrome } from "./components/editor-chrome";
import { EditorStage } from "./components/editor-stage";
import { FloatingDock } from "./components/floating-dock";
import { ImagePicker } from "./components/image-picker";
import { Inspector } from "./components/inspector";
import { PageGridModal } from "./components/page-grid-modal";
import { PageRail } from "./components/page-rail";
import { StageOverlays } from "./components/stage-overlays";
import { usePdfEditor } from "./hooks/use-pdf-editor";
import { ACCENT, EDITOR_THEME } from "./editor-theme";
import type { EditorMode } from "./types";


export default function PdfEditorPage() {
  const [tab, setTab] = useState("Edit");
  const [tool, setTool] = useState<EditorMode>("select");
  const [zoom, setZoom] = useState(100);
  const [demoPick, setDemoPick] = useState<string | null>("abs");
  const [signing, setSigning] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const e = usePdfEditor();
  const live = e.pages.length > 0;

  // eSign and Image are one-shot actions, not drag modes — open the flow and
  // drop back to Select rather than leaving the ribbon stuck on a dead tool.
  useEffect(() => {
    if (!live) return;
    if (tool === "esign") {
      setSigning(true);
      setTool("select");
    } else if (tool === "image") {
      imageInput.current?.click();
      setTool("select");
    }
  }, [tool, live]);

  const handlePageSelect = (pageIndex: number) => {
    e.setPage(pageIndex);
    const targetEl = document.getElementById(`pdf-page-${pageIndex}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectSearchBlock = (id: string, pageIndex: number) => {
    handlePageSelect(pageIndex);
    e.setSelected(id);
  };

  const handleFit = () => {
    if (!live || !e.pages[e.page]) {
      setZoom((z) => (z === 100 ? 135 : 100));
      return;
    }
    const curPage = e.pages[e.page];
    const stageEl = document.querySelector("main");
    if (stageEl && curPage.width > 0) {
      const availWidth = stageEl.clientWidth - 64;
      const idealZoom = Math.round((availWidth / curPage.width) * 100);
      setZoom((z) => (Math.abs(z - idealZoom) < 5 ? 100 : Math.max(60, Math.min(200, idealZoom))));
    } else {
      setZoom((z) => (z === 100 ? 135 : 100));
    }
  };

  return (
    <div
      data-lenis-prevent
      className="flex h-screen flex-col overflow-hidden bg-[#f3f4f8] text-[#1e293b]"
      style={EDITOR_THEME}
    >
      <EditorChrome
        e={e}
        live={live}
        tab={tab}
        onTab={setTab}
        tool={tool}
        onTool={setTool}
        zoom={zoom}
        onZoom={setZoom}
        onToggleSearch={() => setSearchOpen((prev) => !prev)}
        onToggleGrid={() => setGridOpen((prev) => !prev)}
        onRotatePage={() => e.pageOps.rotatePage(e.page)}
        onDeletePage={() => e.pageOps.toggleDeleted(e.page)}
        onOpenWatermark={() => e.editWatermark({ enabled: true })}
      />

      <div className="relative flex min-h-0 flex-1">
        <PageRail
          pages={live ? e.pages.length : 4}
          active={e.page}
          onPick={handlePageSelect}
          thumbs={e.pages}
          opFor={e.pageOps.opFor}
          onRotate={e.pageOps.rotatePage}
          onToggleDelete={e.pageOps.toggleDeleted}
          deleted={e.pageOps.deletedCount}
          bookmarks={e.bookmarks}
          annotations={e.anno.items}
          picked={e.anno.picked}
          onPickAnno={(id) => {
            e.anno.setPicked(id);
            const found = e.anno.items.find((a) => a.id === id);
            if (found) e.setPage(found.pageIndex);
          }}
          onRemoveAnno={e.anno.remove}
        />

        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          {searchOpen && (
            <DocumentSearchBar
              blocks={e.blocks}
              onSelectBlock={handleSelectSearchBlock}
              onClose={() => setSearchOpen(false)}
            />
          )}

          {live ? (
            <EditorStage e={e} zoom={zoom} tool={tool} color={ACCENT} onPageInView={e.setPage} />
          ) : (
            <CanvasStage zoom={zoom} selected={demoPick} onSelect={setDemoPick} onPageInView={e.setPage} tool={tool} />
          )}

          <StageOverlays
            e={e}
            live={live}
            tool={tool}
            onTool={setTool}
            signing={signing}
            onCloseSign={() => setSigning(false)}
          />

          <FloatingDock
            page={e.page}
            pages={live ? e.pages.length : 4}
            onPage={handlePageSelect}
            tool={tool}
            onTool={setTool}
            onToggleGrid={() => setGridOpen(true)}
            onFit={handleFit}
          />
        </div>

        {aiOpen && (
          <AiDrawer
            text={e.blocks.map((b) => b.text).join("\n")}
            onClose={() => setAiOpen(false)}
          />
        )}

        <Inspector
          block={e.blocks.find((b) => b.id === e.selected)}
          annotation={e.anno.items.find((a) => a.id === e.anno.picked)}
          onFamily={e.setFamily}
          onFormat={e.updateFormat}
          onUpdateAnnotation={e.anno.update}
          onRemoveAnnotation={e.anno.remove}
          match={live ? "Click a block to see its matched font" : "Open a PDF to begin"}
          watermark={e.watermark}
          onWatermark={e.editWatermark}
          hasDoc={live}
          onRotatePage={() => e.pageOps.rotatePage(e.page)}
          onDeletePage={() => e.pageOps.toggleDeleted(e.page)}
          onToolSelect={(t) => setTool(t as EditorMode)}
          onOpenAi={() => setAiOpen(true)}
        />
      </div>

      {gridOpen && (
        <PageGridModal
          pages={live ? e.pages.length : 4}
          active={e.page}
          thumbs={e.pages}
          onSelect={handlePageSelect}
          onClose={() => setGridOpen(false)}
        />
      )}

      <ImagePicker
        ref={imageInput}
        onPick={(dataUrl) =>
          e.anno.place({ kind: "image", pageIndex: e.page, relX: 0.2, relY: 0.2, relWidth: 0.3, relHeight: 0.2, dataUrl })
        }
      />
    </div>
  );
}
