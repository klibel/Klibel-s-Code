"use client";
import React, { FC, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Download } from "lucide-react";
import { gsap } from "gsap";

const SocialTiltedCard = dynamic(
  () => import("./SocialTiltedCard"),
  { ssr: false }
);

const PortfolioCover: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Fondos de luz (Glows)
      tl.fromTo(".bg-glow", 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 1.2, stagger: 0.2 }
      );

      // 2. Cascada para el bloque de contenido izquierdo
      tl.fromTo(".hero-animate", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.9"
      );

      // 3. Entrada suave para la tarjeta de la derecha
      tl.fromTo(".hero-card-animate", 
        { opacity: 0, scale: 0.96 }, 
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Glows de fondo */}
      <div className="bg-glow opacity-0 absolute -top-40 -left-40 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#22ff88] md:opacity-25 blur-[120px] sm:blur-[180px] rounded-full"></div>
      <div className="bg-glow opacity-0 absolute bottom-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-[#22ff88] md:opacity-15 blur-[100px] sm:blur-[160px] rounded-full"></div>

      {/* Luz radial central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,255,136,0.06),transparent_60%)]"></div>

      {/* Contenido General de la sección */}
      <header className="relative z-10 w-full min-h-screen pt-24 pb-12 lg:py-0 flex items-center justify-center">
        
        {/* ⚡ CONTENEDOR NUEVO: Añadida la grilla con un max-width y padding responsivo idéntico al resto de tu web */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Columna Izquierda */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

            <div className="max-w-xl w-full">

              {/* Logo + Título */}
              <div className="hero-animate opacity-0 mb-4 sm:mb-6 flex items-center justify-center lg:justify-start">
                <div className="w-12 h-8 sm:w-20 sm:h-12 lg:w-24 lg:h-14 flex items-center mr-3">
                  <Image
                    src="/Icon.png"
                    alt="Klibel's Code Logo"
                    width={96}
                    height={96}
                    priority
                    className="drop-shadow-[0_0_15px_rgba(34,255,136,0.8)] object-contain"
                  />
                </div>

                <h1 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold uppercase tracking-wide">
                  <span className="text-[#22ff88]">Klibel's</span>{" "}
                  <span className="text-gray-200">CODE</span>
                </h1>
              </div>

              {/* Subtítulo */}
              <h2 className="hero-animate opacity-0 text-base sm:text-lg lg:text-xl font-semibold text-gray-100 mb-3 sm:mb-4">
                Bienvenido a mi Portafolio Digital
              </h2>

              {/* Descripción con line-clamp */}
              <p className="hero-animate opacity-0 text-xs sm:text-sm lg:text-base text-gray-400 mb-6 sm:mb-8 leading-relaxed line-clamp-2 lg:line-clamp-none">
                Soy desarrollador frontend enfocado en la creación de
                interfaces web modernas y aplicaciones móviles para Android.
                Transformo ideas en soluciones digitales eficientes utilizando
                tecnologías como React y Next.js.
              </p>

              {/* Botón CV */}
              <div className="hero-animate opacity-0 flex justify-center lg:justify-start w-full">
                <a
                  href="/C.V.pdf"
                  download
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-3 text-xs sm:text-sm font-bold rounded-full text-black bg-[#22ff88] hover:bg-[#4dff9f] transition-all duration-300 shadow-[0_0_25px_rgba(34,255,136,0.5)] uppercase tracking-wider"
                >
                  <Download size={16} className="mr-2" />
                  Descargar CV
                </a>
              </div>

            </div>
          </div>

          {/* Columna Derecha */}
          {/* Se cambió a items-end en desktop para empujar la tarjeta hacia el margen derecho exacto */}
          <div className="hero-card-animate opacity-0 w-full lg:w-1/2 flex justify-center lg:justify-end max-w-[280px] sm:max-w-[380px] lg:max-w-none mt-4 lg:mt-0">
            <SocialTiltedCard
              imageSrc="/klibel.png"
              captionText="KLIBEL ROMERO"
              altText="Klibel Romero Profile"
              instagramHandle="@klibel.romero"
              maxSize="450px"
            />
          </div>

        </div>
      </header>
    </div>
  );
};

export default PortfolioCover;