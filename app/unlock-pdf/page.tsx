"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { PasswordInput } from "../components/password-input";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { UnlockPdfIcon } from "../components/icons/unlock-pdf-icon";
import { AdSlot } from "../components/ad-slot";
import { useUnlock } from "./use-unlock";
import { STEPS } from "./pipeline-steps";

export default function UnlockPdfPage() {
  const s = useUnlock();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Unlock PDF"
          busy={s.busy}
          icon={(active) => <UnlockPdfIcon active={active} size={24} />}
          blurb="Removes password protection from a PDF you already have the password for — AES-256 and RC4 both supported. Everything happens on-device; the file and password never leave your browser."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="unlock-pdf">
            <PasswordInput value={s.password} onChange={s.setPassword} label="Current password" />

            <Dropzone
              id="unlock-pdf-input"
              onFiles={s.pick}
              label={s.name ? "Choose a different PDF" : "Drop a locked PDF here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Unlocking…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Unlocked. The download opens in any viewer with no password.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="unlock-pdf-input"
              action={
                <RunAction
                  label="Download the unlocked PDF"
                  busyLabel="Unlocking…"
                  busy={s.busy}
                  disabled={!s.canRun}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-unlocked.pdf`}
                  onRun={s.run}
                />
              }
            />
            <ToolPipeline active={step} steps={STEPS} />
            <AdSlot slot="tool-rail" />
          </div>
        </div>
      </main>
    </div>
  );
}
