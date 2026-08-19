"use client";

import { useEffect, useState } from "react";
import { hexToRgb, hueOf, luminanceOf } from "./color-math";

// The clips' baked-in accent is emerald #10B981 (~160deg hue). Rotating from
// that baseline to the live theme's --accent lets one near-monochrome render
// read as "native" to all 5 themes instead of always looking emerald-tinted.
const BASE_HUE = 160;

/**
 * Live CSS filter for the storytelling clips:
 * - On dark themes: rotates the baked-in emerald to match --accent, maintaining obsidian glass depth.
 * - On light themes (Daylight / light mode): inverts and shifts hue so the dark glass slabs transform
 *   into crystalline, bright, translucent frosted glass matching the daylight theme without dark muddy blocks.
 */
export function useThemeHueRotate(): string {
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const style = getComputedStyle(root);
      const accentRgb = hexToRgb(style.getPropertyValue("--accent"));
      const cardRgb = hexToRgb(style.getPropertyValue("--bg-raised"));
      const hueDeg = accentRgb ? hueOf(accentRgb) - BASE_HUE : 0;
      const light = cardRgb ? luminanceOf(cardRgb) : 0;

      if (light > 0.6) {
        // Light mode / Daylight:
        // Invert to transform dark opaque render into bright translucent glass.
        // Adding 180deg counteracts the hue inversion from invert(0.92).
        const adjustedHue = (hueDeg + 180).toFixed(1);
        setFilter(
          `invert(0.92) hue-rotate(${adjustedHue}deg) brightness(1.05) contrast(0.94) saturate(1.18) drop-shadow(0 15px 30px rgba(109,40,217,0.12))`
        );
      } else {
        // Dark themes:
        setFilter(
          `hue-rotate(${hueDeg.toFixed(1)}deg) brightness(1.08) contrast(1.02) drop-shadow(0 20px 40px var(--glow))`
        );
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return filter;
}
