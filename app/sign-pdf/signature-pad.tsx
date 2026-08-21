"use client";

import { Check, Eraser, Image as ImageIcon, PenLine, Sparkles, Type, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { processSignatureImage } from "../lib/signature-image-processor";
import { trimCanvas } from "../lib/trim-canvas";

type Tab = "draw" | "type" | "upload";

const COLORS = [
  { id: "black", hex: "#111827", label: "Black" },
  { id: "blue", hex: "#1d4ed8", label: "Blue" },
  { id: "red", hex: "#b91c1c", label: "Red" },
];

const FONTS = [
  { id: "cursive-1", name: "Caveat", style: "cursive", family: "'Caveat', cursive" },
  { id: "cursive-2", name: "Dancing Script", style: "cursive", family: "'Dancing Script', cursive" },
  { id: "cursive-3", name: "Great Vibes", style: "cursive", family: "'Great Vibes', cursive" },
  { id: "cursive-4", name: "Sacramento", style: "cursive", family: "'Sacramento', cursive" },
];

export function SignaturePad({
  onChange,
}: {
  onChange: (sig: { url: string; w: number; h: number } | null) => void;
}) {
  const [tab, setTab] = useState<Tab>("draw");
  const [inkColor, setInkColor] = useState("#111827");
  const [empty, setEmpty] = useState(true);

  // Draw mode state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  // Type mode state
  const [typedText, setTypedText] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  // Upload mode state
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<{ url: string; w: number; h: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Point in canvas
  function point(e: React.PointerEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function start(e: React.PointerEvent) {
    drawing.current = true;
    setEmpty(false);
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = point(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = inkColor;
    const { x, y } = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    if (canvasRef.current) {
      const trimmed = trimCanvas(canvasRef.current);
      onChange(trimmed);
    }
  }

  function clearDraw() {
    const canvas = canvasRef.current!;
    if (canvas) {
      canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
      setEmpty(true);
      onChange(null);
    }
  }

  // Type signature render generator
  const renderTypedSignature = (text: string, font: (typeof FONTS)[0], color: string) => {
    if (!text.trim()) {
      onChange(null);
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = `64px ${font.family}, cursive, sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, 300, 80);

    const trimmed = trimCanvas(canvas);
    onChange(trimmed);
  };

  useEffect(() => {
    if (tab === "type") {
      renderTypedSignature(typedText, selectedFont, inkColor);
    }
  }, [typedText, selectedFont, inkColor, tab]);

  // Handle image upload with AI paper background removal
  async function handleFileUpload(file: File) {
    setUploadBusy(true);
    try {
      const result = await processSignatureImage(file, inkColor === "#1d4ed8" ? "blue" : "black");
      if (result) {
        setUploadPreview(result);
        onChange(result);
      }
    } catch {
      // ignore
    } finally {
      setUploadBusy(false);
    }
  }

  return (
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Tab Switcher & Colors */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-1 rounded-xl bg-slate-100/80 p-1">
          <button
            type="button"
            onClick={() => {
              setTab("draw");
              if (!empty && canvasRef.current) onChange(trimCanvas(canvasRef.current));
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
              tab === "draw"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <PenLine className="size-3.5" />
            Draw
          </button>
          <button
            type="button"
            onClick={() => setTab("type")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
              tab === "type"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Type className="size-3.5" />
            Type
          </button>
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
              tab === "upload"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Upload className="size-3.5" />
            Upload Photo
          </button>
        </div>

        {/* Ink Colors */}
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setInkColor(c.hex)}
              title={`${c.label} ink`}
              className={`grid size-6 place-items-center rounded-full transition-transform ${
                inkColor === c.hex ? "scale-110 ring-2 ring-indigo-500 ring-offset-2" : "hover:scale-105"
              }`}
              style={{ background: c.hex }}
            >
              {inkColor === c.hex && <Check className="size-3 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* DRAW TAB */}
      {tab === "draw" && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Sign with mouse, trackpad, or pen:</span>
            {!empty && (
              <button
                type="button"
                onClick={clearDraw}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-600"
              >
                <Eraser className="size-3" /> Clear
              </button>
            )}
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={160}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
            className="h-[120px] w-full touch-none cursor-crosshair rounded-xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          />
        </div>
      )}

      {/* TYPE TAB */}
      {tab === "type" && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Type your name or initials"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FONTS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFont(f)}
                className={`flex h-14 items-center justify-center rounded-xl border p-2 text-center text-[18px] transition-all ${
                  selectedFont.id === f.id
                    ? "border-indigo-500 bg-indigo-50/30 text-indigo-900 ring-2 ring-indigo-200"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
                style={{ fontFamily: f.family, color: inkColor }}
              >
                {typedText.trim() || f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* UPLOAD PHOTO TAB */}
      {tab === "upload" && (
        <div className="flex flex-col gap-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center transition-colors hover:border-indigo-400 hover:bg-indigo-50/30"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f);
              }}
            />
            <div className="grid size-10 place-items-center rounded-full bg-indigo-50 text-indigo-600 shadow-2xs">
              <Sparkles className="size-5" />
            </div>
            <p className="mt-2 text-[13px] font-semibold text-slate-800">
              Upload signature from notebook or paper
            </p>
            <p className="mt-1 max-w-sm text-[11px] text-slate-500">
              Our smart engine automatically removes the paper background, extracts clean ink, and auto-crops the margins.
            </p>
          </div>

          {uploadBusy && (
            <div className="flex items-center justify-center gap-2 py-2 text-[12px] font-medium text-indigo-600">
              <span className="size-2 rounded-full bg-indigo-600 animate-ping" />
              Removing background and cropping signature…
            </div>
          )}

          {uploadPreview && (
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-white border border-slate-200 shadow-2xs p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={uploadPreview.url} alt="Extracted signature" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-slate-800">Clean Transparent Signature</p>
                  <p className="text-[10px] text-emerald-600">Background removed & auto-cropped</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-slate-700 hover:bg-slate-100"
              >
                Change
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
