import type { Metadata } from "next";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { Footer } from "../components/footer";
import { Section } from "../legal/legal-section";
import { TOOLS } from "../components/tool-list";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who builds Inerate Tools and why every tool runs entirely inside your browser — no uploads, no accounts, no file retention.",
  alternates: { canonical: "/about" },
};

const LIVE = TOOLS.filter((t) => t.live).length;

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--text)] sm:text-[40px]">About Inerate Tools</h1>
        <p className="mt-4 text-[15px] leading-[1.75] text-[var(--text-dim)]">
          Inerate Tools is a collection of {LIVE} document and image utilities that run entirely inside your web
          browser. Merging a PDF, compressing a photo, or pulling text out of a scan happens on your own machine —
          the file is never sent anywhere.
        </p>

        <Section title="Why we built it">
          <p>
            Most free online document tools work the same way: you hand your file to a stranger&apos;s server, it comes
            back changed, and you have no idea what happened in between or how long a copy of it sticks around. For a
            holiday photo that hardly matters. For a signed contract, a passport scan, a salary slip, or an exam form
            with your signature on it, it matters a great deal.
          </p>
          <p>
            Browsers can now do this work themselves. WebAssembly, Canvas, and modern JavaScript PDF libraries are
            fast enough that the server was never the necessary part — it was just the easy part for whoever built the
            site. So we built the version where the file stays with you.
          </p>
        </Section>

        <Section title="How it actually works">
          <p>
            When you drop a file onto one of our tools, it is read by JavaScript running in your browser tab. The
            processing libraries — <span className="text-[var(--text)]">pdf-lib</span>,{" "}
            <span className="text-[var(--text)]">pdf.js</span>, <span className="text-[var(--text)]">Tesseract</span>,
            and others — are downloaded once and then run locally. The result is handed back to you as a download
            straight from your own device.
          </p>
          <p>
            You can verify this yourself: open your browser&apos;s developer tools, switch to the Network tab, and use
            any tool. You will not see your file leave. You can also disconnect from the internet after the page
            loads — the tools keep working.
          </p>
          <p>
            The honest exception is our AI features, which are labelled as such on the page. Where a tool needs a
            model that cannot run locally, we say so before you use it.
          </p>
        </Section>

        <Section title="What we do not do">
          <p>
            We do not require an account to use the tools. We do not store your files, because we never receive them.
            We do not watermark output or lock features behind a page-count limit designed to frustrate you into
            paying.
          </p>
          <p>
            We do run privacy-respecting analytics on page visits and we do show advertising, which is what keeps the
            tools free. Neither has access to your documents. The{" "}
            <a className="text-[var(--accent)] hover:underline" href="/privacy">privacy policy</a> covers this in
            detail.
          </p>
        </Section>

        <Section title="Who is behind this">
          <p>
            Inerate Tools is built and maintained by Inerate, a small independent software studio. Our open-source
            work lives at{" "}
            <a className="text-[var(--accent)] hover:underline" href="https://github.com/inerate" target="_blank" rel="noopener noreferrer">
              github.com/inerate
            </a>
            .
          </p>
          <p>
            If something is broken, slow, or wrong, we would genuinely rather hear about it than not — the{" "}
            <a className="text-[var(--accent)] hover:underline" href="/contact">contact page</a> is the fastest way to
            reach us.
          </p>
        </Section>
      </main>
      <div className="px-6">
        <Footer />
      </div>
    </div>
  );
}
