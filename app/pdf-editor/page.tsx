"use client";

import { useEffect, useRef, useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { CanvasStage } from "./components/canvas-stage";
import { EditorChrome } from "./components/editor-chrome";
import { EditorStage } from "./components/editor-stage";
import { ESignModal } from "./components/esign-modal";
import { FloatingDock } from "./components/floating-dock";
import { ImagePicker } from "./components/image-picker";
import { Inspector } from "./components/inspector";
import { OpenPanel } from "./components/open-panel";
import { PageRail } from "./components/page-rail";
import { usePdfEditor } from "./hooks/use-pdf-editor";
import type { EditorMode } from "./types";

const ACCENT = "#e11d48";

export default function PdfEditorPage() {
  const [tab, setTab] = useState("Edit");
  const [tool, setTool] = useState<EditorMode>("select");
  const [zoom, setZoom] = useState(100);
  const [demoPick, setDemoPick] = useState<string | null>("abs");
  const [signing, setSigning] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const e = usePdfEditor();
  const live = e.pages.length > 0;
  const page = e.pages[e.page];

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

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AmbientBlob />
      <EditorChrome e={e} live={live} tab={tab} onTab={setTab} tool={tool} onTool={setTool} zoom={zoom} onZoom={setZoom} />

      <div className="relative flex min-h-0 flex-1">
        <PageRail pages={live ? e.pages.length : 4} active={e.page} onPick={e.setPage} thumbs={e.pages} />

        <div className="relative flex min-w-0 flex-1">
          {live ? (
            <EditorStage e={e} zoom={zoom} tool={tool} color={ACCENT} />
          ) : (
            <CanvasStage zoom={zoom} selected={demoPick} onSelect={setDemoPick} />
          )}

          {!live && <OpenPanel onFiles={e.open} error={e.error} />}
          {signing && page && (
            <ESignModal
              onClose={() => setSigning(false)}
              onPlace={(dataUrl, ratio) => e.anno.placeSignature(e.page, dataUrl, ratio, page.width / page.height)}
            />
          )}

          <FloatingDock page={e.page} pages={live ? e.pages.length : 24} onPage={e.setPage} />
        </div>

        <Inspector
          block={e.blocks.find((b) => b.id === e.selected)}
          onFamily={e.setFamily}
          match={live ? "Click a block to see its matched font" : "Open a PDF to begin"}
          watermark={e.watermark}
          onWatermark={e.editWatermark}
          hasDoc={live}
        />
      </div>

      <ImagePicker
        ref={imageInput}
        onPick={(dataUrl) =>
          e.anno.place({ kind: "image", pageIndex: e.page, relX: 0.2, relY: 0.2, relWidth: 0.3, relHeight: 0.2, dataUrl })
        }
      />
    </div>
  );
}
