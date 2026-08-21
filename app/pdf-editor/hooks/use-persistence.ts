"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clearWip, loadWip, saveWip } from "../../lib/local-store";
import type { Annotation } from "../annotation-types";
import type { WatermarkConfig } from "../element-types";
import type { PageOp } from "./use-page-ops";
import type { TextBlock } from "../types";

const KEY = "pdf-editor";
const DEBOUNCE = 900;

export interface Session {
  file: File;
  blocks: TextBlock[];
  annotations: Annotation[];
  watermark: WatermarkConfig;
  pageOps: Record<number, PageOp>;
}

/**
 * Keeps the current document and every edit in IndexedDB so a refresh, a
 * crash, or a closed tab does not throw the work away. Re-parsing on restore
 * is deliberate: page rasters are large data: URIs, and re-rendering from the
 * stored file is cheaper than storing megabytes of PNG per page.
 */
export function usePersistence(session: Session | null) {
  const [restorable, setRestorable] = useState<{ savedAt: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    loadWip<Session>(KEY).then((hit) => hit && setRestorable({ savedAt: hit.savedAt }));
  }, []);

  // Debounced so typing does not write to disk on every keystroke.
  useEffect(() => {
    if (!session?.file) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void saveWip(KEY, session), DEBOUNCE);
    return () => window.clearTimeout(timer.current);
  }, [session]);

  const restore = useCallback(async () => {
    const hit = await loadWip<Session>(KEY);
    setRestorable(null);
    return hit?.value ?? null;
  }, []);

  const discard = useCallback(async () => {
    setRestorable(null);
    await clearWip(KEY);
  }, []);

  return { restorable, restore, discard };
}
