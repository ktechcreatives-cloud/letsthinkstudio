import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingContactWidget } from '@/components/layout/FloatingContactWidget';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import { StructuredData } from '@/components/seo/StructuredData';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#FF572D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://letsthinkstudio.com'),
  title: {
    default: "Let's Think Studio — Good ideas deserve great design.",
    template: "%s | Let's Think Studio",
  },
  description: "An independent creative studio that helps businesses build memorable brands and communicate through impactful design and digital experiences.",
  keywords: [
    "creative studio",
    "brand identity",
    "graphic design",
    "website development",
    "packaging design",
    "digital marketing",
    "creative agency",
    "Let's Think Studio"
  ],
  authors: [{ name: "Let's Think Studio" }],
  creator: "Let's Think Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://letsthinkstudio.com",
    title: "Let's Think Studio — Good ideas deserve great design.",
    description: "We build brands, design digital experiences, and create meaningful communication for ambitious businesses.",
    siteName: "Let's Think Studio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Let's Think Studio — Creative Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Think Studio — Good ideas deserve great design.",
    description: "We build brands, design digital experiences, and create meaningful communication for ambitious businesses.",
    creator: "@letsthinkstudio",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen bg-[#F5F5F3] text-[#171819] font-sans antialiased selection:bg-[#FF572D] selection:text-white flex flex-col justify-between">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <FloatingContactWidget />
      </body>
    </html>
  );
}
