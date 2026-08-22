import type { Metadata } from "next";
import { AmbientBlob } from "../components/ambient-blob";
import { Nav } from "../components/nav";
import { Dock } from "../components/dock";
import { Footer } from "../components/footer";
import { Section } from "../legal/legal-section";
import { ContactForm } from "../components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Inerate Tools team — bug reports, tool requests, privacy questions, and business enquiries.",
  alternates: { canonical: "/contact" },
};

// Set up forwarding for this address before shipping — it is the public contact
// point and is what an ad-network or app-store reviewer will try first.
const EMAIL = "support@inerate.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--text)] sm:text-[40px]">Contact us</h1>
        <p className="mt-4 text-[15px] leading-[1.75] text-[var(--text-dim)]">
          We read everything that comes in and usually reply within two working days.
        </p>

        <ContactForm />

        <Section title="Prefer your own mail client?">
          <p>
            For anything at all —{" "}
            <a className="text-[var(--accent)] hover:underline" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <p>
            Please do not attach the document you were working on. Our tools never receive your files and we would
            rather keep it that way. A description of the problem, the tool you were using, and your browser and
            operating system tells us far more than the file would.
          </p>
        </Section>

        <Section title="Bug reports and tool requests">
          <p>
            If a tool produced a broken file, hung on a large document, or looked wrong on your device, tell us the
            tool name, roughly how big the file was, and what you expected to happen. That is almost always enough for
            us to reproduce it.
          </p>
          <p>
            Missing a tool you need? Ask. A good share of what is on the site exists because somebody wrote in and
            asked for it.
          </p>
          <p>
            You can also open an issue at{" "}
            <a className="text-[var(--accent)] hover:underline" href="https://github.com/inerate" target="_blank" rel="noopener noreferrer">
              github.com/inerate
            </a>{" "}
            if you would prefer it in public.
          </p>
        </Section>

        <Section title="Privacy and data questions">
          <p>
            Since nothing you process is ever uploaded, we hold no copy of your documents to hand over or delete. For
            questions about the analytics and advertising we do run, or to exercise a data right, email the address
            above with &ldquo;Privacy&rdquo; in the subject line and read the{" "}
            <a className="text-[var(--accent)] hover:underline" href="/privacy">privacy policy</a> first — it likely
            answers you faster than we can.
          </p>
        </Section>

        <Section title="Business and press">
          <p>
            Partnership, sponsorship, licensing, or press enquiries go to the same address with
            &ldquo;Business&rdquo; in the subject line.
          </p>
        </Section>
      </main>
      <div className="px-6">
        <Footer />
      </div>
    </div>
  );
}
