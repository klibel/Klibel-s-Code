"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// ----------------------------------------------------
// 1. Carga Dinámica de Componentes de Cabecera (Interactivos/Pesados)
// ----------------------------------------------------

// Componente 1: Glitch / Efectos visuales (SSR deshabilitado por su naturaleza interactiva)
const DynamicLetterGlitch = dynamic(
  () => import('./components/LetterGlitch'),
  { 
    ssr: false, 
    // Usamos un div vacío para evitar un desfase de diseño (layout shift)
    loading: () => <div className="min-h-[50vh] w-full" />, 
  }
);

// Componente 2: Wrapper principal / Router (SSR deshabilitado)
const DynamicRouterWrapper = dynamic(
  () => import('./components/RouterWrapper'), 
  { ssr: false } 
);

// ----------------------------------------------------
// 2. Carga Dinámica de Componentes Secundarios (Sección Abajo)
// ----------------------------------------------------

// Componente 3: Sobre Mí (Se carga cuando la página principal ya es interactiva)
const DynamicAboutMe = dynamic(() => import('./components/AboutMe'), {
    loading: () => <div className="h-64 bg-gray-900/50 animate-pulse w-full"></div>,
});

// Componente 4: Tecnologías (Carga diferida)
const DynamicMyTechnologies = dynamic(() => import('./components/MyTechnologies'), {
    loading: () => <div className="h-96 bg-gray-800/50 animate-pulse w-full"></div>,
});

// Componente 5: Proyectos (Carga diferida)
const DynamicProjectCard = dynamic(() => import('./components/MyProjects'), {
    loading: () => <div className="h-[700px] bg-gray-900/50 animate-pulse w-full"></div>,
});

// Componente 6: Footer (El menos prioritario)
const DynamicFooter = dynamic(() => import('./components/Footer'), {
    loading: () => <div className="h-40 bg-gray-950/50 w-full"></div>,
});

// ----------------------------------------------------
// 3. HOME PRINCIPAL
// ----------------------------------------------------

export default function Home() {
  return (
    <main id='inicio' className="flex min-h-screen flex-col items-center justify-between">
      
      {/* ⚡️ Contenido ATF (Above The Fold) - Prioridad Máxima */}
      <DynamicLetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      
      <DynamicRouterWrapper 
        logoAlt='Icon'
        logoSrc='/Icon.png' 
      />
      
      {/* ⚙️ Contenido Debajo del Fold - Carga Diferida */}
      
      <section className='w-full' id='sobreMi'>
        <DynamicAboutMe/>
      </section>
      
      <section className='w-full' id='tecnologias'>
        <DynamicMyTechnologies/>
      </section>
      
      <section className='w-full' id='proyectos'>
        <DynamicProjectCard/>
      </section>
      
      <section className='w-full' id='contacto'>
        <DynamicFooter/>
      </section>
    </main>
  );
}