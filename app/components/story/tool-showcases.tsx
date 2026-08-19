"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Layers, 
  Scissors, 
  Sparkles, 
  Check, 
  ArrowRight, 
  FileCode, 
  Image as ImageIcon,
  PenTool, 
  ShieldCheck, 
  Zap,
  Sliders,
  CheckCircle2
} from "lucide-react";

/** 1. PDF Merger Interactive & Continuous Animated Showcase */
export function MergerShowcase() {
  const [phase, setPhase] = useState<"separate" | "fusing" | "merged">("separate");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("fusing"), 1800);
    const timer2 = setTimeout(() => setPhase("merged"), 2800);
    const timer3 = setTimeout(() => setPhase("separate"), 5400);

    const loop = setInterval(() => {
      setPhase("separate");
      setTimeout(() => setPhase("fusing"), 1800);
      setTimeout(() => setPhase("merged"), 2800);
    }, 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(loop);
    };
  }, []);

  const isMerged = phase === "merged";
  const isFusing = phase === "fusing";

  return (
    <div 
      onClick={() => setPhase((p) => p === "merged" ? "separate" : "merged")}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Interactive: Click to scrub merge animation"
    >
      {/* Ambient glowing aura */}
      <motion.div 
        aria-hidden 
        animate={{ scale: isMerged ? 1.2 : 1, opacity: isMerged ? 0.7 : 0.4 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute -inset-10 z-0 blur-3xl"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <Layers className="size-3.5" /> Interactive Matrix
        </span>
        <motion.span 
          animate={{ scale: isMerged ? [1, 1.1, 1] : 1 }}
          className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]"
        >
          {isMerged ? "Fused (14 Pages)" : isFusing ? "Combining…" : "3 Documents"}
        </motion.span>
      </div>

      {/* Visual Page Stack with Phased Levitation & Convergence */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        {/* Doc A (Left) */}
        <motion.div
          animate={
            isMerged
              ? { x: 38, y: 0, rotate: -4, scale: 0.92, opacity: 0.4 }
              : isFusing
              ? { x: 20, y: -2, rotate: -6, scale: 0.96, opacity: 0.8 }
              : { x: -48, y: [-3, 3, -3], rotate: [-4, -2, -4], scale: 1, opacity: 1 }
          }
          transition={
            isMerged || isFusing
              ? { type: "spring", stiffness: 220, damping: 20 }
              : { y: { repeat: Infinity, duration: 3.6, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
          }
          className="absolute z-10 flex h-28 w-20 flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]/80 p-2.5 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <FileText className="size-3.5 text-purple-400" />
            <span className="text-[9px] font-mono text-[var(--text-dim)]">01</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-3/4 rounded-full bg-[var(--border)]" />
          </div>
          <span className="truncate text-[8.5px] font-medium text-[var(--text-dim)]">Doc_A.pdf</span>
        </motion.div>

        {/* Master Center Document */}
        <motion.div
          animate={
            isMerged
              ? { scale: [1, 1.08, 1.05], y: -4, rotate: 0 }
              : isFusing
              ? { scale: 1.02, y: -2, rotate: 0 }
              : { y: [2, -2, 2], rotate: [0, 1, 0], scale: 1 }
          }
          transition={
            isMerged || isFusing
              ? { type: "spring", stiffness: 300, damping: 22 }
              : { y: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } }
          }
          className={`relative z-20 flex h-30 w-24 flex-col justify-between rounded-xl border p-3 shadow-2xl backdrop-blur-xl transition-colors duration-500 ${
            isMerged
              ? "border-[var(--accent)] bg-[var(--bg-raised)] ring-2 ring-[var(--accent)]/30"
              : "border-[var(--accent)]/50 bg-[var(--bg-raised)]/95"
          }`}
        >
          <div className="flex items-center justify-between">
            <FileText className="size-4 text-[var(--accent)]" />
            <motion.span 
              animate={{ opacity: isMerged ? 1 : 0.6 }}
              className="rounded bg-[var(--accent)]/20 px-1 text-[8.5px] font-bold text-[var(--accent)]"
            >
              {isMerged ? "14p" : "8p"}
            </motion.span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
            <motion.div 
              animate={{ width: isMerged ? "100%" : "50%" }}
              className="h-1.5 rounded-full bg-[var(--accent)]/40" 
            />
          </div>
          <span className="truncate text-[9.5px] font-bold text-[var(--text)]">
            {isMerged ? "Combined.pdf" : "Doc_B.pdf"}
          </span>
        </motion.div>

        {/* Doc C (Right) */}
        <motion.div
          animate={
            isMerged
              ? { x: -38, y: 0, rotate: 4, scale: 0.92, opacity: 0.4 }
              : isFusing
              ? { x: -20, y: -2, rotate: 6, scale: 0.96, opacity: 0.8 }
              : { x: 48, y: [-2, 4, -2], rotate: [4, 2, 4], scale: 1, opacity: 1 }
          }
          transition={
            isMerged || isFusing
              ? { type: "spring", stiffness: 220, damping: 20 }
              : { y: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.4 }, rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } }
          }
          className="absolute z-10 flex h-28 w-20 flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]/80 p-2.5 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <FileText className="size-3.5 text-pink-400" />
            <span className="text-[9px] font-mono text-[var(--text-dim)]">03</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[var(--border)]" />
          </div>
          <span className="truncate text-[8.5px] font-medium text-[var(--text-dim)]">Doc_C.pdf</span>
        </motion.div>
      </div>

      {/* Output status pill */}
      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Sparkles className="size-3.5 text-[var(--accent)] animate-pulse" />
        <span>{isMerged ? "Single continuous stream generated" : "Instant in-memory page stitch"}</span>
      </div>
    </div>
  );
}

/** 2. PDF Splitter Interactive & Continuous Animated Showcase */
export function SplitterShowcase() {
  const [splitState, setSplitState] = useState<"joined" | "cutting" | "split">("joined");

  useEffect(() => {
    const timer1 = setTimeout(() => setSplitState("cutting"), 1500);
    const timer2 = setTimeout(() => setSplitState("split"), 2400);
    const timer3 = setTimeout(() => setSplitState("joined"), 5200);

    const loop = setInterval(() => {
      setSplitState("joined");
      setTimeout(() => setSplitState("cutting"), 1500);
      setTimeout(() => setSplitState("split"), 2400);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(loop);
    };
  }, []);

  const isSplit = splitState === "split";
  const isCutting = splitState === "cutting";

  return (
    <div 
      onClick={() => setSplitState((s) => s === "split" ? "joined" : "split")}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Interactive: Click to toggle laser split"
    >
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <Scissors className="size-3.5" /> Precision Laser Split
        </span>
        <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]">
          {isSplit ? "2 Output Files" : "8 Pages Master"}
        </span>
      </div>

      {/* Interactive Page Ranges with Slicing Divider */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center gap-2">
        {/* Part 1 (Left Wing) */}
        <motion.div 
          animate={
            isSplit 
              ? { x: -8, rotate: -4, scale: 1.02 } 
              : isCutting
              ? { x: -3, rotate: -1 }
              : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`flex h-28 flex-1 flex-col justify-between rounded-xl border p-3 shadow-md transition-colors duration-300 ${
            isSplit ? "border-[var(--accent)] bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/40" : "border-[var(--border)] bg-[var(--bg-raised)]/75"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--accent)]">Part 1</span>
            <span className="rounded bg-[var(--bg)]/60 px-1 text-[8.5px] font-mono text-[var(--text-dim)]">p. 1–4</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
          </div>
          <span className="truncate text-[9.5px] font-medium text-[var(--text-dim)]">Executive Summary</span>
        </motion.div>

        {/* Dynamic Glowing Laser Divider */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div 
            animate={{ 
              height: isCutting || isSplit ? 110 : 60,
              opacity: isCutting ? 1 : 0.5,
              scaleY: isCutting ? [0.8, 1.2, 1] : 1
            }}
            transition={{ duration: 0.4 }}
            className="w-0.5 rounded-full bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" 
          />
          <motion.div 
            animate={{ 
              scale: isCutting ? [1, 1.35, 1.1] : 1,
              rotate: isCutting ? [-10, 15, -5, 0] : [0, 5, 0]
            }}
            transition={isCutting ? { duration: 0.6 } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute grid size-7 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] shadow-lg"
          >
            <Scissors className="size-3.5" />
          </motion.div>
        </div>

        {/* Part 2 (Right Wing) */}
        <motion.div 
          animate={
            isSplit 
              ? { x: 8, rotate: 4, scale: 1.02 } 
              : isCutting
              ? { x: 3, rotate: 1 }
              : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`flex h-28 flex-1 flex-col justify-between rounded-xl border p-3 shadow-md transition-colors duration-300 ${
            isSplit ? "border-[var(--accent-2)] bg-[var(--accent-2)]/10 ring-1 ring-[var(--accent-2)]/40" : "border-[var(--border)] bg-[var(--bg-raised)]/75"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--accent-2)]">Part 2</span>
            <span className="rounded bg-[var(--bg)]/60 px-1 text-[8.5px] font-mono text-[var(--text-dim)]">p. 5–8</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-3/5 rounded-full bg-[var(--border)]" />
          </div>
          <span className="truncate text-[9.5px] font-medium text-[var(--text-dim)]">Financial Appendix</span>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Zap className="size-3.5 text-[var(--accent)]" />
        <span>{isSplit ? "Zero quality loss · Clean stream separation" : "Click or wait to preview slice"}</span>
      </div>
    </div>
  );
}

/** 3. Compress PDF Interactive & Continuous Animated Showcase */
export function CompressShowcase() {
  const [level, setLevel] = useState<"extreme" | "recommended" | "lossless">("recommended");

  // Auto-cycle through compression modes
  useEffect(() => {
    const cycle = ["recommended", "extreme", "lossless"] as const;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % cycle.length;
      setLevel(cycle[idx]);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const STATS = {
    extreme: { original: "18.4 MB", result: "1.1 MB", percent: "-94%", width: "12%", desc: "Maximum compression for email & web" },
    recommended: { original: "18.4 MB", result: "2.4 MB", percent: "-87%", width: "24%", desc: "Optimal balance of sharpness & size" },
    lossless: { original: "18.4 MB", result: "7.8 MB", percent: "-58%", width: "48%", desc: "Full print-quality dpi preserved" },
  };

  return (
    <div className="glass group relative flex w-full max-w-[22rem] flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]">
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <Sliders className="size-3.5" /> Live Gauge
        </span>
        <motion.span 
          key={level}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-400"
        >
          {STATS[level].percent} Savings
        </motion.span>
      </div>

      {/* Before / After Comparison Gauge with Scanning Beam */}
      <div className="relative z-10 flex h-24 w-full flex-col justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/75 px-4 shadow-inner">
        {/* Animated Scanner Beam */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent"
        />

        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold text-[var(--text-dim)] uppercase">Original</span>
            <span className="text-[17px] font-extrabold text-[var(--text-dim)] line-through opacity-80">
              {STATS[level].original}
            </span>
          </div>

          <ArrowRight className="size-4 text-[var(--accent)]" />

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold text-[var(--accent)] uppercase">Optimized</span>
            <motion.span 
              key={`res-${level}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="animated-gradient-text text-[21px] font-extrabold tracking-tight"
            >
              {STATS[level].result}
            </motion.span>
          </div>
        </div>

        {/* Dynamic Progress Meter */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]/70">
          <motion.div
            animate={{ width: STATS[level].width }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[var(--accent)]"
          />
        </div>
      </div>

      {/* Preset switcher tabs with smooth sliding pill */}
      <div className="relative z-10 grid w-full grid-cols-3 gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 p-1">
        {(["lossless", "recommended", "extreme"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`relative rounded-lg py-1.5 text-[10.5px] font-semibold capitalize transition-all duration-300 ${
              level === l 
                ? "text-[var(--on-accent)] shadow-md" 
                : "text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {level === l && (
              <motion.div
                layoutId="compressTabPill"
                className="absolute inset-0 rounded-lg bg-[var(--accent)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        ))}
      </div>

      <div className="relative z-10 truncate text-[11px] font-medium text-[var(--text-dim)]">
        {STATS[level].desc}
      </div>
    </div>
  );
}

/** 4. PDF to Word Interactive & Continuous Animated Showcase */
export function PdfToWordShowcase() {
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setConverted((c) => !c);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onClick={() => setConverted((c) => !c)}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Interactive: Click to toggle instant morph"
    >
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <FileCode className="size-3.5" /> Layout Engine
        </span>
        <motion.span 
          key={converted ? "docx" : "pdf"}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold transition-colors ${
            converted ? "bg-blue-500/15 text-blue-400" : "bg-[var(--accent)]/15 text-[var(--accent)]"
          }`}
        >
          {converted ? "Editable .DOCX" : "PDF Input"}
        </motion.span>
      </div>

      {/* Morphing Document Preview */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        <motion.div
          animate={{ 
            y: [-3, 3, -3],
            scale: converted ? [0.96, 1.02, 1] : [0.96, 1.02, 1]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            scale: { duration: 0.5 }
          }}
          className="relative flex h-32 w-54 flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]/95 p-3.5 shadow-2xl backdrop-blur-xl"
        >
          {/* Laser Scanner Bar */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_10px_var(--accent)]"
          />

          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: converted ? 360 : 0, scale: [0.9, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className={`grid size-6 place-items-center rounded-md font-extrabold text-[9.5px] ${
                  converted ? "bg-blue-600 text-white" : "bg-red-500 text-white"
                }`}
              >
                {converted ? "W" : "PDF"}
              </motion.div>
              <span className="text-[11px] font-bold text-[var(--text)]">
                {converted ? "Contract_Q4.docx" : "Contract_Q4.pdf"}
              </span>
            </div>
            <span className={`text-[9px] font-semibold ${converted ? "text-blue-400" : "text-amber-400"}`}>
              {converted ? "Editable" : "Locked"}
            </span>
          </div>

          <div className="space-y-1.5 py-1">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <motion.div 
              animate={{ width: converted ? "95%" : "70%", backgroundColor: converted ? "var(--accent)" : "var(--border)" }}
              className="h-1.5 rounded-full" 
            />
            <div className="h-1.5 w-1/2 rounded-full bg-[var(--border)]" />
          </div>

          <div className="flex items-center justify-between text-[9px] font-medium text-[var(--text-dim)]">
            <span>Tables preserved</span>
            <span>Fonts matched</span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Sparkles className="size-3.5 text-[var(--accent)] animate-pulse" />
        <span>{converted ? "Rebuilt with native Office typography" : "Click to scrub conversion preview"}</span>
      </div>
    </div>
  );
}

/** 5. JPG to PDF Interactive & Continuous Animated Showcase */
export function JpgToPdfShowcase() {
  const [bound, setBound] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBound((b) => !b);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onClick={() => setBound((b) => !b)}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Interactive: Click to bind photo stack"
    >
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <ImageIcon className="size-3.5" /> High-DPI Binder
        </span>
        <motion.span 
          animate={{ scale: bound ? [1, 1.1, 1] : 1 }}
          className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]"
        >
          {bound ? "Bound Book" : "Multi-Image Pack"}
        </motion.span>
      </div>

      {/* Dynamic Photo Binder Collage Stack */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        {/* Photo 1 (Left Wing) */}
        <motion.div 
          animate={
            bound
              ? { x: 30, y: 0, rotate: -3, scale: 0.92, opacity: 0.5 }
              : { x: -42, y: [-3, 3, -3], rotate: [-8, -4, -8], scale: 1, opacity: 1 }
          }
          transition={
            bound
              ? { type: "spring", stiffness: 220, damping: 20 }
              : { y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" } }
          }
          className="absolute z-10 flex h-24 w-28 flex-col justify-between rounded-xl border border-purple-400/40 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 p-2 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center justify-between text-[9px] font-bold text-[var(--text)]">
            <span>Scan_01.jpg</span>
            <span className="text-[8px] text-[var(--text-dim)]">300 DPI</span>
          </div>
          <div className="grid size-7 place-items-center rounded-lg bg-[var(--bg)]/60 text-[var(--accent)]">
            <ImageIcon className="size-4" />
          </div>
        </motion.div>

        {/* Central Bound PDF Binder */}
        <motion.div 
          animate={
            bound
              ? { scale: [1, 1.08, 1.04], y: -4, rotate: 0 }
              : { y: [2, -2, 2], rotate: [0, 1, 0], scale: 1 }
          }
          transition={
            bound
              ? { type: "spring", stiffness: 280, damping: 20 }
              : { y: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } }
          }
          className="relative z-20 flex h-28 w-34 flex-col justify-between rounded-xl border border-[var(--accent)]/60 bg-[var(--bg-raised)]/95 p-3 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between text-[9.5px] font-bold text-[var(--text)]">
            <span>Portfolio.pdf</span>
            <span className="rounded bg-emerald-500/20 px-1 text-[8px] font-bold text-emerald-400">PDF</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-3/4 rounded-full bg-[var(--border)]" />
          </div>
          <span className="text-[9px] font-bold text-[var(--accent)]">
            {bound ? "3 Pages Bound" : "Auto Margins"}
          </span>
        </motion.div>

        {/* Photo 2 (Right Wing) */}
        <motion.div 
          animate={
            bound
              ? { x: -30, y: 0, rotate: 3, scale: 0.92, opacity: 0.5 }
              : { x: 42, y: [-2, 4, -2], rotate: [8, 4, 8], scale: 1, opacity: 1 }
          }
          transition={
            bound
              ? { type: "spring", stiffness: 220, damping: 20 }
              : { y: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.3 }, rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } }
          }
          className="absolute z-10 flex h-24 w-28 flex-col justify-between rounded-xl border border-cyan-400/40 bg-gradient-to-tl from-cyan-500/20 to-blue-500/20 p-2 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center justify-between text-[9px] font-bold text-[var(--text)]">
            <span>Scan_02.jpg</span>
            <span className="text-[8px] text-[var(--text-dim)]">300 DPI</span>
          </div>
          <div className="grid size-7 place-items-center rounded-lg bg-[var(--bg)]/60 text-[var(--accent-3)]">
            <ImageIcon className="size-4" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Check className="size-3.5 text-emerald-400" />
        <span>Preserves natural photo resolution & EXIF</span>
      </div>
    </div>
  );
}

/** 6. Sign PDF Interactive & Continuous Animated Showcase */
export function SignPdfShowcase() {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setSigned(true), 1600);
    const timer2 = setTimeout(() => setSigned(false), 5400);

    const loop = setInterval(() => {
      setSigned(false);
      setTimeout(() => setSigned(true), 1600);
    }, 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(loop);
    };
  }, []);

  return (
    <div 
      onClick={() => setSigned((s) => !s)}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Interactive: Click to sign/unsign document"
    >
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <PenTool className="size-3.5" /> Vector Ink Pad
        </span>
        <motion.span 
          animate={{ scale: signed ? [1, 1.1, 1] : 1 }}
          className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-400"
        >
          {signed ? "Cryptographic Seal" : "Awaiting Signature"}
        </motion.span>
      </div>

      {/* Document Sign Surface with Drawing Calligraphy & Stamp */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        <motion.div 
          animate={{ y: [-2, 3, -2] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          className="flex h-32 w-54 flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]/95 p-3.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--text)]">Release_Form.pdf</span>
            <ShieldCheck className={`size-4 transition-colors ${signed ? "text-emerald-400" : "text-[var(--text-dim)]"}`} />
          </div>

          {/* Signature Line with Animated Ink Stroke */}
          <div className="relative flex flex-col justify-end border-b-2 border-dashed border-[var(--border)] pb-1">
            <div className="h-7 flex items-center">
              <AnimatePresence mode="wait">
                {signed ? (
                  <motion.div
                    key="signature"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-serif text-[19px] italic text-[var(--accent)] select-none"
                  >
                    Alexander Hayes
                  </motion.div>
                ) : (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-[10px] text-[var(--text-dim)]"
                  >
                    <PenTool className="size-3 text-[var(--accent)] animate-bounce" />
                    <span>Signing in progress…</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[7.5px] font-mono text-[var(--text-dim)]">AUTHORIZED DIGITAL SEAL</span>
          </div>

          <div className="flex items-center justify-between text-[8.5px] text-[var(--text-dim)]">
            <span className={signed ? "text-emerald-400 font-bold" : ""}>
              {signed ? "✓ SHA-256 Verified" : "Unsigned"}
            </span>
            <span>Client-Side Stamp</span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <CheckCircle2 className="size-3.5 text-emerald-400" />
        <span>{signed ? "Signed locally · Zero data transmitted" : "Click to test digital stamp"}</span>
      </div>
    </div>
  );
}
