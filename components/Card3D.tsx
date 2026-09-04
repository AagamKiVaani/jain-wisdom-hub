"use client";

import React, { createContext, useState, useContext, useRef } from "react";
import { motion } from "framer-motion";

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

export const Card3DContainer = ({
  children,
  className = "",
  containerClassName = "",
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Throttle tilt calculations to display refresh rate via requestAnimationFrame
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      if (!rectRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
      const { left, top, width, height } = rectRef.current;
      const x = (clientX - left - width / 2) / 20;
      const y = (clientY - top - height / 2) / 20;
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

      // Direct DOM update for glare reflection to avoid triggering React re-renders on mousemove
      if (glareRef.current) {
        const glareX = ((clientX - left) / width) * 100;
        const glareY = ((clientY - top) / height) * 100;
        glareRef.current.style.opacity = "0.22";
        glareRef.current.style.background = `radial-gradient(circle 350px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45), transparent 75%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rectRef.current = null;
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`flex items-center justify-center ${containerClassName}`}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={`relative flex items-center justify-center transition-transform duration-200 ease-out will-change-transform ${className}`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}

          {/* Dynamic Specular Glass Glare Layer (Direct DOM styled to prevent React re-renders) */}
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-30 opacity-0"
          />
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const Card3DItem = ({
  as = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  children?: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const [isMouseEntered] = useMouseEnter();
  const Component = as as any;

  return (
    <Component
      style={{
        transform: isMouseEntered
          ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
          : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
      }}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a Card3DContainer");
  }
  return context;
};

export default Card3DContainer;
