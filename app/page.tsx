"use client";

import dynamic from "next/dynamic";
import React from "react";

const DynamicLetterGlitch = dynamic(
  () => import("./components/LetterGlitch"),
  {
    ssr: false,
    loading: () => <div className="min-h-screen w-full bg-black" />,
  }
);

const DynamicRouterWrapper = dynamic(
  () => import("./components/RouterWrapper"),
  { ssr: false }
);

const DynamicAboutMe = dynamic(
  () => import("./components/AboutMe"),
  {
    loading: () => (
      <div className="h-64 bg-gray-900/50 animate-pulse w-full"></div>
    ),
  }
);

const DynamicMyTechnologies = dynamic(
  () => import("./components/MyTechnologies"),
  {
    loading: () => (
      <div className="h-96 bg-gray-800/50 animate-pulse w-full"></div>
    ),
  }
);

const DynamicProjectCard = dynamic(
  () => import("./components/MyProjects"),
  {
    loading: () => (
      <div className="h-[700px] bg-gray-900/50 animate-pulse w-full"></div>
    ),
  }
);

const DynamicFooter = dynamic(
  () => import("./components/Footer"),
  {
    loading: () => (
      <div className="h-40 bg-gray-950/50 w-full"></div>
    ),
  }
);

export default function Home() {
  return (
    <div
      id="inicio"
      className="flex min-h-screen flex-col items-center justify-between"
    >
      <DynamicLetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />

      <DynamicRouterWrapper logoAlt="Icon" logoSrc="/Icon.png" />

      <section className="w-full" id="sobreMi">
        <DynamicAboutMe />
      </section>

      <section className="w-full" id="tecnologias">
        <DynamicMyTechnologies />
      </section>

      <section className="w-full" id="proyectos">
        <DynamicProjectCard />
      </section>

      <footer className="w-full" id="contacto">
        <DynamicFooter />
      </footer>
    </div>
  );
}
