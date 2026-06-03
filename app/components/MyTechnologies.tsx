"use client";

import React, { 
    useRef, useMemo, useState, memo, FC, 
    ReactNode, useLayoutEffect
} from 'react';
import {
    SiReact, SiTailwindcss, SiBootstrap, SiGit, SiGithub, SiVscodium, 
    SiCanva, SiJavascript, SiTypescript, SiHtml5, SiCss, SiVite, SiGreensock
} from "react-icons/si";
import { Phone, Zap } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin de GSAP de forma segura
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* -------------------- UTILS -------------------- */

function hexToRgba(hex: string, alpha: number = 1): string {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const int = parseInt(h, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const cx = (...parts: (string | false | null | undefined)[]) =>
    parts.filter(Boolean).join(' ');

/* -------------------- DATA -------------------- */

interface LogoLoopItem {
    node: ReactNode;
    title: string;
    color: string;
}

const LOOP_SKILLS: LogoLoopItem[] = [
  { node: <SiJavascript size={30} color="#F0DB4F" />, title: "JavaScript", color: "#F0DB4F" },
  { node: <SiTypescript size={30} color="#007ACC" />, title: "TypeScript / TSX", color: "#007ACC" },
  { node: <SiReact size={30} color="#61DAFB" />, title: "React (Web)", color: "#61DAFB" },
  { node: <SiTailwindcss size={30} color="#06B6D4" />, title: "Tailwind CSS", color: "#06B6D4" },
  { node: <SiGreensock size={30} color="#82D726" />, title: "GSAP", color: "#82D726" },
  { node: <SiGit size={30} color="#F05032" />, title: "Git", color: "#F05032" },
  { node: <SiGithub size={30} color="#FFFFFF" />, title: "GitHub", color: "#FFFFFF" },
  { node: <SiVscodium size={30} color="#007ACC" />, title: "VS Code", color: "#007ACC" },
  { node: <SiCanva size={30} color="#00C4CC" />, title: "Canva", color: "#00C4CC" },
  { node: <Phone size={30} color="#61DAFB" />, title: "React Native / Expo", color: "#61DAFB" },
  { node: <div className='h-[30px] flex items-center justify-center font-bold text-xl text-white bg-teal-500 rounded-sm px-1'>AI</div>, title: "Inteligencia Artificial", color: "#2DD4BF" },
  { node: <SiHtml5 size={30} color="#E34F26" />, title: "HTML5", color: "#E34F26" },
  { node: <SiCss size={30} color="#264de4" />, title: "CSS3", color: "#264de4" },
  { node: <SiVite size={30} color="#646CFF" />, title: "Vite", color: "#646CFF" },
];

interface GridSkillItem {
    name: string;
    icon: ReactNode;
    color: string;
    description: string;
    textColor?: string;
}

const ALL_SKILLS: GridSkillItem[] = [
  { name: "HTML5", icon: <SiHtml5 size={30} color="#E34F26" />, color: "#E34F26", description: "Dominio de marcado semántico, accesibilidad y estructuras modernas." },
  { name: "CSS3", icon: <SiCss size={30} color="#264de4" />, color: "#264de4", description: "Estilizado avanzado, Flexbox, Grid Layout, y animaciones CSS." },
  { name: "JavaScript / JS", icon: <SiJavascript size={30} color="#F0DB4F" />, color: "#F0DB4F", description: "Lógica de cliente y manipulación de DOM, ES6+." },
  { name: "TypeScript / TSX", icon: <SiTypescript size={30} color="#007ACC" />, color: "#007ACC", description: "Implementación de tipado estático para código más robusto y escalable." },
  { name: "React (Web)", icon: <SiReact size={30} color="#61DAFB" />, color: "#61DAFB", description: "Construcción de interfaces de usuario escalables (Hooks, Context)." },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={30} color="#06B6D4" />, color: "#06B6D4", description: "Utilidad-first CSS para prototipado rápido, diseños responsivos y estéticos." },
  { name: "GSAP", icon: <SiGreensock size={30} color="#82D726" />, color: "#82D726", description: "Creación de animaciones e interacciones web avanzadas de alto rendimiento (ScrollTrigger)." },
  { name: "Bootstrap", icon: <SiBootstrap size={30} color="#7952B3" />, color: "#7952B3", description: "Experiencia en el framework CSS más popular para grids, componentes UI y temas." },
  { name: "Vite", icon: <SiVite size={30} />, color: "#646CFF", description: "Bundler ultrarrápido para React y TypeScript." },
  { name: "Git", icon: <SiGit size={30} color="#F05032" />, color: "#F05032", description: "Control de versiones distribuido, manejo avanzado de ramas y fusiones." },
  { name: "GitHub", icon: <SiGithub size={30} color="#FFFFFF" />, color: "#FFFFFF", textColor: "text-black", description: "Plataforma de colaboración, pull requests, revisiones de código y CI/CD." }, 
  { name: "VS Code", icon: <SiVscodium size={30} color="#007ACC" />, color: "#007ACC", description: "Uso avanzado del editor, atajos, extensiones y configuración de entorno." },
  { name: "Canva", icon: <SiCanva size={30} color="#00C4CC" />, color: "#00C4CC", description: "Creación de prototipos visuales rápidos, recursos gráficos y diseño UI/UX básico." },
  { name: "IA / API", icon: <Zap size={30} />, color: "#2DD4BF", description: "Integración de modelos de inteligencia artificial y APIs REST." },
  { name: "React Native / Expo", icon: <Phone size={30} color="#2DD4BF" />, color: "#2DD4BF", description: "Desarrollo de apps móviles nativas para iOS y Android desde JavaScript/React." },
];

/* -------------------- ELECTRIC BORDER -------------------- */

const ElectricBorder: FC<{ children: ReactNode; color: string }> = memo(({ children, color }) => {
    return (
        <div className="relative rounded-xl transition-transform duration-300 hover:scale-[1.03]">
            <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                    border: `1.5px solid ${color}`,
                    boxShadow: `0 0 12px ${color}`
                }}
            />
            <div className="relative">
                {children}
            </div>
        </div>
    );
});

/* -------------------- LOGO LOOP -------------------- */

const LogoLoop: FC<{ logos: LogoLoopItem[] }> = ({ logos }) => (
    <div className="overflow-hidden relative">
        <div className="flex w-max animate-scroll gap-10">
            {[...logos, ...logos].map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-sm"
                    style={{
                        background: hexToRgba(item.color, 0.1),
                        border: `1px solid ${hexToRgba(item.color, 0.2)}`
                    }}
                >
                    {item.node}
                    <span className="text-sm text-slate-300">{item.title}</span>
                </div>
            ))}
        </div>

        <style jsx global>{`
            @keyframes scroll {
                from { transform: translate3d(0,0,0); }
                to { transform: translate3d(-50%,0,0); }
            }
            .animate-scroll {
                animation: scroll 35s linear infinite;
                will-change: transform;
            }
        `}</style>
    </div>
);

/* -------------------- MAIN COMPONENT -------------------- */

const MisTecnologias: FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    // ⚡ INTERACCIÓN FLUIDA CON GSAP SCROLLTRIGGER
    useLayoutEffect(() => {
        if (!gridRef.current) return;

        const cards = gridRef.current.children;

        // Establecer estado inicial invisible antes de que comience la animación
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

        const animation = gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06, // Retraso encadenado milimétrico entre cartas
            ease: 'power3.out',
            scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%', // Comienza cuando la rejilla entra al 85% del viewport
                toggleActions: 'play none none none'
            }
        });

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white px-3 py-8 w-full" id="tecnologias">
            
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <h2 className="text-3xl font-extrabold text-[#61dca3] mb-4">
                    Tecnologías
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Como desarrollador Frontend, me enfoco en crear experiencias fluidas utilizando el ecosistema moderno de React.
                </p>
            </div>

            <div className="mb-16 border-y border-[#61dca3]/50 py-4">
                <LogoLoop logos={LOOP_SKILLS} />
            </div>

            <div
                ref={gridRef}
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {ALL_SKILLS.map((skill) => (
                    <div key={skill.name}>
                        <ElectricBorder color={skill.color}>
                            <div className="p-5 min-h-40 bg-slate-800/60 hover:bg-slate-700/70 rounded-xl transition-colors backdrop-blur-sm">
                                <div className="flex items-center mb-3">
                                    <div
                                        className="p-3 mr-3 rounded-full"
                                        style={{
                                            background: hexToRgba(skill.color, 0.2),
                                            color: skill.color
                                        }}
                                    >
                                        {skill.icon}
                                    </div>
                                    <h3 className="text-sm font-bold uppercase" style={{ color: skill.color }}>
                                        {skill.name}
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-300">
                                    {skill.description}
                                </p>
                            </div>
                        </ElectricBorder>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MisTecnologias;