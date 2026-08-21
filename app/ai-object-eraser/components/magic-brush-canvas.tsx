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

  const saveHistory = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    // Truncate redo stack
    history.current = history.current.slice(0, historyIdx.current + 1);
    history.current.push(imgData);
    historyIdx.current = history.current.length - 1;

    onCanUndoChange?.(historyIdx.current > 0);
    onCanRedoChange?.(false);
    onMaskChange(true);
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

  // Handle undo signal
  useEffect(() => {
    if (undoSignal === undefined || historyIdx.current <= 0) return;
    historyIdx.current -= 1;
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (maskCanvas && ctx && history.current[historyIdx.current]) {
      ctx.putImageData(history.current[historyIdx.current], 0, 0);
      onCanUndoChange?.(historyIdx.current > 0);
      onCanRedoChange?.(historyIdx.current < history.current.length - 1);
      onMaskChange(historyIdx.current > 0);
    }
  }, [undoSignal, onCanUndoChange, onCanRedoChange, onMaskChange]);

  // Handle redo signal
  useEffect(() => {
    if (redoSignal === undefined || historyIdx.current >= history.current.length - 1) return;
    historyIdx.current += 1;
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (maskCanvas && ctx && history.current[historyIdx.current]) {
      ctx.putImageData(history.current[historyIdx.current], 0, 0);
      onCanUndoChange?.(historyIdx.current > 0);
      onCanRedoChange?.(historyIdx.current < history.current.length - 1);
      onMaskChange(true);
    }
  }, [redoSignal, onCanUndoChange, onCanRedoChange, onMaskChange]);

  // Handle clear signal
  useEffect(() => {
    if (clearSignal === undefined) return;
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
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (tool === "box" && boxStart.current) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      drawBox(boxStart.current.x, boxStart.current.y, coords.x, coords.y);
      boxStart.current = null;
    }

    lastPoint.current = null;
    saveHistory();
  };

  const drawDot = (x: number, y: number) => {
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(239, 68, 68, 0.65)"; // Neon coral-red mask overlay
    }
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(239, 68, 68, 0.65)";
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
    const ctx = maskCanvas?.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1);
    const h = Math.abs(y2 - y1);

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(239, 68, 68, 0.65)";
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setCursorPos(null)}
      className="relative max-h-[72vh] w-fit max-w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-xl touch-none mx-auto select-none cursor-crosshair"
    >
      {/* Background Image Canvas */}
      <canvas ref={imageCanvasRef} className="block max-h-[72vh] w-auto max-w-full object-contain" />

      {/* Foreground Mask Canvas (Red Inpainting Overlay) */}
      <canvas
        ref={maskCanvasRef}
        id="mask-canvas"
        className="pointer-events-none absolute inset-0 size-full object-contain"
      />

      {/* Floating Brush Size Cursor Indicator */}
      {cursorPos && (
        <div
          className="pointer-events-none fixed z-50 rounded-full border-2 border-red-500 bg-red-500/20 -translate-x-1/2 -translate-y-1/2 shadow-sm"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: `${brushSize}px`,
            height: `${brushSize}px`,
          }}
        />
      )}
    </div>
  );
}
