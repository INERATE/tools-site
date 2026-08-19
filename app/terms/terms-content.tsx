import { Section } from "../legal/legal-section";

/** Terms of Service body. */
export function TermsContent() {
  return (
    <>
      <Section title="Using the site">
        <p>
          Inerate Tools provides free, browser-based utilities for working with PDFs, images, and documents. By
          using this site, you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.
        </p>
      </Section>

      <Section title="No accounts, no warranty">
        <p>
          Every tool is provided &quot;as is,&quot; free of charge, with no signup required. We make a genuine effort
          to keep each tool correct and reliable, but we don&apos;t guarantee it will be error-free, uninterrupted, or
          fit for a specific purpose. Always keep your own backup of important files before editing them.
        </p>
      </Section>

      <Section title="Your files and content">
        <p>
          You retain full ownership of anything you process here. Since files are handled entirely in your browser
          and never uploaded (see our{" "}
          <a href="/privacy" className="text-[var(--accent)] underline underline-offset-2">
            Privacy Policy
          </a>
          ), we have no access to, and make no claim over, your content.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Don&apos;t use these tools to process content you don&apos;t have the legal right to handle, to violate
          another person&apos;s rights, or to attempt to abuse, overload, or reverse-engineer the site&apos;s
          infrastructure.
        </p>
      </Section>

      <Section title="Ads and third parties">
        <p>
          This site may show ads from Google AdSense or similar networks, and links to third-party sites. We aren&apos;t
          responsible for the content, policies, or practices of those third parties.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Inerate Tools and its operators are not liable for any indirect,
          incidental, or consequential damages arising from your use of the site, including data loss from files you
          process here.
        </p>
      </Section>

      <Section title="Changes">
        <p>We may update these terms as the site evolves. Continued use after a change means you accept the update.</p>
      </Section>

      <Section title="Contact">
        <p>
          Questions? Reach us at{" "}
          <a href="mailto:hello@inerate.com" className="text-[var(--accent)] underline underline-offset-2">
            hello@inerate.com
          </a>
          .
        </p>
      </Section>
    </>
  );
}
