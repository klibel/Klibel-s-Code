"use client";

import dynamic from "next/dynamic";
import React from "react";

// Hero principal (NO necesita dynamic si no usa window directamente)
import PortfolioCover from "./components/LetterGlitch";

const DynamicRouterWrapper = dynamic(
  () => import("./components/RouterWrapper"),
  { ssr: false }
);

const AboutMe = dynamic(() => import("./components/AboutMe"));
const MyTechnologies = dynamic(() => import("./components/MyTechnologies"));
const MyProjects = dynamic(() => import("./components/MyProjects"));
const Footer = dynamic(() => import("./components/Footer"));

export default function Home() {
  return (
    <main
      id="inicio"
      className="flex flex-col w-full min-h-screen bg-black text-white"
    >
      {/* HERO */}
      <PortfolioCover />

      {/* NAVBAR */}
      <DynamicRouterWrapper logoAlt="Icon" logoSrc="/Icon.png" />

      {/* SECCIONES */}
      <section id="sobreMi" className="w-full py-20">
        <AboutMe />
      </section>

      <section id="tecnologias" className="w-full py-20 border-t border-gray-800">
        <MyTechnologies />
      </section>

      <section id="proyectos" className="w-full py-20 border-t border-gray-800">
        <MyProjects />
      </section>

      <footer id="contacto" className="w-full border-t border-gray-800">
        <Footer />
      </footer>
    </main>
  );
}