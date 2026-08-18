"use client";

import { Info } from "lucide-react";

/** The honest note plus a preview of the real .docx output, rendered back through mammoth. Download lives in the sticky rail. */
export function WordPreview({ html }: { html: string }) {
  return (
    <>
      <div className="glass mb-4 flex items-start gap-2 rounded-2xl p-4 text-[12.5px] leading-[1.55] text-[var(--text-dim)]">
        <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        <span>
          <strong className="font-semibold text-[var(--text)]">Text-only conversion.</strong> Reading order and
          page breaks carry over; fonts, images, tables and columns do not. Complex layouts may shift once opened
          in Word.
        </span>
      </div>

      <div
        className="glass max-h-[70vh] overflow-y-auto rounded-2xl bg-white p-6 text-[13.5px] leading-[1.7] text-black [&_p]:mb-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
