// lib/jain-data.ts

export type Section = {
  heading: { en: string; hi: string; kn: string };
  text: { en: string; hi: string; kn: string };
};

export type Topic = {
  id: string;
  title: { en: string; hi: string; kn: string };
  subtitle: { en: string; hi: string; kn: string };
  sections: Section[]; // <--- NEW: List of sections instead of one big text
  videoUrl?: string;
};

export const jainTopics: Record<string, Topic> = {
  "namokar-mantra": {
    id: "namokar-mantra",
    title: { en: "Namokar Mantra", hi: "णमोकार मंत्र", kn: "ಣಮೋಕಾರ ಮಂತ್ರ" },
    subtitle: { en: "The Eternal Prayer of Humility", hi: "विनम्रता की शाश्वत प्रार्थना", kn: "ವಿನಮ್ರತೆಯ ಶಾಶ್ವತ ಪ್ರಾರ್ಥನೆ" },
    
    sections: [
      {
        heading: { en: "The Eternal Mantra", hi: "मूल मंत्र", kn: "ಮೂಲ ಮಂತ್ರ" },
        text: {
          en: "Ṇamō Arihantāṇaṁ\nṆamō Siddhāṇaṁ\nṆamō Āyariyāṇaṁ\nṆamō Uvajjhāyāṇaṁ\nṆamō Lōē Savva Sāhūṇaṁ",
          hi: "णमो अरिहंताणं\nणमो सिद्धाणं\nणमो आयरियाणं\nणमो उवज्झायाणं\nणमो लोए सव्व साहूणं",
          kn: "ಣಮೋ ಅರಿಹಂತಾಣಂ\nಣಮೋ ಸಿದ್ಧಾಣಂ\nಣಮೋ ಆಯರಿಯಾಣಂ\nಣಮೋ ಉವಜ್ಜಾಯಾಣಂ\nಣಮೋ ಲೋಏ ಸವ್ವ ಸಾಹೂಣಂ"
        }
      },
      {
        heading: { en: "Deep Meaning", hi: "गहरा अर्थ", kn: "ಆಳವಾದ ಅರ್ಥ" },
        text: {
          en: "I bow to the Arihantas (Destroyers of inner enemies).\nI bow to the Siddhas (Liberated souls).\nI bow to the Acharyas (Spiritual leaders).\nI bow to the Upadhyayas (Teachers).\nI bow to all Sadhus (Monks) in the world.",
          hi: "मैं अरिहंतों (जिन्होंने आंतरिक शत्रुओं का नाश किया है) को नमन करता हूँ।\nमैं सिद्धों (मुक्त आत्माओं) को नमन करता हूँ...\n(बाकी अर्थ यहाँ)",
          kn: "ಅರಿಹಂತರಿಗೆ ನಮಸ್ಕಾರಗಳು...\n(ಅರ್ಥ ಇಲ್ಲಿ)"
        }
      },
      {
        heading: { en: "Why is it Unique?", hi: "यह अद्वितीय क्यों है?", kn: "ಇದು ಏಕೆ ವಿಶಿಷ್ಟವಾಗಿದೆ?" },
        text: {
          en: "Unlike other prayers that ask for wealth, health, or power, this mantra asks for nothing. It is a purely selfless gesture of deep humility towards those who have achieved spiritual perfection.",
          hi: "अन्य प्रार्थनाओं के विपरीत जो धन या स्वास्थ्य मांगती हैं, यह मंत्र कुछ नहीं मांगता।",
          kn: "ಇದು ಸಂಪತ್ತು ಅಥವಾ ಶಕ್ತಿಯನ್ನು ಕೇಳುವುದಿಲ್ಲ."
        }
      }
    ],
    videoUrl: ""
  },
  
  "ahimsa": {
    id: "ahimsa",
    title: { en: "Ahimsa", hi: "अहिंसा", kn: "ಅಹಿಂಸೆ" },
    subtitle: { en: "Non-violence is the highest religion", hi: "अहिंसा परमो धर्म", kn: "ಅಹಿಂಸೆಯೇ ಪರಮ ಧರ್ಮ" },
    sections: [
      {
        heading: { en: "Introduction", hi: "परिचय", kn: "ಪರಿಚಯ" },
        text: { en: "Coming soon...", hi: "जल्द आ रहा है...", kn: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ..." }
      }
    ]
  }
};