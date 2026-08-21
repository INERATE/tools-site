"use client";

import { useEscape } from "../hooks/use-escape";

import { X } from "lucide-react";
import type { LoadedPage } from "../engine/load-document";

export function PageGridModal({
  pages,
  active,
  thumbs,
  onSelect,
  onClose,
}: {
  pages: number;
  active: number;
  thumbs: LoadedPage[];
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  useEscape(onClose);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">Document Page Grid</h2>
            <p className="text-[12px] text-slate-500">
              Select any page to jump directly to it ({pages} total pages)
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            title="Close grid view"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Grid of Pages */}
        <div className="mt-4 grid flex-1 grid-cols-2 gap-4 overflow-y-auto p-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: pages }, (_, i) => {
            const isCurrent = i === active;
            const thumb = thumbs[i];
            return (
              <button
                key={i}
                onClick={() => {
                  onSelect(i);
                  onClose();
                }}
                className={`group flex flex-col items-center rounded-xl p-2 transition-all ${
                  isCurrent
                    ? "bg-indigo-50/80 ring-2 ring-indigo-600 shadow-sm"
                    : "hover:bg-slate-50 hover:shadow-xs"
                }`}
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xs group-hover:border-indigo-400">
                  {thumb?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb.url}
                      alt={`Page ${i + 1}`}
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full flex-col gap-2 p-3 bg-slate-50">
                      <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
                      <div className="h-2 w-full rounded-full bg-slate-100" />
                      <div className="h-2 w-5/6 rounded-full bg-slate-100" />
                    </div>
                  )}
                </div>
                <span
                  className={`mt-2 font-mono text-[12px] font-medium ${
                    isCurrent ? "font-bold text-indigo-600" : "text-slate-600"
                  }`}
                >
                  Page {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
