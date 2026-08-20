import { TOOLS } from "../components/tool-list";
import { CHAINS_MEDIA } from "./tool-chains-media";
import { CHAINS_PDF } from "./tool-chains-pdf";

/**
 * What a user plausibly wants NEXT, per tool.
 *
 * Most visitors arrive on one tool page from search and never learn the rest
 * of the suite exists. Category siblings are a weak answer to that ("you used
 * a PDF tool, here are more PDF tools"); a real workflow step is a strong one
 * — after converting a PDF to Word, the way back is the thing you need.
 */
export interface Chain {
  /** 1-2 routes that follow naturally from finishing this tool. */
  next: string[];
  /** Plain sentence saying why. Shown to the user, so no hype. */
  why: string;
}

const CHAINS: Record<string, Chain> = { ...CHAINS_PDF, ...CHAINS_MEDIA };

export interface Suggestion {
  href: string;
  title: string;
  description: string;
}

function lookup(href: string): Suggestion | null {
  const t = TOOLS.find((x) => x.href === href && x.live);
  return t ? { href: t.href, title: t.title, description: t.description } : null;
}

/**
 * The next steps for a tool, plus why. Falls back to same-category siblings so
 * every tool has something to offer, even without a hand-written chain.
 */
export function nextSteps(href: string): { why: string; items: Suggestion[] } {
  const chain = CHAINS[href];
  if (chain) {
    const items = chain.next.map(lookup).filter((x): x is Suggestion => x !== null);
    if (items.length) return { why: chain.why, items };
  }

  const self = TOOLS.find((t) => t.href === href);
  const siblings = TOOLS.filter((t) => t.live && t.href !== href && t.category === self?.category)
    .slice(0, 2)
    .map((t) => ({ href: t.href, title: t.title, description: t.description }));

  return { why: "Other tools people use alongside this one.", items: siblings };
}
