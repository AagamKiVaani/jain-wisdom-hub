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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Optimal particle count: 35 for mobile, 60 for desktop
    const isMobile = width < 768;
    const particleCount = isMobile ? Math.min(30, quantity) : Math.min(55, quantity);

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
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.25,
        alpha: Math.random() * 0.35 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.3 + 0.1),
        color: goldTones[Math.floor(Math.random() * goldTones.length)],
      });
    }

    let time = 0;
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward with a subtle gentle wave
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.12;

        // Pulsing glow
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.15;
        if (p.alpha < 0.05) p.alpha = 0.05;
        if (p.alpha > 0.8) p.alpha = 0.8;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft ambient outer halo (zero-cost blur effect without Gaussian kernel)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha * 0.25})`;
        ctx.fill();

        // Draw bright core ember
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Pause when tab is not active to save battery and CPU
    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          render();
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [quantity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-screen w-screen ${className}`}
    />
  );
}
