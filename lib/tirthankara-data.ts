export type Tirthankara = {
  id: number;
  name: { en: string; hi: string; kn: string };
  symbol: { en: string; hi: string; kn: string; imagePath: string };
  color: string; 
  placeOfNirvana: { en: string; hi: string; kn: string };
  colorHex: string; 

  // --- Extended Details ---
  caste: { en: string; hi: string; kn: string };
  dynasty: { en: string; hi: string; kn: string };
  gotra: { en: string; hi: string; kn: string }; // <--- NEW FIELD
  kevalaVriksha: { en: string; hi: string; kn: string };
  birthPlace: { en: string; hi: string; kn: string };
  mother: { en: string; hi: string; kn: string };
  father: { en: string; hi: string; kn: string };
  lifespan: { en: string; hi: string; kn: string };
  height: { en: string; hi: string; kn: string };
  tirthankaraImage: string;
};

export const tirthankaras: Tirthankara[] = [
    {
    id: 1,
    name: { en: "Adinath", hi: "आदिनाथ", kn: "ಆದಿನಾಥ" },
    symbol: { en: "Bull", hi: "बैल", kn: "ವೃಷಭ", imagePath: "/symbols/bull.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Mount Kailash (Ashtapad)", hi: "कैलाश पर्वत (अष्टापद)", kn: "ಕೈಲಾಸ ಪರ್ವತ (ಅಷ್ಟಾಪದ)" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Banyan Tree", hi: "वट वृक्ष", kn: "ಆಲದ ಮರ" },
    birthPlace: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
    mother: { en: "Marudevi Mata", hi: "मरुदेवी माता", kn: "ಮರುದೇವಿ ಮಾತಾ" },
    father: { en: "Nabhi Raja", hi: "नाभि राजा", kn: "ನಾಭಿ ರಾಜ" },
    lifespan: { en: "84 Lakh Purva", hi: "८४ लाख पूर्व", kn: "೮೪ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "500 Dhanush", hi: "५०० धनुष", kn: "೫೦೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/adinath.png"
    },

    {
    id: 2,
    name: { en: "Ajitnath", hi: "अजितनाथ", kn: "ಅಜಿತನಾಥ" },
    symbol: { en: "Elephant", hi: "हाथी", kn: "ಆನೆ", imagePath: "/symbols/elephant.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Sala Tree", hi: "साल वृक्ष", kn: "ಸಾಲ ಮರ" },
    birthPlace: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
    mother: { en: "Vijaya Mata", hi: "विजया माता", kn: "ವಿಜಯಾ ಮಾತಾ" },
    father: { en: "Jitashatru Raja", hi: "जितशत्रु राजा", kn: "ಜಿತಶತ್ರು ರಾಜ" },
    lifespan: { en: "72 Lakh Purva", hi: "७२ लाख पूर्व", kn: "೭೨ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "450 Dhanush", hi: "४५० धनुष", kn: "೪೫೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/ajitnath.png"
    },

    {
    id: 3,
    name: { en: "Sambhavnath", hi: "संभवनाथ", kn: "ಸಂಭವನಾಥ" },
    symbol: { en: "Horse", hi: "घोड़ा", kn: "ಕುದುರೆ", imagePath: "/symbols/horse.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Sala Tree", hi: "साल वृक्ष", kn: "ಸಾಲ ಮರ" },
    birthPlace: { en: "Shravasti", hi: "श्रावस्ती", kn: "ಶ್ರಾವಸ್ತಿ" },
    mother: { en: "Senadevi Mata", hi: "सेनादेवी माता", kn: "ಸೇನಾದೇವಿ ಮಾತಾ" },
    father: { en: "Jitashatru Raja", hi: "जितशत्रु राजा", kn: "ಜಿತಶತ್ರು ರಾಜ" },
    lifespan: { en: "60 Lakh Purva", hi: "६० लाख पूर्व", kn: "೬೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "400 Dhanush", hi: "४०० धनुष", kn: "೪೦೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/sambhavnath.png"
    },

    {
    id: 4,
    name: { en: "Abhinandannath", hi: "अभिनंदननाथ", kn: "ಅಭಿನಂದನನಾಥ" },
    symbol: { en: "Monkey", hi: "बंदर", kn: "ಮಂಗ", imagePath: "/symbols/monkey.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Priyangu Tree", hi: "प्रियंगु वृक्ष", kn: "ಪ್ರಿಯಂಗು ಮರ" },
    birthPlace: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
    mother: { en: "Siddhartha Mata", hi: "सिद्धार्था माता", kn: "ಸಿದ್ಧಾರ್ಥಾ ಮಾತಾ" },
    father: { en: "Samvara Raja", hi: "संवर राजा", kn: "ಸಂವರ ರಾಜ" },
    lifespan: { en: "50 Lakh Purva", hi: "५० लाख पूर्व", kn: "೫೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "350 Dhanush", hi: "३५० धनुष", kn: "೩೫೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/abhinandannath.png"
    },

    {
    id: 5,
    name: { en: "Sumatinath", hi: "सुमतिनाथ", kn: "ಸುಮತಿನಾಥ" },
    symbol: { en: "Chakravaka Bird", hi: "चकवा पक्षी", kn: "ಚಕ್ರವಾಕ ಪಕ್ಷಿ", imagePath: "/symbols/chakwa.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Priyangu Tree", hi: "प्रियंगु वृक्ष", kn: "ಪ್ರಿಯಂಗು ಮರ" },
    birthPlace: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
    mother: { en: "Mangala Mata", hi: "मंगला माता", kn: "ಮಂಗಳಾ ಮಾತಾ" },
    father: { en: "Megharatha Raja", hi: "मेघरथ राजा", kn: "ಮೇಘರಥ ರಾಜ" },
    lifespan: { en: "40 Lakh Purva", hi: "४० लाख पूर्व", kn: "೪೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "300 Dhanush", hi: "३०० धनुष", kn: "೩೦೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/sumatinath.png"
    },

    {
    id: 6,
    name: { en: "Padmaprabha", hi: "पद्मप्रभ", kn: "ಪದ್ಮಪ್ರಭ" },
    symbol: { en: "Lotus", hi: "कमल", kn: "ಕಮಲ", imagePath: "/symbols/lotus.png" },
    color: "Red",
    colorHex: "#DC2626",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Banyan Tree", hi: "वट वृक्ष", kn: "ಆಲದ ಮರ" },
    birthPlace: { en: "Kaushambi", hi: "कौशाम्बी", kn: "ಕೌಶಾಂಬಿ" },
    mother: { en: "Susima Mata", hi: "सुसिमा माता", kn: "ಸುಸಿಮಾ ಮಾತಾ" },
    father: { en: "Shridhara Raja", hi: "श्रीधर राजा", kn: "ಶ್ರೀಧರ ರಾಜ" },
    lifespan: { en: "30 Lakh Purva", hi: "३० लाख पूर्व", kn: "೩೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "250 Dhanush", hi: "२५० धनुष", kn: "೨೫೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/padmaprabha.png"
    },

    {
    id: 7,
    name: { en: "Suparshvanath", hi: "सुपार्श्वनाथ", kn: "ಸುಪಾರ್ಶ್ವನಾಥ" },
    symbol: { en: "Swastika", hi: "स्वस्तिक", kn: "ಸ್ವಸ್ತಿಕ", imagePath: "/symbols/swasthik.png" },
    color: "Green",
    colorHex: "#16A34A",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Sirisha Tree", hi: "शिरीष वृक्ष", kn: "ಶಿರೀಷ ಮರ" },
    birthPlace: { en: "Vishala", hi: "विशाला", kn: "ವಿಶಾಲಾ" },
    mother: { en: "Prithvi Mata", hi: "पृथ्वी माता", kn: "ಪೃಥ್ವಿ ಮಾತಾ" },
    father: { en: "Pratishta Raja", hi: "प्रतिष्ठा राजा", kn: "ಪ್ರತಿಷ್ಠಾ ರಾಜ" },
    lifespan: { en: "20 Lakh Purva", hi: "२० लाख पूर्व", kn: "೨೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "200 Dhanush", hi: "२०० धनुष", kn: "೨೦೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/suparshvanath.png"
    },

    {
    id: 8,
    name: { en: "Chandraprabha", hi: "चन्द्रप्रभ", kn: "ಚಂದ್ರಪ್ರಭ" },
    symbol: { en: "Moon", hi: "चंद्रमा", kn: "ಚಂದ್ರ", imagePath: "/symbols/moon.png" },
    color: "White",
    colorHex: "#F8FAFC",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Nag Tree", hi: "नाग वृक्ष", kn: "ನಾಗ ಮರ" },
    birthPlace: { en: "Chandrapuri", hi: "चन्द्रपुरी", kn: "ಚಂದ್ರಪುರಿ" },
    mother: { en: "Lakshmana Mata", hi: "लक्ष्मणा माता", kn: "ಲಕ್ಷ್ಮಣಾ ಮಾತಾ" },
    father: { en: "Mahasena Raja", hi: "महासेन राजा", kn: "ಮಹಾಸೇನ ರಾಜ" },
    lifespan: { en: "10 Lakh Purva", hi: "१० लाख पूर्व", kn: "೧೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "150 Dhanush", hi: "१५० धनुष", kn: "೧೫೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/chandraprabha.png"
    },

    {
    id: 9,
    name: { en: "Pushpadanta", hi: "पुष्पदन्त", kn: "ಪುಷ್ಪದಂತ" },
    symbol: { en: "Crocodile", hi: "मगरमच्छ", kn: "ಮೊಸಳೆ", imagePath: "/symbols/crocodile.png" },
    color: "White",
    colorHex: "#F8FAFC",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Sal Tree", hi: "साल वृक्ष", kn: "ಸಾಲ ಮರ" },
    birthPlace: { en: "Kakandi", hi: "काकंदी", kn: "ಕಾಕಂದಿ" },
    mother: { en: "Sujata Mata", hi: "सुजाता माता", kn: "ಸುಜಾತಾ ಮಾತಾ" },
    father: { en: "Sugriva Raja", hi: "सुग्रीव राजा", kn: "ಸುಗ್ರೀವ ರಾಜ" },
    lifespan: { en: "5 Lakh Purva", hi: "५ लाख पूर्व", kn: "೫ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "100 Dhanush", hi: "१०० धनुष", kn: "೧೦೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/pushpadanta.png"
    },

    {
    id: 10,
    name: { en: "Sheetalnath", hi: "शीतलनाथ", kn: "ಶೀತಲನಾಥ" },
    symbol: { en: "Shrivriksha", hi: "श्रीवृक्ष", kn: "ಶ್ರೀವೃಕ್ಷ", imagePath: "/symbols/shrivriksha.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Priyangu Tree", hi: "प्रियंगु वृक्ष", kn: "ಪ್ರಿಯಂಗು ಮರ" },
    birthPlace: { en: "Bhadrika", hi: "भद्रिका", kn: "ಭದ್ರಿಕಾ" },
    mother: { en: "Sunanda Mata", hi: "सुनन्दा माता", kn: "ಸುನಂದಾ ಮಾತಾ" },
    father: { en: "Dridhavrata Raja", hi: "दृढ़व्रत राजा", kn: "ದೃಢವ್ರತ ರಾಜ" },
    lifespan: { en: "1 Lakh Purva", hi: "१ लाख पूर्व", kn: "೧ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "90 Dhanush", hi: "९० धनुष", kn: "೯೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/sheetalnath.png"
    },

    {
    id: 11,
    name: { en: "Shreyansnath", hi: "श्रेयांसनाथ", kn: "ಶ್ರೇಯಾಂಸನಾಥ" },
    symbol: { en: "Rhinoceros", hi: "गेंडा", kn: "ಖಡ್ಗಮೃಗ", imagePath: "/symbols/rhino.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Tinduka Tree", hi: "तिंदुक वृक्ष", kn: "ತಿಂದುಕ ಮರ" },
    birthPlace: { en: "Simhapuri", hi: "सिंहपुरी", kn: "ಸಿಂಹಪುರಿ" },
    mother: { en: "Vishnu Mata", hi: "विष्णु माता", kn: "ವಿಷ್ಣು ಮಾತಾ" },
    father: { en: "Vishnu Raja", hi: "विष्णु राजा", kn: "ವಿಷ್ಣು ರಾಜ" },
    lifespan: { en: "84 Thousand Purva", hi: "८४ हजार पूर्व", kn: "೮೪ ಸಾವಿರ ಪೂರ್ವ" },
    height: { en: "80 Dhanush", hi: "८० धनुष", kn: "೮೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/shreyansnath.png"
    },

    {
    id: 12,
    name: { en: "Vasupujya", hi: "वासुपूज्य", kn: "ವಾಸುಪೂಜ್ಯ" },
    symbol: { en: "Buffalo", hi: "भैंसा", kn: "ಎಮ್ಮೆ", imagePath: "/symbols/buffalo.png" },
    color: "Red",
    colorHex: "#DC2626",
    placeOfNirvana: { en: "Champapuri", hi: "चंपापुरी", kn: "ಚಂಪಾಪುರಿ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Patala Tree", hi: "पाताल वृक्ष", kn: "ಪಾತಾಳ ಮರ" },
    birthPlace: { en: "Champapuri", hi: "चंपापुरी", kn: "ಚಂಪಾಪುರಿ" },
    mother: { en: "Jaya Mata", hi: "जया माता", kn: "ಜಯಾ ಮಾತಾ" },
    father: { en: "Vasupujya Raja", hi: "वासुपूज्य राजा", kn: "ವಾಸುಪೂಜ್ಯ ರಾಜ" },
    lifespan: { en: "54 Lakh Purva", hi: "५४ लाख पूर्व", kn: "೫೪ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "70 Dhanush", hi: "७० धनुष", kn: "೭೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/vasupujya.png"
    },

    {
    id: 13,
    name: { en: "Vimalnath", hi: "विमलनाथ", kn: "ವಿಮಲನಾಥ" },
    symbol: { en: "Boar", hi: "सूअर", kn: "ಹಂದಿ", imagePath: "/symbols/boar.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Jambu Tree", hi: "जम्बू वृक्ष", kn: "ಜಂಬೂ ಮರ" },
    birthPlace: { en: "Kampilya", hi: "कम्पिल्य", kn: "ಕಂಪಿಲ್ಯ" },
    mother: { en: "Shyama Mata", hi: "श्यामा माता", kn: "ಶ್ಯಾಮಾ ಮಾತಾ" },
    father: { en: "Kritavarma Raja", hi: "कृतवर्मा राजा", kn: "ಕೃತವರ್ಮಾ ರಾಜ" },
    lifespan: { en: "60 Lakh Purva", hi: "६० लाख पूर्व", kn: "೬೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "60 Dhanush", hi: "६० धनुष", kn: "೬೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/vimalnath.png"
    },

    {
    id: 14,
    name: { en: "Anantnath", hi: "अनन्तनाथ", kn: "ಅನಂತನಾಥ" },
    symbol: { en: "Porcupine", hi: "सेही (साही)", kn: "ಮುಳ್ಳುಹಂದಿ", imagePath: "/symbols/porcupine.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Ashoka Tree", hi: "अशोक वृक्ष", kn: "ಅಶೋಕ ಮರ" },
    birthPlace: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
    mother: { en: "Suyasha Mata", hi: "सुयशा माता", kn: "ಸುಯಶಾ ಮಾತಾ" },
    father: { en: "Simhasena Raja", hi: "सिंहसेन राजा", kn: "ಸಿಂಹಸೇನ ರಾಜ" },
    lifespan: { en: "30 Lakh Purva", hi: "३० लाख पूर्व", kn: "೩೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "50 Dhanush", hi: "५० धनुष", kn: "೫೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/anantnath.png"
    },

    {
    id: 15,
    name: { en: "Dharmanath", hi: "धर्मनाथ", kn: "ಧರ್ಮನಾಥ" },
    symbol: { en: "Vajra", hi: "वज्र", kn: "ವಜ್ರ", imagePath: "/symbols/vajra.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Dadhiparna Tree", hi: "दधिपर्ण वृक्ष", kn: "ದಧಿಪರ್ಣ ಮರ" },
    birthPlace: { en: "Ratnapuri", hi: "रत्नपुरी", kn: "ರತ್ನಪುರಿ" },
    mother: { en: "Suprabha Mata", hi: "सुप्रभा माता", kn: "ಸುಪ್ರಭಾ ಮಾತಾ" },
    father: { en: "Bhanu Raja", hi: "भानु राजा", kn: "ಭಾನು ರಾಜ" },
    lifespan: { en: "25 Lakh Purva", hi: "२५ लाख पूर्व", kn: "೨೫ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "45 Dhanush", hi: "४५ धनुष", kn: "೪೫ ಧನುಷ್" },
    tirthankaraImage: "/arhats/dharmanath.png"
    },

    {
    id: 16,
    name: { en: "Shantinath", hi: "शान्तिनाथ", kn: "ಶಾಂತಿನಾಥ" },
    symbol: { en: "Deer", hi: "हिरण", kn: "ಜಿಂಕೆ", imagePath: "/symbols/deer.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Nandi Tree", hi: "नंदी वृक्ष", kn: "ನಂದಿ ಮರ" },
    birthPlace: { en: "Hastinapur", hi: "हस्तिनापुर", kn: "ಹಸ್ತಿನಾಪುರ" },
    mother: { en: "Achira Mata", hi: "अचिरा माता", kn: "ಅಚಿರಾ ಮಾತಾ" },
    father: { en: "Vishvasena Raja", hi: "विश्वसेन राजा", kn: "ವಿಶ್ವಸೇನ ರಾಜ" },
    lifespan: { en: "10 Lakh Purva", hi: "१० लाख पूर्व", kn: "೧೦ ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "40 Dhanush", hi: "४० धनुष", kn: "೪೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/shantinath.png"
    },

    {
    id: 17,
    name: { en: "Kunthunath", hi: "कुन्थुनाथ", kn: "ಕುಂತುನಾಥ" },
    symbol: { en: "Goat", hi: "बकरा", kn: "ಮೇಕೆ", imagePath: "/symbols/goat.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Nandi Tree", hi: "नंदी वृक्ष", kn: "ನಂದಿ ಮರ" },
    birthPlace: { en: "Hastinapur", hi: "हस्तिनापुर", kn: "ಹಸ್ತಿನಾಪುರ" },
    mother: { en: "Shri Mata", hi: "श्री माता", kn: "ಶ್ರೀ ಮಾತಾ" },
    father: { en: "Sura Raja", hi: "सूर राजा", kn: "ಸೂರ ರಾಜ" },
    lifespan: { en: "95 Thousand Purva", hi: "९५ हजार पूर्व", kn: "೯೫ ಸಾವಿರ ಪೂರ್ವ" },
    height: { en: "35 Dhanush", hi: "३५ धनुष", kn: "೩೫ ಧನುಷ್" },
    tirthankaraImage: "/arhats/kunthunath.png"
    },

    {
    id: 18,
    name: { en: "Aranath", hi: "अरनाथ", kn: "ಅರನಾಥ" },
    symbol: { en: "Fish (Nandavarta)", hi: "मछली (नन्दावर्त)", kn: "ಮೀನು (ನಂದಾವರ್ತ)", imagePath: "/symbols/fish.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Ashoka Tree", hi: "अशोक वृक्ष", kn: "ಅಶೋಕ ಮರ" },
    birthPlace: { en: "Hastinapur", hi: "हस्तिनापुर", kn: "ಹಸ್ತಿನಾಪುರ" },
    mother: { en: "Mitra Mata", hi: "मित्रा माता", kn: "ಮಿತ್ರಾ ಮಾತಾ" },
    father: { en: "Sudharma Raja", hi: "सुधर्मा राजा", kn: "ಸುಧರ್ಮ ರಾಜ" },
    lifespan: { en: "84 Thousand Purva", hi: "८४ हजार पूर्व", kn: "೮೪ ಸಾವಿರ ಪೂರ್ವ" },
    height: { en: "30 Dhanush", hi: "३० धनुष", kn: "೩೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/arnath.png"
    },

    {
    id: 19,
    name: { en: "Mallinath", hi: "मल्लिनाथ", kn: "ಮಲ್ಲಿನಾಥ" },
    symbol: { en: "Kalash (Water Pot)", hi: "कलश", kn: "ಕಲಶ", imagePath: "/symbols/kalash.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Ashoka Tree", hi: "अशोक वृक्ष", kn: "ಅಶೋಕ ಮರ" },
    birthPlace: { en: "Mithila", hi: "मिथिला", kn: "ಮಿಥಿಲಾ" },
    mother: { en: "Prabhavati Mata", hi: "प्रभावती माता", kn: "ಪ್ರಭಾವತಿ ಮಾತಾ" },
    father: { en: "Kumbha Raja", hi: "कुम्भ राजा", kn: "ಕುಂಭ ರಾಜ" },
    lifespan: { en: "56 Thousand Purva", hi: "५६ हजार पूर्व", kn: "೫೬ ಸಾವಿರ ಪೂರ್ವ" },
    height: { en: "25 Dhanush", hi: "२५ धनुष", kn: "೨೫ ಧನುಷ್" },
    tirthankaraImage: "/arhats/mallinath.png"
    },

    {
    
    id: 20,
    name: { en: "Munisuvratnath", hi: "मुनिसुव्रतनाथ", kn: "ಮುನಿಸುವ್ರತನಾಥ" },
    symbol: { en: "Tortoise", hi: "कछुआ", kn: "ಆಮೆ", imagePath: "/symbols/tortoise.png" },
    color: "Blue",
    colorHex: "#1E40AF",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Harivansha", hi: "हरिवंश", kn: "ಹರಿವಂಶ" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Champaka Tree", hi: "चम्पक वृक्ष", kn: "ಚಂಪಕ ಮರ" },
    birthPlace: { en: "Rajagriha", hi: "राजगृह", kn: "ರಾಜಗೃಹ" },
    mother: { en: "Padmavati Mata", hi: "पद्मावती माता", kn: "ಪದ್ಮಾವತಿ ಮಾತಾ" },
    father: { en: "Sumitra Raja", hi: "सुमित्र राजा", kn: "ಸುಮಿತ್ರ ರಾಜ" },
    lifespan: { en: "30 Thousand Purva", hi: "३० हजार पूर्व", kn: "೩೦ ಸಾವಿರ ಪೂರ್ವ" },
    height: { en: "20 Dhanush", hi: "२० धनुष", kn: "೨೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/munisuvrat.png"
    },

    {
    id: 21,
    name: { en: "Naminath", hi: "नमिनाथ", kn: "ನಮಿನಾಥ" },
    symbol: { en: "Blue Lotus", hi: "नील कमल", kn: "ನೀಲಿ ಕಮಲ", imagePath: "/symbols/blueLotus.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Bakula Tree", hi: "बकुल वृक्ष", kn: "ಬಕುಲ ಮರ" },
    birthPlace: { en: "Mithila", hi: "मिथिला", kn: "ಮಿಥಿಲಾ" },
    mother: { en: "Vipra Mata", hi: "विप्रा माता", kn: "ವಿಪ್ರಾ ಮಾತಾ" },
    father: { en: "Vijaya Raja", hi: "विजय राजा", kn: "ವಿಜಯ ರಾಜ" },
    lifespan: { en: "10 Thousand Purva", hi: "१० हजार पूर्व", kn: "೧೦ ಸಾವಿರ ಪೂರ್ವ" },
    height: { en: "15 Dhanush", hi: "१५ धनुष", kn: "೧೫ ಧನುಷ್" },
    tirthankaraImage: "/arhats/naminath.png"
    },

    {
    id: 22,
    name: { en: "Neminath", hi: "नेमिनाथ", kn: "ನೇಮಿನಾಥ" },
    symbol: { en: "Conch", hi: "शंख", kn: "ಶಂಖ", imagePath: "/symbols/conch.png" },
    color: "Blue",
    colorHex: "#1E40AF",
    placeOfNirvana: { en: "Girnar Ji", hi: "गिरनार जी", kn: "ಗಿರಿನಾರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Harivansha", hi: "हरिवंश", kn: "ಹರಿವಂಶ" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Vetasa Tree", hi: "वेतस वृक्ष", kn: "ವೇತಸ ಮರ" },
    birthPlace: { en: "Sauripura", hi: "सौरिपुर", kn: "ಸೌರಿಪುರ" },
    mother: { en: "Shivadevi Mata", hi: "शिवादेवी माता", kn: "ಶಿವಾದೇವಿ ಮಾತಾ" },
    father: { en: "Samudravijaya Raja", hi: "समुद्रविजय राजा", kn: "ಸಮುದ್ರವಿಜಯ ರಾಜ" },
    lifespan: { en: "1000 Years", hi: "१००० वर्ष", kn: "೧೦೦೦ ವರ್ಷ" },
    height: { en: "10 Dhanush", hi: "१० धनुष", kn: "೧೦ ಧನುಷ್" },
    tirthankaraImage: "/arhats/neminath.png"
    },

    {
    id: 23,
    name: { en: "Parshvanath", hi: "पार्श्वनाथ", kn: "ಪಾರ್ಶ್ವನಾಥ" },
    symbol: { en: "Snake", hi: "सर्प", kn: "ಸರ್ಪ", imagePath: "/symbols/snake.png" },
    color: "Green",
    colorHex: "#16A34A",
    placeOfNirvana: { en: "Sammed Shikhar Ji", hi: "सम्मेद शिखर जी जी", kn: "ಸಮ್ಮೇದ ಶಿಖರ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Ikshvaku", hi: "इक्ष्वाकु", kn: "ಇಕ್ಷ್ವಾಕು" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Dhataki Tree", hi: "धातकी वृक्ष", kn: "ಧಾತಕಿ ಮರ" },
    birthPlace: { en: "Varanasi", hi: "वाराणसी", kn: "ವಾರಾಣಸಿ" },
    mother: { en: "Vama Mata", hi: "वामा माता", kn: "ವಾಮಾ ಮಾತಾ" },
    father: { en: "Ashvasena Raja", hi: "अश्वसेन राजा", kn: "ಅಶ್ವಸೇನ ರಾಜ" },
    lifespan: { en: "100 Years", hi: "१०० वर्ष", kn: "೧೦೦ ವರ್ಷ" },
    height: { en: "9 Hands", hi: "९ हाथ", kn: "೯ ಹಸ್ತ" },
    tirthankaraImage: "/arhats/parshvanath.png"
    },

    {
    id: 24,
    name: { en: "Mahavira", hi: "महावीर", kn: "ಮಹಾವೀರ" },
    symbol: { en: "Lion", hi: "सिंह", kn: "ಸಿಂಹ", imagePath: "/symbols/lion.png" },
    color: "Golden",
    colorHex: "#EAB308",
    placeOfNirvana: { en: "Pawapuri", hi: "पावापुरी", kn: "ಪಾವಾಪುರಿ" },
    caste: { en: "Kshatriya", hi: "क्षत्रिय", kn: "ಕ್ಷತ್ರಿಯ" },
    dynasty: { en: "Jnatrika", hi: "ज्ञात्रिक", kn: "ಜ್ಞಾತ್ರಿಕ" },
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಾಶ್ಯಪ" },
    kevalaVriksha: { en: "Sala Tree", hi: "साल वृक्ष", kn: "ಸಾಲ ಮರ" },
    birthPlace: { en: "Kundagrama", hi: "कुंडग्राम", kn: "ಕುಂಡಗ್ರಾಮ" },
    mother: { en: "Trishala Mata", hi: "त्रिशला माता", kn: "ತ್ರಿಶಲಾ ಮಾತಾ" },
    father: { en: "Siddhartha Raja", hi: "सिद्धार्थ राजा", kn: "ಸಿದ್ಧಾರ್ಥ ರಾಜ" },
    lifespan: { en: "72 Years", hi: "७२ वर्ष", kn: "೭೨ ವರ್ಷ" },
    height: { en: "7 Hands", hi: "७ हाथ", kn: "೭ ಹಸ್ತ" },
    tirthankaraImage: "/arhats/mahavira.png"
    }
];