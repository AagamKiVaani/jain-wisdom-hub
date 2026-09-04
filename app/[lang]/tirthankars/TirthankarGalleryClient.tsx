"use client";

import React, { useState, useRef, useEffect, use } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Volume2, VolumeX, Sparkles, Info, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TirthankarGalleryClient({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  
  // 1. Language Logic
  const l: "en" | "hi" | "kn" = (lang === "hi" || lang === "kn") ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // 2. Audio & Sound Toggle State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const playTapSound = () => { 
    if (!soundEnabled) return; 
    try { 
      const a = new Audio("/sounds/resources/click2.mp3"); 
      a.volume = 0.65; 
      a.play().catch(()=>{}); 
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12); 
    } catch (e) {} 
  };

  // 3. Deep Zoom Modal State
  const [activeZoomTirthankar, setActiveZoomTirthankar] = useState<typeof tirthankaras[0] | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Reset zoom state on modal open/close
  const openZoomModal = (t: typeof tirthankaras[0], e: React.MouseEvent) => {
    e.preventDefault();
    playTapSound();
    setActiveZoomTirthankar(t);
    setZoomScale(1.2); // Start with a slight zoom to invite interaction
    setPanPosition({ x: 0, y: 0 });
    setActiveHotspot(null);
  };

  const closeZoomModal = () => {
    playTapSound();
    setActiveZoomTirthankar(null);
  };

  // Handle wheel zoom inside the canvas
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!activeZoomTirthankar) return;
      e.preventDefault();
      const zoomFactor = 0.15;
      setZoomScale(prev => {
        const next = prev - e.deltaY * zoomFactor * 0.01;
        return Math.min(Math.max(next, 1), 5);
      });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (canvas) canvas.removeEventListener("wheel", handleWheel);
    };
  }, [activeZoomTirthankar]);

  // Translations for Static Text
  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE",
      title: "24 Tirthankaras",
      deepZoomPrompt: "Pinch, scroll, or drag to inspect the pristine Digambar iconography",
      scripturalQuote: "“Darśana-jñāna-cāritrāṇi mokṣamārgaḥ”",
      scripturalRef: "— Acharya Umāsvāmi, Tattvārtha Sūtra (1.1)",
      close: "Close Inspection",
      resetZoom: "Reset View",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      hotspotTitle: "Digambar Iconography Details",
      hotspot1: "Padmāsana / Kāyotsarga Posture: Absolute stillness in meditation, free from bodily attachment (Dehadhyasa). Symbolizes supreme physical transcendence.",
      hotspot1Ref: "Source: Acharya Kundakunda, Pravacanasāra (Gāthā 3.17-20)",
      hotspot2: "Unadorned Digambar Form: Complete Nirgrantha (possessionless) state, symbolizing absolute detachment (Vītarāgatā) and internal purity.",
      hotspot2Ref: "Source: Acharya Kundakunda, Niyamasāra (Gāthā 56-58)",
      hotspot3: "Nāsāgra-dṛṣṭi (Half-Closed Eyes): Gaze fixed on the tip of the nose, indicating introspective vigilance, supreme equanimity, and complete withdrawal from external sensory objects.",
      hotspot3Ref: "Source: Acharya Pujyapada, Sarvārthasiddhi (Sūtra 9.37)"
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      deepZoomPrompt: "दिगंबर प्रतिमा के सूक्ष्म दर्शन हेतु पिंच, स्क्रॉल या ड्रैग करें",
      scripturalQuote: "“सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।”",
      scripturalRef: "— आचार्य उमास्वामी, तत्त्वार्थसूत्र (१.१)",
      close: "निरीक्षण बंद करें",
      resetZoom: "रीसेट दृश्य",
      zoomIn: "ज़ूम इन",
      zoomOut: "ज़ूम आउट",
      hotspotTitle: "दिगंबर प्रतिमा-विज्ञान विवरण",
      hotspot1: "पद्मासन / कायोत्सर्ग मुद्रा: ध्यान में पूर्ण स्थिरता, देहाध्यास से सर्वथा मुक्ति। यह शारीरिक अतीन्द्रियता का प्रतीक है।",
      hotspot1Ref: "संदर्भ: आचार्य कुन्दकुन्द, प्रवचनसार (गाथा ३.१७-२०)",
      hotspot2: "निग्रंथ दिगंबर रूप: पूर्ण अपरिग्रह अवस्था, जो परम वीतरागता और आंतरिक शुद्धि को दर्शाती है।",
      hotspot2Ref: "संदर्भ: आचार्य कुन्दकुन्द, नियमसार (गाथा ५६-५८)",
      hotspot3: "नासार्ग-दृष्टि (अर्धमुकुलित नेत्र): नासिका के अग्रभाग पर टिकी दृष्टि, जो आत्म-अवलोकन, परम समता और बाह्य विषयों से पूर्ण निवृत्ति की द्योतक है।",
      hotspot3Ref: "संदर्भ: आचार्य पूज्यपाद, सर्वार्थसिद्धि (सूत्र ९.३७)"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವಿತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      deepZoomPrompt: "ದಿಗಂಬರ ಪ್ರತಿಮೆಯ ಸೂಕ್ಷ್ಮ ದರ್ಶನಕ್ಕಾಗಿ ಪಂಚ್, ಸ್ಕ್ರಾಲ್ ಅಥವಾ ಡ್ರಾಗ್ ಮಾಡಿ",
      scripturalQuote: "“ಸಮ್ಯಗ್ದರ್ಶನಜ್ಞಾನಚಾರಿತ್ರಾಣಿ ಮೋಕ್ಷಮಾರ್ಗಃ”",
      scripturalRef: "— ಆಚಾರ್ಯ ಉಮಾಸ್ವಾಮಿ, ತತ್ವಾರ್ಥಸೂತ್ರ (೧.೧)",
      close: "ಮುಚ್ಚಿ",
      resetZoom: "ಮರುಹೊಂದಿಸಿ",
      zoomIn: "ಹಿಗ್ಗಿಸಿ",
      zoomOut: "ಕುಗ್ಗಿಸಿ",
      hotspotTitle: "ದಿಗಂಬರ ಪ್ರತಿಮಾ ವಿಜ್ಞಾನ",
      hotspot1: "ಪದ್ಮಾಸನ / ಕಾಯೋತ್ಸರ್ಗ ಮುದ್ರೆ: ಧ್ಯಾನದಲ್ಲಿ ಅಚಲ ಸ್ಥಿರತೆ, ದೇಹದ ಮೇಲಿನ ಮಮಕಾರದ ಸಂಪೂರ್ಣ ತ್ಯಾಗ.",
      hotspot1Ref: "ಮೂಲ: ಆಚಾರ್ಯ ಕುಂದಕುಂದ, ಪ್ರವಚನಸಾರ (ಗಾಥಾ ೩.೧೭-೨೦)",
      hotspot2: "ನಿಗ್ರಂಥ ದಿಗಂಬರ ಸ್ವರೂಪ: ಸಂಪೂರ್ಣ ಅಪರಿಗ್ರಹ ಸ್ಥಿತಿ, ಇದು ಪರಮ ವೀತರಾಗ ಭಾವ ಮತ್ತು ಅಂತರಂಗದ ಶುದ್ಧತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.",
      hotspot2Ref: "ಮೂಲ: ಆಚಾರ್ಯ ಕುಂದಕುಂದ, ನಿಯಮಸಾರ (ಗಾಥಾ ೫೬-೫೮)",
      hotspot3: "ನಾಸಾಗ್ರ-ದೃಷ್ಟಿ (ಅರ್ಧ ಮುಚ್ಚಿದ ಕಣ್ಣುಗಳು): ಮೂಗಿನ ತುದಿಯ ಮೇಲೆ ದೃಷ್ಟಿ, ಇದು ಆತ್ಮಾವಲೋಕನ ಮತ್ತು ಬಾಹ್ಯ ಪ್ರಪಂಚದಿಂದ ಸಂಪೂರ್ಣ ನಿವೃತ್ತಿಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
      hotspot3Ref: "ಮೂಲ: ಆಚಾರ್ಯ ಪೂಜ್ಯಪಾದ, ಸರ್ವಾರ್ಥಸಿದ್ಧಿ (ಸೂತ್ರ ೯.೩೭)"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 relative overflow-x-hidden">
      
      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${lang}`} 
        onClick={playTapSound}
        className="fixed top-6 left-6 z-40 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/90 dark:bg-black/80 px-4 py-2.5 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm min-h-[44px]"
      >
        <ArrowLeft size={16} /> 
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? 'text-xs' : ''}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. PERSISTENT AUDIO CONTROL */}
      <button
        onClick={() => { playTapSound(); setSoundEnabled(!soundEnabled); }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-rose-600/90 hover:bg-rose-700 text-white px-5 py-3.5 rounded-full shadow-2xl backdrop-blur-xl border border-rose-400/30 transition-all transform hover:scale-105 min-h-[44px]"
        title="Toggle Tactile Audio"
      >
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">
          {soundEnabled ? "Audio On" : "Muted"}
        </span>
      </button>

      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        <div className="mb-12 md:mb-20">
          <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base uppercase flex items-center gap-2">
            <Sparkles size={16} /> {t.lineage}
          </h2>
          <h1 className={`text-[10vw] md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${isIndic ? 'leading-tight' : 'leading-none'}`}>
            {t.title}
          </h1>
        </div>

        {/* TIRTHANKAR GALLERY GRID WITH 3D TILT EFFECT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => {
            return (
              <TiltCard 
                key={item.id} 
                item={item} 
                index={index} 
                lang={lang} 
                l={l} 
                isIndic={isIndic}
                onDeepZoom={(e) => openZoomModal(item, e)}
                playTapSound={playTapSound}
              />
            );
          })}
        </div>

        {/* SCRIPTURAL ARCHIVAL FOOTER BANNER */}
        <div className="mt-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-rose-950/20 via-zinc-900/60 to-rose-950/20 border border-rose-500/20 backdrop-blur-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0,transparent_70%)] pointer-events-none"></div>
          <p className="text-xl md:text-2xl font-serif text-rose-200 dark:text-rose-300 mb-3 italic">
            {t.scripturalQuote}
          </p>
          <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-rose-500/80">
            {t.scripturalRef}
          </p>
        </div>
      </div>

      {/* SACRED ICONOGRAPHY DEEP ZOOM MODAL */}
      <AnimatePresence>
        {activeZoomTirthankar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-10"
          >
            {/* Modal Top Control Bar */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-4 justify-between items-center z-50">
              <div className="flex items-center gap-3 bg-white/10 dark:bg-zinc-900/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-rose-500 font-black">#{activeZoomTirthankar.id}</span>
                <span className="text-white font-bold text-sm md:text-base">{activeZoomTirthankar.name[l]}</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { playTapSound(); setZoomScale(prev => Math.min(prev + 0.5, 5)); }}
                  className="p-3 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-all backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title={t.zoomIn}
                >
                  <ZoomIn size={18} />
                </button>
                <button 
                  onClick={() => { playTapSound(); setZoomScale(prev => Math.max(prev - 0.5, 1)); setPanPosition({ x: 0, y: 0 }); }}
                  className="p-3 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-all backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title={t.zoomOut}
                >
                  <ZoomOut size={18} />
                </button>
                <button 
                  onClick={() => { playTapSound(); setZoomScale(1.2); setPanPosition({ x: 0, y: 0 }); }}
                  className="p-3 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-all backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title={t.resetZoom}
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={closeZoomModal}
                  className="p-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-lg ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title={t.close}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Interactive Canvas / Zoom Area */}
            <div 
              ref={canvasRef}
              className="relative w-full h-[70vh] md:h-[75vh] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl border border-rose-500/30 bg-zinc-950/50 touch-none"
              onMouseDown={(e) => {
                setIsDragging(true);
                dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
              }}
              onMouseMove={(e) => {
                if (!isDragging) return;
                setPanPosition({
                  x: e.clientX - dragStartRef.current.x,
                  y: e.clientY - dragStartRef.current.y
                });
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  setIsDragging(true);
                  dragStartRef.current = { x: e.touches[0].clientX - panPosition.x, y: e.touches[0].clientY - panPosition.y };
                }
              }}
              onTouchMove={(e) => {
                if (!isDragging || e.touches.length !== 1) return;
                setPanPosition({
                  x: e.touches[0].clientX - dragStartRef.current.x,
                  y: e.touches[0].clientY - dragStartRef.current.y
                });
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              <motion.div
                style={{
                  scale: zoomScale,
                  x: panPosition.x,
                  y: panPosition.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={activeZoomTirthankar.tirthankaraImage}
                  alt={activeZoomTirthankar.name[l]}
                  fill
                  sizes="100vw"
                  className="object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(244,63,94,0.3)] select-none"
                  priority
                />

                {/* SCRIPTURAL ICONOGRAPHY HOTSPOTS */}
                {/* Hotspot 1: Head / Nāsāgra-dṛṣṭi */}
                <button
                  onClick={(e) => { e.stopPropagation(); playTapSound(); setActiveHotspot(activeHotspot === 1 ? null : 1); }}
                  className="absolute top-[22%] left-[50%] -translate-x-1/2 w-10 h-10 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-500/30 animate-pulse z-30 min-w-[44px] min-h-[44px]"
                  title="View Nāsāgra-dṛṣṭi Detail"
                >
                  <Info size={18} />
                </button>

                {/* Hotspot 2: Chest / Digambaratva */}
                <button
                  onClick={(e) => { e.stopPropagation(); playTapSound(); setActiveHotspot(activeHotspot === 2 ? null : 2); }}
                  className="absolute top-[45%] left-[50%] -translate-x-1/2 w-10 h-10 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-500/30 animate-pulse z-30 min-w-[44px] min-h-[44px]"
                  title="View Digambar Form Detail"
                >
                  <Info size={18} />
                </button>

                {/* Hotspot 3: Padmāsana / Kāyotsarga Base */}
                <button
                  onClick={(e) => { e.stopPropagation(); playTapSound(); setActiveHotspot(activeHotspot === 3 ? null : 3); }}
                  className="absolute top-[72%] left-[50%] -translate-x-1/2 w-10 h-10 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-500/30 animate-pulse z-30 min-w-[44px] min-h-[44px]"
                  title="View Posture Detail"
                >
                  <Info size={18} />
                </button>
              </motion.div>

              {/* Hotspot Annotation Popup Card */}
              <AnimatePresence>
                {activeHotspot !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-zinc-950/95 border border-rose-500/40 p-6 rounded-2xl backdrop-blur-xl shadow-2xl z-40 text-left"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-rose-400 font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                        <Sparkles size={14} /> {t.hotspotTitle}
                      </h4>
                      <button 
                        onClick={() => setActiveHotspot(null)} 
                        className="text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed font-sans">
                      {activeHotspot === 1 && t.hotspot3}
                      {activeHotspot === 2 && t.hotspot2}
                      {activeHotspot === 3 && t.hotspot1}
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-widest text-rose-500/80 font-semibold">
                      {activeHotspot === 1 && t.hotspot3Ref}
                      {activeHotspot === 2 && t.hotspot2Ref}
                      {activeHotspot === 3 && t.hotspot1Ref}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom prompt */}
            <div className="mt-4 text-xs font-medium text-gray-400 tracking-wider uppercase flex items-center gap-2 text-center px-4">
              <span>{t.deepZoomPrompt}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ==========================================
// INTERACTIVE 3D TILT CARD COMPONENT WITH SPECULAR SHEEN
// ==========================================
function TiltCard({ 
  item, 
  index, 
  lang, 
  l, 
  isIndic,
  onDeepZoom,
  playTapSound 
}: { 
  item: typeof tirthankaras[0], 
  index: number, 
  lang: string, 
  l: "en" | "hi" | "kn", 
  isIndic: boolean,
  onDeepZoom: (e: React.MouseEvent) => void,
  playTapSound: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative h-[420px] md:h-[500px] rounded-[2rem] bg-gray-50 dark:bg-zinc-900/50 overflow-hidden transition-all border border-rose-500/50 shadow-2xl shadow-rose-500/10 dark:shadow-rose-900/20 dark:border-zinc-600 md:border-gray-200 md:dark:border-white/5 md:hover:border-rose-500/50 md:hover:shadow-2xl"
    >
      {/* Dynamic Specular Sheen */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([latestX, latestY]) => `radial-gradient(circle at ${latestX} ${latestY}, rgba(255,255,255,0.15) 0%, transparent 60%)`
          )
        }}
      ></motion.div>

      {/* Background Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 opacity-10 dark:opacity-10 md:opacity-0 md:dark:opacity-0 md:group-hover:opacity-10 md:dark:group-hover:opacity-10"
        style={{ backgroundColor: item.colorHex }}
      ></div>

      <div className="absolute top-6 left-8 z-10" style={{ transform: "translateZ(30px)" }}>
        <span className="text-6xl font-black text-gray-200 dark:text-white/5 group-hover:text-gray-300 dark:group-hover:text-white/20 transition-colors">
          {item.id}
        </span>
      </div>

      {/* Card Content Link */}
      <Link 
        href={`/${lang}/tirthankars/${item.id}`} 
        onClick={playTapSound}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6"
      >
        {/* Image Container with 3D Pop-out Effect */}
        <div 
          className="relative w-full h-[60%] flex items-center justify-center transition-all duration-500 md:group-hover:-translate-y-12"
          style={{ transform: "translateZ(50px)" }}
        >
          <Image
            src={item.tirthankaraImage}
            alt={item.name[l]}
            fill
            priority={index < 4}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain drop-shadow-2xl p-4 select-none"
          />
        </div>

        {/* Text Info */}
        <div 
          className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/90 dark:to-transparent flex flex-col items-start opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500"
          style={{ transform: "translateZ(40px)" }}
        >
           <div className="text-rose-600 dark:text-rose-500 text-xs font-bold tracking-widest mb-1 uppercase">
             {item.symbol[l]}
           </div>
           
           <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isIndic ? 'leading-normal' : ''}`}>
             {item.name[l]}
           </h2>
           
           <div className="h-1 w-12 bg-gray-300 dark:bg-white/20 rounded-full mt-2"></div>
        </div>
      </Link>

      {/* Deep Zoom Button Trigger */}
      <button
        onClick={onDeepZoom}
        className="absolute top-6 right-6 z-30 p-3 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white shadow-lg backdrop-blur-md opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
        title="Deep Zoom Iconography Inspection"
      >
        <ZoomIn size={18} />
      </button>
    </motion.div>
  );
}