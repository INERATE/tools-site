"use client";

import { Block } from "./canvas-stage";

const BODY = "text-[7.5px] leading-[1.65] text-[#33304a] text-justify";
// Placeholder body copy for the layout specimen. Deliberately contains no
// figures or findings — invented statistics must never sit in shipped markup,
// where they read as real research.
const LINES = [
  "Conventional editors reconstruct the document by converting it to a word-processor format, which discards the absolute positioning that defines the original layout.",
  "We instead treat each page as an immutable backdrop and reconcile edits against the parsed glyph geometry, preserving column structure and the baseline grid.",
  "This section is placeholder text used to preview how a two-column layout behaves while a paragraph is selected and edited in place.",
];

/** A two-column specimen page — the hardest real case (academic paper). */
export function DemoPage({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
  return (
    <div className="px-12 pt-14 pb-10">
      <Block id="title" selected={selected} onSelect={onSelect} font="Times New Roman" size={19}>
        <h1 className="text-center font-serif text-[19px] leading-tight font-bold">
          In-Place Semantic Editing of Fixed-Layout Documents
        </h1>
      </Block>

      <Block id="authors" selected={selected} onSelect={onSelect} size={8}>
        <p className="text-center font-serif text-[8px] text-[#4a4666]">
          P. Sharma · Inerate Research · tools.inerate.com
        </p>
      </Block>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Block id="abs-h" selected={selected} onSelect={onSelect} size={8}>
            <h2 className="font-serif text-[8.5px] font-bold tracking-wide uppercase">Abstract</h2>
          </Block>
          <Block id="abs" selected={selected} onSelect={onSelect}>
            <p className={`font-serif ${BODY}`}>{LINES[0]}</p>
          </Block>
          <Block id="intro-h" selected={selected} onSelect={onSelect} size={8}>
            <h2 className="mt-1 font-serif text-[8.5px] font-bold tracking-wide uppercase">1. Introduction</h2>
          </Block>
          <Block id="intro" selected={selected} onSelect={onSelect}>
            <p className={`font-serif ${BODY}`}>{LINES[1]}</p>
          </Block>
        </div>

        <div className="flex flex-col gap-2">
          <Block id="fig" selected={selected} onSelect={onSelect}>
            <div className="flex h-24 items-end gap-1.5 rounded-sm bg-[#f4f2fa] p-2.5">
              {[38, 62, 45, 88, 71, 96].map((h, i) => (
                <div key={i} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: i === 5 ? "#A78BFA" : "#c8c2e4" }} />
              ))}
            </div>
            <p className="mt-1 text-center font-serif text-[6.5px] text-[#5b5678]">
              Figure 1 — Placeholder figure.
            </p>
          </Block>
          <Block id="res-h" selected={selected} onSelect={onSelect} size={8}>
            <h2 className="font-serif text-[8.5px] font-bold tracking-wide uppercase">2. Results</h2>
          </Block>
          <Block id="res" selected={selected} onSelect={onSelect}>
            <p className={`font-serif ${BODY}`}>{LINES[2]}</p>
          </Block>
        </div>
      </div>
    </div>
  );
}
