"use client";

import { useEffect, useRef } from "react";
import { ContextToolbar, SelectionHandles } from "./context-toolbar";
import { DemoPage } from "./demo-page";

/**
 * Specimen stage for demonstration before a PDF is loaded.
 * Multi-page continuous vertical scrolling so mouse wheel/trackpad test naturally.
 */
export function CanvasStage({
  zoom,
  selected,
  onSelect,
  onPageInView,
}: {
  zoom: number;
  selected: string | null;
  onSelect: (id: string | null) => void;
  onPageInView?: (pageIndex: number) => void;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const pages = [0, 1, 2, 3];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onPageInView) return;

    const pageElements = container.querySelectorAll<HTMLElement>("[data-page-index]");
    if (!pageElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleIndex = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const idx = Number(entry.target.getAttribute("data-page-index"));
            if (!Number.isNaN(idx)) {
              mostVisibleIndex = idx;
            }
          }
        });

        if (mostVisibleIndex >= 0) {
          onPageInView(mostVisibleIndex);
        }
      },
      {
        root: container,
        threshold: [0.2, 0.5, 0.8],
      }
    );

    pageElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onPageInView]);

  return (
    <main
      ref={containerRef}
      data-lenis-prevent
      className="relative flex-1 overflow-y-auto overflow-x-auto p-6 pb-36 overscroll-contain bg-[#f3f4f8]"
      onClick={() => onSelect(null)}
    >
      <div className="mx-auto flex flex-col items-center gap-10">
        {pages.map((idx) => (
          <div
            key={idx}
            id={`pdf-page-${idx}`}
            data-page-index={idx}
            className="relative rounded-xl bg-white text-[#1e293b] transition-transform"
            style={{
              width: 680 * (zoom / 100),
              minHeight: 880 * (zoom / 100),
              boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <DemoPage selected={selected} onSelect={onSelect} pageIndex={idx} />
          </div>
        ))}
      </div>
    </main>
  );
}

/** A selectable text block on the page — the core interaction of the editor. */
export function Block({
  id,
  selected,
  onSelect,
  children,
  font = "Poppins",
  size = 12,
}: {
  id: string;
  selected: string | null;
  onSelect: (id: string | null) => void;
  children: React.ReactNode;
  font?: string;
  size?: number;
}) {
  const active = selected === id;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className={`relative cursor-text rounded-md transition-all ${
        active
          ? "ring-2 ring-indigo-600 bg-indigo-50/20"
          : "outline-1 outline-dashed outline-transparent hover:outline-indigo-300 hover:bg-slate-50/50"
      }`}
    >
      {active && (
        <>
          <SelectionHandles />
          <ContextToolbar font={font} size={size} color="#4f46e5" />
        </>
      )}
      {children}
    </div>
  );
}
