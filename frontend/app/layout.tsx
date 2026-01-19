import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

import { client } from "@/utils/sanity/client";
import { NAVIGATION_QUERY } from "@/utils/sanity/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/context/EnquiryContext";

// ... existing imports

import SchemaMarkup from "@/components/SchemaMarkup";
import ViewTransitions from "@/components/ViewTransitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.studio-sr-construction.com'),
  title: {
    default: "S.R. Construction – Excellence in Construction",
    template: "%s | S.R. Construction"
  },
  description: "Premier construction company delivering high-quality residential, commercial, and industrial projects. Committed to safety, innovation, and excellence.",
  keywords: ["Construction", "Engineering", "Architecture", "Building", "Contractor", "India", "Infrastructure"],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.studio-sr-construction.com',
    siteName: 'S.R. Construction',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'S.R. Construction Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@srconstruction',
    creator: '@srconstruction',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Mumbai',
    // 'geo.position': '19.0760;72.8777', // Example coordinates
    // 'ICBM': '19.0760, 72.8777',
  }
};

// ... (existing helper imports)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await client.fetch(NAVIGATION_QUERY, { title: "Header Menu" });
  const footerData = await client.fetch(NAVIGATION_QUERY, { title: "Footer Menu" });

  // Fallback to empty array if no menu found
  const headerLinks = headerData?.items?.map((item: any) => ({
    label: item.label,
    href: item.type === 'internal' ? `/${item.internalLink?.slug || ''}` : item.externalUrl
  })) || [];

  const footerLinks = footerData?.items?.map((item: any) => ({
    label: item.label,
    href: item.type === 'internal' ? `/${item.internalLink?.slug || ''}` : item.externalUrl
  })) || [];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EnquiryProvider>
          <ViewTransitions />
          <SchemaMarkup />
          <Navbar links={headerLinks} />
          {children}
          <Footer links={footerLinks} />
          <ScrollToTop />
        </EnquiryProvider>
      </body>
    </html>
  );
}
