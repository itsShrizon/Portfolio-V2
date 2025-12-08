"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  density: number;
  color: string;
  baseX: number;
  baseY: number;
  velocity: number;
  angle: number;
}

const PARTICLE_COUNT = 100;
const MOUSE_RADIUS = 100;
const LINE_DISTANCE = 100;

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rafRef = useRef<number>(0);
  const strokeBaseRef = useRef<string>("255,255,255");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    setSize();

    const createParticles = () => {
      const list: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p: Particle = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 5 + 1,
          density: Math.random() * 30 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
          baseX: 0,
          baseY: 0,
          velocity: Math.random() * 0.2 - 0.1,
          angle: 0,
        };
        p.baseX = p.x;
        p.baseY = p.y;
        list.push(p);
      }
      particlesRef.current = list;
    };

    createParticles();

    const updateStrokeBase = () => {
      const isDark = document.documentElement.classList.contains("dark");
      strokeBaseRef.current = isDark ? "255,255,255" : "0,0,0";
    };

    updateStrokeBase();

    const observer = new MutationObserver(() => updateStrokeBase());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouseRef.current.x = e.touches[0]?.clientX ?? null;
      mouseRef.current.y = e.touches[0]?.clientY ?? null;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      setSize();
      createParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    const update = (p: Particle) => {
      const mouse = mouseRef.current;
      p.angle += p.velocity;
      p.baseX += Math.cos(p.angle) * 0.5;
      p.baseY += Math.sin(p.angle) * 0.5;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.hypot(dx, dy);
        if (distance < MOUSE_RADIUS) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = ((MOUSE_RADIUS - distance) / MOUSE_RADIUS) * 2;
          p.x -= forceDirectionX * force * p.density;
          p.y -= forceDirectionY * force * p.density;
        } else {
          if (p.x !== p.baseX) p.x -= (p.x - p.baseX) / 10;
          if (p.y !== p.baseY) p.y -= (p.y - p.baseY) / 10;
        }
      } else {
        if (p.x !== p.baseX) p.x -= (p.x - p.baseX) / 10;
        if (p.y !== p.baseY) p.y -= (p.y - p.baseY) / 10;
      }
    };

    const draw = (p: Particle) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.fill();
    };

    const connect = () => {
      const particles = particlesRef.current;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);
          if (distance < LINE_DISTANCE) {
            ctx.strokeStyle = `rgba(${strokeBaseRef.current}, ${1 - distance / LINE_DISTANCE})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        update(particles[i]);
        draw(particles[i]);
      }
      connect();
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
