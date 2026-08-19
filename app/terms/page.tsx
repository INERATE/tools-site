import type { Metadata } from "next";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { Footer } from "../components/footer";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Inerate Tools' free, browser-based PDF, image, and document tools.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "August 19, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--text)] sm:text-[40px]">Terms of Service</h1>
        <p className="mt-3 text-[13px] text-[var(--text-dim)]">Last updated: {UPDATED}</p>
        <TermsContent />
      </main>
      <div className="px-6">
        <Footer />
      </div>
    </div>
  );
}
