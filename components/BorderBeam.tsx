"use client";

import React from "react";

export default function BorderBeam({
  className = "",
  size = 120,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#f59e0b", // Amber-500
  colorTo = "#fbbf24",   // Amber-400
}: {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        style={{
          width: `${size}px`,
          animation: `border-beam ${duration}s infinite linear`,
          background: `linear-gradient(to right, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        className="absolute aspect-square [offset-anchor:calc(var(--size)/2)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]"
      />
    </div>
  );
}
