"use client";

import {
    useEffect, useId, useLayoutEffect, useRef, useCallback, useMemo, useState, memo,
    FC, ReactNode, RefObject, DependencyList
} from 'react';
import React from 'react';
import {
    SiReact,
    SiTailwindcss,
    SiBootstrap,
    SiGit,
    SiGithub,
    SiVscodium,
    SiCanva,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiVite
} from "react-icons/si";
import { Phone, Zap } from "lucide-react";

// --- UTILITY FUNCTIONS ---

/**
 * Convierte un color hexadecimal a formato RGBA.
 * @param {string} hex - Color hexadecimal (#RRGGBB o #RGB).
 * @param {number} [alpha=1] - Opacidad (0 a 1).
 * @returns {string} Color en formato rgba().
 */
function hexToRgba(hex: string, alpha: number = 1): string {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let h = hex.replace('#', '');
    if (h.length === 3) {
        h = h
            .split('')
            .map(c => c + c)
            .join('');
    }
    const int = parseInt(h, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const toCssLength = (value: string | number | undefined | null) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));
const cx = (...parts: (string | false | null | undefined)[]): string => parts.filter(Boolean).join(' ');

// --- SKILLS DATA ICONS ---
// Íconos SVG para librerías específicas (React, Vscode, etc.)
const ReactIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.332 7.74l-3.303 3.303a1.5 1.5 0 01-2.121 0l-1.954-1.954a.5.5 0 00-.707 0l-1.06 1.06a.5.5 0 000 .707l2.66 2.66a2.5 2.5 0 003.535 0l4.01-4.01a.5.5 0 000-.707l-1.06-1.06a.5.5 0 00-.707 0z" fill="#61DAFB"/></svg>;
const VscodeIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path fill="#24A1E6" d="M22.84 5.25L11.5 1.03l-10.2 4.22L12 9.47zm-11.34 1.3L.75 6.64v10.72l11.41 5.02L23.5 17.36V6.64l-11.99.36z"/><path fill="#007ACC" d="M12 9.47l-10.59 4.3v2.85l10.59 4.67 11.08-4.87V13.7l-11.08-4.23z"/><path fill="#0078D4" d="M12 9.47l-4.5 2.2V13.7l4.5 2.2 4.5-2.2V11.67l-4.5-2.2z"/></svg>;
const TailwindIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path d="M12.0003 4.98188C14.0722 4.98188 15.3411 6.55437 15.7417 8.04374C16.1423 9.53312 15.9392 11.2393 15.3411 12.6393C14.743 14.0393 13.7448 15.1378 12.0003 15.1378C9.92837 15.1378 8.65943 13.5653 8.25883 12.0759C7.85822 10.5866 8.06132 8.88034 8.65943 7.48034C9.25754 6.08034 10.2557 4.98188 12.0003 4.98188ZM12.0003 17.1353C14.0722 17.1353 15.3411 18.7078 15.7417 20.1972C16.1423 21.6866 15.9392 23.3928 15.3411 24.7928C14.743 26.1928 13.7448 27.2912 12.0003 27.2912C9.92837 27.2912 8.65943 25.7187 8.25883 24.2293C7.85822 22.7399 8.06132 21.0337 8.65943 19.6337C9.25754 18.2337 10.2557 17.1353 12.0003 17.1353Z" fill="#06B6D4" transform="translate(-.5 -4.5)"/></svg>;
const BootstrapIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path fill="#7952B3" d="M12.0007 0C5.37257 0 0 5.37257 0 12.0007C0 18.6288 5.37257 24.0014 12.0007 24.0014C18.6288 24.0014 24.0014 18.6288 24.0014 12.0007C24.0014 5.37257 18.6288 0 12.0007 0ZM15.0007 18.0014H9.00073V16.0014H15.0007V18.0014ZM15.0007 14.0014H9.00073V12.0014H15.0007V14.0014ZM15.0007 10.0014H9.00073V8.00137H15.0007V10.0014Z"/></svg>;
const GitIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path fill="#F05032" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM15 15.75L12 12.75 9 15.75H6V8.25h3l3-3 3 3h3v7.5h-3zM12 4.25L7.5 8.75V15.25L12 19.75l4.5-4.5V8.75L12 4.25zM12 17.15L8.85 14V9.85L12 6.7l3.15 3.15V14L12 17.15z"/></svg>;
const GithubIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path fill="#FFFFFF" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.803 8.207 11.385.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.692.084-.692 1.205.086 1.838 1.233 1.838 1.233 1.07 1.835 2.809 1.305 3.493.998.108-.776.417-1.305.761-1.605-2.676-.303-5.492-1.338-5.492-5.923 0-1.31.465-2.38 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.596-2.819 5.617-5.497 5.918.42.36.791 1.103.791 2.223v3.293c0 .319.192.694.8.576C20.562 21.808 24 17.309 24 12c0-6.627-5.373-12-12-12z"/></svg>;
const CanvaIcon = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-auto"><path fill="#00C4CC" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.28 17.15c-3.18 0-5.77-2.5-5.77-5.58s2.59-5.58 5.77-5.58c1.37 0 2.59.48 3.59 1.48l-1.37 1.37c-.66-.64-1.53-.98-2.22-.98-2.12 0-3.83 1.7-3.83 3.69s1.71 3.69 3.83 3.69c.9 0 1.63-.3 2.22-.98l1.37 1.37c-.83.84-2.12 1.48-3.59 1.48z"/></svg>;


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

const ElectricBorder: FC<ElectricBorderProps> = ({ 
    children, 
    color = '#2DD4BF', // Default Teal
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
        if (!svg || !host) return;

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
                        // Suppress console warning
                    }
                }
            });
        });
    }, [chaos, filterId, speed]);

    useEffect(() => {
        updateAnim();
    }, [updateAnim]);

    useLayoutEffect(() => {
        if (!rootRef.current) return;
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
};


// --- LOGO LOOP COMPONENT ---

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
};

const useResizeObserverHook = (callback: () => void, elements: RefObject<HTMLElement | null>[], dependencies: DependencyList) => {
    useEffect(() => {
        if (typeof window === 'undefined' || !window.ResizeObserver) {
            const handleResize = () => callback();
            window.addEventListener('resize', handleResize);
            callback();
            return () => window.removeEventListener('resize', handleResize);
        }

        const observers: ResizeObserver[] = elements.map(ref => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        }).filter((obs): obs is ResizeObserver => obs !== null);

        callback();

        return () => {
            observers.forEach(observer => observer?.disconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useImageLoader = (seqRef: RefObject<HTMLElement | null>, onLoad: () => void, dependencies: DependencyList) => {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];

        if (images.length === 0) {
            onLoad();
            return;
        }

        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;
            if (remainingImages === 0) {
                onLoad();
            }
        };

        images.forEach(img => {
            const htmlImg = img as HTMLImageElement;
            if (htmlImg.complete) {
                handleImageLoad();
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true });
                htmlImg.addEventListener('error', handleImageLoad, { once: true });
            }
        });

        return () => {
            images.forEach(img => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
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

        useResizeObserverHook(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
        useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
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
                            'flex-none mr-(--logoloop-gap) text-[length(--logoloop-logoHeight)] leading-1',
                            'p-2 flex items-center justify-center rounded-xl backdrop-blur-sm', // Más redondeado
                            scaleOnHover && 'overflow-visible group/item'
                        )}
                        key={key}
                        role="listitem"
                        // Usamos un fondo más sutil para los logos
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


// --- SKILL CARD COMPONENT ---

interface SkillCardProps {
    name: string;
    icon: ReactNode;
    description: string;
    color: string;
    textColor?: string;
}

const SkillCard: FC<SkillCardProps> = ({ name, icon, description, color, textColor = '#ffffff' }) => (
    <ElectricBorder 
        color={color} 
        className="h-full w-full rounded-xl transition-all hover:scale-[1.03] duration-400" // Ajuste hover
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
                    {typeof icon === 'string' ? <span className="text-xl font-mono">{icon}</span> : icon}
                </div>
                <h3 className="text-sm font-bold uppercase" style={{ color: color }}>{name}</h3>
            </div>
            <p className="text-xs text-slate-300 flex-row">{description}</p>
        </div>
    </ElectricBorder>
);


// --- MAIN APP COMPONENT (UNIFICADO) ---

const MisTecnologias: FC = () => {

    return (
        <div className="min-h-screen bg-black text-white font-inter p-4 sm:p-8 w-full">
            
            <div className="max-w-7xl mx-auto mb-10 text-center pt-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#61dca3] mb-4">
                Tecnologías
                </h2>
                <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl mx-auto">
                    Como desarrollador Frontend, me enfoco en crear experiencias de usuario fluidas y escalables utilizando el ecosistema moderno de React.
                </p>
            </div>

            {/* Carrusel de Logos (LogoLoop) - Habilidades Principales */}
            <div className="mb-14 mx-auto border-y border-[#61dca3]/50 py-6">
                <LogoLoop 
                    logos={LOOP_SKILLS} 
                    speed={100}
                    direction="right" // Un toque distinto en la dirección
                    logoHeight={32}
                    gap={40}
                    fadeOutColor="#000000" // Fondo negro para el fade-out
                />
            </div>

            {/* Grilla de Habilidades (Skill Cards) - Todos Juntos */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {ALL_SKILLS.map((skill, index) => (
                        <div key={index} className="flex justify-center">
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
            
            <div className="h-20" /> {/* Espacio al final */}
        </div>
    );
};

export default MisTecnologias;