"use client";

/**
 * Shown while a PDF is parsed. Reports real page-by-page progress rather than
 * an indeterminate spinner — parsing is O(pages) and a 40-page file takes long
 * enough that "it is working, and how far along" is the useful signal.
 */
export function LoadingSkeleton({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-[#f3f4f8]/92 backdrop-blur-sm">
      <div className="flex w-[min(420px,88%)] flex-col gap-4">
        {/* Page silhouette with a sweeping shimmer */}
        <div className="relative mx-auto aspect-[3/4] w-40 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
            <div className="h-1.5 w-full rounded-full bg-slate-100" />
            <div className="h-1.5 w-full rounded-full bg-slate-100" />
            <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
            <div className="mt-2 h-12 w-full rounded bg-slate-100" />
            <div className="h-1.5 w-full rounded-full bg-slate-100" />
            <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
          </div>
          <div className="pdfe-shimmer absolute inset-0" />
        </div>

        <div className="text-center">
          <p className="text-[13.5px] font-semibold text-slate-800">Reading your PDF</p>
          <p className="mt-0.5 text-[12px] text-slate-500">
            {total > 0 ? `Page ${done} of ${total}` : "Opening…"} · stays on this device
          </p>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(4, pct)}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        .pdfe-shimmer {
          background: linear-gradient(
            100deg,
            transparent 20%,
            rgba(79, 70, 229, 0.09) 50%,
            transparent 80%
          );
          transform: translateX(-100%);
          animation: pdfe-sweep 1.25s ease-in-out infinite;
        }
        @keyframes pdfe-sweep {
          to {
            transform: translateX(100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pdfe-shimmer {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
