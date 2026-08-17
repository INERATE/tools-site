"use client";

import { Download, Loader2 } from "lucide-react";

const ACTION = "clay flex h-12 w-full cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold";

/** Sticky page-1 preview plus the download. */
export function Preview({
  src,
  pdfUrl,
  building,
  fileName,
}: {
  src: string | null;
  pdfUrl: string | null;
  building: boolean;
  fileName: string;
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="glass relative overflow-hidden rounded-2xl p-3">
        <div className="relative aspect-[595/842] w-full overflow-hidden rounded-xl bg-white">
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="Résumé preview, page 1" className="block h-full w-full object-contain" />
          )}
          {building && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white">
              <Loader2 aria-hidden className="size-3 animate-spin" />
              Updating
            </span>
          )}
        </div>
      </div>

      <a
        href={pdfUrl ?? undefined}
        download={fileName}
        aria-disabled={!pdfUrl}
        className={`${ACTION} mt-4 ${pdfUrl ? "" : "pointer-events-none opacity-60"}`}
      >
        <Download aria-hidden className="size-4" />
        Download PDF
      </a>
      <p className="mt-3 text-center text-[12px] text-[var(--text-dim)]">
        Page 1 shown · the PDF grows to fit everything you add
      </p>
    </div>
  );
}
