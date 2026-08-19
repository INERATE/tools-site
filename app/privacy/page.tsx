import type { Metadata } from "next";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { Footer } from "../components/footer";
import { PrivacyContentPartOne } from "./privacy-content-1";
import { PrivacyContentPartTwo } from "./privacy-content-2";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Inerate Tools handles your files and data: nothing is uploaded, what analytics and ads collect, and your rights.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "August 19, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--text)] sm:text-[40px]">Privacy Policy</h1>
        <p className="mt-3 text-[13px] text-[var(--text-dim)]">Last updated: {UPDATED}</p>
        <PrivacyContentPartOne />
        <PrivacyContentPartTwo />
      </main>
      <div className="px-6">
        <Footer />
      </div>
    </div>
  );
}
