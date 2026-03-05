"use client";
import React, { FC } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Download } from "lucide-react";

const SocialTiltedCard = dynamic(
  () => import("./SocialTiltedCard"),
  { ssr: false }
);

const PortfolioCover: FC = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Glow principal */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#22ff88] opacity-25 blur-[180px] rounded-full"></div>

      {/* Glow secundario */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#22ff88] opacity-15 blur-[160px] rounded-full"></div>

      {/* Luz radial central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,255,136,0.08),transparent_60%)]"></div>

      {/* Contenido */}
      <header className="relative z-10 w-full min-h-screen px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-center">

        {/* Columna Izquierda */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center">

          <div className="max-w-xl">

            {/* Logo + Título */}
            <div className="mb-6 flex items-center justify-center">
              <div className="w-16 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-14 flex items-center mr-3">
                <Image
                  src="/Icon.png"
                  alt="Klibel's Code Logo"
                  width={96}
                  height={96}
                  priority
                  className="drop-shadow-[0_0_15px_rgba(34,255,136,0.8)]"
                />
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold uppercase tracking-wide">
                <span className="text-[#22ff88]">Klibel's</span>{" "}
                <span className="text-gray-200">CODE</span>
              </h1>
            </div>

            {/* Subtítulo */}
            <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4">
              Bienvenido a mi Portafolio Digital
            </h2>

            {/* Descripción */}
            <p className="text-gray-400 mb-8 leading-relaxed">
              Soy desarrollador frontend enfocado en la creación de
              interfaces web modernas y aplicaciones móviles para Android.
              Transformo ideas en soluciones digitales eficientes utilizando
              tecnologías como React y Next.js.
            </p>

            {/* Botón */}
            <div className="flex justify-center">
              <a
                href="/C.V.pdf"
                download
                className="flex items-center justify-center px-8 py-3 text-sm font-bold rounded-full text-black bg-[#22ff88] hover:bg-[#4dff9f] transition-all duration-300 shadow-[0_0_30px_rgba(34,255,136,0.6)] uppercase tracking-wider"
              >
                <Download size={18} className="mr-2" />
                Descargar CV
              </a>
            </div>

          </div>
        </div>

        {/* Columna Derecha */}
        <div className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0">
          <SocialTiltedCard
            imageSrc="/klibel.png"
            captionText="KLIBEL ROMERO"
            altText="Klibel Romero Profile"
            instagramHandle="@klibel.romero"
            maxSize="450px"
          />
        </div>

      </header>
    </div>
  );
};

export default PortfolioCover;