"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Lock,
  Layers,
  Scissors,
  Eraser,
  RefreshCw,
  CheckCircle2,
  Terminal,
  Cpu,
  Shield,
  ArrowRight,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useTilt } from "../lib/use-tilt";

type ToolMode = "merge" | "split" | "watermark";

export function MacOSWindow() {
  const tilt = useTilt(5);
  const [activeTab, setActiveTab] = useState<ToolMode>("merge");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [execTime, setExecTime] = useState("0.034s");
  const [preserveBookmarks, setPreserveBookmarks] = useState(true);
  const [compressionMode, setCompressionMode] = useState<"lossless" | "fast">("lossless");

  const runWasmExecution = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsDone(false);

    const time = (0.024 + Math.random() * 0.016).toFixed(3) + "s";
    setExecTime(time);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 420);
  };

  return (
    <div id="demo-stage" className="mt-12 w-full max-w-5xl mx-auto">
      {/* 3D Tilt Window Wrapper */}
      <motion.div
        onPointerMove={tilt.move}
        onPointerEnter={tilt.enter}
        onPointerDown={tilt.down}
        onPointerUp={tilt.enter}
        onPointerLeave={tilt.leave}
        style={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          y: tilt.lift,
          transformPerspective: 1000,
        }}
        className="relative rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/92 backdrop-blur-[36px] shadow-[0_36px_90px_-20px_rgba(0,0,0,0.55),0_12px_32px_-10px_var(--glow),inset_0_1.5px_1px_var(--glass-hi)] overflow-hidden transition-shadow duration-300"
      >
        {/* Specular Cursor Glare Layer */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{ backgroundImage: tilt.glare, opacity: tilt.glow }}
        />

        {/* macOS Window Titlebar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
            <span className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
            <span className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />

            <div className="ml-3 hidden md:flex items-center gap-1.5 text-[11.5px] font-mono text-[var(--text-dim)]">
              <Lock className="size-3 text-emerald-400" />
              <span>sandbox://client-ram/wasm-engine.dylib</span>
            </div>
          </div>

          {/* macOS Segmented Mode Control with Fluid Pill Animation */}
          <div className="relative flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg)]/60 p-1 text-[12px]">
            <button
              onClick={() => {
                setActiveTab("merge");
                setIsDone(false);
              }}
              className={`relative z-10 flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors cursor-pointer ${
                activeTab === "merge" ? "text-[var(--text)] font-semibold" : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              {activeTab === "merge" && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-md bg-[var(--glass-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Layers className="size-3.5" />
                <span>PDF Merger</span>
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("split");
                setIsDone(false);
              }}
              className={`relative z-10 flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors cursor-pointer ${
                activeTab === "split" ? "text-[var(--text)] font-semibold" : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              {activeTab === "split" && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-md bg-[var(--glass-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Scissors className="size-3.5" />
                <span>Splitter</span>
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("watermark");
                setIsDone(false);
              }}
              className={`relative z-10 hidden sm:flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors cursor-pointer ${
                activeTab === "watermark" ? "text-[var(--text)] font-semibold" : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              {activeTab === "watermark" && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-md bg-[var(--glass-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Eraser className="size-3.5" />
                <span>Watermark</span>
              </span>
            </button>
          </div>

          {/* Right Status Pill */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              0ms RTT
            </span>
          </div>
        </div>

        {/* macOS Main Window Body Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
          {/* Left Column (7 cols): Native macOS Workspace */}
          <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* Workspace Header */}
              <div className="flex items-center justify-between text-[12px] font-medium text-[var(--text-dim)]">
                <span className="uppercase tracking-wider text-[10.5px] font-bold text-[var(--accent)]">
                  {activeTab === "merge" && "Document Queue (Local Memory)"}
                  {activeTab === "split" && "Page Extraction Buffer"}
                  {activeTab === "watermark" && "Artifact Removal Canvas"}
                </span>
                <span className="font-mono text-[11px] text-[var(--text-dim)]">2 files loaded · 2.7 MB</span>
              </div>

              {/* Native macOS File Stack Cards with subtle hover float */}
              <div className="flex flex-col gap-2.5">
                {/* File Card 1 */}
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="clay-icon grid size-9 place-items-center text-[var(--accent)]">
                      <FileText className="size-4.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[13px] font-semibold text-[var(--text)]">Financial_Q3_Statement.pdf</span>
                      <span className="text-[11px] text-[var(--text-dim)] font-mono">4 pages · 1.8 MB · Ready</span>
                    </div>
                  </div>
                  <span className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-dim)]">
                    p. 1–4
                  </span>
                </motion.div>

                {/* File Card 2 */}
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="clay-icon grid size-9 place-items-center text-[var(--accent)]">
                      <FileText className="size-4.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[13px] font-semibold text-[var(--text)]">Executive_Summary_Signed.pdf</span>
                      <span className="text-[11px] text-[var(--text-dim)] font-mono">2 pages · 0.9 MB · Ready</span>
                    </div>
                  </div>
                  <span className="rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-dim)]">
                    p. 1–2
                  </span>
                </motion.div>
              </div>

              {/* Native macOS Preference Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div
                  onClick={() => setPreserveBookmarks(!preserveBookmarks)}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)]/40 p-2.5 cursor-pointer hover:bg-[var(--bg)]/80 transition-colors"
                >
                  <span className="text-[11.5px] font-medium text-[var(--text-dim)]">Preserve Outlines</span>
                  <div
                    className={`size-4 rounded-full border transition-colors flex items-center justify-center ${
                      preserveBookmarks ? "bg-emerald-500 border-emerald-400 text-black" : "border-[var(--border)]"
                    }`}
                  >
                    {preserveBookmarks && <span className="size-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)]/40 p-1 text-[11px]">
                  <button
                    onClick={() => setCompressionMode("lossless")}
                    className={`flex-1 rounded py-1 font-medium transition-all ${
                      compressionMode === "lossless"
                        ? "bg-[var(--glass-bg)] text-[var(--text)] font-semibold shadow-sm"
                        : "text-[var(--text-dim)]"
                    }`}
                  >
                    Lossless
                  </button>
                  <button
                    onClick={() => setCompressionMode("fast")}
                    className={`flex-1 rounded py-1 font-medium transition-all ${
                      compressionMode === "fast"
                        ? "bg-[var(--glass-bg)] text-[var(--text)] font-semibold shadow-sm"
                        : "text-[var(--text-dim)]"
                    }`}
                  >
                    Fast
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 text-[11.5px] text-[var(--text-dim)]">
                <Shield className="size-3.5 text-emerald-400" />
                <span>Zero server telemetry</span>
              </div>

              <button
                onClick={runWasmExecution}
                disabled={isProcessing}
                className="clay flex h-9.5 items-center gap-2 px-5 text-[13px] font-semibold tracking-wide transition-transform active:scale-95 disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="size-3.5 animate-spin" />
                    <span>Executing in RAM...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-3.5" />
                    <span>Run Operation (⌘↵)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Cloudflare-Grade Telemetry & Execution Stream */}
          <div className="lg:col-span-5 bg-[var(--bg)]/90 p-5 sm:p-6 flex flex-col justify-between gap-4 font-mono text-left">
            <div className="flex flex-col gap-3">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 text-[11px] text-[var(--text-dim)]">
                <div className="flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-[var(--accent)]" />
                  <span className="text-[var(--text)] font-bold">WASM Telemetry</span>
                </div>
                <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[9.5px] text-[var(--text-dim)]">
                  v1.4.2
                </span>
              </div>

              {/* Real-Time Thread Logs (Cloudflare Bento Aesthetic with Animated Pulses) */}
              <div className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-[var(--text-dim)]">
                <div className="text-[var(--text)] font-semibold flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>3 background workers active</span>
                </div>
                <div className="pl-3 border-l border-[var(--border)] space-y-1">
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-[var(--text-dim)]">↳ worker-01</span>
                    <span className="text-emerald-400">xref parsing (18 obj)</span>
                  </div>
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-[var(--text-dim)]">↳ worker-02</span>
                    <span className="text-[var(--accent)]">stream byte-align</span>
                  </div>
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-[var(--text-dim)]">↳ worker-03</span>
                    <span className="text-[var(--accent-3)]">memory buffer seal</span>
                  </div>
                </div>
              </div>

              {/* Progress & Output State */}
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="proc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-3 space-y-1.5"
                  >
                    <div className="flex justify-between text-[10.5px]">
                      <span className="text-[var(--text)]">SIMD Pipeline Execution</span>
                      <span className="text-[var(--accent)]">Streaming...</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                      <motion.div
                        className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3))]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.38, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                ) : isDone ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 text-[11.5px] font-bold">
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span>Complete in {execTime}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--text-dim)]">
                      <span>Egress: 0 B</span>
                      <span>Output: Merged_Bundle.pdf</span>
                    </div>
                    <Link
                      href="/pdf-merger"
                      className="mt-1 flex items-center justify-center gap-1 rounded bg-emerald-500/20 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    >
                      <span>Open Real Tool</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </motion.div>
                ) : (
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)]/50 p-2.5 text-[10.5px] text-[var(--text-dim)] flex items-center justify-between">
                    <span>Sandboxed heap:</span>
                    <span className="text-[var(--text)] font-bold">4.2 MB RAM allocated</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Terminal Prompt Box with Live Typing Cursor */}
            <div
              onClick={runWasmExecution}
              className="group flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-2 text-[11px] cursor-pointer hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-center gap-2 text-[var(--text-dim)] group-hover:text-[var(--text)]">
                <span className="text-[var(--accent)] font-bold">&gt;</span>
                <span>wasm.execute({activeTab})</span>
                <span className="inline-block size-1.5 bg-[var(--accent)] animate-pulse" />
              </div>
              <span className="rounded bg-[var(--border)] px-1.5 py-0.5 text-[9.5px] text-[var(--text-dim)] group-hover:text-[var(--text)]">
                Click ↵
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
