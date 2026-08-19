import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { ToolCard } from "../components/tool-card";
import { AdSlot } from "../components/ad-slot";
import { TOOLS } from "../components/tool-list";

const CATEGORIES = [...new Set(TOOLS.map((t) => t.category))];

export default function AllToolsPage() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--text)] sm:text-[40px]">
          Every tool, one place
        </h1>
        <p className="mt-3 max-w-[52ch] text-[14.5px] text-[var(--text-dim)]">
          100% client-side — nothing you open here is ever uploaded. Press{" "}
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[12px]">⌘K</kbd> to search.
        </p>

        <div className="mt-12 flex flex-col gap-14">
          {CATEGORIES.map((category) => (
            <section key={category}>
              <h2 className="mb-5 text-[13px] font-bold tracking-[0.1em] text-[var(--text-dim)] uppercase">{category}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.category === category).map((tool, i) => (
                  <ToolCard key={tool.href} {...tool} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <AdSlot slot="all-tools" />
        </div>
      </main>
    </div>
  );
}
