import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "@/styles/globals.css";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { Header, Footer } from "@/components/layout";
import { StickyMobileCTA } from "@/components/sections";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Prep It List It Sell It | Home Improvement Services Santa Clarita",
    template: "%s | Prep It List It Sell It",
  },
  description:
    "Family-owned home improvement and listing prep services in Santa Clarita Valley. Licensed & insured. Small jobs = Big return. Response within 1-24 hours.",
  keywords: [
    "home improvement Santa Clarita",
    "listing prep services",
    "pre-sale home repairs",
    "property improvements",
    "Santa Clarita Valley contractor",
    "Valencia home services",
  ],
  authors: [{ name: "Prep It List It Sell It Services" }],
  creator: "Prep It List It Sell It Services",
  metadataBase: new URL("https://prepitlistitsellit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prepitlistitsellit.com",
    siteName: "Prep It List It Sell It",
    title: "Prep It List It Sell It | Home Improvement Services Santa Clarita",
    description:
      "Family-owned home improvement and listing prep services in Santa Clarita Valley. Small jobs = Big return.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prep It List It Sell It | Home Improvement Services",
    description: "Family-owned listing prep services in Santa Clarita Valley.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo/2.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo/2.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${sourceSerif.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Skip to content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy focus:font-bold"
        >
          Skip to content
        </a>

        <Header />

        {/* Main content */}
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>

        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
