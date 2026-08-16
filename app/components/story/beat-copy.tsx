const BEATS = [
  {
    n: "01",
    head: "Six files. Six tabs.",
    accent: "One deadline.",
    sub: "Scattered downloads, none of them the thing you actually have to send.",
  },
  {
    n: "02",
    head: "They never leave",
    accent: "your laptop.",
    sub: "Every page is read, reordered and rewritten by your own browser.",
  },
  {
    n: "03",
    head: "One file.",
    accent: "Zero uploads.",
    sub: "Sealed and saved before an upload bar would have finished filling.",
  },
];

/**
 * Three beats. Pinned desktop stacks them in one grid cell and cross-fades;
 * phones and reduced motion read them as three rows, so nothing overlaps.
 */
export function BeatCopy() {
  return (
    <div className="relative z-10 grid w-full max-w-xl gap-14 text-center md:motion-safe:gap-0">
      {BEATS.map((b, i) => (
        <div
          key={b.n}
          className={`beat beat-${i + 1} md:motion-safe:col-start-1 md:motion-safe:row-start-1`}
          style={i > 0 ? { opacity: 0 } : undefined}
        >
          <span className="text-[11px] font-semibold tracking-[0.24em] text-[var(--accent)]">
            {b.n}
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em]">
            {b.head} <span className="text-[var(--accent)]">{b.accent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-dim)]">
            {b.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
