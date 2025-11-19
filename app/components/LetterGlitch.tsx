"use client";
import React, { useRef, useEffect, FC } from 'react';
import SocialTiltedCard from './SocialTiltedCard';
import { Instagram, Download } from 'lucide-react';

// --- Tipos e Interfaces ---
interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
}
interface RgbColor { r: number; g: number; b: number; }
interface LetterState { char: string; color: string; targetColor: string; colorProgress: number; }
interface GridDimensions { columns: number; rows: number; }

// --- CONFIGURACIÓN Y FUNCIONES DEL GLITCH ---
const fontSize = 16;
const charWidth = 10;
const charHeight = 20;

const getRandomChar = (characters: string[]): string => characters[Math.floor(Math.random() * characters.length)];
const getRandomColor = (glitchColors: string[]): string => glitchColors[Math.floor(Math.random() * glitchColors.length)];

// Funciones de utilidad (Se asumen completas)
const hexToRgb = (hex: string): RgbColor | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};
const interpolateColor = (start: RgbColor, end: RgbColor, factor: number): string => {
    const result: RgbColor = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
};
const calculateGrid = (width: number, height: number): GridDimensions => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
};


const PortfolioCover: FC<LetterGlitchProps> = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<LetterState[]>([]);
  const grid = useRef<GridDimensions>({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef<number>(Date.now());
  const lettersAndSymbols: string[] = Array.from(characters);
  
  // Implementación completa de las funciones del Glitch
  const initializeLetters = (columns: number, rows: number): void => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from<unknown, LetterState>({ length: totalLetters }, () => ({
      char: getRandomChar(lettersAndSymbols),
      color: getRandomColor(glitchColors),
      targetColor: getRandomColor(glitchColors),
      colorProgress: 1
    }));
  };
  
  const drawLetters = (): void => {
    const ctx = context.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || letters.current.length === 0) return;
    
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height); 
    
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';
    
    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const resizeCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = context.current;
    if (ctx) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    
    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };
  
  const updateLetters = (): void => {
    if (!letters.current || letters.current.length === 0) return;
    
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
    
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      const letter = letters.current[index];
      
      if (!letter) continue;
      
      letter.char = getRandomChar(lettersAndSymbols);
      letter.targetColor = getRandomColor(glitchColors);

      if (!smooth) {
        letter.color = letter.targetColor;
        letter.colorProgress = 1;
      } else {
        letter.colorProgress = 0;
      }
    }
  };
  
  const handleSmoothTransitions = (): void => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05; 
        if (letter.colorProgress > 1) letter.colorProgress = 1;
        
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        } else {
            letter.color = letter.targetColor;
            letter.colorProgress = 1;
          }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };
  
  const animate = (): void => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      if (!smooth) {
        drawLetters();
      }
      lastGlitchTime.current = now;
    }
    
    if (smooth) {
      handleSmoothTransitions();
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    context.current = canvas.getContext('2d');
    if (!context.current) return;
    
    resizeCanvas();
    animate();
    
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
        resizeCanvas();
        animate(); 
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, glitchColors, characters]);
  
  
  return (
    <div className="relative w-full min-h-screen h-full bg-black overflow-hidden">
      
      {/* 1. FONDO - CANVAS (Efecto LetterGlitch) */}
      {/* 🔑 Este es el elemento que genera el fondo dinámico. */}
      <canvas ref={canvasRef} className="block w-full h-full absolute top-0 left-0 z-0" />
      
      {/* 2. Capa de Contenido Principal (Responsive Layout) */}
      <main className='absolute top-0 left-0 w-full  min-h-screen h-full p-4 my-4 flex flex-col lg:flex-row items-center justify-center z-20'>
        
        {/* 2.1 Columna Izquierda (Texto e Info) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:text-left px-5 lg:ml-16 xl:ml-28">
          
          <div>
            {/* Logo y Título */}
            <div className="mb-4 flex items-center justify-center lg:justify-start">
              <div className='w-18 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-14 xl:w-30 xl:h-20 flex items-center mr-2'>
                <img 
                  src="/Icon.png" 
                  alt="Klibel's Code Logo" 
                  className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-30 xl:h-30 drop-shadow-neon"
                  style={{ filter: `drop-shadow(0 0 5px #61dca3)` }}
                />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-extrabold text-[#61dca3] uppercase tracking-wide leading-tight">
                Klibel's <span className="text-gray-200">CODE</span>
              </h1>
            </div>
            
            {/* Bienvenida y Descripción */}
            <h2 className="text-base lg:text-lg xl:text-xl font-semibold text-gray-100 tracking-tight">
              Bienvenido a mi Portafolio Digital
            </h2>
            <p className="text-sm lg:text-base xl:text-lg text-gray-400 max-w-lg mb-4">
              Soy un apasionado por el desarrollo Frontend de webs y apps Android.
              <span className='hidden md:inline mx-1'> 
                Me especializo en transformar ideas creativas en experiencias digitales fluidas y atractivas usando tecnologías modernas como React. 
              </span> 
              Explora mi código y mis proyectos.
            </p>
            
          </div>
            {/* BOTÓN DESCARGAR CV */}
            <a
              href="/C.V.pdf"
              download
              className="flex items-center justify-center px-6 py-3 text-sm font-bold rounded-full text-black bg-[#61dca3] hover:bg-[#86f0c6] transition-all duration-300 shadow-md shadow-[#61dca3]/50 uppercase tracking-wider"
            >
              <Download size={18} className='mr-2' />
              Descargar CV
            </a>
        </div>
        
        {/* 2.2 Columna Derecha (Tilted Card) */}
        <div className="w-full lg:w-1/2 flex justify-center mt-5 lg:mt-0">
          <SocialTiltedCard
            imageSrc="/klibel.png"
            captionText="KLIBEL ROMERO"
            altText="Hexagonal Profile ID"
            instagramHandle="@klibel.romero"
            maxSize="500px" 
          />
        </div> 
      </main>

      {/* 3. Capas de Viñeta (Añaden profundidad y oscuridad en los bordes) */}
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_100%)] z-10"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.5)_150%)] z-10"></div>
      )}
      
    </div>
  );
};

export default PortfolioCover;