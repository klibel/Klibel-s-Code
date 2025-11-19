'use client'; 

import React, { FC, CSSProperties, useState } from 'react';
import { Menu, X } from 'lucide-react'; 

// --- Interfaces ---

interface NavItem {
  href: string; 
  label: string;
}

interface ModernNavProps {
  logoSrc: string; 
  logoAlt: string; 
}

// --- Colores y Valores Fijos (Aplicados directamente) ---
const BORDER_COLOR = '#61dca3';
const NAV_BG_DESKTOP = 'rgba(0, 0, 0, 0.85)'; 
const NAV_BG_MOBILE = 'rgba(0, 0, 0, 0.95)'; 
const TEXT_COLOR = '#f0f0f0';
const ACTIVE_COLOR = BORDER_COLOR;
const HOVER_COLOR = '#4a4a4a'; // Usado solo en el comentario

// --- Datos del Portafolio (Actualizado a anclas ID) ---
const PORTFOLIO_ITEMS: NavItem[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobreMi', label: 'Sobre mí' },
  { href: '#tecnologias', label: 'Tecnologías' }, 
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
];

// --- Componente de Navegación ---

const ModernNav: FC<ModernNavProps> = ({ logoSrc, logoAlt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio'); 

  // Función Principal: Maneja el Scroll y la Navegación
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
    // Aplicamos BORDER_COLOR y NAV_BG_DESKTOP directamente
    <header className="w-full fixed top-0 left-0 z-50 px-3 pt-2">
      <nav 
        className="max-w-7xl mx-auto flex justify-between items-center p-2 shadow-lg rounded-3xl"
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
          className="flex items-center h-10 w-[75px] rounded-full transition-transform hover:scale-105"
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
            const baseClasses = `px-3 py-2 transition-colors font-medium text-sm md:text-base`;
            
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
                    // Aplicación directa de colores
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
            className="md:hidden p-2 rounded-full transition-colors"
            style={{ color: TEXT_COLOR }} // Color de texto inicial
        >
            {isMenuOpen 
                ? <X size={24} style={{ color: ACTIVE_COLOR }} /> // Icono X activo
                : <Menu size={24} style={{ color: TEXT_COLOR, transition: 'color 0.3s' }} className='hover:text-[#61dca3]' />
            }
        </button>

      </nav>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-full h-screen 
                  transform transition-transform duration-500 z-40 
                  ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        // Fondo móvil oscuro aplicado directamente
        style={{ backgroundColor: NAV_BG_MOBILE }} 
      >
        <div className="flex flex-col justify-evenly items-center w-full h-full px-10">
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
                className={`text-2xl font-bold py-2 w-full text-center rounded-lg transition-colors duration-300 ${
                  isActive 
                    ? 'text-black' // Texto negro cuando está activo (sobre fondo verde)
                    : 'hover:text-[#61dca3]' // Hover verde si no está activo
                }`}
                style={{
                    // Colores de fondo y sombra activos
                    backgroundColor: isActive ? ACTIVE_COLOR : 'transparent',
                    boxShadow: isActive ? `0 0 15px ${BORDER_COLOR}` : 'none',
                    color: isActive ? 'black' : TEXT_COLOR // Color de texto inactivo
                }}
              >
                {item.label}
              </a>
            );
          })}
          
        </div>
        {/* Botón de Cierre dentro del menú */}
        <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 p-2 transition-colors hover:text-[#61dca3]"
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