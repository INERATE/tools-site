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
  docName: string;
  blocks: TextBlock[];
  annotations: Annotation[];
  watermark: WatermarkConfig;
  pageOps: Record<number, PageOp>;
}

/**
 * Keeps the document and every edit in IndexedDB so a refresh does not throw
 * the work away.
 *
 * The saved session is reopened automatically rather than behind a "restore?"
 * prompt: after a refresh the user expects their document to still be there,
 * and being dropped back to an empty screen to ask permission is the very
 * thing this feature exists to prevent. The disclosure still happens — a
 * notice says it was restored from this device, and "New" clears it.
 *
 * Re-parsing on restore is deliberate: page rasters are large data: URIs, so
 * re-rendering from the stored file beats storing megabytes of PNG per page.
 */
export function usePersistence(session: Session | null) {
  const [pending, setPending] = useState<{ value: Session; savedAt: number } | null>(null);
  const [restoredAt, setRestoredAt] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    loadWip<Session>(KEY).then((hit) => hit?.value?.file && setPending(hit));
  }, []);

  // Debounced so typing does not write to disk on every keystroke.
  useEffect(() => {
    if (!session?.file) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void saveWip(KEY, session), DEBOUNCE);
    return () => window.clearTimeout(timer.current);
  }, [session]);

  /** Hands the saved session over exactly once, so it cannot reopen in a loop. */
  const take = useCallback(() => {
    if (!pending) return null;
    setPending(null);
    setRestoredAt(pending.savedAt);
    return pending.value;
  }, [pending]);

  const startNew = useCallback(async () => {
    setPending(null);
    setRestoredAt(null);
    await clearWip(KEY);
  }, []);

  return { pending, take, restoredAt, dismissNotice: () => setRestoredAt(null), startNew };
}
