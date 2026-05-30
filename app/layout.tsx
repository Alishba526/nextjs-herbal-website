import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "../components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://growzixnatural.com"),
  title: {
    default: "Growzix Natural — 100% Pure Organic & Natural Herbal Products",
    template: "%s | Growzix Natural",
  },
  description: "Growzix Natural is your trusted store for premium herbal products. Shop organic herbal hair care, natural skincare, and herbal hair products for hair growth. Pakistan's best herbal store for chemical-free solutions.",
  keywords: [
    "herbal products",
    "organic herbal products",
    "natural herbal products",
    "herbal hair care products",
    "herbal skin care products",
    "herbal products store",
    "herbal hair products for hair growth",
    "best herbal hair care products",
    "herbal products for hair fall",
    "organic hair dye products",
    "natural beauty products",
    "herbal wellness products",
    "essential oils for natural hair growth",
    "natural hair oil",
    "natural oils that help hair growth",
    "natural hair growth oil",
    "natural oils for hair growth",
    "best oil for natural hair",
    "hair growth oil for natural hair",
    "all natural hair oil",
    "best hair growth oil for natural hair",
    "Growzix Natural",
    "Pakistan herbal store"
  ],
  alternates: {
    canonical: "https://growzixnatural.com/",
  },
  authors: [{ name: "Growzix Natural Team" }],
  creator: "Growzix Natural",
  publisher: "Growzix Natural",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Growzix Natural — Pure Natural Herbal Products",
    description: "Shop 100% organic herbal teas, oils, and skincare. Pakistan's leading herbal store for natural beauty and wellness.",
    url: "https://growzixnatural.com",
    siteName: "Growzix Natural",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Growzix Natural - Pure Herbal Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growzix Natural — Organic Herbal Solutions",
    description: "Discover the power of nature with Growzix Natural. Premium herbal hair care and skincare products.",
    images: ["/assets/logo.png"],
    creator: "@GrowzixNatural",
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
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
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
       <link rel="icon" href="/assets/logo.png" />
       <link rel="apple-touch-icon" href="/assets/logo.png" />
       <meta
         name="google-site-verification"
         content="N-dQ4BCgU5LJhbscIMPh5D7E0oIMpFAoIXKuMkDWtpc"
         />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}