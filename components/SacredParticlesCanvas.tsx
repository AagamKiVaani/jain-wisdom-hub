"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  vx: number;
  vy: number;
  color: string;
}

export default function SacredParticlesCanvas({
  className = "",
  quantity = 75,
}: {
  className?: string;
  quantity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Dynamic particle count: optimal density for mobile & desktop
    const isMobile = width < 768;
    const particleCount = isMobile ? Math.min(45, quantity) : quantity;

    // Sacred golden and amber color palette
    const goldTones = [
      "rgba(251, 191, 36,",  // Amber-400
      "rgba(245, 158, 11,",  // Amber-500
      "rgba(252, 211, 77,",  // Yellow-300
      "rgba(249, 115, 22,",  // Saffron/Orange-500
      "rgba(255, 237, 213,", // Ivory gold
    ];

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.0,
        baseAlpha: Math.random() * 0.4 + 0.35,
        alpha: Math.random() * 0.4 + 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.12), // Gentle upward celestial ascent
        color: goldTones[Math.floor(Math.random() * goldTones.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward with a subtle gentle wave
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.15;

        // Pulsing glow
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.2;
        p.alpha = Math.max(0.05, Math.min(0.85, p.alpha));

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing ember
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Soft radial glow
        const glowRadius = p.radius * 3.5;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        gradient.addColorStop(0, `${p.color} ${p.alpha})`);
        gradient.addColorStop(0.5, `${p.color} ${p.alpha * 0.4})`);
        gradient.addColorStop(1, `${p.color} 0)`);

        ctx.fillStyle = gradient;
        ctx.shadowColor = "rgba(245, 158, 11, 0.4)";
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [quantity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
    />
  );
}
