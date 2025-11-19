"use client";

import React, { 
    useRef, useEffect, useCallback, useMemo, useState, memo, FC, 
    ReactNode, RefObject, DependencyList, useId, useLayoutEffect 
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
  // Corregido: SiGithub ya es blanco, no necesita color="" si no se pasa explícitamente.
  { name: "GitHub", icon: <SiGithub size={30} color="#FFFFFF" />, color: "#FFFFFF", textColor: "text-black", description: "Plataforma de colaboración, pull requests, revisiones de código y CI/CD." }, 
  { name: "VS Code", icon: <SiVscodium size={30} color="#007ACC" />, color: "#007ACC", description: "Uso avanzado del editor, atajos, extensiones y configuración de entorno." },

  { name: "Canva", icon: <SiCanva size={30} color="#00C4CC" />, color: "#00C4CC", description: "Creación de prototipos visuales rápidos, recursos gráficos y diseño UI/UX básico." },
  { name: "IA / API", icon: <Zap size={30} />, color: "#2DD4BF", description: "Integración de modelos de inteligencia artificial y APIs REST." },
  { name: "React Native / Expo", icon: <Phone size={30} color="#2DD4BF" />, color: "#2DD4BF", description: "Desarrollo de apps móviles nativas para iOS y Android desde JavaScript/React." },
];


// --- ELECTRIC BORDER COMPONENT ---

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
    const svgRef = useRef<SVGSVGElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const strokeRef = useRef<HTMLDivElement>(null);

    const updateAnim = useCallback(() => {
        const svg = svgRef.current;
        const host = rootRef.current;
        if (!svg || !host || typeof window === 'undefined') return;

        if (strokeRef.current) {
            strokeRef.current.style.filter = `url(#${filterId})`;
        }

        const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
        const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

        const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]')) as SVGAnimateElement[];
        if (dyAnims.length >= 2) {
            dyAnims[0].setAttribute('values', `${height}; 0`);
            dyAnims[1].setAttribute('values', `0; -${height}`);
        }

        const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]')) as SVGAnimateElement[];
        if (dxAnims.length >= 2) {
            dxAnims[0].setAttribute('values', `${width}; 0`);
            dxAnims[1].setAttribute('values', `0; -${width}`);
        }

        const baseDur = 6;
        const dur = Math.max(0.001, baseDur / (speed || 1));
        [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

        const disp = svg.querySelector('feDisplacementMap');
        if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

        const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
        if (filterEl) {
            filterEl.setAttribute('x', '-200%');
            filterEl.setAttribute('y', '-200%');
            filterEl.setAttribute('width', '500%');
            filterEl.setAttribute('height', '500%');
        }

        requestAnimationFrame(() => {
            [...dyAnims, ...dxAnims].forEach(a => {
                if (a && typeof (a as any).beginElement === 'function') {
                    try {
                        (a as any).beginElement();
                    } catch {
                        // Ignore console warning
                    }
                }
            });
        });
    }, [chaos, filterId, speed]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            updateAnim();
        }
    }, [updateAnim]);

    useLayoutEffect(() => {
        if (!rootRef.current || typeof window === 'undefined' || !window.ResizeObserver) return;
        
        const ro = new ResizeObserver(() => updateAnim());
        ro.observe(rootRef.current);
        updateAnim();
        
        return () => ro.disconnect();
    }, [updateAnim]);

    const inheritRadius = useMemo(() => ({
        borderRadius: style?.borderRadius ?? 'inherit'
    }), [style?.borderRadius]);

    const strokeStyle = useMemo(() => ({
        ...inheritRadius,
        borderWidth: thickness,
        borderStyle: 'solid',
        borderColor: color
    }), [color, inheritRadius, thickness]);

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
                ref={svgRef}
                className="fixed -left-[10000px] -top-[10000px] w-2.5 h-2.5 opacity-[0.001] pointer-events-none"
                aria-hidden
                focusable="false"
            >
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="combinedNoise"
                            scale="30"
                            xChannelSelector="R"
                            yChannelSelector="B"
                        />
                    </filter>
                </defs>
            </svg>

            <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
                <div ref={strokeRef} className="absolute inset-0 box-border" style={strokeStyle} />
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


// --- LOGO LOOP COMPONENT HOOKS (Aislados) ---

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
};

const useAnimationLoop = (
    trackRef: RefObject<HTMLElement | null>, 
    targetVelocity: number, 
    seqWidth: number, 
    isHovered: boolean, 
    pauseOnHover: boolean
) => {
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track || typeof window === 'undefined') return;

        const prefersReduced =
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (seqWidth > 0) {
            offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
            track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }

        if (prefersReduced) {
            track.style.transform = 'translate3d(0, 0, 0)';
            return () => {
                lastTimestampRef.current = null;
            };
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            const target = pauseOnHover && isHovered ? 0 : targetVelocity;

            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqWidth > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
                offsetRef.current = nextOffset;

                const translateX = -offsetRef.current;
                track.style.transform = `translate3d(${translateX}px, 0, 0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

// --- LOGO LOOP COMPONENT ---

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
        const trackRef = useRef<HTMLDivElement>(null);
        const seqRef = useRef<HTMLUListElement>(null);

        const [seqWidth, setSeqWidth] = useState<number>(0);
        const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
        const [isHovered, setIsHovered] = useState<boolean>(false);

        const targetVelocity = useMemo(() => {
            const magnitude = Math.abs(speed);
            const directionMultiplier = direction === 'left' ? 1 : -1;
            const speedMultiplier = speed < 0 ? -1 : 1;
            return magnitude * directionMultiplier * speedMultiplier;
        }, [speed, direction]);

        const updateDimensions = useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

            if (sequenceWidth > 0) {
                setSeqWidth(Math.ceil(sequenceWidth));
                const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
                setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
            }
        }, []);

        useEffect(() => {
            updateDimensions();
            if (typeof window === 'undefined') return;

            const handleResize = () => updateDimensions();
            window.addEventListener('resize', handleResize);
            
            // Usamos ResizeObserver para detectar cambios internos en la lista (logos, padding)
            const ro = new ResizeObserver(updateDimensions);
            if(containerRef.current) ro.observe(containerRef.current);
            if(seqRef.current) ro.observe(seqRef.current);

            return () => {
                window.removeEventListener('resize', handleResize);
                ro.disconnect();
            };
        }, [updateDimensions, logos, gap, logoHeight]);
        
        useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

        const cssVariables = useMemo(
            () => ({
                '--logoloop-gap': `${gap}px`,
                '--logoloop-logoHeight': `${logoHeight}px`,
                ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
            }),
            [gap, logoHeight, fadeOutColor]
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

        const handleMouseEnter = useCallback(() => {
            if (pauseOnHover) setIsHovered(true);
        }, [pauseOnHover]);

        const handleMouseLeave = useCallback(() => {
            if (pauseOnHover) setIsHovered(false);
        }, [pauseOnHover]);

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
                            'flex-none mx-6 leading-1',
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
                        className="flex items-center"
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

        return (
            <div
                ref={containerRef}
                className={rootClasses}
                style={containerStyle}
                role="region"
                aria-label={ariaLabel}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {fadeOut && (
                    <>
                        <div
                            aria-hidden
                            className={cx(
                                'pointer-events-none absolute inset-y-0 left-0 z-1',
                                'w-[clamp(24px,8%,120px)]',
                                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                            )}
                        />
                        <div
                            aria-hidden
                            className={cx(
                                'pointer-events-none absolute inset-y-0 right-0 z-1',
                                'w-[clamp(24px,8%,120px)]',
                                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                            )}
                        />
                    </>
                )}

                <div
                    className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}
                    ref={trackRef}
                >
                    {logoLists}
                </div>
            </div>
        );
    }
);

LogoLoop.displayName = 'LogoLoop';


// --- SKILL CARD COMPONENT (Memoizado) ---

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
        className="h-full w-full rounded-xl transition-all hover:scale-[1.03] duration-400"
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


// --- MAIN APP COMPONENT ---

const MisTecnologias: FC = () => {

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
                />
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {ALL_SKILLS.map((skill, index) => (
                        <div key={skill.name} className="flex justify-center">
                            <SkillCard 
                                name={skill.name} 
                                icon={skill.icon} 
                                description={skill.description} 
                                color={skill.color} 
                                textColor={skill.textColor} 
                            /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MisTecnologias;