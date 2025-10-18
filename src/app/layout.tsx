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
  title: "MODRON | Enterprise AI Compute Infrastructure | Sustainable GPU Hosting",
  description: "High-availability enterprise AI compute infrastructure with SLA-backed hosting. Sustainable GPU rentals with immersion cooling, solar power, and global availability for enterprise workloads.",
  keywords: ["Enterprise AI compute infrastructure", "High-availability GPU hosting", "SLA-backed AI compute", "Sustainable AI infrastructure", "Enterprise-grade GPU rentals", "Immersion cooled GPUs", "Solar powered AI compute", "Global AI compute infrastructure", "Green AI cloud for enterprises", "Rent RTX 4090 for AI training", "Enterprise GPU hosting for US Europe Asia", "AI compute Australia", "Enterprise GPU hosting NSW", "Sustainable data centre Sydney", "MODRON", "AI training", "machine learning", "data center"],
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
    'application-name': 'MODRON',
    'apple-mobile-web-app-title': 'MODRON',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#1f2937',
    'theme-color': '#1f2937',
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
    title: "MODRON | Enterprise AI Compute Infrastructure | Sustainable GPU Hosting",
    description: "High-availability enterprise AI compute infrastructure with SLA-backed hosting. Sustainable GPU rentals with immersion cooling, solar power, and global availability.",
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
    title: 'MODRON | Enterprise AI Compute Infrastructure | Sustainable GPU Hosting',
    description: 'High-availability enterprise AI compute infrastructure with SLA-backed hosting. Sustainable GPU rentals with immersion cooling, solar power, and global availability.',
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
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
        {/* Preload hero poster with proper crossorigin attribute */}
        <link rel="preload" as="image" href="/hero-poster.jpg" crossOrigin="anonymous" />
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
