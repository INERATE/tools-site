"use client";

import { useEffect, useRef } from "react";
import type { usePdfEditor } from "../hooks/use-pdf-editor";
import type { EditorMode } from "../types";
import { LiveCanvas } from "./live-canvas";

/**
 * Continuous multi-page scrolling canvas area.
 * Renders all pages vertically so mouse wheel, trackpad, and scrollbar work naturally.
 */
export function EditorStage({
  e,
  zoom,
  tool,
  color,
  onPageInView,
}: {
  e: ReturnType<typeof usePdfEditor>;
  zoom: number;
  tool: EditorMode;
  color: string;
  onPageInView?: (pageIndex: number) => void;
}) {
  const containerRef = useRef<HTMLElement>(null);

  // Sync active thumbnail / page index as user scrolls through pages with mouse wheel or trackpad
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !e.pages.length || !onPageInView) return;

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

        if (mostVisibleIndex >= 0 && mostVisibleIndex !== e.page) {
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
  }, [e.pages.length, e.page, onPageInView]);

  if (!e.pages.length) return null;

  return (
    <main
      ref={containerRef}
      data-lenis-prevent
      className="relative flex-1 overflow-y-auto overflow-x-auto p-6 pb-36 overscroll-contain bg-[#f3f4f8]"
    >
      <div className="mx-auto flex flex-col items-center gap-10">
        {e.pages.map((currentPage) => (
          <div
            key={currentPage.index}
            id={`pdf-page-${currentPage.index}`}
            data-page-index={currentPage.index}
            className="flex flex-col items-center transition-transform"
          >
            {currentPage.scanned && (
              <div className="mb-3 w-fit max-w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-[12px] text-amber-800 shadow-sm">
                This page is a scan — an image with no text layer.
                Run it through <a href="/ocr-pdf" className="font-semibold underline">OCR PDF</a> first to edit text.
              </div>
            )}
            <LiveCanvas
              page={currentPage}
              blocks={e.blocks.filter((b) => b.pageIndex === currentPage.index)}
              zoom={zoom}
              selected={e.selected}
              onSelect={e.setSelected}
              onEdit={e.editBlock}
              tool={tool}
              color={color}
              anno={e.anno}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
