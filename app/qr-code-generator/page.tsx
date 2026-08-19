"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { ToolHead } from "../components/tool-head";
import { ToolPipeline } from "../components/tool-pipeline";
import { ToolWindow } from "../components/tool-window";
import { QrCodeIcon } from "../components/icons/qr-code-icon";
import { AdSlot } from "../components/ad-slot";
import { useQrCode } from "./use-qr-code";
import { QrOptionsGrid } from "./qr-options";
import { QrPreview } from "./qr-preview";
import { STEPS } from "./pipeline-steps";

export default function QrCodeGeneratorPage() {
  const s = useQrCode();
  const step = s.pngUrl ? 2 : s.text ? 1 : 0;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="QR Code Generator"
          busy={s.busy}
          icon={(active) => <QrCodeIcon active={active} size={24} />}
          blurb="Turns any text, link or Wi-Fi password into a scannable QR code, redrawn live as you type — generated entirely on-device."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <ToolWindow path="qr-code-generator">
            <label htmlFor="qr-text" className="mb-1.5 block text-[12.5px] font-semibold text-[var(--text-dim)]">
              Content
            </label>
            <textarea
              id="qr-text"
              value={s.text}
              onChange={(e) => s.setText(e.target.value)}
              rows={3}
              placeholder="https://tools.inerate.com"
              className="mb-4 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[14px] leading-[1.5] text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />

            <QrOptionsGrid opts={s.opts} setOpts={s.setOpts} />

            {s.error && (
              <p role="alert" className="text-[13.5px] font-medium text-[#ff8fa3]">
                {s.error}
              </p>
            )}

            {!s.text && !s.error && (
              <p className="text-[13.5px] text-[var(--text-dim)]">Start typing to see the code appear.</p>
            )}
          </ToolWindow>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <QrPreview pngUrl={s.pngUrl} svgUrl={s.svgUrl} bg={s.opts.bg} />
            <ToolPipeline active={step} steps={STEPS} />
            <AdSlot slot="tool-rail" />
          </div>
        </div>
      </main>
    </div>
  );
}
