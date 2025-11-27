// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

// FONT CONFIG
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO CONSTANTS
const baseUrl = "https://klibels-code.vercel.app";
const authorName = "Klibel";

// METADATA SEO OPTIMIZADO
export const metadata: Metadata = {
  title: `${authorName}: Desarrollador Frontend React & React Native | Portafolio Oficial`,
  description:
    "Portafolio oficial de Klibel. Desarrollador Frontend especializado en la creación de interfaces de usuario modernas, aplicaciones con React, React Native y Tailwind CSS. Experto en diseño UI/UX y rendimiento web.",

  verification: {
    google: '-eTzResm8vxiYRCAaWNJA6C5uHMhb-BAul24KKCrNSI',
  },

  // FAVICONS PARA GOOGLE, ANDROID Y iOS
  icons: {
    icon: [
      { url: '/Ico.png', type: 'image/png', sizes: '32x32' },
      { url: '/Ico.png', type: 'image/png', sizes: '192x192' }
    ],
    apple: [
      { url: '/Ico.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
  },

  themeColor: "#000000",

  keywords: [
    "Klibel's Code",
    "Klibel",
    "Klibels Code",
    "Portafolio de Klibel",
    "Desarrollador React",
    "Desarrollador Next.js",
    "Full-Stack Developer",
    "Diseño UI/UX",
    "Tailwind CSS",
  ],

  authors: [{ name: authorName, url: baseUrl }],

  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: `${authorName}: Desarrollador React y React Native | Portafolio Oficial`,
    description:
      "Portafolio de Klibel. Especialista en rendimiento con React, React Native y diseño de interfaces UI/UX.",
    url: baseUrl,
    siteName: `${authorName}'s Code`,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `Portafolio de ${authorName} - Desarrollador Frontend React y React Native`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${authorName}: Desarrollador Frontend React y React Native | Portafolio Oficial`,
    description:
      "Desarrollador Frontend Klibel. Experticia en React, React Native y desarrollo web de alto rendimiento y android.",
    images: [`${baseUrl}/og-image.jpg`],
  },

  // SCHEMA LOGO Google Knowledge Panel
  other: {
    'script:logo-schema': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Klibel's Code",
      "url": baseUrl,
      "logo": `${baseUrl}/Ico.png`,
    }),
  },
};

// ROOT LAYOUT
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
