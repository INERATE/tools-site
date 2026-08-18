"use client";

import { useEffect, useState } from "react";

/** Advances 0..count-1 on a loop — the frame index behind any auto-playing storyboard. */
export function useCycle(count: number, ms = 1500) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms]);
  return i;
}
