"use client";

import { Field } from "./fields";
import type { Resume } from "../lib/resume-types";

export function FormBasics({
  data,
  edit,
}: {
  data: Resume;
  edit: (patch: Partial<Resume>) => void;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[13px] font-semibold tracking-[0.1em] text-[var(--text-dim)] uppercase">Details</h2>
      <Field label="Full name" value={data.name} onChange={(name) => edit({ name })} placeholder="Priya Sharma" />
      <Field
        label="Headline"
        value={data.headline}
        onChange={(headline) => edit({ headline })}
        placeholder="Senior Frontend Engineer"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Email" value={data.email} onChange={(email) => edit({ email })} />
        <Field label="Phone" value={data.phone} onChange={(phone) => edit({ phone })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Location" value={data.location} onChange={(location) => edit({ location })} />
        <Field label="Links" value={data.links} onChange={(links) => edit({ links })} placeholder="github.com/you" />
      </div>
      <Field
        label="Summary"
        rows={4}
        value={data.summary}
        onChange={(summary) => edit({ summary })}
        placeholder="Two or three lines on what you do and what you care about."
      />
      <Field
        label="Skills"
        rows={2}
        value={data.skills}
        onChange={(skills) => edit({ skills })}
        placeholder="TypeScript · React · Accessibility"
      />
    </section>
  );
}
