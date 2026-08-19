"use client";

import { Loader2 } from "lucide-react";
import { AmbientBlob } from "../components/ambient-blob";
import { Dropzone } from "../components/dropzone";
import { Nav } from "../components/nav";
import { PasswordInput } from "../components/password-input";
import { RunAction } from "../components/run-action";
import { ToolActionRail } from "../components/tool-action-rail";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { ProtectPdfIcon } from "../components/icons/protect-pdf-icon";
import { AdSlot } from "../components/ad-slot";
import { useProtect } from "./use-protect";
import { STEPS } from "./pipeline-steps";

export default function ProtectPdfPage() {
  const s = useProtect();
  const step = s.url ? 2 : s.name ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <ToolHead
          title="Protect PDF"
          busy={s.busy}
          icon={(active) => <ProtectPdfIcon active={active} size={24} />}
          blurb="Locks a PDF with a real AES-256 password (ISO 32000 standard security handler) — every viewer will ask for it before opening. Everything happens on-device; the file and password never leave your browser."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="protect-pdf">
            <PasswordInput value={s.password} onChange={s.setPassword} label="Set a password" />

            <Dropzone
              id="protect-pdf-input"
              onFiles={s.pick}
              label={s.name ? "Choose a different PDF" : "Drop a PDF here, or click to choose"}
            />

            {s.error && (
              <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {s.busy && (
              <p className="mb-4 flex items-center gap-2 text-[13.5px] text-[var(--text-dim)]">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Encrypting…
              </p>
            )}

            {s.url && !s.busy && (
              <p className="text-[13.5px] text-[var(--text-dim)]">
                Locked with AES-256. Keep the password — there&apos;s no recovery if it&apos;s lost.
              </p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <ToolActionRail
              count={s.name ? 1 : 0}
              itemLabel="PDF"
              addInputId="protect-pdf-input"
              action={
                <RunAction
                  label="Download the locked PDF"
                  busyLabel="Encrypting…"
                  busy={s.busy}
                  disabled={!s.canRun}
                  url={s.url}
                  fileName={`${s.name?.replace(/\.pdf$/i, "") ?? "document"}-protected.pdf`}
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
