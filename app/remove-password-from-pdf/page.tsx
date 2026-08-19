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
import { useUnlock } from "../unlock-pdf/use-unlock";
import { STEPS } from "../unlock-pdf/pipeline-steps";

/** Same engine as /unlock-pdf — separate SEO-templated landing page for the "remove password from pdf" query. */
export default function RemovePasswordFromPdfPage() {
  const s = useUnlock();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Remove Password from PDF"
          busy={s.busy}
          icon={(active) => <UnlockPdfIcon active={active} size={24} />}
          blurb="Removes password protection from a PDF you already have the password for — AES-256 and RC4 both supported. Everything happens on-device; the file and password never leave your browser."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="remove-password-from-pdf">
            <PasswordInput value={s.password} onChange={s.setPassword} label="Current password" />

            <Dropzone
              id="remove-pw-input"
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
                Removing password…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Password removed. The download opens in any viewer with no password.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="remove-pw-input"
              action={
                <RunAction
                  label="Download the unlocked PDF"
                  busyLabel="Removing password…"
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
