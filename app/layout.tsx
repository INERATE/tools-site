import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { SmoothScroll } from "./components/smooth-scroll";
import { SearchProvider } from "./components/search-context";
import { SearchOverlay } from "./components/search-overlay";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://tools.inerate.com";
const SITE_TITLE = "Inerate Tools — Free PDF, Image & Document Utilities";
const SITE_DESCRIPTION =
  "Merge, split, compress, edit, and convert PDFs, manipulate images, build resumes, and more — private, 100% browser-based document utilities with zero uploads.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Inerate Tools" },
  description: SITE_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Inerate Tools",
  },
  keywords: [
    "free pdf tools",
    "merge pdf online",
    "compress pdf free",
    "pdf to word converter",
    "online image editor",
    "no upload pdf tools",
    "private pdf editor",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    siteName: "Inerate Tools",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Inerate Tools" }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icon.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600&family=Cinzel:wght@600&family=Dancing+Script:wght@600&family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Fira+Code:wght@400;600&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&family=Lato:wght@400;700&family=Lora:ital,wght@0,400;0,700;1,400&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Oswald:wght@500;700&family=Pacifico&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Raleway:wght@500;700&family=Roboto+Mono:wght@400;600&family=Roboto:ital,wght@0,400;0,700;1,400&family=Rozha+One&family=Tiro+Devanagari+Hindi:ital@0;1&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-L1D7GPN13Y"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L1D7GPN13Y', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
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
