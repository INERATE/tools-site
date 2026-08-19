/** Shared heading + prose block used by the privacy and terms pages. */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[19px] font-bold tracking-tight text-[var(--text)]">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[14.5px] leading-[1.7] text-[var(--text-dim)]">{children}</div>
    </section>
  );
}
