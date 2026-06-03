// Este archivo simula la estructura de datos que importarías desde un JSON o una API.

export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    technologies: string[];
}

export const PROJECTS_DATA: Project[] = [
    {
        id: 1,
        title: "VeloKicks",
        description: "VeloKicks es un e-commerce showcase de calzado deportivo de alto rendimiento. Cuenta con una interfaz premium de diseño aerodinámico, un catálogo dinámico con transiciones fluidas mediante GSAP, filtros de búsqueda avanzada.",
        imageUrl: "/velokickslab.png",
        link: "https://velokicks.vercel.app/",
        technologies: ["React", "Next.js", "GSAP", "TypeScript", "CSS"],
    },
    {
        id: 2,
        title: "GeoMetrics — Dashboard Global de Países",
        description: "Aplicación web interactiva que consume la API de Rest Countries para analizar indicadores demográficos globales en tiempo real.",
        imageUrl: "/GeoMetrics.png",
        link: "https://geometrics-kappa.vercel.app/",
        technologies: ["React", "TypeScript", "CSS", "vite", "API", "material-ui", "Bootstrap" ],
    },
    {
        id: 3,
        title: "PokéDex",
        description: "Una web interactiva que sirve como enciclopedia digital completa sobre las criaturas Pokémon. Permite a los usuarios buscar, filtrar y explorar cada Pokémon.",
        imageUrl: "/PokeDex-Portada.png",
        link: "https://pokedex-ahhc.onrender.com/",
        technologies: ["HTML", "CSS", "JavaScript", "API"],
    },
    {
        id: 4 ,
        title: "Asegura Aqui!",
        description: "Sitio web orientado a la gestión de seguros automotrices. Permite al usuario completar formularios interactivos y generar un PDF final con los datos ingresados, simulando el proceso real de emisión de una póliza.",
        imageUrl: "/Asegura-aqui-Portada.png",
        link: "https://repository-the-asegura-aqui.onrender.com/",
        technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    },
    {
        id: 5,
        title: "Impostor FC",
        description: "App Android para jugar al Impostor Futbolero, Se basa en un juego donde se crean su perfil los participantes y aleatoriamente se selecciona uno como impostor.",
        imageUrl: "/impostorFC-portada.png",
        link: "/Impostor FC.apk",
        technologies: ["React Native","Expo","TypeScript", "CSS", ],
    },
    {
        id: 6,
        title: "QQSV",
        description: "QQSV (Quién quiere ser venezolano) es una App android, Sobre conocimiento venezolano como tradiciones, frases, comidas y otras cosas",
        imageUrl: "/QQSV-portada.png",
        link: "/Q Q S V.apk",
        technologies: ["React Native","Expo","TypeScript", "CSS", ],
    },
    {
        id: 7,
        title: "PadelStats Pro",
        description: "PadelStats Pro, Es una App android que te ayuda a generar partidas de Padel con tus amigos, Contiene las funcionalidades adecuada para generar enfrentamiento y llevar el control de puntos",
        imageUrl: "/PadelStatsPro.png",
        link: "/PadelStats-Pro.apk",
        technologies: ["React Native","Expo","JavaScript", "CSS", ],
    },
  ];