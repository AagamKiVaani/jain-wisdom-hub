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
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

    // Calculate glare reflection
    const glareX = ((e.clientX - left) / width) * 100;
    const glareY = ((e.clientY - top) / height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.22 });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - left - width / 2) / 25;
    const y = (touch.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

    const glareX = ((touch.clientX - left) / width) * 100;
    const glareY = ((touch.clientY - top) / height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.2 });
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
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
          onTouchStart={handleMouseEnter}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={onClick}
          whileTap={{ scale: 0.97 }}
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

          {/* Dynamic Specular Glass Glare Layer */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45), transparent 75%)`,
            }}
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
