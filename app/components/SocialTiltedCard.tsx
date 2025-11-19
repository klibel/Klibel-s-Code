// src/components/ProfileCoverCard.tsx
'use client'; 
import { useRef, useState, FC, MouseEvent } from 'react';
// Asegúrate de usar 'framer-motion' si estás en un proyecto moderno de React/Next.js
import { motion, useMotionValue, useSpring } from 'framer-motion'; 
import { Instagram, Code } from 'lucide-react';

// --- CONFIGURACIÓN DE ESTILOS Y COLORES ---
const NEON_COLOR_PRIMARY = '#61dca3'; // Verde Neón
const NEON_COLOR_ACCENT = '#32734a'; // Tono más oscuro de Neón

const BORDER_COLOR = NEON_COLOR_PRIMARY;
// Sombra Neón potente
const NEON_GLOW = `0 0 15px ${BORDER_COLOR}, 0 0 30px rgba(97, 220, 163, 0.7)`;

interface SpringConfig { damping: number; stiffness: number; mass: number; }
interface ProfileCoverCardProps {
  imageSrc: string; 
  altText?: string;
  captionText?: string; // Nombre
  roleText?: string;   // Rol
  maxSize?: string;
  rotateAmplitude?: number;
  instagramHandle?: string;
}
const springValues: SpringConfig = { damping: 15, stiffness: 120, mass: 1.5 };

const ProfileCoverCard: FC<ProfileCoverCardProps> = ({
  imageSrc = '/klibel.png',
  altText = 'Klibel Romero Profile',
  captionText = 'KLIBEL ROMERO',
  roleText = 'FRONTEND DEVELOPER',
  maxSize = '400px', // Usado como límite máximo
  rotateAmplitude = 12,
  instagramHandle = '@klibel.romero'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion Values (Tilt)
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  // --- Lógica de Mouse ---
  function handleMouse(e: MouseEvent<HTMLDivElement>): void {
    const currentRef = ref.current;
    if (!currentRef) return;
    const rect = currentRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter(): void {
    scale.set(1.05);
  }

  function handleMouseLeave(): void {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }
  
  // --- Estilos CSS ---
  const innerCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.4)', 
    border: `2px solid ${BORDER_COLOR}`,
    boxShadow: NEON_GLOW,
    position: 'relative',
    overflow: 'hidden',
  };

  const handleInstagramClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      // 🔑 AJUSTE CLAVE: w-full y -mx-2 para anular padding del padre en móvil
      className="relative w-[85%] sm:w-[250px] lg:w-[350px] xl:w-[400px] max-h-80 mx-2 [perspective:1000px] flex items-center justify-center cursor-grab rounded-xl transition-all" 
      style={{
        maxWidth: maxSize, 
        height: maxSize, // Mantiene la relación de aspecto 1:1 (cuadrada)
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* 1. CONTENEDOR 3D (APLICA LA ROTACIÓN Y ESCALA) */}
      <motion.div
        // 🔑 AJUSTE CLAVE: w-full h-full para maximizar la visualización 3D
        className="relative [transform-style:preserve-3d] w-full h-full transition-all rounded-xl"
        style={{ rotateX, rotateY, scale }}
      >
        {/* 2. CONTENEDOR VISUAL (La CARD en sí) */}
        <motion.div
          className="will-change-transform flex flex-col justify-between items-center h-full w-full p-2 rounded-xl" 
          style={innerCardStyle}
        > 
          {/* Brillos Flotantes */}
          <motion.div 
            className="absolute w-3 h-3 rounded-full bg-[#61dca3] blur-xs animate-pulse"
            animate={{ x: [50, -50, 50], y: [-50, 50, -50] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ zIndex: 1, top: '10%', left: '10%' }}
          />

          {/* ------------------ CONTENIDO PRINCIPAL ------------------ */}
          
          <div className='relative z-20 flex flex-col items-center justify-center h-full text-center'>
            
            {/* Imagen de Perfil GRANDE (w-full max-w) */}
            <div 
                className="relative w-full max-w-[220px] max-h-[220px] sm:w-[80%] sm:h-[80%] aspect-square rounded-xl overflow-hidden" 
                style={{ 
                    transform: 'translateZ(30px)',
                    boxShadow: `0 0 15px ${BORDER_COLOR}, inset 0 0 10px ${BORDER_COLOR}`,
                    border: `4px solid ${BORDER_COLOR}`
                }}
            >
                <img src={imageSrc} alt={altText} className="w-full h-full object-cover" />
            </div>
            
            {/* Título y Rol (Tamaño de fuente responsive) */}
            <h1 className='text-sm sm:text-base font-extrabold text-white uppercase mt-1' style={{ transform: 'translateZ(20px)' }}>
                {captionText}
            </h1>
            <p className='text-xs sm:text-sm font-mono text-[#61dca3]' style={{ transform: 'translateZ(20px)' }}>
                <Code size={18} className='inline'/> {roleText}
            </p>
            
            {/* Botón Instagram */}
            <div className='mt-2' style={{ transform: 'translateZ(10px)' }}>
                <a 
                  href={`https://www.instagram.com/${instagramHandle?.replace('@', '')}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-center px-4 py-1 text-sm rounded-lg font-bold text-white transition-all shadow-md hover:scale-[1.02]'
                  style={{
                    backgroundColor: NEON_COLOR_ACCENT,
                    boxShadow: `0 0 10px ${NEON_COLOR_PRIMARY}`,
                    border: `1px solid ${NEON_COLOR_PRIMARY}`
                  }}
                >
                  <Instagram size={16} className='mr-2' />
                  PERFIL
                </a>
            </div>
          </div>
          
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProfileCoverCard;