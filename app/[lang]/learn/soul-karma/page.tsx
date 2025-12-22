"use client";

import { ArrowLeft, Volume2, VolumeX, Info, RefreshCw } from "lucide-react"; 
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. LOCALIZATION ---
const translations = {
  title: { en: "The Nature of the Soul", hi: "आत्मा का स्वरूप", kn: "ಆತ್ಮದ ಸ್ವರೂಪ" },
  subtitle: { en: "Deh Parimana: Formless, yet shaping to the body.", hi: "देह परिमाण: निराकार, फिर भी देह के आकार में।", kn: "ದೇಹ ಪರಿಮಾಣ: ನಿರಾಕಾರ, ಆದರೂ ದೇಹದ ಆಕಾರಕ್ಕೆ ತಕ್ಕಂತೆ." },
  desc: { en: "The soul (Jiva) is fluid. Drag it into a body to give it life. Drag it out to return it to the void, or move it directly between bodies.", hi: "आत्मा (जीव) तरल है। इसे जीवन देने के लिए किसी शरीर में खींचें। इसे शून्य में वापस करने के लिए बाहर खींचें, या इसे सीधे शरीरों के बीच ले जाएं।", kn: "ಆತ್ಮ (ಜೀವ) ದ್ರವವಾಗಿದೆ. ಜೀವ ನೀಡಲು ಅದನ್ನು ದೇಹಕ್ಕೆ ಎಳೆಯಿರಿ. ಶೂನ್ಯಕ್ಕೆ ಮರಳಲು ಅದನ್ನು ಹೊರಗೆ ಎಳೆಯಿರಿ, ಅಥವಾ ನೇರವಾಗಿ ದೇಹಗಳ ನಡುವೆ ಚಲಿಸಲಿ." },
  disclaimer: { en: "Visual representation only.", hi: "केवल दृश्य प्रस्तुति।", kn: "ದೃಶ್ಯ ಪ್ರಾತಿನಿಧ್ಯ ಮಾತ್ರ." },
  backBtn: { en: "Library", hi: "लाइब्रेरी", kn: "ಲೈಬ್ರರಿ" },
  targets: {
    human: { en: "Human", hi: "मनुष्य", kn: "ಮನುಷ್ಯ" },
    elephant: { en: "Elephant", hi: "हाथी", kn: "ಆನೆ" },
    ant: { en: "Ant", hi: "चींटी", kn: "ಇರುವೆ" },
    tree: { en: "Plant", hi: "वनस्पति", kn: "ಸಸ್ಯ" }
  }
};

// --- 2. REUSABLE SOUL COMPONENT ---
const DraggableSoul = ({ onDrop, onPickup, isInBody = false }: { onDrop: (e: any) => void, onPickup: () => void, isInBody?: boolean }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isInBody ? 0 : 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }} 
            
            drag
            dragMomentum={false}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1, opacity: 1, cursor: "grabbing" }}
            
            // AUDIO TRIGGERS
            onDragStart={() => onPickup()} 
            onDragEnd={(event) => onDrop(event)}
            
            className="z-50 cursor-grab touch-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        >
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Layer 1: Outer Plasma */}
                <motion.div 
                    className="absolute w-24 h-24 bg-white opacity-20 blur-xl"
                    animate={{
                        borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
                        rotate: 360
                    }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                />
                {/* Layer 2: Inner Plasma */}
                <motion.div 
                    className="absolute w-16 h-16 bg-white opacity-40 blur-lg"
                    animate={{
                        borderRadius: ["40% 60% 60% 40% / 60% 30% 70% 40%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 60% 40% / 60% 30% 70% 40%"],
                        rotate: -360
                    }}
                    transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                />
                {/* Layer 3: Core */}
                <motion.div 
                    className="relative w-8 h-8 bg-white rounded-full"
                    style={{ boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.8)" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            {isInBody && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full border border-white/20 animate-pulse"></div>
                </div>
            )}
        </motion.div>
    );
};

// --- 3. COMPONENT: The Target Body ---
function TargetBody({ id, label, isActive, isHovered, position, children }: any) {
  return (
    <div className={`absolute ${position} flex flex-col items-center gap-1 transition-all z-10 pointer-events-none select-none`}>
        <div 
            id={`target-${id}`} 
            className="relative flex items-center justify-center w-28 h-28 md:w-48 md:h-48 pointer-events-auto"
        >
            {/* BLACK IMAGE */}
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

            {/* WHITE IMAGE */}
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
            
            <AnimatePresence>
                {isActive && children}
            </AnimatePresence>
            
        </div>
        
        <span className={`-mt-6 md:-mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isActive || isHovered ? "text-blue-400" : "text-zinc-500"}`}>
            {label}
        </span>
    </div>
  );
}

// --- 4. MAIN PAGE ---
export default function SoulKarmaPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<"en" | "hi" | "kn">("en");
  const [isMuted, setIsMuted] = useState(false);
  const [activeBody, setActiveBody] = useState<null | 'human' | 'elephant' | 'ant' | 'tree'>(null);
  const [hoveredBody, setHoveredBody] = useState<null | 'human' | 'elephant' | 'ant' | 'tree'>(null);
  const [resetKey, setResetKey] = useState(0);

  // AUDIO REFS
  const audioAmbient = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    params.then((p) => setLang(p.lang as "en" | "hi" | "kn"));
  }, [params]);

  const t = (key: string) => {
    // @ts-ignore
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  };

  // --- AUDIO LOGIC ---
  useEffect(() => {
    // Initialize Ambient Audio
    audioAmbient.current = new Audio('/sounds/ambient.mp3');
    audioAmbient.current.loop = true;
    audioAmbient.current.volume = 0.3; // Low volume background

    return () => {
        if (audioAmbient.current) {
            audioAmbient.current.pause();
            audioAmbient.current = null;
        }
    };
  }, []);

  // Handle Mute/Unmute
  useEffect(() => {
    if (audioAmbient.current) {
        if (isMuted) {
            audioAmbient.current.pause();
        } else {
            // Try playing (user interaction usually required first, but typically fine in useEffect if previously interacted)
            audioAmbient.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }
    }
  }, [isMuted]);

  const playSound = (type: 'pickup' | 'hover' | 'merge' | 'void') => {
      if (isMuted) return;
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = 0.6;
      audio.play().catch(e => console.log("Sound error", e));
  };

  // --- HOVER SOUND TRIGGER ---
  // We trigger sound only when hoveredBody CHANGES from null to something
  useEffect(() => {
      if (hoveredBody) {
          playSound('hover');
      }
  }, [hoveredBody]);


  const handleReset = () => {
    playSound('void');
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

  const handleDrop = (event: any) => {
      // @ts-ignore
      const hit = checkProximity(event);
      if (hit) {
          setActiveBody(hit as any);
          playSound('merge'); // SUCCESS SOUND
      } else {
          setActiveBody(null); 
          playSound('void'); // RESET SOUND
      }
      setHoveredBody(null);
  };

  const handlePickup = () => {
      playSound('pickup');
  };

  const handleDrag = (event: any) => {
      // @ts-ignore
      const hit = checkProximity(event);
      // Logic inside useEffect handles the sound trigger to prevent looping
      setHoveredBody(hit as any);
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
            >
                <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>

            {/* 2. ELEPHANT */}
            <TargetBody 
                id="elephant" 
                label={translations.targets.elephant[lang]} 
                isActive={activeBody === 'elephant'}
                isHovered={hoveredBody === 'elephant'}
                position="top-4 right-8 md:top-6 md:right-12"
            >
                <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>

            {/* 3. ANT */}
            <TargetBody 
                id="ant" 
                label={translations.targets.ant[lang]} 
                isActive={activeBody === 'ant'}
                isHovered={hoveredBody === 'ant'}
                position="bottom-28 left-8 md:bottom-10 md:left-12"
            >
                 <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>

            {/* 4. TREE */}
            <TargetBody 
                id="tree" 
                label={translations.targets.tree[lang]} 
                isActive={activeBody === 'tree'}
                isHovered={hoveredBody === 'tree'}
                position="bottom-28 right-8 md:bottom-10 md:right-12"
            >
                 <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>

            {/* THE CENTER SOUL */}
            <AnimatePresence>
                {activeBody === null && (
                    <motion.div
                        key={`center-soul-${resetKey}`} 
                        className="absolute w-full h-full pointer-events-none flex items-center justify-center -mt-12 md:mt-0"
                    >
                         <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={false} />
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