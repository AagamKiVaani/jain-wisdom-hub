// src/lib/tirthankara-data.ts

export type LocalizedText = { en: string; hi: string; kn: string };

export type KalyanakEvent = {
  tithi: LocalizedText;
  location?: LocalizedText; // Not needed for Garbha usually
  nakshatra?: LocalizedText;       // Specific for Garbha/Janma
  description: LocalizedText;
  images: string[];         // Array of paths e.g. ["/kalyanaks/1/garbha1.jpg"]
  extraInfo?: LocalizedText; // For "16 dreams", "Vairagya reason", "Penance duration"
};

export type Tirthankara = {
  id: number;
  name: LocalizedText;
  symbol: { en: string; hi: string; kn: string; imagePath: string };
  color: string;
  placeOfNirvana: LocalizedText;
  colorHex: string;

  // --- Extended Details ---
  caste: LocalizedText;
  dynasty: LocalizedText;
  gotra: LocalizedText;
  kevalaVriksha: LocalizedText;
  birthPlace: LocalizedText;
  mother: LocalizedText;
  father: LocalizedText;
  lifespan: LocalizedText;
  height: LocalizedText;
  tirthankaraImage: string;

  // --- NEW: KALYANAKS DATA ---
  kalyanaks: {
    garbha: KalyanakEvent;
    janma: KalyanakEvent;
    diksha: KalyanakEvent;
    kevalgyan: KalyanakEvent;
    moksha: KalyanakEvent;
  };
};

// Helper for default placeholder data to keep code clean for 2-24
const defaultKalyanaks = {
  garbha: {
    tithi: { en: "Data to be added", hi: "विवरण जोड़ा जाएगा", kn: "ವಿವರಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು" },
    nakshatra: { en: "Data to be added", hi: "विवरण जोड़ा जाएगा", kn: "ವಿವರಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು" },
    description: { en: "Descent from heaven.", hi: "स्वर्ग से अवतरण।", kn: "ಸ್ವರ್ಗದಿಂದ ಅವತರಣ." },
    images: [],
    extraInfo: { en: "16 Auspicious Dreams", hi: "16 शुभ स्वप्न", kn: "16 ಶುಭ ಕನಸುಗಳು" }
  },
  janma: {
    tithi: { en: "Data to be added", hi: "विवरण जोड़ा जाएगा", kn: "ವಿವರಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು" },
    location: { en: "Birthplace", hi: "जन्मस्थान", kn: "ಜನ್ಮಸ್ಥಳ" },
    description: { en: "Birth and Indra's celebration.", hi: "जन्म और इंद्र का उत्सव।", kn: "ಜನ್ಮ ಮತ್ತು ಇಂದ್ರನ ಆಚರಣೆ." },
    images: []
  },
  diksha: {
    tithi: { en: "Data to be added", hi: "विवरण जोड़ा जाएगा", kn: "ವಿವರಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು" },
    location: { en: "City Garden", hi: "उद्यान", kn: "ಉದ್ಯಾನ" },
    description: { en: "Renunciation of the world.", hi: "संसार का त्याग।", kn: "ಸಂಸಾರ ತ್ಯಾಗ." },
    images: [],
    extraInfo: { en: "Reason for Vairagya", hi: "वैराग्य का कारण", kn: "ವೈರಾಗ್ಯದ ಕಾರಣ" }
  },
  kevalgyan: {
    tithi: { en: "Data to be added", hi: "विवरण जोड़ा जाएगा", kn: "ವಿವರಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು" },
    location: { en: "Under Tree", hi: "वृक्ष के नीचे", kn: "ಮರದ ಕೆಳಗೆ" },
    description: { en: "Attainment of Omniscience.", hi: "केवलज्ञान की प्राप्ति।", kn: "ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿ." },
    images: [],
    extraInfo: { en: "Duration of Penance", hi: "तपस्या की अवधि", kn: "ತಪಸ್ಸಿನ ಅವಧಿ" }
  },
  moksha: {
    tithi: { en: "Data to be added", hi: "विवरण जोड़ा जाएगा", kn: "ವಿವರಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು" },
    location: { en: "Nirvana Place", hi: "निर्वाण क्षेत्र", kn: "ನಿರ್ವಾಣ ಕ್ಷೇತ್ರ" },
    description: { en: "Final Liberation.", hi: "मोक्ष प्राप्ति।", kn: "ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿ." },
    images: []
  }
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
    gotra: { en: "Kashyap", hi: "कश्यप", kn: "ಕಶ್ಯಪ" },
    kevalaVriksha: { en: "Banyan Tree", hi: "वट वृक्ष", kn: "ಆಲದ ಮರ" },
    birthPlace: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
    mother: { en: "Marudevi", hi: "मरुदेवी", kn: "ಮರುದೇವಿ" },
    father: { en: "Nabhiraay", hi: "नाभिराय", kn: "ನಾಭಿರಾಯ" },
    lifespan: { en: "84 Lakh Purva", hi: "84 लाख पूर्व", kn: "84 ಲಕ್ಷ ಪೂರ್ವ" },
    height: { en: "500 Dhanush", hi: "500 धनुष", kn: "500 ಧನುಷ್" },
    tirthankaraImage: "/arhats/adinath.png",
    
    // --- ADINATH SPECIFIC DATA ---
    kalyanaks: {
      garbha: {
        tithi: { en: "Ashadh Krishna Dwitiya", hi: "आषाढ़ कृष्ण द्वितीया", kn: "ಆಷಾಢ ಕೃಷ್ಣ ದ್ವಿತೀಯಾ" },
        nakshatra: { en: "Uttarashada", hi: "उत्तरााषाढ़ा", kn: "ಉತ್ತರಾಷಾಢಾ" },
        description: { 
          en: "Six months prior to Bhagwan Ṛiṣabhdev’s descent from the Sarvārth Siddhi Vimaan, by the command of Indra, Kuber begins Ratna Vṛṣṭi (jewel-rain) in the city of Ayodhya. Divine jewels started raining from the sky, and the atmosphere of happiness, peace, and auspiciousness spread throughout the city. This Ratna Vṛṣṭi is considered the first sign of a Tīrthaṅkar’s Garbha Avataraṇ.\n\nDuring this six-month period, 56 Dikkumārī Devis (Aṣṭa-kumārīkā) arrived in Ayodhya and were appointed to serve Mata Marudevi. These Devis constantly engaged in divine conversations to keep the mother joyful, entertained her, and prepared her physically and spiritually to hold the supreme soul. They remained continuously present as her companions and attendants.\n\nOn the day of Āṣāḍh Krishna Dvitīyā, the soul of Bhagwan Ṛiṣabhdev descended from Sarvārth Siddhi and entered the womb of Mata Marudevi. This moment is known as Garbha Avataraṇ and is the principal moment of the Garbha Kalyāṇak.\n\nImmediately after the garbha pravesh, Mata Marudevi saw sixteen auspicious dreams —\nLion, Elephant, Bull, Goddess Lakshmi, Garland, Moon, Sun, Flag, Kalash, Lake, Ocean of Milk, Celestial Aircraft, Heap of Jewels, Fire, Pair of Fish, and Throne.\n\nThrough his Avadhi Gyaan, Indra came to know about the Garbha Avataraṇ of the Tīrthaṅkar. He arrived in Ayodhya along with Indrāṇī, circumambulated the city and the royal palace, and bowed to King Nābhirāy and Mata Marudevi. A grand celebration was held by the celestial beings, and with this, the Garbha Kalyāṇak concluded.", 
          hi: "भगवान ऋषभदेव के सर्वार्थ सिद्धि विमान से च्यवन से 6 महीने पूर्व, कुबेर इन्द्र की आज्ञा से अयोध्या नगरी में रत्नवृष्टि प्रारंभ करता है। आकाश से दिव्य रत्नों की वर्षा होने लगती है और नगर में सुख, शांति एवं मंगल का वातावरण छा जाता है। यह रत्नवृष्टि तीर्थंकर के गर्भ अवतरण का प्रथम संकेत होती है।\n\nइसी 6 महीने की अवधि में, 56 दिक्कुमारी देवियाँ (अष्ट-कुमारिका) अयोध्या आकर माता मरुदेवी की सेवा में नियुक्त होती हैं। वे देवियाँ माता को सदा प्रसन्न रखने हेतु दिव्य संवाद करती रहती हैं, उनका मनोरंजन करती हैं तथा शारीरिक एवं आत्मिक रूप से उन्हें श्रेष्ठ आत्मा को धारण करने के लिए तैयार करती हैं। वे माता की सहचरी एवं सेविका के रूप में निरंतर उपस्थित रहती हैं।\n\nआषाढ़ कृष्ण द्वितीया के दिन, भगवान ऋषभदेव का जीव सर्वार्थ सिद्धि से चयकर माता मरुदेवी के गर्भ में प्रवेश करता है। इसी क्षण को गर्भ अवतरण कहा जाता है और यही गर्भ कल्याणक का मूल क्षण होता है।\n\nगर्भ प्रवेश के तुरंत बाद, माता मरुदेवी ने सोलह मंगलकारी स्वप्न देखे —\nसिंह, गज, वृषभ, लक्ष्मी, माला, चंद्र, सूर्य, ध्वज, कलश, सरोवर, क्षीर सागर, विमान, रत्न राशि, अग्नि, युगल मत्स्य और सिंहासन।\n\nइन्द्र ने अपने अवधि ज्ञान से तीर्थंकर के गर्भ अवतरण को जाना। वे इन्द्राणी के साथ अयोध्या नगरी आए, नगर और राजमहल की परिक्रमा की तथा राजा नाभिराय एवं माता मरुदेवी को नमन किया। देवों द्वारा भव्य उत्सव मनाया गया और इसी के साथ गर्भ कल्याणक का समापन हुआ।", 
          kn: "ಭಗವಾನ್ ಋಷಭದೇವರ ಜೀವವು ಸರ್ವಾರ್ಥ ಸಿದ್ಧಿ ವಿಮಾನದಿಂದ ಚ್ಯವನವಾಗುವ (ಕೆಳಗಿಳಿಯುವ) ೬ ತಿಂಗಳ ಮೊದಲು, ಕುಬೇರನು ಇಂದ್ರನ ಆಜ್ಞೆಯಂತೆ ಅಯೋಧ್ಯೆ ನಗರದಲ್ಲಿ ರತ್ನವೃಷ್ಟಿಯನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತಾನೆ. ಆಕಾಶದಿಂದ ದಿವ್ಯ ರತ್ನಗಳ ಮಳೆಯಾಗಲಾರಂಭಿಸುತ್ತದೆ ಮತ್ತು ನಗರದಲ್ಲಿ ಸುಖ, ಶಾಂತಿ ಹಾಗೂ ಮಂಗಳಕರ ವಾತಾವರಣವು ಆವರಿಸುತ್ತದೆ. ಈ ರತ್ನವೃಷ್ಟಿಯು ತೀರ್ಥಂಕರರ ಗರ್ಭ ಅವತರಣದ ಪ್ರಥಮ ಸಂಕೇತವಾಗಿರುತ್ತದೆ.\n\nಇದೇ 6 ತಿಂಗಳ ಅವಧಿಯಲ್ಲಿ, 56 ದಿಕ್ಕುಮಾರಿ ದೇವಿಯರು (ಅಷ್ಟ-ಕುಮಾರಿಕೆಯರು) ಅಯೋಧ್ಯೆಗೆ ಬಂದು ಮಾತೆ ಮರುದೇವಿಯ ಸೇವೆಯಲ್ಲಿ ನಿಯೋಜಿತರಾಗುತ್ತಾರೆ. ಆ ದೇವಿಯರು ತಾಯಿಯನ್ನು ಸದಾ ಪ್ರಸನ್ನವಾಗಿಡಲು ದಿವ್ಯ ಸಂವಾದಗಳನ್ನು ನಡೆಸುತ್ತಾರೆ, ಅವರ ಮನೋರ೦ಜನೆ ಮಾಡುತ್ತಾರೆ ಹಾಗೂ ಶಾರೀರಿಕ ಮತ್ತು ಆತ್ಮಿಕವಾಗಿ ಅವರನ್ನು ಶ್ರೇಷ್ಠ ಆತ್ಮವನ್ನು ಧರಿಸಲು ಸಿದ್ಧಗೊಳಿಸುತ್ತಾರೆ. ಅವರು ತಾಯಿಯ ಸಹಚರಿಯರಾಗಿ ಮತ್ತು ಸೇವಕಿಯರಾಗಿ ನಿರಂತರವಾಗಿ ಉಪಸ್ಥಿತರಿರುತ್ತಾರೆ.\n\nಆಷಾಢ ಕೃಷ್ಣ ದ್ವಿತೀಯೆಯ ದಿನ, ಭಗವಾನ್ ಋಷಭದೇವರ ಜೀವವು ಸರ್ವಾರ್ಥ ಸಿದ್ಧಿಯಿಂದ ಚ್ಯವನವಾಗಿ ಮಾತೆ ಮರುದೇವಿಯ ಗರ್ಭದಲ್ಲಿ ಪ್ರವೇಶಿಸುತ್ತದೆ. ಈ ಕ್ಷಣವನ್ನು ಗರ್ಭ ಅವತರಣ ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ಇದೇ ಗರ್ಭ ಕಲ್ಯಾಣಕದ ಮೂಲ ಕ್ಷಣವಾಗಿರುತ್ತದೆ.\n\nಗರ್ಭ ಪ್ರವೇಶದ ತಕ್ಷಣ, ಮಾತಾ ಮರುದೇವಿಯವರು ಹದಿನಾರು ಮಂಗಳಕರ ಸ್ವಪ್ನಗಳನ್ನು ಕಂಡರು —\nಸಿಂಹ, ಆನೆ, ವೃಷಭ, ಲಕ್ಷ್ಮೀ, ಮಾಲೆ, ಚಂದ್ರ, ಸೂರ್ಯ, ಧ್ವಜ, ಕಲಶ, ಸರೋವರ, ಕ್ಷೀರ ಸಾಗರ, ವಿಮಾನ, ರತ್ನ ರಾಶಿ, ಅಗ್ನಿ, ಯುಗಲ ಮತ್ಸ್ಯ ಮತ್ತು ಸಿಂಹಾಸನ.\n\nಇಂದ್ರರು ತಮ್ಮ ಅವಧಿ ಜ್ಞಾನದಿಂದ ತೀರ್ಥಂಕರರ ಗರ್ಭ ಅವತರಣವನ್ನು ತಿಳಿದರು. ಅವರು ಇಂದ್ರಾಣಿಯೊಂದಿಗೆ ಅಯೋಧ್ಯಾ ನಗರಕ್ಕೆ ಆಗಮಿಸಿ, ನಗರ ಹಾಗೂ ರಾಜಮಹಲದ ಪರಿಕ್ರಮೆ ಮಾಡಿ, ರಾಜ ನಾಭಿರಾಯ ಹಾಗೂ ಮಾತಾ ಮರುದೇವಿಗೆ ನಮಸ್ಕಾರ ಸಲ್ಲಿಸಿದರು. ದೇವತೆಗಳಿಂದ ಭವ್ಯ ಉತ್ಸವ ಆಚರಿಸಲಾಯಿತು ಮತ್ತು ಇದರೊಂದಿಗೆ ಗರ್ಭ ಕಲ್ಯಾಣಕ ಸಂಪನ್ನವಾಯಿತು." 
        },
        extraInfo: { 
          en: "Dreams: Elephant, Bull, Lion, Laxmi, Garland, Moon, Sun, Flag, Kalash, Lotus Lake, Ocean, Plane, Heap of Jewels, Smokeless Fire.", 
          hi: "स्वप्न: हाथी, बैल, शेर, लक्ष्मी, माला, चंद्रमा, सूर्य, ध्वजा, कलश, पद्म सरोवर, सागर, विमान, रत्नों का ढेर, निर्धूम अग्नि।", 
          kn: "ಕನಸುಗಳು: ಆನೆ, ಗೂಳಿ, ಸಿಂಹ, ಲಕ್ಷ್ಮಿ, ಹಾರ, ಚಂದ್ರ, ಸೂರ್ಯ, ಧ್ವಜ, ಕಲಶ, ಪದ್ಮ ಸರೋವರ, ಸಮುದ್ರ, ವಿಮಾನ, ರತ್ನ ರಾಶಿ, ನಿರ್ಧೂಮ ಅಗ್ನಿ." 
        },
        images: ["/images/kalyanak/Adinath/garbha/1.jpeg", "/images/kalyanak/Adinath/garbha/2.jpeg", "/images/kalyanak/Adinath/garbha/3.jpeg", "/images/kalyanak/Adinath/garbha/4.png", "/images/kalyanak/Adinath/garbha/5.jpeg"] 
      },
      janma: {
        tithi: { en: "Chaitra Krishna Navami", hi: "चैत्र कृष्ण नवमी", kn: "ಚೈತ್ರ ಕೃಷ್ಣ ನವಮಿ" },
        location: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ" },
        description: { 
          en: "On Chaitra Krishna Navami, in the city of Ayodhya, Māta Marudevī gave birth to Bhagwān Ṛiṣabhdev, the first Tīrthaṅkar of this avasarpiṇī. At the exact moment of His birth, a profound divine effect spread across the three worlds. For a brief moment, suffering in the lower realms became inactive, and peace, light, and auspiciousness prevailed throughout the cosmos.\n\nImmediately after the divine birth, the deities of the four Nikāyas arrived to celebrate. Bhavanvāsī Devas sounded conch shells, Vyantara Devas beat divine drums, Jyotiṣka Devas produced lion-like roars, and Kalpavāsī Devas rang celestial bells. These spontaneous sounds announced the birth of the first Tīrthaṅkar to all realms.\n\nIn Saudharma heaven, the throne of Saudharma Indra shook violently. Using his Avadhi Jñāna, Indra realized that the first Tīrthaṅkar had been born. Filled with devotion, he immediately set out for Ayodhya with his divine retinue, accompanied by Indrāṇī Śacī, riding the celestial elephant Airāvata.\n\nIndra sent Indrāṇī into the delivery chamber. She gently placed Māta Marudevī into a deep blissful sleep known as Avasvapnī Nidra. Creating a divine illusory child, she placed it beside the mother and respectfully carried the actual Tīrthaṅkar infant out to Indra.\n\nSeeing the divine child, Saudharma Indra was overwhelmed with devotion and manifested one thousand eyes, realizing two eyes were insufficient to behold the Lord’s beauty. Seating the infant on his lap, Indra led a grand procession on Airāvata towards Mount Meru, accompanied by countless deities.\n\nAt the summit of Mount Meru, the procession reached Pāṇḍuk Vana, where the crescent-shaped Pāṇḍuk Śilā was prepared. The Lord was seated upon it, and the Devas performed Janmābhiṣek using 1008 golden pitchers filled with water from the Kṣīr Sāgar, while Indra led the ritual with deep devotion.\n\nAfter the Abhiṣek, the Lord was adorned with divine garments and celestial ornaments. Observing the signs of greatness and recalling Māta Marudevī’s dream of the bull, Indra named the child Ṛiṣabhdev. Recognizing Him as the first of all Tīrthaṅkars, Indra also hailed Him as Ādināth.\n\nThe procession returned to Ayodhya. Indrāṇī replaced the illusory child with the real infant beside Māta Marudevī, who awoke unaware of the divine journey. Overwhelmed with joy, Saudharma Indra performed the celebrated Ānanda Tāṇḍava in the royal court. Thus, the Janma Kalyāṇak concluded in supreme divine celebration.", 
          hi: "चैत्र कृष्ण नवमी के दिन, अयोध्या नगरी में माता मरुदेवी ने भगवान ऋषभदेव को जन्म दिया। उनके जन्म के उसी क्षण तीनों लोकों में दिव्य प्रभाव प्रकट हुआ। क्षणभर के लिए अधोलोकों का दुःख उपशांत हो गया और सम्पूर्ण ब्रह्मांड में शांति, प्रकाश और मंगल का वातावरण छा गया।\n\nजन्म के तुरंत बाद चारों निकायों के देवगण अयोध्या पहुँचे। भवनवासी देवों ने शंखनाद किया, व्यंतर देवों ने भेरी बजाई, ज्योतिष्क देवों ने सिंहनाद किया और कल्पवासी देवों ने दिव्य घंटानाद किया। इन स्वयंस्फूर्त नादों ने प्रथम तीर्थंकर के जन्म की घोषणा की।\n\nसौधर्म स्वर्ग में सौधर्म इन्द्र का सिंहासन कंपित हो उठा। अवधिज्ञान से उन्होंने जान लिया कि प्रथम तीर्थंकर का जन्म हो चुका है। भक्तिभाव से परिपूर्ण होकर वे इन्द्राणी शची सहित अपने देवपरिवार के साथ ऐरावत हाथी पर सवार होकर अयोध्या के लिए प्रस्थान कर गए।\n\nइन्द्र ने इन्द्राणी को प्रसूति गृह में भेजा। उन्होंने माता मरुदेवी को अवस्वप्नि निद्रा में सुलाया। एक माया शिशु की रचना कर उसे माता के पास रखा और वास्तविक तीर्थंकर शिशु को आदरपूर्वक बाहर इन्द्र के पास ले आईं।\n\nदिव्य बालक को देखकर सौधर्म इन्द्र भावविभोर हो गए और उन्होंने सहस्र नेत्र धारण किए। बालक को अपनी गोद में बैठाकर, ऐरावत पर आरूढ़ होकर वे देवसमूह के साथ मेरु पर्वत की ओर प्रस्थान कर गए।\n\nमेरु पर्वत की चोटी पर पाण्डुक वन स्थित पाण्डुक शिला पर भगवान को विराजमान किया गया। क्षीर सागर के जल से भरे 1008 स्वर्ण कलशों द्वारा देवों ने जन्माभिषेक किया, जिसमें इन्द्र ने प्रमुख भूमिका निभाई।\n\nअभिषेक के पश्चात भगवान को दिव्य वस्त्र और आभूषण धारण कराए गए। माता के स्वप्न और दिव्य लक्षणों को देखकर इन्द्र ने बालक का नाम ऋषभदेव रखा और उन्हें प्रथम तीर्थंकर मानते हुए आदिनाथ के रूप में स्तुति की।\n\nशोभायात्रा अयोध्या लौटी। इन्द्राणी ने माया शिशु हटाकर वास्तविक बालक को माता के पास रख दिया। माता अज्ञान अवस्था में जागीं। अपार आनंद में सौधर्म इन्द्र ने राजदरबार में आनंद तांडव किया। इस प्रकार जन्म कल्याणक का भव्य समापन हुआ।", 
          kn: "ಚೈತ್ರ ಕೃಷ್ಣ ನವಮಿ ದಿನ, ಅಯೋಧ್ಯಾ ನಗರದಲ್ಲಿ ಮಾತಾ ಮರುದೇವಿ ಭಗವಾನ್ ಋಷಭದೇವರಿಗೆ ಜನ್ಮ ನೀಡಿದರು. ಅವರ ಜನನ ಕ್ಷಣದಲ್ಲಿ ತ್ರಿಲೋಕಗಳಲ್ಲೂ ದಿವ್ಯ ಪ್ರಭಾವ ವಿಸ್ತರಿಸಿತು. ಕ್ಷಣಕಾಲ ಅಧೋಲೋಕಗಳ ದುಃಖ ಶಮನಗೊಂಡು, ಸಮಸ್ತ ಬ್ರಹ್ಮಾಂಡದಲ್ಲಿ ಶಾಂತಿ, ಪ್ರಕಾಶ ಮತ್ತು ಮಂಗಳತೆ ವ್ಯಾಪಿಸಿತು.\n\nಜನನದ ತಕ್ಷಣವೇ ನಾಲ್ಕು ನಿಕಾಯದ ದೇವತೆಗಳು ಆಗಮಿಸಿದರು. ಭವನವಾಸಿ ದೇವರುಗಳು ಶಂಖನಾದ ಮಾಡಿದರು, ವ್ಯಂತರ ದೇವರುಗಳು ಭೇರಿ ನಾದವನ್ನು ಮೂಡಿಸಿದರು, ಜ್ಯೋತಿಷ್ಕ ದೇವರುಗಳು ಸಿಂಹನಾದ ನಡೆಸಿದರು ಮತ್ತು ಕಲ್ಪವಾಸಿ ದೇವರುಗಳು ದಿವ್ಯ ಘಂಟಾನಾದ ಮಾಡಿದರು. ಈ ನಾದಗಳು ಪ್ರಥಮ ತೀರ್ಥಂಕರರ ಜನನವನ್ನು ಪ್ರಕಟಿಸಿತು.\n\nಸೌಧರ್ಮ ಸ್ವರ್ಗದಲ್ಲಿ ಸೌಧರ್ಮ ಇಂದ್ರನ ಸಿಂಹಾಸನ ಕಂಪಿತವಾಯಿತು. ತನ್ನ ಅವಧಿಜ್ಞಾನದಿಂದ ಪ್ರಥಮ ತೀರ್ಥಂಕರರ ಜನನವನ್ನು ಅವರು ಅರಿತುಕೊಂಡರು. ಭಕ್ತಿಭಾವದಿಂದ ತುಂಬಿದ ಇಂದ್ರನು ಇಂದ್ರಾಣಿ ಶಚಿ ಹಾಗೂ ದೇವಪರಿವಾರದೊಂದಿಗೆ ಐರಾವತ ಗಜದ ಮೇಲೆ ಆರೂಢನಾಗಿ ಅಯೋಧ್ಯೆಗೆ ಹೊರಟರು.\n\nಇಂದ್ರನು ಇಂದ್ರಾಣಿಯನ್ನು ಪ್ರಸೂತಿ ಗೃಹಕ್ಕೆ ಕಳುಹಿಸಿದರು. ಅವರು ಮಾತಾ ಮರುದೇವಿಯನ್ನು ಅವಸ್ವಪ್ನಿ ನಿದ್ರೆಗೆ ಒಳಪಡಿಸಿದರು. ಒಂದು ಮಾಯಾ ಶಿಶುವನ್ನು ನಿರ್ಮಿಸಿ ತಾಯಿಯ ಬಳಿಯಲ್ಲಿ ಇಟ್ಟು, ನಿಜವಾದ ತೀರ್ಥಂಕರ ಶಿಶುವನ್ನು ಗೌರವದಿಂದ ಇಂದ್ರನ ಬಳಿ ತಂದರು.\n\nದಿವ್ಯ ಶಿಶುವನ್ನು ಕಂಡ ಸೌಧರ್ಮ ಇಂದ್ರನು ಭಕ್ತಿಭಾವದಿಂದ ಮಂತ್ರಮುಗ್ಧನಾಗಿ ಸಹಸ್ರ ನೇತ್ರಗಳನ್ನು ಧರಿಸಿದರು. ಶಿಶುವನ್ನು ಮಡಿಲಲ್ಲಿ ಇಟ್ಟುಕೊಂಡು, ಐರಾವತದ ಮೇಲೆ ಆರೂಢನಾಗಿ ದೇವಗಣಗಳೊಂದಿಗೆ ಮೇರು ಪರ್ವತದತ್ತ ಹೊರಟರು.\n\nಮೇರು ಪರ್ವತದ ಶಿಖರದಲ್ಲಿರುವ ಪಾಂಡುಕ ವನದ ಪಾಂಡುಕ ಶಿಲೆಯ ಮೇಲೆ ಭಗವಂತರನ್ನು ವಿರಾಜಮಾನಗೊಳಿಸಲಾಯಿತು. ಕ್ಷೀರ ಸಾಗರದ ಜಲದಿಂದ ತುಂಬಿದ 1008 ಸ್ವರ್ಣ ಕಲಶಗಳಿಂದ ದೇವರುಗಳು ಜನ್ಮಾಭಿಷೇಕ ನೆರವೇರಿಸಿದರು; ಇಂದ್ರನು ಭಕ್ತಿಯಿಂದ ಮುನ್ನಡೆಸಿದರು.\n\nಅಭಿಷೇಕದ ನಂತರ ಭಗವಂತರಿಗೆ ದಿವ್ಯ ವಸ್ತ್ರಗಳು ಮತ್ತು ಆಭರಣಗಳು ಅಲಂಕರಿಸಲಾಯಿತು. ಮಾತೆಯ ಸ್ವಪ್ನ ಹಾಗೂ ದಿವ್ಯ ಲಕ್ಷಣಗಳನ್ನು ನೋಡಿ ಇಂದ್ರನು ಶಿಶುವಿಗೆ ಋಷಭದೇವ ಎಂಬ ನಾಮಕರಣ ಮಾಡಿದರು ಮತ್ತು ಅವರನ್ನು ಪ್ರಥಮ ತೀರ್ಥಂಕರವಾಗಿ ಆದಿನಾಥ ಎಂದು ಗೌರವಿಸಿದರು.\n\nಶೋಭಾಯಾತ್ರೆ ಅಯೋಧ್ಯೆಗೆ ಮರಳಿತು. ಇಂದ್ರಾಣಿ ಮಾಯಾ ಶಿಶುವನ್ನು ತೆಗೆದು ನಿಜವಾದ ಶಿಶುವನ್ನು ಮಾತೆಯ ಬಳಿಯಲ್ಲಿ ಇಟ್ಟರು. ಮಾತಾ ಮರುದೇವಿ ಅಜ್ಞಾತವಾಗಿ ಎದ್ದರು. ಅಪಾರ ಆನಂದದಲ್ಲಿ ಸೌಧರ್ಮ ಇಂದ್ರನು ರಾಜಸಭೆಯಲ್ಲಿ ಆನಂದ ತಾಂಡವ ನೆರವೇರಿಸಿದರು. ಈ ಮೂಲಕ ಜನ್ಮ ಕಲ್ಯಾಣಕ ಸಂಪೂರ್ಣವಾಯಿತು." 
        },
        images: ["/images/kalyanak/Adinath/janma/1.jpeg", "/images/kalyanak/Adinath/janma/2.jpeg", "/images/kalyanak/Adinath/janma/3.jpeg", "/images/kalyanak/Adinath/janma/4.jpeg", "/images/kalyanak/Adinath/janma/5.jpeg", "/images/kalyanak/Adinath/janma/6.jpeg", "/images/kalyanak/Adinath/janma/7.jpeg", "/images/kalyanak/Adinath/janma/8.jpeg"]
      },
      diksha: {
        tithi: { en: "Chaitra Krishna Navami", hi: "चैत्र कृष्ण नवमी", kn: "ಚೈತ್ರ ಕೃಷ್ಣ ನವಮಿ" },
        location: { en: "Siddhartha Vana (Ayodhya)", hi: "सिद्धार्थ वन (अयोध्या)", kn: "ಸಿದ್ಧಾರ್ಥ ವನ (ಅಯೋಧ್ಯೆ)" },
        description: { 
          en: "Bhagwan Ādināth ruled Ayodhyā for an immeasurably long time, establishing civilization, social order, and righteous governance. When the destined moment for renunciation arrived, Saudharma Indra perceived that the Lord’s inner detachment was ready to manifest.\n\nTo awaken this latent vairāgya for the benefit of the world, Indra arranged a grand celestial assembly in the royal court. The most beautiful apsarā, Nīlāñjanā, was invited to perform a divine dance.\nWhile dancing, Nīlāñjanā’s āyu karma suddenly exhausted. In a single moment, she collapsed and died. To maintain continuity for the unaware audience, Indra instantly replaced her with another identical celestial dancer, and the performance continued seamlessly.\n\nAll present remained oblivious — except Bhagwan Ādināth. With his extraordinary perception, he directly witnessed Nīlāñjanā’s death. Reflecting deeply, he realized:“If even a celestial being’s life vanishes like a bubble of water, what permanence exists in this worldly existence?”\n\nThe moment Bhagwan Ādināth resolved to renounce the world, the Laukāntika Devas — celestial beings dwelling at the edge of Brahmaloka and destined for liberation — descended from the heavens.\nThey bowed with profound devotion and prayed: “O Lord, please accept Diksha and establish the Tīrtha for the salvation of countless souls.”\n\nBhagwan Ādināth summoned his sons and formally relinquished all worldly authority.\nBharata, his eldest son, was crowned King of Ayodhyā and destined to become the first Chakravartī.\nBāhubali, his second son, was given the kingdom of Podanpur.\nThe remaining territories were distributed among his other sons.\nHaving fulfilled all worldly responsibilities, the Lord prepared for complete renunciation.\n\nSaudharma Indra created a magnificent divine palanquin named Sudarśanā. Bhagwan Ādināth ascended the palanquin. First, it was carried by great kings, then by Vidyādharas, and finally by the Devas themselves.\nThe grand procession moved from Ayodhyā to Siddhārtha Vana, a sacred garden near Prayāg.\n\nOn Chaitra Krishna Navamī — the same auspicious tithi as his birth — Bhagwan Ādināth descended from the palanquin beneath a Banyan tree (Vata Vṛkṣa). Standing facing the east (or north-east), he removed all royal ornaments, garlands, and garments, abandoning every possession. He accepted Digambara Diksha, becoming a sky-clad muni. With supreme reverence, he uttered: “Om Namah Siddhebhyaḥ” — marking the first invocation of this sacred salutation in the present time cycle.\n\nBhagwan Ādināth plucked out his hair with his own hands in five fistfuls (Pañcha Muṣṭi Lonch).\nSaudharma Indra respectfully received the hair in a jewel-studded vessel and immersed it in the Kṣīra Sāgara (Ocean of Milk), preserving it as an object of divine veneration.\nAt the very moment of Diksha, Manah Paryāya Jñāna (the ability to perceive others’ thoughts) manifested in his soul.\n\nMoved by their King’s renunciation, 4000 subordinate kings also accepted Diksha alongside Bhagwan Ādināth.\nHowever, these kings had not fully conquered their internal passions. Later, when the Lord entered prolonged silent meditation without movement or food, they were unable to sustain the severe austerities. Breaking their vows, they eventually formed various false sects — becoming the origin of the 363 mithyā paths mentioned in Jain history.\nAfter celebrating the supreme renunciation, the Devas returned to their celestial abodes.\n\nFirst Aahar:\nAfter accepting Diksha, Bhagwan Ādināth entered deep meditation and undertook prolonged austerities. For six months, he remained absorbed in silence, without movement and without seeking food, fully established in equanimity and self-awareness.\n\nWhen Bhagwan Ādināth emerged from meditation and went out for āhār (alms), the world was unprepared. As this was the first Tirthankara of the era, no one knew the proper āhār-vidhi. People, out of devotion and innocence, offered garments, ornaments, and precious objects. Seeing these unsuitable offerings, the Lord returned silently without accepting food.\n\nThus, six more months passed without āhār, completing an entire year of uninterrupted fasting. During this time, Bhagwan Ādināth continued his vihar, detached and absorbed in spiritual discipline, without any expectation or desire.\n\nOne day, Bhagwan Ādināth arrived in Hastinapur. King Shreyans, upon seeing the Lord, experienced Jāti-smaraṇa Jñāna (remembrance of past lives). He recalled that in a previous birth, he had offered āhār to a monk along with Bhagwan Ādināth’s soul. Instantly understanding the correct āhār-vidhi, King Shreyans respectfully offered sugarcane juice (Ikṣu Rasa) to the Lord.\n\nBhagwan Ādināth accepted the āhār, marking the first proper āhār-dāna of the avasarpinī era. At that moment, divine showers of gems and flowers occurred, celestial drums resounded, and a heavenly proclamation declared the greatness of the donor and the offering. This sacred event came to be celebrated as Akṣaya Tṛtīyā.", 
          hi: "भगवान आदिनाथ ने अयोध्या पर अत्यंत दीर्घ काल तक शासन किया, सभ्यता, सामाजिक व्यवस्था और धर्मयुक्त शासन की स्थापना की। जब उनके वैराग्य के प्रकट होने का नियत समय आया, तब सौधर्म इन्द्र ने यह जान लिया कि प्रभु का आंतरिक वैराग्य अब व्यक्त होने वाला है।\n\nलोक-कल्याण हेतु इस सुप्त वैराग्य को प्रकट करने के लिए इन्द्र ने राजसभा में एक भव्य दिव्य सभा का आयोजन किया। अप्सराओं में सर्वश्रेष्ठ नीलांजना को दिव्य नृत्य के लिए आमंत्रित किया गया।\nनृत्य करते-करते नीलांजना का आयु कर्म अचानक क्षीण हो गया। क्षणमात्र में वह निर्जीव होकर गिर पड़ी। सभा में व्यवधान न हो, इसके लिए इन्द्र ने तत्काल उसकी समान रूपवाली दूसरी अप्सरा को स्थापित कर दिया और नृत्य निर्बाध चलता रहा।\n\nसभा में उपस्थित सभी लोग इस परिवर्तन से अनभिज्ञ रहे — परन्तु भगवान आदिनाथ नहीं। अपनी असाधारण दृष्टि से उन्होंने नीलांजना का पतन स्पष्ट रूप से देखा। उन्होंने गहन चिंतन किया — “यदि देवांगना का जीवन भी जल-बुदबुद के समान क्षणभंगुर है, तो इस संसार में स्थायित्व क्या है?”\n\nजैसे ही भगवान आदिनाथ ने संसार त्याग का संकल्प किया, वैसे ही ब्रह्मलोक की सीमा पर निवास करने वाले लौकान्तिक देवगण प्रकट हुए। उन्होंने प्रभु को नमन कर विनयपूर्वक प्रार्थना की — “हे प्रभु! कृपया दीक्षा धारण कर तीरथ की स्थापना कीजिए, जिससे असंख्य जीवों का उद्धार हो।”\n\nभगवान आदिनाथ ने अपने पुत्रों को बुलाया और समस्त राजसत्ता का त्याग किया। ज्येष्ठ पुत्र भरत को अयोध्या का राजा नियुक्त किया गया, जो आगे चलकर प्रथम चक्रवर्ती बने। द्वितीय पुत्र बाहुबली को पोदनपुर का राज्य सौंपा गया। अन्य पुत्रों को शेष राज्यों का विभाजन कर दिया गया।\n\nसौधर्म इन्द्र ने ‘सुदर्शना’ नामक दिव्य पालकी की रचना की। भगवान आदिनाथ उस पर विराजमान हुए। प्रथम चरण में पालकी को राजाओं ने उठाया, तत्पश्चात विद्याधरों ने, और अंत में देवों ने। यह भव्य यात्रा अयोध्या से प्रयाग के समीप स्थित सिद्धार्थ वन की ओर अग्रसर हुई।\n\nचैत्र कृष्ण नवमी — जो कि उनके जन्म की ही तिथि थी — के दिन, वटवृक्ष के नीचे भगवान आदिनाथ पालकी से उतरे। पूर्व दिशा की ओर मुख करके उन्होंने सभी आभूषण, माला एवं वस्त्र त्याग दिए और दिगम्बर दीक्षा धारण की। उन्होंने श्रद्धा से उच्चारण किया — “ॐ नमः सिद्धेभ्यः” — जो इस अवसर्पिणी काल का प्रथम सिद्ध वंदन था।\n\nभगवान आदिनाथ ने अपने ही हाथों से पाँच मुट्ठियों में केश-लोच किया। सौधर्म इन्द्र ने उन केशों को रत्नजटित पात्र में ग्रहण कर क्षीरसागर में विसर्जित किया। उसी क्षण प्रभु को मनःपर्यय ज्ञान प्रकट हुआ।\n\nअपने राजा के वैराग्य से प्रेरित होकर 4000 अन्य राजाओं ने भी भगवान आदिनाथ के साथ दीक्षा धारण की। परन्तु वे अपने आंतरिक विकारों पर विजय प्राप्त नहीं कर सके। आगे चलकर जब प्रभु गहन मौन तप में लीन रहे, तब वे कठोर तप को सहन न कर सके और दीक्षा से विचलित होकर विभिन्न मिथ्या पंथों के आधार बने। दीक्षा कल्याणक की दिव्य आराधना कर देवगण अपने-अपने लोकों को लौट गए।\n\nप्रथम पारणा:\nदीक्षा ग्रहण करने के पश्चात भगवान आदिनाथ गहन ध्यान में लीन हो गए और दीर्घ तपस्या का संकल्प लिया। छह माह तक वे पूर्ण मौन, अचलता और समभाव में स्थित रहे, बिना आहार की इच्छा किए आत्मचिंतन में मग्न रहे।\n\nजब भगवान आदिनाथ ध्यान से उठकर आहार हेतु नगर में निकले, तब संसार तैयार नहीं था। चूँकि वे इस अवसर्पिणी के प्रथम तीर्थंकर थे, इसलिए किसी को भी आहार-विधि का ज्ञान नहीं था। लोग श्रद्धा और भोलेपन में वस्त्र, आभूषण और मूल्यवान वस्तुएँ अर्पित करने लगे। अनुपयुक्त दान देखकर भगवान बिना कुछ ग्रहण किए मौनपूर्वक लौट गए।\n\nइस प्रकार छह माह और व्यतीत हो गए, और भगवान का एक पूर्ण वर्ष का निराहार उपवास पूर्ण हुआ। इस काल में भी वे निरंतर विहार करते रहे — पूर्णतः आसक्ति रहित और तप में स्थित।\n\nएक दिन भगवान आदिनाथ हस्तिनापुर पधारे। उन्हें देखते ही राजा श्रेयांस को जातिस्मरण ज्ञान प्रकट हुआ। उन्हें स्मरण हुआ कि पूर्व जन्म में उन्होंने भगवान आदिनाथ के जीव के साथ मुनियों को आहार प्रदान किया था। तत्काल उन्हें आहार-विधि का ज्ञान हुआ और उन्होंने श्रद्धापूर्वक इक्षु रस अर्पित किया।\n\nभगवान आदिनाथ ने आहार स्वीकार किया — और इस प्रकार अवसर्पिणी काल का प्रथम विधिपूर्वक आहार दान संपन्न हुआ। उसी क्षण रत्नवृष्टि, पुष्पवृष्टि, दुन्दुभि नाद और आकाशवाणी हुई। इस पावन घटना को अक्षय तृतीया के रूप में स्मरण किया जाता है।", 
          kn: "ಭಗವಾನ್ ಆದಿನಾಥನು ಅಯೋಧ್ಯೆಯನ್ನು ಅಪಾರ ಕಾಲವರೆಗೆ ಆಳಿದರು. ಅವರು ನಾಗರಿಕತೆ, ಸಾಮಾಜಿಕ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಧರ್ಮಾಧಾರಿತ ಆಡಳಿತವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಸಂನ್ಯಾಸದ ಕಾಲ ಸಮೀಪಿಸಿದಾಗ, ಭಗವಂತನೊಳಗಿನ ವೈರಾಗ್ಯವು ಪ್ರಕಟಗೊಳ್ಳಬೇಕಾದ ಕ್ಷಣ ಬಂದಿದೆ ಎಂಬುದನ್ನು ಸೌಧರ್ಮ ಇಂದ್ರನು ಅರಿತುಕೊಂಡನು.\n\nಲೋಕಹಿತಾರ್ಥವಾಗಿ ಆ ಅಂತರ್ನಿಹಿತ ವೈರಾಗ್ಯವನ್ನು ಪ್ರಕಟಗೊಳಿಸಲು, ಇಂದ್ರನು ರಾಜಸಭೆಯಲ್ಲಿ ಭವ್ಯ ದಿವ್ಯ ಸಭೆಯನ್ನು ಏರ್ಪಡಿಸಿದನು. ದೇವಲೋಕದ ಅತಿ ಸುಂದರ ಅಪ್ಸರೆ ನೀಲಾಂಜನೆಯನ್ನು ದಿವ್ಯ ನೃತ್ಯಕ್ಕಾಗಿ ಆಹ್ವಾನಿಸಲಾಯಿತು. ನೃತ್ಯ ಮಾಡುವಾಗಲೇ ನೀಲಾಂಜನೆಯ ಆಯುಷ್ಯ ಕರ್ಮ ಕ್ಷೀಣಗೊಂಡು, ಕ್ಷಣಮಾತ್ರದಲ್ಲಿ ಅವಳು ನಿರ್ಜೀವಳಾಗಿ ಕುಸಿದಳು. ಸಭೆಯಲ್ಲಿ ವ್ಯತ್ಯಯ ಉಂಟಾಗಬಾರದೆಂದು, ಇಂದ್ರನು ತಕ್ಷಣವೇ ಅವಳಂತೆ ಕಾಣುವ ಮತ್ತೊಂದು ಅಪ್ಸರೆಯನ್ನು ಸ್ಥಾಪಿಸಿ ನೃತ್ಯವನ್ನು ನಿರಂತರವಾಗಿ ಮುಂದುವರಿಸಿದನು.\n\nಸಭೆಯಲ್ಲಿದ್ದ ಎಲ್ಲರೂ ಇದನ್ನು ಗಮನಿಸಲಿಲ್ಲ — ಆದರೆ ಭಗವಾನ್ ಆದಿನಾಥನು ಮಾತ್ರ ನೋಡಿದರು. ತಮ್ಮ ಅಸಾಮಾನ್ಯ ದೃಷ್ಟಿಯಿಂದ ನೀಲಾಂಜನೆಯ ಪತನವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಕಂಡು, ಅವರು ಆಳವಾದ ಚಿಂತನೆ ಮಾಡಿದರು — “ದೇವಿಯ ಜೀವವೂ ನೀರಿನ ಬುಗುರಿಯಂತೆ ಕ್ಷಣಿಕವಾಗಿದ್ದರೆ, ಈ ಲೋಕದಲ್ಲಿ ಶಾಶ್ವತತೆ ಎಲ್ಲಿದೆ?”\n\nಭಗವಾನ್ ಆದಿನಾಥನು ಸಂಸಾರ ತ್ಯಾಗದ ನಿರ್ಣಯ ಮಾಡಿದ ಕ್ಷಣದಲ್ಲೇ, ಬ್ರಹ್ಮಲೋಕದ ಅಂಚಿನಲ್ಲಿ ವಾಸಿಸುವ ಲೌಕಾಂತಿಕ ದೇವತೆಗಳು ಪ್ರತ್ಯಕ್ಷರಾದರು. ಅವರು ಭಕ್ತಿಯಿಂದ ವಂದಿಸಿ ಪ್ರಾರ್ಥಿಸಿದರು — “ಹೇ ಪ್ರಭು! ದೀಕ್ಷೆಯನ್ನು ಸ್ವೀಕರಿಸಿ ತೀರ್ಥವನ್ನು ಸ್ಥಾಪಿಸಿ, ಅನಂತ ಜೀವಿಗಳ ಉದ್ಧಾರಕ್ಕೆ ಕಾರಣರಾಗಿರಿ.”\n\nಭಗವಾನ್ ಆದಿನಾಥನು ತಮ್ಮ ಪುತ್ರರನ್ನು ಕರೆಯಿಸಿ ಸಂಪೂರ್ಣ ರಾಜಾಧಿಕಾರವನ್ನು ತ್ಯಜಿಸಿದರು. ಹಿರಿಯ ಪುತ್ರ ಭರತನನ್ನು ಅಯೋಧ್ಯೆಯ ರಾಜನಾಗಿ ನೇಮಿಸಲಾಯಿತು; ಅವನು ಮುಂದೆ ಪ್ರಥಮ ಚಕ್ರವರ್ತಿಯಾಗುವನು. ದ್ವಿತೀಯ ಪುತ್ರ ಬಾಹುಬಲಿಗೆ ಪೊದನಪುರದ ರಾಜ್ಯವನ್ನು ನೀಡಲಾಯಿತು. ಉಳಿದ ಪುತ್ರರಿಗೆ ಉಳಿದ ರಾಜ್ಯಗಳನ್ನು ಹಂಚಿಕೆಯಾಗಿತ್ತು.\n\nಸೌಧರ್ಮ ಇಂದ್ರನು ‘ಸುದರ್ಶನ’ ಎಂಬ ದಿವ್ಯ ಪಲ್ಲಕ್ಕಿಯನ್ನು ನಿರ್ಮಿಸಿದನು. ಭಗವಾನ್ ಆದಿನಾಥನು ಅದರಲ್ಲಿ ಆಸೀನರಾದರು. ಮೊದಲು ರಾಜರು, ನಂತರ ವಿದ್ಯಾಧರರು, ಅಂತಿಮವಾಗಿ ದೇವತೆಗಳು ಪಲ್ಲಕ್ಕಿಯನ್ನು ಹೊತ್ತು ಸಾಗಿಸಿದರು. ಈ ಭವ್ಯ ಯಾತ್ರೆ ಅಯೋಧ್ಯೆಯಿಂದ ಪ್ರಯಾಗದ ಸಮೀಪದಲ್ಲಿರುವ ಸಿದ್ಧಾರ್ಥ ವನದತ್ತ ಸಾಗಿತು.\n\nಚೈತ್ರ ಕೃಷ್ಣ ನವಮಿಯಂದು — ಅದು ಅವರ ಜನ್ಮದ ತಿಥಿಯೇ ಆಗಿತ್ತು — ವಟವೃಕ್ಷದ ಕೆಳಗೆ ಭಗವಾನ್ ಆದಿನಾಥನು ಪಲ್ಲಕ್ಕಿಯಿಂದ ಇಳಿದರು. ಪೂರ್ವದತ್ತ ಮುಖಮಾಡಿ, ಎಲ್ಲಾ ಆಭರಣಗಳು, ಮಾಲೆಗಳು ಮತ್ತು ವಸ್ತ್ರಗಳನ್ನು ತ್ಯಜಿಸಿ ದಿಗಂಬರ ದೀಕ್ಷೆಯನ್ನು ಸ್ವೀಕರಿಸಿದರು. ಅವರು ಭಕ್ತಿಯಿಂದ ಉಚ್ಚರಿಸಿದರು — “ಓಂ ನಮಃ ಸಿದ್ಧೇಭ್ಯಃ” — ಇದು ಈ ಅವಸರ್ಪಿಣಿ ಕಾಲದ ಮೊದಲ ಸಿದ್ಧ ವಂದನೆ ಆಗಿತ್ತು.\n\nಭಗವಾನ್ ಆದಿನಾಥನು ತಮ್ಮ ಕೈಗಳಿಂದಲೇ ಐದು ಮುಷ್ಟಿಗಳಲ್ಲಿ ಕೇಶ ಲೋಂಚನೆಯನ್ನು ನೆರವೇರಿಸಿದರು. ಸೌಧರ್ಮ ಇಂದ್ರನು ಆ ಕೇಶಗಳನ್ನು ರತ್ನಭೂಷಿತ ಪಾತ್ರೆಯಲ್ಲಿ ಸ್ವೀಕರಿಸಿ ಕ್ಷೀರಸಾಗರದಲ್ಲಿ ವಿಸರ್ಜಿಸಿದನು. ಅದೇ ಕ್ಷಣದಲ್ಲಿ ಭಗವಂತನ ಆತ್ಮದಲ್ಲಿ ಮನಃಪರ್ಯಾಯ ಜ್ಞಾನವು ಪ್ರಕಟವಾಯಿತು.\n\nತಮ್ಮ ರಾಜನ ವೈರಾಗ್ಯದಿಂದ ಪ್ರೇರಿತರಾಗಿ 4000 ಉಪರಾಜರು ಭಗವಾನ್ ಆದಿನಾಥನೊಂದಿಗೆ ದೀಕ್ಷೆಯನ್ನು ಸ್ವೀಕರಿಸಿದರು. ಆದರೆ ಅವರು ಆಂತರಿಕ ವಿಕಾರಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಜಯಿಸಲಿಲ್ಲ. ಮುಂದೆ ಭಗವಂತನು ದೀರ್ಘ ಮೌನ ತಪಸ್ಸಿನಲ್ಲಿ ಲೀನರಾಗಿದ್ದಾಗ, ಅವರು ಆ ಕಠಿಣ ತಪಸ್ಸನ್ನು ಸಹಿಸಲಾರದೆ ದೀಕ್ಷೆಯಿಂದ ವಿಚಲಿತರಾಗಿ ವಿವಿಧ ಮಿಥ್ಯಾ ಪಂಥಗಳ ಆಧಾರರಾದರು. ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕದ ಮಹೋತ್ಸವವನ್ನು ನೆರವೇರಿಸಿ ದೇವತೆಗಳು ತಮ್ಮ ತಮ್ಮ ಲೋಕಗಳಿಗೆ ಮರಳಿದರು.\n\nಪ್ರಥಮ ಪಾರಣೆ:\nದೀಕ್ಷೆಯನ್ನು ಸ್ವೀಕರಿಸಿದ ನಂತರ ಭಗವಾನ್ ಆದಿನಾಥನು ಗಾಢ ಧ್ಯಾನದಲ್ಲಿ ಲೀನನಾಗಿ ದೀರ್ಘ ತಪಸ್ಸನ್ನು ಕೈಗೊಂಡರು. ಆರು ತಿಂಗಳುಗಳ ಕಾಲ ಅವರು ಸಂಪೂರ್ಣ ಮೌನ, ಅಚಲತೆ ಮತ್ತು ಸಮಭಾವದಲ್ಲಿ ಸ್ಥಿತರಾಗಿ, ಆಹಾರವನ್ನು ಅರಸದೆ ಆತ್ಮನಿಷ್ಠೆಯಲ್ಲಿ ತಲ್ಲೀನರಾಗಿದ್ದರು.\n\nಧ್ಯಾನದಿಂದ ಹೊರಬಂದು ಭಗವಾನ್ ಆದಿನಾಥನು ಆಹಾರಕ್ಕಾಗಿ ನಗರಕ್ಕೆ ವಿಹಾರ ಮಾಡಿದಾಗ, ಲೋಕವು ಸಿದ್ಧವಾಗಿರಲಿಲ್ಲ. ಅವರು ಈ ಅವಸರ್ಪಿಣಿಯ ಮೊದಲ ತೀರ್ಥಂಕರರಾಗಿದ್ದರಿಂದ, ಯಾರಿಗೂ ಆಹಾರ ವಿಧಿಯ ಜ್ಞಾನ ಇರಲಿಲ್ಲ. ಭಕ್ತಿಯಿಂದ ಮತ್ತು ಅಜ್ಞಾನದಿಂದ ಜನರು ವಸ್ತ್ರಗಳು, ಆಭರಣಗಳು ಮತ್ತು ಅಮೂಲ್ಯ ವಸ್ತುಗಳನ್ನು ಅರ್ಪಿಸಿದರು. ಅವು ಯೋಗ್ಯವಲ್ಲವೆಂದು ತಿಳಿದು, ಭಗವಂತನು ಮೌನವಾಗಿ ಹಿಂದಿರುಗಿದರು.\n\nಇದರಿಂದ ಮತ್ತಷ್ಟು ಆರು ತಿಂಗಳುಗಳು ಕಳೆದವು, ಮತ್ತು ಭಗವಾನ್ ಆದಿನಾಥನ ಸಂಪೂರ್ಣ ಒಂದು ವರ್ಷದ ನಿರಾಹಾರ ಉಪವಾಸ ಪೂರ್ಣವಾಯಿತು. ಈ ಅವಧಿಯಲ್ಲಿ ಅವರು ನಿರಂತರ ವಿಹಾರ ಮಾಡುತ್ತಾ, ಸಂಪೂರ್ಣ ಆಸಕ್ತಿರಹಿತರಾಗಿ ತಪಸ್ಸಿನಲ್ಲಿ ಸ್ಥಿತರಾಗಿದ್ದರು.\n\nಒಂದು ದಿನ ಭಗವಾನ್ ಆದಿನಾಥನು ಹಸ್ತಿನಾಪುರಕ್ಕೆ ಆಗಮಿಸಿದರು. ಅವರನ್ನು ಕಂಡ ತಕ್ಷಣ ರಾಜ ಶ್ರೇಯಾಂಸರಿಗೆ ಜಾತಿಸ್ಮರಣ ಜ್ಞಾನ ಪ್ರಾಪ್ತವಾಯಿತು. ಹಿಂದಿನ ಜನ್ಮದಲ್ಲಿ ಅವರು ಭಗವಾನ್ ಆದಿನಾಥನ ಜೀವದೊಂದಿಗೆ ಮುನಿಗಳಿಗೆ ಆಹಾರ ನೀಡಿದ್ದನ್ನು ಸ್ಮರಿಸಿದರು. ತಕ್ಷಣ ಆಹಾರ ವಿಧಿಯನ್ನು ಅರಿತು, ಭಕ್ತಿಯಿಂದ ಇಕ್ಷು ರಸವನ್ನು ಅರ್ಪಿಸಿದರು.\n\nಭಗವಾನ್ ಆದಿನಾಥನು ಆಹಾರವನ್ನು ಸ್ವೀಕರಿಸಿದರು. ಇದರಿಂದ ಈ ಅವಸರ್ಪಿಣಿ ಯುಗದ ಮೊದಲ ವಿಧಿಪೂರ್ವಕ ಆಹಾರ ದಾನ ನೆರವೇರಿತು. ಅದೇ ಕ್ಷಣದಲ್ಲಿ ರತ್ನವೃಷ್ಟಿ, ಪುಷ್ಪವೃಷ್ಟಿ, ದಿವ್ಯ ದುಂದುಭಿ ನಾದ ಮತ್ತು ಆಕಾಶವಾಣಿ ಸಂಭವಿಸಿತು. ಈ ಪವಿತ್ರ ಘಟನೆಯನ್ನು ಅಕ್ಷಯ ತೃತೀಯೆಯಾಗಿ ಆಚರಿಸಲಾಗುತ್ತದೆ." 
        },
        extraInfo: { en: "Reason: Witnessing the death of Nilanjana.", hi: "कारण: नीलांजना की मृत्यु।", kn: "ಕಾರಣ: ನೀಲಾಂಜನೆಯ ಸಾವು." },
        images: ["/images/kalyanak/Adinath/diksha/1.jpeg", "/images/kalyanak/Adinath/diksha/2.jpeg", "/images/kalyanak/Adinath/diksha/3.jpeg", "/images/kalyanak/Adinath/diksha/4.jpeg", "/images/kalyanak/Adinath/diksha/5.jpeg", "/images/kalyanak/Adinath/diksha/6.jpeg", "/images/kalyanak/Adinath/diksha/7.jpeg", "/images/kalyanak/Adinath/diksha/8.jpeg", "/images/kalyanak/Adinath/diksha/9.jpeg", "/images/kalyanak/Adinath/diksha/10.jpeg", "/images/kalyanak/Adinath/diksha/11.jpeg", "/images/kalyanak/Adinath/diksha/12.jpeg", "/images/kalyanak/Adinath/diksha/13.jpeg", "/images/kalyanak/Adinath/diksha/14.jpeg"]
      },
      kevalgyan: {
        tithi: { en: "Falgun Krishna Ekadashi", hi: "फाल्गुन कृष्ण एकादशी", kn: "ಫಾಲ್ಗುಣ ಕೃಷ್ಣ ಏಕಾದಶಿ" },
        location: { en: "Purimtal (Prayagraj)", hi: "पुरिमताल (प्रयागराज)", kn: "ಪುರಿಮತಾಲ್ (ಪ್ರಯಾಗರಾಜ್)" },
        description: { 
          en: "After accepting Diksha, Bhagwan Ādināth wandered in complete silence for one thousand years, performing the most severe austerities. He endured hunger, thirst, heat, cold, and pain without the slightest attachment, steadily burning away karmic bondage through unwavering penance.\nIn the final phase of his spiritual journey, Bhagwan Ādināth arrived at the city of Purimtal, identified with present-day Prayāg. Entering the sacred Śakaṭamukha garden, he stood beneath a great Banyan tree known as Nyagrodha or Akṣayavaṭa, the eternal tree.\n\nStanding motionless in the Kayotsarga posture, Bhagwan Ādināth undertook a final fast of four days. His body remained perfectly still, fully abandoned, while his consciousness turned entirely inward toward the pure nature of the soul.\n\nDuring this profound meditation, Bhagwan Ādināth ascended the highest spiritual stages and entered Śukla Dhyāna — the purest form of meditation. Through its blazing inner fire, he completely destroyed the four Ghātiyā Karmas: Mohanīya (delusion), Jñānāvaraṇīya (knowledge-obscuring), Darśanāvaraṇīya (perception-obscuring), and Antarāya (obstructive).\nWith the total annihilation of these karmas, the soul of Bhagwan Ādināth manifested its true, infinite nature. On Phālguna Kṛṣṇa Ekādaśī, under the Uttarāṣāḍhā constellation, he attained Kevalgyān — absolute, infinite knowledge — perceiving all substances, all modes, across past, present, and future simultaneously.\n\nAt the very instant Kevalgyān arose, the universe resonated with divine joy. The thrones of the Indras trembled, and devas from all four celestial realms — Bhavanapati, Vyantara, Jyotiṣka, and Kalpavāsī — descended upon Purimtal to witness the supreme event.\nSaudharma Indra, the lord of the first heaven, arrived with his divine retinue. He circumambulated Bhagwan Ādināth with deep reverence and bowed before him, recognizing the manifestation of the Supreme Kevali.\n\nAt Indra’s command, Kubera, the treasurer of the gods, constructed the magnificent Samavasaraṇa — the divine preaching assembly unique to a Tīrthaṅkara. The circular structure spanned twelve yojanas and radiated celestial splendor.\nAt the four cardinal directions stood towering Manasthambhas, whose mere sight dissolved pride and ego. The Samavasaraṇa contained multiple enclosures of silver, gold, and jewels, with harmonious seating arrangements where humans, animals, and devas sat together without fear or hostility.\nAt the very center stood the Gandhakuṭī, a divine dais. Bhagwan Ādināth was seated there, suspended four fingers’ breadth above a lotus throne, facing east — yet visible equally in all four directions.\n\nFrom the body of Bhagwan Ādināth radiated a brilliance equal to a thousand suns. Free from hunger, thirst, sweat, shadow, and all bodily impurities, his divine voice manifested as Divya Dhvanī — a single, uninterrupted sound understood by every living being in their own language. \nThrough this Divya Dhvanī, Bhagwan Ādināth expounded the eternal truths: the nature of reality as Dravya, Guṇa, and Paryāya; the path to liberation through Ratnatraya; and the principle of Anekāntavāda.\n\nAmong the listeners was Prince Vṛṣabhasena, Bhagwan Ādināth’s own son. Deeply moved by the sermon, he renounced the world, accepted Diksha, and became the first Gaṇadhara. He systematized the divine teachings into the Dvādaśāṅgī.\nThus, the Chaturvidha Saṅgha was established: Munis led by Gaṇadhara Vṛṣabhasena, Aryikās led by Brāhmī Devi, Śrāvakas, and Śrāvikās. With this, Bhagwan Ādināth formally established the Tīrtha, opening the eternal path to liberation for countless souls.", 
          hi: "दीक्षा ग्रहण करने के बाद, भगवान आदिनाथ 1000 वर्षों तक पूर्ण मौन में विचरण करते रहे और अत्यंत कठोर तपस्या की। उन्होंने भूख, प्यास, गर्मी, सर्दी और पीड़ा को बिना किसी आसक्ति के सहन किया और अपनी अविचल तपस्या के माध्यम से कर्म बंधनों को निरंतर जलाते रहे। अपनी आध्यात्मिक यात्रा के अंतिम चरण में, भगवान आदिनाथ पुरिमताल नगर पहुँचे, जिसे वर्तमान प्रयाग के रूप में जाना जाता है। पवित्र शकटमुख उद्यान में प्रवेश कर, वे एक विशाल वटवृक्ष के नीचे खड़े हुए जिसे न्यग्रोध या अक्षयवट के नाम से जाना जाता है।\n\nकायोत्सर्ग मुद्रा में निश्चल खड़े होकर, भगवान आदिनाथ ने चार दिनों का अंतिम उपवास धारण किया। उनका शरीर पूर्णतः स्थिर और परित्यक्त था, जबकि उनकी चेतना पूरी तरह से अंतर्मुखी होकर आत्मा के शुद्ध स्वरूप में लीन हो गई थी।\n\nइस गहन ध्यान के दौरान, भगवान आदिनाथ ने सर्वोच्च आध्यात्मिक श्रेणियों का आरोहण किया और शुक्ल ध्यान — जो ध्यान का शुद्धतम रूप है — में प्रवेश किया। इसकी प्रज्वलित आंतरिक अग्नि के माध्यम से, उन्होंने चार घातिया कर्मों का पूर्णतः नाश कर दिया: मोहनीय, ज्ञानावरणीय, दर्शनावरणीय और अन्तराय। इन कर्मों के पूर्ण विनाश के साथ, भगवान आदिनाथ की आत्मा ने अपने वास्तविक, अनंत स्वरूप को प्रकट किया। फाल्गुन कृष्ण एकादशी के दिन, उत्तराषाढ़ा नक्षत्र के अंतर्गत, उन्होंने केवलज्ञान — पूर्ण, अनंत ज्ञान — प्राप्त किया, जिसके द्वारा वे भूत, भविष्य और वर्तमान के सभी द्रव्यों और उनकी सभी पर्यायों को एक साथ देखने और जानने लगे।\n\nजिस क्षण केवलज्ञान प्रकट हुआ, संपूर्ण ब्रह्मांड दिव्य हर्ष से गूंज उठा। इन्द्रों के आसन कंपायमान हो गए, और चारों निकायों — भवनपति, व्यंतर, ज्योतिष, और कल्पवासी — के देव इस सर्वोच्च घटना के साक्षी बनने के लिए पुरिमताल में उतरे। प्रथम स्वर्ग के स्वामी, सौधर्म इन्द्र, अपने दिव्य परिवार के साथ वहां पहुँचे। उन्होंने गहरी श्रद्धा के साथ भगवान आदिनाथ की प्रदक्षिणा की और सर्वोच्च केवली के रूप को पहचानकर उन्हें नमन किया।\n\nइन्द्र की आज्ञा पर, देवताओं के कोषाध्यक्ष कुबेर ने एक भव्य समवसरण की रचना की — जो तीर्थंकर की एक अद्वितीय दिव्य धर्मसभा होती है। यह गोलाकार संरचना बारह योजन तक विस्तृत थी और आकाशीय वैभव से देदीप्यमान थी। इसकी चारों दिशाओं में विशाल मानस्तंभ खड़े थे, जिनके मात्र दर्शन से ही अहंकार और मान गलित हो जाता था। समवसरण में चांदी, सोने और रत्नों के कई परकोटे थे, और बैठने की ऐसी सामंजस्यपूर्ण व्यवस्था थी जहाँ मनुष्य, पशु और देवता बिना किसी भय या शत्रुता के एक साथ बैठते थे। बिल्कुल केंद्र में गंधकुटी नामक एक दिव्य वेदी थी। भगवान आदिनाथ वहां एक कमल के सिंहासन से चार अंगुल ऊपर अधर में विराजमान थे, उनका मुख पूर्व की ओर था — फिर भी वे चारों दिशाओं में समान रूप से दिखाई दे रहे थे।\n\nभगवान आदिनाथ के शरीर से एक हजार सूर्य के समान तेज निकल रहा था। भूख, प्यास, पसीना, छाया और सभी शारीरिक मलिनताओं से मुक्त, उनकी दिव्य वाणी 'दिव्य ध्वनि' के रूप में प्रकट हुई — एक अखंड ओंकारमयी ध्वनि जिसे प्रत्येक जीव अपनी-अपनी भाषा में समझता था। इस दिव्य ध्वनि के माध्यम से, भगवान आदिनाथ ने शाश्वत सत्यों का प्रतिपादन किया: द्रव्य, गुण और पर्याय के रूप में वास्तविकता का स्वरूप; रत्नत्रय के माध्यम से मोक्ष का मार्ग; और अनेकांतवाद का सिद्धांत।\n\nश्रोताओं में भगवान आदिनाथ के अपने पुत्र, राजकुमार वृषभसेन भी थे। उपदेश से अत्यंत प्रभावित होकर, उन्होंने संसार का त्याग किया, दीक्षा ग्रहण की और प्रथम गणधर बने। उन्होंने प्रभु की दिव्य देशना को द्वादशांग में व्यवस्थित किया। इस प्रकार, चतुर्विध संघ की स्थापना हुई: गणधर वृषभसेन के नेतृत्व में मुनि, ब्राह्मी देवी के नेतृत्व में आर्यिकाएं, श्रावक और श्राविकाएं। इसके साथ ही, भगवान आदिनाथ ने औपचारिक रूप से 'तीर्थ' की स्थापना की और असंख्य जीवों के लिए मोक्ष का शाश्वत मार्ग खोल दिया।", 
          kn: "ದೀಕ್ಷೆಯನ್ನು ಸ್ವೀಕರಿಸಿದ ನಂತರ, ಭಗವಾನ್ ಆದಿನಾಥರು ಒಂದು ಸಾವಿರ ವರ್ಷಗಳ ಕಾಲ ಸಂಪೂರ್ಣ ಮೌನದಲ್ಲಿ ವಿಹರಿಸಿದರು ಮತ್ತು ಅತ್ಯಂತ ಕಠೋರ ತಪಸ್ಸನ್ನು ಆಚರಿಸಿದರು. ಅವರು ಹಸಿವು, ಬಾಯಾರಿಕೆ, ಬಿಸಿಲು, ಚಳಿ ಮತ್ತು ನೋವನ್ನು ಎಳ್ಳಷ್ಟೂ ಆಸಕ್ತಿಯಿಲ್ಲದೆ ಸಹಿಸಿಕೊಂಡರು ಮತ್ತು ತಮ್ಮ ಅವಿರತ ತಪಸ್ಸಿನ ಮೂಲಕ ಕರ್ಮ ಬಂಧನಗಳನ್ನು ಸುಡುತ್ತಾ ಸಾಗಿದರು. ತಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಯಾತ್ರೆಯ ಅಂತಿಮ ಹಂತದಲ್ಲಿ, ಭಗವಾನ್ ಆದಿನಾಥರು ಇಂದಿನ ಪ್ರಯಾಗ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಪುರಿಮತಾಲ್ ನಗರವನ್ನು ತಲುಪಿದರು. ಪವಿತ್ರವಾದ ಶಕಟಮುಖ ಉದ್ಯಾನವನ್ನು ಪ್ರವೇಶಿಸಿ, ಅವರು ನ್ಯಗ್ರೋಧ ಅಥವಾ ಅಕ್ಷಯವಟ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಬೃಹತ್ ಆಲದ ಮರದ ಕೆಳಗೆ ನಿಂತರು.\n\nಕಾಯೋತ್ಸರ್ಗ ಭಂಗಿಯಲ್ಲಿ ನಿಶ್ಚಲವಾಗಿ ನಿಂತು, ಭಗವಾನ್ ಆದಿನಾಥರು ನಾಲ್ಕು ದಿನಗಳ ಅಂತಿಮ ಉಪವಾಸವನ್ನು ಕೈಗೊಂಡರು. ಅವರ ದೇಹವು ಸಂಪೂರ್ಣವಾಗಿ ಸ್ಥಿರವಾಗಿತ್ತು ಮತ್ತು ಮಮಕಾರರಹಿತವಾಗಿತ್ತು, ಅದೇ ಸಮಯದಲ್ಲಿ ಅವರ ಪ್ರಜ್ಞೆಯು ಸಂಪೂರ್ಣವಾಗಿ ಅಂತರ್ಮುಖಿಯಾಗಿ ಆತ್ಮದ ಶುದ್ಧ ಸ್ವರೂಪದ ಕಡೆಗೆ ತಿರುಗಿತ್ತು.\n\nಈ ಅಗಾಧ ಧ್ಯಾನದ ಸಮಯದಲ್ಲಿ, ಭಗವಾನ್ ಆದಿನಾಥರು ಉನ್ನತ ಆಧ್ಯಾತ್ಮಿಕ ಶ್ರೇಣಿಗಳನ್ನು ಏರಿದರು ಮತ್ತು ಧ್ಯಾನದ ಅತ್ಯಂತ ಶುದ್ಧ ರೂಪವಾದ ಶುಕ್ಲ ಧ್ಯಾನವನ್ನು ಪ್ರವೇಶಿಸಿದರು. ಅದರ ಪ್ರಜ್ವಲಿಸುವ ಆಂತರಿಕ ಅಗ್ನಿಯ ಮೂಲಕ, ಅವರು ನಾಲ್ಕು ಘಾತಿಯಾ ಕರ್ಮಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಾಶಪಡಿಸಿದರು: ಮೋಹನೀಯ, ಜ್ಞಾನಾವರಣೀಯ, ದರ್ಶನಾವರಣೀಯ ಮತ್ತು ಅಂತರಾಯ. ಈ ಕರ್ಮಗಳ ಸಂಪೂರ್ಣ ವಿನಾಶದೊಂದಿಗೆ, ಭಗವಾನ್ ಆದಿನಾಥರ ಆತ್ಮವು ತನ್ನ ನೈಜ, ಅನಂತ ಸ್ವರೂಪವನ್ನು ವ್ಯಕ್ತಪಡಿಸಿತು. ಫಾಲ್ಗುಣ ಕೃಷ್ಣ ಏಕಾದಶಿಯಂದು, ಉತ್ತರಾಷಾಢ ನಕ್ಷತ್ರದ ಅಡಿಯಲ್ಲಿ, ಅವರು ಕೇವಲಜ್ಞಾನವನ್ನು — ಅಂದರೆ ಸಂಪೂರ್ಣ, ಅನಂತ ಜ್ಞಾನವನ್ನು — ಪಡೆದರು, ಈ ಮೂಲಕ ಅವರು ಭೂತ, ಭವಿಷ್ಯ ಮತ್ತು ವರ್ತಮಾನದ ಎಲ್ಲಾ ದ್ರವ್ಯಗಳನ್ನು ಮತ್ತು ಅವುಗಳ ಎಲ್ಲಾ ಪರ್ಯಾಯಗಳನ್ನು ಏಕಕಾಲದಲ್ಲಿ ನೋಡುವ ಮತ್ತು ತಿಳಿಯುವ ಶಕ್ತಿಯನ್ನು ಪಡೆದರು.\n\nಕೇವಲಜ್ಞಾನವು ಉಂಟಾದ ಆ ಕ್ಷಣದಲ್ಲಿಯೇ, ಇಡೀ ಬ್ರಹ್ಮಾಂಡವು ದೈವಿಕ ಆನಂದದಿಂದ ಮೊಳಗಿತು. ಇಂದ್ರರ ಆಸನಗಳು ಕಂಪಿಸಿದವು, ಮತ್ತು ಭವನಪತಿ, ವ್ಯಂತರ, ಜ್ಯೋತಿಷ್ಕ ಮತ್ತು ಕಲ್ಪವಾಸಿ ಎಂಬ ನಾಲ್ಕು ವರ್ಗದ ದೇವತೆಗಳು ಈ ಪರಮೋಚ್ಚ ಘಟನೆಯನ್ನು ವೀಕ್ಷಿಸಲು ಪುರಿಮತಾಲ್ ನಗರಕ್ಕೆ ಇಳಿದುಬಂದರು. ಮೊದಲ ಸ್ವರ್ಗದ ಒಡೆಯನಾದ ಸೌಧರ್ಮ ಇಂದ್ರನು ತನ್ನ ದೈವಿಕ ಪರಿವಾರದೊಂದಿಗೆ ಆಗಮಿಸಿದನು. ಅವನು ಭಗವಾನ್ ಆದಿನಾಥರನ್ನು ಭಕ್ತಿಯಿಂದ ಪ್ರದಕ್ಷಿಣೆ ಮಾಡಿದನು ಮತ್ತು ಪರಮೋಚ್ಚ ಕೇವಲಿಯನ್ನು ಗುರುತಿಸಿ ಅವರಿಗೆ ಸಾಷ್ಟಾಂಗ ನಮಸ್ಕಾರ ಮಾಡಿದನು.\n\nಇಂದ್ರನ ಆಜ್ಞೆಯ ಮೇರೆಗೆ, ದೇವತೆಗಳ ಕೋಶಾಧಿಕಾರಿಯಾದ ಕುಬೇರನು ಭವ್ಯವಾದ ಸಮವಸರಣವನ್ನು ನಿರ್ಮಿಸಿದನು — ಇದು ತೀರ್ಥಂಕರರಿಗೆ ಮಾತ್ರ ಮೀಸಲಾದ ದೈವಿಕ ಧರ್ಮಸಭೆಯಾಗಿದೆ. ಈ ವೃತ್ತಾಕಾರದ ರಚನೆಯು ಹನ್ನೆರಡು ಯೋಜನಗಳಷ್ಟು ವಿಸ್ತಾರವಾಗಿತ್ತು ಮತ್ತು ಆಕಾಶದ ವೈಭವದಿಂದ ಕಂಗೊಳಿಸುತ್ತಿತ್ತು. ಅದರ ನಾಲ್ಕು ದಿಕ್ಕುಗಳಲ್ಲಿ ಎತ್ತರವಾದ ಮಾನಸ್ತಂಭಗಳು ನಿಂತಿದ್ದವು, ಇವುಗಳ ದರ್ಶನ ಮಾತ್ರದಿಂದಲೇ ಅಹಂಕಾರ ಮತ್ತು ಗರ್ವ ಕರಗುತ್ತಿತ್ತು. ಸಮವಸರಣವು ಬೆಳ್ಳಿ, ಚಿನ್ನ ಮತ್ತು ರತ್ನಗಳಿಂದ ಕೂಡಿದ ಅನೇಕ ಪ್ರಾಕಾರಗಳನ್ನು ಹೊಂದಿತ್ತು, ಮತ್ತು ಅಲ್ಲಿ ಮನುಷ್ಯರು, ಪ್ರಾಣಿಗಳು ಮತ್ತು ದೇವತೆಗಳು ಯಾವುದೇ ಭಯ ಅಥವಾ ದ್ವೇಷವಿಲ್ಲದೆ ಒಟ್ಟಿಗೆ ಕುಳಿತುಕೊಳ್ಳುವಂತಹ ಸಾಮರಸ್ಯದ ವ್ಯವಸ್ಥೆಯಿತ್ತು. ಅದರ ಕೇಂದ್ರಭಾಗದಲ್ಲಿ ಗಂಧಕುಟಿ ಎಂಬ ದೈವಿಕ ಪೀಠವಿತ್ತು. ಭಗವಾನ್ ಆದಿನಾಥರು ಅಲ್ಲಿ ಕಮಲದ ಸಿಂಹಾಸನಕ್ಕಿಂತ ನಾಲ್ಕು ಬೆರಳುಗಳಷ್ಟು ಎತ್ತರದಲ್ಲಿ ಕುಳಿತಿದ್ದರು, ಅವರ ಮುಖವು ಪೂರ್ವಕ್ಕೆ ಮುಖ ಮಾಡಿತ್ತಾದರೂ, ಅವರು ನಾಲ್ಕು ದಿಕ್ಕುಗಳಲ್ಲೂ ಸಮಾನವಾಗಿ ಕಾಣಿಸುತ್ತಿದ್ದರು.\n\nಭಗವಾನ್ ಆದಿನಾಥರ ಶರೀರದಿಂದ ಸಾವಿರ ಸೂರ್ಯರಿಗೆ ಸಮಾನವಾದ ತೇಜಸ್ಸು ಹೊರಹೊಮ್ಮುತ್ತಿತ್ತು. ಹಸಿವು, ಬಾಯಾರಿಕೆ, ಬೆವರು, ನೆರಳು ಮತ್ತು ಎಲ್ಲಾ ದೈಹಿಕ ದೋಷಗಳಿಂದ ಮುಕ್ತವಾಗಿದ್ದ ಅವರ ದಿವ್ಯ ವಾಣಿಯು 'ದಿವ್ಯ ಧ್ವನಿ'ಯಾಗಿ ಪ್ರಕಟವಾಯಿತು — ಇದು ಪ್ರತಿಯೊಂದು ಜೀವಿಗೂ ಅವರವರ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥವಾಗುವಂತಹ ಏಕರೂಪದ ಅಖಂಡ ನಾದವಾಗಿತ್ತು. ಈ ದಿವ್ಯ ಧ್ವನಿಯ ಮೂಲಕ, ಭಗವಾನ್ ಆದಿನಾಥರು ಶಾಶ್ವತ ಸತ್ಯಗಳನ್ನು ಬೋಧಿಸಿದರು: ದ್ರವ್ಯ, ಗುಣ ಮತ್ತು ಪರ್ಯಾಯಗಳಾಗಿ ವಾಸ್ತವದ ಸ್ವರೂಪ; ರತ್ನತ್ರಯದ ಮೂಲಕ ಮೋಕ್ಷದ ಮಾರ್ಗ; ಮತ್ತು ಅನೇಕಾಂತವಾದದ ತತ್ವ.\n\nಕೇಳುಗರ ಗುಂಪಿನಲ್ಲಿ ಭಗವಾನ್ ಆದಿನಾಥರ ಸ್ವಂತ ಪುತ್ರನಾದ ರಾಜಕುಮಾರ ವೃಷಭಸೇನನೂ ಇದ್ದನು. ಪ್ರವಚನದಿಂದ ಆಳವಾಗಿ ಪ್ರಭಾವಿತನಾದ ಅವನು ಪ್ರಪಂಚವನ್ನು ತ್ಯಜಿಸಿ, ದೀಕ್ಷೆಯನ್ನು ಸ್ವೀಕರಿಸಿ, ಪ್ರಥಮ ಗಣಧರನಾದನು. ಅವನು ಭಗವಂತನ ದಿವ್ಯ ಬೋಧನೆಗಳನ್ನು ದ್ವಾದಶಾಂಗಿಯಲ್ಲಿ ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಯೋಜಿಸಿದನು. ಹೀಗೆ, ಚತುರ್ವಿದ ಸಂಘವು ಸ್ಥಾಪನೆಯಾಯಿತು: ಗಣಧರ ವೃಷಭಸೇನನ ನೇತೃತ್ವದಲ್ಲಿ ಮುನಿಗಳು, ಬ್ರಾಹ್ಮೀ ದೇವಿಯ ನೇತೃತ್ವದಲ್ಲಿ ಆರ್ಯಿಕೆಯರು, ಶ್ರಾವಕರು ಮತ್ತು ಶ್ರಾವಿಕೆಯರು. ಇದರೊಂದಿಗೆ, ಭಗವಾನ್ ಆದಿನಾಥರು ಔಪಚಾರಿಕವಾಗಿ 'ತೀರ್ಥ'ವನ್ನು ಸ್ಥಾಪಿಸಿದರು ಮತ್ತು ಅಸಖ್ಯಾತ ಆತ್ಮಗಳಿಗೆ ಮೋಕ್ಷದ ಶಾಶ್ವತ ಮಾರ್ಗವನ್ನು ತೆರೆದರು." 
        },
        extraInfo: { en: "Penance: 1000 Years", hi: "तपस्या: 1000 वर्ष", kn: "ತಪಸ್ಸು: 1000 ವರ್ಷಗಳು" },
        images: ["/images/kalyanak/Adinath/kevalgyan/1.jpeg", "/images/kalyanak/Adinath/kevalgyan/2.jpeg", "/images/kalyanak/Adinath/kevalgyan/3.jpeg", "/images/kalyanak/Adinath/kevalgyan/4.jpeg", "/images/kalyanak/Adinath/kevalgyan/5_alt.jpeg", "/images/kalyanak/Adinath/kevalgyan/6.jpeg", "/images/kalyanak/Adinath/kevalgyan/7_alt.jpeg"]
      },
      moksha: {
        tithi: { en: "Magha Krishna Chaturdashi", hi: "माघ कृष्ण चतुर्दशी (शिवरात्रि)", kn: "ಮಾಘ ಕೃಷ್ಣ ಚತುರ್ದಶಿ" },
        location: { en: "Mount Ashtapad (Kailash)", hi: "अष्टापद (कैलाश पर्वत)", kn: "ಅಷ್ಟಾಪದ (ಕೈಲಾಸ ಪರ್ವತ)" },
        description: { 
          en: "After preaching the Dharma for many years and firmly establishing the Tīrtha, Bhagwan Ādināth perceived that his remaining Āyu Karma — the lifespan-determining karma — was nearing its completion. The destined moment to leave the worldly realm entirely had arrived.\n\nBhagwan Ādināth ascended the sacred Mount Aṣṭāpada, accompanied by ten thousand Munis who were equally destined for liberation. The mountain stood as the final sacred stage for the completion of his earthly spiritual journey. Upon the summit, Bhagwan Ādināth assumed the posture of profound meditation — Padmasan (the seated lotus posture). Having descended from the Samavasaraṇa, he completely relinquished all remaining connections to the world.\n\nEntering the supreme state of Yoga Nirodha, Bhagwan Ādināth brought all activities of mind, speech, and body — Man, Vachan, and Kāya — to absolute stillness. With this total cessation, the influx of new karma was entirely stopped, achieving complete Āsrava Nirodha.\nAbsorbed in the final stages of Śukla Dhyāna, Bhagwan Ādināth focused upon the destruction of the remaining four Aghātiyā Karmas — Vedanīya (feeling-producing), Āyu (lifespan), Nāma (physique-determining), and Gotra (status-determining) — which alone still bound the soul to the physical body.\n\nThe supremely auspicious moment arrived on Māgha Kṛṣṇa Chaturdaśī, the fourteenth day of the dark half of the month of Māgha. The moment occurred just before sunrise, during the sacred Brahmamuhūrta.\nWith the annihilation of the final karmas, Bhagwan Ādināth’s soul became completely free from the cycle of birth and death. He attained Moksha, becoming a Siddha — bodiless, formless, eternally pure, and endowed with infinite knowledge, infinite perception, and infinite bliss.\n\nInstantly, his liberated soul ascended upward to the Siddhaśilā — the eternal abode of liberated souls — situated at the summit of the universe, beyond all material realms.\nAlong with Bhagwan Ādināth, the ten thousand Munis who were meditating alongside him also attained Moksha, forever freed from worldly existence and boundless in their perfected state.", 
          hi: "कई वर्षों तक धर्म का उपदेश देने और तीर्थ की दृढ़ स्थापना करने के बाद, भगवान आदिनाथ ने जाना कि उनका शेष 'आयु कर्म' — जीवन काल निर्धारित करने वाला कर्म — अपनी पूर्णता के निकट था। सांसारिक क्षेत्र को पूरी तरह से त्यागने का निर्धारित क्षण आ गया था।\n\nभगवान आदिनाथ ने दस हजार मुनियों के साथ पवित्र अष्टापद पर्वत पर आरोहण किया, जो समान रूप से मोक्ष के लिए अभिप्रेत थे। यह पर्वत उनकी लौकिक आध्यात्मिक यात्रा की पूर्णता के लिए अंतिम पवित्र चरण के रूप में खड़ा था। शिखर पर, भगवान आदिनाथ ने गहन ध्यान की मुद्रा — पद्मासन (कमल की तरह बैठने की मुद्रा) — ग्रहण की। समवसरण से नीचे उतरकर, उन्होंने दुनिया से शेष सभी संबंधों का पूरी तरह से त्याग कर दिया।\n\n'योग निरोध' की सर्वोच्च अवस्था में प्रवेश करते हुए, भगवान आदिनाथ ने मन, वचन और काया की सभी गतिविधियों को पूर्ण स्थिरता में ला दिया। इस पूर्ण विराम के साथ, नए कर्मों का आगमन पूरी तरह से रुक गया, और पूर्ण 'आस्रव निरोध' सिद्ध हुआ। 'शुक्ल ध्यान' के अंतिम चरणों में लीन होकर, भगवान आदिनाथ ने शेष चार अघातिया कर्मों — वेदनीय, आयु, नाम और गोत्र — के विनाश पर ध्यान केंद्रित किया, जो अकेले अभी भी आत्मा को भौतिक शरीर से बांधे हुए थे।\n\nपरम शुभ क्षण माघ कृष्ण चतुर्दशी (माघ मास के कृष्ण पक्ष का चौदहवां दिन) को आया। यह क्षण सूर्योदय से ठीक पहले, पवित्र ब्रह्ममुहूर्त के दौरान घटित हुआ। अंतिम कर्मों के नाश के साथ, भगवान आदिनाथ की आत्मा जन्म और मृत्यु के चक्र से पूरी तरह मुक्त हो गई। उन्होंने मोक्ष प्राप्त किया और एक सिद्ध बन गए — जो शरीर रहित, निराकार, नित्य शुद्ध और अनंत ज्ञान, अनंत दर्शन एवं अनंत सुख से संपन्न हैं।\n\nतत्काल, उनकी मुक्त आत्मा ऊपर की ओर 'सिद्धशिला' तक आरोहण कर गई — जो मुक्त आत्माओं का शाश्वत निवास है और सभी भौतिक लोकों से परे ब्रह्मांड के शिखर पर स्थित है। भगवान आदिनाथ के साथ, उनके साथ ध्यान कर रहे दस हजार मुनियों ने भी मोक्ष प्राप्त किया, जो सांसारिक अस्तित्व से हमेशा के लिए मुक्त हो गए और अपनी पूर्ण अवस्था में अनंत हो गए।", 
          kn: "ಅನೇಕ ವರ್ಷಗಳ ಕಾಲ ಧರ್ಮವನ್ನು ಬೋಧಿಸಿದ ನಂತರ ಮತ್ತು ತೀರ್ಥವನ್ನು ದೃಢವಾಗಿ ಸ್ಥಾಪಿಸಿದ ನಂತರ, ಭಗವಾನ್ ಆದಿನಾಥರು ತಮ್ಮ ಉಳಿದಿರುವ 'ಆಯು ಕರ್ಮ' — ಜೀವಿತಾವಧಿಯನ್ನು ನಿರ್ಧರಿಸುವ ಕರ್ಮ — ಪೂರ್ಣಗೊಳ್ಳುವ ಹಂತದಲ್ಲಿದೆ ಎಂದು ಅರಿತುಕೊಂಡರು. ಲೌಕಿಕ ಕ್ಷೇತ್ರವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ ನಿಗದಿತ ಕ್ಷಣ ಆಗಮಿಸಿತ್ತು.\n\nಭಗವಾನ್ ಆದಿನಾಥರು ಮೋಕ್ಷಕ್ಕೆ ಹೋಗಲು ನಿರ್ಧರಿಸಲ್ಪಟ್ಟ ಹತ್ತು ಸಾವಿರ ಮುನಿಗಳೊಂದಿಗೆ ಪವಿತ್ರ ಅಷ್ಟಾಪದ ಪರ್ವತವನ್ನು ಏರಿದರು. ಪರ್ವತವು ಅವರ ಐಹಿಕ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯಾಣದ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಯ ಅಂತಿಮ ಪವಿತ್ರ ಹಂತವಾಗಿ ನಿಂತಿತ್ತು. ಶಿಖರದ ಮೇಲೆ, ಭಗವಾನ್ ಆದಿನಾಥರು ಗಹನವಾದ ಧ್ಯಾನದ ಭಂಗಿಯನ್ನು — ಪದ್ಮಾಸನವನ್ನು (ಕಮಲದಂತೆ ಕುಳಿತುಕೊಳ್ಳುವ ಭಂಗಿ) — ಸ್ವೀಕರಿಸಿದರು. ಸಮವಸರಣದಿಂದ ಕೆಳಗಿಳಿದ ಅವರು, ಪ್ರಪಂಚದೊಂದಿಗಿನ ಉಳಿದ ಎಲ್ಲಾ ಸಂಬಂಧಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿದರು.\n\n'ಯೋಗ ನಿರೋಧ'ದ ಪರಮ ಸ್ಥಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಿ, ಭಗವಾನ್ ಆದಿನಾಥರು ಮನಸ್ಸು, ವಚನ ಮತ್ತು ಕಾಯದ ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳನ್ನು ಸಂಪೂರ್ಣ ನಿಶ್ಚಲತೆಗೆ ತಂದರು. ಈ ಸಂಪೂರ್ಣ ನಿಲುಗಡೆಯೊಂದಿಗೆ, ಹೊಸ ಕರ್ಮಗಳ ಒಳಹರಿವು ಸಂಪೂರ್ಣವಾಗಿ ನಿಂತುಹೋಯಿತು, ಆ ಮೂಲಕ ಸಂಪೂರ್ಣ 'ಆಸ್ರವ ನಿರೋಧ'ವನ್ನು ಸಾಧಿಸಲಾಯಿತು. 'ಶುಕ್ಲ ಧ್ಯಾನ'ದ ಅಂತಿಮ ಹಂತಗಳಲ್ಲಿ ಲೀನರಾದ ಭಗವಾನ್ ಆದಿನಾಥರು, ಆತ್ಮವನ್ನು ಭೌತಿಕ ಶರೀರಕ್ಕೆ ಕಟ್ಟಿಹಾಕಿದ್ದ ಉಳಿದ ನಾಲ್ಕು ಅಘಾತಿಯ ಕರ್ಮಗಳಾದ — ವೇದನೀಯ, ಆಯು, ನಾಮ ಮತ್ತು ಗೋತ್ರಗಳ — ವಿನಾಶದತ್ತ ಗಮನಹರಿಸಿದರು.\n\nಮಾಘ ಮಾಸದ ಕೃಷ್ಣ ಪಕ್ಷದ ಹದಿನಾಲ್ಕನೆಯ ದಿನವಾದ 'ಮಾಘ ಕೃಷ್ಣ ಚತುರ್ದಶಿ'ಯಂದು ಆ ಪರಮ ಮಂಗಳಕರ ಕ್ಷಣ ಆಗಮಿಸಿತು. ಈ ಕ್ಷಣವು ಸೂರ್ಯೋದಯಕ್ಕೆ ಸ್ವಲ್ಪ ಮೊದಲು, ಪವಿತ್ರ ಬ್ರಹ್ಮಮುಹೂರ್ತದಲ್ಲಿ ಸಂಭವಿಸಿತು. ಅಂತಿಮ ಕರ್ಮಗಳ ವಿನಾಶದೊಂದಿಗೆ, ಭಗವಾನ್ ಆದಿನಾಥರ ಆತ್ಮವು ಜನನ ಮರಣಗಳ ಚಕ್ರದಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ಮುಕ್ತವಾಯಿತು. ಅವರು ಮೋಕ್ಷವನ್ನು ಪಡೆದರು ಮತ್ತು ಸಿದ್ದರಾದರು — ಅಶರೀರಿ, ನಿರಾಕಾರಿ, ಶಾಶ್ವತ ಶುದ್ಧ ಮತ್ತು ಅನಂತ ಜ್ಞಾನ, ಅನಂತ ದರ್ಶನ ಹಾಗೂ ಅನಂತ ಸುಖವನ್ನು ಹೊಂದಿದವರಾದರು.\n\nತಕ್ಷಣವೇ, ಅವರ ಮುಕ್ತಾತ್ಮವು ಬ್ರಹ್ಮಾಂಡದ ಶಿಖರದಲ್ಲಿರುವ, ಎಲ್ಲಾ ಭೌತಿಕ ಕ್ಷೇತ್ರಗಳನ್ನು ಮೀರಿದ, ಮುಕ್ತಾತ್ಮರ ಶಾಶ್ವತ ತಾಣವಾದ 'ಸಿದ್ಧಶಿಲೆ'ಗೆ ಊರ್ಧ್ವಮುಖವಾಗಿ ಏರಿತು. ಭಗವಾನ್ ಆದಿನಾಥರೊಂದಿಗೆ, ಅವರ ಪಕ್ಕದಲ್ಲಿಯೇ ಧ್ಯಾನ ಮಾಡುತ್ತಿದ್ದ ಹತ್ತು ಸಾವಿರ ಮುನಿಗಳು ಕೂಡ ಮೋಕ್ಷವನ್ನು ಪಡೆದರು, ಐಹಿಕ ಅಸ್ತಿತ್ವದಿಂದ ಶಾಶ್ವತವಾಗಿ ಮುಕ್ತರಾಗಿ ತಮ್ಮ ಪರಿಪೂರ್ಣ ಸ್ಥಿತಿಯಲ್ಲಿ ಅನಂತರಾದರು." 
        },
        images: ["/images/kalyanak/Adinath/moksha/1.jpeg", "/images/kalyanak/Adinath/moksha/2.jpeg", "/images/kalyanak/Adinath/moksha/3.jpeg", "/images/kalyanak/Adinath/moksha/4_alt.jpeg", "/images/kalyanak/Adinath/moksha/5.jpeg"]
      }
    }
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
    tirthankaraImage: "/arhats/ajitnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/sambhavnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/abhinandannath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/sumatinath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/padmaprabha.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/suparshvanath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/chandraprabha.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/pushpadanta.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/sheetalnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/shreyansnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/vasupujya.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/vimalnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/anantnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/dharmanath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/shantinath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/kunthunath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/arnath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/mallinath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/munisuvrat.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/naminath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/neminath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/parshvanath.png",
    kalyanaks: defaultKalyanaks
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
    tirthankaraImage: "/arhats/mahavira.png",
    kalyanaks: defaultKalyanaks
  }
];