export type Ara = {
  id: number;
  name: { en: string; hi: string; kn: string };
  meaning: { en: string; hi: string; kn: string };
  duration: { en: string; hi: string; kn: string };
  height: { en: string; hi: string; kn: string };
  lifespan: { en: string; hi: string; kn: string };
  ribs: { en: string; hi: string; kn: string };
  wheelColor: string; // Class for SVG fill (text-color)
  barColor: string;   // Class for HTML background (bg-color)
  description: { en: string; hi: string; kn: string };
};

export const aras: Ara[] = [
  {
    id: 1,
    name: { en: "Sushama-Sushama", hi: "सुषमा-सुषमा", kn: "ಸುಷಮ-ಸುಷಮ" },
    meaning: { en: "Age of Perfect Bliss", hi: "परम सुख का युग", kn: "ಪೂರ್ಣ ಸುಖದ ಯುಗ" },
    duration: { en: "4 Koda-Kodi Sagaropama", hi: "4 कोड़ा-कोड़ी सागर", kn: "4 ಕೋಡಾ-ಕೋಡಿ ಸಾಗರೋಪಮ" },
    height: { en: "6,000 Dhanush (~6.8 miles)", hi: "6000 धनुष (~6.8 मील)", kn: "6000 ಧನುಷ್ (~6.8 ಮೈಲಿ)" },
    lifespan: { en: "3 Palyopama", hi: "3 पल्योपम", kn: "3 ಪಲ್ಯೋಪಮ" },
    ribs: { en: "256 Ribs (Vajra Samhanana)", hi: "256 पसलियां (वज्र)", kn: "256 ಪಕ್ಕೆಲುಬುಗಳು (ವಜ್ರ)" },
    wheelColor: "text-stone-200",
    barColor: "bg-stone-200",
    description: { 
      en: "The 'Uttama Bhogbhumi' (Supreme Land of Enjoyment). The earth is sweet as sugar, devoid of dust or thorns. There is no agriculture or trade; 10 types of Kalpavrikshas (Wish-Fulfilling Trees) like 'Madyanga' (Wine) and 'Jyotiranga' (Light) provide everything. Humans are born as Yugaliks (Twins), live as spouses, and die together peacefully. Digestion is 100% efficient (no excreta). They feel hunger only once every 3 days and eat a morsel the size of a jujube fruit.", 
      hi: "उत्तम भोगभूमि। यहाँ की मिट्टी शक्कर जैसी मीठी और धूल रहित है। कृषि या व्यापार की आवश्यकता नहीं है; 10 प्रकार के कल्पवृक्ष (जैसे मद्यांग, ज्योतिरांग) भोजन, वस्त्र और प्रकाश प्रदान करते हैं। मनुष्य 'युगल' (जुड़वां) के रूप में जन्म लेते हैं, साथ जीते हैं और एक साथ समाधिमरण करते हैं। पाचन 100% होता है (मल-मूत्र नहीं)। उन्हें हर 3 दिन में केवल एक बार भूख लगती है और वे बेर के बराबर आहार लेते हैं।", 
      kn: "ಉತ್ತಮ ಭೋಗಭೂಮಿ. ಇಲ್ಲಿನ ಮಣ್ಣು ಸಕ್ಕರೆಯಂತೆ ಸಿಹಿಯಾಗಿದ್ದು, ಮುಳ್ಳುಗಳಿಲ್ಲದ ಶುದ್ಧ ಭೂಮಿಯಾಗಿದೆ. ಕೃಷಿ ಅಥವಾ ವ್ಯಾಪಾರದ ಅಗತ್ಯವಿಲ್ಲ; 10 ಬಗೆಯ ಕಲ್ಪವೃಕ್ಷಗಳು (ಉದಾಹರಣೆಗೆ ಮದ್ಯಾಂಗ, ಜ್ಯೋತಿರಾಂಗ) ಆಹಾರ, ಬಟ್ಟೆ ಮತ್ತು ಬೆಳಕನ್ನು ನೀಡುತ್ತವೆ. ಮಾನವರು 'ಯುಗಲಿಕರು' (ಅವಳಿಗಳು) ಆಗಿ ಜನಿಸುತ್ತಾರೆ, ಒಟ್ಟಿಗೆ ಜೀವಿಸುತ್ತಾರೆ ಮತ್ತು ಒಟ್ಟಿಗೆ ಮರಣ ಹೊಂದುತ್ತಾರೆ. ಜೀರ್ಣಕ್ರಿಯೆ 100% ಪರಿಪೂರ್ಣವಾಗಿರುತ್ತದೆ. ಅವರಿಗೆ 3 ದಿನಕ್ಕೊಮ್ಮೆ ಮಾತ್ರ ಹಸಿವಾಗುತ್ತದೆ ಮತ್ತು ಅವರು ಬರೀ ಒಂದು ಬೋರೆ ಹಣ್ಣಿನ ಗಾತ್ರದ ಆಹಾರವನ್ನು ಸೇವಿಸುತ್ತಾರೆ." 
    }
  },
  {
    id: 2,
    name: { en: "Sushama", hi: "सुषमा", kn: "ಸುಷಮ" },
    meaning: { en: "Age of Happiness", hi: "सुख का युग", kn: "ಸುಖದ ಯುಗ" },
    duration: { en: "3 Koda-Kodi Sagaropama", hi: "3 कोड़ा-कोड़ी सागर", kn: "3 ಕೋಡಾ-ಕೋಡಿ ಸಾಗರೋಪಮ" },
    height: { en: "4,000 Dhanush (~4.5 miles)", hi: "4000 धनुष (~4.5 मील)", kn: "4000 ಧನುಷ್ (~4.5 ಮೈಲಿ)" },
    lifespan: { en: "2 Palyopama", hi: "2 पल्योपम", kn: "2 ಪಲ್ಯೋಪಮ" },
    ribs: { en: "128 Ribs", hi: "128 पसलियां", kn: "128 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-amber-400",
    barColor: "bg-amber-400",
    description: { 
      en: "The 'Madhyama Bhogbhumi' (Intermediate Land of Enjoyment). The pristine energy begins to fade. The light of the Kalpavrikshas dims slightly, and the sun/moon become more visible. Humans now feel the urge to eat every 2 days instead of 3. The rib count drops to 128, indicating a reduction in physical solidity, but life remains anarchic, peaceful, and devoid of 'mine vs thine' concepts.", 
      hi: "मध्यम भोगभूमि। यहाँ ऊर्जा थोड़ी कम होने लगती है। कल्पवृक्षों का प्रकाश धुंधला हो जाता है और सूर्य-चंद्रमा अधिक स्पष्ट दिखाई देने लगते हैं। मनुष्यों को अब 3 दिन के बजाय हर 2 दिन में भूख लगती है। पसलियों की संख्या 128 हो जाती है, जो शारीरिक दृढ़ता में कमी का संकेत है। जीवन अभी भी अराजक, शांतिपूर्ण और 'मेरा-तेरा' के भाव से मुक्त रहता है।", 
      kn: "ಮಧ್ಯಮ ಭೋಗಭೂಮಿ. ಇಲ್ಲಿ ಶಕ್ತಿ ಕುಂದಲು ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಕಲ್ಪವೃಕ್ಷಗಳ ಬೆಳಕು ಮಸುಕಾಗುತ್ತದೆ ಮತ್ತು ಸೂರ್ಯ-ಚಂದ್ರರು ಹೆಚ್ಚು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುತ್ತಾರೆ. ಮಾನವರಿಗೆ ಈಗ 3 ದಿನಗಳ ಬದಲಿಗೆ 2 ದಿನಕ್ಕೊಮ್ಮೆ ಹಸಿವಾಗುತ್ತದೆ. ಪಕ್ಕೆಲುಬುಗಳ ಸಂಖ್ಯೆ 128 ಕ್ಕೆ ಇಳಿಯುತ್ತದೆ. ಜೀವನವು ಇನ್ನೂ ಶಾಂತಿಯುತವಾಗಿರುತ್ತದೆ ಮತ್ತು 'ನನ್ನದು-ನಿನ್ನದು' ಎಂಬ ಭಾವನೆ ಇರುವುದಿಲ್ಲ." 
    }
  },
  {
    id: 3,
    name: { en: "Sushama-Duhshama", hi: "सुषमा-दुषमा", kn: "ಸುಷಮ-ದುಷಮ" },
    meaning: { en: "Happiness mixed with Sorrow", hi: "सुख और दुख का मिश्रण", kn: "ಸುಖ ಮತ್ತು ದುಃಖ ಮಿಶ್ರಣ" },
    duration: { en: "2 Koda-Kodi Sagaropama", hi: "2 कोड़ा-कोड़ी सागर", kn: "2 ಕೋಡಾ-ಕೋಡಿ ಸಾಗರೋಪಮ" },
    height: { en: "2,000 → 500 Dhanush", hi: "2000 → 500 धनुष", kn: "2000 → 500 ಧನುಷ್" },
    lifespan: { en: "1 Palyopama → 84 Lakh Purva", hi: "1 पल्योपम → 84 लाख पूर्व", kn: "1 ಪಲ್ಯೋಪಮ → 84 ಲಕ್ಷ ಪೂರ್ವ" },
    ribs: { en: "64 Ribs", hi: "64 पसलियां", kn: "64 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-orange-500",
    barColor: "bg-orange-500",
    description: { 
      en: "The Transition Era. The Kalpavrikshas fail and vanish, causing panic. The 14 Kulakaras (Manus) appear to guide humanity. They invent the 3 Punishments: 'Hakkara' (Alas!), 'Makkara' (Do not!), and 'Dhikkar' (Fie!). Due to the 'Hunda Avasarpini' anomaly, the lifespan ends at 84 Lakh Purva instead of 1 Crore Purva. Rishabhdev (1st Tirthankara) is born and teaches the 6 Professions (Asi, Masi, Krishi, etc.) as nature stops providing.", 
      hi: "संक्रमण काल। कल्पवृक्ष लुप्त हो जाते हैं, जिससे भय फैलता है। मानवता का मार्गदर्शन करने के लिए 14 कुलकर (मनु) प्रकट होते हैं। वे 3 प्रकार के दंडों की रचना करते हैं: 'हा-कार', 'मा-कार', और 'धिक्कार'। 'हुंडा अवसर्पिणी' दोष के कारण, इस काल के अंत में आयु 1 करोड़ पूर्व के बजाय 84 लाख पूर्व रह जाती है। आदिनाथ भगवान (प्रथम तीर्थंकर) का जन्म होता है जो जीवन जीने के लिए 6 कर्म (कृषि, मसि, आदि) सिखाते हैं।", 
      kn: "ಸಂಕ್ರಮಣ ಕಾಲ. ಕಲ್ಪವೃಕ್ಷಗಳು ಮಾಯವಾಗುತ್ತವೆ, ಜನರಲ್ಲಿ ಭಯ ಮೂಡುತ್ತದೆ. 14 ಕುಲಕರರು (ಮನುಗಳು) ಮಾನವ ಕುಲಕ್ಕೆ ದಾರಿ ತೋರಿಸಲು ಬರುತ್ತಾರೆ. ಅವರು 3 ಬಗೆಯ ದಂಡನೆಗಳನ್ನು ತರುತ್ತಾರೆ: 'ಹಾಕಾರ', 'ಮಾಕಾರ' ಮತ್ತು 'ಧಿಕ್ಕಾರ'. 'ಹುಂಡಾ ಅವಸರ್ಪಿಣಿ' ದೋಷದಿಂದಾಗಿ, ಆಯಸ್ಸು 1 ಕೋಟಿ ಪೂರ್ವದ ಬದಲಿಗೆ 84 ಲಕ್ಷ ಪೂರ್ವಕ್ಕೆ ಇಳಿಯುತ್ತದೆ. ಆದಿನಾಥ ಭಗವಂತರು ಜನಿಸಿ, ಜೀವನ ನಡೆಸಲು 6 ಕರ್ಮಗಳನ್ನು (ಕೃಷಿ, ಮಸಿ, ಇತ್ಯಾದಿ) ಕಲಿಸುತ್ತಾರೆ." 
    }
  },
  {
    id: 4,
    name: { en: "Duhshama-Sushama", hi: "दुषमा-सुषमा", kn: "ದುಷಮ-ಸುಷಮ" },
    meaning: { en: "Sorrow with Spiritual Opportunity", hi: "दुख के साथ मोक्ष मार्ग", kn: "ದುಃಖದ ಜೊತೆ ಮುಕ್ತಿಯ ಅವಕಾಶ" },
    duration: { en: "1 Koda-Kodi (minus 42,000 years)", hi: "1 कोड़ा-कोड़ी (42 हजार कम)", kn: "1 ಕೋಡಾ-ಕೋಡಿ (42 ಸಾವಿರ ಕಡಿಮೆ)" },
    height: { en: "500 Dhanush → 7 Hath", hi: "500 धनुष → 7 हाथ", kn: "500 ಧನುಷ್ → 7 ಹಸ್ತ" },
    lifespan: { en: "84 Lakh Purva → 120 Years", hi: "84 लाख पूर्व → 120 वर्ष", kn: "84 ಲಕ್ಷ ಪೂರ್ವ → 120 ವರ್ಷ" },
    ribs: { en: "32 → 16 Ribs", hi: "32 → 16 पसलियां", kn: "32 → 16 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-emerald-500",
    barColor: "bg-emerald-500",
    description: { 
      en: "The 'Karmabhumi' (Land of Action). This era hosts the 63 Salakapurusas (24 Tirthankaras, 12 Chakravartins, etc.). Religion is fully established, and Moksha is attainable. However, physical decline is catastrophic: heights drop from 3000 ft (Rishabhdev) to 10.5 ft (Mahavira). This era is marked by anomalies like the Mahabharata/Ramayana wars and the early death of Tirthankaras relative to the standard cycle.", 
      hi: "कर्मभूमि। यह 63 शलाका पुरुषों (24 तीर्थंकर, 12 चक्रवर्ती, आदि) का युग है। धर्म की पूर्ण स्थापना होती है और मोक्ष प्राप्त करना संभव है। हालांकि, शारीरिक पतन विनाशकारी है: ऊंचाई 3000 फीट (आदिनाथ) से गिरकर 10.5 फीट (महावीर) रह जाती है। यह युग महाभारत/रामायण जैसे युद्धों और तीर्थंकरों की अकाल मृत्यु (मानक चक्र की तुलना में) जैसे दोषों से चिह्नित है।", 
      kn: "ಕರ್ಮಭೂಮಿ. ಇದು 63 ಶಲಾಕಾ ಪುರುಷರ (24 ತೀರ್ಥಂಕರರು, 12 ಚಕ್ರವರ್ತಿಗಳು) ಯುಗ. ಧರ್ಮ ಸ್ಥಾಪನೆಯಾಗುತ್ತದೆ ಮತ್ತು ಮೋಕ್ಷ ಸಾಧ್ಯವಿದೆ. ಆದರೆ, ಶಾರೀರಿಕ ಕುಸಿತವು ಭೀಕರವಾಗಿರುತ್ತದೆ: ಎತ್ತರವು 3000 ಅಡಿಗಳಿಂದ (ಆದಿನಾಥ) 10.5 ಅಡಿಗಳಿಗೆ (ಮಹಾವೀರ) ಇಳಿಯುತ್ತದೆ. ಈ ಯುಗದಲ್ಲಿ ಮಹಾಭಾರತ/ರಾಮಾಯಣದಂತಹ ಯುದ್ಧಗಳು ನಡೆಯುತ್ತವೆ." 
    }
  },
  {
    id: 5,
    name: { en: "Duhshama", hi: "दुषमा", kn: "ದುಷಮ" },
    meaning: { en: "Age of Decline and Suffering", hi: "पतन और दुख का युग", kn: "ಪತನ ಮತ್ತು ದುಃಖದ ಯುಗ" },
    duration: { en: "21,000 Years", hi: "21,000 वर्ष", kn: "21,000 ವರ್ಷ" },
    height: { en: "7 Hath → 3 Hath", hi: "7 हाथ → 3 हाथ", kn: "7 ಹಸ್ತ → 3 ಹಸ್ತ" },
    lifespan: { en: "120 Years → 20 Years", hi: "120 वर्ष → 20 वर्ष", kn: "120 ವರ್ಷ → 20 ವರ್ಷ" },
    ribs: { en: "16 Ribs (Fragile)", hi: "16 पसलियां (कमज़ोर)", kn: "16 ಪಕ್ಕೆಲುಬುಗಳು (ದುರ್ಬಲ)" },
    wheelColor: "text-zinc-500",
    barColor: "bg-zinc-500",
    description: { 
      en: "Current Era (Pancham Kaal). No Tirthankaras present. Human bones lack the 'Vajrarishabhanaraca' structure required for Shukla Dhyana, making Moksha physically impossible from Bharat Kshetra. The era will end with the death of the last 4 practitioners: Muni Virangada, Aaryika Sarvasri, Shravak Agnila, and Shravika Pangushri. Upon their death, the element of Fire will vanish from earth.", 
      hi: "वर्तमान पंचम काल। कोई तीर्थंकर नहीं। मानव हड्डियों में 'वज्रवृषभनाराच' संहनन नहीं है, इसलिए शुक्ल ध्यान और मोक्ष संभव नहीं है। इस युग का अंत अंतिम 4 धारकों की मृत्यु के साथ होगा: मुनि वीरांगद, आर्यिका सर्वश्री, श्रावक अग्निले और श्राविका पंगु। उनकी मृत्यु के साथ ही पृथ्वी से अग्नि तत्व लुप्त हो जाएगा।", 
      kn: "ವರ್ತಮಾನ ಪಂಚಮ ಕಾಲ. ಇಲ್ಲಿ ತೀರ್ಥಂಕರರಿಲ್ಲ. ಮಾನವನ ಮೂಳೆಗಳಲ್ಲಿ 'ವಜ್ರಋಷಭನಾರಾಚ' ಶಕ್ತಿ ಇಲ್ಲದಿರುವುದರಿಂದ, ಶುಕ್ಲ ಧ್ಯಾನ ಮತ್ತು ಮೋಕ್ಷ ಸಾಧ್ಯವಿಲ್ಲ. ಈ ಕಾಲದ ಅಂತ್ಯವು ಕೊನೆಯ 4 ಸಾಧಕರ ಮರಣದೊಂದಿಗೆ ಆಗುತ್ತದೆ: ಮುನಿ ವೀರಾಂಗದ, ಆರ್ಯಿಕಾ ಸರ್ವಶ್ರೀ, ಶ್ರಾವಕ ಅಗ್ನಿಲ ಮತ್ತು ಶ್ರಾವಿಕಾ ಪಂಗು. ಇವರ ಮರಣದ ನಂತರ ಭೂಮಿಯಿಂದ ಅಗ್ನಿ ತತ್ವವು ಮಾಯವಾಗುತ್ತದೆ." 
    }
  },
  {
    id: 6,
    name: { en: "Duhshama-Duhshama", hi: "दुषमा-दुषमा", kn: "ದುಷಮ-ದುಷಮ" },
    meaning: { en: "Age of Extreme Suffering", hi: "अत्यंत दुख का युग", kn: "ಅತ್ಯಂತ ದುಃಖದ ಯುಗ" },
    duration: { en: "21,000 Years", hi: "21,000 वर्ष", kn: "21,000 ವರ್ಷ" },
    height: { en: "3 Hath → 1 Hath", hi: "3 हाथ → 1 हाथ", kn: "3 ಹಸ್ತ → 1 ಹಸ್ತ" },
    lifespan: { en: "20 Years → 16 Years", hi: "20 वर्ष → 16 वर्ष", kn: "20 ವರ್ಷ → 16 ವರ್ಷ" },
    ribs: { en: "Unknown", hi: "अज्ञात", kn: "ಅಜ್ಞಾತ" },
    wheelColor: "text-zinc-800",
    barColor: "bg-zinc-800",
    description: { 
      en: "The Age of Barbarism. Civilization collapses completely. Humans shrink to dwarf-like beings (1-1.5 ft), live in 72 types of 'Bils' (caves) near rivers like Ganga, and eat raw meat/fish as fire is lost. There is no family, marriage, or government. The era ends with 49 days of 'Samvartaka' rains (Acid, Poison, Fire, Stone) that destroy all life, except a few protected seeds in caves.", 
      hi: "घोर बर्बर युग। सभ्यता पूरी तरह नष्ट हो जाती है। मनुष्य बौने (1-1.5 फीट) हो जाते हैं, गंगा जैसी नदियों के किनारे 72 प्रकार के 'बिलों' (गुफाओं) में रहते हैं, और अग्नि न होने के कारण कच्चा मांस/मछली खाते हैं। कोई परिवार, विवाह या सरकार नहीं रहती। युग का अंत 49 दिनों की प्रलयकारी 'संवर्तक' वर्षा (अम्ल, विष, अग्नि, पत्थर) के साथ होता है जो सब कुछ नष्ट कर देती है।", 
      kn: "ಘೋರ ಕಷ್ಟದ ಕಾಲ. ನಾಗರಿಕತೆ ಸಂಪೂರ್ಣವಾಗಿ ನಾಶವಾಗುತ್ತದೆ. ಮಾನವರು ಕುಬ್ಜರಾಗುತ್ತಾರೆ (1-1.5 ಅಡಿ), ಗಂಗಾ ನದಿಯ ದಡದಲ್ಲಿ 72 ಬಗೆಯ 'ಬಿಲ'ಗಳಲ್ಲಿ ವಾಸಿಸುತ್ತಾರೆ. ಬೆಂಕಿ ಇಲ್ಲದ ಕಾರಣ ಹಸಿ ಮಾಂಸ/ಮೀನು ತಿನ್ನುತ್ತಾರೆ. ಕುಟುಂಬ, ವಿವಾಹ ಅಥವಾ ಸರ್ಕಾರ ಇರುವುದಿಲ್ಲ. ಈ ಕಾಲವು 49 ದಿನಗಳ ಪ್ರಳಯಕಾರಿ 'ಸಂವರ್ತಕ' ಮಳೆಯೊಂದಿಗೆ (ಆಮ್ಲ, ವಿಷ, ಬೆಂಕಿ, ಕಲ್ಲು) ಕೊನೆಗೊಳ್ಳುತ್ತದೆ." 
    }
  }
];

// Keep the 'Ara' type and 'aras' array exactly as they are in your current file.
// ADD this new export at the bottom of the file:

export const fullCycle = [
  // --- AVASARPINI (Descending) ---
  ...aras.map(a => ({ ...a, type: 'avasarpini', cycleName: { en: "Avasarpini", hi: "अवसर्पिणी", kn: "ಅವಸರ್ಪಿಣಿ" } })),
  
  // --- UTSARPINI (Ascending - Reverse Order) ---
  // The logic: 
  // Ara 1 (Utsarpini) = Mirror of Ara 6 (Bad -> Bad)
  // Ara 2 (Utsarpini) = Mirror of Ara 5 (Bad -> Okay)
  // ...
  // Ara 6 (Utsarpini) = Mirror of Ara 1 (Good -> Best)
  ...[...aras].reverse().map((a, i) => ({
    ...a,
    id: i + 7, // IDs 7 to 12
    type: 'utsarpini',
    cycleName: { en: "Utsarpini", hi: "उत्सर्पिणी", kn: "ಉತ್ಸರ್ಪಿಣಿ" },
    // We override the color to differentiate Utsarpini (Greens/Blues)
    color: i === 0 ? "bg-zinc-800" : // Mirror of Ara 6
           i === 1 ? "bg-red-500" :  // Mirror of Ara 5
           i === 2 ? "bg-orange-500" :
           i === 3 ? "bg-orange-200" :
           i === 4 ? "bg-emerald-300" : // Greenish for good times
           "bg-emerald-500" // Best time
  }))
];