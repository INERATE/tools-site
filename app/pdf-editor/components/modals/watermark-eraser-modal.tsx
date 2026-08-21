"use client";

import { useState, useRef } from "react";
import { Sparkles, X, Paintbrush, Square, Eraser, Undo2, Redo2, Trash2, Check } from "lucide-react";
import { MagicBrushCanvas } from "../../../ai-object-eraser/components/magic-brush-canvas";
import { runInpainting } from "../../../ai-object-eraser/engine/inpaint-engine";

export function WatermarkEraserModal({
  pageUrl,
  pageIndex,
  onClose,
  onApplyCleanedPage,
}: {
  pageUrl: string;
  pageIndex: number;
  onClose: () => void;
  onApplyCleanedPage: (pageIndex: number, cleanedUrl: string) => void;
}) {
  const [tool, setTool] = useState<"brush" | "box" | "eraser">("brush");
  const [brushSize, setBrushSize] = useState<number>(32);
  const [hasMask, setHasMask] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);

  // History signals
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [undoSignal, setUndoSignal] = useState(0);
  const [redoSignal, setRedoSignal] = useState(0);
  const [clearSignal, setClearSignal] = useState(0);

  const handleErase = async () => {
    const imgCanvas = document.querySelector("#modal-canvas-wrap canvas") as HTMLCanvasElement | null;
    const maskCanvas = document.querySelector("#modal-canvas-wrap #mask-canvas") as HTMLCanvasElement | null;

    if (!imgCanvas || !maskCanvas) return;

    setIsProcessing(true);
    setProgress(15);

    try {
      const outputCanvas = await runInpainting(imgCanvas, maskCanvas, {
        featherRadius: 3,
        onProgress: (p) => setProgress(p),
      });

      const url = outputCanvas.toDataURL("image/png");
      setCleanedUrl(url);
    } catch (err) {
      console.error("Watermark inpainting failed:", err);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleApply = () => {
    if (cleanedUrl) {
      onApplyCleanedPage(pageIndex, cleanedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 shadow-md">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                AI Watermark & Object Eraser (Page {pageIndex + 1})
                <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  Generative Fill
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Brush over any printed watermark, logo, or stamp to erase it with generative fill
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/60 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-800/80 rounded-xl p-1">
              <button
                onClick={() => setTool("brush")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  tool === "brush" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Paintbrush className="size-3.5" />
                Magic Brush
              </button>
              <button
                onClick={() => setTool("box")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  tool === "box" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Square className="size-3.5" />
                Box Select
              </button>
              <button
                onClick={() => setTool("eraser")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  tool === "eraser" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Eraser className="size-3.5" />
                Erase Mask
              </button>
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-2 px-2 border-l border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400">Size: {brushSize}px</span>
              <input
                type="range"
                min="6"
                max="80"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20 accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* History */}
            <div className="flex items-center gap-1">
              <button
                disabled={!canUndo}
                onClick={() => setUndoSignal((s) => s + 1)}
                className="flex size-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-40"
              >
                <Undo2 className="size-3.5" />
              </button>
              <button
                disabled={!canRedo}
                onClick={() => setRedoSignal((s) => s + 1)}
                className="flex size-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-40"
              >
                <Redo2 className="size-3.5" />
              </button>
              <button
                onClick={() => setClearSignal((s) => s + 1)}
                className="flex size-7 items-center justify-center rounded-lg text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            disabled={isProcessing}
            onClick={handleErase}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Sparkles className="size-3.5 animate-pulse" />
            {isProcessing ? `Erasing... ${progress}%` : "✨ Erase with Generative Fill"}
          </button>
        </div>

        {/* Canvas Body */}
        <div id="modal-canvas-wrap" className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
          <MagicBrushCanvas
            imageUrl={cleanedUrl || pageUrl}
            brushSize={brushSize}
            tool={tool}
            onMaskChange={setHasMask}
            onCanUndoChange={setCanUndo}
            onCanRedoChange={setCanRedo}
            undoSignal={undoSignal}
            redoSignal={redoSignal}
            clearSignal={clearSignal}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-3 bg-slate-900/90">
          <p className="text-[11.5px] text-slate-400">
            {cleanedUrl ? "✨ Watermark erased! Click 'Apply to PDF' to save." : "Brush over the watermark and click 'Erase with Generative Fill'"}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            {cleanedUrl && (
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500"
              >
                <Check className="size-3.5" />
                Apply to PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
