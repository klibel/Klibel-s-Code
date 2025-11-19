"use client";

import { FC } from 'react';
// Importamos los íconos de redes sociales adicionales
import { Mail, Linkedin, Github, Phone, Instagram, Send } from 'lucide-react';

// --- DATOS PERSONALES DE KLIBEL (¡IMPORTANTE: REEMPLAZA CON TU INFO!) ---
const CONTACT_INFO = {
    email: "klibel.a.romeo@gmail.com", 
    linkedin: "https://www.linkedin.com/in/klibel-romero-418b01305/", 
    github: "https://github.com/klibel", 
    tiktok: "https://www.tiktok.com/@klibel_romero", // Nueva red
    instagram: "https://www.instagram.com/klibel.romero/", // Nueva red
    phone: "+58 412 104 0377",
    location: "Punto Fijo, Falcón, Venezuela"
};

const Footer: FC = () => {
    // Definición de enlaces para mapeo simple
    const socialLinks = [
        { 
            name: "LinkedIn", 
            href: CONTACT_INFO.linkedin, 
            Icon: Linkedin, 
            color: "hover:text-blue-400" 
        },
        { 
            name: "GitHub", 
            href: CONTACT_INFO.github, 
            Icon: Github, 
            color: "hover:text-white" 
        },
        { 
            name: "Instagram", 
            href: CONTACT_INFO.instagram, 
            Icon: Instagram, 
            color: "hover:text-pink-500" 
        },
        { 
            name: "TikTok", 
            href: CONTACT_INFO.tiktok, 
            Icon: Send, // Usaremos Send o un ícono de Lucide que se asemeje
            color: "hover:text-sky-400" 
        },
    ];

    return (
        <footer className="w-full bg-gray-950 border-t border-[#61dca3]/50 text-white font-inter py-8 px-5">
            <div className="max-w-7xl mx-auto">

                {/* --- SECCIÓN PRINCIPAL (LOGO, CONTACTO, REDES) --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-3 pb-10 border-b border-gray-800">
                    
                    {/* Columna 1: Logo y Slogan */}
                    <div className="md:col-span-1 flex flex-col items-center md:items-start space-y-4">
                        <div className='h-10 w-18 flex items-center'>
                          <img 
                              src="/Icon.png" 
                              alt="Logo de Klibel's Code" 
                              className="w-18 h-18 rounded-lg shadow-lg"
                          />
                        </div>
                        <h2 className="text-base lg:text-lg font-bold text-white text-center">
                            <span className='text-[#61dca3]'>Klibel's</span> Code
                        </h2>
                        <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
                            Desarrollo Frontend con pasión y precisión, transformando ideas en experiencias web.
                        </p>
                    </div>

                    {/* Columna 2: Llamada a la Acción (Visible en móvil, compactada) */}
                    <div className="md:col-span-1 space-y-4 flex flex-col items-center md:items-start">
                        <h3 className="text-base lg:text-lg font-extrabold text-[#61dca3] tracking-tight mb-4">
                            Hablemos de tu Proyecto
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm text-center md:text-left">
                            Desde un MVP hasta una aplicación compleja, estoy listo para el siguiente reto.
                        </p>
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="inline-flex items-center justify-center w-full sm:w-auto mt-4 px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-gray-900 bg-[#61dca3] hover:bg-[#52c191] hover:text-white transition duration-500"
                        >
                            <Mail size={16} className="mr-2" /> 
                            Enviar Mensaje
                        </a>
                    </div>
                    
                    {/* Columna 3: Información de Contacto Directo */}
                    <div className="md:col-span-1 space-y-2 flex flex-col items-center md:items-start">
                        <h3 className="text-base lg:text-lg font-semibold text-white border-b border-gray-700 w-max pb-1 mb-2">
                            Detalles Directos
                        </h3>
                        
                        <div>
                          <div className="flex items-center group my-2">
                              <Mail size={14} className="text-[#61dca3] mr-1" />
                              <a 
                                  href={`mailto:${CONTACT_INFO.email}`} 
                                  className="text-gray-300 hover:text-white text-xs transition-colors"
                              >
                                  {CONTACT_INFO.email}
                              </a>
                          </div>

                          <div className="flex items-center group my-2">
                              <Phone size={14} className="text-[#61dca3] mr-1" />
                              <span className="text-gray-300 text-xs">{CONTACT_INFO.phone}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            Ubicación: {CONTACT_INFO.location}
                        </p>
                    </div>

                    {/* Columna 4: Redes Sociales (Mapeo de la nueva lista) */}
                    <div className="md:col-span-1 space-y-3 w-full flex flex-col items-center md:items-start">
                        <h3 className="text-base lg:text-lg font-semibold text-white border-b border-gray-700 w-max pb-1 mb-2">
                            Sígueme en Redes
                        </h3>
                        
                        <div>
                        {socialLinks.map(({ name, href, Icon, color }) => (
                            <a 
                                key={name}
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`flex items-center space-x-2 my-1 text-gray-400 ${color} transition-colors group text-sm`}
                            >
                                <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                <span>{name}</span>
                            </a>
                        ))}
                        </div>
                    </div>
                </div>

                {/* --- DERECHOS DE AUTOR Y NOTA FINAL --- */}
                <div className="pt-8 text-center text-xs text-gray-600">
                    <p>
                        &copy; {new Date().getFullYear()} Klibel's Code. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;