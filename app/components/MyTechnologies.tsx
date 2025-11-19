"use client";

import React, { 
    useRef, useMemo, useState, memo, FC, 
    ReactNode, useId, useLayoutEffect, useCallback
} from 'react';
import {
    SiReact, SiTailwindcss, SiBootstrap, SiGit, SiGithub, SiVscodium, 
    SiCanva, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiVite
} from "react-icons/si";
import { Phone, Zap } from "lucide-react";


// --- UTILITY FUNCTIONS ---

function hexToRgba(hex: string, alpha: number = 1): string {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let h = hex.replace('#', '');
    if (h.length === 3) {
        h = h.split('').map(c => c + c).join('');
    }
    const int = parseInt(h, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const toCssLength = (value: string | number | undefined | null) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));
const cx = (...parts: (string | false | null | undefined)[]): string => parts.filter(Boolean).join(' ');


// --- SKILLS DATA LISTS ---

interface LogoLoopItem {
    node: ReactNode;
    title: string;
    color: string;
}

const LOOP_SKILLS: LogoLoopItem[] = [
  { node: <SiJavascript size={30} color="#F0DB4F" />, title: "JavaScript", color: "#F0DB4F" },
  { node: <SiTypescript size={30} color="#007ACC" />, title: "TypeScript / TSX", color: "#007ACC" },
  { node: <SiReact size={30} color="#61DAFB" />, title: "React (Web)", color: "#61DAFB" },
  { node: <SiTailwindcss size={30} color="#06B6D4" />, title: "Tailwind CSS", color: "#06B6D4" },
  { node: <SiGit size={30} color="#F05032" />, title: "Git", color: "#F05032" },
  { node: <SiGithub size={30} color="#FFFFFF" />, title: "GitHub", color: "#FFFFFF" },
  { node: <SiVscodium size={30} color="#007ACC" />, title: "VS Code", color: "#007ACC" },
  { node: <SiCanva size={30} color="#00C4CC" />, title: "Canva", color: "#00C4CC" },
  { node: <Phone size={30} color="#61DAFB" />, title: "React Native / Expo", color: "#61DAFB" },
  { node: <div className='h-[30px] w-auto flex items-center justify-center font-bold text-xl text-white bg-teal-500 rounded-sm px-1'>AI</div>, title: "Inteligencia Artificial", color: "#2DD4BF" },
  { node: <SiHtml5 size={30} color="#E34F26" />, title: "HTML5", color: "#E34F26" },
  { node: <SiCss3 size={30} color="#264de4" />, title: "CSS3", color: "#264de4" },
  { node: <SiVite size={30} color="#646CFF" />, title: "Vite", color: "#646CFF" },
];


interface GridSkillItem {
    name: string;
    icon: ReactNode;
    color: string;
    description: string;
    textColor?: string;
}

const ALL_SKILLS: GridSkillItem[] = [
  { name: "HTML5", icon: <SiHtml5 size={30} color="#E34F26" />, color: "#E34F26", description: "Dominio de marcado semántico, accesibilidad y estructuras modernas." },
  { name: "CSS3", icon: <SiCss3 size={30} color="#264de4" />, color: "#264de4", description: "Estilizado avanzado, Flexbox, Grid Layout, y animaciones CSS." },
  { name: "JavaScript / JS", icon: <SiJavascript size={30} color="#F0DB4F" />, color: "#F0DB4F", description: "Lógica de cliente y manipulación de DOM, ES6+." },
  { name: "TypeScript / TSX", icon: <SiTypescript size={30} color="#007ACC" />, color: "#007ACC", description: "Implementación de tipado estático para código más robusto y escalable." },

  { name: "React (Web)", icon: <SiReact size={30} color="#61DAFB" />, color: "#61DAFB", description: "Construcción de interfaces de usuario escalables (Hooks, Context)." },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={30} color="#06B6D4" />, color: "#06B6D4", description: "Utilidad-first CSS para prototipado rápido, diseños responsivos y estéticos." },
  { name: "Bootstrap", icon: <SiBootstrap size={30} color="#7952B3" />, color: "#7952B3", description: "Experiencia en el framework CSS más popular para grids, componentes UI y temas." },
  { name: "Vite", icon: <SiVite size={30} />, color: "#646CFF", description: "Bundler ultrarrápido para React y TypeScript." },

  { name: "Git", icon: <SiGit size={30} color="#F05032" />, color: "#F05032", description: "Control de versiones distribuido, manejo avanzado de ramas y fusiones." },
  { name: "GitHub", icon: <SiGithub size={30} color="#FFFFFF" />, color: "#FFFFFF", textColor: "text-black", description: "Plataforma de colaboración, pull requests, revisiones de código y CI/CD." }, 
  { name: "VS Code", icon: <SiVscodium size={30} color="#007ACC" />, color: "#007ACC", description: "Uso avanzado del editor, atajos, extensiones y configuración de entorno." },

  { name: "Canva", icon: <SiCanva size={30} color="#00C4CC" />, color: "#00C4CC", description: "Creación de prototipos visuales rápidos, recursos gráficos y diseño UI/UX básico." },
  { name: "IA / API", icon: <Zap size={30} />, color: "#2DD4BF", description: "Integración de modelos de inteligencia artificial y APIs REST." },
  { name: "React Native / Expo", icon: <Phone size={30} color="#2DD4BF" />, color: "#2DD4BF", description: "Desarrollo de apps móviles nativas para iOS y Android desde JavaScript/React." },
];


// --- ELECTRIC BORDER COMPONENT (Mismo código, pero más eficiente al animar) ---

interface ElectricBorderProps {
    children: ReactNode;
    color?: string; 
    speed?: number;
    chaos?: number;
    thickness?: number;
    className?: string;
    style?: React.CSSProperties;
}

const ElectricBorder: FC<ElectricBorderProps> = memo(({ 
    children, 
    color = '#2DD4BF', 
    speed = 1, 
    chaos = 1, 
    thickness = 2, 
    className, 
    style 
}) => {
    const rawId = useId().replace(/[:]/g, '');
    const filterId = `turbulent-displace-${rawId}`;
    const rootRef = useRef<HTMLDivElement>(null);
    
    const inheritRadius = useMemo(() => ({
        borderRadius: style?.borderRadius ?? 'inherit'
    }), [style?.borderRadius]);

    const dur = Math.max(0.001, 6 / (speed || 1));
    const scale = 30 * (chaos || 1);

    // 💡 OPTIMIZACIÓN: Solo 'willChange: filter' en el borde con filtro.
    const strokeStyle = useMemo(() => ({
        ...inheritRadius,
        borderWidth: thickness,
        borderStyle: 'solid',
        borderColor: color,
        filter: `url(#${filterId})`,
        willChange: 'filter', 
    }), [color, inheritRadius, thickness, filterId]);

    const glow1Style = useMemo(() => ({
        ...inheritRadius,
        borderWidth: thickness,
        borderStyle: 'solid',
        borderColor: hexToRgba(color, 0.6),
        filter: `blur(${0.5 + thickness * 0.25}px)`,
        opacity: 0.5
    }), [color, inheritRadius, thickness]);

    const glow2Style = useMemo(() => ({
        ...inheritRadius,
        borderWidth: thickness,
        borderStyle: 'solid',
        borderColor: color,
        filter: `blur(${2 + thickness * 0.5}px)`,
        opacity: 0.5
    }), [color, inheritRadius, thickness]);

    const bgGlowStyle = useMemo(() => ({
        ...inheritRadius,
        transform: 'scale(1.08)',
        filter: 'blur(32px)',
        opacity: 0.3,
        zIndex: -1,
        background: `linear-gradient(-30deg, ${hexToRgba(color, 0.8)}, transparent, ${color})`
    }), [color, inheritRadius]);

    return (
        <div ref={rootRef} className={'relative isolate ' + (className ?? '')} style={style}>
            <svg
                className="fixed -left-[10000px] -top-[10000px] w-2.5 h-2.5 opacity-[0.001] pointer-events-none"
                aria-hidden
                focusable="false"
            >
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -490" dur={`${dur}s`} repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="combinedNoise"
                            scale={String(scale)}
                            xChannelSelector="R"
                            yChannelSelector="B"
                        />
                    </filter>
                </defs>
            </svg>

            <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
                <div className="absolute inset-0 box-border" style={strokeStyle} />
                <div className="absolute inset-0 box-border" style={glow1Style} />
                <div className="absolute inset-0 box-border" style={glow2Style} />
                <div className="absolute inset-0" style={bgGlowStyle} />
            </div>

            <div className="relative" style={inheritRadius}>
                {children}
            </div>
        </div>
    );
}, (prev, next) => {
    return prev.children === next.children && 
           prev.color === next.color && 
           prev.className === next.className &&
           prev.thickness === next.thickness;
});

ElectricBorder.displayName = 'ElectricBorder';


// --- LOGO LOOP COMPONENT (Sin Cambios) ---

const GlobalTimeout = typeof window !== 'undefined' ? window.setTimeout : setTimeout;
const GlobalClearTimeout = typeof window !== 'undefined' ? window.clearTimeout : clearTimeout;

const throttle = (fn: Function, delay: number) => {
    let lastTime = 0;
    let timeoutId: any = null; 
    
    return (...args: any[]) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            fn(...args);
        } else if (!timeoutId) {
            timeoutId = GlobalTimeout(() => { 
                lastTime = Date.now();
                timeoutId = null;
                fn(...args);
            }, delay - (now - lastTime));
        }
    };
};

interface LogoLoopProps {
    logos: LogoLoopItem[];
    speed?: number;
    direction?: 'left' | 'right';
    width?: string | number;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

const LogoLoop: FC<LogoLoopProps> = memo(
    ({
        logos,
        speed = 120,
        direction = 'left',
        width = '100%',
        logoHeight = 28,
        gap = 32,
        pauseOnHover = true,
        fadeOut = true,
        fadeOutColor = '#0f172a', 
        scaleOnHover = true,
        ariaLabel = 'Tecnologías y Frameworks',
        className,
        style
    }) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const seqRef = useRef<HTMLUListElement>(null);
        
        const [fullWidth, setFullWidth] = useState<number>(0);
        const [copyCount, setCopyCount] = useState<number>(2); 

        const updateDimensions = useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

            if (sequenceWidth > 0) {
                if (Math.abs(sequenceWidth - fullWidth) > 1) { 
                    setFullWidth(sequenceWidth);
                }
                const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + 1;
                if (copiesNeeded !== copyCount) { 
                    setCopyCount(Math.max(2, copiesNeeded));
                }
            }
        }, [fullWidth, copyCount]);


        const throttledUpdate = useMemo(() => throttle(updateDimensions, 150), [updateDimensions]);

        useLayoutEffect(() => {
            updateDimensions(); 
            if (typeof window === 'undefined') return;

            const roContainer = new ResizeObserver(throttledUpdate);
            if(containerRef.current) roContainer.observe(containerRef.current);
            
            let roSequence: ResizeObserver | null = null;
            const timeoutId = GlobalTimeout(() => {
                 if(seqRef.current) {
                    roSequence = new ResizeObserver(throttledUpdate);
                    roSequence.observe(seqRef.current);
                }
            }, 50);


            window.addEventListener('resize', throttledUpdate);

            return () => {
                GlobalClearTimeout(timeoutId);
                window.removeEventListener('resize', throttledUpdate);
                roContainer.disconnect();
                if(roSequence) roSequence.disconnect();
            };
        }, [throttledUpdate]); 


        const animationDuration = useMemo(() => {
            return fullWidth > 0 ? fullWidth / Math.abs(speed) : 0;
        }, [fullWidth, speed]);


        const cssVariables = useMemo(
            () => ({
                '--logoloop-duration': `${animationDuration}s`, 
                '--logoloop-seqWidth': `${fullWidth}px`, 
                '--logoloop-gap': `${gap}px`,
                '--logoloop-logoHeight': `${logoHeight}px`,
                ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
            }),
            [animationDuration, fullWidth, gap, logoHeight, fadeOutColor]
        );

        const rootClasses = useMemo(
            () =>
                cx(
                    'relative overflow-x-hidden group',
                    '[--logoloop-gap:32px]',
                    '[--logoloop-logoHeight:28px]',
                    '[--logoloop-fadeColorAuto:#ffffff]',
                    'dark:[--logoloop-fadeColorAuto:#0f172a]', 
                    scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
                    className
                ),
            [scaleOnHover, className]
        );

        const renderLogoItem = useCallback(
            (item: LogoLoopItem, key: string) => { 
                const content = (
                    <span
                        className={cx(
                            'inline-flex items-center',
                            'motion-reduce:transition-none',
                            scaleOnHover &&
                            'transition-transform duration-300 ease-in-out group-hover/item:scale-120'
                        )}
                        aria-hidden={!item.title}
                        title={item.title}
                    >
                        {item.node}
                    </span>
                );

                return (
                    <li
                        className={cx(
                            'flex-none mx-6 leading-1 flex-shrink-0', 
                            'p-3 flex items-center justify-center rounded-xl backdrop-blur-sm', 
                            scaleOnHover && 'overflow-visible group/item'
                        )}
                        key={key}
                        role="listitem"
                        style={{ background: hexToRgba(item.color, 0.1), border: `1px solid ${hexToRgba(item.color, 0.2)}` }} 
                    >
                        {content}
                    </li>
                );
            },
            [scaleOnHover]
        );

        const logoLists = useMemo(
            () =>
                Array.from({ length: copyCount }, (_, copyIndex) => (
                    <ul
                        className="flex items-center min-w-max" 
                        key={`copy-${copyIndex}`}
                        role="list"
                        aria-hidden={copyIndex > 0}
                        ref={copyIndex === 0 ? seqRef : undefined}
                    >
                        {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
                    </ul>
                )),
            [copyCount, logos, renderLogoItem]
        );

        const containerStyle = useMemo(
            () => ({
                width: toCssLength(width) ?? '100%',
                ...cssVariables,
                ...style
            }),
            [width, cssVariables, style]
        );

        const animationDirectionClass = direction === 'left' ? 'logoloop-to-left' : 'logoloop-to-right';
        const animationPlayState = pauseOnHover ? 'group-hover:pause' : '';

        return (
            <div
                ref={containerRef}
                className={rootClasses}
                style={containerStyle}
                role="region"
                aria-label={ariaLabel}
            >
                {fadeOut && (
                    <>
                        <div
                            aria-hidden
                            className={cx(
                                'pointer-events-none absolute inset-y-0 left-0 z-10',
                                'w-[clamp(24px,8%,120px)]',
                                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                            )}
                        />
                        <div
                            aria-hidden
                            className={cx(
                                'pointer-events-none absolute inset-y-0 right-0 z-10',
                                'w-[clamp(24px,8%,120px)]',
                                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                            )}
                        />
                    </>
                )}

                <div
                    className={cx('flex w-max will-change-transform select-none', 
                                  'motion-reduce:transform-none',
                                  animationDirectionClass, 
                                  animationPlayState
                                )}
                >
                    {logoLists}
                </div>

                <style jsx global>{`
                    @keyframes logoloop-scroll-left {
                        from { transform: translate3d(0, 0, 0); }
                        to { transform: translate3d(calc(-1 * var(--logoloop-seqWidth)), 0, 0); }
                    }
                    @keyframes logoloop-scroll-right {
                        from { transform: translate3d(calc(-1 * var(--logoloop-seqWidth)), 0, 0); }
                        to { transform: translate3d(0, 0, 0); }
                    }
                    .logoloop-to-left {
                        animation: logoloop-scroll-left var(--logoloop-duration) linear infinite;
                    }
                    .logoloop-to-right {
                        animation: logoloop-scroll-right var(--logoloop-duration) linear infinite;
                    }
                    .group-hover\\:pause:hover {
                        animation-play-state: paused;
                    }
                    .will-change-transform {
                        will-change: transform;
                    }
                `}</style>
            </div>
        );
    }
);

LogoLoop.displayName = 'LogoLoop';


// --- SKILL CARD COMPONENT (Memoizado y Optimizado) ---

interface SkillCardProps {
    name: string;
    icon: ReactNode;
    description: string;
    color: string;
    textColor?: string;
}

const SkillCard: FC<SkillCardProps> = memo(({ name, icon, description, color, textColor = '#ffffff' }) => (
    <ElectricBorder 
        color={color} 
        // 💡 OPTIMIZACIÓN: Transición más corta (duration-300) y solo en el transform para más fluidez.
        className="h-full w-full rounded-xl transition-transform hover:scale-[1.03] duration-300"
    >
        <div 
            className="p-4 h-full min-h-36 flex flex-col items-start rounded-xl bg-slate-800/60 hover:bg-slate-700/70 transition-colors backdrop-blur-sm"
            style={{ color: textColor }}
        >
            <div className="flex items-center mb-3">
                <div 
                    className="p-3 mr-3 rounded-full" 
                    style={{ background: hexToRgba(color, 0.2), color: color }}
                >
                    {icon}
                </div>
                <h3 className="text-sm font-bold uppercase" style={{ color: color }}>{name}</h3>
            </div>
            <p className="text-xs text-slate-300 flex-row">{description}</p>
        </div>
    </ElectricBorder>
));

SkillCard.displayName = 'SkillCard';


// --- MAIN APP COMPONENT (Con Intersection Observer y Tiempos Optimizados) ---

const MisTecnologias: FC = () => {
    // 1. Estado para saber si la sección está en la vista
    const [isVisible, setIsVisible] = useState(false);
    // 2. Referencia al contenedor de las tarjetas
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    
    // 💡 OPTIMIZACIÓN 1: Reducir el retraso base de 50ms a 30ms para un escalonamiento más rápido.
    const baseDelayMs = 30; 

    // 3. Implementación del Intersection Observer
    useLayoutEffect(() => {
        if (!cardsContainerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Si la sección intersecta (es visible) y aún no hemos animado, la mostramos.
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    // Desconectar el observador después de la primera aparición
                    observer.unobserve(entry.target); 
                }
            },
            {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.2, // Activa cuando el 20% del contenedor es visible
            }
        );

        observer.observe(cardsContainerRef.current);

        return () => {
            // Limpieza al desmontar
            if (cardsContainerRef.current) {
                observer.unobserve(cardsContainerRef.current);
            }
        };
    }, [isVisible]);


    return (
        <div className="min-h-screen bg-black text-white font-inter p-4 sm:p-8 w-full" id="tecnologias">
            
            <div className="max-w-7xl mx-auto mb-10 text-center pt-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#61dca3] mb-4">
                Tecnologías
                </h2>
                <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl mx-auto">
                    Como desarrollador Frontend, me enfoco en crear experiencias de usuario fluidas y escalables utilizando el ecosistema moderno de React.
                </p>
            </div>

            <div className="mb-12 mx-auto border-y border-[#61dca3]/50 py-3">
                <LogoLoop 
                    logos={LOOP_SKILLS} 
                    speed={100}
                    direction="right"
                    logoHeight={32}
                    gap={40}
                    fadeOutColor="#000000" 
                    scaleOnHover={true} 
                />
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div 
                    ref={cardsContainerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {ALL_SKILLS.map((skill, index) => {
                        const delayMs = index * baseDelayMs;
                        
                        const animationClasses = isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'; 
                        
                        return (
                            <div 
                                key={skill.name} 
                                // 💡 OPTIMIZACIÓN 2: Usar duration-300 (más rápido que 400).
                                className={`flex justify-center transition-all duration-300 ${animationClasses}`}
                                style={{ transitionDelay: `${delayMs}ms` }}
                            >
                                <SkillCard 
                                    name={skill.name} 
                                    icon={skill.icon} 
                                    description={skill.description} 
                                    color={skill.color} 
                                    textColor={skill.textColor} 
                                /> 
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default MisTecnologias;