import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Public URL of the deployed site (used for social-share cards).
const SITE_URL = "https://hxbade.github.io/architecture-portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hong'Nakii Bade — Architecture Portfolio",
    template: "%s",
  },
  description:
    "Architecture, design and art by Hong'Nakii Bade — Project Architect in Port Moresby, Papua New Guinea. Selected commercial, institutional and community projects across PNG.",
  keywords: [
    "architect",
    "architecture",
    "Papua New Guinea",
    "Port Moresby",
    "Hong'Nakii Bade",
    "project architect",
    "portfolio",
  ],
  authors: [{ name: "Hong'Nakii Bade" }],
  openGraph: {
    title: "Hong'Nakii Bade — Architecture Portfolio",
    description:
      "Project Architect in Port Moresby, Papua New Guinea. Selected commercial, institutional and community projects across PNG.",
    url: SITE_URL,
    siteName: "Hong'Nakii Bade — Architecture Portfolio",
    images: [
      {
        url: `${SITE_URL}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Hong'Nakii Bade — Architecture Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hong'Nakii Bade — Architecture Portfolio",
    description:
      "Project Architect in Port Moresby, Papua New Guinea.",
    images: [`${SITE_URL}/og.jpg`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Set theme before paint to avoid a flash of the wrong color scheme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
        {/* Cloudflare Web Analytics (privacy-friendly, no cookies). */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c370c7c222704dde97b6590d13b087b5"}'
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
