"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  Scissors, 
  Zap, 
  PenTool, 
  FileText, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

type Mode = "merge" | "split" | "compress" | "sign";

const MODES = [
  { id: "merge" as Mode, label: "Merge Flow", icon: Layers, color: "var(--accent)" },
  { id: "split" as Mode, label: "Laser Split", icon: Scissors, color: "var(--accent-2)" },
  { id: "compress" as Mode, label: "Smart Compress", icon: Zap, color: "#10B981" },
  { id: "sign" as Mode, label: "Vector Seal", icon: PenTool, color: "#F59E0B" },
];

export function InteractiveCenterpiece() {
  const [mode, setMode] = useState<Mode>("merge");
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-cycle through the 4 modes if user hasn't manually taken over
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setMode((current) => {
        const nextIdx = (MODES.findIndex((m) => m.id === current) + 1) % MODES.length;
        return MODES[nextIdx].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Interactive Mode Pills */}
      <div className="relative z-20 mb-6 flex flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/70 p-1.5 backdrop-blur-xl shadow-lg">
        {MODES.map((m) => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setAutoPlay(false);
              }}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                active 
                  ? "text-[var(--on-accent)] shadow-md" 
                  : "text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--glass-hi)]/30"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon className="relative z-10 size-4" />
              <span className="relative z-10">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Glass Visual Stage */}
      <div className="relative h-[340px] sm:h-[380px] w-full max-w-xl flex items-center justify-center overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--glass-hi)]/40 to-transparent p-6 shadow-2xl backdrop-blur-2xl">
        {/* Ambient colored spotlight changing with mode */}
        <motion.div
          key={`ambient-${mode}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          aria-hidden
          className="pointer-events-none absolute -inset-10 z-0 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)`,
          }}
        />

        {/* Decorative Grid Lines */}
        <div 
          aria-hidden 
          className="pointer-events-none absolute inset-0 z-0 opacity-15"
          style={{
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <AnimatePresence mode="wait">
          {mode === "merge" && <MergeAnimation key="merge" />}
          {mode === "split" && <SplitAnimation key="split" />}
          {mode === "compress" && <CompressAnimation key="compress" />}
          {mode === "sign" && <SignAnimation key="sign" />}
        </AnimatePresence>
      </div>

      {/* Interactive Helper Footer */}
      <div className="mt-4 flex items-center gap-2 text-[11.5px] font-medium text-[var(--text-dim)]">
        <Sparkles className="size-3.5 text-[var(--accent)]" />
        <span>100% In-Browser Animation Engine · Client-Side WASM</span>
      </div>
    </div>
  );
}

/** 1. Merge 3D Flow Animation */
function MergeAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 flex h-full w-full flex-col items-center justify-between"
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[var(--text-dim)] uppercase">
          <Layers className="size-3 text-[var(--accent)]" /> Multi-Document Array
        </span>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
          3 ➔ 1 Unified File
        </span>
      </div>

      {/* Floating 3D Documents */}
      <div className="relative flex h-48 w-full items-center justify-center">
        {/* Doc 1 */}
        <motion.div
          animate={{
            x: [-60, -45, -60],
            y: [-10, 5, -10],
            rotate: [-12, -8, -12],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-10 flex h-36 w-28 flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/95 p-3.5 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <FileText className="size-4 text-[var(--accent)]" />
            <span className="font-mono text-[9px] font-bold text-[var(--text-dim)]">Doc_A.pdf</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-3/5 rounded-full bg-[var(--accent)]/30" />
          </div>
          <span className="text-[9px] font-semibold text-[var(--accent)]">4 Pages</span>
        </motion.div>

        {/* Center Master Merged Result */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            y: [0, -8, 0],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-30 flex h-44 w-36 flex-col justify-between rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-raised)] p-4 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-[var(--accent)]" />
              <span className="text-[10.5px] font-extrabold text-[var(--text)]">Final_Doc.pdf</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-[var(--accent)]/20" />
            <div className="h-2 w-5/6 rounded-full bg-[var(--border)]" />
            <div className="h-2 w-4/6 rounded-full bg-[var(--border)]" />
            <div className="h-2 w-full rounded-full bg-[var(--border)]" />
          </div>

          <div className="flex items-center justify-between border-t border-[var(--border)] pt-2 text-[9px] font-bold text-emerald-400">
            <span>Merged Instantly</span>
            <span>12 Pages</span>
          </div>
        </motion.div>

        {/* Doc 2 */}
        <motion.div
          animate={{
            x: [60, 45, 60],
            y: [10, -5, 10],
            rotate: [12, 8, 12],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute z-10 flex h-36 w-28 flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/95 p-3.5 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <FileText className="size-4 text-[var(--accent-2)]" />
            <span className="font-mono text-[9px] font-bold text-[var(--text-dim)]">Doc_B.pdf</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[var(--accent-2)]/30" />
          </div>
          <span className="text-[9px] font-semibold text-[var(--accent-2)]">8 Pages</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-2 text-[11px] font-medium text-[var(--text)]">
        <CheckCircle2 className="size-3.5 text-emerald-400" />
        <span>Drag & drop reordering preserved in local memory</span>
      </div>
    </motion.div>
  );
}

/** 2. Split Laser Animation */
function SplitAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 flex h-full w-full flex-col items-center justify-between"
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[var(--text-dim)] uppercase">
          <Scissors className="size-3 text-[var(--accent-2)]" /> Precision Range Slicing
        </span>
        <span className="rounded-full border border-[var(--accent-2)]/30 bg-[var(--accent-2)]/15 px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent-2)]">
          Laser Partition
        </span>
      </div>

      {/* Splitting Document Showcase */}
      <div className="relative flex h-48 w-full items-center justify-center gap-4">
        {/* Left Half */}
        <motion.div
          animate={{ x: [-12, -22, -12], rotate: [-2, -5, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-40 w-36 flex-col justify-between rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-raised)]/95 p-3.5 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--accent)]">Part 1</span>
            <span className="rounded bg-[var(--accent)]/15 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-[var(--accent)]">
              p. 1–4
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-5/6 rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/6 rounded-full bg-[var(--accent)]/40" />
          </div>
          <span className="text-[9.5px] font-semibold text-[var(--text)]">Executive Summary</span>
        </motion.div>

        {/* Laser Cut Beam */}
        <div className="relative flex h-44 flex-col items-center justify-center">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.9, 1.05, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-0.5 bg-gradient-to-b from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.8)]"
          />
          <div className="absolute grid size-7 place-items-center rounded-full bg-red-500 text-white shadow-lg">
            <Scissors className="size-3.5" />
          </div>
        </div>

        {/* Right Half */}
        <motion.div
          animate={{ x: [12, 22, 12], rotate: [2, 5, 2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-40 w-36 flex-col justify-between rounded-2xl border-2 border-[var(--accent-2)] bg-[var(--bg-raised)]/95 p-3.5 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--accent-2)]">Part 2</span>
            <span className="rounded bg-[var(--accent-2)]/15 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-[var(--accent-2)]">
              p. 5–12
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/6 rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-5/6 rounded-full bg-[var(--accent-2)]/40" />
          </div>
          <span className="text-[9.5px] font-semibold text-[var(--text)]">Financial Appendix</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-2 text-[11px] font-medium text-[var(--text)]">
        <Sparkles className="size-3.5 text-[var(--accent-2)]" />
        <span>Extract custom page ranges or split into single sheets</span>
      </div>
    </motion.div>
  );
}

/** 3. Smart Compress Gauge Animation */
function CompressAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 flex h-full w-full flex-col items-center justify-between"
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[var(--text-dim)] uppercase">
          <Zap className="size-3 text-emerald-400" /> Lossless Optimization
        </span>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
          -93% File Size
        </span>
      </div>

      {/* Live Before / After Size Dial */}
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4 py-2">
        <div className="grid w-full grid-cols-2 gap-4">
          {/* Before */}
          <div className="flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/70 p-3.5">
            <span className="text-[9.5px] font-bold text-[var(--text-dim)] uppercase">Original Scan</span>
            <span className="mt-1 text-[22px] font-black text-[var(--text-dim)] line-through decoration-red-500/80">
              18.4 MB
            </span>
            <span className="text-[9px] text-[var(--text-dim)]">Raw heavy bitmap</span>
          </div>

          {/* After */}
          <div className="flex flex-col items-center rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 p-3.5 shadow-lg">
            <span className="text-[9.5px] font-bold text-emerald-400 uppercase">Compressed</span>
            <span className="mt-1 animated-gradient-text text-[24px] font-black tracking-tight">
              1.2 MB
            </span>
            <span className="text-[9px] font-semibold text-emerald-400">Lossless sharp text</span>
          </div>
        </div>

        {/* Compression bar meter */}
        <div className="w-full space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold text-[var(--text-dim)]">
            <span>Optimization Progress</span>
            <span className="text-emerald-400">100% Ready</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-raised)] p-0.5">
            <motion.div
              initial={{ width: "10%" }}
              animate={{ width: "93%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[var(--accent)] to-[var(--accent-2)]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-2 text-[11px] font-medium text-[var(--text)]">
        <CheckCircle2 className="size-3.5 text-emerald-400" />
        <span>Instant download ready without quality degradation</span>
      </div>
    </motion.div>
  );
}

/** 4. Vector Sign Seal Animation */
function SignAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 flex h-full w-full flex-col items-center justify-between"
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[var(--text-dim)] uppercase">
          <PenTool className="size-3 text-amber-400" /> Cryptographic Sign & Stamp
        </span>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
          SHA-256 Verified
        </span>
      </div>

      {/* Signing Surface */}
      <div className="relative flex h-48 w-full max-w-sm items-center justify-center">
        <div className="flex h-40 w-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/95 p-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-[var(--text)]">Partnership_Agreement.pdf</span>
            <ShieldCheck className="size-4 text-emerald-400" />
          </div>

          {/* Animated Calligraphy Stroke */}
          <div className="relative my-auto flex flex-col items-center justify-center border-b border-dashed border-[var(--border)] pb-2">
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
              className="font-serif text-[26px] italic text-[var(--accent)] select-none"
            >
              Sophia Montgomery
            </motion.div>
            <span className="font-mono text-[8px] tracking-wider text-[var(--text-dim)]">AUTHORIZED DIGITAL STAMP</span>
          </div>

          <div className="flex items-center justify-between text-[9px] font-semibold text-[var(--text-dim)]">
            <span>Vector Ink Pen</span>
            <span className="text-emerald-400">Signed Locally</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-2 text-[11px] font-medium text-[var(--text)]">
        <CheckCircle2 className="size-3.5 text-emerald-400" />
        <span>Draw signature, drag onto any page, and save</span>
      </div>
    </motion.div>
  );
}
