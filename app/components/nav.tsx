'use client'; 

import React, { FC, useState, useLayoutEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react'; 
import { gsap } from 'gsap';

// --- Interfaces ---
interface NavItem {
  href: string; 
  label: string;
}

interface ModernNavProps {
  logoSrc: string; 
  logoAlt: string; 
}

// --- Colores y Valores Fijos ---
const BORDER_COLOR = '#61dca3';
const NAV_BG_DESKTOP = 'rgba(0, 0, 0, 0.85)'; 
const NAV_BG_MOBILE = 'rgba(0, 0, 0, 0.98)'; 
const TEXT_COLOR = '#f0f0f0';
const ACTIVE_COLOR = BORDER_COLOR;

const PORTFOLIO_ITEMS: NavItem[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobreMi', label: 'Sobre mí' },
  { href: '#tecnologias', label: 'Tecnologías' }, 
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
];

const ModernNav: FC<ModernNavProps> = ({ logoSrc, logoAlt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio'); 

  // Referencias para animaciones GSAP
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  // 1. ANIMACIÓN DE ENTRADA (DESKTOP / HEADER GLOBAL)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // La barra contenedora cae con un efecto sutil
      tl.fromTo(".nav-bar-container", 
        { y: -50, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }
      );

      // Los enlaces e iconos aparecen en cascada limpia
      tl.fromTo(".nav-item-desktop",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.4"
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // 2. CONFIGURACIÓN DE LA TIMELINE DEL MENÚ MÓVIL
  useLayoutEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      // Inicializamos la línea de tiempo oculta
      menuTimeline.current = gsap.timeline({ paused: true })
        .fromTo(mobileMenuRef.current,
          { y: "-100%" },
          { y: "0%", duration: 0.5, ease: "power4.out" }
        )
        .fromTo(".mobile-link",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.5)" },
          "-=0.2"
        )
        .fromTo(".mobile-close-btn",
          { opacity: 0, rotate: -90 },
          { opacity: 1, rotate: 0, duration: 0.3, ease: "power2.out" },
          "-=0.3"
        );
    }, mobileMenuRef);

    return () => ctx.revert();
  }, []);

  // Controlar la reproducción de la animación del menú móvil dependiente del estado
  React.useEffect(() => {
    if (menuTimeline.current) {
      if (isMenuOpen) {
        menuTimeline.current.play();
      } else {
        menuTimeline.current.reverse();
      }
    }
  }, [isMenuOpen]);

  // Función de Scroll Suave
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'       
      });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="w-full fixed top-0 left-0 z-50 px-3 pt-2">
      <nav 
        className="nav-bar-container max-w-7xl mx-auto flex justify-between items-center p-2 shadow-lg rounded-3xl"
        style={{ 
          backgroundColor: NAV_BG_DESKTOP, 
          borderColor: BORDER_COLOR,
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        aria-label="Main Portfolio Navigation"
      >
        
        {/* Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#inicio');
          }}
          aria-label="Ir a Inicio"
          className="nav-item-desktop flex items-center h-10 w-[75px] rounded-full transition-transform hover:scale-105"
        >
          <img 
            src={logoSrc} 
            alt={logoAlt} 
            className="rounded-full"
            style={{ width: '75px', height: '75px' }} 
          />
        </a>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex space-x-1">
          {PORTFOLIO_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            const baseClasses = `nav-item-desktop px-3 py-2 transition-colors font-medium text-sm md:text-base`;
            
            return (
              <div key={item.href} role="none">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault(); 
                    scrollToSection(item.href);
                  }}
                  className={`${baseClasses} hover:text-white`}
                  style={{
                    color: isActive ? ACTIVE_COLOR : TEXT_COLOR,
                  }}
                >
                  {item.label}
                </a>
              </div>
            );
          })}
        </div>
        
        {/* Botón de Menú Móvil (Toggle) */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú móvil" 
            className="nav-item-desktop md:hidden p-2 rounded-full transition-colors"
            style={{ color: TEXT_COLOR }}
        >
          <Menu size={24} style={{ color: TEXT_COLOR, transition: 'color 0.3s' }} className='hover:text-[#61dca3]' />      
        </button>

      </nav>

      {/* MENÚ MÓVIL DESPLEGABLE INTERACTIVO (Manejado 100% por GSAP) */}
      <div 
        ref={mobileMenuRef}
        className="md:hidden fixed top-0 left-0 w-full h-screen z-40 -translate-y-full"
        style={{ backgroundColor: NAV_BG_MOBILE }} 
      >
        <div className="flex flex-col justify-evenly items-center w-full h-full px-10 py-20">
          {PORTFOLIO_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                }}
                className={`mobile-link text-2xl font-bold py-3 w-full text-center rounded-xl transition-colors duration-300 ${
                  isActive ? 'text-black' : 'hover:text-[#61dca3]'
                }`}
                style={{
                    backgroundColor: isActive ? ACTIVE_COLOR : 'transparent',
                    boxShadow: isActive ? `0 0 20px ${BORDER_COLOR}` : 'none',
                    color: isActive ? 'black' : TEXT_COLOR
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Botón de Cierre */}
        <button 
            onClick={() => setIsMenuOpen(false)}
            className="mobile-close-btn absolute top-6 right-6 p-2 transition-colors hover:text-[#61dca3]"
            style={{ color: TEXT_COLOR }}
            aria-label="Cerrar menú móvil"
        >
            <X size={32} />
        </button>

      </div>
    </header>
  );
};

export default ModernNav;