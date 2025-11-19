"use client";

import dynamic from 'next/dynamic';
import AboutMe from './components/AboutMe';
import LetterGlitch from './components/LetterGlitch';
import RouterWrapper from './components/RouterWrapper'; 
import ProjectCard from './components/MyProjects';
import Footer from './components/Footer';

import MyTechnologies from './components/MyTechnologies'; 
const DynamicLetterGlitch = dynamic(
  () => import('./components/LetterGlitch'),
  { 
    ssr: false, // <-- ¡Solución!
    loading: () => <div className="text-xl">Cargando efecto...</div>, // Opcional: mostrar un estado de carga
  }
);

export default function Home() {
  return (
      <main id='inicio' className="flex min-h-screen flex-col items-center justify-between">
        {/* 3. Usa el componente dinámico */}
        <DynamicLetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
        <RouterWrapper 
          logoAlt='Icon'
          logoSrc='/Icon.png' 
        />
        
      <section className='w-full' id='sobreMi'>
        <AboutMe/>
      </section>
      <section className='w-full' id='tecnologias'>
        <MyTechnologies/>
      </section>
      <section className='w-full' id='proyectos'>
        <ProjectCard/>
      </section>
      <section className='w-full' id='contacto'>
        <Footer/>
      </section>
    </main>
  );
}