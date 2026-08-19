"use client";

import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { ToolHead } from "../components/tool-head";
import { ToolWindow } from "../components/tool-window";
import { ResumeIcon } from "../components/icons/resume-icon";
import { FormBasics } from "./form-basics";
import { FormHistory } from "./form-history";
import { Preview } from "./preview";
import { useResume } from "./use-resume";

export default function ResumeBuilderPage() {
  const { data, edit, setData, preview, pdfUrl, building, error } = useResume();
  const file = `${(data.name.trim() || "resume").replace(/\s+/g, "-").toLowerCase()}.pdf`;

  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <ToolHead
          title="Résumé Builder"
          busy={building}
          icon={(active) => <ResumeIcon active={active} size={24} />}
          blurb="Fill it in and watch the PDF update as you type. It is generated in your browser — nothing is uploaded, and no account is needed."
        />

        {error && (
          <p role="alert" className="mb-4 text-[13.5px] font-medium text-[#ff8fa3]">
            {error}
          </p>
        )}

        <ToolWindow path="resume-builder">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <form className="flex flex-col gap-7" onSubmit={(e) => e.preventDefault()}>
              <FormBasics data={data} edit={edit} />
              <FormHistory data={data} setData={setData} />
            </form>
            <Preview src={preview} pdfUrl={pdfUrl} building={building} fileName={file} />
          </div>
        </ToolWindow>
      </main>
    </div>
  );
}
