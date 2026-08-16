const LINES = [0.92, 0.74, 0.86, 0.58, 0.8, 0.44];

/**
 * One scattered glass document. The scatter transform is an inline style so the
 * "before" frame is server-rendered — GSAP reads it back off the computed matrix.
 */
type Props = { x: number; y: number; r: number; z: number; lead?: boolean };

// Blur only the lead card: once they converge, six overlapping backdrop-filters
// nest into each other and the scrubbed timeline drops frames.
export function DocCard({ x, y, r, z, lead }: Props) {
  return (
    <div
      aria-hidden
      className={`doc absolute top-1/2 left-1/2 -mt-[112px] -ml-[80px] h-[224px] w-[160px] rounded-2xl border border-white/12 bg-white/[0.055] p-4 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.22)] ${lead ? "backdrop-blur-md backdrop-saturate-150" : ""}`}
      style={{ transform: `translate(${x}px, ${y}px) rotate(${r}deg)`, zIndex: z }}
    >
      <span
        className="block h-1.5 w-9 rounded-full"
        style={{ background: "linear-gradient(90deg,#7C3AED,#D946EF,#22D3EE)" }}
      />
      <svg viewBox="0 0 128 116" className="mt-4 w-full text-[var(--text)]" fill="none">
        {LINES.map((w, i) => (
          <rect
            key={i}
            y={i * 20}
            width={128 * w}
            height="7"
            rx="3.5"
            fill="currentColor"
            opacity={0.2}
          />
        ))}
      </svg>
    </div>
  );
}
