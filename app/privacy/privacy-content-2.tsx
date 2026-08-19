import { Section } from "../legal/legal-section";

/** Second half of the privacy policy body — ads, accounts, cookies, contact. */
export function PrivacyContentPartTwo() {
  return (
    <>
      <Section title="Advertising">
        <p>
          This site may display ads served by Google AdSense and other third-party ad networks. These networks may
          use cookies and similar technologies to serve ads based on your prior visits to this and other websites.
        </p>
        <p>
          You can opt out of personalized advertising at{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-2"
          >
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a
            href="https://www.aboutads.info/choices"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-2"
          >
            aboutads.info/choices
          </a>
          .
        </p>
      </Section>

      <Section title="Accounts and personal data">
        <p>
          Inerate Tools does not require an account, login, or signup for any tool. We do not collect names, email
          addresses, or payment details, because nothing is sold and no account exists to create.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Beyond analytics and advertising cookies described above, we use a small amount of local storage to
          remember your theme preference (light/dark). This stays on your device and is never transmitted anywhere.
        </p>
      </Section>

      <Section title="Children's privacy">
        <p>This site is not directed at children under 13, and we do not knowingly collect their personal information.</p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If this policy changes, the &quot;Last updated&quot; date on this page will change accordingly. Continued
          use of the site after an update means you accept the revised policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about this policy? Reach us at{" "}
          <a href="mailto:hello@inerate.com" className="text-[var(--accent)] underline underline-offset-2">
            hello@inerate.com
          </a>
          .
        </p>
      </Section>
    </>
  );
}
