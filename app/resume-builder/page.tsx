"use client";

import { useState } from "react";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { ResumeIcon } from "../components/icons/resume-icon";
import { FormBasics } from "./form-basics";
import { FormHistory } from "./form-history";
import { Preview } from "./preview";
import { useResume } from "./use-resume";

export default function ResumeBuilderPage() {
  const { data, edit, setData, preview, pdfUrl, building, error } = useResume();
  const [hot, setHot] = useState(false);
  const file = `${(data.name.trim() || "resume").replace(/\s+/g, "-").toLowerCase()}.pdf`;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div
          className="mb-6 flex items-center gap-3.5"
          onPointerEnter={() => setHot(true)}
          onPointerLeave={() => setHot(false)}
        >
          <span className="glass grid size-12 shrink-0 place-items-center text-[var(--accent)]">
            <ResumeIcon active={hot || building} size={24} />
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em]">Résumé Builder</h1>
        </div>
        <p className="mb-8 max-w-[60ch] text-[14.5px] leading-[1.6] text-[var(--text-dim)]">
          Fill it in and watch the PDF update as you type. It is generated in your browser — nothing is
          uploaded, and no account is needed.
        </p>

        {error && (
          <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
            {error}
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <form className="flex flex-col gap-7" onSubmit={(e) => e.preventDefault()}>
            <FormBasics data={data} edit={edit} />
            <FormHistory data={data} setData={setData} />
          </form>
          <Preview src={preview} pdfUrl={pdfUrl} building={building} fileName={file} />
        </div>
      </main>
    </div>
  );
}
