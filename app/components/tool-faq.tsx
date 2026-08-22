import { TOOL_SEO } from "../lib/tool-seo-data";

/**
 * Renders a tool's FAQ copy as visible page text. The same questions already
 * ship as FAQPage JSON-LD, and Google ignores structured data whose answers
 * aren't on the page — so this is what makes the markup eligible, and what
 * gives an otherwise thin tool page something to rank on.
 */
export function ToolFaq({ slug }: { slug: string }) {
  const faq = TOOL_SEO[slug]?.faq;
  if (!faq?.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
      <div className="glass divide-y divide-white/10 rounded-2xl px-6">
        {faq.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.q}
              <span className="shrink-0 opacity-50 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pt-3 text-sm leading-relaxed opacity-75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
