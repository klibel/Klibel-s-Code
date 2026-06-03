"use client";
import React, { FC, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin de forma segura en entornos Next.js (SSR)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutMe: FC = () => {
  const BORDER_COLOR = '#61dca3';
  const DARK_BG = '#080010';
  
  // Referencia al contenedor principal para los selectores de GSAP
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Crear un contexto de GSAP limitado a esta sección
    const ctx = gsap.context(() => {
      
      // 1. Animación de la tarjeta contenedora principal al llegar con el scroll
      gsap.fromTo(".main-container", 
        { opacity: 0, scale: 0.95, y: 40 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".main-container",
            start: "top 80%", // Se activa cuando el contenedor está al 80% de la pantalla
            toggleActions: "play none none none" // Juega una vez al bajar y no se reinicia
          }
        }
      );

      // 2. Animación en cascada para los textos (se dispara cuando el texto entra en vista)
      gsap.fromTo(".text-reveal",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".text-reveal",
            start: "top 85%", // Disparador específico para los textos
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Animación para los contadores / estadísticas (se dispara cuando aparecen las métricas)
      gsap.fromTo(".stat-box",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".border-t", // Se dispara usando la línea divisoria superior como referencia
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 4. Animación elástica para la tarjeta ID derecha (se dispara de forma independiente al verla)
      gsap.fromTo(".id-card",
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".id-card",
            start: "top 80%", // Disparador exclusivo para la tarjeta cyberpunk
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert(); // Limpieza automática de todos los ScrollTriggers al desmontar
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen px-3 lg:px-6 py-6 flex items-center justify-center bg-black overflow-hidden"
      style={{ backgroundColor: DARK_BG }}
      id='sobreMi'
    >
      <div 
        className="main-container max-w-6xl w-full mx-auto p-6 lg:p-10 rounded-2xl relative z-10"
        style={{
          border: `2px solid ${BORDER_COLOR}`,
          boxShadow: `0 0 15px ${BORDER_COLOR}, inset 0 0 10px ${BORDER_COLOR}`,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          <div className="w-full lg:w-1/2 text-white">
            
            <h1 className="text-reveal text-lg sm:text-xl lg:text-2xl font-bold text-[#61dca3] mb-4 leading-tight">
                Klibel Romero 
                <br />
                <span> Desarrollador Frontend</span> 
            </h1>
            
            <p className="text-reveal text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Cuento con experiencia en el desarrollo frontend, enfocándome en interfaces modernas, accesibles y de alto rendimiento para web y aplicaciones móviles.
            </p>

            <p className="text-reveal text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Trabajo con tecnologías actuales como React y React Native, aplicando buenas prácticas para convertir conceptos en productos digitales funcionales y bien estructurados.
            </p>

            <p className="text-reveal text-sm sm:text-base text-gray-300 leading-relaxed">
              Mi objetivo es ofrecer experiencias de usuario claras, atractivas y eficientes, combinando diseño, usabilidad y solidez técnica.
            </p>

            <div className="flex flex-row justify-evenly gap-8 sm:gap-12 mt-8 border-t border-gray-700 pt-6">
                
                <div className="stat-box flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#61dca3] leading-none">
                        2+
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-200 text-center uppercase tracking-wider mt-1">
                        Años de Experiencia
                    </span>
                </div>

                <div className="stat-box flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#61dca3] leading-none">
                        5+
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-200 text-center uppercase tracking-wider mt-1">
                        Proyectos Personales
                    </span>
                </div>
            </div>
          </div>
          
          <div 
            className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px]"
          >
            <div 
              className="id-card w-full max-w-md rounded-xl p-4 relative border-2 border-[#61dca3] overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                boxShadow: `0 0 25px ${BORDER_COLOR}`,
                backgroundImage: `linear-gradient(rgba(97, 220, 163, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(97, 220, 163, 0.05) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#61dca3] mb-1">ID: KLIBEL_ROMERO</h3>
              <p className="text-xs sm:text-sm text-gray-400">// ROL: FRONTEND_DEV</p>

              <div className="flex justify-center relative z-10 transition-all shadow-md hover:scale-[1.15] duration-500">
                <Image 
                  src="/klibel.png" 
                  alt="Avatar de Klibel Romero" 
                  width={120} 
                  height={120} 
                  priority 
                  className="w-30 h-30 my-4 rounded-full border-2 border-[#61dca3] object-cover" 
                />
              </div>

              <div className="border-t border-b border-gray-700 py-3">
    
                <p className="text-xs text-gray-200">
                    <span className="text-[#61dca3]">STATUS:</span> ONLINE
                </p>
                
                <p className="text-xs text-gray-200 mb-1">
                    <span className="text-[#61dca3]">CORE:</span> REACT / JS / TS
                </p>

                <p className="text-xs text-gray-200 mb-1">
                    <span className="text-[#61dca3]">STYLE:</span> TAILWIND / HTML / CSS / BOOTSTRAP
                </p>

                <p className="text-xs text-gray-200">
                    <span className="text-[#61dca3]">PLATFORMS:</span> RN / GIT / EXPO / AI
                </p>
              </div>
            
              <div className="absolute inset-0 pointer-events-none transform animate-pulse opacity-20" 
                style={{ 
                  background: 'linear-gradient(to top, transparent 0%, rgba(97, 220, 163, 0.5) 50%, transparent 100%)',
                  zIndex: 0,
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutMe;