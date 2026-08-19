import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "./components/smooth-scroll";
import { SearchProvider } from "./components/search-context";
import { SearchOverlay } from "./components/search-overlay";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.inerate.com"),
  title: "Inerate Tools — Free PDF, Image & Document Utilities",
  description:
    "Merge PDFs, convert images, build resumes, and more — fast, private, browser-based tools. No upload, no wait.",
  openGraph: {
    title: "Inerate Tools — Free PDF, Image & Document Utilities",
    description: "Fast, private, browser-based tools. No upload, no wait.",
    url: "https://tools.inerate.com",
  },
};

// Runs before first paint — no FOUC. Keep in sync with app/lib/theme.ts's `resolve()`.
const THEME_BOOT = `(function(){try{var s=localStorage.getItem('theme');var t=s==='auto'?(matchMedia('(prefers-color-scheme: dark)').matches?'iridescence':'daylight'):(s||'daylight');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','daylight');}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          id="theme-boot"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_BOOT }}
        />
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L1D7SPN13Y"
        />
        <script
          id="ga-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-L1D7SPN13Y');`,
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        <SearchProvider>
          {children}
          <SearchOverlay />
        </SearchProvider>
      </body>
    </html>
  );
}
