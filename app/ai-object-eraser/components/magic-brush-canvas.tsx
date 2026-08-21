"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function MagicBrushCanvas({
  imageUrl,
  brushSize,
  tool,
  onMaskChange,
  onCanUndoChange,
  onCanRedoChange,
  undoSignal,
  redoSignal,
  clearSignal,
}: {
  imageUrl: string;
  brushSize: number;
  tool: "brush" | "box" | "eraser";
  onMaskChange: (hasMask: boolean) => void;
  onCanUndoChange?: (canUndo: boolean) => void;
  onCanRedoChange?: (canRedo: boolean) => void;
  undoSignal?: number;
  redoSignal?: number;
  clearSignal?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const boxStart = useRef<{ x: number; y: number } | null>(null);

  // History stack for mask
  const history = useRef<ImageData[]>([]);
  const historyIdx = useRef<number>(-1);

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [boxPreview, setBoxPreview] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const saveHistory = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    history.current = history.current.slice(0, historyIdx.current + 1);
    history.current.push(imgData);
    historyIdx.current = history.current.length - 1;

    onCanUndoChange?.(historyIdx.current > 0);
    onCanRedoChange?.(false);
    onMaskChange(true);
  }, [onCanUndoChange, onCanRedoChange, onMaskChange]);

  const handleUndo = useCallback(() => {
    if (historyIdx.current <= 0) {
      onCanUndoChange?.(false);
      return;
    }
    historyIdx.current -= 1;
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (maskCanvas && ctx && history.current[historyIdx.current]) {
      ctx.putImageData(history.current[historyIdx.current], 0, 0);
      onCanUndoChange?.(historyIdx.current > 0);
      onCanRedoChange?.(historyIdx.current < history.current.length - 1);
      onMaskChange(historyIdx.current > 0);
    }
  }, [onCanUndoChange, onCanRedoChange, onMaskChange]);

  const handleRedo = useCallback(() => {
    if (historyIdx.current >= history.current.length - 1) return;
    historyIdx.current += 1;
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (maskCanvas && ctx && history.current[historyIdx.current]) {
      ctx.putImageData(history.current[historyIdx.current], 0, 0);
      onCanUndoChange?.(historyIdx.current > 0);
      onCanRedoChange?.(historyIdx.current < history.current.length - 1);
      onMaskChange(true);
    }
  }, [onCanUndoChange, onCanRedoChange, onMaskChange]);

  // Load image onto background canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const imgCanvas = imageCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      if (!imgCanvas || !maskCanvas) return;

      imgCanvas.width = img.width;
      imgCanvas.height = img.height;
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;

      const imgCtx = imgCanvas.getContext("2d");
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!imgCtx || !maskCtx) return;

      imgCtx.drawImage(img, 0, 0);
      maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

      // Save initial blank state in history
      history.current = [maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height)];
      historyIdx.current = 0;
      onCanUndoChange?.(false);
      onCanRedoChange?.(false);
      onMaskChange(false);
    };
    img.src = imageUrl;
  }, [imageUrl, onCanUndoChange, onCanRedoChange, onMaskChange]);

  // Handle undo/redo/clear signals from parent buttons
  useEffect(() => {
    if (undoSignal !== undefined && undoSignal > 0) handleUndo();
  }, [undoSignal, handleUndo]);

  useEffect(() => {
    if (redoSignal !== undefined && redoSignal > 0) handleRedo();
  }, [redoSignal, handleRedo]);

  useEffect(() => {
    if (clearSignal === undefined || clearSignal === 0) return;
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (maskCanvas && ctx) {
      ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      saveHistory();
      onMaskChange(false);
    }
  }, [clearSignal, saveHistory, onMaskChange]);

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return { x: 0, y: 0 };
    const rect = maskCanvas.getBoundingClientRect();
    const scaleX = maskCanvas.width / rect.width;
    const scaleY = maskCanvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawing.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const coords = getCanvasCoords(e.clientX, e.clientY);
    lastPoint.current = coords;
    boxStart.current = coords;

    if (tool === "brush" || tool === "eraser") {
      drawDot(coords.x, coords.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (!isDrawing.current) return;

    if (tool === "brush" || tool === "eraser") {
      if (lastPoint.current) {
        drawLine(lastPoint.current.x, lastPoint.current.y, coords.x, coords.y);
      }
      lastPoint.current = coords;
    } else if (tool === "box" && boxStart.current) {
      // Update live dragging box preview
      const maskCanvas = maskCanvasRef.current;
      if (maskCanvas) {
        const rect = maskCanvas.getBoundingClientRect();
        const startClientX = (boxStart.current.x / maskCanvas.width) * rect.width;
        const startClientY = (boxStart.current.y / maskCanvas.height) * rect.height;
        const currentClientX = (coords.x / maskCanvas.width) * rect.width;
        const currentClientY = (coords.y / maskCanvas.height) * rect.height;

        setBoxPreview({
          x: Math.min(startClientX, currentClientX),
          y: Math.min(startClientY, currentClientY),
          w: Math.abs(currentClientX - startClientX),
          h: Math.abs(currentClientY - startClientY),
        });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (tool === "box" && boxStart.current) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      drawBox(boxStart.current.x, boxStart.current.y, coords.x, coords.y);
      boxStart.current = null;
      setBoxPreview(null);
    }

    lastPoint.current = null;
    saveHistory();
  };

  // Apple-style translucent neon purple glow mask
  const MASK_COLOR = "rgba(168, 85, 247, 0.55)";

  const drawDot = (x: number, y: number) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = MASK_COLOR;
    }
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = MASK_COLOR;
    }
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const drawBox = (x1: number, y1: number, x2: number, y2: number) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const pad = 4;
    const rawX = Math.min(x1, x2);
    const rawY = Math.min(y1, y2);
    const rawW = Math.abs(x2 - x1);
    const rawH = Math.abs(y2 - y1);

    const x = Math.max(0, rawX - pad);
    const y = Math.max(0, rawY - pad);
    const w = Math.min(maskCanvas.width - x, rawW + pad * 2);
    const h = Math.min(maskCanvas.height - y, rawH + pad * 2);

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = MASK_COLOR;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        handlePointerDown(e);
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      onPointerOver={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      onMouseEnter={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        handlePointerUp(e);
      }}
      onPointerLeave={() => {
        if (!isDrawing.current) {
          setCursorPos(null);
          setBoxPreview(null);
        }
      }}
      onMouseLeave={() => {
        if (!isDrawing.current) {
          setCursorPos(null);
          setBoxPreview(null);
        }
      }}
      className="relative max-h-[70vh] w-fit max-w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-slate-900/50 shadow-2xl touch-none mx-auto select-none backdrop-blur-xs cursor-crosshair"
    >
      {/* Background Image Canvas */}
      <canvas ref={imageCanvasRef} className="block max-h-[70vh] w-auto max-w-full object-contain rounded-2xl" />

      {/* Foreground Mask Canvas (Translucent Purple Glow Overlay) */}
      <canvas
        ref={maskCanvasRef}
        id="mask-canvas"
        className="pointer-events-none absolute inset-0 size-full object-contain rounded-2xl"
      />

      {/* Live Dragging Box Select Outline (MS Paint / Photoshop Style) */}
      {boxPreview && (
        <div
          className="pointer-events-none absolute border-2 border-dashed border-purple-400 bg-purple-500/25 rounded-md shadow-md"
          style={{
            left: `${boxPreview.x}px`,
            top: `${boxPreview.y}px`,
            width: `${boxPreview.w}px`,
            height: `${boxPreview.h}px`,
          }}
        />
      )}

      {/* Enterprise / Photoshop Multi-Contrast Circular Brush Cursor */}
      {cursorPos && tool !== "box" && (
        <div
          className="pointer-events-none fixed z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height] duration-75 ease-out"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: `${brushSize}px`,
            height: `${brushSize}px`,
            border: tool === "eraser" ? "2px solid #f43f5e" : "2px solid #a855f7",
            boxShadow:
              "0 0 0 1.5px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(255, 255, 255, 0.85), 0 4px 12px rgba(0, 0, 0, 0.25)",
            backgroundColor:
              tool === "eraser" ? "rgba(244, 63, 94, 0.22)" : "rgba(168, 85, 247, 0.22)",
          }}
        >
          {/* Dual-contrast precision center dot (White with Black border) */}
          <div
            className="size-1.5 rounded-full pointer-events-none"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 0 0 1px #000000",
            }}
          />
        </div>
      )}
    </div>
  );
}
