// src/components/AboutMe.tsx

"use client";
import React, { FC } from 'react';
import Image from 'next/image'; // Importación clave para rendimiento

const AboutMe: FC = () => {
  const BORDER_COLOR = '#61dca3';
  const DARK_BG = '#080010';

  return (
    <section 
      className="relative w-full min-h-screen px-3 lg:px-6 py-6 flex items-center justify-center bg-black overflow-hidden"
      style={{ backgroundColor: DARK_BG }}
      id='sobreMi' // Añadir ID para navegación
    >
      <div 
        className="max-w-6xl w-full mx-auto p-6 lg:p-10 rounded-2xl relative z-10"
        style={{
          border: `2px solid ${BORDER_COLOR}`,
          boxShadow: `0 0 15px ${BORDER_COLOR}, inset 0 0 10px ${BORDER_COLOR}`,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          <div className="w-full lg:w-1/2 text-white">
            
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#61dca3] mb-4 leading-tight">
                Klibel Romero 
                <br />
                <span> Desarrollador Frontend</span> 
            </h1>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                Mi pasión por el desarrollo Frontend comenzó hace 3 años. Lo que más me motiva es la capacidad de crear y dar estilo a las interfaces, buscando siempre que el diseño sea tan impactante como funcional.
            </p>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                Mi enfoque se centra en transformar ideas en experiencias fluidas. He forjado mi experiencia a través de proyectos personales que van desde webs completas hasta aplicaciones móviles desarrolladas con React Native.
            </p>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Me especializo en todo lo que el usuario ve y toca. Descubre en mis proyectos cómo combino la estética con el código limpio.
            </p>

            <div className="flex flex-row justify-evenly gap-8 sm:gap-12 mt-8 border-t border-gray-700 pt-6">
                
                <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#61dca3] leading-none">
                        2+
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-200 text-center uppercase tracking-wider mt-1">
                        Años de Experiencia
                    </span>
                </div>

                <div className="flex flex-col items-center">
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
              className="w-full max-w-md rounded-xl p-4 relative border-2 border-[#61dca3] overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                boxShadow: `0 0 25px ${BORDER_COLOR}`,
                backgroundImage: `linear-gradient(rgba(97, 220, 163, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(97, 220, 163, 0.05) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#61dca3] mb-1">ID: KLIBEL_ROMERO</h3>
              <p className="text-xs sm:text-sm text-gray-400">// ROL: FRONTEND_DEV</p>

              {/* Zona de la Foto o Avatar: OPTIMIZACIÓN APLICADA */}
              <div className="flex justify-center relative z-10 transition-all shadow-md hover:scale-[1.15] duration-500">
                <Image 
                  src="/klibel.png" 
                  alt="Avatar de Klibel Romero" 
                  width={120} // Asume 120px, ajusta si es necesario
                  height={120} // Asume 120px, ajusta si es necesario
                  priority // <-- ¡CRÍTICO para el LCP!
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