import { useState } from "react";
import { assemblePdf, type Slot } from "./assemble-pdf";

/** Runs assemblePdf and tracks the busy/url state an action button needs. */
export function useAssembleRun(files: File[], slots: Slot[], onError: (msg: string) => void, failMsg: string) {
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    try {
      const blob = await assemblePdf(files, slots);
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      onError(e instanceof Error ? e.message : failMsg);
    } finally {
      setBusy(false);
    }
  }

  return { busy, url, run, clearUrl: () => setUrl(null) };
}
