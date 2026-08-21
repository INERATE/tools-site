"use client";

import { useState } from "react";
import {
  Bookmark as BookmarkIcon,
  FileText,
  Layers,
  MessageSquare,
  PenTool,
  Plus,
  X,
} from "lucide-react";
import type { Annotation } from "../annotation-types";
import type { Bookmark } from "../engine/load-document";
import type { PageOp } from "../hooks/use-page-ops";
import { PagesPanel } from "./pages-panel";
import { BookmarksPanel, LayersPanel } from "./rail-panels";

type Tab = "pages" | "bookmarks" | "comments" | "layers" | "signatures";

const RAIL: { id: Tab; icon: typeof FileText; label: string }[] = [
  { id: "pages", icon: FileText, label: "Pages" },
  { id: "bookmarks", icon: BookmarkIcon, label: "Bookmarks" },
  { id: "comments", icon: MessageSquare, label: "Comments" },
  { id: "layers", icon: Layers, label: "Layers" },
  { id: "signatures", icon: PenTool, label: "Signatures" },
];

export function PageRail({
  pages,
  active,
  onPick,
  thumbs = [],
  opFor,
  onRotate,
  onToggleDelete,
  deleted = 0,
  bookmarks = [],
  annotations = [],
  picked = null,
  onPickAnno,
  onRemoveAnno,
}: {
  pages: number;
  active: number;
  onPick: (i: number) => void;
  thumbs?: { index: number; url: string }[];
  opFor?: (i: number) => PageOp;
  onRotate?: (i: number) => void;
  onToggleDelete?: (i: number) => void;
  deleted?: number;
  bookmarks?: Bookmark[];
  annotations?: Annotation[];
  picked?: string | null;
  onPickAnno?: (id: string) => void;
  onRemoveAnno?: (id: string) => void;
}) {
  const [tab, setTab] = useState<Tab | null>("pages");

  return (
    <aside className="flex shrink-0 border-r border-slate-200/90 bg-white">
      {/* Icon Navigation Strip */}
      <div className="flex w-13 flex-col items-center gap-2 border-r border-slate-200/80 px-1 py-3">
        {RAIL.map((r) => {
          const isCurrent = tab === r.id;
          return (
            <button
              key={r.id}
              title={r.label}
              onClick={() => setTab(tab === r.id ? null : r.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all w-11 ${
                isCurrent
                  ? "bg-indigo-50 text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <r.icon className="size-4" />
              <span className="text-[9.5px] font-medium tracking-tight">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable Drawer */}
      {tab && (
        <div className="flex w-[184px] flex-col justify-between overflow-y-auto bg-slate-50/40 p-3">
          <div className="flex flex-col gap-3">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
              <span className="text-[13px] font-bold capitalize text-slate-800">{tab}</span>
              <button
                onClick={() => setTab(null)}
                className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-slate-200/70 hover:text-slate-700"
                title="Collapse sidebar"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Panel Views */}
            {tab === "bookmarks" && <BookmarksPanel items={bookmarks} onGo={onPick} />}
            {tab === "comments" && (
              <div className="p-4 text-center text-[12px] text-slate-400">No comments yet.</div>
            )}
            {tab === "signatures" && (
              <div className="p-4 text-center text-[12px] text-slate-400">No saved signatures.</div>
            )}
            {tab === "layers" && (
              <LayersPanel
                items={annotations}
                picked={picked}
                onPick={onPickAnno ?? (() => {})}
                onRemove={onRemoveAnno ?? (() => {})}
              />
            )}
            {tab === "pages" && (
              <>
                <PagesPanel
                  pages={pages}
                  active={active}
                  thumbs={thumbs}
                  opFor={opFor}
                  onPick={onPick}
                  onRotate={onRotate}
                  onToggleDelete={onToggleDelete}
                  deleted={deleted}
                />
                <button
                  onClick={() => {}}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white py-2 text-[12px] font-medium text-slate-600 shadow-2xs hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 transition-colors"
                >
                  <Plus className="size-3.5" />
                  Add Page
                </button>
              </>
            )}
          </div>

          {/* Footer page counter */}
          {tab === "pages" && (
            <div className="mt-4 border-t border-slate-200/70 pt-2 text-center font-mono text-[11px] font-medium text-slate-500">
              <span className="font-bold text-slate-800">{active + 1}</span> / {pages} Pages
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
