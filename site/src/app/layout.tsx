import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BRAND } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kathiariswapnil.github.io/hireos";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.descriptor}`,
    template: `%s — ${BRAND.name}`,
  },
  description: BRAND.metaDescription,
  keywords: [
    "agentic hiring",
    "AI recruiting orchestration",
    "hiring policy engine",
    "enterprise HR AI",
    "ATS orchestration layer",
    "AI governance hiring",
  ],
  /* Card artwork comes from the opengraph-image route, not a static file. */
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.descriptor}`,
    description: BRAND.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.descriptor}`,
    description: BRAND.metaDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
