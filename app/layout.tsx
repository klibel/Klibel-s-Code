// app/layout.tsx

import type { Metadata } from "next";
// Importación de las fuentes Geist
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

// ----------------------------------------------------
// 1. CONFIGURACIÓN DE FUENTES
// ----------------------------------------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ----------------------------------------------------
// 2. CONSTANTES DE SEO CLAVE
// ----------------------------------------------------
// IMPORTANTE: Reemplaza esta URL con el dominio real de tu portafolio cuando lo publiques.
const baseUrl = "https://klibels-code.vercel.app"; 
const authorName = "Klibel";

// ----------------------------------------------------
// 3. OBJETO METADATA OPTIMIZADO PARA SEO
// ----------------------------------------------------
export const metadata: Metadata = {
  // Título principal
  title: `${authorName}: Desarrollador Web React & Next.js | Portafolio Oficial`,
  
  // Descripción meta
  description: 
    "Portafolio oficial de Klibel. Desarrollador Full-Stack especializado en la creación de interfaces de usuario modernas, aplicaciones con React, Next.js, y Tailwind CSS. Experto en diseño UI/UX y rendimiento web.",

  // 🔑 CAMBIO CLAVE: Usa la propiedad 'verification' para Google
  verification: {
    // Next.js genera automáticamente la etiqueta <meta name="google-site-verification" ...>
    google: '-eTzResm8vxiYRCAaWNJA6C5uHMhb-BAul24KKCrNSI',
  },

  // Ícono de la página
  icons: '/Ico.png',

  // Palabras clave
  keywords: [
    "Klibel",
    "Portafolio de Klibel",
    "Desarrollador React",
    "Desarrollador Next.js",
    "Full-Stack Developer",
    "Diseño UI/UX",
    "Tailwind CSS",
  ],

  // Autoría
  authors: [{ name: authorName, url: baseUrl }],

  // URL Canónica
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },

  // Open Graph (OG)
  openGraph: {
    title: `${authorName}: Desarrollador React y React Native | Portafolio Oficial`,
    description: "Portafolio de Klibel. Especialista en rendimiento con React, Next.js y diseño de interfaces UI/UX.",
    url: baseUrl,
    siteName: `${authorName}'s Code`,
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`, 
        width: 1200,
        height: 630,
        alt: `Portafolio de ${authorName} - Desarrollador React y Next.js`,
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: `${authorName}: Desarrollador React & Next.js | Portafolio Oficial`,
    description: "Desarrollador Full-Stack Klibel. Experticia en React, Next.js, y desarrollo web de alto rendimiento.",
    images: [`${baseUrl}/og-image.jpg`],
  },
};

// ----------------------------------------------------
// 4. COMPONENTE ROOTLAYOUT (SIN <head> manual)
// ----------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ya no es necesaria la etiqueta <head> aquí, Next.js la inyecta
    <html lang="es"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}