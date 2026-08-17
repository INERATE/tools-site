"use client";

import { useEffect, useRef, useState } from "react";
import { renderPages } from "../lib/pdf-to-image";

/**
 * Renders whichever page is on screen, once, and keeps it. Rendering the whole
 * document up front would stall on a long PDF for pages nobody looks at.
 */
export function usePageView(file: File | null, index: number) {
  const [views, setViews] = useState<Record<number, string>>({});
  const [failed, setFailed] = useState(false);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  useEffect(() => {
    if (!file || views[index]) return;
    let dead = false;
    renderPages(file, { scale: 1.5, format: "jpeg", quality: 0.85, only: [index + 1] })
      .then(([shot]) => {
        if (!shot) return;
        if (dead) return URL.revokeObjectURL(shot.url);
        urls.current.push(shot.url);
        setViews((v) => ({ ...v, [index]: shot.url }));
      })
      .catch(() => !dead && setFailed(true));
    return () => {
      dead = true;
    };
  }, [file, index, views]);

  const drop = () => {
    urls.current.forEach(URL.revokeObjectURL);
    urls.current = [];
    setViews({});
    setFailed(false);
  };

  return { view: views[index], failed, drop };
}
