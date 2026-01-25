import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

import { client } from "@/utils/sanity/client";
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/utils/sanity/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/context/EnquiryContext";

export const revalidate = 5; // Revalidate every 5 seconds for better sync

// ... existing imports

import SchemaMarkup from "@/components/SchemaMarkup";
import ViewTransitions from "@/components/ViewTransitions";
import NextTopLoader from 'nextjs-toploader';
import Loader from "@/components/Loader";

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
  const headerData = await client.fetch(NAVIGATION_QUERY, { id: "header-menu" });
  const footerData = await client.fetch(NAVIGATION_QUERY, { id: "footer-menu" });
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);

  // Fallback to empty array if no menu found
  const mapLink = (item: any) => {
    if (item.type === 'internal') {
      const slug = item.internalLink?.slug || '';
      // If it's a generic page (like about-us), it lives at root /slug
      // If user creates a page doc type for these, it works.
      // If it returns null slug, handle gracefully.
      return slug ? `/${slug}` : '#';
    }
    if (item.type === 'section') return `/#${item.sectionId}`; // Root + anchor
    return item.externalUrl || '#';
  };

  // NAVIGATION: Fetched from Sanity CMS ("Header Menu").
  // The code below applies TEMPORARY overrides to match specific user requests.
  // To give CMS full control, remove 'finalHeaderLinks' logic and use 'headerLinks' directly.
  const headerLinks = headerData?.items?.map((item: any) => ({
    label: item.label,
    href: mapLink(item),
  })) || [];

  // PRE-FILTER: User requested to remove Clients, Testimonials, Industries (Optional / Clean up later if CMS is fully correct)
  // For now, we trust the CMS "Header Menu" completely if you removed the overrides.
  // Converting back to pure CMS source:
  const finalHeaderLinks = headerLinks;

  const footerLinks = footerData?.items?.map((item: any) => ({
    label: item.label,
    href: mapLink(item),
  })) || [];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EnquiryProvider>
          <NextTopLoader color="#f97316" showSpinner={false} height={3} shadow={false} />
          <Loader />
          <ViewTransitions />
          <SchemaMarkup />
          <Navbar links={finalHeaderLinks} logo={siteSettings?.logo || "S.R. Construction"} />
          {children}
          <div id="footer-breadcrumb-slot" style={{ width: '100%', position: 'relative', zIndex: 99 }}></div>
          <Footer links={footerLinks} data={siteSettings} />
          <ScrollToTop />
        </EnquiryProvider>
      </body>
    </html>
  );
}
