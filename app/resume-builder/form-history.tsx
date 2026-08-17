"use client";

import { ADD, Card, Field } from "./fields";
import { emptyJob, emptySchool, type Resume } from "../lib/resume-types";

const HEAD = "text-[13px] font-semibold tracking-[0.1em] text-[var(--text-dim)] uppercase";

export function FormHistory({
  data,
  setData,
}: {
  data: Resume;
  setData: (fn: (d: Resume) => Resume) => void;
}) {
  const patchJob = (i: number, patch: Partial<Resume["jobs"][number]>) =>
    setData((d) => ({ ...d, jobs: d.jobs.map((j, n) => (n === i ? { ...j, ...patch } : j)) }));
  const patchSchool = (i: number, patch: Partial<Resume["schools"][number]>) =>
    setData((d) => ({ ...d, schools: d.schools.map((s, n) => (n === i ? { ...s, ...patch } : s)) }));

  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className={HEAD}>Experience</h2>
        {data.jobs.map((j, i) => (
          <Card
            key={i}
            title={`Role ${i + 1}`}
            onRemove={data.jobs.length > 1 ? () => setData((d) => ({ ...d, jobs: d.jobs.filter((_, n) => n !== i) })) : undefined}
          >
            <Field label="Title" value={j.role} onChange={(role) => patchJob(i, { role })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Company" value={j.company} onChange={(company) => patchJob(i, { company })} />
              <Field label="Dates" value={j.period} onChange={(period) => patchJob(i, { period })} placeholder="2022 — Present" />
            </div>
            <Field
              label="Bullets (one per line)"
              rows={4}
              value={j.bullets}
              onChange={(bullets) => patchJob(i, { bullets })}
              placeholder={"Shipped X, cutting Y by Z%\nLed the migration of…"}
            />
          </Card>
        ))}
        <button type="button" className={ADD} onClick={() => setData((d) => ({ ...d, jobs: [...d.jobs, emptyJob()] }))}>
          + Add a role
        </button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className={HEAD}>Education</h2>
        {data.schools.map((s, i) => (
          <Card
            key={i}
            title={`Entry ${i + 1}`}
            onRemove={data.schools.length > 1 ? () => setData((d) => ({ ...d, schools: d.schools.filter((_, n) => n !== i) })) : undefined}
          >
            <Field label="Qualification" value={s.degree} onChange={(degree) => patchSchool(i, { degree })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Institution" value={s.school} onChange={(school) => patchSchool(i, { school })} />
              <Field label="Dates" value={s.period} onChange={(period) => patchSchool(i, { period })} />
            </div>
          </Card>
        ))}
        <button
          type="button"
          className={ADD}
          onClick={() => setData((d) => ({ ...d, schools: [...d.schools, emptySchool()] }))}
        >
          + Add education
        </button>
      </section>
    </>
  );
}
