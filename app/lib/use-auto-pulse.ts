"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Toggles true/false on a loop so a card's icon plays its animation on its
 * own — a self-playing "how it works" preview, not just a hover reveal.
 * IconShell already pins everything to idle under prefers-reduced-motion,
 * so this never fights that.
 */
export function useAutoPulse(onMs = 1600, offMs = 2600, startDelayMs = 0) {
  const [on, setOn] = useState(false);
  const onRef = useRef(on);

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  useEffect(() => {
    const tick = () => {
      const next = !onRef.current;
      setOn(next);
      timer = setTimeout(tick, next ? onMs : offMs);
    };
    let timer = setTimeout(tick, offMs + startDelayMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return on;
}
