"use client";

import { useEffect } from "react";
import { getLenisInstance } from "./lenis-instance";

/**
 * Locks page scroll while a modal is open. Locking the body's own overflow
 * isn't enough here — this app's smooth scroll (Lenis) hijacks wheel events
 * itself and animates scroll independently of native `overflow`, so it has
 * to be paused too or a wheel scroll over the modal keeps moving the page
 * behind it.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenisInstance()?.stop();
    return () => {
      document.body.style.overflow = prevOverflow;
      getLenisInstance()?.start();
    };
  }, [locked]);
}
