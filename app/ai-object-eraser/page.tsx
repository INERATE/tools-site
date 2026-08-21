"use client";

import {
  Download,
  Eraser,
  Paintbrush,
  RotateCcw,
  Sparkles,
  Square,
  Trash2,
  Undo2,
  Redo2,
  Upload,
  Split,
  Settings2,
} from "lucide-react";
import { useRef, useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { ToolHead } from "../components/tool-head";
import { ToolWindow } from "../components/tool-window";
import { AiObjectEraserIcon } from "../components/icons/ai-object-eraser-icon";
import { ApiSettingsModal } from "./components/api-settings-modal";
import { CompareSlider } from "./components/compare-slider";
import { MagicBrushCanvas } from "./components/magic-brush-canvas";
import { runInpainting } from "./engine/inpaint-engine";
import { runCloudInpainting } from "./engine/cloud-inpaint";

const SAMPLE_IMAGES = [
  {
    title: "Watermark Removal",
    subtitle: "Text & logo watermark on photo",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Photobomber Cleanup",
    subtitle: "Remove unwanted people & objects",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Stamp & Date Erase",
    subtitle: "Clean document & certificate stamps",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
  },
];

export default function AiObjectEraserPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resultSrc, setResultSrc] = useState<string | null>(null);
  const [tool, setTool] = useState<"brush" | "box" | "eraser">("brush");
  const [brushSize, setBrushSize] = useState<number>(32);
  const [prompt, setPrompt] = useState<string>("");
  const [provider, setProvider] = useState<"local" | "gemini" | "openai" | "stability" | "replicate">("local");
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);
  const [hasMask, setHasMask] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showCompare, setShowCompare] = useState<boolean>(false);

  // History signals
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [undoSignal, setUndoSignal] = useState(0);
  const [redoSignal, setRedoSignal] = useState(0);
  const [clearSignal, setClearSignal] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      try {
        setIsProcessing(true);
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
        const page = await doc.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (page.render as any)({ canvasContext: ctx, viewport }).promise;
          setImageSrc(canvas.toDataURL("image/png"));
          setResultSrc(null);
          setShowCompare(false);
          setHasMask(false);
        }
      } catch (e) {
        console.error("PDF render failed:", e);
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImageSrc(e.target.result);
        setResultSrc(null);
        setShowCompare(false);
        setHasMask(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleErase = async () => {
    if (!imageSrc || isProcessing) return;

    const imgCanvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    const maskCanvas = document.getElementById("mask-canvas") as HTMLCanvasElement | null;

    if (!imgCanvas || !maskCanvas) return;

    // Check if cloud generative fill is requested
    if (provider !== "local" || prompt.trim()) {
      const activeP: "gemini" | "openai" | "stability" | "replicate" = provider === "local" ? "gemini" : provider;
      const key = localStorage.getItem(`inerate_byok_${activeP}`);
      if (!key) {
        setProvider(activeP);
        setApiSettingsOpen(true);
        return;
      }

      setIsProcessing(true);
      setProgress(25);
      try {
        const cleanedUrl = await runCloudInpainting({
          provider: activeP,
          apiKey: key,
          prompt,
          imageCanvas: imgCanvas,
          maskCanvas,
        });
        setResultSrc(cleanedUrl);
        setShowCompare(true);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Cloud inpainting failed. Please check your API key.";
        alert(errorMsg);
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
      return;
    }

    // Default fast client inpainting
    setIsProcessing(true);
    setProgress(10);
    try {
      const outputCanvas = await runInpainting(imgCanvas, maskCanvas, {
        featherRadius: 3,
        onProgress: (p) => setProgress(p),
      });

      const cleanedUrl = outputCanvas.toDataURL("image/png");
      setResultSrc(cleanedUrl);
      setShowCompare(true);
    } catch (err) {
      console.error("Inpainting failed:", err);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = (format: "png" | "jpeg" | "webp") => {
    if (!resultSrc) return;
    const a = document.createElement("a");
    a.href = resultSrc;
    a.download = `inerate-cleaned-image.${format === "jpeg" ? "jpg" : format}`;
    a.click();
  };

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-36 pb-24">
        <ToolHead
          title="AI Object & Watermark Eraser"
          busy={isProcessing}
          icon={(active) => <AiObjectEraserIcon active={active} size={24} />}
          blurb="Erase watermarks, logos, text, stamps, and photobombers with AI Generative Fill. 100% private in your browser."
        />

        <ToolWindow path="ai-object-eraser">
          {!imageSrc ? (
            /* Upload / Dropzone state */
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Dropzone Card */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f) handleFileUpload(f);
                }}
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-full cursor-pointer rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--glass-lo)] p-10 hover:border-[var(--accent)] hover:bg-[var(--glass-hi)] transition-all shadow-md backdrop-blur-md flex flex-col items-center justify-center gap-3"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f);
                  }}
                />
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all shadow-xs">
                  <Upload className="size-6" />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[14.5px] font-bold text-[var(--text)]">
                    Drop your image or PDF here, or <span className="text-[var(--accent)] underline underline-offset-4">browse files</span>
                  </p>
                  <p className="text-[12px] text-[var(--text-dim)]">Supports PNG, JPG, WEBP, PDF up to 25MB • 100% Client-Side Privacy</p>
                </div>
              </div>

              {/* Sample Images Section */}
              <div className="w-full flex flex-col items-center gap-3 pt-2">
                <p className="text-[11px] font-semibold text-[var(--text-dim)] tracking-wider uppercase">Or try a sample photo</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  {SAMPLE_IMAGES.map((sample) => (
                    <button
                      key={sample.title}
                      onClick={() => {
                        setImageSrc(sample.url);
                        setResultSrc(null);
                        setShowCompare(false);
                        setHasMask(false);
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--glass-lo)] p-2.5 hover:border-[var(--accent)] hover:bg-[var(--glass-hi)] transition-all text-left group cursor-pointer shadow-xs"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sample.url} alt={sample.title} className="size-12 rounded-xl object-cover" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[var(--text)] group-hover:text-[var(--accent)]">{sample.title}</span>
                        <span className="text-[11px] text-[var(--text-dim)]">{sample.subtitle}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Canvas Workspace */
            <div className="w-full flex flex-col items-center gap-4">
              {/* Apple-style Toolbar Dock */}
              <div className="flex flex-wrap items-center justify-between gap-3 w-full rounded-2xl border border-[var(--border)] bg-[var(--glass-lo)] p-2.5 shadow-sm backdrop-blur-md">
                {/* Tools Segmented Control */}
                <div className="flex items-center gap-1 bg-[var(--glass-hi)] rounded-xl p-1 border border-[var(--border)]">
                  <button
                    onClick={() => setTool("brush")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold transition-all ${
                      tool === "brush" ? "bg-[var(--accent)] text-white shadow-xs" : "text-[var(--text-dim)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Paintbrush className="size-3.5" />
                    Magic Brush
                  </button>
                  <button
                    onClick={() => setTool("box")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold transition-all ${
                      tool === "box" ? "bg-[var(--accent)] text-white shadow-xs" : "text-[var(--text-dim)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Square className="size-3.5" />
                    Box Select
                  </button>
                  <button
                    onClick={() => setTool("eraser")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold transition-all ${
                      tool === "eraser" ? "bg-[var(--accent)] text-white shadow-xs" : "text-[var(--text-dim)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Eraser className="size-3.5" />
                    Erase Mask
                  </button>
                </div>

                {/* Brush Size Slider */}
                <div className="flex items-center gap-2 px-2">
                  <span className="text-[11.5px] font-semibold text-[var(--text-dim)]">Size: {brushSize}px</span>
                  <input
                    type="range"
                    min="6"
                    max="100"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-20 accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                {/* History & Clear */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={!canUndo}
                    onClick={() => setUndoSignal((s) => s + 1)}
                    title="Undo (Ctrl+Z)"
                    className="flex size-7 items-center justify-center rounded-lg text-[var(--text-dim)] hover:bg-[var(--glass-hi)] hover:text-[var(--text)] disabled:opacity-40 transition-colors"
                  >
                    <Undo2 className="size-3.5" />
                  </button>
                  <button
                    disabled={!canRedo}
                    onClick={() => setRedoSignal((s) => s + 1)}
                    title="Redo (Ctrl+Y)"
                    className="flex size-7 items-center justify-center rounded-lg text-[var(--text-dim)] hover:bg-[var(--glass-hi)] hover:text-[var(--text)] disabled:opacity-40 transition-colors"
                  >
                    <Redo2 className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setClearSignal((s) => s + 1)}
                    title="Clear Mask"
                    className="flex size-7 items-center justify-center rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                {/* Engine Switcher */}
                <button
                  onClick={() => setApiSettingsOpen(true)}
                  title="AI Engine & API Settings"
                  className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--glass-lo)] px-3 py-1.5 text-[11.5px] font-bold text-[var(--text)] hover:border-[var(--accent)] transition-all cursor-pointer"
                >
                  <Settings2 className="size-3.5 text-[var(--accent)]" />
                  <span className="capitalize">{provider === "local" ? "⚡ Fast AI" : `🌟 ${provider}`}</span>
                </button>

                {/* Actions Group */}
                <div className="flex items-center gap-2">
                  {resultSrc && (
                    <button
                      onClick={() => setShowCompare(!showCompare)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold border transition-all ${
                        showCompare
                          ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                          : "border-[var(--border)] bg-[var(--glass-lo)] text-[var(--text)] hover:text-white"
                      }`}
                    >
                      <Split className="size-3.5" />
                      {showCompare ? "Edit Mask" : "Compare"}
                    </button>
                  )}

                  <button
                    disabled={isProcessing}
                    onClick={handleErase}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 px-4 py-1.5 text-[12px] font-extrabold text-white shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Sparkles className="size-3.5 animate-pulse" />
                    {isProcessing ? `Erasing... ${progress}%` : prompt.trim() ? "✨ Generate" : "✨ Erase with Generative Fill"}
                  </button>
                </div>
              </div>

              {/* Prompt Input Field */}
              <div className="flex items-center gap-2 w-full rounded-xl border border-[var(--border)] bg-[var(--glass-lo)] px-3.5 py-2">
                <Sparkles className="size-3.5 text-[var(--accent)] shrink-0" />
                <input
                  type="text"
                  placeholder="Optional: Type what to replace (e.g. 'clean beach sand', 'vintage wooden table', 'add sunglasses')..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-transparent text-[12.5px] text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none w-full"
                />
              </div>

              {/* Canvas Viewport */}
              <div className="w-full flex justify-center py-2">
                {showCompare && resultSrc ? (
                  <CompareSlider beforeUrl={imageSrc} afterUrl={resultSrc} />
                ) : (
                  <MagicBrushCanvas
                    imageUrl={resultSrc || imageSrc}
                    brushSize={brushSize}
                    tool={tool}
                    onMaskChange={setHasMask}
                    onCanUndoChange={setCanUndo}
                    onCanRedoChange={setCanRedo}
                    undoSignal={undoSignal}
                    redoSignal={redoSignal}
                    clearSignal={clearSignal}
                  />
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between w-full pt-2">
                <button
                  onClick={() => {
                    setImageSrc(null);
                    setResultSrc(null);
                    setShowCompare(false);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--glass-lo)] px-3 py-1.5 text-[12px] font-semibold text-[var(--text-dim)] hover:text-[var(--text)] transition-all cursor-pointer"
                >
                  <RotateCcw className="size-3.5" />
                  Upload New Image
                </button>

                {resultSrc && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload("png")}
                      className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2 text-[12px] font-bold text-white shadow-md hover:brightness-110 transition-all cursor-pointer"
                    >
                      <Download className="size-3.5" />
                      Download PNG
                    </button>
                    <button
                      onClick={() => handleDownload("jpeg")}
                      className="rounded-xl border border-[var(--border)] bg-[var(--glass-lo)] px-3 py-2 text-[12px] font-semibold text-[var(--text)] hover:bg-[var(--glass-hi)] transition-all cursor-pointer"
                    >
                      JPG
                    </button>
                    <button
                      onClick={() => handleDownload("webp")}
                      className="rounded-xl border border-[var(--border)] bg-[var(--glass-lo)] px-3 py-2 text-[12px] font-semibold text-[var(--text)] hover:bg-[var(--glass-hi)] transition-all cursor-pointer"
                    >
                      WEBP
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </ToolWindow>
      </main>

      <ApiSettingsModal
        isOpen={apiSettingsOpen}
        onClose={() => setApiSettingsOpen(false)}
        activeProvider={provider}
        onSelectProvider={setProvider}
      />
    </div>
  );
}
