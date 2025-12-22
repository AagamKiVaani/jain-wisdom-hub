"use client";

import { ArrowLeft, Volume2, VolumeX, Info, RefreshCw } from "lucide-react"; 
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. LOCALIZATION ---
const translations = {
  title: {
    en: "The Nature of the Soul",
    hi: "आत्मा का स्वरूप",
    kn: "ಆತ್ಮದ ಸ್ವರೂಪ"
  },
  subtitle: {
    en: "Deh Parimana: Formless, yet shaping to the body.",
    hi: "देह परिमाण: निराकार, फिर भी देह के आकार में।",
    kn: "ದೇಹ ಪರಿಮಾಣ: ನಿರಾಕಾರ, ಆದರೂ ದೇಹದ ಆಕಾರಕ್ಕೆ ತಕ್ಕಂತೆ."
  },
  desc: {
    en: "The soul (Jiva) has no shape of its own. Like water, it is fluid and infinite. Drag the soul into different bodies to see how it fills the vessel.",
    hi: "आत्मा (जीव) का अपना कोई आकार नहीं होता। यह जल की तरह तरल और अनंत होती है। आत्मा को अलग-अलग शरीरों में ले जाकर देखें कि वह जिस शरीर में प्रवेश करती है, उसे पूरी तरह कैसे भर देती है।",
    kn: "ಆತ್ಮ (ಜೀವ)ಕ್ಕೆ ತನ್ನದೇ ಆದ ಆಕಾರವಿಲ್ಲ. ಅದು ನೀರಿನಂತೆ ಹರಿಯುವದು ಮತ್ತು ಅನಂತವಾದುದು. ಆತ್ಮವನ್ನು ವಿಭಿನ್ನ ದೇಹಗಳಿಗೆ ಕರೆದೊಯ್ಯಿ ನೋಡಿ, ಅದು ಪ್ರವೇಶಿಸುವ ಪ್ರತಿಯೊಂದು ದೇಹವನ್ನು ಹೇಗೆ ಸಂಪೂರ್ಣವಾಗಿ ತುಂಬಿಕೊಳ್ಳುತ್ತದೆ ಎಂಬುದನ್ನು."
  },
  disclaimer: {
    en: "The soul has no physical shape; it is depicted here as a circle purely for visualization purposes.",
    hi: "आत्मा का कोई भौतिक आकार नहीं होता; यहाँ इसे केवल दृश्य समझ के लिए एक वृत्त के रूप में दर्शाया गया है।",
    kn: "ಆತ್ಮಕ್ಕೆ ಯಾವುದೇ ಭೌತಿಕ ಆಕಾರವಿಲ್ಲ; ಇಲ್ಲಿ ಅದನ್ನು ಕೇವಲ ದೃಶ್ಯಾತ್ಮಕ ಅರಿವಿಗಾಗಿ ವೃತ್ತದ ರೂಪದಲ್ಲಿ ತೋರಿಸಲಾಗಿದೆ."
  },
  backBtn: { en: "Library", hi: "लाइब्रेरी", kn: "ಲೈಬ್ರರಿ" },
  targets: {
    human: { en: "Human", hi: "मनुष्य", kn: "ಮನುಷ್ಯ" },
    elephant: { en: "Elephant", hi: "हाथी", kn: "ಆನೆ" },
    ant: { en: "Ant", hi: "चींटी", kn: "ಇರುವೆ" },
    tree: { en: "Plant", hi: "वनस्पति", kn: "ಸಸ್ಯ" }
  }
};

// --- 2. COMPONENT: The Body Image ---
function TargetBody({ id, label, isActive, isHovered, position }: any) {
  return (
    <div 
        className={`absolute ${position} flex flex-col items-center gap-1 transition-all z-10 pointer-events-none select-none`}
    >
        {/* We use this ID to find the element position in Real-Time */}
        <div 
            id={`target-${id}`} 
            className="relative flex items-center justify-center w-28 h-28 md:w-48 md:h-48 pointer-events-auto"
        >
            
            {/* BLACK IMAGE (Default) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={`/images/${id}-black.png`} 
                alt={`${label} Dark`}
                className={`absolute object-contain transition-all duration-500`}
                style={{ 
                    width: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%',
                    height: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%',
                    opacity: isActive ? 0 : (isHovered ? 0.4 : 0.6),
                    filter: "invert(0.3)" 
                }}
            />

            {/* WHITE IMAGE (Active) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={`/images/${id}-white.png`} 
                alt={`${label} Light`} 
                className={`absolute object-contain transition-all duration-500`}
                style={{ 
                    width: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%',
                    height: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%',
                    opacity: isActive || isHovered ? 1 : 0,
                    transform: isActive ? 'scale(1.1)' : (isHovered ? 'scale(1.05)' : 'scale(0.95)'),
                    filter: isActive || isHovered ? "drop-shadow(0 0 20px rgba(255,255,255,0.8))" : "none",
                }}
            />
            
        </div>
        
        <span className={`-mt-6 md:-mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isActive || isHovered ? "text-blue-400" : "text-zinc-500"}`}>
            {label}
        </span>
    </div>
  );
}

// --- 3. MAIN PAGE ---
export default function SoulKarmaPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<"en" | "hi" | "kn">("en");
  const [isMuted, setIsMuted] = useState(false);
  const [activeBody, setActiveBody] = useState<null | 'human' | 'elephant' | 'ant' | 'tree'>(null);
  const [hoveredBody, setHoveredBody] = useState<null | 'human' | 'elephant' | 'ant' | 'tree'>(null);
  
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    params.then((p) => setLang(p.lang as "en" | "hi" | "kn"));
  }, [params]);

  const t = (key: string) => {
    // @ts-ignore
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  };

  const handleReset = () => {
    setActiveBody(null);
    setHoveredBody(null);
    setResetKey(prev => prev + 1); 
  };

  const checkProximity = (pointerEvent: MouseEvent | TouchEvent | PointerEvent) => {
    let clientX, clientY;
    if ('touches' in pointerEvent) {
         // @ts-ignore
         clientX = pointerEvent.touches[0].clientX;
         // @ts-ignore
         clientY = pointerEvent.touches[0].clientY;
    } else {
         // @ts-ignore
         clientX = pointerEvent.clientX;
         // @ts-ignore
         clientY = pointerEvent.clientY;
    }

    const targets = ['human', 'elephant', 'ant', 'tree'];
    
    for (const id of targets) {
        const el = document.getElementById(`target-${id}`);
        if (el) {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(clientX - centerX, clientY - centerY);
            
            if (dist < 120) return id;
        }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-500 overflow-hidden">
      
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

      <nav className="fixed top-24 left-6 right-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
             <Link href={`/${lang}`} className="flex items-center gap-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all bg-white/80 dark:bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800 shadow-sm group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                <span className="text-[10px] font-bold uppercase tracking-widest">{t('backBtn')}</span>
            </Link>
        </div>
        <div className="pointer-events-auto">
            <button onClick={() => setIsMuted(!isMuted)} className="p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800 shadow-sm">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 select-none">
        
        <header className="text-center max-w-2xl mx-auto mb-8 md:mb-16 relative">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[10px] font-bold mb-6 tracking-widest uppercase backdrop-blur-md shadow-sm">
               <Info size={12} /> {t('subtitle')}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                {t('title')}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {t('desc')}
            </p>
        </header>

        {/* --- INTERACTION STAGE --- */}
        <div className="relative w-full max-w-5xl h-[65vh] md:h-[70vh] border border-dashed rounded-3xl flex items-center justify-center overflow-hidden bg-zinc-950 border-zinc-800 shadow-2xl">
            
            {/* 1. HUMAN */}
            <TargetBody 
                id="human" 
                label={translations.targets.human[lang]} 
                isActive={activeBody === 'human'}
                isHovered={hoveredBody === 'human'}
                position="top-4 left-8 md:top-6 md:left-12" 
            />

            {/* 2. ELEPHANT */}
            <TargetBody 
                id="elephant" 
                label={translations.targets.elephant[lang]} 
                isActive={activeBody === 'elephant'}
                isHovered={hoveredBody === 'elephant'}
                position="top-4 right-8 md:top-6 md:right-12" 
            />

            {/* 3. ANT */}
            <TargetBody 
                id="ant" 
                label={translations.targets.ant[lang]} 
                isActive={activeBody === 'ant'}
                isHovered={hoveredBody === 'ant'}
                position="bottom-28 left-8 md:bottom-10 md:left-12" 
            />

            {/* 4. TREE */}
            <TargetBody 
                id="tree" 
                label={translations.targets.tree[lang]} 
                isActive={activeBody === 'tree'}
                isHovered={hoveredBody === 'tree'}
                position="bottom-28 right-8 md:bottom-10 md:right-12" 
            />

            {/* THE DRAGGABLE SOUL */}
            <AnimatePresence>
                {activeBody === null && (
                    <motion.div
                        key={`soul-${resetKey}`} 
                        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }} 
                        drag
                        dragMomentum={false}
                        dragElastic={0.1}
                        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                        onDrag={(event) => {
                             // @ts-ignore
                           const hit = checkProximity(event);
                           setHoveredBody(hit as any);
                        }}
                        onDragEnd={(event) => {
                              // @ts-ignore
                           const hit = checkProximity(event);
                           if (hit) {
                               setActiveBody(hit as any);
                               setHoveredBody(null);
                           } else {
                               setHoveredBody(null);
                           }
                        }}
                        // VISUAL CENTER FIX: -mt-12 on mobile nudges it UP. md:mt-0 keeps it center on desktop.
                        className="z-50 cursor-grab touch-none absolute -mt-12 md:mt-0"
                    >
                        <div 
                            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white relative flex items-center justify-center animate-pulse"
                            style={{ boxShadow: "0 0 80px 20px rgba(255, 255, 255, 0.6), inset 0 0 30px 0px rgba(255, 255, 255, 1)" }}
                        >
                            <div className="absolute inset-0 rounded-full bg-white blur-md animate-pulse"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* RESET BUTTON */}
            <div className="absolute bottom-6 z-40">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-900/80 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg backdrop-blur-md border border-white/10"
                >
                   <RefreshCw size={14} /> Reset Soul
                </button>
            </div>

        </div>
        
        <div className="mt-8 text-xs text-zinc-400 font-medium animate-pulse text-center px-4">
           ( {t('disclaimer')} )
        </div>

      </main>
    </div>
  );
}