"use client";

import { useState } from "react";
import { X, Paintbrush, Square, Eraser, Undo2, Redo2, Trash2, Check, Sparkles, Settings2 } from "lucide-react";
import { AiObjectEraserIcon } from "../../../components/icons/ai-object-eraser-icon";
import { MagicBrushCanvas } from "../../../ai-object-eraser/components/magic-brush-canvas";
import { ApiSettingsModal, type AIProvider } from "../../../ai-object-eraser/components/api-settings-modal";
import { runInpainting } from "../../../ai-object-eraser/engine/inpaint-engine";
import { runCloudInpainting } from "../../../ai-object-eraser/engine/cloud-inpaint";

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
  const [prompt, setPrompt] = useState<string>("");
  const [provider, setProvider] = useState<AIProvider>("local");
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);
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

    // 1. Cloudflare Workers AI Inpainting
    if (provider === "cloudflare") {
      setIsProcessing(true);
      setProgress(25);
      try {
        const output = await runCloudInpainting({
          provider: "cloudflare",
          prompt,
          imageCanvas: imgCanvas,
          maskCanvas,
        });
        setCleanedUrl(output);
        setIsProcessing(false);
        setProgress(0);
        return;
      } catch (err) {
        console.warn("Cloudflare AI busy, auto-falling back to Fast Client inpainting:", err);
      }
    }

    // 2. BYOK Studio Generative Fill (Google Gemini, OpenAI, Stability, Replicate)
    if (provider !== "local" || prompt.trim()) {
      const activeP = provider === "local" ? "gemini" : provider;
      const key = localStorage.getItem(`inerate_byok_${activeP}`);
      if (!key) {
        setProvider(activeP);
        setApiSettingsOpen(true);
        return;
      }

      setIsProcessing(true);
      setProgress(25);
      try {
        const output = await runCloudInpainting({
          provider: activeP,
          apiKey: key,
          prompt,
          imageCanvas: imgCanvas,
          maskCanvas,
        });
        setCleanedUrl(output);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Cloud inpainting failed. Please check your API key.";
        alert(errorMsg);
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
      return;
    }

    // 3. Fast Client Inpainting (Default)
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
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md">
        <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-slate-200/90 bg-white/95 shadow-2xl overflow-hidden text-slate-800 backdrop-blur-2xl">
          {/* Apple-style Light Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4 bg-white/60">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-2xs">
                <AiObjectEraserIcon active={true} size={22} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  AI Watermark & Object Eraser (Page {pageIndex + 1})
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                    Generative Fill
                  </span>
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Brush over any printed watermark, logo, or stamp to erase it with seamless AI generative inpainting
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Apple Segmented Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50/70 px-6 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-slate-200 shadow-2xs">
                <button
                  onClick={() => setTool("brush")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    tool === "brush" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Paintbrush className="size-3.5" />
                  Magic Brush
                </button>
                <button
                  onClick={() => setTool("box")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    tool === "box" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Square className="size-3.5" />
                  Box Select
                </button>
                <button
                  onClick={() => setTool("eraser")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    tool === "eraser" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Eraser className="size-3.5" />
                  Erase Mask
                </button>
              </div>

              {/* Brush Size */}
              <div className="flex items-center gap-2 px-3 border-l border-slate-200">
                <span className="text-[11.5px] font-semibold text-slate-600">Size: {brushSize}px</span>
                <input
                  type="range"
                  min="6"
                  max="80"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* History Controls */}
              <div className="flex items-center gap-1">
                <button
                  disabled={!canUndo}
                  onClick={() => setUndoSignal((s) => s + 1)}
                  title="Undo (Ctrl+Z)"
                  className="flex size-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Undo2 className="size-3.5" />
                </button>
                <button
                  disabled={!canRedo}
                  onClick={() => setRedoSignal((s) => s + 1)}
                  title="Redo (Ctrl+Y)"
                  className="flex size-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 disabled:opacity-30 cursor-pointer transition-colors"
                >
                  <Redo2 className="size-3.5" />
                </button>
                <button
                  onClick={() => setClearSignal((s) => s + 1)}
                  title="Clear Mask"
                  className="flex size-7 items-center justify-center rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>

            {/* AI Engine & Action Button Group */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setApiSettingsOpen(true)}
                title="Select AI Model"
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all cursor-pointer shadow-2xs"
              >
                <Settings2 className="size-3.5 text-indigo-600" />
                <span className="capitalize">{provider === "local" ? "⚡ Fast AI" : `🌟 ${provider}`}</span>
              </button>

              <button
                disabled={isProcessing}
                onClick={handleErase}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Sparkles className="size-3.5 animate-pulse" />
                {isProcessing ? `Erasing... ${progress}%` : "✨ Erase with Generative Fill"}
              </button>
            </div>
          </div>

          {/* Optional Prompt Conditioning Input */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white px-6 py-2">
            <Sparkles className="size-3.5 text-indigo-500 shrink-0" />
            <input
              type="text"
              placeholder="Optional: Type replacement prompt (e.g. 'clean white paper', 'remove signature without texture loss')..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-none w-full font-medium"
            />
          </div>

          {/* Canvas Body with Light Frosted Backdrop */}
          <div id="modal-canvas-wrap" className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100/60">
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

          {/* Apple-style Light Footer */}
          <div className="flex items-center justify-between border-t border-slate-200/80 px-6 py-3.5 bg-white/80">
            <p className="text-[12px] text-slate-600 font-medium">
              {cleanedUrl ? "✨ Watermark erased! Click 'Apply to PDF' to update this page." : "Brush over any watermark or stamp, then click 'Erase with Generative Fill'"}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
              >
                Cancel
              </button>
              {cleanedUrl && (
                <button
                  onClick={handleApply}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all cursor-pointer"
                >
                  <Check className="size-3.5" />
                  Apply to PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ApiSettingsModal
        isOpen={apiSettingsOpen}
        onClose={() => setApiSettingsOpen(false)}
        activeProvider={provider}
        onSelectProvider={(p) => setProvider(p)}
      />
    </>
  );
}
