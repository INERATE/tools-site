export type Job = { role: string; company: string; period: string; bullets: string };
export type School = { degree: string; school: string; period: string };

export type Resume = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  links: string;
  summary: string;
  jobs: Job[];
  schools: School[];
  skills: string;
};

export const emptyJob = (): Job => ({ role: "", company: "", period: "", bullets: "" });
export const emptySchool = (): School => ({ degree: "", school: "", period: "" });

/** Prefilled so the preview is never a blank sheet on first load. */
export const SAMPLE: Resume = {
  name: "Priya Sharma",
  headline: "Senior Frontend Engineer",
  email: "priya@example.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  links: "github.com/priya · priya.dev",
  summary:
    "Frontend engineer with six years building design systems and high-traffic web apps. " +
    "I care about performance budgets, accessibility, and shipping small changes often.",
  jobs: [
    {
      role: "Senior Frontend Engineer",
      company: "Northwind Labs",
      period: "2022 — Present",
      bullets:
        "Led the migration of a 400-component library to design tokens, cutting CSS payload by 38%.\n" +
        "Set an INP budget and a CI gate that blocks regressions before merge.\n" +
        "Mentored four engineers through their first accessibility audits.",
    },
    {
      role: "Frontend Engineer",
      company: "Tessellate",
      period: "2019 — 2022",
      bullets:
        "Rebuilt the checkout flow, lifting completion 12% on mobile.\n" +
        "Introduced visual regression tests across 30 critical screens.",
    },
  ],
  schools: [{ degree: "B.E. Computer Science", school: "PES University", period: "2015 — 2019" }],
  skills: "TypeScript · React · Next.js · CSS architecture · Accessibility · Playwright · Performance",
};
