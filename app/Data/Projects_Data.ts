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
        title: "Alejandro's Auto Supplies",
        description: "Es una plataforma de comercio electrónico especializada en la venta de repuestos y accesorios para vehículos.",
        imageUrl: "/Alejandro's-Auto-Supplies.png",
        link: "https://we-bde-repuestos.vercel.app/",
        technologies: ["React", "TypeScript", "CSS"],
    },
    {
        id: 2,
        title: "PokéDex",
        description: "Una web interactiva que sirve como enciclopedia digital completa sobre las criaturas Pokémon. Permite a los usuarios buscar, filtrar y explorar cada Pokémon.",
        imageUrl: "/PokeDex-Portada.png",
        link: "https://pokedex-ahhc.onrender.com/",
        technologies: ["HTML", "CSS", "JavaScript", "API"],
    },
    {
        id: 3,
        title: "Asegura Aqui!",
        description: "Sitio web orientado a la gestión de seguros automotrices. Permite al usuario completar formularios interactivos y generar un PDF final con los datos ingresados, simulando el proceso real de emisión de una póliza.",
        imageUrl: "/Asegura-aqui-Portada.png",
        link: "https://repository-the-asegura-aqui.onrender.com/",
        technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    },
    {
        id: 4,
        title: "Impostor FC",
        description: "App Android para jugar al Importor Futbolero, Se basa en un juego donde se crean su perfil los participantes y aleatoriamente se selecciona uno como impostor.",
        imageUrl: "/impostorFC-portada.png",
        link: "/Impostor FC.apk",
        technologies: ["React Native","Expo","TypeScript", "CSS", ],
    },
    {
        id: 5,
        title: "QQSV",
        description: "QQSV (quien quiere ser venezolano) es una App android, Sobre conocimiento venezolano como tradiciones, frases, comidas y otras cosas",
        imageUrl: "/QQSV-portada.png",
        link: "/Q Q S V.apk",
        technologies: ["React Native","Expo","TypeScript", "CSS", ],
    },
  ];