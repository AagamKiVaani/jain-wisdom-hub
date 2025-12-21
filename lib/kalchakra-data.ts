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
    meaning: { en: "Absolute Bliss", hi: "परम सुख", kn: "ಪರಮ ಸುಖ" },
    duration: { en: "4 Koda-Kodi Sagaropama", hi: "4 कोड़ा-कोड़ी सागर", kn: "4 ಕೋಡಾ-ಕೋಡಿ ಸಾಗರ" },
    height: { en: "6,000 Dhanush (~6.8 miles)", hi: "6000 धनुष (~6.8 मील)", kn: "6000 ಧನುಷ್ (~6.8 ಮೈಲಿ)" },
    lifespan: { en: "3 Palyopama", hi: "3 पल्योपम", kn: "3 ಪಲ್ಯೋಪಮ" },
    ribs: { en: "256 Ribs (Vajra)", hi: "256 पसलियां", kn: "256 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-stone-200", // Slightly darker white for visibility
    barColor: "bg-stone-200",
    description: { 
      en: "The 'Uttama Bhogbhumi' (Supreme Land of Enjoyment). The earth is sweet as sugar. 10 types of Kalpavrikshas provide everything. Humans are born as twins, live as spouses, and die together peacefully. Digestion is 100% efficient.", 
      hi: "उत्तम भोगभूमि। कल्पवृक्ष सब कुछ प्रदान करते हैं। मनुष्य युगल (जुड़वां) पैदा होते हैं।", 
      kn: "ಉತ್ತಮ ಭೋಗಭೂಮಿ. ಕಲ್ಪವೃಕ್ಷಗಳು ಬೇಡಿದನ್ನು ನೀಡುತ್ತವೆ." 
    }
  },
  {
    id: 2,
    name: { en: "Sushama", hi: "सुषमा", kn: "ಸುಷಮ" },
    meaning: { en: "Happiness", hi: "सुख", kn: "ಸುಖ" },
    duration: { en: "3 Koda-Kodi Sagaropama", hi: "3 कोड़ा-कोड़ी सागर", kn: "3 ಕೋಡಾ-ಕೋಡಿ ಸಾಗರ" },
    height: { en: "4,000 Dhanush (~4.5 miles)", hi: "4000 धनुष (~4.5 मील)", kn: "4000 ಧನುಷ್ (~4.5 ಮೈಲಿ)" },
    lifespan: { en: "2 Palyopama", hi: "2 पल्योपम", kn: "2 ಪಲ್ಯೋಪಮ" },
    ribs: { en: "128 Ribs", hi: "128 पसलियां", kn: "128 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-amber-400", // Gold/Amber (Visible on white & black)
    barColor: "bg-amber-400",
    description: { 
      en: "The 'Madhyama Bhogbhumi'. The light of Kalpavrikshas dims slightly. Humans eat every 2 days. The rib count drops to 128, indicating a reduction in physical solidity.", 
      hi: "मध्यम भोगभूमि। कल्पवृक्षों का प्रकाश थोड़ा कम हो जाता है।", 
      kn: "ಮಧ್ಯಮ ಭೋಗಭೂಮಿ. ಕಲ್ಪವೃಕ್ಷಗಳ ಬೆಳಕು ಮಸುಕಾಗುತ್ತದೆ." 
    }
  },
  {
    id: 3,
    name: { en: "Sushama-Duhshama", hi: "सुषमा-दुषमा", kn: "ಸುಷಮ-ದುಷಮ" },
    meaning: { en: "Happiness mixed with Sorrow", hi: "सुख-दुख", kn: "ಸುಖ-ದುಖ" },
    duration: { en: "2 Koda-Kodi Sagaropama", hi: "2 कोड़ा-कोड़ी सागर", kn: "2 ಕೋಡಾ-ಕೋಡಿ ಸಾಗರ" },
    height: { en: "2,000 → 500 Dhanush", hi: "2000 → 500 धनुष", kn: "2000 → 500 ಧನುಷ್" },
    lifespan: { en: "1 Palyopama → 84 Lakh Purva", hi: "1 पल्योपम → 84 लाख पूर्व", kn: "1 ಪಲ್ಯೋಪಮ → 84 ಲಕ್ಷ ಪೂರ್ವ" },
    ribs: { en: "64 Ribs", hi: "64 पसलियां", kn: "64 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-orange-500", // Deep Orange
    barColor: "bg-orange-500",
    description: { 
      en: "Transition Era. Kalpavrikshas vanish. The 14 Kulakaras (Manus) appear. Rishabhdev (1st Tirthankara) teaches the 6 Professions as nature stops providing.", 
      hi: "संक्रमण काल। कल्पवृक्ष लुप्त हो जाते हैं। आदिनाथ भगवान ६ कर्म सिखाते हैं।", 
      kn: "ಸಂಕ್ರಮಣ ಕಾಲ. ಕಲ್ಪವೃಕ್ಷಗಳು ಮಾಯವಾಗುತ್ತವೆ." 
    }
  },
  {
    id: 4,
    name: { en: "Duhshama-Sushama", hi: "दुषमा-सुषमा", kn: "ದುಷಮ-ಸುಷಮ" },
    meaning: { en: "Sorrow with Happiness", hi: "दुख-सुख", kn: "ದುಖ-ಸುಖ" },
    duration: { en: "1 Koda-Kodi (minus 42k yrs)", hi: "1 कोड़ा-कोड़ी (42 हजार कम)", kn: "1 ಕೋಡಾ-ಕೋಡಿ (42 ಸಾವಿರ ಕಡಿಮೆ)" },
    height: { en: "500 Dhanush → 7 Hath", hi: "500 धनुष → 7 हाथ", kn: "500 ಧನುಷ್ → 7 ಹಸ್ತ" },
    lifespan: { en: "84 Lakh Purva → 120 Years", hi: "84 लाख पूर्व → 120 वर्ष", kn: "84 ಲಕ್ಷ ಪೂರ್ವ → 120 ವರ್ಷ" },
    ribs: { en: "32 → 16 Ribs", hi: "32 → 16 पसलियां", kn: "32 → 16 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-emerald-500", // Green
    barColor: "bg-emerald-500",
    description: { 
      en: "The 'Karmabhumi'. Era of 24 Tirthankaras. Religion is fully established and Moksha is possible. Heights drop drastically from 3000 ft to 10.5 ft.", 
      hi: "कर्मभूमि। २४ तीर्थंकरों का युग। मोक्ष संभव है।", 
      kn: "ಕರ್ಮಭೂಮಿ. ೨೪ ತೀರ್ಥಂಕರರ ಯುಗ." 
    }
  },
  {
    id: 5,
    name: { en: "Duhshama", hi: "दुषमा", kn: "ದುಷಮ" },
    meaning: { en: "Epoch of Sorrow", hi: "दुख", kn: "ದುಖ" },
    duration: { en: "21,000 Years", hi: "21,000 वर्ष", kn: "21,000 ವರ್ಷ" },
    height: { en: "7 Hath → 3 Hath (~4.5 ft)", hi: "7 हाथ → 3 हाथ", kn: "7 ಹಸ್ತ → 3 ಹಸ್ತ" },
    lifespan: { en: "120 Years → 20 Years", hi: "120 वर्ष → 20 वर्ष", kn: "120 ವರ್ಷ → 20 ವರ್ಷ" },
    ribs: { en: "16 Ribs (Fragile)", hi: "16 पसलियां", kn: "16 ಪಕ್ಕೆಲುಬುಗಳು" },
    wheelColor: "text-zinc-500", // Grey
    barColor: "bg-zinc-500",
    description: { 
      en: "Current Era (Pancham Kaal). No Tirthankaras. Bones are too fragile for Shukla Dhyan, making Moksha impossible. Ends when the last monk dies.", 
      hi: "वर्तमान काल। हड्डियां कमजोर हैं, मोक्ष संभव नहीं।", 
      kn: "ವರ್ತಮಾನ ಪಂಚಮ ಕಾಲ." 
    }
  },
  {
    id: 6,
    name: { en: "Duhshama-Duhshama", hi: "दुषमा-दुषमा", kn: "ದುಷಮ-ದುಷಮ" },
    meaning: { en: "Utmost Sorrow", hi: "घोर दुख", kn: "ಘೋರ ದುಖ" },
    duration: { en: "21,000 Years", hi: "21,000 वर्ष", kn: "21,000 ವರ್ಷ" },
    height: { en: "3 Hath → 1 Hath", hi: "3 हाथ → 1 हाथ", kn: "3 ಹಸ್ತ → 1 ಹಸ್ತ" },
    lifespan: { en: "20 Years → 16 Years", hi: "20 वर्ष → 16 वर्ष", kn: "20 ವರ್ಷ → 16 ವರ್ಷ" },
    ribs: { en: "Unknown", hi: "अज्ञात", kn: "ಅಜ್ಞಾತ" },
    wheelColor: "text-zinc-800", // Dark Grey (Visible on Black & White)
    barColor: "bg-zinc-800",
    description: { 
      en: "Age of Barbarism. Humans shrink to 1 ft, live in caves, eat raw meat. Ends with 49 days of apocalyptic rains.", 
      hi: "बर्बर युग। मानव गुफाओं में रहते हैं।", 
      kn: "ಅತ್ಯಂತ ಕಷ್ಟದ ಕಾಲ." 
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