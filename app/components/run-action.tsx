"use client";

import { Check, Download, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const ACTION =
  "clay flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold " +
  "disabled:cursor-default disabled:opacity-60";
const SPRING = { type: "spring", bounce: 0, duration: 0.35 } as const;

/**
 * The run-then-download pair every tool ends with. One component so the
 * transition into the finished state is identical across the suite.
 */
export function RunAction({
  label,
  busyLabel,
  busy,
  disabled,
  url,
  fileName,
  onRun,
}: {
  label: string;
  busyLabel: string;
  busy: boolean;
  disabled?: boolean;
  url: string | null;
  fileName: string;
  onRun: () => void;
}) {
  return (
    <div className="relative mt-6">
      <AnimatePresence mode="wait" initial={false}>
        {url ? (
          <motion.a
            key="done"
            href={url}
            download={fileName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SPRING}
            className={ACTION}
          >
            <Check aria-hidden className="size-4" />
            Download {fileName}
          </motion.a>
        ) : (
          <motion.button
            key="run"
            type="button"
            onClick={onRun}
            disabled={busy || disabled}
            initial={{ opacity: 0, y: 8 }}
            // Framer's own inline opacity style otherwise beats the disabled:opacity-60
            // Tailwind class on specificity, so the disabled dimming never actually showed.
            animate={{ opacity: disabled && !busy ? 0.6 : 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SPRING}
            className={`${ACTION} shimmer`}
          >
            {busy ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : (
              <Download aria-hidden className="size-4" />
            )}
            {busy ? busyLabel : label}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
