"use client";

import React, { useLayoutEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { PROJECTS_DATA, Project } from '../Data/Projects_Data'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin de forma segura para Next.js (SSR)
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParticlesProps {
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    className?: string;
}

const Particles = dynamic<ParticlesProps>(() => 
    import('./Particles').then((mod) => mod.Particles), {
        ssr: false, 
        loading: () => <div className="w-full h-full bg-transparent" />, 
});

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
            group flex flex-col overflow-hidden justify-between items-center w-full h-full rounded-xl shadow-2xl bg-gray-800/90 backdrop-blur-sm 
            transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[#61dca3]/50 
            border border-transparent hover:border-[#61dca3] focus:outline-none focus:ring-4 focus:ring-[#61dca3]/50 
        "
    >
        <div className="aspect-video overflow-hidden w-full">
            <img 
                src={project.imageUrl} 
                alt={`Vista previa de ${project.title}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/600x400/334155/FFFFFF?text=${project.title.replace(/\s/g, '+')}`;
                }}
            />
        </div>

        <div className="px-5 py-4 text-white w-full flex-grow">
            <h3 className="text-lg font-bold text-[#61dca3] mb-1">{project.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">{project.description}</p>
        </div>
            
        <div className="flex flex-wrap justify-center gap-2 px-5 pb-5 pt-3 border-t w-full border-gray-700">
            {project.technologies.map(tech => (
                <span 
                    key={tech} 
                    className="text-xs font-medium bg-slate-700/70 text-white px-3 py-1 rounded-full border border-[#61dca3] transition duration-300 hover:bg-slate-600/80"
                >
                    {tech}
                </span>
            ))}
        </div>
    </a>
);

export const MyProjects: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            
            // 1. Animación del título y subtítulo de la sección
            gsap.fromTo(".projects-header",
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".projects-header",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // 2. Animación fluida en cascada (stagger) para las tarjetas de proyectos
            const cards = gsap.utils.toArray(".project-card-animate");
            
            if (cards.length > 0) {
                // Estado inicial preventivo para evitar destellos visuales bruscos
                gsap.set(cards, { opacity: 0, y: 35, scale: 0.97 });

                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08, // Despliegue milimétrico dinámico uno tras otro
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".projects-grid",
                        start: "top 80%", // Se activa cuando la rejilla entra al 80% del viewport
                        toggleActions: "play none none none"
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert(); // Limpieza íntegra de ScrollTriggers
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="flex justify-center min-h-screen w-full bg-[#080010] overflow-hidden font-sans relative"
            id="proyectos"
        >
            <div className="absolute inset-0 z-0">
                <Particles 
                    particleCount={150}
                    particleSpread={15}
                    speed={0.1}
                    particleColors={['#8B5CF6', '#F97316', '#FFFFFF']} 
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.5}
                    particleBaseSize={150}
                    alphaParticles={true}
                    className="opacity-70"
                />
            </div>

            <div className="relative z-10 p-5 md:p-10 mx-auto max-w-7xl w-full flex flex-col items-center">
                
                {/* Cabecera con opacidad base inicial para la transición */}
                <header className="projects-header opacity-0 text-center mb-8 pt-4">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#61dca3] leading-tight">
                        Mis Proyectos
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-gray-300 mt-1">
                        Explora una selección de mis trabajos más recientes y las tecnologías utilizadas.
                    </p>
                </header>

                {/* Rejilla de proyectos identificada por clase para el Trigger global */}
                <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {PROJECTS_DATA.map(project => (
                        <div 
                            key={project.id} 
                            className="project-card-animate opacity-0 w-full"
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProjects;