import { PDFDocument, StandardFonts } from "pdf-lib";
import { Writer } from "./pdf-writer";
import type { Resume } from "./resume-types";

const has = (s: string) => s.trim().length > 0;
const join = (parts: string[]) => parts.filter(has).join("  ·  ");

/** Renders a Resume to a print-ready A4 PDF. Empty fields are skipped, not left blank. */
export async function buildResume(r: Resume): Promise<Blob> {
  const doc = await PDFDocument.create();
  doc.setTitle(has(r.name) ? `${r.name} — Résumé` : "Résumé");
  const fonts = {
    body: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  const w = new Writer(doc, fonts);

  w.text(has(r.name) ? r.name : "Your name", { size: 23, bold: true, color: 0.08, lead: 1.15 });
  w.text(r.headline, { size: 11.5, color: 0.38 });
  w.gap(3);
  w.text(join([r.email, r.phone, r.location]), { size: 9.5, color: 0.42 });
  w.text(r.links, { size: 9.5, color: 0.42 });

  if (has(r.summary)) {
    w.heading("Summary");
    w.text(r.summary);
  }

  const jobs = r.jobs.filter((j) => has(j.role) || has(j.company) || has(j.bullets));
  if (jobs.length) {
    w.heading("Experience");
    jobs.forEach((j, i) => {
      if (i) w.gap(7);
      w.row(join([j.role, j.company]) || "Role", j.period);
      w.gap(2);
      for (const line of j.bullets.split("\n").filter(has)) {
        w.text(`•  ${line.trim()}`, { size: 10, indent: 6, color: 0.2 });
      }
    });
  }

  const schools = r.schools.filter((s) => has(s.degree) || has(s.school));
  if (schools.length) {
    w.heading("Education");
    schools.forEach((s, i) => {
      if (i) w.gap(5);
      w.row(join([s.degree, s.school]) || "Qualification", s.period);
    });
  }

  if (has(r.skills)) {
    w.heading("Skills");
    w.text(r.skills, { size: 10 });
  }

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}
