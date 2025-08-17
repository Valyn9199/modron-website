import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MODRON - Sustainable AI Infrastructure | Green GPU Computing",
  description: "Australia's green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready. Sustainable AI computing with 60% carbon reduction.",
  keywords: ["AI infrastructure", "green computing", "GPU cloud", "sustainable technology", "immersion cooling", "solar powered", "Australia", "MODRON"],
  authors: [{ name: "MODRON" }],
  creator: "MODRON",
  publisher: "MODRON",
  category: 'Technology',
  classification: 'AI Infrastructure',
  other: {
    'geo.region': 'AU-NSW',
    'geo.placename': 'Sydney',
    'geo.position': '-33.8688;151.2093',
    'ICBM': '-33.8688, 151.2093',
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.modron.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MODRON - Sustainable AI Infrastructure",
    description: "Australia's green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready.",
    url: 'https://www.modron.com',
    siteName: 'MODRON',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MODRON - Sustainable AI Infrastructure',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MODRON - Sustainable AI Infrastructure',
    description: 'Australia\'s green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready.',
    images: ['/og-image.jpg'],
    creator: '@modron_ai',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Preload hero poster to speed up first paint */}
        <link rel="preload" as="image" href="/hero-poster.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
