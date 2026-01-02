"use client";

import { aras } from "@/lib/kalchakra-data";
import { ArrowLeft, Clock, Ruler, Heart, Bone, RefreshCw, BookOpen, Volume2, VolumeX, X, Crown, Scroll, Mountain, MousePointer2, Headphones } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. LOCALIZATION DICTIONARY ---
const translations: Record<string, { en: string; hi: string; kn: string }> = {
  enterTitle: { en: "The Eternal Cycle", hi: "शाश्वत कालचक्र", kn: "ಶಾಶ್ವತ ಕಾಲಚಕ್ರ" },
  enterDesc: { en: "Journey through the rising and falling eras of time.", hi: "समय के उत्थान और पतन के युगों की यात्रा।", kn: "ಸಮಯದ ಏರಿಳಿತದ ಯುಗಗಳ ಮೂಲಕ ಪ್ರಯಾಣ." },
  enterBtn: { en: "Enter The Cycle", hi: "चक्र में प्रवेश करें", kn: "ಚಕ್ರವನ್ನು ಪ್ರವೇಶಿಸಿ" },
  audioHint: { en: "Best Experienced with Audio", hi: "ऑडियो के साथ सर्वोत्तम अनुभव", kn: "ಆಡಿಯೊದೊಂದಿಗೆ ಉತ್ತಮ ಅನುಭವ" },
  wheelTitle: { en: "6 Cosmic Eras", hi: "कालचक्र के 6 युग", kn: "ಕಾಲಚಕ್ರದ 6 ಯುಗಗಳು" },
  wheelSubtitle: { en: "The Wheel of Time", hi: "कालचक्र", kn: "ಕಾಲಚಕ್ರ" },
  wheelDesc: { en: "The descending arc of the cosmic cycle (Avasarpini).", hi: "कालचक्र का अवसर्पिणी चरण (अवरोही काल)।", kn: "ಕಾಲಚಕ್ರದ ಅವಸರ್ಪಿಣಿ ಹಂತ (ಅವರೋಹಿ ಕಾಲ)." },
  interactionHint: { en: "Tap Any Slice To Travel", hi: "यात्रा करने के लिए किसी भी भाग पर टैप करें", kn: "ಪ್ರಯಾಣಿಸಲು ಯಾವುದಾದರೂ ಭಾಗವನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ" },
  duration: { en: "Duration", hi: "अवधि", kn: "ಅವಧಿ" },
  height: { en: "Height", hi: "ऊंचाई", kn: "ಎತ್ತರ" },
  lifespan: { en: "Lifespan", hi: "आयु", kn: "ಆಯಸ್ಸು" },
  state: { en: "State", hi: "स्थिति", kn: "ಸ್ಥಿತಿ" },
  readMore: { en: "Read Full Chronicle", hi: "पूर्ण विवरण पढ़ें", kn: "ಪೂರ್ಣ ವಿವರ ಓದಿ" },
  lifestyle: { en: "Lifestyle", hi: "जीवन शैली", kn: "ಜೀವನ ಶೈಲಿ" },
  sustenance: { en: "Sustenance", hi: "आहार", kn: "ಆಹಾರ" },
  keyFigures: { en: "Key Figures", hi: "प्रमुख व्यक्तित्व", kn: "ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು" },
  history: { en: "History & Evolution", hi: "इतिहास और विकास", kn: "ಇತಿಹಾಸ ಮತ್ತು ವಿಕಾಸ" },
  chartTitle: { en: "The Collapse of Stature", hi: "शारीरिक कद का पतन", kn: "ದೇಹದ ಎತ್ತರದ ಕುಸಿತ" },
  chartNote: { en: "*Visual approximation.", hi: "*दृश्य अनुमान।", kn: "*ದೃಶ್ಯ ಅಂದಾಜು." },
  backBtn: { en: "Library", hi: "लाइब्रेरी", kn: "ಲೈಬ್ರರಿ" }
};

// --- 2. RICH CONTENT DATA ---
const extendedAraDetails: Record<number, { 
    title: { en: string; hi: string; kn: string }; 
    lifestyle: { en: string; hi: string; kn: string }; 
    food: { en: string; hi: string; kn: string }; 
    keyFigures: { en: string[]; hi: string[]; kn: string[] }; 
    events: { en: string; hi: string; kn: string }; 
}> = {
  1: {
    title: { en: "The Era of Absolute Bliss", hi: "सुषमा-सुषमा (परम सुख का युग)", kn: "ಸುಷಮ-ಸುಷಮ (ಪರಮ ಸುಖದ ಯುಗ)" },
    lifestyle: { 
      en: "This is the highest and purest phase of the cosmic cycle. There is no labor, no governance, no weapons, and no ownership. Humans live effortlessly as Yugaliks (twin beings), completely free from fear, sorrow, or conflict. Nature itself fulfills every need through Kalpavrikshas.", 
      hi: "यह कालचक्र का सर्वोच्च और शुद्धतम युग है। न कोई श्रम है, न शासन, न शस्त्र, न स्वामित्व। मनुष्य युगलिक (जुड़वाँ) रूप में बिना भय, दुख या संघर्ष के सहज जीवन जीते हैं। प्रकृति स्वयं कल्पवृक्षों द्वारा सभी आवश्यकताएँ पूरी करती है।", 
      kn: "ಇದು ಕಾಲಚಕ್ರದ ಅತ್ಯುನ್ನತ ಮತ್ತು ಶುದ್ಧ ಹಂತ. ಇಲ್ಲಿ ಶ್ರಮವೂ ಇಲ್ಲ, ಆಡಳಿತವೂ ಇಲ್ಲ, ಶಸ್ತ್ರಗಳೂ ಇಲ್ಲ, ಸ್ವಾಮ್ಯವೂ ಇಲ್ಲ. ಯುಗಲಿಕ ಮನುಷ್ಯರು ಭಯ, ದುಃಖ ಮತ್ತು ಸಂಘರ್ಷವಿಲ್ಲದೆ ಸುಲಭವಾಗಿ ಬದುಕುತ್ತಾರೆ. ಕಲ್ಪವೃಕ್ಷಗಳ ಮೂಲಕ ಪ್ರಕೃತಿಯೇ ಎಲ್ಲ ಅಗತ್ಯಗಳನ್ನು ಪೂರೈಸುತ್ತದೆ."
    },
    food: { 
      en: "Hunger arises only once every three days. A single tiny morsel is sufficient. Digestion is perfectly efficient and the body produces no waste such as sweat or excretion.", 
      hi: "हर तीन दिन में एक बार भूख लगती है। अत्यंत सूक्ष्म आहार ही पर्याप्त होता है। पाचन पूर्णतः शुद्ध होता है और शरीर कोई मल-मूत्र या पसीना उत्पन्न नहीं करता।", 
      kn: "ಮೂರು ದಿನಗಳಿಗೊಮ್ಮೆ ಮಾತ್ರ ಹಸಿವು ಉಂಟಾಗುತ್ತದೆ. ಅತಿಸಣ್ಣ ಆಹಾರವೇ ಸಾಕಾಗುತ್ತದೆ. ಜೀರ್ಣಕ್ರಿಯೆ ಸಂಪೂರ್ಣ ಶುದ್ಧವಾಗಿದ್ದು ದೇಹವು ಯಾವುದೇ ತ್ಯಾಜ್ಯವನ್ನು ಉತ್ಪಾದಿಸುವುದಿಲ್ಲ."
    },
    keyFigures: { 
      en: ["Yugalik Humans (Twin Beings)"], 
      hi: ["युगलिक मनुष्य (जुड़वाँ जीव)"], 
      kn: ["ಯುಗಲಿಕ ಮನುಷ್ಯರು (ಅವಳಿ ಜೀವಿಗಳು)"]
    },
    events: { 
      en: "The earth is naturally radiant and sweet. Humans are born as male-female twins, live together, and die together peacefully before being reborn in heavenly realms.", 
      hi: "पृथ्वी स्वयं प्रकाशमान और मधुर होती है। मनुष्य स्त्री-पुरुष युगल रूप में जन्म लेते हैं, साथ जीवन बिताते हैं और शांतिपूर्वक साथ ही देह त्याग कर देवलोक में जन्म लेते हैं।", 
      kn: "ಭೂಮಿಯು ಸ್ವಾಭಾವಿಕವಾಗಿ ಪ್ರಕಾಶಮಾನ ಮತ್ತು ಸಿಹಿಯಾಗಿರುತ್ತದೆ. ಮನುಷ್ಯರು ಗಂಡು-ಹೆಣ್ಣು ಅವಳಿಗಳಾಗಿ ಹುಟ್ಟಿ, ಒಟ್ಟಿಗೆ ಬದುಕಿ, ಶಾಂತವಾಗಿ ಒಂದೇ ಸಮಯದಲ್ಲಿ ದೇಹ ತ್ಯಜಿಸಿ ದೇವಲೋಕದಲ್ಲಿ ಜನಿಸುತ್ತಾರೆ."
    }
  },
  2: {
    title: { en: "The Era of Bliss", hi: "सुषमा (सुख का युग)", kn: "ಸುಷಮ (ಸುಖದ ಯುಗ)" },
    lifestyle: { 
      en: "Life remains joyful and effortless, though slightly reduced from the previous era. Kalpavrikshas still exist but their abundance and radiance begin to decline. Physical strength and lifespan also reduce gradually.", 
      hi: "जीवन अभी भी सुखमय और सहज है, किंतु पहले युग की तुलना में कुछ कम। कल्पवृक्ष अभी भी विद्यमान हैं, पर उनकी समृद्धि और प्रकाश में कमी आने लगती है।", 
      kn: "ಜೀವನ ಇನ್ನೂ ಸುಖಮಯವಾಗಿರುತ್ತದೆ, ಆದರೆ ಹಿಂದಿನ ಯುಗಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಕಡಿಮೆ. ಕಲ್ಪವೃಕ್ಷಗಳು ಇರುತ್ತವೆ, ಆದರೆ ಅವುಗಳ ಸಮೃದ್ಧಿ ಮತ್ತು ಕಾಂತಿ ನಿಧಾನವಾಗಿ ಕುಗ್ಗುತ್ತದೆ."
    },
    food: { 
      en: "Food is required once every two days. The quantity needed is slightly more than before, but still minimal.", 
      hi: "हर दो दिन में भोजन आवश्यक होता है। मात्रा पहले से कुछ अधिक होती है, फिर भी बहुत कम होती है।", 
      kn: "ಪ್ರತಿ ಎರಡು ದಿನಗಳಿಗೊಮ್ಮೆ ಆಹಾರ ಅಗತ್ಯವಾಗುತ್ತದೆ. ಪ್ರಮಾಣ ಹಿಂದಿನ ಯುಗಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಹೆಚ್ಚು."
    },
    keyFigures: { 
      en: ["Yugalik Humans"], 
      hi: ["युगलिक मनुष्य"], 
      kn: ["ಯುಗಲಿಕ ಮನುಷ್ಯರು"]
    },
    events: { 
      en: "As natural radiance reduces, the sun and moon become faintly visible towards the end of this era for the first time.", 
      hi: "प्राकृतिक प्रकाश कम होने के कारण इस युग के अंत में पहली बार सूर्य और चंद्रमा दिखाई देने लगते हैं।", 
      kn: "ಸ್ವಾಭಾವಿಕ ಕಾಂತಿ ಕಡಿಮೆಯಾದ ಕಾರಣ ಈ ಯುಗದ ಕೊನೆಯಲ್ಲಿ ಸೂರ್ಯ ಮತ್ತು ಚಂದ್ರ ಮೊದಲ ಬಾರಿಗೆ ಗೋಚರಿಸುತ್ತಾರೆ."
    }
  },
  3: {
    title: { en: "The Era of Mixed Bliss and Sorrow", hi: "सुषमा-दुःषमा (सुख-दुःख का युग)", kn: "ಸುಷಮ-ದುಃಷಮ (ಸುಖ-ದುಃಖದ ಯುಗ)" },
    lifestyle: { 
      en: "This is the great transition era. Kalpavrikshas gradually disappear, forcing humans to act for survival. Society, family structure, and governance begin. The first laws and disciplines are introduced by Kulakaras.", 
      hi: "यह महान संक्रमण काल है। कल्पवृक्ष धीरे-धीरे लुप्त हो जाते हैं और मनुष्य को कर्म करना पड़ता है। समाज, परिवार और शासन की शुरुआत होती है। कुलकर प्रथम नियम स्थापित करते हैं।", 
      kn: "ಇದು ಮಹತ್ತರ ಸಂಕ್ರಮಣ ಯುಗ. ಕಲ್ಪವೃಕ್ಷಗಳು ನಿಧಾನವಾಗಿ ನಾಶವಾಗುತ್ತವೆ ಮತ್ತು ಮಾನವರು ಜೀವನಕ್ಕಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಬೇಕಾಗುತ್ತದೆ. ಸಮಾಜ, ಕುಟುಂಬ ಮತ್ತು ಆಡಳಿತ ಆರಂಭವಾಗುತ್ತದೆ."
    },
    food: { 
      en: "People begin eating once a day. Agriculture and cooking start as nature no longer provides ready food.", 
      hi: "मनुष्य दिन में एक बार भोजन करने लगता है। प्रकृति द्वारा भोजन न मिलने के कारण कृषि और पकाने की प्रक्रिया प्रारंभ होती है।", 
      kn: "ಜನರು ದಿನಕ್ಕೆ ಒಮ್ಮೆ ಆಹಾರ ಸೇವಿಸುತ್ತಾರೆ. ಪ್ರಕೃತಿ ಸಿದ್ಧ ಆಹಾರ ನೀಡದ ಕಾರಣ ಕೃಷಿ ಮತ್ತು ಅಡುಗೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ."
    },
    keyFigures: { 
      en: ["14 Kulakaras (Manus)", "Bhagwan Rishabhdev"], 
      hi: ["14 कुलकर", "भगवान ऋषभदेव"], 
      kn: ["14 ಕುಲಕರರು", "ಭಗವಾನ್ ಋಷಭದೇವ"]
    },
    events: { 
      en: "Bhagwan Rishabhdev teaches the six professions—agriculture, writing, trade, crafts, defense, and knowledge—laying the foundation of civilization.", 
      hi: "भगवान ऋषभदेव छह कर्म सिखाकर मानव सभ्यता की नींव रखते हैं—कृषि, लेखन, व्यापार, शिल्प, रक्षा और विद्या।", 
      kn: "ಭಗವಾನ್ ಋಷಭದೇವರು ಆರು ವೃತ್ತಿಗಳನ್ನು ಬೋಧಿಸಿ ಮಾನವ ನಾಗರಿಕತೆಯ ಆಧಾರವನ್ನು ನಿರ್ಮಿಸುತ್ತಾರೆ."
    }
  },
  4: {
    title: { en: "The Era of Action (Karmabhumi)", hi: "दुःषमा-सुषमा (कर्मभूमि)", kn: "ದುಃಷಮ-ಸುಷಮ (ಕರ್ಮಭೂಮಿ)" },
    lifestyle: { 
      en: "This is the most spiritually important era. Great kings, warriors, and monks coexist. Dharma and adharma are both powerful. Spiritual effort is intense and meaningful.", 
      hi: "यह आध्यात्मिक दृष्टि से सबसे महत्वपूर्ण युग है। महान राजा, वीर और साधु सह-अस्तित्व में रहते हैं। धर्म और अधर्म दोनों प्रबल होते हैं।", 
      kn: "ಇದು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಅತ್ಯಂತ ಮಹತ್ವದ ಯುಗ. ಮಹಾನ್ ರಾಜರು, ವೀರರು ಮತ್ತು ಸಾಧುಗಳು ಸಹಬಾಳ್ವೆ ನಡೆಸುತ್ತಾರೆ."
    },
    food: { 
      en: "Normal eating habits. Physical strength is immense (bone structure is Vajrarishabhnaracha).", 
      hi: "सामान्य मानव आहार। शरीर अत्यंत सशक्त होते हैं और कठोर तप सहन करने योग्य होते हैं।", 
      kn: "ಸಾಮಾನ್ಯ ಮಾನವ ಆಹಾರ. ದೇಹಗಳು ಬಲಿಷ್ಠವಾಗಿದ್ದು ಕಠಿಣ ತಪಸ್ಸನ್ನು ಸಹಿಸಲು ಯೋಗ್ಯವಾಗಿರುತ್ತವೆ."
    },
    keyFigures: { 
      en: ["23 Tirthankaras", "12 Chakravartis", "Shri Ramachandra", "Shri Krishna"], 
      hi: ["23 तीर्थंकर", "12 चक्रवर्ती", "राम", "कृष्ण"], 
      kn: ["23 ತೀರ್ಥಂಕರರು", "12 ಚಕ್ರವರ್ತಿಗಳು", "ರಾಮ", "ಕೃಷ್ಣ"]
    },
    events: { 
      en: "Moksha is attainable. The Ramayana and Mahabharata occur. Thousands achieve Keval Gyan and liberation.", 
      hi: "मोक्ष संभव होता है। रामायण और महाभारत इसी युग में घटित होते हैं। हजारों जीव केवलज्ञान प्राप्त करते हैं।", 
      kn: "ಮೋಕ್ಷ ಸಾಧ್ಯ. ರಾಮಾಯಣ ಮತ್ತು ಮಹಾಭಾರತ ಈ ಯುಗದಲ್ಲೇ ಸಂಭವಿಸುತ್ತವೆ. ಅನೇಕರು ಕೇವಲಜ್ಞಾನ ಪಡೆಯುತ್ತಾರೆ."
    }
  },
  5: {
    title: { en: "The Era of Sorrow (Current Age)", hi: "दुःषमा (वर्तमान पंचम काल)", kn: "ದುಃಷಮ (ಪ್ರಸ್ತುತ ಪಂಚಮ ಕಾಲ)" },
    lifestyle: { 
      en: "The present era of decline. Physical strength, morality, and lifespan decrease. Conflicts, diseases, and greed dominate society.", 
      hi: "पतन का वर्तमान युग। शारीरिक शक्ति, नैतिकता और आयु घटती जाती है। रोग, संघर्ष और लोभ बढ़ते हैं।", 
      kn: "ಪತನದ ಪ್ರಸ್ತುತ ಯುಗ. ದೈಹಿಕ ಶಕ್ತಿ, ನೈತಿಕತೆ ಮತ್ತು ಆಯಸ್ಸು ಕಡಿಮೆಯಾಗುತ್ತದೆ."
    },
    food: { 
      en: "Food lacks nutrition. Desire for taste increases while satisfaction decreases.", 
      hi: "भोजन में पोषण कम होता है। स्वाद की लालसा बढ़ती है पर संतोष घटता है।", 
      kn: "ಆಹಾರ ಪೌಷ್ಟಿಕತೆಯನ್ನು ಕಳೆದುಕೊಳ್ಳುತ್ತದೆ. ರುಚಿಯ ಆಸೆ ಹೆಚ್ಚಾದರೂ ತೃಪ್ತಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ."
    },
    keyFigures: { 
      en: ["Great Acharyas", "No Tirthankaras"], 
      hi: ["महान आचार्य", "कोई तीर्थंकर नहीं"], 
      kn: ["ಮಹಾನ್ ಆಚಾರ್ಯರು", "ತೀರ್ಥಂಕರರಿಲ್ಲ"]
    },
    events: { 
      en: "Direct Moksha is impossible from this body. Liberation can only be achieved in future births in Mahavideha or higher realms.", 
      hi: "इस शरीर से प्रत्यक्ष मोक्ष संभव नहीं। महाविदेह या उच्च लोकों में जन्म लेकर ही मोक्ष प्राप्त हो सकता है।", 
      kn: "ಈ ದೇಹದಿಂದ ನೇರವಾಗಿ ಮೋಕ್ಷ ಸಾಧ್ಯವಿಲ್ಲ. ಮಹಾವಿದೇಹ ಅಥವಾ ಉನ್ನತ ಲೋಕಗಳಲ್ಲಿ ಜನಿಸಿ ಮಾತ್ರ ಮೋಕ್ಷ ಸಾಧ್ಯ."
    }
  },
  6: {
    title: { en: "The Era of Extreme Sorrow", hi: "दुःषमा-दुःषमा (घोर दुःख)", kn: "ದುಃಷಮ-ದುಃಷಮ (ಘೋರ ದುಃಖ)" },
    lifestyle: { 
      en: "Civilization collapses completely. Humans live like animals in caves, without society, ethics, or religion.", 
      hi: "सभ्यता पूर्णतः नष्ट हो जाती है। मनुष्य गुफाओं (बिलों) में रहते हैं। दिन में अत्यधिक गर्मी, रात में अत्यधिक ठंड। कोई समाज, परिवार या धर्म नहीं।", 
      kn: "ನಾಗರಿಕತೆ ಸಂಪೂರ್ಣವಾಗಿ ನಾಶವಾಗುತ್ತದೆ. ಮಾನವರು ಗುಹೆಗಳಲ್ಲಿ ಪ್ರಾಣಿಗಳಂತೆ ಬದುಕುತ್ತಾರೆ."
    },
    food: { 
      en: "Raw fish and animals are eaten. Fire and agriculture no longer exist.", 
      hi: "कच्ची मछली और पशु खाए जाते हैं। अग्नि और कृषि समाप्त हो जाती है।", 
      kn: "ಹಸಿ ಮೀನು ಮತ್ತು ಪ್ರಾಣಿಗಳನ್ನು ತಿನ್ನಲಾಗುತ್ತದೆ. ಬೆಂಕಿ ಮತ್ತು ಕೃಷಿ ಇಲ್ಲ."
    },
    keyFigures: { 
      en: ["None"], 
      hi: ["कोई नहीं"], 
      kn: ["ಯಾರೂ ಇಲ್ಲ"]
    },
    events: { 
      en: "The era ends with 49 days of catastrophic rains, cleansing the world and preparing it for the next ascending cycle (Utsarpini).", 
      hi: "४९ दिनों की प्रलयंकारी वर्षा से यह युग समाप्त होता है और उत्सर्पिणी चक्र की शुरुआत होती है।", 
      kn: "೪೯ ದಿನಗಳ ಪ್ರಳಯಮಳೆಯೊಂದಿಗೆ ಈ ಯುಗ ಅಂತ್ಯಗೊಳ್ಳುತ್ತದೆ ಮತ್ತು ಉತ್ಸರ್ಪಿಣಿ ಚಕ್ರ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ."
    }
  }
};

export default function KalchakraPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<"en" | "hi" | "kn">("en");
  useEffect(() => { params.then(p => setLang(p.lang as any)); }, [params]);
  
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const [selectedAra, setSelectedAra] = useState<number | null>(null);
  const [activeWheelIndex, setActiveWheelIndex] = useState(4); 
  const [isMuted, setIsMuted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isWheelInView, setIsWheelInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sciFiClickRef = useRef<HTMLAudioElement | null>(null);
  const enterClickRef = useRef<HTMLAudioElement | null>(null);
  const wheelSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bgMusicRef.current = new Audio();
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0; 
    
    clickAudioRef.current = new Audio("/sounds/kalchakra/click.mp3");
    hoverAudioRef.current = new Audio("/sounds/kalchakra/click2.mp3");
    sciFiClickRef.current = new Audio("/sounds/kalchakra/scificlick.mp3");
    enterClickRef.current = new Audio("/sounds/kalchakra/enter.mp3");

    return () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.pause();
            bgMusicRef.current.currentTime = 0; 
        }
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";   
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [showModal]);

  const handleEnterExperience = () => {
    if (enterClickRef.current) {
        enterClickRef.current.volume = 0.5;
        enterClickRef.current.play().catch(() => {});
    }
    if (bgMusicRef.current) {
        bgMusicRef.current.play().then(() => {
            bgMusicRef.current!.pause(); 
            bgMusicRef.current!.currentTime = 0;
        }).catch((e) => console.log("Audio unlock failed", e));
    }
    setHasEntered(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWheelInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (wheelSectionRef.current) {
      observer.observe(wheelSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const wheelData = [
    ...aras.map(a => ({ ...a, cycle: "Avasarpini" })), 
    ...[...aras].reverse().map((a, i) => ({ ...a, id: i + 7, cycle: "Utsarpini" }))
  ];
  const activeWheelAra = wheelData[activeWheelIndex];

  const getNormalizedId = (id: number) => (id > 6 ? 13 - id : id);
  const normalizedId = getNormalizedId(activeWheelAra.id);

  // --- BACKGROUND MUSIC ENGINE ---
  useEffect(() => {
    if (!bgMusicRef.current) return;
    const player = bgMusicRef.current;
    
    const shouldPlay = isWheelInView && !isMuted && hasEntered;
    const targetVolume = shouldPlay ? 0.7 : 0;
    const targetSrc = `/sounds/kalchakra/ara${normalizedId}.mp3`;

    const currentSrcPath = player.getAttribute('src') || "";
    if (!currentSrcPath.includes(targetSrc)) {
        player.src = targetSrc;
    }

    if (shouldPlay) {
        if (player.paused) {
            player.play().catch(() => {});
        }
    }

    const fadeInterval = setInterval(() => {
        if (shouldPlay && player.volume < targetVolume) {
            player.volume = Math.min(player.volume + 0.02, targetVolume);
        } else if (!shouldPlay && player.volume > 0) {
            player.volume = Math.max(player.volume - 0.02, 0);
        }
        
        if (player.volume === 0 && !shouldPlay) {
            player.pause();
        }
    }, 100);

    return () => clearInterval(fadeInterval);
  }, [activeWheelIndex, isWheelInView, isMuted, normalizedId, hasEntered]);


  // --- UI SOUNDS ---
  const playSound = (type: 'click' | 'hover' | 'scifi' | 'enter') => {
      if (isMuted || !isMounted) return;

      let audio = null;
      if (type === 'click') audio = clickAudioRef.current;
      else if (type === 'hover') audio = hoverAudioRef.current;
      else if (type === 'scifi') audio = sciFiClickRef.current;
      else if (type === 'enter') audio = enterClickRef.current;

      if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.6;
          audio.play().catch(() => {});
      }
  };

  const visualHeights = ["h-full", "h-[66%]", "h-[33%]", "h-[8%]", "h-[2%]", "h-[0.5%]"];
  const startHeights = { 1: "6000 Dhanush", 2: "4000 Dhanush", 3: "2000 Dhanush", 4: "500 Dhanush", 5: "7 Hath", 6: "3 Hath" };

  const getAraTheme = (id: number) => {
    const nId = getNormalizedId(id);
    switch (nId) {
        case 1: return "bg-gradient-to-br from-zinc-50 via-white to-zinc-100"; 
        case 2: return "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"; 
        case 3: return "bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200"; 
        case 4: return "bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100"; 
        case 5: return "bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-500"; 
        case 6: return "bg-gradient-to-br from-zinc-700 via-zinc-800 to-black"; 
        default: return "bg-zinc-100";
    }
  };

  const currentTheme = getAraTheme(activeWheelAra.id);
  const currentDetails = extendedAraDetails[normalizedId] || extendedAraDetails[1];

  const halfCycleWeights = [14, 11, 9, 9, 3.5, 3.5]; 
  const totalSlices = [...halfCycleWeights, ...[...halfCycleWeights].reverse()]; 
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const radius = 1.55;
  const gapAngle = 10 * (Math.PI / 180); 
  const startAngleRight = gapAngle; 
  const endAngleRight = Math.PI - gapAngle;
  const rightPath = [
    `M ${Math.cos(startAngleRight) * radius} ${Math.sin(startAngleRight) * radius}`, 
    `A ${radius} ${radius} 0 0 1 ${Math.cos(endAngleRight) * radius} ${Math.sin(endAngleRight) * radius}` 
  ].join(" ");
  const startAngleLeft = Math.PI + gapAngle; 
  const endAngleLeft = (2 * Math.PI) - gapAngle;
  const leftPath = [
    `M ${Math.cos(startAngleLeft) * radius} ${Math.sin(startAngleLeft) * radius}`, 
    `A ${radius} ${radius} 0 0 1 ${Math.cos(endAngleLeft) * radius} ${Math.sin(endAngleLeft) * radius}` 
  ].join(" ");

  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  return (
    <div className={`min-h-screen text-zinc-900 dark:text-white overflow-hidden font-sans selection:bg-orange-500 selection:text-white relative ${!hasEntered ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* --- ENTRANCE GATE --- */}
      <AnimatePresence>
        {!hasEntered && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center"
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                            <Clock className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
                        {t('enterTitle')}
                    </h1>
                    <p className="text-zinc-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                        {t('enterDesc')}
                    </p>
                    <div className="pt-8">
                        <button
                             
                            onClick={handleEnterExperience}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                        >
                            <span>{t('enterBtn')}</span>
                            <ArrowLeft className="rotate-180 transition-transform group-hover:translate-x-1" size={18} />
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-zinc-600 text-xs font-medium pt-8 animate-pulse">
                        <Headphones size={14} />
                        <span>{t('audioHint')}</span>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- GLOBAL BACKGROUND (Static - Not Theme Based) --- */}
      <div className="fixed inset-0 z-0 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10">
        <nav className="fixed top-24 left-6 z-40 flex items-center gap-4">
            <Link href={`/${lang}`} className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-all bg-white/80 dark:bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-md border border-zinc-200/50 shadow-sm">
                <ArrowLeft size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">{t('backBtn')}</span>
            </Link>
            <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-full bg-white/80 text-zinc-400 hover:text-zinc-800 transition-all backdrop-blur-md">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-24">
          
          <header className="mb-20 mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-black/20 border border-white/20 text-orange-700 dark:text-orange-400 text-xs font-bold mb-6 tracking-widest uppercase backdrop-blur-md shadow-sm">
               <Clock size={14} /> {t('wheelSubtitle')}
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase drop-shadow-sm">{t('wheelTitle')}</h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-medium">
              {t('wheelDesc')}
            </p>
          </header>

          <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-4 md:ml-0 space-y-12 mb-32">
            {aras.map((ara, index) => (
              <motion.div key={ara.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative pl-12 md:pl-24 group">
                <div className={`absolute left-[-9px] top-0 w-5 h-5 rounded-full border-4 border-white/50 dark:border-black/50 ${ara.barColor} transition-all duration-300 group-hover:scale-150 shadow-sm`}></div>
                <div 
                  onClick={() => { setSelectedAra(selectedAra === ara.id ? null : ara.id); playSound('click'); }} 
                  className={`cursor-pointer rounded-3xl p-8 border transition-all duration-500 backdrop-blur-md ${selectedAra === ara.id ? "bg-black/80 text-white dark:bg-white/90 dark:text-black scale-105 shadow-2xl z-10" : "bg-white/40 dark:bg-black/40 border-white/40 dark:border-white/5 hover:bg-white/60 hover:shadow-lg"}`}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{ara.name[l]}</h2>
                    <div className="text-xs font-bold tracking-widest opacity-60 uppercase">{ara.duration[l]}</div>
                  </div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">{ara.meaning[l]}</div>
                  <div className="text-base md:text-lg opacity-90 mb-6 font-serif leading-relaxed">{ara.description[l]}</div>
                  <AnimatePresence>
                    {selectedAra === ara.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 dark:border-black/10 pt-6 mt-6">
                        <div className="bg-white/20 dark:bg-black/20 p-4 rounded-xl flex items-center gap-4">
                          <div className="p-3 bg-blue-500/20 text-blue-500 rounded-full"><Ruler size={16} /></div>
                          <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">{t('height')}</div><div className="text-sm md:text-base font-bold">{ara.height[l]}</div></div>
                        </div>
                        <div className="bg-white/20 dark:bg-black/20 p-4 rounded-xl flex items-center gap-4">
                          <div className="p-3 bg-red-500/20 text-red-500 rounded-full"><Heart size={16} /></div>
                          <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">{t('lifespan')}</div><div className="text-sm md:text-base font-bold">{ara.lifespan[l]}</div></div>
                        </div>
                        <div className="bg-white/20 dark:bg-black/20 p-4 rounded-xl flex items-center gap-4">
                          <div className="p-3 bg-zinc-500/20 text-zinc-500 rounded-full"><Bone size={16} /></div>
                          <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Ribs</div><div className="text-sm md:text-base font-bold">{ara.ribs[l]}</div></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- WHEEL SECTION (Dynamic Background Scope) --- */}
          <div ref={wheelSectionRef} className="relative w-screen left-1/2 -translate-x-1/2 py-24 border-t border-black/10 dark:border-white/10 overflow-hidden">
             
             {/* 1. DYNAMIC THEME GRADIENT (Scoped Here) */}
             <AnimatePresence mode="popLayout">
                <motion.div 
                   key={activeWheelIndex} 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.8, ease: "easeInOut" }} 
                   className={`absolute inset-0 ${currentTheme}`}
                />
             </AnimatePresence>

             {/* 2. CAROUSEL BACKGROUND (Scoped, Scaled) */}
             <div className="absolute top-0 left-0 right-0 bottom-0 h-[50%] z-0 opacity-70 pointer-events-none overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={normalizedId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="flex h-full w-max"
                    >
                        <motion.div 
                            animate={{ x: ["0%", "-50%"] }} 
                            transition={{ repeat: Infinity, duration: 180, ease: "linear" }} 
                            className="flex h-full"
                        >
                            {[0, 1].map((loopIndex) => (
                                <div key={loopIndex} className="flex h-full">
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <img 
                                            key={i} 
                                            src={`/images/kalchakra/ara${normalizedId}-${i + 1}.webp`} 
                                            className="h-full w-auto object-cover min-w-[50vw] md:min-w-[33vw] mix-blend-overlay" 
                                            alt="Atmosphere"
                                            onError={(e) => (e.currentTarget.style.display = 'none')} 
                                        />
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
             </div>

             <div className="relative z-10">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 drop-shadow-sm">{t('enterTitle')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto font-medium">{t('enterDesc')}</p>
                 </div>

                 <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10 shadow-sm animate-pulse">
                        <MousePointer2 size={14} className="text-orange-600 dark:text-orange-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-zinc-800 dark:text-zinc-200">{t('interactionHint')}</span>
                    </div>
                 </div>

                 <div className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] mx-auto mb-16">
                     {isMounted ? (
                       <svg viewBox="-1.8 -1.8 3.6 3.6" className="w-full h-full -rotate-90 drop-shadow-2xl">
                         <defs>
                           <marker id="arrowhead-down" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" fill="#f97316" /></marker>
                           <marker id="arrowhead-up" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" fill="#10b981" /></marker>
                         </defs>
                         <line x1="-1.75" y1="0" x2="1.75" y2="0" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="0.025" strokeDasharray="0.05 0.05" strokeLinecap="round" />
                         {/* --- 2. Avasarpini (Down) Arc & Text --- */}
                         {/* Removed opacity, Added drop-shadow-md, Increased strokeWidth to 0.04 */}
                         <path id="avasarpiniArc" d={rightPath} fill="none" stroke="#f97316" strokeWidth="0.04" strokeDasharray="0.1 0.05" markerEnd="url(#arrowhead-down)" className="drop-shadow-md" />
                         <text fontSize="0.11" fontWeight="900" fill="#f97316" dy="-0.06" letterSpacing="0.02" className="drop-shadow-md"><textPath href="#avasarpiniArc" startOffset="50%" textAnchor="middle">AVASARPINI (DECLINE)</textPath></text>
                         <text fontSize="0.07" fontWeight="bold" fill="#f97316" dy="0.12" letterSpacing="0.05" className="drop-shadow-md"><textPath href="#avasarpiniArc" startOffset="50%" textAnchor="middle">10 KODAKODI SAGAROPAM</textPath></text>
                         
                         {/* --- 3. Utsarpini (Up) Arc & Text --- */}
                         {/* Removed opacity, Added drop-shadow-md, Increased strokeWidth to 0.04 */}
                         <path id="utsarpiniArc" d={leftPath} fill="none" stroke="#10b981" strokeWidth="0.04" strokeDasharray="0.1 0.05" markerEnd="url(#arrowhead-up)" className="drop-shadow-md" />
                         <text fontSize="0.11" fontWeight="900" fill="#10b981" dy="-0.06" letterSpacing="0.02" className="drop-shadow-md"><textPath href="#utsarpiniArc" startOffset="50%" textAnchor="middle">UTSARPINI (RISE)</textPath></text>
                         <text fontSize="0.07" fontWeight="bold" fill="#10b981" dy="0.12" letterSpacing="0.05" className="drop-shadow-md"><textPath href="#utsarpiniArc" startOffset="50%" textAnchor="middle">10 KODAKODI SAGAROPAM</textPath></text>
                         {totalSlices.map((slicePercent, index) => {
                             const startPercent = cumulativePercent;
                             cumulativePercent += slicePercent / 100;
                             const endPercent = cumulativePercent;
                             const midPercent = startPercent + (slicePercent / 100) / 2;
                             const [startX, startY] = getCoordinatesForPercent(startPercent);
                             const [endX, endY] = getCoordinatesForPercent(endPercent);
                             const labelX = (Math.cos(2 * Math.PI * midPercent) * 0.75);
                             const labelY = (Math.sin(2 * Math.PI * midPercent) * 0.75);
                             const pathData = `M 0 0 L ${startX.toFixed(5)} ${startY.toFixed(5)} A 1 1 0 0 1 ${endX.toFixed(5)} ${endY.toFixed(5)} Z`;
                             const isActive = index === activeWheelIndex;
                             return (
                               <g key={index} onClick={() => { setActiveWheelIndex(index); playSound('scifi'); }} className="cursor-pointer group">
                                    <path d={pathData} fill="currentColor" stroke="#09090b" strokeWidth="0.015" className={`transition-all duration-300 ${isActive ? 'scale-105 z-10 brightness-110 drop-shadow-md' : 'hover:brightness-110'} ${wheelData[index].wheelColor}`} style={{ transformOrigin: "0 0" }} />
                                    <text x={labelX} y={labelY} fontSize="0.12" fontWeight="900" fill="currentColor" textAnchor="middle" dominantBaseline="central" className="pointer-events-none text-black/40 dark:text-black/60 select-none" transform={`rotate(90, ${labelX}, ${labelY})`}>{wheelData[index].id > 6 ? wheelData[index].id - 6 : wheelData[index].id}</text>
                               </g>
                             );
                         })}
                         <circle cx="0" cy="0" r="0.45" className="fill-white/80 dark:fill-black/80 stroke-zinc-200 dark:stroke-zinc-800 stroke-[0.01]" />
                       </svg>
                     ) : (
                       <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse"></div>
                     )}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><RefreshCw className="w-8 h-8 text-zinc-300 dark:text-zinc-700 animate-spin-slow" /></div>
                 </div>

                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeWheelIndex} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      className="bg-white/80 dark:bg-black/60 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto shadow-2xl backdrop-blur-xl w-[75%]"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded-full ${activeWheelAra.barColor} border border-black/10 shrink-0`}></div>
                                <div>
                                  <div className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">{activeWheelAra.cycle}</div>
                                  <h3 className="text-2xl md:text-3xl font-black uppercase">{activeWheelAra.name[l]}</h3>
                                </div>
                            </div>
                            <div className="flex items-center md:block gap-2 md:gap-0 text-left md:text-right">
                              <div className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">{t('duration')}</div>
                              <div className="font-bold text-sm md:text-base ml-auto md:ml-0">{activeWheelAra.duration[l]}</div>
                            </div>
                        </div>
                        {/* <p className="text-zinc-700 dark:text-zinc-200 mb-8 font-serif leading-relaxed text-base md:text-lg">{activeWheelAra.description[l]}</p> */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
                            <div className="p-4 bg-white/50 dark:bg-black/40 rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 border border-black/5">
                               <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">{t('height')}</div>
                               <div className="font-bold text-sm">{activeWheelAra.height[l]}</div>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-black/40 rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 border border-black/5">
                               <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">{t('lifespan')}</div>
                               <div className="font-bold text-sm">{activeWheelAra.lifespan[l]}</div>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-black/40 rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 border border-black/5">
                               <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">{t('state')}</div>
                               <div className="font-bold text-sm">{activeWheelAra.meaning[l]}</div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                          <button onClick={() => { setShowModal(true); playSound('hover'); }} className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                            <BookOpen size={16} /> {t('readMore')}
                          </button>
                        </div>
                    </motion.div>
                 </AnimatePresence>
             </div>
          </div>

          <div className="mt-32 p-8 bg-white/60 dark:bg-black/60 rounded-3xl text-center mb-24 relative overflow-hidden border border-white/20 dark:border-white/5 backdrop-blur-md shadow-lg">
              <h3 className="text-zinc-900 dark:text-white text-sm font-bold tracking-widest uppercase mb-12">{t('chartTitle')}</h3>
              <div className="flex items-end justify-center gap-2 md:gap-4 lg:gap-8 h-80 border-b border-black/10 dark:border-white/10 pb-4">
                 {aras.map((ara, i) => (
                    <div key={i} className={`w-8 md:w-16 lg:w-24 ${ara.barColor} ${visualHeights[i]} rounded-t-lg relative group transition-all duration-500 hover:opacity-80 shadow-sm border border-black/5`}>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-white text-[10px] md:text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded z-20 pointer-events-none">{startHeights[ara.id as keyof typeof startHeights]}</div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-black/50 text-[10px] font-bold">{ara.id}</div>
                    </div>
                 ))}
              </div>
              <p className="text-zinc-500 text-xs mt-6 max-w-lg mx-auto leading-relaxed">{t('chartNote')}</p>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <div className={`h-32 w-full ${currentTheme} relative`}>
                <div className="absolute top-4 right-4 z-50">
                  <button onClick={() => setShowModal(false)} className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1">{activeWheelAra.name[l]}</div>
                  <h2 className="text-2xl font-black text-white">{currentDetails.title[lang]}</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                <p className="text-zinc-700 dark:text-zinc-200 mb-8 font-serif leading-relaxed text-base md:text-lg">{activeWheelAra.description[l]}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-orange-600 font-bold uppercase text-xs tracking-widest"><Mountain size={14} /> {t('lifestyle')}</div>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{currentDetails.lifestyle[lang]}</p>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600 font-bold uppercase text-xs tracking-widest"><Scroll size={14} /> {t('sustenance')}</div>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{currentDetails.food[lang]}</p>
                   </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-widest mb-4"><Crown size={14} /> {t('keyFigures')}</div>
                    <div className="flex flex-wrap gap-2">
                      {currentDetails.keyFigures[lang]?.map((fig, i) => (
                        <span key={i} className="px-3 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs font-bold shadow-sm">
                          {fig}
                        </span>
                      ))}
                    </div>
                </div>

                <div>
                   <h3 className="font-bold text-lg mb-2">{t('history')}</h3>
                   <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{currentDetails.events[lang]}</p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}