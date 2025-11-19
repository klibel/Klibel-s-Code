// Particles.tsx

"use client";

import React, { useEffect, useRef, useMemo } from 'react';

// --- Definiciones de tipos para OGL (Necesarias para la compilación) ---
// Estas clases son necesarias para que TypeScript entienda el código WebGL.
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

// --- Funciones de Utilidad ---
const hexToRgb = (hex: string): number[] => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const int = parseInt(hex, 16);
    return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

// --- Shaders GLSL (Necesarios para el efecto visual) ---
const vertex = /* glsl */ `
attribute vec3 position;
attribute vec4 random;
attribute vec3 color;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;
uniform float uAlphaParticles;
varying vec4 vColor;

void main() {
    float size = uBaseSize * (1.0 + random.x * uSizeRandomness);
    vColor = vec4(color, uAlphaParticles == 1.0 ? random.w : 1.0);
    
    vec3 p = position;
    p.z += sin(p.x * 0.1 + uTime * 0.5) * uSpread * 0.05;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p * uSpread, 1.0);
    gl_PointSize = size / -gl_Position.w;
}
`;

const fragment = /* glsl */ `
precision highp float;
uniform float uAlphaParticles;
varying vec4 vColor;
void main() {
    float r = 0.0, strength = 0.6;
    vec2 c = gl_PointCoord - 0.5;
    r = dot(c, c);
    gl_FragColor = vColor * smoothstep(strength, 0.0, r);
}
`;

// --- Interfaces ---
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

// --- Componente Particles ---
export const Particles: React.FC<ParticlesProps> = (props) => {
    const {
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
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        // Solo proceder si estamos en un entorno de navegador y OGL está definido
        if (!container || typeof (window as any).Renderer === 'undefined') return;

        // @ts-ignore
        const renderer = new Renderer({ depth: false, alpha: true });
        const gl = renderer.gl;
        const canvasElement = gl.canvas;

        if (!(canvasElement instanceof HTMLCanvasElement)) return;
        
        container.appendChild(canvasElement);
        gl.clearColor(0, 0, 0, 0);

        // @ts-ignore
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

        // @ts-ignore
        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            random: { size: 4, data: randoms },
            color: { size: 3, data: colors }
        });

        // @ts-ignore
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

        // @ts-ignore
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
            
            if (canvasElement instanceof HTMLCanvasElement && container.contains(canvasElement)) {
                container.removeChild(canvasElement);
            }
        };
    }, [
        particleCount, particleSpread, speed, moveParticlesOnHover, particleHoverFactor, 
        alphaParticles, particleBaseSize, sizeRandomness, cameraDistance, disableRotation,
    ]);

    return <div ref={containerRef} className={`relative w-full h-full ${className}`} />;
};