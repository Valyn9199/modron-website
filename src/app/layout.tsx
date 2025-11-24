import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { EnhancedStructuredData } from "@/components/enhanced-structured-data";
import { ErrorBoundary } from "@/components/error-boundary";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MODRON | Sovereign AI Infrastructure Australia | GPU Clusters",
  description: "Australia's first on-premises AI supercomputers. Immersion-cooled GPU clusters (H200, GB300, RTX 6000) with 48-hour deployment. 100% Australian data sovereignty. Solar-powered infrastructure.",
  keywords: ["Australia sovereign AI infrastructure", "Australian-built GPU clusters", "Enterprise AI infrastructure Australia", "Immersion-cooled GPUs Australia", "Solar-powered AI compute", "48-hour AI deployment Australia", "Australian data sovereignty", "GPU cluster deployment Sydney", "enterprise AI hosting Melbourne"],
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
    'geo.country': 'Australia',
    'geo.state': 'New South Wales',
    'DC.coverage': 'Australia',
    'DC.identifier': 'MODRON-Australia-AI-Infrastructure',
    'serviceArea': 'Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra',
    'coverage': 'Australia-wide',
    'application-name': 'MODRON',
    'apple-mobile-web-app-title': 'MODRON',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#fbff52',
    'theme-color': '#fbff52',
  },
  verification: {
    google: 'your-google-verification-code',
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
    title: "MODRON | Sovereign AI Infrastructure Australia | GPU Clusters",
    description: "Australia's first on-premises AI supercomputers. Immersion-cooled GPU clusters (H200, GB300, RTX 6000) with 48-hour deployment. 100% Australian data sovereignty.",
    url: 'https://www.modron.com',
    siteName: 'MODRON',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MODRON - Enterprise AI Compute Infrastructure',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'MODRON - Sustainable AI Infrastructure',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_AU',
    type: 'website',
    countryName: 'Australia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MODRON | Sovereign AI Infrastructure Australia | GPU Clusters',
    description: 'Australia\'s first on-premises AI supercomputers. Immersion-cooled GPU clusters (H200, GB300, RTX 6000) with 48-hour deployment. 100% Australian data sovereignty.',
    images: ['/og-image.jpg'],
    creator: '@modron_ai',
    site: '@modron_ai',
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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon-16x16.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon', 
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <EnhancedStructuredData />
        {/* Critical CSS for hero overlay - must be visible from first paint */}
        <style dangerouslySetInnerHTML={{
          __html: `
            div[data-overlay="gradient"],
            div[data-overlay="radial"],
            .hero-overlay-no-fade {
              opacity: 1 !important;
              transition: none !important;
              animation: none !important;
              visibility: visible !important;
            }
          `
        }} />
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
