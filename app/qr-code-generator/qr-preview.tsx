"use client";

export function QrPreview({ pngUrl, svgUrl, bg }: { pngUrl: string | null; svgUrl: string | null; bg: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-[var(--text-dim)] uppercase">Preview</p>
      <div
        className="grid aspect-square place-items-center overflow-hidden rounded-xl shadow-[inset_0_0_0_1px_var(--border)]"
        style={{ background: bg }}
      >
        {pngUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pngUrl} alt="Generated QR code" className="h-full w-full object-contain p-4" />
        ) : (
          <span className="text-[12px] text-[var(--text-dim)]">Nothing yet</span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={pngUrl ?? undefined}
          download="qr-code.png"
          aria-disabled={!pngUrl}
          className="clay flex h-10 items-center justify-center text-[13.5px] font-semibold aria-disabled:pointer-events-none aria-disabled:opacity-60"
        >
          PNG
        </a>
        <a
          href={svgUrl ?? undefined}
          download="qr-code.svg"
          aria-disabled={!svgUrl}
          className="clay flex h-10 items-center justify-center text-[13.5px] font-semibold aria-disabled:pointer-events-none aria-disabled:opacity-60"
        >
          SVG
        </a>
      </div>
    </div>
  );
}
