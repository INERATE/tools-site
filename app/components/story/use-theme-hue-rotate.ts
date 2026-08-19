"use client";

import { useEffect, useState } from "react";

// The clips' baked-in accent is emerald #10B981 (~160deg hue). Rotating from
// that baseline to the live theme's --accent lets one near-monochrome render
// read as "native" to all 5 themes instead of always looking emerald-tinted.
const BASE_HUE = 160;

function hexHue(hex: string): number | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

/** Returns a `hue-rotate(...)` CSS filter string that maps the clips' baked-in
 * emerald toward the current theme's --accent, updating live on theme switch. */
export function useThemeHueRotate(): string {
  const [filter, setFilter] = useState("hue-rotate(0deg)");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const accent = getComputedStyle(root).getPropertyValue("--accent");
      const hue = hexHue(accent);
      setFilter(hue === null ? "hue-rotate(0deg)" : `hue-rotate(${(hue - BASE_HUE).toFixed(1)}deg)`);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return filter;
}
