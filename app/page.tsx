"use client";

// 1. Importa 'dynamic' de Next.js
import dynamic from 'next/dynamic';

// Componentes que NO son sospechosos (MyTechnologies, ProjectCard, Footer)
import AboutMe from './components/AboutMe';
import ProjectCard from './components/MyProjects';
import Footer from './components/Footer';
import MyTechnologies from './components/MyTechnologies'; 

// ----------------------------------------------------
// 2. Importaciones Dinámicas (Ignorando el Servidor)
// ----------------------------------------------------

// Componente sospechoso #1
const DynamicLetterGlitch = dynamic(
  () => import('./components/LetterGlitch'),
  { 
    ssr: false, // <-- ¡Esto detiene la renderización en el servidor!
    loading: () => <div>Loading...</div>, // Opcional
  }
);

// Componente sospechoso #2
const DynamicRouterWrapper = dynamic(
  () => import('./components/RouterWrapper'), 
  { ssr: false } 
);

// ----------------------------------------------------
// 3. Usa los componentes dinámicos en el JSX
// ----------------------------------------------------
export default function Home() {
  return (
    <main id='inicio' className="flex min-h-screen flex-col items-center justify-between">
      {/* Usamos el componente dinámico */}
      <DynamicLetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      
      {/* Usamos el componente dinámico */}
      <DynamicRouterWrapper 
        logoAlt='Icon'
        logoSrc='/Icon.png' 
      />
      
      {/* El resto de componentes... */}
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