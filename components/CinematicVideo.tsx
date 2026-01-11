'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Maximize2, Film } from "lucide-react";
import Image from "next/image";

interface CinematicVideoProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  subtitle?: string;
}

export default function CinematicVideo({ videoId, thumbnailUrl, title, subtitle }: CinematicVideoProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* CONTAINER:
        - Mobile: aspect-[4/5] (Your preferred vertical poster)
        - Desktop: aspect-video (16:9) but ENHANCED visually
      */}
      <div 
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-black aspect-[4/5] md:aspect-video transition-all duration-500 hover:shadow-rose-500/20 hover:border-rose-500/30"
      >
        
        {/* BACKGROUND IMAGE (Parallax Zoom) */}
        <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
           <Image 
             src={thumbnailUrl} 
             alt={title} 
             fill 
             className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
             sizes="(max-width: 768px) 100vw, 1200px"
           />
           {/* Gradient: Darker at bottom for text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        </div>

        {/* CONTENT LAYER */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
           
           {/* 1. PLAY BUTTON (Enhanced "Clicky" Look) */}
           <div className="relative group/btn mb-6 md:mb-8">
              {/* Pulse Ring (Desktop Only) */}
              <div className="hidden md:block absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-0 group-hover/btn:opacity-40 transition-opacity duration-500 animate-pulse"></div>
              
              {/* The Button */}
              <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-600 group-hover:border-rose-500">
                 <Play fill="currentColor" className="w-6 h-6 md:w-10 md:h-10 ml-1 text-white drop-shadow-md" />
              </div>
           </div>

           {/* 2. TEXT (Desktop: Glassmorphic Floating Card) */}
           <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
               
               {/* Mobile Title (Simple) */}
               <h3 className="md:hidden text-2xl font-black uppercase tracking-wider drop-shadow-lg text-white mb-2">
                 {title}
               </h3>

               {/* Desktop Title (Big & Bold) */}
               <h3 className="hidden md:block text-5xl lg:text-6xl font-black uppercase tracking-tight drop-shadow-2xl text-white mb-3">
                 {title}
               </h3>
               
               {/* Subtitle */}
               {subtitle && (
                 <p className="text-white/80 font-serif italic text-sm md:text-2xl drop-shadow-lg max-w-2xl mx-auto leading-relaxed opacity-90">
                   <span className="hidden md:inline">&ldquo;</span>
                   {subtitle}
                   <span className="hidden md:inline">&rdquo;</span>
                 </p>
               )}
           </div>
           
           {/* 3. DESKTOP "WATCH FILM" BADGE (Bottom Right) */}
           <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md">
              <Maximize2 size={12} /> Click to Expand
           </div>

           {/* 4. MOBILE "WATCH FILM" BADGE (Bottom Center) */}
           <div className="md:hidden absolute bottom-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 opacity-80">
              <Maximize2 size={12} /> Watch Film
           </div>

        </div>
      </div>

      {/* THEATER MODE (Popup) - Kept same as it works well */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-4 right-4 z-20 p-3 bg-black/50 hover:bg-white/10 text-white rounded-full backdrop-blur-md transition-colors border border-white/10 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}