import type { Metadata } from "next";
// Importación de las fuentes Geist
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

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
  // Título principal: El más importante para el SEO. Incluye nombre y habilidades clave.
  title: `${authorName}: Desarrollador Web React & Next.js | Portafolio Oficial`,
  
  // Descripción meta: Crucial para el snippet que aparece en los resultados de búsqueda.
  description: 
    "Portafolio oficial de Klibel. Desarrollador Full-Stack especializado en la creación de interfaces de usuario modernas, aplicaciones con React, Next.js, y Tailwind CSS. Experto en diseño UI/UX y rendimiento web.",

  // Ícono de la página
  icons: '/Ico.png',

  // Palabras clave para la relevancia del contenido (opcional, pero útil)
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

  // URL Canónica: Ayuda a evitar problemas de contenido duplicado y establece la versión oficial.
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },

  // Open Graph (OG) - Metadatos para compartir en redes sociales (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: `${authorName}: Desarrollador React & Next.js | Portafolio Oficial`,
    description: "Portafolio de Klibel. Especialista en rendimiento con React, Next.js y diseño de interfaces UI/UX.",
    url: baseUrl,
    siteName: `${authorName}'s Code`,
    locale: 'es_ES', // Define el idioma para los crawlers
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`, // **DEBES CREAR ESTA IMAGEN (1200x630)**
        width: 1200,
        height: 630,
        alt: `Portafolio de ${authorName} - Desarrollador React y Next.js`,
      },
    ],
  },
  
  // Twitter Cards - Metadatos específicos para X (Twitter)
  twitter: {
    card: 'summary_large_image',
    title: `${authorName}: Desarrollador React & Next.js | Portafolio Oficial`,
    description: "Desarrollador Full-Stack Klibel. Experticia en React, Next.js, y desarrollo web de alto rendimiento.",
    images: [`${baseUrl}/og-image.jpg`],
    // Si tienes un handle de Twitter, descomenta y agrégalo:
    // creator: '@TuTwitterHandle',
  },
};

// ----------------------------------------------------
// 4. COMPONENTE ROOTLAYOUT
// ----------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Importante: lang="es" le dice al navegador y a Google que el idioma es español.
    <html lang="es"> 
      <body
        // Clases de fuente y antialiasing
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}