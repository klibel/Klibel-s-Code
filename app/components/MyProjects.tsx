import React, { useEffect, useRef } from 'react';
// Importación ajustada a la nueva ruta y extensión (asumiendo que Projects_Data es un archivo .ts o .tsx)
import { PROJECTS_DATA, Project } from '../Data/Projects_Data'; 

// --- Definiciones Mock de OGL (Necesarias para la compilación TSX) ---
// Se mantienen las declaraciones de clase para evitar errores de tipo si OGL no está tipado
declare class Renderer {
    constructor(options: any);
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement | OffscreenCanvas }; 
    setSize(width: number, height: number): void;
    render(options: any): void;
}
declare class Camera {
    constructor(gl: any, options: any);
    position: { set: (x: number, y: number, z: number) => void };
    perspective(options: any): void;
}
declare class Geometry {
    constructor(gl: any, options: any);
    static readonly POINTS: number;
}
declare class Program {
    constructor(gl: any, options: any);
    uniforms: { uTime: { value: number }, uSpread: { value: number }, uBaseSize: { value: number }, uSizeRandomness: { value: number }, uAlphaParticles: { value: number } };
}
declare class Mesh {
    constructor(gl: any, options: any);
    mode: number;
    rotation: { x: number, y: number, z: number };
    position: { x: number, y: number, z: number };
}

// Colores por defecto para las partículas
const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const hexToRgb = (hex: string): number[] => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map(c => c + c)
            .join('');
    }
    const int = parseInt(hex, 16);
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;
    return [r, g, b];
};

// Shaders GLSL para el efecto de partículas (Se omiten para concisión, asumiendo que están correctos)
const vertex = /* glsl */ `...`;
const fragment = /* glsl */ `...`;


interface ParticlesProps {
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    className?: string;
}

const Particles: React.FC<ParticlesProps> = ({
    particleCount = 200,
    particleSpread = 10,
    speed = 0.1,
    particleColors,
    moveParticlesOnHover = false,
    particleHoverFactor = 1,
    alphaParticles = false,
    particleBaseSize = 100,
    sizeRandomness = 1,
    cameraDistance = 20,
    disableRotation = false,
    className
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        // Solo proceder si estamos en un entorno de navegador y OGL está definido
        if (!container || typeof (window as any).Renderer === 'undefined') return;

        // @ts-ignore: OGL initialization
        const renderer = new Renderer({ depth: false, alpha: true });
        const gl = renderer.gl;
        const canvasElement = gl.canvas;

        // Verifica si el canvas es un elemento DOM antes de intentar adjuntarlo.
        if (!(canvasElement instanceof HTMLCanvasElement)) {
            return;
        }

        container.appendChild(canvasElement);
        gl.clearColor(0, 0, 0, 0);

        // @ts-ignore: OGL initialization
        const camera = new Camera(gl, { fov: 15 });
        camera.position.set(0, 0, cameraDistance);

        const resize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        window.addEventListener('resize', resize, false);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            mouseRef.current = { x, y };
        };

        if (moveParticlesOnHover) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        const count = particleCount;
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 4);
        const colors = new Float32Array(count * 3);
        const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

        for (let i = 0; i < count; i++) {
            let x: number, y: number, z: number, len: number;
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                len = x * x + y * y + z * z;
            } while (len > 1 || len === 0);
            const r = Math.cbrt(Math.random());
            positions.set([x * r, y * r, z * r], i * 3);
            randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
            const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
            colors.set(col, i * 3);
        }

        // @ts-ignore: OGL initialization
        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            random: { size: 4, data: randoms },
            color: { size: 3, data: colors }
        });

        // @ts-ignore: OGL initialization
        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uSpread: { value: particleSpread },
                uBaseSize: { value: particleBaseSize },
                uSizeRandomness: { value: sizeRandomness },
                uAlphaParticles: { value: alphaParticles ? 1 : 0 }
            },
            transparent: true,
            depthTest: false
        });

        // @ts-ignore: OGL initialization
        const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

        let animationFrameId: number;
        let lastTime = performance.now();
        let elapsed = 0;

        const update = (t: number) => {
            animationFrameId = requestAnimationFrame(update);
            const delta = t - lastTime;
            lastTime = t;
            elapsed += delta * speed;

            program.uniforms.uTime.value = elapsed * 0.001;

            if (moveParticlesOnHover) {
                particles.position.x = -mouseRef.current.x * particleHoverFactor;
                particles.position.y = -mouseRef.current.y * particleHoverFactor;
            } else {
                particles.position.x = 0;
                particles.position.y = 0;
            }

            if (!disableRotation) {
                particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
                particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
                particles.rotation.z += 0.01 * speed;
            }

            renderer.render({ scene: particles, camera });
        };

        animationFrameId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            if (moveParticlesOnHover) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
            
            // Cleanup: Remueve el canvas del DOM solo si es un HTMLCanvasElement
            if (canvasElement instanceof HTMLCanvasElement && container.contains(canvasElement)) {
                container.removeChild(canvasElement);
            }
        };
    }, [
        particleCount,
        particleSpread,
        speed,
        moveParticlesOnHover,
        particleHoverFactor,
        alphaParticles,
        particleBaseSize,
        sizeRandomness,
        cameraDistance,
        disableRotation,
    ]);

    return <div ref={containerRef} className={`relative w-full h-full ${className}`} />;
};


// --- Project Card Component ---
interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
            group
            flex
            flex-col
            justify-between
            items-center
            w-full 
            rounded-xl 
            shadow-2xl 
            bg-gray-800/90 
            backdrop-blur-sm 
            overflow-hidden 
            transform 
            transition-all 
            duration-500 
            hover:scale-[1.05] 
            hover:shadow-[#61dca3]/50 
            border 
            border-transparent 
            hover:border-[#61dca3]
            focus:outline-none 
            focus:ring-4 
            focus:ring-[#61dca3]/50 
        "
    >
        {/* Image / Placeholder */}
        <div className="aspect-video overflow-hidden">
            <img 
                src={project.imageUrl} 
                alt={`Vista previa de ${project.title}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback placeholder
                    target.src = `https://placehold.co/600x400/334155/FFFFFF?text=${project.title.replace(/\s/g, '+')}`;
                }}
            />
        </div>

        {/* Content */}
        <div className="px-5 py-2 text-white">
            <h3 className="text-lg font-bold text-[#61dca3]">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{project.description}</p>
        </div>
            
        <div className="flex flex-wrap justify-center gap-2 px-5 pb-5 pt-2 border-t w-full border-gray-700">
            {project.technologies.map(tech => (
                <span 
                    key={tech} 
                    className="text-xs font-medium bg-slate-700/70 text-white px-3 py-1 rounded-full border border-[#61dca3] transition duration-300 group-hover:bg-slate-600/80"
                >
                    {tech}
                </span>
            ))}
        </div>
    </a>
);


// --- Main App Component (MyProjects View) ---
// Este es el componente que debe ser exportado por defecto para usar en App.tsx
export const MyProjects: React.FC = () => {
    return (
        <div className="flex justify-center min-h-screen w-full bg-[#080010] overflow-hidden font-sans">
            {/* OGL Particles Background (Full size and position absolute) */}
            <div className="absolute inset-0 z-0">
                <Particles 
                    particleCount={300}
                    particleSpread={15}
                    speed={0.15}
                    particleColors={['#8B5CF6', '#F97316', '#FFFFFF']} 
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.5}
                    particleBaseSize={150}
                    alphaParticles={true}
                    className="opacity-70"
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-5 md:p-10 mx-auto">
                <header className="text-center mb-8 pt-4">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#61dca3] leading-tight">
                        Mis Proyectos
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-gray-300 mt-1">
                        Explora una selección de mis trabajos más recientes y las tecnologías utilizadas.
                    </p>
                </header>

                {/* Projects Grid - Fully Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                    {PROJECTS_DATA.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Se exporta MyProjects por defecto para usarlo fácilmente en App.tsx
export default MyProjects;