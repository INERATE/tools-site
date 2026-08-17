"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: none)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

/**
 * True on touch screens, where nothing can be hovered. Controls that only
 * appear on hover would otherwise be unreachable on a phone, so they stay
 * visible there instead.
 */
export function useCoarsePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
