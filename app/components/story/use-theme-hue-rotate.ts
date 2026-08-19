"use client";

import { useEffect, useState } from "react";
import { hexToRgb, hueOf, luminanceOf } from "./color-math";

// The clips' baked-in accent is emerald #10B981 (~160deg hue). Rotating from
// that baseline to the live theme's --accent lets one near-monochrome render
// read as "native" to all 5 themes instead of always looking emerald-tinted.
const BASE_HUE = 160;

/**
 * Live CSS filter for the storytelling clips: hue-rotates the baked-in
 * emerald to match the current theme's --accent, AND brightens the material
 * when the theme's own card (--bg-raised) is light. The clips were lit for a
 * dark backdrop — direct brightness correction reads as an intentional
 * material tone, unlike compositing a separate dark shape behind it (tried
 * first, read as a smudge/artifact instead of a pedestal).
 */
export function useThemeHueRotate(): string {
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const style = getComputedStyle(root);
      const accentRgb = hexToRgb(style.getPropertyValue("--accent"));
      const cardRgb = hexToRgb(style.getPropertyValue("--bg-raised"));
      const hueDeg = accentRgb ? (hueOf(accentRgb) - BASE_HUE).toFixed(1) : "0";
      const light = cardRgb ? luminanceOf(cardRgb) : 0;
      // Only Daylight's card is light (luminance ~1); the other 4 themes are
      // already dark, where the material reads fine unmodified. Brightness
      // alone barely lifts near-black pixels (a small number times 1.x is
      // still small) — contrast reduction first raises the black floor
      // toward mid-gray, then brightness lifts the whole range. Verified
      // against a real frame composited on white before landing on these
      // numbers; brightness-only read as still-too-dark.
      const contrast = light > 0.6 ? 0.55 : 1;
      const brightness = light > 0.6 ? 1.85 : 1;
      const saturate = light > 0.6 ? 1.25 : 1;
      setFilter(`hue-rotate(${hueDeg}deg) contrast(${contrast}) brightness(${brightness}) saturate(${saturate})`);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return filter;
}
