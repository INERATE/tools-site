"use client";

import { useState } from "react";
import { motion } from "motion/react";
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
  Sliders
} from "lucide-react";

/** 1. PDF Merger Interactive Showcase */
export function MergerShowcase() {
  const pages = ["Doc A · 4p", "Doc B · 8p", "Doc C · 2p"];
  const [merged, setMerged] = useState(false);

  const toggleMerge = () => {
    setMerged((m) => !m);
  };

  return (
    <div 
      onClick={toggleMerge}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Click to toggle merge animation"
    >
      {/* Ambient glow */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <Layers className="size-3.5" /> Interactive Matrix
        </span>
        <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]">
          {merged ? "Merged (14 Pages)" : "3 Documents"}
        </span>
      </div>

      {/* Visual Page Stack */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center gap-2.5">
        {pages.map((doc, i) => (
          <motion.div
            key={doc}
            animate={
              merged
                ? { x: (1 - i) * 20, y: (1 - i) * 6, rotate: (i - 1) * 4, scale: i === 1 ? 1.05 : 0.95 }
                : { x: 0, y: 0, rotate: (i - 1) * 3, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`flex h-28 w-20 flex-col justify-between rounded-xl border p-2.5 shadow-lg backdrop-blur-md transition-all ${
              i === 1 
                ? "border-[var(--accent)]/60 bg-[var(--bg-raised)]/90" 
                : "border-[var(--border)] bg-[var(--bg-raised)]/70"
            }`}
          >
            <div className="flex items-center justify-between">
              <FileText className="size-3.5 text-[var(--accent)]" />
              <span className="text-[9px] font-mono text-[var(--text-dim)]">0{i + 1}</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
              <div className="h-1.5 w-3/4 rounded-full bg-[var(--border)]" />
              <div className="h-1.5 w-1/2 rounded-full bg-[var(--border)]" />
            </div>
            <span className="truncate text-[9px] font-medium text-[var(--text-dim)]">{doc}</span>
          </motion.div>
        ))}
      </div>

      {/* Output status pill */}
      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Sparkles className="size-3.5 text-[var(--accent)]" />
        <span>{merged ? "Ready to export as single PDF" : "Click to combine documents"}</span>
      </div>
    </div>
  );
}

/** 2. PDF Splitter Interactive Showcase */
export function SplitterShowcase() {
  const [splitPoint, setSplitPoint] = useState(4);

  return (
    <div className="glass group relative flex w-full max-w-[22rem] flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]">
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <Scissors className="size-3.5" /> Visual Range Cut
        </span>
        <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]">
          8 Pages Total
        </span>
      </div>

      {/* Interactive Page Ranges */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center gap-3">
        {/* Range 1 */}
        <div 
          onClick={() => setSplitPoint(3)}
          className={`flex h-28 flex-1 cursor-pointer flex-col justify-between rounded-xl border p-3 shadow-md transition-all ${
            splitPoint === 3 ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] bg-[var(--bg-raised)]/70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--accent)]">Part 1</span>
            <span className="text-[9px] font-mono text-[var(--text-dim)]">Pages 1–{splitPoint}</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
          </div>
          <span className="text-[10px] font-medium text-[var(--text-dim)]">Executive Summary</span>
        </div>

        {/* Laser Divider */}
        <div className="flex flex-col items-center gap-1">
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
          <div className="grid size-6 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] shadow-md">
            <Scissors className="size-3" />
          </div>
          <div className="h-10 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent" />
        </div>

        {/* Range 2 */}
        <div 
          onClick={() => setSplitPoint(5)}
          className={`flex h-28 flex-1 cursor-pointer flex-col justify-between rounded-xl border p-3 shadow-md transition-all ${
            splitPoint === 5 ? "border-[var(--accent)] bg-[var(--accent)]/10" : "border-[var(--border)] bg-[var(--bg-raised)]/70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--accent-2)]">Part 2</span>
            <span className="text-[9px] font-mono text-[var(--text-dim)]">Pages {splitPoint + 1}–8</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-3/5 rounded-full bg-[var(--border)]" />
          </div>
          <span className="text-[10px] font-medium text-[var(--text-dim)]">Appendix & Data</span>
        </div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Zap className="size-3.5 text-[var(--accent)]" />
        <span>Extracts selected ranges without quality loss</span>
      </div>
    </div>
  );
}

/** 3. Compress PDF Interactive Showcase */
export function CompressShowcase() {
  const [level, setLevel] = useState<"extreme" | "recommended" | "lossless">("recommended");

  const STATS = {
    extreme: { original: "18.4 MB", result: "1.1 MB", percent: "-94%", desc: "Maximum compression for email" },
    recommended: { original: "18.4 MB", result: "2.4 MB", percent: "-87%", desc: "Optimal balance of sharpness & size" },
    lossless: { original: "18.4 MB", result: "7.8 MB", percent: "-58%", desc: "Full print-quality dpi preserved" },
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
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-400">
          {STATS[level].percent} Savings
        </span>
      </div>

      {/* Before / After Comparison */}
      <div className="relative z-10 flex h-24 w-full items-center justify-around rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/70 px-4">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold text-[var(--text-dim)] uppercase">Original</span>
          <span className="text-[18px] font-extrabold text-[var(--text-dim)] line-through">
            {STATS[level].original}
          </span>
        </div>

        <ArrowRight className="size-5 text-[var(--accent)]" />

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold text-[var(--accent)] uppercase">Compressed</span>
          <span className="animated-gradient-text text-[22px] font-extrabold tracking-tight">
            {STATS[level].result}
          </span>
        </div>
      </div>

      {/* Preset switcher tabs */}
      <div className="relative z-10 grid w-full grid-cols-3 gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 p-1">
        {(["lossless", "recommended", "extreme"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`rounded-lg py-1.5 text-[10.5px] font-semibold capitalize transition-all ${
              level === l 
                ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-md" 
                : "text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="relative z-10 truncate text-[11px] font-medium text-[var(--text-dim)]">
        {STATS[level].desc}
      </div>
    </div>
  );
}

/** 4. PDF to Word Interactive Showcase */
export function PdfToWordShowcase() {
  const [converted, setConverted] = useState(false);

  return (
    <div 
      onClick={() => setConverted((c) => !c)}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Click to toggle PDF to DOCX transition"
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
        <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]">
          {converted ? "Editable .DOCX" : "PDF Input"}
        </span>
      </div>

      {/* Morphing Document Preview */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        <motion.div
          animate={converted ? { scale: [0.95, 1], rotateY: [0, 360] } : { scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          className="flex h-32 w-52 flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]/90 p-3.5 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
            <div className="flex items-center gap-2">
              <div className={`grid size-6 place-items-center rounded-md ${converted ? "bg-blue-500 text-white" : "bg-red-500 text-white"}`}>
                <span className="text-[9px] font-extrabold">{converted ? "W" : "PDF"}</span>
              </div>
              <span className="text-[11px] font-bold text-[var(--text)]">
                {converted ? "Contract_Q4.docx" : "Contract_Q4.pdf"}
              </span>
            </div>
            <span className="text-[9px] text-emerald-400 font-semibold">{converted ? "Editable" : "Locked"}</span>
          </div>

          <div className="space-y-1.5 py-1">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-2/3 rounded-full bg-[var(--accent)]/40" />
          </div>

          <div className="flex items-center justify-between text-[9px] font-medium text-[var(--text-dim)]">
            <span>Tables preserved</span>
            <span>Fonts matched</span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Sparkles className="size-3.5 text-[var(--accent)]" />
        <span>{converted ? "Converted directly in memory" : "Click to test instant conversion"}</span>
      </div>
    </div>
  );
}

/** 5. JPG to PDF Interactive Showcase */
export function JpgToPdfShowcase() {
  return (
    <div className="glass group relative flex w-full max-w-[22rem] flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]">
      <div 
        aria-hidden 
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--accent)] uppercase">
          <ImageIcon className="size-3.5" /> High-DPI Binder
        </span>
        <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--accent)]">
          Auto Margins
        </span>
      </div>

      {/* Photo Collage Stack */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        <motion.div 
          whileHover={{ y: -4, rotate: -6 }}
          className="absolute -left-1 flex h-24 w-28 flex-col justify-between rounded-xl border border-[var(--border)] bg-gradient-to-tr from-purple-500/20 to-pink-500/20 p-2 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center justify-between text-[9px] font-bold text-[var(--text)]">
            <span>Scan_01.jpg</span>
            <span className="text-[8px] text-[var(--text-dim)]">300 DPI</span>
          </div>
          <div className="grid size-7 place-items-center rounded-lg bg-[var(--bg)]/60 text-[var(--accent)]">
            <ImageIcon className="size-4" />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6, scale: 1.05 }}
          className="relative z-20 flex h-28 w-32 flex-col justify-between rounded-xl border border-[var(--accent)]/50 bg-[var(--bg-raised)]/95 p-2.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between text-[9.5px] font-bold text-[var(--text)]">
            <span>Portfolio.pdf</span>
            <span className="rounded bg-emerald-500/20 px-1 text-[8px] font-bold text-emerald-400">PDF</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
            <div className="h-1.5 w-3/4 rounded-full bg-[var(--border)]" />
          </div>
          <span className="text-[9px] font-medium text-[var(--accent)]">Bound & Clean</span>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, rotate: 6 }}
          className="absolute -right-1 flex h-24 w-28 flex-col justify-between rounded-xl border border-[var(--border)] bg-gradient-to-tl from-cyan-500/20 to-blue-500/20 p-2 shadow-lg backdrop-blur-md"
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
        <span>Preserves natural photo resolution</span>
      </div>
    </div>
  );
}

/** 6. Sign PDF Interactive Showcase */
export function SignPdfShowcase() {
  const [signed, setSigned] = useState(true);

  return (
    <div 
      onClick={() => setSigned((s) => !s)}
      className="glass group relative flex w-full max-w-[22rem] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--accent)]/50 sm:max-w-[25rem]"
      title="Click to sign/unsign document"
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
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-400">
          Cryptographic Seal
        </span>
      </div>

      {/* Document Sign Surface */}
      <div className="relative z-10 flex h-36 w-full items-center justify-center">
        <div className="flex h-32 w-52 flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]/90 p-3.5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--text)]">Release_Form.pdf</span>
            <ShieldCheck className="size-4 text-emerald-400" />
          </div>

          {/* Signature Line */}
          <div className="relative flex flex-col justify-end border-b-2 border-dashed border-[var(--border)] pb-1">
            {signed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-serif text-[20px] italic text-[var(--accent)] select-none"
              >
                Alexander Hayes
              </motion.div>
            ) : (
              <div className="py-2 text-[10px] text-[var(--text-dim)]">Click here to sign…</div>
            )}
            <span className="text-[8px] font-mono text-[var(--text-dim)]">AUTHORIZED SIGNATURE</span>
          </div>

          <div className="flex items-center justify-between text-[8.5px] text-[var(--text-dim)]">
            <span>SHA-256 Verified</span>
            <span>Client Stamp</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 py-2 text-[11.5px] font-medium text-[var(--text)]">
        <Check className="size-3.5 text-emerald-400" />
        <span>{signed ? "Signed locally · Ready to save" : "Draw or stamp signature onto page"}</span>
      </div>
    </div>
  );
}
