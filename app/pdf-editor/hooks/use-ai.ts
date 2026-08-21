"use client";

import { useCallback, useEffect, useState } from "react";
import type { AiTask } from "../../lib/ai-prompts";
import { runWithKey, type ProviderId } from "../../lib/ai-providers";

const STORE = "inerate-ai";

interface Settings {
  provider: ProviderId;
  keys: Partial<Record<Exclude<ProviderId, "free">, string>>;
}

const BLANK: Settings = { provider: "free", keys: {} };

/**
 * Two routes to the same answer: the shared free allowance goes through our
 * Worker because the credential is ours, while a user's own key is called
 * straight from the browser so neither the key nor the document reaches us.
 * Keys live in localStorage only — never sent anywhere except their provider.
 */
export function useAi() {
  const [settings, setSettings] = useState<Settings>(BLANK);
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) setSettings({ ...BLANK, ...JSON.parse(raw) });
    } catch {
      /* corrupted or blocked storage — defaults are fine */
    }
  }, []);

  const save = useCallback((next: Settings) => {
    setSettings(next);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* private browsing: settings just will not persist */
    }
  }, []);

  const run = useCallback(
    async (task: AiTask, text: string, question = "") => {
      setBusy(true);
      setError(null);
      setAnswer(null);
      try {
        if (settings.provider !== "free") {
          const key = settings.keys[settings.provider];
          if (!key) throw new Error("Add your API key for this provider first.");
          setAnswer(await runWithKey(settings.provider, key, task, text, question));
        } else {
          const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ task, text, question }),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error ?? "That did not work.");
          setAnswer(json.truncated ? `${json.result}\n\n_Only the first part of a long document was read._` : json.result);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "That did not work.");
      } finally {
        setBusy(false);
      }
    },
    [settings],
  );

  return { settings, save, run, busy, answer, error, clear: () => setAnswer(null) };
}
