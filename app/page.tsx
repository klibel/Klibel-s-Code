"use client";

import AboutMe from './components/AboutMe';
import LetterGlitch from './components/LetterGlitch';
import RouterWrapper from './components/RouterWrapper'; 
import ProjectCard from './components/MyProjects';
import Footer from './components/Footer';

// Importa el componente de tecnologías
import MyTechnologies from './components/MyTechnologies'; 

export default function Home() {
  return (
    <main id='inicio' className="flex min-h-screen flex-col items-center justify-between">
      <LetterGlitch
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