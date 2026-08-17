"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "motion/react";

/* Glass material without .glass's gradient ring — a dashed edge and a luminous
   hairline on the same 1px read as noise. Same pattern the nav bar uses. */
const ZONE =
  "mb-6 block cursor-pointer rounded-[20px] border-2 border-dashed bg-[var(--glass-bg)] px-6 py-11 " +
  "text-center backdrop-blur-[24px] backdrop-saturate-[180%] will-change-transform " +
  "transition-[border-color,box-shadow] duration-300 has-[:focus-visible]:border-[var(--accent)]";

export function Dropzone({
  onFiles,
  multiple = false,
  label,
  hint = "PDFs only — they never leave this tab",
  accept = "application/pdf",
  id,
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label: string;
  hint?: string;
  accept?: string;
  /** Lets another element (e.g. a sticky rail's "Add" button) open this same
      picker via a native `<label htmlFor>` — no ref plumbing required. */
  id?: string;
}) {
  const [over, setOver] = useState(false);

  return (
    <motion.label
      animate={{ scale: over ? 1.015 : 1, y: over ? -2 : 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      /* dragover must be cancelled on every event or the browser navigates to the file. */
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      /* Leaving for a child still fires dragleave here — that guard stops the flicker. */
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onFiles(Array.from(e.dataTransfer.files));
      }}
      className={`${ZONE} ${
        over
          ? "border-[var(--accent)] shadow-[0_28px_60px_-20px_var(--glow)]"
          : "border-[var(--border)] hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-22px_var(--glow)]"
      }`}
    >
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = ""; // re-picking the same file must still fire change
        }}
      />
      <motion.span
        aria-hidden
        animate={{ y: over ? -3 : 0, scale: over ? 1.1 : 1, rotate: over ? -6 : 0 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        className="clay-icon mb-3 inline-grid size-14 place-items-center text-[var(--accent)]"
      >
        <UploadCloud className="size-6" strokeWidth={2} />
      </motion.span>
      <span className="block text-[16px] font-semibold">{over ? "Drop to add" : label}</span>
      <span className="mt-1.5 block text-[13px] text-[var(--text-dim)]">{hint}</span>
    </motion.label>
  );
}
