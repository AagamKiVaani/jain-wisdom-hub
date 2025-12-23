"use client";

import { ArrowLeft, Volume2, VolumeX, Info, RefreshCw, Sparkles, Maximize2, Eye, Infinity as InfinityIcon, User, Flame, Layers, Ghost, Wand2, HandHeart, BookOpen, Sunrise, ShieldAlert, Frown, VenetianMask, Coins, Magnet, Zap, Droplets } from "lucide-react"; 
import Link from "next/link";
import { useState, useEffect, useRef, Suspense, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// --- 1. LOCALIZATION ---
const translations = {
  title: { en: "The Nature of the Soul", hi: "आत्मा का स्वरूप", kn: "ಆತ್ಮದ ಸ್ವರೂಪ" },
  subtitle: { en: "Deh Parimana: Formless, yet shaping to the body.", hi: "देह परिमाण: निराकार, फिर भी देह के आकार में।", kn: "ದೇಹ ಪರಿಮಾಣ: ನಿರಾಕಾರ, ಆದರೂ ದೇಹದ ಆಕಾರಕ್ಕೆ ತಕ್ಕಂತೆ." },
  desc: { en: "The soul (Jiva) is fluid. Drag it into a body to give it life. Drag it out to return it to the void, or move it directly between bodies.", hi: "आत्मा (जीव) तरल है। इसे जीवन देने के लिए किसी शरीर में खींचें। इसे शून्य में वापस करने के लिए बाहर खींचें, या इसे सीधे शरीरों के बीच ले जाएं।", kn: "ಆತ್ಮ (ಜೀವ) ದ್ರವವಾಗಿದೆ. ಜೀವ ನೀಡಲು ಅದನ್ನು ದೇಹಕ್ಕೆ ಎಳೆಯಿರಿ. ಶೂನ್ಯಕ್ಕೆ ಮರಳಲು ಅದನ್ನು ಹೊರಗೆ ಎಳೆಯಿರಿ, ಅಥವಾ ನೇರವಾಗಿ ದೇಹಗಳ ನಡುವೆ ಚಲಿಸಲಿ." },
  disclaimer: { en: "The soul has no physical shape; it is depicted here as a circle purely for visualization purposes.", hi: "आत्मा का कोई भौतिक आकार नहीं होता; यहाँ इसे केवल दृश्य समझ के लिए एक वृत्त के रूप में दर्शाया गया है।", kn: "ಆತ್ಮಕ್ಕೆ ಯಾವುದೇ ಭೌತಿಕ ಆಕಾರವಿಲ್ಲ; ಇಲ್ಲಿ ಅದನ್ನು ಕೇವಲ ದೃಶ್ಯಾತ್ಮಕ ಅರಿವಿಗಾಗಿ ವೃತ್ತದ ರೂಪದಲ್ಲಿ ತೋರಿಸಲಾಗಿದೆ." },
  backBtn: { en: "Library", hi: "लाइब्रेरी", kn: "ಲೈಬ್ರರಿ" },
  targets: {
    human: { en: "Human", hi: "मनुष्य", kn: "मनुष्य" },
    elephant: { en: "Elephant", hi: "हाथी", kn: "हाथी" },
    ant: { en: "Ant", hi: "चींटी", kn: "चींटी" },
    tree: { en: "Plant", hi: "वनस्पति", kn: "वनस्पति" }
  },
  info: {
    title: { en: "Attributes of the Soul", hi: "आत्मा के गुण", kn: "आत्मा के गुण" },
    p1_title: { en: "Chetana (Consciousness)", hi: "चेतना (ज्ञान और दर्शन)", kn: "चेतना (ज्ञान और दर्शन)" },
    p1_desc: { en: "The soul is pure consciousness. The nature of the soul is to see and to know. Unlike the body, which is matter (Pudgala), the soul is sentient.", hi: "आत्मा शुद्ध चेतना है। आत्मा का स्वभाव है देखना और जानना। शरीर जड़ (पुद्गल) है, लेकिन आत्मा चेतन(जीवित) है。", kn: "आत्मा शुद्ध चेतना है। आत्मा का स्वभाव है देखना और जानना। शरीर जड़ (पुद्गल) है, लेकिन आत्मा चेतन(जीवित) है。" },
    p2_title: { en: "Deh Parimana (Size)", hi: "देह परिमाण (आकार)", kn: "देह परिमाण (आकार)" },
    p2_desc: { en: "The soul expands to fill an elephant and contracts to fit an ant. It is like light filling a room, taking the shape of its container.", hi: "आत्मा हाथी में विस्तार करती है और चींटी में समाने के लिए संकुचित होती है। यह कमरे में भरने वाले प्रकाश की तरह है, जो अपने पात्र का आकार ले लेता है。", kn: "आत्मा हाथी में विस्तार करती है और चींटी में समाने के लिए संकुचित होती है। यह कमरे में भरने वाले प्रकाश की तरह है, जो अपने पात्र का आकार ले लेता है。" },
    p3_title: { en: "Amurtik (Formless)", hi: "अमूर्तिक (निराकार)", kn: "अमूर्तिक (निराकार)" },
    p3_desc: { en: "The soul has no color, smell, taste, or touch. It cannot be seen with eyes, only experienced through wisdom.", hi: "आत्मा का कोई रंग, गंध, स्वाद या स्पर्श नहीं होता। इसे आँखों से नहीं देखा जा सकता, केवल ज्ञान से अनुभव किया जा सकता है。", kn: "आत्मा का कोई रंग, गंध, स्वाद या स्पर्श नहीं होता। इसे आँखों से नहीं देखा जा सकता, केवल ज्ञान से अनुभव किया जा सकता है。" },
    p4_title: { en: "Avinashi (Eternal)", hi: "अविनाशी (शाश्वत)", kn: "अविनाशी (शाश्वत)" },
    p4_desc: { en: "The soul was never born and will never die. It only changes bodies like a person changes clothes.", hi: "आत्मा न कभी जन्म लेती है और न कभी मरती है। यह केवल शरीर बदलती है, जैसे मनुष्य कपड़े बदलता है。", kn: "आत्मा न कभी जन्म लेती है और न कभी मरती है। यह केवल शरीर बदलती है, जैसे मनुष्य कपड़े बदलता है。" }
  },
  shareer: {
    title: { en: "Pancha Shareer (The 5 Bodies)", hi: "पंच शरीर (5 प्रकार के शरीर)", kn: "पंच शरीर (5 प्रकार के शरीर)" },
    audarik_t: { en: "1. Audarik Shareer", hi: "1. औदारिक शरीर", kn: "1. औदारिक शरीर" },
    audarik_d: { en: "The gross physical body made of flesh and bone. Possessed by humans and animals (Tiryancha).", hi: "मांस और हड्डी से बना स्थूल शरीर। यह मनुष्यों और तिर्यंच (जानवरों) के पास होता है।", kn: "मांस और हड्डी से बना स्थूल शरीर। यह मनुष्यों और तिर्यंच (जानवरों) के पास होता है।" },
    vaikriya_t: { en: "2. Vaikriya Shareer", hi: "2. वैक्रिय शरीर", kn: "2. वैक्रिय शरीर" },
    vaikriya_d: { en: "Transformable body made of fine matter. Celestial beings (Devs) and Hell beings (Narkis) possess this. Humans and animals (Tiryanchas) endowed with Vaikriya Labdhi can also create this type of body.", hi: "परिवर्तनशील शरीर जो सूक्ष्म पुद्गल से बना है। देव और नारकी जीव इसे धारण करते हैं। मनुष्य और तिर्यंच, वैक्रिय लब्धि के द्वारा, इस प्रकार का शरीर बना सकते हैं।", kn: "परिवर्तनशील शरीर जो सूक्ष्म पुद्गल से बना है। देव और नारकी जीव इसे धारण करते हैं। मनुष्य और तिर्यंच, वैक्रिय लब्धि के द्वारा, इस प्रकार का शरीर बना सकते हैं。" },
    aaharak_t: { en: "3. Aaharak Shareer", hi: "3. आहारक शरीर", kn: "3. आहारक शरीर" },
    aaharak_d: { en: "A pure body created by 14-Purvadhar Munis who possess Aaharak Labdhi, used to travel and resolve spiritual doubts with Tirthankaras.", hi: "आहारक लब्धि को धारण करने वाले चौदह पूर्वधर मुनियों द्वारा निर्मित शुद्ध शरीर, जिसका उपयोग तीर्थंकरों के पास जाकर आध्यात्मिक संदेहों के समाधान के लिए किया जाता है।", kn: "आहारक लब्धि को धारण करने वाले चौदह पूर्वधर मुनियों द्वारा निर्मित शुद्ध शरीर, जिसका उपयोग तीर्थंकरों के पास जाकर आध्यात्मिक संदेहों के समाधान के लिए किया जाता है。" },
    tejas_t: { en: "4. Tejas Shareer", hi: "4. तैजस शरीर", kn: "4. तैजस शरीर" },
    tejas_d: { en: "The fiery body responsible for heat and digestion. Always attached to the soul until Moksha.", hi: "तेज और पाचन के लिए जिम्मेदार शरीर। मोक्ष तक यह हमेशा आत्मा के साथ रहता है।", kn: "तेज और पाचन के लिए जिम्मेदार शरीर। मोक्ष तक यह हमेशा आत्मा के साथ रहता है。" },
    karman_t: { en: "5. Karman Shareer", hi: "5. कार्मण शरीर", kn: "5. कार्मण शरीर" },
    karman_d: { en: "The storehouse of all Karma particles. The blueprint of destiny that follows the soul across rebirths.", hi: "सभी कर्म परमाणुओं का संग्रह। यह भाग्य का नक्शा है जो पुनर्जन्मों में आत्मा के साथ जाता है।", kn: "सभी कर्म परमाणुओं का संग्रह। यह भाग्य का नक्शा है जो पुनर्जन्मों में आत्मा के साथ जाता है。" },
  },
  karma: {
    title: { en: "Karma: The Cosmic Dust", hi: "कर्म: ब्रह्मांडीय धूल", kn: "कर्म: ब्रह्मांडीय धूल" },
    reset: { en: "Reset Karma", hi: "कर्म रीसेट करें", kn: "कर्म रीसेट करें" },
    paap_title: { en: "Ashrava (Inflow of Sin)", hi: "आश्रव (पाप का आगमन)", kn: "आश्रव (पाप का आगमन)" },
    punya_title: { en: "Samvar/Punya (Inflow of Merit)", hi: "संवर/पुण्य (पुण्य का आगमन)", kn: "संवर/पुण्य (पुण्य का आगमन)" },
    sliders: {
        krodh: { en: "Krodh (Anger)", hi: "क्रोध", kn: "क्रोध" },
        maan: { en: "Maan (Ego)", hi: "मान (अहंकार)", kn: "मान (अहंकार)" },
        maya: { en: "Maya (Deceit)", hi: "माया (छल)", kn: "माया (छल)" },
        lobh: { en: "Lobh (Greed)", hi: "लोभ (लालच)", kn: "लोभ (लालच)" },
        dev: { en: "Dev Darshan", hi: "देव दर्शन", kn: "देव दर्शन" },
        vrat: { en: "Vrat/Niyam", hi: "व्रत / नियम", kn: "व्रत / नियम" },
        pratikraman: { en: "Pratikraman", hi: "प्रतिक्रमण", kn: "प्रतिक्रमण" },
        daan: { en: "Daan (Charity)", hi: "दान", kn: "दान" }
    },
    // NEW CONTENT
    particle_disclaimer: {
        en: "The pudgal particles are so small that they are only visible with Kevalgyan. Also these karma pudgal attaching to the soul, this phenomenon depends on many other factors. This is just for visualisation purposes.",
        hi: "पुद्गल परमाणु इतने सूक्ष्म होते हैं कि वे केवल केवलज्ञान से ही देखे जा सकते हैं। साथ ही, आत्मा से कर्म पुद्गल के जुड़ने की यह घटना कई अन्य कारकों पर निर्भर करती है। यह मात्र दृश्य प्रस्तुति के लिए है।",
        kn: "ಪುದ್ಗಲ ಪರಮಾಣುಗಳು ಎಷ್ಟು ಸೂಕ್ಷ್ಮವಾಗಿವೆ ಎಂದರೆ ಅವು ಕೇವಲ ಕೇವಲಜ್ಞಾನದಿಂದ ಮಾತ್ರ ಗೋಚರಿಸುತ್ತವೆ. ಹಾಗೆಯೇ, ಆತ್ಮಕ್ಕೆ ಕರ್ಮ ಪುದ್ಗಲ ಅಂಟಿಕೊಳ್ಳುವ ಈ ವಿದ್ಯಮಾನವು ಅನೇಕ ಇತರ ಅಂಶಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ. ಇದು ಕೇವಲ ದೃಶ್ಯೀಕರಣಕ್ಕಾಗಿ ಮಾತ್ರ."
    },
    mechanism: {
        title: { en: "How the Soul Attracts Matter", hi: "आत्मा पुद्गल को कैसे आकर्षित करती है?", kn: "ಆತ್ಮವು ಪುದ್ಗಲವನ್ನು ಹೇಗೆ ಆಕರ್ಷಿಸುತ್ತದೆ?" },
        yoga_t: { en: "1. Yoga (Vibration) - The Magnet", hi: "1. योग (आत्म-कंपन) - चुंबक", kn: "1. ಯೋಗ (ಆತ್ಮ-ಕಂಪನ) - ಕಾಂತ" },
        yoga_d: { en: "Every activity of mind, body, and speech creates a vibration in the soul known as 'Yoga'. This vibration creates a magnetic field that pulls nearby karma particles (Pudgal) towards the soul.", hi: "मन, वचन और काया की प्रत्येक क्रिया आत्मा में एक कंपन पैदा करती है जिसे 'योग' कहते हैं। यह कंपन एक चुंबकीय क्षेत्र बनाता है जो पास के कर्म परमाणुओं (पुद्गल) को आत्मा की ओर खींचता है।", kn: "ಮನಸ್ಸು, ದೇಹ ಮತ್ತು ಮಾತಿನ ಪ್ರತಿಯೊಂದು ಚಟುವಟಿಕೆಯು ಆತ್ಮದಲ್ಲಿ 'ಯೋಗ' ಎಂಬ ಕಂಪನವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ. ಈ ಕಂಪನವು ಕಾಂತೀಯ ಕ್ಷೇತ್ರವನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ, ಅದು ಹತ್ತಿರದ ಕರ್ಮ ಕಣಗಳನ್ನು (ಪುದ್ಗಲ) ಆತ್ಮದ ಕಡೆಗೆ ಎಳೆಯುತ್ತದೆ." },
        kashaya_t: { en: "2. Kashaya (Passion) - The Glue", hi: "2. कषाय (विकार) - गोंद", kn: "2. ಕಷಾಯ (ವಿಕಾರ) - ಅಂಟು" },
        kashaya_d: { en: "While Yoga attracts particles, it is Kashaya (Anger, Ego, Deceit, Greed) that acts as the glue. If the soul is 'wet' with passion, the particles stick and become bound (Bandha). If the soul is dry (dispassionate), particles merely touch and fall off.", hi: "जबकि योग कणों को आकर्षित करता है, यह कषाय (क्रोध, मान, माया, लोभ) है जो गोंद के रूप में कार्य करता है। यदि आत्मा कषाय से 'गीली' है, तो कण चिपक जाते हैं और बंध जाते हैं। यदि आत्मा सूखी (वितरागी) है, तो कण केवल स्पर्श करते हैं और गिर जाते हैं।", kn: "ಯೋಗವು ಕಣಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆಯಾದರೂ, ಕಷಾಯ (ಕ್ರೋಧ, ಮಾನ, ಮಾಯೆ, ಲೋಭ) ಅಂಟಿನಂತೆ ವರ್ತಿಸುತ್ತದೆ. ಆತ್ಮವು ಕಷಾಯದಿಂದ 'ಒದ್ದೆಯಾಗಿದ್ದರೆ', ಕಣಗಳು ಅಂಟಿಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ಬಂಧವಾಗುತ್ತವೆ." },
        nature_t: { en: "3. Good vs. Bad Attraction", hi: "3. शुभ बनाम अशुभ आकर्षण", kn: "3. ಶುಭ ಮತ್ತು ಅಶುಭ ಆಕರ್ಷಣೆ" },
        nature_d: { en: "Shubha Bhava (Pure Thoughts) attracts auspicious Pudgal, resulting in Punya (Merit). Ashubha Bhava (Impure Thoughts) attracts inauspicious Pudgal, resulting in Paap (Sin). The quality of the matter attracted depends entirely on the intent of the soul.", hi: "शुभ भाव (पवित्र विचार) शुभ पुद्गल को आकर्षित करते हैं, जिससे पुण्य का निर्माण होता है। अशुभ भाव (अपवित्र विचार) अशुभ पुद्गल को आकर्षित करते हैं, जिससे पाप बनता है। आकर्षित होने वाले पदार्थ की गुणवत्ता पूरी तरह से आत्मा के अभिप्राय पर निर्भर करती है।", kn: "ಶುಭ ಭಾವಗಳು ಶುಭ ಪುದ್ಗಲವನ್ನು ಆಕರ್ಷಿಸುತ್ತವೆ, ಪರಿಣಾಮವಾಗಿ ಪುಣ್ಯ ಲಭಿಸುತ್ತದೆ. ಅಶುಭ ಭಾವಗಳು ಅಶುಭ ಪುದ್ಗಲವನ್ನು ಆಕರ್ಷಿಸುತ್ತವೆ, ಇದರಿಂದ ಪಾಪ ಉಂಟಾಗುತ್ತದೆ." }
    }
  }
};

// --- 3D SOUL COMPONENT (STABLE) ---
// Wrapped in memo to prevent re-renders caused by parent particle updates
const SoulModel = memo(({ color }: { color: string }) => {
    const { scene } = useGLTF('/models/human.glb'); 
    
    // 1. Clone scene ONCE to avoid mutating the cached original directly
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    // 2. Initial Setup (Run Once) - Apply the base material structure
    useEffect(() => {
        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                    roughness: 0.2,     
                    metalness: 0.6, // High metalness for obsidian look
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.DoubleSide
                });
            }
        });
    }, [clonedScene]);

    // 3. Color Update (Efficient) - Only update properties, don't recreate material
    useEffect(() => {
        clonedScene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                child.material.color.set(color);
                
                // FOR BLACK: If color is dark, reduce emissive but keep metalness high
                const isDark = new THREE.Color(color).getHSL({ h: 0, s: 0, l: 0 }).l < 0.2;
                
                if (isDark) {
                    // Dark Grey glow to prevent it from disappearing
                    // Use a slightly lighter dark grey for the emissive part
                    child.material.emissive.setHex(0x333333); 
                    child.material.emissiveIntensity = 0.4; // Boosted intensity for visibility
                } else {
                    child.material.emissive.set(color);
                    child.material.emissiveIntensity = 0.5;
                }
            }
        });
    }, [clonedScene, color]); 

    // Manual positioning as per your "Best Code" settings
    return <primitive object={clonedScene} scale={0.015} position={[0, -1.4, 0]} />;
});

// Display name for debugging
SoulModel.displayName = "SoulModel";

// --- 2D REUSABLE COMPONENTS ---

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
            onDragStart={() => onPickup()} 
            onDragEnd={(event) => onDrop(event)}
            className="z-50 cursor-grab touch-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        >
            <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div className="absolute w-24 h-24 bg-white opacity-20 blur-xl" animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"], rotate: 360 }} transition={{ duration: 10, ease: "linear", repeat: Infinity }} />
                <motion.div className="absolute w-16 h-16 bg-white opacity-40 blur-lg" animate={{ borderRadius: ["40% 60% 60% 40% / 60% 30% 70% 40%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 60% 40% / 60% 30% 70% 40%"], rotate: -360 }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }} />
                <motion.div className="relative w-8 h-8 bg-white rounded-full" style={{ boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.8)" }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </div>
            {isInBody && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full border border-white/20 animate-pulse"></div>
                </div>
            )}
        </motion.div>
    );
};

function TargetBody({ id, label, isActive, isHovered, position, children }: any) {
  return (
    <div className={`absolute ${position} flex flex-col items-center gap-1 transition-all z-10 pointer-events-none select-none`}>
        <div id={`target-${id}`} className="relative flex items-center justify-center w-28 h-28 md:w-48 md:h-48 pointer-events-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/${id}-black.png`} alt={`${label} Dark`} className={`absolute object-contain transition-all duration-500`} style={{ width: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%', height: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%', opacity: isActive ? 0 : (isHovered ? 0.4 : 0.6), filter: "invert(0.3)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/${id}-white.png`} alt={`${label} Light`} className={`absolute object-contain transition-all duration-500`} style={{ width: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%', height: id === 'elephant' ? '100%' : id === 'ant' ? '40%' : '60%', opacity: isActive || isHovered ? 1 : 0, transform: isActive ? 'scale(1.1)' : (isHovered ? 'scale(1.05)' : 'scale(0.95)'), filter: isActive || isHovered ? "drop-shadow(0 0 20px rgba(255,255,255,0.8))" : "none", }} />
            <AnimatePresence>{isActive && children}</AnimatePresence>
        </div>
        <span className={`-mt-6 md:-mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isActive || isHovered ? "text-blue-400" : "text-zinc-500"}`}>{label}</span>
    </div>
  );
}

const KarmaSlider = ({ label, value, onChange, colorClass, icon: Icon }: any) => {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                    <Icon size={14} className={colorClass} />
                    <span className="text-zinc-400">{label}</span>
                </div>
                <span className={`text-xs font-mono ${colorClass}`}>{value}%</span>
            </div>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={value} 
                onChange={(e) => onChange(parseInt(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-800 ${
                    colorClass.includes('red') ? 'accent-red-500' : 'accent-amber-400'
                }`}
            />
        </div>
    );
};

// --- TYPE FOR PARTICLES ---
type Particle = {
    id: number;
    type: 'paap' | 'punya';
    x: number; 
    y: number; 
    stuck: boolean; 
    targetX: number; 
    targetY: number;
};

// --- 4. MAIN PAGE ---
export default function SoulKarmaPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<"en" | "hi" | "kn">("en");
  const [isMuted, setIsMuted] = useState(false);
  
  const [activeBody, setActiveBody] = useState<null | 'human' | 'elephant' | 'ant' | 'tree'>(null);
  const [hoveredBody, setHoveredBody] = useState<null | 'human' | 'elephant' | 'ant' | 'tree'>(null);
  const [resetKey, setResetKey] = useState(0);

  // KARMA STATE
  const [paapValues, setPaapValues] = useState({ krodh: 0, maan: 0, maya: 0, lobh: 0 });
  const [punyaValues, setPunyaValues] = useState({ dev: 0, vrat: 0, pratikraman: 0, daan: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [soulColor, setSoulColor] = useState('#ffffff'); 
  const [leshyaName, setLeshyaName] = useState(""); 

  const audioAmbient = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    params.then((p) => setLang(p.lang as "en" | "hi" | "kn"));
  }, [params]);

  const t = (key: string) => {
    // @ts-ignore
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  };

  useEffect(() => {
    audioAmbient.current = new Audio('/sounds/ambient.mp3');
    audioAmbient.current.loop = true;
    audioAmbient.current.volume = 0.3; 
    return () => {
        if (audioAmbient.current) {
            audioAmbient.current.pause();
            audioAmbient.current = null;
        }
    };
  }, []);

  useEffect(() => {
    if (audioAmbient.current) {
        if (isMuted) audioAmbient.current.pause();
        else audioAmbient.current.play().catch(e => console.log("Audio autoplay blocked", e));
    }
  }, [isMuted]);

  const playSound = (type: 'pickup' | 'hover' | 'merge' | 'void') => {
      if (isMuted) return;
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = 0.6;
      audio.play().catch(e => console.log("Sound error", e));
  };

  useEffect(() => {
      if (hoveredBody) playSound('hover');
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
          playSound('merge');
      } else {
          setActiveBody(null); 
          playSound('void');
      }
      setHoveredBody(null);
  };

  const handlePickup = () => {
      playSound('pickup');
  };

  const handleDrag = (event: any) => {
      // @ts-ignore
      const hit = checkProximity(event);
      setHoveredBody(hit as any);
  };

  // --- HELPER: CALCULATE TARGET LANDING SPOT (BODY MAP) ---
  const getBodyTarget = (type: 'paap' | 'punya') => {
      // Y: 0% (Top) to 100% (Bottom) relative to the container height
      const targetY = 15 + Math.random() * 70; // Keep mostly within 15% to 85% vertical range
      
      let bodyWidth = 0; // The allowed width (percentage) at this height

      // MAP THE BODY SHAPE (Approximation for standard model)
      if (targetY < 25) { 
          bodyWidth = 10; // Head
      } else if (targetY >= 25 && targetY < 45) {
          bodyWidth = 25; // Shoulders
      } else if (targetY >= 45 && targetY < 60) {
          bodyWidth = 18; // Waist
      } else {
          bodyWidth = 15; // Legs
      }

      const jitter = (Math.random() * bodyWidth) - (bodyWidth / 2);
      
      let targetX = 50; 
      if (type === 'paap') {
            targetX = 50 + jitter - (Math.random() * 2); 
      } else {
            targetX = 50 + jitter + (Math.random() * 2);
      }

      return { x: targetX, y: targetY };
  };

  // --- KARMA LOGIC ENGINE ---
  useEffect(() => {
    const totalPaap = Object.values(paapValues).reduce((a, b) => a + b, 0);
    const totalPunya = Object.values(punyaValues).reduce((a, b) => a + b, 0);

    const interval = setInterval(() => {
        setParticles(prev => {
            const newParticles = [...prev];
            
            // 1. UPDATE FLYING PARTICLES
            newParticles.forEach(p => {
                if (!p.stuck) {
                    const speed = 2; 
                    
                    if (p.x < p.targetX) p.x += speed;
                    else if (p.x > p.targetX) p.x -= speed;

                    if (p.y < p.targetY) p.y += 0.5;
                    else if (p.y > p.targetY) p.y -= 0.5;

                    const dist = Math.abs(p.x - p.targetX);
                    
                    if (dist < 2) {
                        p.stuck = true;
                        p.x = p.targetX;
                        p.y = p.targetY; 
                    }
                }
            });

            // 2. SPAWN NEW PARTICLES
            if (totalPaap > 0 && Math.random() < (totalPaap / 400)) { 
                const target = getBodyTarget('paap');
                newParticles.push({
                    id: Math.random(),
                    type: 'paap',
                    x: 0, y: 10 + Math.random() * 80, 
                    stuck: false, targetX: target.x, targetY: target.y,
                });
            }
            if (totalPunya > 0 && Math.random() < (totalPunya / 400)) {
                const target = getBodyTarget('punya');
                newParticles.push({
                    id: Math.random(),
                    type: 'punya',
                    x: 100, y: 10 + Math.random() * 80,
                    stuck: false, targetX: target.x, targetY: target.y,
                });
            }

            if (newParticles.length > 300) {
                return newParticles.slice(newParticles.length - 300);
            }

            return newParticles;
        });
    }, 30); 

    return () => clearInterval(interval);
  }, [paapValues, punyaValues]);

  // --- 6 LESHYA LOGIC (STRICT) ---
  useEffect(() => {
      const stuckPaap = particles.filter(p => p.stuck && p.type === 'paap').length;
      const stuckPunya = particles.filter(p => p.stuck && p.type === 'punya').length;
      const total = stuckPaap + stuckPunya;
      const paapRatio = total > 0 ? stuckPaap / total : 0;
      
      if (total === 0) {
          setSoulColor('#ffffff'); // Default White
          setLeshyaName("");
          return;
      }

      const isPaapInputActive = Object.values(paapValues).some(v => v > 0);

      // HEX COLORS FOR 3D MATERIAL
      if (paapRatio > 0.8) {
          // Changed to visible Charcoal #2A2A2A
          setSoulColor('#2A2A2A'); 
          setLeshyaName("Krishna Leshya (Black)");
      } else if (paapRatio > 0.6) {
          setSoulColor('#1a1a5e'); 
          setLeshyaName("Neel Leshya (Blue)");
      } else if (paapRatio > 0.4) {
          setSoulColor('#555555'); 
          setLeshyaName("Kapot Leshya (Grey)");
      } else if (paapRatio > 0.2) {
          setSoulColor('#ff4d4d'); 
          setLeshyaName("Tejas Leshya (Red)");
      } else {
          if (stuckPaap > 0 || isPaapInputActive) {
               setSoulColor('#ffd700'); 
               setLeshyaName("Padma Leshya (Yellow)");
          } else {
               setSoulColor('#ffffff'); 
               setLeshyaName("Shukla Leshya (White)");
          }
      }

  }, [particles, paapValues]);

  const handleKarmaReset = () => {
      setPaapValues({ krodh: 0, maan: 0, maya: 0, lobh: 0 });
      setPunyaValues({ dev: 0, vrat: 0, pratikraman: 0, daan: 0 });
      setParticles([]); 
      setSoulColor('#ffffff');
      setLeshyaName("");
      playSound('void');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-500 overflow-x-hidden">
      
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
            <h1 className="text-4xl md:text-6xl font-black mb-6 pb-4 tracking-tighter leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                {t('title')}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {t('desc')}
            </p>
        </header>

        {/* --- INTERACTION STAGE --- */}
        <div className="relative w-full max-w-5xl h-[65vh] md:h-[70vh] border border-dashed rounded-3xl flex items-center justify-center overflow-hidden bg-zinc-950 border-zinc-800 shadow-2xl mb-12">
            <TargetBody id="human" label={translations.targets.human[lang]} isActive={activeBody === 'human'} isHovered={hoveredBody === 'human'} position="top-4 left-8 md:top-6 md:left-12">
                <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>
            <TargetBody id="elephant" label={translations.targets.elephant[lang]} isActive={activeBody === 'elephant'} isHovered={hoveredBody === 'elephant'} position="top-4 right-8 md:top-6 md:right-12">
                <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>
            <TargetBody id="ant" label={translations.targets.ant[lang]} isActive={activeBody === 'ant'} isHovered={hoveredBody === 'ant'} position="bottom-28 left-8 md:bottom-10 md:left-12">
                 <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>
            <TargetBody id="tree" label={translations.targets.tree[lang]} isActive={activeBody === 'tree'} isHovered={hoveredBody === 'tree'} position="bottom-28 right-8 md:bottom-10 md:right-12">
                 <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={true} />
            </TargetBody>
            <AnimatePresence>
                {activeBody === null && (
                    <motion.div key={`center-soul-${resetKey}`} className="absolute w-full h-full pointer-events-none flex items-center justify-center -mt-12 md:mt-0">
                          <DraggableSoul onDrop={handleDrop} onPickup={handlePickup} isInBody={false} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute bottom-6 z-40">
                <button onClick={handleReset} className="flex items-center gap-2 px-6 py-3 bg-zinc-900/80 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg backdrop-blur-md border border-white/10">
                   <RefreshCw size={14} /> Reset Soul
                </button>
            </div>
        </div>
        
        <div className="mb-24 text-xs text-zinc-400 font-medium animate-pulse text-center px-4">
           ( {t('disclaimer')} )
        </div>

        {/* --- WISDOM SECTION --- */}
        <section className="w-full max-w-5xl mx-auto px-4 md:px-0 mb-32">
            <h2 className="text-3xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-200">
                {/* @ts-ignore */}
                {translations.info.title[lang] || "Attributes of the Soul"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400"><Eye size={24} /></div>
                    {/* @ts-ignore */}
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">{translations.info.p1_title[lang]}</h3>
                    {/* @ts-ignore */}
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{translations.info.p1_desc[lang]}</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400"><Maximize2 size={24} /></div>
                    {/* @ts-ignore */}
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">{translations.info.p2_title[lang]}</h3>
                    {/* @ts-ignore */}
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{translations.info.p2_desc[lang]}</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center mb-4 text-rose-600 dark:text-rose-400"><Sparkles size={24} /></div>
                    {/* @ts-ignore */}
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">{translations.info.p3_title[lang]}</h3>
                    {/* @ts-ignore */}
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{translations.info.p3_desc[lang]}</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400"><InfinityIcon size={24} /></div>
                    {/* @ts-ignore */}
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">{translations.info.p4_title[lang]}</h3>
                    {/* @ts-ignore */}
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{translations.info.p4_desc[lang]}</p>
                </div>
            </div>
        </section>

        {/* --- SHAREER SECTION (5 BODIES) --- */}
        <section className="w-full max-w-5xl mx-auto px-4 md:px-0 mb-32">
            <h2 className="text-3xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-200">
                {/* @ts-ignore */}
                {translations.shareer.title[lang] || "Pancha Shareer"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-l-4 border-red-600">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600"><User size={24} /></div>
                    {/* @ts-ignore */}
                    <div><h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{translations.shareer.audarik_t[lang]}</h3><p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{translations.shareer.audarik_d[lang]}</p></div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-l-4 border-purple-500">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full text-purple-600"><Wand2 size={24} /></div>
                    {/* @ts-ignore */}
                    <div><h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{translations.shareer.vaikriya_t[lang]}</h3><p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{translations.shareer.vaikriya_d[lang]}</p></div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-l-4 border-white">
                    <div className="p-3 bg-zinc-200 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300"><Sparkles size={24} /></div>
                    {/* @ts-ignore */}
                    <div><h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{translations.shareer.aaharak_t[lang]}</h3><p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{translations.shareer.aaharak_d[lang]}</p></div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-l-4 border-orange-500">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full text-orange-600"><Flame size={24} /></div>
                    {/* @ts-ignore */}
                    <div><h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{translations.shareer.tejas_t[lang]}</h3><p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{translations.shareer.tejas_d[lang]}</p></div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-l-4 border-zinc-600">
                    <div className="p-3 bg-zinc-300 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-400"><Layers size={24} /></div>
                    {/* @ts-ignore */}
                    <div><h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{translations.shareer.karman_t[lang]}</h3><p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{translations.shareer.karman_d[lang]}</p></div>
                </div>
            </div>
        </section>

        {/* --- KARMA SIMULATOR SECTION --- */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-0 mb-32">
             <h2 className="text-3xl font-bold text-center mb-12 text-zinc-800 dark:text-zinc-200">
                {/* @ts-ignore */}
                {translations.karma.title[lang] || "Karma Simulation"}
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* LEFT: PAAP CONTROLS */}
                <div className="w-full md:w-1/4 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl">
                    <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                        <Flame size={14} /> 
                        {/* @ts-ignore */}
                        {translations.karma.paap_title[lang]}
                    </h3>
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.krodh[lang]} value={paapValues.krodh} onChange={(v) => setPaapValues(prev => ({...prev, krodh: v}))} colorClass="text-red-500" icon={Frown} />
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.maan[lang]} value={paapValues.maan} onChange={(v) => setPaapValues(prev => ({...prev, maan: v}))} colorClass="text-red-500" icon={ShieldAlert} />
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.maya[lang]} value={paapValues.maya} onChange={(v) => setPaapValues(prev => ({...prev, maya: v}))} colorClass="text-red-500" icon={VenetianMask} />
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.lobh[lang]} value={paapValues.lobh} onChange={(v) => setPaapValues(prev => ({...prev, lobh: v}))} colorClass="text-red-500" icon={Coins} />
                </div>

                {/* CENTER: THE 3D STAGE */}
                <div className="w-full md:w-2/4 aspect-square md:aspect-auto h-[500px] bg-black rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
                    
                    {/* 1. PARTICLES LAYER (HIGH CONTRAST) */}
                    {particles.map((p) => (
                        <div 
                            key={p.id}
                            className={`absolute w-1.5 h-1.5 rounded-full ${
                                p.type === 'paap' 
                                    // Ash Grey color for Paap (Visible on black)
                                    ? 'bg-zinc-400 border border-zinc-900 opacity-80' 
                                    // Golden White for Punya (Glowing)
                                    : 'bg-white shadow-[0_0_8px_2px_rgba(255,215,0,0.6)]'
                            }`}
                            style={{ 
                                left: p.stuck ? `${p.x}%` : `${p.x}%`, 
                                top: p.stuck ? `${p.y}%` : `${p.y}%`,
                                transition: p.stuck ? 'none' : 'left 0.05s linear, top 0.05s linear',
                                zIndex: 10
                            }}
                        />
                    ))}

                    {/* 2. THE 3D SOUL CANVAS */}
                    <div className="absolute inset-0 z-0">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                            {/* Manual Stage equivalent to fix jumping */}
                            <ambientLight intensity={0.5} />
                            {/* Rim Light for Back - INCREASED INTENSITY from 2 to 6 for black visibility */}
                            <spotLight position={[0, 10, -5]} intensity={6} color="white" />
                            {/* Front Glow Light */}
                            <pointLight position={[0, 0, 2]} color={soulColor} intensity={1} distance={5} />
                            
                            <SoulModel color={soulColor} />
                            
                            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
                        </Canvas>
                    </div>

                    {/* LESHYA NAME DISPLAY */}
                    <div className="absolute top-6 left-0 right-0 text-center z-20">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                            {leshyaName || "PURE STATE"}
                        </span>
                    </div>

                    {/* RESET BUTTON */}
                    <button 
                        onClick={handleKarmaReset}
                        className="absolute bottom-6 flex items-center gap-2 px-4 py-2 bg-zinc-900/80 text-zinc-400 rounded-full text-[10px] font-bold uppercase tracking-widest hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800 z-20"
                    >
                        <RefreshCw size={12} /> {/* @ts-ignore */} {translations.karma.reset[lang]}
                    </button>

                </div>

                {/* RIGHT: PUNYA CONTROLS */}
                <div className="w-full md:w-1/4 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl">
                    <h3 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                        <Sparkles size={14} /> 
                        {/* @ts-ignore */}
                        {translations.karma.punya_title[lang]}
                    </h3>
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.dev[lang]} value={punyaValues.dev} onChange={(v) => setPunyaValues(prev => ({...prev, dev: v}))} colorClass="text-amber-400" icon={Sunrise} />
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.vrat[lang]} value={punyaValues.vrat} onChange={(v) => setPunyaValues(prev => ({...prev, vrat: v}))} colorClass="text-amber-400" icon={ShieldAlert} />
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.pratikraman[lang]} value={punyaValues.pratikraman} onChange={(v) => setPunyaValues(prev => ({...prev, pratikraman: v}))} colorClass="text-amber-400" icon={BookOpen} />
                    {/* @ts-ignore */}
                    <KarmaSlider label={translations.karma.sliders.daan[lang]} value={punyaValues.daan} onChange={(v) => setPunyaValues(prev => ({...prev, daan: v}))} colorClass="text-amber-400" icon={HandHeart} />
                </div>
            </div>

            {/* --- NEW SECTION: DISCLAIMER & EXPLANATION --- */}
            <div className="mt-8 text-center px-6">
                <p className="text-xs text-zinc-500 font-medium italic">
                    {/* @ts-ignore */}
                    ( {translations.karma.particle_disclaimer[lang]} )
                </p>
            </div>

            <div className="mt-16 bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800">
                <h3 className="text-2xl font-bold text-center mb-10 text-zinc-200">
                    {/* @ts-ignore */}
                    {translations.karma.mechanism.title[lang]}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1: Yoga */}
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
                        <div className="p-3 bg-blue-900/20 rounded-full text-blue-400 mb-4">
                            <Magnet size={28} />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-blue-300">
                             {/* @ts-ignore */}
                            {translations.karma.mechanism.yoga_t[lang]}
                        </h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                             {/* @ts-ignore */}
                            {translations.karma.mechanism.yoga_d[lang]}
                        </p>
                    </div>

                    {/* Step 2: Kashaya */}
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
                        <div className="p-3 bg-red-900/20 rounded-full text-red-400 mb-4">
                            <Droplets size={28} />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-red-300">
                             {/* @ts-ignore */}
                            {translations.karma.mechanism.kashaya_t[lang]}
                        </h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                             {/* @ts-ignore */}
                            {translations.karma.mechanism.kashaya_d[lang]}
                        </p>
                    </div>

                    {/* Step 3: Nature */}
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
                        <div className="p-3 bg-amber-900/20 rounded-full text-amber-400 mb-4">
                            <Zap size={28} />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-amber-300">
                             {/* @ts-ignore */}
                            {translations.karma.mechanism.nature_t[lang]}
                        </h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                             {/* @ts-ignore */}
                            {translations.karma.mechanism.nature_d[lang]}
                        </p>
                    </div>
                </div>
            </div>

        </section>

      </main>
    </div>
  );
}