// MyProjects.tsx

"use client";

import React from 'react';
import dynamic from 'next/dynamic';
// Asegúrate de que esta importación sea correcta
import { PROJECTS_DATA, Project } from '../Data/Projects_Data'; 

// --- 1. Define o Importa las Props de Particles ---
// Lo ideal es que estas se exporten de Particles.tsx e importen aquí, 
// pero las definimos para asegurar la corrección del error.
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

// --- 2. Carga Dinámica con Tipado (Solución del error de sobrecarga) ---
const Particles = dynamic<ParticlesProps>(() => 
    // ✅ CORRECCIÓN: Si exportaste como 'export const Particles', usa mod.Particles.
    // Si la exportación es 'export default Particles', usa mod.default.
    // Mantenemos mod.Particles según el código anterior.
    import('./Particles').then((mod) => mod.Particles), {
        ssr: false, 
        loading: () => <div className="w-full h-full bg-transparent" />, 
});

// --- Project Card Component (Sin cambios) ---
interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
            group flex flex-col overflow-hidden justify-between items-center w-full rounded-xl shadow-2xl bg-gray-800/90 backdrop-blur-sm 
            transform transition-all duration-500 hover:scale-[1.05] hover:shadow-[#61dca3]/50 
            border border-transparent hover:border-[#61dca3] focus:outline-none focus:ring-4 focus:ring-[#61dca3]/50 
        "
    >
        <div className="aspect-video overflow-hidden">
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

        <div className="px-5 py-2 text-white">
            <h3 className="text-lg font-bold text-[#61dca3]">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{project.description}</p>
        </div>
            
        <div className="flex flex-wrap justify-center gap-2 px-5 pb-5 pt-2 border-t w-full border-gray-700">
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

// --- Main App Component (MyProjects View) ---
export const MyProjects: React.FC = () => {
    return (
        <div className="flex justify-center min-h-screen w-full bg-[#080010] overflow-hidden font-sans">
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

            <div className="relative z-10 p-5 md:p-10 mx-auto">
                <header className="text-center mb-8 pt-4">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#61dca3] leading-tight">
                        Mis Proyectos
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-gray-300 mt-1">
                        Explora una selección de mis trabajos más recientes y las tecnologías utilizadas.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                    {PROJECTS_DATA.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProjects;