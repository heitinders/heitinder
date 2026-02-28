import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "@/styles/globals.css";
import Footer from "@/components/shared/Footer";
import JsonLd from "@/components/shared/JsonLd";
import Navbar from "@/components/shared/Navbar";
import Preloader from "@/components/shared/Preloader";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";
import PageTransition from "@/components/shared/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const faviconSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#04040a"/>
  <path d="M14 18h10v10h16V18h10v28H40V36H24v10H14V18z" fill="url(#g)"/>
</svg>
`);

const siteDescription =
  "Senior Frontend Engineer with 12+ years at Federal Reserve, BNY Mellon & Morgan Stanley. Building AI-powered SaaS products. Based in NYC/NJ, available globally.";

export const metadata: Metadata = {
  metadataBase: new URL("https://heitindersingh.dev"),
  title: "Heitinder Singh | Senior Frontend Engineer, NYC — AI & Enterprise",
  description: siteDescription,
  alternates: {
    canonical: "https://heitindersingh.dev",
  },
  icons: {
    icon: [{ url: `data:image/svg+xml,${faviconSvg}` }],
  },
  openGraph: {
    title: "Heitinder Singh | Senior Frontend Engineer, NYC",
    description: siteDescription,
    url: "https://heitindersingh.dev",
    siteName: "Heitinder Singh",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Heitinder Singh — Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heitinder Singh | Senior Frontend Engineer, NYC",
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#04040a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}>
        <JsonLd />
        <SmoothScrollProvider>
          <Preloader />
          <Navbar />
          <main className="gpu-scroll-layer">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
