"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Flame, HeartHandshake } from "lucide-react";

interface KarmaParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  isAttached: boolean;
  alpha: number;
}

export default function SoulVisualizerPreview({
  soundEnabled = true,
}: {
  soundEnabled?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeState, setActiveState] = useState<"pure" | "anger" | "forgiveness">("pure");
  const [purityLevel, setPurityLevel] = useState<number>(100);
  const particlesRef = useRef<KarmaParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.5;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleAction = (state: "pure" | "anger" | "forgiveness") => {
    playClick();
    setActiveState(state);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (state === "anger") {
      setPurityLevel(35);
      // Spawn dense grey-crimson karma particles that attach to the soul
      const newParticles: KarmaParticle[] = [];
      for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 140 + Math.random() * 80;
        const targetDist = 20 + Math.random() * 35;
        newParticles.push({
          x: centerX + Math.cos(angle) * dist,
          y: centerY + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          targetX: centerX + Math.cos(angle) * targetDist,
          targetY: centerY + Math.sin(angle) * targetDist,
          radius: Math.random() * 2.5 + 1.5,
          color: Math.random() > 0.4 ? "rgba(180, 83, 9," : "rgba(75, 85, 99,", // Dark Amber / Charcoal
          isAttached: true,
          alpha: Math.random() * 0.5 + 0.5,
        });
      }
      particlesRef.current = newParticles;
    } else if (state === "forgiveness") {
      setPurityLevel(85);
      // Disperse attached particles outward into space
      particlesRef.current.forEach((p) => {
        p.isAttached = false;
        const angle = Math.atan2(p.y - centerY, p.x - centerX);
        p.vx = Math.cos(angle) * (3 + Math.random() * 4);
        p.vy = Math.sin(angle) * (3 + Math.random() * 4);
      });
    } else {
      setPurityLevel(100);
      particlesRef.current = [];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();

    let time = 0;

    const render = () => {
      time += 0.03;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Outer Orbiting Energy Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
      ctx.strokeStyle = activeState === "anger" ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Radiant Inner Soul Core (The Jīva)
      const corePulse = Math.sin(time * 2) * 4;
      const coreRadius = (purityLevel > 60 ? 32 : 24) + corePulse;

      // Soft ambient golden halo
      const haloGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, coreRadius * 2.6);
      if (purityLevel > 60) {
        haloGrad.addColorStop(0, "rgba(251, 191, 36, 0.5)"); // Radiant Gold
        haloGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.2)");
        haloGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
      } else {
        haloGrad.addColorStop(0, "rgba(217, 119, 6, 0.3)"); // Dimmed Amber
        haloGrad.addColorStop(0.7, "rgba(75, 85, 99, 0.15)");
        haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // Brilliant Crystal Core
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      if (purityLevel > 60) {
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.3, "#fde047");
        coreGrad.addColorStop(0.8, "#f59e0b");
        coreGrad.addColorStop(1, "#d97706");
      } else {
        coreGrad.addColorStop(0, "#fef08a");
        coreGrad.addColorStop(0.4, "#b45309");
        coreGrad.addColorStop(0.9, "#4b5563");
        coreGrad.addColorStop(1, "#1f2937");
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // 3. Update & Draw Karma Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        if (p.isAttached) {
          // Smoothly pull toward target on the soul surface
          p.x += (p.targetX - p.x) * 0.08;
          p.y += (p.targetY - p.y) * 0.08;
        } else {
          // Flying outward
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.02;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeState, purityLevel]);

  return (
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-950/10 via-black/40 to-black/80 p-5 backdrop-blur-xl shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/90 font-mono">
            Interactive Concept Lab
          </span>
        </div>
        <div className="text-xs font-mono text-amber-200/80 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          Soul Radiance: <span className="font-bold text-amber-300">{purityLevel}%</span>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative h-56 w-full my-3 flex items-center justify-center overflow-hidden rounded-xl bg-black/50 border border-white/5">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

        {/* Center overlay label */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] text-gray-400 font-mono bg-black/70 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
          <span>
            {activeState === "pure"
              ? "✨ Pure Atman (Unbound Soul)"
              : activeState === "anger"
              ? "🌪️ Karma Dust (Kashaya) Clinging to Soul"
              : "🕊️ Samvara & Nirjara (Karma Cleared)"}
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button
          onClick={() => handleAction("anger")}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeState === "anger"
              ? "bg-red-500/20 text-red-300 border border-red-500/40 shadow-lg shadow-red-500/20 scale-[0.98]"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:text-white"
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>Anger (Krodha)</span>
        </button>

        <button
          onClick={() => handleAction("forgiveness")}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeState === "forgiveness"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/20 scale-[0.98]"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:text-white"
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
          <span>Forgiveness</span>
        </button>

        <button
          onClick={() => handleAction("pure")}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeState === "pure"
              ? "bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20 scale-[0.98]"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Pure State</span>
        </button>
      </div>

      <div className="mt-3 text-center text-[11px] text-gray-400">
        💡 <span className="text-amber-300 font-medium">Try it:</span> Tap buttons above to see how feelings physically attract or shed karma particles!
      </div>
    </div>
  );
}
