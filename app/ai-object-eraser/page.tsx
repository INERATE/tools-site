"use client";

import {
  Download,
  Eraser,
  Image as ImageIcon,
  Paintbrush,
  RotateCcw,
  Sparkles,
  Square,
  Trash2,
  Undo2,
  Redo2,
  Upload,
  Split,
  Eye,
} from "lucide-react";
import { useRef, useState } from "react";
import { CompareSlider } from "./components/compare-slider";
import { MagicBrushCanvas } from "./components/magic-brush-canvas";
import { runInpainting } from "./engine/inpaint-engine";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 shadow-md shadow-indigo-500/20">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              AI Object & Watermark Eraser
              <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                Generative Inpainting
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              100% Client-Side • Runs locally in your browser with zero upload
            </p>
          </div>
        </div>

        {imageSrc && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setImageSrc(null);
                setResultSrc(null);
                setShowCompare(false);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            >
              <RotateCcw className="size-3.5" />
              New Image
            </button>
            {resultSrc && (
              <button
                onClick={() => handleDownload("png")}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:brightness-110 transition-all"
              >
                <Download className="size-3.5" />
                Download Cleaned Image
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {!imageSrc ? (
          /* Dropzone / Upload Hero */
          <div className="max-w-3xl w-full flex flex-col items-center text-center gap-8 py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-md">
                <Sparkles className="size-3.5 text-indigo-400" />
                Samsung Galaxy AI & Apple Clean Up Powered Inpainting
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Erase Any Watermark or Object <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-rose-400 bg-clip-text text-transparent">
                  In Seconds with AI Generative Fill
                </span>
              </h2>
              <p className="max-w-xl text-sm md:text-base text-slate-400">
                Brush over watermarks, photobombers, text, stamps, or logos. Our generative AI synthesizes the background textures seamlessly with zero blurry seams.
              </p>
            </div>

            {/* Dropzone Card */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files[0];
                if (f) handleFileUpload(f);
              }}
              onClick={() => fileInputRef.current?.click()}
              className="group relative w-full cursor-pointer rounded-3xl border-2 border-dashed border-slate-700 bg-slate-900/60 p-10 hover:border-indigo-500 hover:bg-slate-900/90 transition-all shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center gap-4"
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
              <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                <Upload className="size-8" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-base font-bold text-white">
                  Drop your image here, or <span className="text-indigo-400 underline underline-offset-4">browse files</span>
                </p>
                <p className="text-xs text-slate-400">Supports PNG, JPG, WEBP, HEIC up to 25MB • 100% Free & Private</p>
              </div>
            </div>

            {/* Sample Images Section */}
            <div className="w-full flex flex-col items-center gap-3">
              <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Or try a sample photo</p>
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
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-2.5 hover:border-indigo-500/50 hover:bg-slate-800 transition-all text-left group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sample.url} alt={sample.title} className="size-12 rounded-xl object-cover" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white">{sample.title}</span>
                      <span className="text-[10px] text-slate-400">{sample.subtitle}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Editor Workspace */
          <div className="w-full max-w-5xl flex flex-col items-center gap-6">
            {/* Toolbar Dock */}
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
              {/* Tool Selection */}
              <div className="flex items-center gap-1 bg-slate-800/80 rounded-xl p-1">
                <button
                  onClick={() => setTool("brush")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    tool === "brush" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Paintbrush className="size-3.5" />
                  Magic Brush
                </button>
                <button
                  onClick={() => setTool("box")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    tool === "box" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Square className="size-3.5" />
                  Box Select
                </button>
                <button
                  onClick={() => setTool("eraser")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    tool === "eraser" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Eraser className="size-3.5" />
                  Erase Mask
                </button>
              </div>

              {/* Brush Size Slider */}
              <div className="flex items-center gap-2 px-3 py-1 border-x border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400">Size: {brushSize}px</span>
                <input
                  type="range"
                  min="6"
                  max="100"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* History Controls */}
              <div className="flex items-center gap-1">
                <button
                  disabled={!canUndo}
                  onClick={() => setUndoSignal((s) => s + 1)}
                  title="Undo (Ctrl+Z)"
                  className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-40 transition-colors"
                >
                  <Undo2 className="size-4" />
                </button>
                <button
                  disabled={!canRedo}
                  onClick={() => setRedoSignal((s) => s + 1)}
                  title="Redo (Ctrl+Y)"
                  className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-40 transition-colors"
                >
                  <Redo2 className="size-4" />
                </button>
                <button
                  onClick={() => setClearSignal((s) => s + 1)}
                  title="Clear Mask"
                  className="flex size-8 items-center justify-center rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Compare Toggle (if result ready) */}
              {resultSrc && (
                <button
                  onClick={() => setShowCompare(!showCompare)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold border transition-all ${
                    showCompare
                      ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
                      : "border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white"
                  }`}
                >
                  <Split className="size-3.5" />
                  {showCompare ? "Edit Mask" : "Compare Before/After"}
                </button>
              )}

              {/* Action Button */}
              <button
                disabled={isProcessing}
                onClick={handleErase}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 px-5 py-2 text-xs font-extrabold text-white shadow-lg shadow-indigo-500/30 hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Sparkles className="size-4 animate-pulse" />
                {isProcessing ? `Erasing... ${progress}%` : "✨ Erase with Generative Fill"}
              </button>
            </div>

            {/* Canvas Stage */}
            <div className="w-full flex justify-center">
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

            {/* Helper Instructions */}
            <div className="flex items-center gap-6 text-[11.5px] text-slate-400 bg-slate-900/60 rounded-xl px-4 py-2 border border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <Paintbrush className="size-3.5 text-indigo-400" />
                Brush over the watermark or object you want to erase
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-rose-400" />
                Click <strong>Erase Object</strong> to synthesize the background seamlessly
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
