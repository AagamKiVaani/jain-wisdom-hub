export type TithiEntry = {
  title: { en: string; hi: string; kn: string };
  description: { en: string; hi: string; kn: string };
  type: 'tithi' | 'kalyanak' | 'festival' | 'ashtanhika';
};

// Key = The ACTUAL Date of the Event (YYYY-MM-DD)
export const tithiCalendar: Record<string, TithiEntry> = {

  // ================= JANUARY 2026 =================
  "2026-01-01": { 
    title: { en: "Rohini Vrat & New Year", hi: "रोहिणी व्रत और नव वर्ष", kn: "ರೋಹಿಣಿ ವ್ರತ ಮತ್ತು ಹೊಸ ವರ್ಷ" }, 
    description: { 
      en: "Start the year with spiritual discipline. Observe Rohini Vrat today and visit a Jinendra temple.", 
      hi: "वर्ष की शुरुआत आध्यात्मिक अनुशासन से करें। आज रोहिणी व्रत का पालन करें और जिनालय के दर्शन करें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಶಿಸ್ತಿನೊಂದಿಗೆ ವರ್ಷವನ್ನು ಪ್ರಾರಂಭಿಸಿ. ಇಂದು ರೋಹಿಣಿ ವ್ರತ ಆಚರಿಸಿ ಮತ್ತು ಜಿನಮಂದಿರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ." 
    }, 
    type: "festival" 
  },
  "2026-01-02": { 
    title: { en: "Chaturdashi & Abhinandannath Kevalgyan Kalyanak", hi: "चतुर्दशी और अभिनंदननाथ केवलज्ञान कल्याणक", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಅಭಿನಂದನನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Abhinandannath attained Omniscience. For Chaturdashi, observe Ekashana (eating once) and avoid root vegetables.", 
      hi: "भगवान अभिनंदननाथ का केवलज्ञान कल्याणक। चतुर्दशी के लिए आज एकाशन करें और ज़मीकंद का पूर्ण त्याग करें।", 
      kn: "ಭಗವಾನ್ ಅಭಿನಂದನನಾಥರಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಏಕಾಷನ (ದಿನಕ್ಕೊಮ್ಮೆ ಊಟ) ಆಚರಿಸಿ ಮತ್ತು ಬೇರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-03": { 
    title: { en: "Purnima & Dharmanath Kevalgyan Kalyanak", hi: "पूर्णिमा और धर्मनाथ केवलज्ञान कल्याणक", kn: "ಹುಣ್ಣಿಮೆ ಮತ್ತು ಧರ್ಮನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Full moon day marking the Kevalgyan Kalyanak of the 15th Tirthankar, Lord Dharmanath.", 
      hi: "पवित्र पूर्णिमा। १५वें तीर्थंकर भगवान धर्मनाथ को आज के दिन केवलज्ञान की प्राप्ति हुई थी।", 
      kn: "ಪವಿತ್ರ ಹುಣ್ಣಿಮೆ. ೧೫ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಧರ್ಮನಾಥರಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ಶುಭ ದಿನ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-08": { 
    title: { en: "Padmaprabha Garbha Kalyanak", hi: "पद्मप्रभ गर्भ कल्याणक", kn: "ಪದ್ಮಪ್ರಭ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The auspicious descent of Lord Padmaprabha into the womb. Dedicate your time to deep devotion today.", 
      hi: "भगवान पद्मप्रभ का मंगलमय गर्भ कल्याणक। आज का समय गहरी भक्ति और वंदना में व्यतीत करें।", 
      kn: "ಭಗವಾನ್ ಪದ್ಮಪ್ರಭರ ಶುಭ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಇಂದಿನ ಸಮಯವನ್ನು ಆಳವಾದ ಭಕ್ತಿಯಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-11": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "A day for self-restraint. Take a strict vow of Ratri Bhojan Tyag (no eating after sunset) and spend an hour in Swadhyay.", 
      hi: "आत्म-संयम का दिन। आज रात्रि भोजन का पूर्ण त्याग करें और एक घंटा स्वाध्याय का नियम लें।", 
      kn: "ಆತ್ಮ-ಸಂಯಮದ ದಿನ. ಇಂದು ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಸ್ವಾಧ್ಯಾಯ ಮಾಡಿ." 
    }, 
    type: "tithi" 
  },
  "2026-01-14": { 
    title: { en: "Makar Sankranti", hi: "मकर संक्रांति", kn: "ಮಕರ ಸಂಕ್ರಾಂತಿ" }, 
    description: { 
      en: "A prime day for 'Dan' (Charity). Support a Goshala (cow shelter), Aushadhalaya (dispensary), or those in need.", 
      hi: "दान-पुण्य का विशेष दिन। आज किसी गौशाला, औषधालय या जरूरतमंदों को अपनी क्षमता अनुसार सहयोग दें।", 
      kn: "ದಾನ-ಧರ್ಮದ ವಿಶೇಷ ದಿನ. ಇಂದು ಗೋಶಾಲೆ, ಔಷಧಾಲಯ ಅಥವಾ ನಿರ್ಗತಿಕರಿಗೆ ನಿಮ್ಮ ಕೈಲಾದ ನೆರವು ನೀಡಿ." 
    }, 
    type: "festival" 
  },
  "2026-01-15": { 
    title: { en: "Sheetalnath Janma & Tap Kalyanak", hi: "शीतलनाथ जन्म और तप कल्याणक", kn: "ಶೀತಲನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of Lord Sheetalnath. Perform special Abhishek at the temple.", 
      hi: "भगवान शीतलनाथ का जन्म और तप (दीक्षा) कल्याणक। मंदिर जी जाकर विशेष अभिषेक और शांतिधारा करें।", 
      kn: "ಭಗವಾನ್ ಶೀತಲನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಜಿನಮಂದಿರದಲ್ಲಿ ವಿಶೇಷ ಅಭಿಷೇಕ ಮತ್ತು ಶಾಂತಿಧಾರಾ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-17": { 
    title: { en: "Chaturdashi & Adinath Moksha Kalyanak", hi: "चतुर्दशी और आदिनाथ मोक्ष कल्याणक", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಆದಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Adinath attained Nirvana from Mount Kailash. Observe a strict fast (Upvas) and maintain silence (Maun).", 
      hi: "प्रथम तीर्थंकर भगवान आदिनाथ को कैलाश पर्वत से मोक्ष प्राप्त हुआ। आज कठोर उपवास और मौन का पालन करें।", 
      kn: "ಪ್ರಥಮ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಆದಿನಾಥರಿಗೆ ಕೈಲಾಸ ಪರ್ವತದಿಂದ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಕಟ್ಟುನಿಟ್ಟಿನ ಉಪವಾಸ ಮತ್ತು ಮೌನ ಆಚರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-18": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "Focus on inner peace. Disconnect from worldly noise, eat a simple Sattvic diet, and chant 'Om Namah Siddhebhyah'.", 
      hi: "आंतरिक शांति पर ध्यान केंद्रित करें। सांसारिक शोर से दूर रहें, सात्विक आहार लें और 'ॐ नमः सिद्धेभ्यः' का जाप करें।", 
      kn: "ಆಂತರಿಕ ಶಾಂತಿಯತ್ತ ಗಮನಹರಿಸಿ. ಪ್ರಾಪಂಚಿಕ ಗದ್ದಲದಿಂದ ದೂರವಿರಿ, ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು 'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-01-20": { 
    title: { en: "Vasupujya Kevalgyan Kalyanak", hi: "वासुपूज्य केवलज्ञान कल्याणक", kn: "ವಾಸುಪೂಜ್ಯ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The supreme moment when Lord Vasupujya attained Omniscience. Engage in Jinendra worship today.", 
      hi: "वह परम पावन क्षण जब भगवान वासुपूज्य को केवलज्ञान की प्राप्ति हुई। आज जिनेन्द्र पूजा में भाग लें।", 
      kn: "ಭಗವಾನ್ ವಾಸುಪೂಜ್ಯರಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ಪರಮ ಪವಿತ್ರ ಕ್ಷಣ. ಇಂದು ಜಿನೇಂದ್ರ ಪೂಜೆಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-22": { 
    title: { en: "Vimalnath Janma & Tap Kalyanak", hi: "विमलनाथ जन्म और तप कल्याणक", kn: "ವಿಮಲನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of Lord Vimalnath. Reflect on his path of ultimate purity.", 
      hi: "भगवान विमलनाथ का जन्म और तप (दीक्षा) कल्याणक। उनकी पवित्रता के मार्ग का ध्यान और स्मरण करें।", 
      kn: "ಭಗವಾನ್ ವಿಮಲನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಅವರ ಪಾವಿತ್ರ್ಯತೆಯ ಮಾರ್ಗವನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-24": { 
    title: { en: "Vimalnath Kevalgyan Kalyanak", hi: "विमलनाथ केवलज्ञान कल्याणक", kn: "ವಿಮಲನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Vimalnath attained the infinite light of Omniscience. Celebrate with devotion and prayers.", 
      hi: "भगवान विमलनाथ को अनंत केवलज्ञान की प्राप्ति हुई। इस पावन दिन को गहरी भक्ति और पूजा के साथ मनाएं।", 
      kn: "ಭಗವಾನ್ ವಿಮಲನಾಥರಿಗೆ ಅನಂತ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಈ ಪವಿತ್ರ ದಿನವನ್ನು ಭಕ್ತಿ ಮತ್ತು ಪ್ರಾರ್ಥನೆಯೊಂದಿಗೆ ಆಚರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-26": { 
    title: { en: "Ashtami & Republic Day", hi: "अष्टमी और गणतंत्र दिवस", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ಗಣರಾಜ್ಯೋತ್ಸವ" }, 
    description: { 
      en: "Celebrate the nation. For Ashtami, take a vow of Hari Tyag (renouncing green leafy vegetables) and limit screen time.", 
      hi: "गणतंत्र दिवस की शुभकामनाएं। अष्टमी के लिए आज हरी सब्जियों का त्याग करें और मोबाइल का उपयोग सीमित करें।", 
      kn: "ಗಣರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು. ಅಷ್ಟಮಿಯ ಪ್ರಯುಕ್ತ ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸಿ ಮತ್ತು ಸ್ಕ್ರೀನ್ ಸಮಯವನ್ನು ಮಿತಿಗೊಳಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-01-27": { 
    title: { en: "Ajitnath Tap Kalyanak", hi: "अजितनाथ तप कल्याणक", kn: "ಅಜಿತನಾಥ ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Tap (Diksha) Kalyanak of the 2nd Tirthankar, Lord Ajitnath. Reflect on the strength required to renounce the world.", 
      hi: "द्वितीय तीर्थंकर भगवान अजितनाथ का तप (दीक्षा) कल्याणक। संसार त्यागने के लिए आवश्यक वैराग्य का चिंतन करें।", 
      kn: "೨ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಅಜಿತನಾಥರ ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಪ್ರಾಪಂಚಿಕ ವ್ಯಾಮೋಹವನ್ನು ತ್ಯಜಿಸುವ ವೈರಾಗ್ಯವನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-01-28": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Observance of the second Rohini Vrat of the month. Fast or eat a restricted diet for spiritual upliftment.", 
      hi: "माह के दूसरे रोहिणी व्रत का पालन करें। आत्मिक शांति और कर्म निर्जरा के लिए उपवास या एकाशन लें।", 
      kn: "ತಿಂಗಳ ಎರಡನೇ ರೋಹಿಣಿ ವ್ರತದ ಆಚರಣೆ. ಆತ್ಮೋದ್ಧಾರಕ್ಕಾಗಿ ಉಪವಾಸ ಅಥವಾ ಸೀಮಿತ ಆಹಾರ ಸೇವಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-01-30": { 
    title: { en: "Abhinandannath & Dharmanath Janma & Tap Kalyanak", hi: "अभिनंदननाथ और धर्मनाथ जन्म व तप कल्याणक", kn: "ಅಭಿನಂದನನಾಥ ಮತ್ತು ಧರ್ಮನಾಥ ಜನ್ಮ ಹಾಗೂ ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "A highly auspicious day marking the Birth and Initiation of both Lord Abhinandannath and Lord Dharmanath.", 
      hi: "अत्यंत मंगलमय दिन—भगवान अभिनंदननाथ और भगवान धर्मनाथ, दोनों का जन्म और तप (दीक्षा) कल्याणक।", 
      kn: "ಭಗವಾನ್ ಅಭಿನಂದನನಾಥ ಮತ್ತು ಭಗವಾನ್ ಧರ್ಮನಾಥ ಇಬ್ಬರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ ಒಟ್ಟಿಗೆ ಬಂದಿರುವ ಅತ್ಯಂತ ಶುಭ ದಿನ." 
    }, 
    type: "kalyanak" 
  },

  // ================= FEBRUARY 2026 =================
  "2026-02-01": { 
    title: { en: "Purnima", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, 
    description: { 
      en: "Auspicious full moon day. Today also marks the completion of Ratnatraya Vrat. Perform evening Aarti.", 
      hi: "पवित्र पूर्णिमा और रत्नत्रय व्रत की पूर्णता का दिन। आज संध्या आरती में अवश्य भाग लें।", 
      kn: "ಪವಿತ್ರ ಹುಣ್ಣಿಮೆ ಹಾಗೂ ರತ್ನತ್ರಯ ವ್ರತ ಪೂರ್ಣಗೊಂಡ ದಿನ. ಸಂಜೆ ಆರತಿಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ." 
    }, 
    type: "tithi" 
  },
  "2026-02-08": { 
    title: { en: "Padmaprabha Moksha Kalyanak", hi: "पद्मप्रभ मोक्ष कल्याणक", kn: "ಪದ್ಮಪ್ರಭ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The 6th Tirthankar, Lord Padmaprabha, attained Nirvana from Sammed Shikharji. Offer Nirvana Ladoo.", 
      hi: "६वें तीर्थंकर भगवान पद्मप्रभ को सम्मेद शिखरजी से मोक्ष प्राप्त हुआ। आज मंदिर जी में निर्वाण लाडू चढ़ाएं।", 
      kn: "೬ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಪದ್ಮಪ್ರಭರಿಗೆ ಸಮ್ಮೇದ ಶಿಖರಜಿಯಿಂದ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-09": { 
    title: { en: "Suparshvanath Moksha Kalyanak", hi: "सुपार्श्वनाथ मोक्ष कल्याणक", kn: "ಸುಪಾರ್ಶ್ವನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Suparshvanath attained supreme liberation (Moksha) today. Spend time in deep meditation.", 
      hi: "भगवान सुपार्श्वनाथ को आज मोक्ष की प्राप्ति हुई। अपना समय गहरे ध्यान और स्वाध्याय में बिताएं।", 
      kn: "ಭಗವಾನ್ ಸುಪಾರ್ಶ್ವನಾಥರಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ಶುಭ ದಿನ. ಆಳವಾದ ಧ್ಯಾನದಲ್ಲಿ ಸಮಯ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-10": { 
    title: { en: "Ashtami & Shreyansnath Garbha Kalyanak", hi: "अष्टमी और श्रेयांसनाथ गर्भ कल्याणक", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ಶ್ರೇಯಾಂಸನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Descent of Lord Shreyansnath into the womb. For Ashtami, observe a strict vow of Hari Tyag (renouncing green veggies).", 
      hi: "भगवान श्रेयांसनाथ का गर्भ कल्याणक। अष्टमी के लिए आज हरी सब्जियों के पूर्ण त्याग (हरी त्याग) का नियम लें।", 
      kn: "ಭಗವಾನ್ ಶ್ರೇಯಾಂಸನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಅಷ್ಟಮಿಯ ಪ್ರಯುಕ್ತ ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸುವ (ಹರಿ ತ್ಯಾಗ) ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-13": { 
    title: { en: "Pushpadantnath Moksha Kalyanak", hi: "पुष्पदंतनाथ मोक्ष कल्याणक", kn: "ಪುಷ್ಪದಂತನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Pushpadantnath attained Nirvana from Sammed Shikharji. Celebrate by performing Abhishek and Shantidhara.", 
      hi: "भगवान पुष्पदंतनाथ को सम्मेद शिखरजी से निर्वाण प्राप्त हुआ। अभिषेक और शांतिधारा कर पुण्य अर्जन करें।", 
      kn: "ಭಗವಾನ್ ಪುಷ್ಪದಂತನಾಥರಿಗೆ ಸಮ್ಮೇದ ಶಿಖರಜಿಯಿಂದ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಅಭಿಷೇಕ ಮತ್ತು ಶಾಂತಿಧಾರಾ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-14": { 
    title: { en: "Suparshvanath Garbha Kalyanak", hi: "सुपार्श्वनाथ गर्भ कल्याणक", kn: "ಸುಪಾರ್ಶ್ವನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The auspicious descent of the 7th Tirthankar, Lord Suparshvanath, into the womb.", 
      hi: "७वें तीर्थंकर भगवान सुपार्श्वनाथ का मंगलमय गर्भ कल्याणक।", 
      kn: "೭ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಸುಪಾರ್ಶ್ವನಾಥರ ಶುಭ ಗರ್ಭ ಕಲ್ಯಾಣಕ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-16": { 
    title: { en: "Chaturdashi & Vasupujya Garbha Kalyanak", hi: "चतुर्दशी और वासुपूज्य गर्भ कल्याणक", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ವಾಸುಪೂಜ್ಯ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Garbha Kalyanak of Lord Vasupujya. Observe Chaturdashi with a strict fast or Ekashana, and maintain silence.", 
      hi: "भगवान वासुपूज्य का गर्भ कल्याणक। चतुर्दशी पर उपवास या एकाशन करें और कम से कम एक घंटे मौन रखें।", 
      kn: "ಭಗವಾನ್ ವಾಸುಪೂಜ್ಯರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಉಪವಾಸ ಅಥವಾ ಏಕಾಷನ ಆಚರಿಸಿ ಮತ್ತು ಮೌನವಾಗಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-17": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "A day for profound internal silence. Keep a simple Sattvic diet and chant the Namokar Mantra 108 times.", 
      hi: "गहन आंतरिक शांति का दिन। सात्विक आहार लें और १०८ बार णमोकार मंत्र का जाप करें।", 
      kn: "ಗಾಢ ಆಂತರಿಕ ಶಾಂತಿಯ ದಿನ. ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ೧೦೮ ಬಾರಿ ಣಮೋಕಾರ ಮಂತ್ರ ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-02-20": { 
    title: { en: "Anantnath Moksha Kalyanak", hi: "अनंतनाथ मोक्ष कल्याणक", kn: "ಅನಂತನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Anantnath attained infinite liberation (Moksha) today. Offer special prayers and Nirvana Ladoo.", 
      hi: "भगवान अनंतनाथ को शाश्वत मोक्ष की प्राप्ति हुई। विशेष पूजा करें और निर्वाण लाडू अर्पित करें।", 
      kn: "ಭಗವಾನ್ ಅನಂತನಾಥರಿಗೆ ಶಾಶ್ವತ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ವಿಶೇಷ ಪೂಜೆ ಸಲ್ಲಿಸಿ ಮತ್ತು ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-22": { 
    title: { en: "Mallinath Moksha Kalyanak", hi: "मल्लिनाथ मोक्ष कल्याणक", kn: "ಮಲ್ಲಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The 19th Tirthankar, Lord Mallinath, attained Nirvana. Meditate on the path of detachment.", 
      hi: "१९वें तीर्थंकर भगवान मल्लिनाथ को निर्वाण प्राप्त हुआ। वैराग्य के मार्ग पर चिंतन और ध्यान करें।", 
      kn: "೧೯ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ವೈರಾಗ್ಯದ ಮಾರ್ಗವನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  
  // --- ASHTANHIKA PARVA (PHALGUN SERIES) ---
  "2026-02-23": { 
    title: { en: "Ashtami, Chandraprabha Moksha & Ashtanhika Begins", hi: "अष्टमी, चंद्रप्रभ मोक्ष और अष्टान्हिका प्रारंभ", kn: "ಅಷ್ಟಮಿ, ಚಂದ್ರಪ್ರಭ ಮೋಕ್ಷ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ ಪ್ರಾರಂಭ" }, 
    description: { 
      en: "Start of Ashtanhika Parva. Also, Lord Chandraprabha attained Moksha. Observe strict Brahmacharya today.", 
      hi: "अष्टान्हिका महापर्व का प्रारंभ और भगवान चंद्रप्रभ का मोक्ष कल्याणक। आज पूर्ण ब्रह्मचर्य का पालन करें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಆರಂಭ ಮತ್ತು ಭಗವಾನ್ ಚಂದ್ರಪ್ರಭರ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ. ಇಂದು ಸಂಪೂರ್ಣ ಬ್ರಹ್ಮಚರ್ಯ ಪಾಲಿಸಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-02-24": { 
    title: { en: "Sambhavnath Moksha & Ashtanhika (Day 2)", hi: "संभवनाथ मोक्ष और अष्टान्हिका (दिन 2)", kn: "ಸಂಭವನಾಥ ಮೋಕ್ಷ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 2)" }, 
    description: { 
      en: "Lord Sambhavnath attained Nirvana. Day 2 of Ashtanhika. Spend time in deep Swadhyay and devotion.", 
      hi: "भगवान संभवनाथ का मोक्ष कल्याणक। अष्टान्हिका का दूसरा दिन। अपना समय स्वाध्याय और भक्ति में बिताएं।", 
      kn: "ಭಗವಾನ್ ಸಂಭವನಾಥರ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ. ಅಷ್ಟಾಹ್ನಿಕದ ಎರಡನೇ ದಿನ. ನಿಮ್ಮ ಸಮಯವನ್ನು ಸ್ವಾಧ್ಯಾಯ ಮತ್ತು ಭಕ್ತಿಯಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-02-25": { 
    title: { en: "Rohini Vrat & Ashtanhika (Day 3)", hi: "रोहिणी व्रत और अष्टान्हिका (दिन 3)", kn: "ರೋಹಿಣಿ ವ್ರತ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 3)" }, 
    description: { 
      en: "Day 3 of Ashtanhika Parva. Observe Rohini Vrat today for spiritual upliftment and karma nirjara.", 
      hi: "अष्टान्हिका महापर्व का तीसरा दिन। आत्मिक शांति और कर्म निर्जरा के लिए आज रोहिणी व्रत का पालन करें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಮೂರನೇ ದಿನ. ಆತ್ಮೋದ್ಧಾರ ಮತ್ತು ಕರ್ಮ ನಿರ್ಜರೆಗಾಗಿ ಇಂದು ರೋಹಿಣಿ ವ್ರತ ಆಚರಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-02-26": { 
    title: { en: "Ashtanhika (Day 4)", hi: "अष्टान्हिका (दिन 4)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 4)" }, 
    description: { 
      en: "Midway through the 8-day celestial worship. Strengthen your vows and minimize worldly interactions.", 
      hi: "आराधना के ८-दिवसीय महापर्व का चौथा दिन। अपने व्रतों को दृढ़ करें और सांसारिक कार्यों को सीमित करें।", 
      kn: "೮-ದಿನಗಳ ಆರಾಧನಾ ಮಹಾಪರ್ವದ ನಾಲ್ಕನೇ ದಿನ. ನಿಮ್ಮ ವ್ರತಗಳನ್ನು ಬಲಪಡಿಸಿ ಮತ್ತು ಪ್ರಾಪಂಚಿಕ ವ್ಯವಹಾರಗಳನ್ನು ಮಿತಿಗೊಳಿಸಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-02-27": { 
    title: { en: "Ashtanhika (Day 5)", hi: "अष्टान्हिका (दिन 5)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 5)" }, 
    description: { 
      en: "Day 5 of Ashtanhika. Practice Maun (silence) for a designated period today to conserve spiritual energy.", 
      hi: "अष्टान्हिका का पांचवा दिन। अपनी आत्मिक ऊर्जा को संरक्षित करने के लिए आज कुछ समय मौन का अभ्यास करें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕದ ಐದನೇ ದಿನ. ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಯನ್ನು ಉಳಿಸಲು ಇಂದು ಸ್ವಲ್ಪ ಸಮಯ ಮೌನ ಅಭ್ಯಾಸ ಮಾಡಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-02-28": { 
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" }, 
    description: { 
      en: "Day 6 of Ashtanhika. Limit your use of electronic devices and focus entirely on internal reflection.", 
      hi: "अष्टान्हिका का छठा दिन। इलेक्ट्रॉनिक उपकरणों का उपयोग सीमित करें और पूरी तरह से आत्म-चिंतन पर ध्यान दें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕದ ಆರನೇ ದಿನ. ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಾಧನಗಳ ಬಳಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸಿ ಮತ್ತು ಸಂಪೂರ್ಣವಾಗಿ ಆಂತರಿಕ ಚಿಂತನೆಯತ್ತ ಗಮನಹರಿಸಿ." 
    }, 
    type: "ashtanhika" 
  },

  // ================= MARCH 2026 =================
  "2026-03-01": { 
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" }, 
    description: { 
      en: "Day 6 of the Phalguna Ashtanhika Parva. Dedicate your time to Jinendra Bhakti and study of the scriptures.", 
      hi: "फाल्गुन अष्टान्हिका महापर्व का छठा दिन। अपना समय जिनेन्द्र भक्ति और शास्त्रों के स्वाध्याय में व्यतीत करें।", 
      kn: "ಫಾಲ್ಗುಣ ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಆರನೇ ದಿನ. ನಿಮ್ಮ ಸಮಯವನ್ನು ಜಿನೇಂದ್ರ ಭಕ್ತಿ ಮತ್ತು ಶಾಸ್ತ್ರಗಳ ಅಧ್ಯಯನದಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-03-02": { 
    title: { en: "Chaturdashi, Ashtanhika (Day 7) & Shodashkaran Purna", hi: "चतुर्दशी, अष्टान्हिका (दिन 7) और षोडशकारण पूर्ण", kn: "ಚತುರ್ದಶಿ, ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 7) ಮತ್ತು ಷೋಡಶಕಾರಣ ಪೂರ್ಣ" }, 
    description: { 
      en: "Chaturdashi, Day 7 of Ashtanhika, and completion of the 32-day Shodashkaran Vrat. For Chaturdashi, observe a strict fast (Upvas) today.", 
      hi: "चतुर्दशी, अष्टान्हिका का 7वां दिन और 32-दिवसीय षोडशकारण व्रत का समापन। चतुर्दशी के लिए आज कठोर उपवास रखें।", 
      kn: "ಚತುರ್ದಶಿ, ಅಷ್ಟಾಹ್ನಿಕದ 7ನೇ ದಿನ, ಮತ್ತು 32-ದಿನಗಳ ಷೋಡಶಕಾರಣ ವ್ರತದ ಸಮಾಪ್ತಿ. ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಕಟ್ಟುನಿಟ್ಟಿನ ಉಪವಾಸ ಆಚರಿಸಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-03-03": { 
    title: { en: "Purnima & Ashtanhika Ends", hi: "पूर्णिमा और अष्टान्हिका समापन", kn: "ಹುಣ್ಣಿಮೆ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ ಸಮಾಪ್ತಿ" }, 
    description: { 
      en: "Auspicious Purnima and the conclusion of Ashtanhika Parva. Perform Visarjan and evening Aarti.", 
      hi: "पवित्र पूर्णिमा और अष्टान्हिका महापर्व का समापन। विसर्जन करें और संध्या आरती में भाग लें।", 
      kn: "ಪವಿತ್ರ ಹುಣ್ಣಿಮೆ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಸಮಾಪ್ತಿ. ವಿಸರ್ಜನೆ ಮಾಡಿ ಮತ್ತು ಸಂಜೆ ಆರತಿಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ." 
    }, 
    type: "festival" 
  },
  "2026-03-11": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Practice self-discipline today. Take a vow of absolute Brahmacharya and abstain from green vegetables (Hari Tyag).", 
      hi: "आज आत्म-अनुशासन का अभ्यास करें। पूर्ण ब्रह्मचर्य का पालन करें और हरी सब्जियों का त्याग (हरी त्याग) करें।", 
      kn: "ಇಂದು ಆತ್ಮ-ಶಿಸ್ತನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. ಸಂಪೂರ್ಣ ಬ್ರಹ್ಮಚರ್ಯ ಪಾಲಿಸಿ ಮತ್ತು ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸಿ (ಹರಿ ತ್ಯಾಗ)." 
    }, 
    type: "tithi" 
  },
  "2026-03-12": { 
    title: { en: "Rishabhdev Janma & Tap Kalyanak", hi: "ऋषभदेव जन्म और तप कल्याणक", kn: "ಋಷಭದೇವ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Tirthankar Diwas. Marking the Birth and Initiation (Diksha) of the 1st Tirthankar, Lord Rishabhdev (Adinath). Reflect on his magnificent life as detailed in the Adipurana.", 
      hi: "तीर्थंकर दिवस। प्रथम तीर्थंकर भगवान ऋषभदेव (आदिनाथ) का जन्म और तप (दीक्षा) कल्याणक। आदिपुराण में वर्णित उनके महान जीवन का स्मरण करें।", 
      kn: "ತೀರ್ಥಂಕರ ದಿವಸ. ಪ್ರಥಮ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಋಷಭದೇವ (ಆದಿನಾಥ) ರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಆದಿಪುರಾಣದಲ್ಲಿ ವಿವರಿಸಿರುವ ಅವರ ಭವ್ಯ ಜೀವನವನ್ನು ಸ್ಮರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-03-18": { 
    title: { en: "Chaturdashi & Amavasya", hi: "चतुर्दशी और अमावस्या", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "Chaturdashi and Amavasya merged. A highly significant day for spiritual detox. Maintain complete silence (Maun) for two hours and perform deep meditation.", 
      hi: "चतुर्दशी और अमावस्या एक साथ। आध्यात्मिक शुद्धि के लिए अत्यंत महत्वपूर्ण दिन। दो घंटे का पूर्ण मौन रखें और गहरा ध्यान करें।", 
      kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಅಮಾವಾಸ್ಯೆ ಒಂದೇ ದಿನ. ಆಧ್ಯಾತ್ಮಿಕ ಶುದ್ಧಿಗೆ ಅತ್ಯಂತ ಮಹತ್ವದ ದಿನ. ಎರಡು ಗಂಟೆಗಳ ಕಾಲ ಸಂಪೂರ್ಣ ಮೌನ ವ್ರತ ಪಾಲಿಸಿ ಮತ್ತು ಆಳವಾದ ಧ್ಯಾನ ಮಾಡಿ." 
    }, 
    type: "tithi" 
  },
  "2026-03-19": { 
    title: { en: "Nav Samvatsar (New Year)", hi: "नव संवत्सर (हिंदू नव वर्ष)", kn: "ನವ ಸಂವತ್ಸರ (ಹಿಂದೂ ಹೊಸ ವರ್ಷ)" }, 
    description: { 
      en: "The beginning of the Hindu New Year. A great day to make new spiritual resolutions and start fresh.", 
      hi: "हिंदू नव वर्ष का प्रारंभ। नए आध्यात्मिक संकल्प लेने और नई शुरुआत करने के लिए एक उत्तम दिन।", 
      kn: "ಹಿಂದೂ ಹೊಸ ವರ್ಷದ ಆರಂಭ. ಹೊಸ ಆಧ್ಯಾತ್ಮಿಕ ಸಂಕಲ್ಪಗಳನ್ನು ಮಾಡಲು ಮತ್ತು ಹೊಸ ಆರಂಭವನ್ನು ಮಾಡಲು ಉತ್ತಮ ದಿನ." 
    }, 
    type: "festival" 
  },
  "2026-03-23": { 
    title: { en: "Chaitra Dashalakshan Begins", hi: "चैत्र दशलक्षण पर्व प्रारंभ", kn: "ಚೈತ್ರ ದಶಲಕ್ಷಣ ಪರ್ವ ಪ್ರಾರಂಭ" }, 
    description: { 
      en: "The start of the 10-day Chaitra Dashalakshan festival of virtues. Focus your mind on Uttam Kshama (Supreme Forgiveness) today.", 
      hi: "१०-दिवसीय चैत्र दशलक्षण महापर्व का प्रारंभ। आज अपना ध्यान उत्तम क्षमा पर केंद्रित करें।", 
      kn: "೧೦-ದಿನಗಳ ಚೈತ್ರ ದಶಲಕ್ಷಣ ಮಹಾಪರ್ವದ ಆರಂಭ. ಇಂದು ನಿಮ್ಮ ಗಮನವನ್ನು ಉತ್ತಮ ಕ್ಷಮೆಯತ್ತ ಕೇಂದ್ರೀಕರಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-03-24": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Keep a fast or eat a restricted diet today for spiritual upliftment and karma nirjara.", 
      hi: "आत्मिक शांति और कर्म निर्जरा के लिए आज उपवास या एकाशन का पालन करें।", 
      kn: "ಆತ್ಮೋದ್ಧಾರ ಮತ್ತು ಕರ್ಮ ನಿರ್ಜರೆಗಾಗಿ ಇಂದು ಉಪವಾಸ ಅಥವಾ ಸೀಮಿತ ಆಹಾರ ಸೇವಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-03-26": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Take a vow of Ratri Bhojan Tyag (no eating after sunset) and limit your use of electronic devices today.", 
      hi: "आज रात्रि भोजन का पूर्ण त्याग करें और इलेक्ट्रॉनिक उपकरणों का उपयोग सीमित करने का नियम लें।", 
      kn: "ಇಂದು ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಾಧನಗಳ ಬಳಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-03-27": { 
    title: { en: "Ram Navami", hi: "राम नवमी", kn: "ರಾಮ ನವಮಿ" }, 
    description: { 
      en: "Celebrate the birth of Lord Rama, a great Balbhadra. Reflect on his ideals, unwavering virtue, and the epic journey of Rama, Sita, Lakshmana, and Hanuman.", 
      hi: "महान बलभद्र भगवान राम का जन्मोत्सव। उनके आदर्शों, अटूट सद्गुणों और राम, सीता, लक्ष्मण और हनुमान की महाकाव्य यात्रा का स्मरण करें।", 
      kn: "ಮಹಾನ್ ಬಲಭದ್ರ ಭಗವಾನ್ ರಾಮರ ಜನ್ಮದಿನ. ಅವರ ಆದರ್ಶಗಳು, ಅಚಲ ಸದ್ಗುಣಗಳು ಮತ್ತು ರಾಮ, ಸೀತಾ, ಲಕ್ಷ್ಮಣ ಹಾಗೂ ಹನುಮಂತರ ಮಹಾಕಾವ್ಯದ ಪಯಣವನ್ನು ಸ್ಮರಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-03-31": { 
    title: { en: "Mahavir Swami Janma Kalyanak", hi: "महावीर स्वामी जन्म कल्याणक", kn: "ಮಹಾವೀರ ಸ್ವಾಮಿ ಜನ್ಮ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The most auspicious birth of the 24th Tirthankar in his final incarnation. Celebrate his supreme message of 'Live and Let Live'.", 
      hi: "२४वें तीर्थंकर के अंतिम भव का अत्यंत मंगलमय जन्म कल्याणक। 'जियो और जीने दो' के उनके परम संदेश का उत्सव मनाएं।", 
      kn: "೨೪ನೇ ತೀರ್ಥಂಕರರ ಅಂತಿಮ ಭವದ ಅತ್ಯಂತ ಮಂಗಳಮಯ ಜನ್ಮ ಕಲ್ಯಾಣಕ. 'ಬದುಕು ಮತ್ತು ಬದುಕಲು ಬಿಡು' ಎಂಬ ಅವರ ಪರಮ ಸಂದೇಶವನ್ನು ಆಚರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },

// ================= APRIL 2026 =================
  "2026-04-01": { 
    title: { en: "Chaturdashi & Padmaprabha Kevalgyan Kalyanak", hi: "चतुर्दशी और पद्मप्रभ केवलज्ञान कल्याणक", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಪದ್ಮಪ್ರಭ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Padmaprabha attained Omniscience today. Ratnatraya Vrat Purna. For Chaturdashi, observe Ekashana (eating once) and strictly avoid all root vegetables.", 
      hi: "भगवान पद्मप्रभ का केवलज्ञान कल्याणक और रत्नत्रय व्रत पूर्ण। चतुर्दशी के लिए आज एकाशन का नियम लें और ज़मीकंद का पूर्ण त्याग करें।", 
      kn: "ಭಗವಾನ್ ಪದ್ಮಪ್ರಭರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ. ರತ್ನತ್ರಯ ವ್ರತ ಪೂರ್ಣ. ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಏಕಾಷನ ವ್ರತ ಆಚರಿಸಿ ಮತ್ತು ಬೇರು ತರಕಾರಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-02": { 
    title: { en: "Purnima", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, 
    description: { 
      en: "Auspicious full moon day marking the completion of the Shodashkaran Vrat. Reflect on the 16 virtues of a Tirthankar.", 
      hi: "पवित्र पूर्णिमा का दिन और षोडशकारण व्रत की पूर्णता। तीर्थंकर प्रकृति बांधने वाली १६ भावनाओं का चिंतन करें।", 
      kn: "ಪವಿತ್ರ ಹುಣ್ಣಿಮೆ ಮತ್ತು ಷೋಡಶಕಾರಣ ವ್ರತದ ಪೂರ್ಣತೆ. ತೀರ್ಥಂಕರರ ೧೬ ಭಾವನೆಗಳನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-04-04": { 
    title: { en: "Parshvanath Garbha Kalyanak", hi: "पार्श्वनाथ गर्भ कल्याणक", kn: "ಪಾರ್ಶ್ವನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The auspicious day Lord Parshvanath descended into his mother's womb. Meditate on his supreme journey of detachment.", 
      hi: "वह मंगलमय दिन जब भगवान पार्श्वनाथ माता के गर्भ में पधारे। उनकी वैराग्यमयी यात्रा का स्मरण और ध्यान करें।", 
      kn: "ಭಗವಾನ್ ಪಾರ್ಶ್ವನಾಥರು ತಾಯಿಯ ಗರ್ಭವನ್ನು ಪ್ರವೇಶಿಸಿದ ಶುಭ ದಿನ. ಅವರ ವೈರಾಗ್ಯ ಪಯಣವನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-06": { 
    title: { en: "Padmaprabha Garbha Kalyanak", hi: "पद्मप्रभ गर्भ कल्याणक", kn: "ಪದ್ಮಪ್ರಭ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Garbha Kalyanak of the 6th Tirthankar, Lord Padmaprabha. Engage in Jinendra worship and recite his stotras.", 
      hi: "छठे तीर्थंकर भगवान पद्मप्रभ का गर्भ कल्याणक। जिनेन्द्र आराधना करें और उनके स्तोत्रों का पाठ करें।", 
      kn: "೬ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಪದ್ಮಪ್ರಭರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಜಿನೇಂದ್ರ ಆರಾಧನೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಸ್ತೋತ್ರಗಳನ್ನು ಪಠಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-10": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "A day for self-restraint. Take a vow of Brahmacharya (celibacy) for today and dedicate your free time to Swadhyay (scriptural study).", 
      hi: "आत्म-संयम का दिन। आज ब्रह्मचर्य व्रत का दृढ़ता से पालन करें और अपना समय जिनागम के स्वाध्याय में बिताएं।", 
      kn: "ಆತ್ಮ-ಸಂಯಮದ ದಿನ. ಇಂದು ಬ್ರಹ್ಮಚರ್ಯ ವ್ರತವನ್ನು ಪಾಲಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸಮಯವನ್ನು ಸ್ವಾಧ್ಯಾಯದಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "tithi" 
  },
  "2026-04-11": { 
    title: { en: "Munisuvratnath Kevalgyan Kalyanak", hi: "मुनिसुव्रतनाथ केवलज्ञान कल्याणक", kn: "ಮುನಿಸುವ್ರತನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Munisuvratnath attained the supreme light of Omniscience. Celebrate by performing specialized Abhishek and Puja.", 
      hi: "भगवान मुनिसुव्रतनाथ को अनंत केवलज्ञान की प्राप्ति हुई। विशेष अभिषेक और शांतिधारा के साथ इस दिन को मनाएं।", 
      kn: "ಭಗವಾನ್ ಮುನಿಸುವ್ರತನಾಥರಿಗೆ ಅನಂತ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ವಿಶೇಷ ಅಭಿಷೇಕ ಮತ್ತು ಪೂಜೆಯೊಂದಿಗೆ ಆಚರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-12": { 
    title: { en: "Munisuvratnath Janma & Tap Kalyanak", hi: "मुनिसुव्रतनाथ जन्म और तप कल्याणक", kn: "ಮುನಿಸುವ್ರತನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Double auspicious day marking the Birth and Diksha (Initiation) of Lord Munisuvratnath. Observe devotion towards the Vitaragi path.", 
      hi: "भगवान मुनिसुव्रतनाथ का जन्म और तप (दीक्षा) कल्याणक। उनके वीतरागी मार्ग के प्रति अपनी श्रद्धा और भक्ति अर्पित करें।", 
      kn: "ಭಗವಾನ್ ಮುನಿಸುವ್ರತನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ವೀತರಾಗಿ ಮಾರ್ಗದತ್ತ ಭಕ್ತಿ ಮತ್ತು ಶ್ರದ್ಧೆಯನ್ನು ತೋರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-15": { 
    title: { en: "Dharmanath Garbha Kalyanak", hi: "धर्मनाथ गर्भ कल्याणक", kn: "ಧರ್ಮನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Garbha Kalyanak of Lord Dharmanath. A day to reflect on the nature of Dharma and non-violence.", 
      hi: "भगवान धर्मनाथ का गर्भ कल्याणक। यह दिन धर्म और अहिंसा के वास्तविक स्वरूप पर चिंतन करने का है।", 
      kn: "ಭಗವಾನ್ ಧರ್ಮನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಧರ್ಮ ಮತ್ತು ಅಹಿಂಸೆಯ ಸ್ವರೂಪವನ್ನು ಧ್ಯಾನಿಸುವ ದಿನ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-16": { 
    title: { en: "Chaturdashi & Naminath Moksha Kalyanak", hi: "चतुर्दशी और नमिनाथ मोक्ष कल्याणक", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ನಮಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Naminath attained final liberation (Moksha). For Chaturdashi, take a vow of Hari Tyag (renouncing green leafy vegetables).", 
      hi: "भगवान नमिनाथ को शाश्वत मोक्ष की प्राप्ति हुई। आज चतुर्दशी के अवसर पर हरी सब्जियों (हरी त्याग) का नियम लें।", 
      kn: "ಭಗವಾನ್ ನಮಿನಾಥರಿಗೆ ಶಾಶ್ವತ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸುವ (ಹರಿ ತ್ಯಾಗ) ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-17": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "A day traditionally meant for introspection. Keep your diet minimal and focus your energies inward through meditation.", 
      hi: "आध्यात्मिक चिंतन का दिन। अपना आहार सात्विक और सीमित रखें, तथा ध्यान के माध्यम से आत्म-निरीक्षण करें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಚಿಂತನೆಯ ದಿನ. ಸಾತ್ವಿಕ ಮತ್ತು ಸೀಮಿತ ಆಹಾರ ಸೇವಿಸಿ, ಧ್ಯಾನದ ಮೂಲಕ ಆತ್ಮಾವಲೋಕನ ಮಾಡಿ." 
    }, 
    type: "tithi" 
  },
  "2026-04-18": { 
    title: { en: "Kunthunath Triple Kalyanak", hi: "कुंथुनाथ तीन कल्याणक", kn: "ಕುಂಥುನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "A rare and highly auspicious day marking the Janma, Tap (Diksha), and Moksha Kalyanak of Lord Kunthunath.", 
      hi: "अत्यंत दुर्लभ और मंगलमय दिन—भगवान कुंथुनाथ का जन्म, तप (दीक्षा) और मोक्ष कल्याणक एक साथ। विशेष आराधना करें।", 
      kn: "ಭಗವಾನ್ ಕುಂಥುನಾಥರ ಜನ್ಮ, ತಪ (ದೀಕ್ಷಾ) ಮತ್ತು ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ ಒಟ್ಟಿಗೆ ಬಂದಿರುವ ಅತ್ಯಂತ ಅಪರೂಪದ ಮತ್ತು ಶುಭ ದಿನ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-19": { 
    title: { en: "Akshay Tritiya", hi: "अक्षय तृतीया", kn: "ಅಕ್ಷಯ ತೃತೀಯ" }, 
    description: { 
      en: "Beginning of the path of charity (Dan Tirth). Lord Adinath gracefully accepted Sugarcane Juice (Ikshu Ras) after a long fast.", 
      hi: "दान तीर्थ का पावन प्रारंभ। आज ही के दिन भगवान आदिनाथ ने मुनि अवस्था में इक्षु रस (गन्ने का रस) का आहार ग्रहण किया था।", 
      kn: "ದಾನ ತೀರ್ಥದ ಪವಿತ್ರ ಆರಂಭ. ಭಗವಾನ್ ಆದಿನಾಥರು ಕಬ್ಬಿನ ಹಾಲನ್ನು (ಇಕ್ಷು ರಸ) ಆಹಾರವಾಗಿ ಸ್ವೀಕರಿಸಿದ ದಿನ." 
    }, 
    type: "festival" 
  },
  "2026-04-20": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Observance of Rohini Vrat for spiritual upliftment. Fast or eat a restricted diet and worship the Tirthankars.", 
      hi: "आत्मिक शांति और कर्म निर्जरा के लिए रोहिणी व्रत का पालन करें। उपवास या एकाशन रखकर देव-शास्त्र-गुरु की पूजा करें।", 
      kn: "ಆತ್ಮೋದ್ಧಾರಕ್ಕಾಗಿ ರೋಹಿಣಿ ವ್ರತ ಆಚರಣೆ. ಉಪವಾಸ ಅಥವಾ ಸೀಮಿತ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ತೀರ್ಥಂಕರರನ್ನು ಪೂಜಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-04-22": { 
    title: { en: "Abhinandannath Garbha & Moksha Kalyanak", hi: "अभिनंदननाथ गर्भ और मोक्ष कल्याणक", kn: "ಅಭಿನಂದನನಾಥ ಗರ್ಭ ಮತ್ತು ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Observing both the descent into the womb and the final liberation of Lord Abhinandannath. Offer Nirvana Ladoo today.", 
      hi: "भगवान अभिनंदननाथ का गर्भ और मोक्ष कल्याणक। आज मंदिर जी में दर्शन कर निर्वाण लाडू अवश्य चढ़ाएं।", 
      kn: "ಭಗವಾನ್ ಅಭಿನಂದನನಾಥರ ಗರ್ಭ ಮತ್ತು ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ. ಇಂದು ಜಿನಮಂದಿರದಲ್ಲಿ ದರ್ಶನ ಪಡೆದು ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-24": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Practice mindfulness. Take a vow strictly prohibiting Ratri Bhojan (eating after sunset) and maintain an hour of Maun (silence).", 
      hi: "जागरूकता का दिन। आज रात्रि भोजन का पूर्ण त्याग करें और कम से कम एक घंटे मौन का अभ्यास करें।", 
      kn: "ಎಚ್ಚರಿಕೆಯ ದಿನ. ರಾತ್ರಿ ಭೋಜನವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಕನಿಷ್ಠ ಒಂದು ಗಂಟೆ ಮೌನ ಆಚರಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-04-25": { 
    title: { en: "Sumatinath Tap Kalyanak", hi: "सुमतिनाथ तप कल्याणक", kn: "ಸುಮತಿನಾಥ ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Tap (Diksha) Kalyanak of Lord Sumatinath. Reflect on the rigorous austerities undertaken by the Digambar Munis.", 
      hi: "भगवान सुमतिनाथ का तप (दीक्षा) कल्याणक। दिगंबर मुनियों की कठोर साधना और तपस्या का चिंतन करें।", 
      kn: "ಭಗವಾನ್ ಸುಮತಿನಾಥರ ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ದಿಗಂಬರ ಮುನಿಗಳ ಕಠಿಣ ತಪಸ್ಸನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-26": { 
    title: { en: "Mahavir Swami Kevalgyan Kalyanak", hi: "महावीर स्वामी केवलज्ञान कल्याणक", kn: "ಮಹಾವೀರ ಸ್ವಾಮಿ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The supreme moment when Lord Mahavir attained Omniscience. A monumental day in the Jain calendar.", 
      hi: "वह परम पावन क्षण जब २४वें तीर्थंकर भगवान महावीर स्वामी को केवलज्ञान की प्राप्ति हुई।", 
      kn: "೨೪ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಮಹಾವೀರ ಸ್ವಾಮಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ಪರಮ ಪವಿತ್ರ ಕ್ಷಣ." 
    }, 
    type: "kalyanak" 
  },
  "2026-04-30": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Month-end spiritual detox. Observe Rasa Tyag today by giving up one favorite taste (like sugar or salt) to control the senses.", 
      hi: "माह के अंत में आत्म-शुद्धि। इंद्रियों पर संयम रखने के लिए आज रस त्याग (जैसे मीठा या नमक) का नियम लें।", 
      kn: "ತಿಂಗಳಾಂತ್ಯದ ಆತ್ಮ-ಶುದ್ಧಿ. ಇಂದ್ರಿಯ ನಿಗ್ರಹಕ್ಕಾಗಿ ಇಂದು ರಸ ತ್ಯಾಗ (ಸಿಹಿ ಅಥವಾ ಉಪ್ಪು ತ್ಯಜಿಸುವುದು) ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },

  // ================= MAY 2026 =================
  "2026-05-01": { 
    title: { en: "Purnima", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, 
    description: { 
      en: "A day for spiritual reflection. Observe a simple, Sattvic diet today.", 
      hi: "आध्यात्मिक चिंतन का दिन। आज सात्विक और सादा भोजन ग्रहण करें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಚಿಂತನೆಯ ದಿನ. ಇಂದು ಸಾತ್ವಿಕ ಮತ್ತು ಸರಳ ಆಹಾರ ಸೇವಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-05-08": { 
    title: { en: "Ashtami & Shreyansnath Garbha Kalyanak", hi: "अष्टमी और श्रेयांसनाथ गर्भ कल्याणक", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ಶ್ರೇಯಾಂಸನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Descent of Lord Shreyansnath into the womb. For Ashtami, observe Brahmacharya (celibacy) today and dedicate time to Swadhyay.", 
      hi: "भगवान श्रेयांसनाथ का गर्भ कल्याणक। अष्टमी के लिए आज ब्रह्मचर्य का पालन करें और स्वाध्याय में समय बिताएं।", 
      kn: "ಭಗವಾನ್ ಶ್ರೇಯಾಂಸನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಅಷ್ಟಮಿಯ ಪ್ರಯುಕ್ತ ಬ್ರಹ್ಮಚರ್ಯವನ್ನು ಪಾಲಿಸಿ ಮತ್ತು ಸ್ವಾಧ್ಯಾಯದಲ್ಲಿ ತೊಡಗಿಸಿಕೊಳ್ಳಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-05-12": { 
    title: { en: "Vimalnath Garbha Kalyanak", hi: "विमलनाथ गर्भ कल्याणक", kn: "ವಿಮಲನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Vimalnath descended into his mother's womb. Meditate on his path to ultimate purity.", 
      hi: "भगवान विमलनाथ माता के गर्भ में पधारे। उनकी पवित्रता के मार्ग का ध्यान और स्मरण करें।", 
      kn: "ಭಗವಾನ್ ವಿಮಲನಾಥರು ತಾಯಿಯ ಗರ್ಭವನ್ನು ಪ್ರವೇಶಿಸಿದ ದಿನ. ಅವರ ಪಾವಿತ್ರ್ಯತೆಯ ಮಾರ್ಗವನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-05-14": { 
    title: { en: "Anantnath Janma & Tap Kalyanak", hi: "अनंतनाथ जन्म और तप कल्याणक", kn: "ಅನಂತನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of Lord Anantnath. Engage in Jinendra worship today.", 
      hi: "भगवान अनंतनाथ का जन्म और तप (दीक्षा) कल्याणक। आज जिनेन्द्र आराधना और अभिषेक में भाग लें।", 
      kn: "ಭಗವಾನ್ ಅನಂತನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ (ತಪ) ಕಲ್ಯಾಣಕ. ಇಂದು ಜಿನೇಂದ್ರ ಪೂಜೆ ಮತ್ತು ಅಭಿಷೇಕದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-05-15": { 
    title: { en: "Chaturdashi & Shantinath Triple Kalyanak", hi: "चतुर्दशी और शांतिनाथ तीन कल्याणक", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಶಾಂತಿನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Janma, Tap, and Moksha of Lord Shantinath (Shanti Dhara Diwas). For Chaturdashi, completely renounce all green leafy vegetables (Hari Tyag).", 
      hi: "भगवान शांतिनाथ का जन्म, तप और मोक्ष कल्याणक (शांतिधारा दिवस)। चतुर्दशी पर पूर्ण रूप से हरी सब्जियों का त्याग करें।", 
      kn: "ಭಗವಾನ್ ಶಾಂತಿನಾಥರ ಜನ್ಮ, ತಪ ಮತ್ತು ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ (ಶಾಂತಿಧಾರಾ ದಿವಸ). ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ (ಹರಿ ತ್ಯಾಗ)." 
    }, 
    type: "kalyanak" 
  },
  "2026-05-16": { 
    title: { en: "Amavasya & Ajitnath Garbha Kalyanak", hi: "अमावस्या और अजितनाथ गर्भ कल्याणक", kn: "ಅಮಾವಾಸ್ಯೆ ಮತ್ತು ಅಜಿತನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Descent of Lord Ajitnath. On this Amavasya, spend time in deep meditation and maintain inner silence.", 
      hi: "भगवान अजितनाथ का गर्भ कल्याणक। इस अमावस्या पर गहन ध्यान करें और कुछ समय आंतरिक मौन में बिताएं।", 
      kn: "ಭಗವಾನ್ ಅಜಿತನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಈ ಅಮಾವಾಸ್ಯೆಯಂದು ಧ್ಯಾನ ಮತ್ತು ಆಂತರಿಕ ಮೌನದಲ್ಲಿ ಸಮಯ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-05-18": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "A day for spiritual upliftment. Keep a fast or eat restricted meals while worshipping the Tirthankars.", 
      hi: "आत्मिक शांति के लिए रोहिणी व्रत। उपवास या एकाशन लें और देव-शास्त्र-गुरु की पूजा करें।", 
      kn: "ಆತ್ಮೋದ್ಧಾರಕ್ಕಾಗಿ ರೋಹಿಣಿ ವ್ರತ. ಉಪವಾಸ ಅಥವಾ ಸೀಮಿತ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ತೀರ್ಥಂಕರರನ್ನು ಪೂಜಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-05-23": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Practice mindfulness today. Take a vow to eat only once (Ekashana) and strictly avoid eating after sunset (Ratri Bhojan Tyag).", 
      hi: "आज जागरूकता का अभ्यास करें। एकाशन का नियम लें और रात्रि भोजन का दृढ़ता से त्याग करें।", 
      kn: "ಇಂದು ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ. ಏಕಾಷನ (ದಿನಕ್ಕೊಮ್ಮೆ ಊಟ) ನಿಯಮ ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-05-30": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Purify your senses. Take a vow of Rasa Tyag by giving up one favorite taste, such as salt or sugar, for the entire day.", 
      hi: "इंद्रियों की शुद्धि करें। आज के दिन रस त्याग का नियम लें, जैसे पूरे दिन नमक या मीठे का त्याग करना।", 
      kn: "ಇಂದ್ರಿಯಗಳನ್ನು ಶುದ್ಧೀಕರಿಸಿ. ಇಡೀ ದಿನ ಉಪ್ಪು ಅಥವಾ ಸಿಹಿಯಂತಹ ಒಂದು ನೆಚ್ಚಿನ ರುಚಿಯನ್ನು ಬಿಡುವ ಮೂಲಕ ರಸ ತ್ಯಾಗದ ನಿಯಮವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ." 
    }, 
    type: "tithi" 
  },
  "2026-05-31": { 
    title: { en: "Purnima", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, 
    description: { 
      en: "Full moon day. Reflect on your spiritual progress over the month and engage in evening Jinendra Aarti.", 
      hi: "पूर्णिमा। माह के अंत में अपनी आध्यात्मिक प्रगति का चिंतन करें और संध्या आरती में भाग लें।", 
      kn: "ಹುಣ್ಣಿಮೆ. ತಿಂಗಳ ಕೊನೆಯಲ್ಲಿ ನಿಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಗತಿಯನ್ನು ಅವಲೋಕಿಸಿ ಮತ್ತು ಸಂಜೆ ಜಿನೇಂದ್ರ ಆರತಿಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ." 
    }, 
    type: "tithi" 
  },

  // ================= JUNE 2026 =================
  "2026-06-08": { 
    title: { en: "Ashtami & Dharmanath Moksha Kalyanak", hi: "अष्टमी और धर्मनाथ मोक्ष कल्याणक", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ಧರ್ಮನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Dharmanath attained final liberation. For Ashtami, observe a vow of Maun (silence) for two hours and completely abstain from green vegetables (Hari Tyag).", 
      hi: "भगवान धर्मनाथ को मोक्ष की प्राप्ति हुई। अष्टमी पर आज दो घंटे मौन का नियम लें और हरी सब्जियों का पूर्ण त्याग करें।", 
      kn: "ಭಗವಾನ್ ಧರ್ಮನಾಥರಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಅಷ್ಟಮಿಯ ಪ್ರಯುಕ್ತ ಎರಡು ಗಂಟೆಗಳ ಕಾಲ ಮೌನ ವ್ರತ ಆಚರಿಸಿ ಮತ್ತು ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-06-14": { 
    title: { en: "Chaturdashi & Rohini Vrat", hi: "चतुर्दशी और रोहिणी व्रत", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Observance of Rohini Vrat. On this Chaturdashi, practice Brahmacharya (celibacy) and take a vow to eat only one meal today (Ekashana).", 
      hi: "रोहिणी व्रत का दिन। आज चतुर्दशी पर ब्रह्मचर्य का दृढ़ता से पालन करें और एकाशन (दिन में एक बार भोजन) का नियम लें।", 
      kn: "ರೋಹಿಣಿ ವ್ರತದ ಆಚರಣೆ. ಈ ಚತುರ್ದಶಿಯಂದು ಬ್ರಹ್ಮಚರ್ಯವನ್ನು ಪಾಲಿಸಿ ಮತ್ತು ದಿನಕ್ಕೊಮ್ಮೆ ಮಾತ್ರ ಊಟ ಮಾಡುವ (ಏಕಾಷನ) ನಿಯಮ ತೆಗೆದುಕೊಳ್ಳಿ." 
    }, 
    type: "tithi" 
  },
  "2026-06-15": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "Auspicious Amavasya. Disconnect from worldly noise, focus on inner peace, and chant the Namokar Mantra 108 times.", 
      hi: "पवित्र अमावस्या। सांसारिक शोर से दूर रहें, आंतरिक शांति पर ध्यान केंद्रित करें और १०८ बार णमोकार मंत्र का जाप करें।", 
      kn: "ಪವಿತ್ರ ಅಮಾವಾಸ್ಯೆ. ಪ್ರಾಪಂಚಿಕ ಗದ್ದಲದಿಂದ ದೂರವಿರಿ, ಆಂತರಿಕ ಶಾಂತಿಯತ್ತ ಗಮನಹರಿಸಿ ಮತ್ತು ೧೦೮ ಬಾರಿ ಣಮೋಕಾರ ಮಂತ್ರವನ್ನು ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-06-19": { 
    title: { en: "Shrut Panchami (Jinvani Diwas)", hi: "श्रुत पंचमी (जिनवाणी दिवस)", kn: "ಶ್ರುತ ಪಂಚಮಿ (ಜಿನವಾಣಿ ದಿವಸ)" }, 
    description: { 
      en: "The historic day when Jain scriptures were first documented. Worship the Jinvani Mata and spend time studying religious texts.", 
      hi: "वह ऐतिहासिक दिन जब जैन आगमों को पहली बार लिपिबद्ध किया गया था। आज जिनवाणी माता की पूजा और शास्त्रों का स्वाध्याय करें।", 
      kn: "ಜೈನ ಗ್ರಂಥಗಳನ್ನು ಮೊದಲ ಬಾರಿಗೆ ದಾಖಲಿಸಿದ ಐತಿಹಾಸಿಕ ದಿನ. ಜಿನವಾಣಿ ಮಾತೆಯನ್ನು ಪೂಜಿಸಿ ಮತ್ತು ಧಾರ್ಮಿಕ ಗ್ರಂಥಗಳನ್ನು ಅಧ್ಯಯನ ಮಾಡಿ." 
    }, 
    type: "festival" 
  },
  "2026-06-22": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "A day for self-restraint. Take a strict vow of Ratri Bhojan Tyag (no eating after sunset) and limit your use of electronic devices.", 
      hi: "आत्म-संयम का दिन। आज रात्रि भोजन का पूर्ण त्याग करें और इलेक्ट्रॉनिक उपकरणों का उपयोग सीमित करने का नियम लें।", 
      kn: "ಆತ್ಮ-ಸಂಯಮದ ದಿನ. ಇಂದು ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ ಕಠಿಣ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಾಧನಗಳ ಬಳಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-06-26": { 
    title: { en: "Suparshvanath Janma & Tap Kalyanak", hi: "सुपार्श्वनाथ जन्म और तप कल्याणक", kn: "ಸುಪಾರ್ಶ್ವನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of the 7th Tirthankar, Lord Suparshvanath. Perform Jinendra Abhishek today.", 
      hi: "७वें तीर्थंकर भगवान सुपार्श्वनाथ का जन्म और तप (दीक्षा) कल्याणक। आज मंदिर जी जाकर जिनेन्द्र अभिषेक में भाग लें।", 
      kn: "೭ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಸುಪಾರ್ಶ್ವನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಇಂದು ಜಿನಮಂದಿರದಲ್ಲಿ ಜಿನೇಂದ್ರ ಅಭಿಷೇಕ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-06-28": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Spiritual detox day. Observe Rasa Tyag by giving up your favorite taste (like sugar, salt, or ghee) for the entire day.", 
      hi: "आध्यात्मिक शुद्धि का दिन। पूरे दिन के लिए अपने किसी पसंदीदा स्वाद (जैसे मीठा, नमक, या घी) को छोड़ने का रस त्याग नियम लें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಶುದ್ಧಿಯ ದಿನ. ಇಡೀ ದಿನ ನಿಮ್ಮ ನೆಚ್ಚಿನ ರುಚಿಯನ್ನು (ಸಿಹಿ, ಉಪ್ಪು ಅಥವಾ ತುಪ್ಪ) ಬಿಡುವ ಮೂಲಕ ರಸ ತ್ಯಾಗದ ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-06-29": { 
    title: { en: "Purnima", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, 
    description: { 
      en: "A day for gratitude and reflecting on the month's spiritual progress. Perform evening Aarti and maintain a Sattvic diet.", 
      hi: "कृतज्ञता और महीने की आध्यात्मिक प्रगति पर चिंतन करने का दिन। सात्विक आहार लें और संध्या आरती अवश्य करें।", 
      kn: "ಕೃತಜ್ಞತೆ ಮತ್ತು ತಿಂಗಳ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಗತಿಯನ್ನು ಅವಲೋಕಿಸುವ ದಿನ. ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ಸಂಜೆ ಆರತಿ ಮಾಡಿ." 
    }, 
    type: "tithi" 
  },

  // ================= JULY 2026 =================
  "2026-07-02": { 
    title: { en: "Adinath Garbha Kalyanak", hi: "आदिनाथ गर्भ कल्याणक", kn: "ಆದಿನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Descent of the 1st Tirthankar, Lord Adinath, into the womb. Meditate on the beginning of the Jain era.", 
      hi: "प्रथम तीर्थंकर भगवान आदिनाथ का गर्भ कल्याणक। जैन युग के प्रारंभ का स्मरण और ध्यान करें।", 
      kn: "ಪ್ರಥಮ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಆದಿನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಜೈನ ಯುಗದ ಆರಂಭವನ್ನು ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-07-06": { 
    title: { en: "Mallinath Garbha Kalyanak", hi: "मल्लिनाथ गर्भ कल्याणक", kn: "ಮಲ್ಲಿನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Garbha Kalyanak of the 19th Tirthankar, Lord Mallinath. Dedicate time to Jinendra worship today.", 
      hi: "१९वें तीर्थंकर भगवान मल्लिनाथ का गर्भ कल्याणक। आज का समय जिनेन्द्र आराधना में व्यतीत करें।", 
      kn: "೧೯ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಇಂದು ಜಿನೇಂದ್ರ ಆರಾಧನೆಗೆ ಸಮಯ ಮೀಸಲಿಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-07-08": { 
    title: { en: "Ashtami & Vimalnath Moksha Kalyanak", hi: "अष्टमी और विमलनाथ मोक्ष कल्याणक", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ವಿಮಲನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Vimalnath attained Moksha. For Ashtami, observe a Niyam to abstain from all digital entertainment today.", 
      hi: "भगवान विमलनाथ को मोक्ष की प्राप्ति हुई। आज अष्टमी पर सभी डिजिटल मनोरंजन से दूर रहने (त्याग) का नियम लें।", 
      kn: "ಭಗವಾನ್ ವಿಮಲನಾಥರಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಅಷ್ಟಮಿಯ ಪ್ರಯುಕ್ತ ಡಿಜಿಟಲ್ ಮನರಂಜನೆಯಿಂದ ದೂರವಿರುವ ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-07-09": { 
    title: { en: "Naminath Janma & Tap Kalyanak", hi: "नमिनाथ जन्म और तप कल्याणक", kn: "ನಮಿನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of Lord Naminath. Perform Abhishek and Shantidhara.", 
      hi: "भगवान नमिनाथ का जन्म और तप (दीक्षा) कल्याणक। मंदिर जी जाकर अभिषेक और शांतिधारा करें।", 
      kn: "ಭಗವಾನ್ ನಮಿನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಜಿನಮಂದಿರದಲ್ಲಿ ಅಭಿಷೇಕ ಮತ್ತು ಶಾಂತಿಧಾರಾ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-07-12": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "A day dedicated to spiritual upliftment and karma nirjara. Keep a fast or take Ekashana (one meal).", 
      hi: "आत्मिक उत्थान और कर्म निर्जरा का दिन। उपवास रखें या एकाशन का पालन करें।", 
      kn: "ಆತ್ಮೋದ್ಧಾರ ಮತ್ತು ಕರ್ಮ ನಿರ್ಜರೆಯ ದಿನ. ಉಪವಾಸ ಅಥವಾ ಏಕಾಷನ (ದಿನಕ್ಕೊಮ್ಮೆ ಊಟ) ವ್ರತ ಆಚರಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-07-14": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Spiritual detox. Take a vow strictly prohibiting eating outside food and maintain silence for one hour.", 
      hi: "आध्यात्मिक शुद्धि। आज बाहर का भोजन पूर्णतः त्यागने का नियम लें और एक घंटे का मौन रखें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಶುದ್ಧಿ. ಇಂದು ಹೊರಗಿನ ಆಹಾರವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಮೌನ ವ್ರತ ಆಚರಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-07-15": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "Focus on inner reflection. Avoid worldly arguments, eat a light Sattvic diet, and chant Namokar Mantra.", 
      hi: "आत्म-चिंतन पर ध्यान दें। सांसारिक विवादों से बचें, सात्विक आहार लें और णमोकार मंत्र का जाप करें।", 
      kn: "ಆತ್ಮ-ಚಿಂತನೆಯತ್ತ ಗಮನಹರಿಸಿ. ಪ್ರಾಪಂಚಿಕ ವಾದ-ವಿವಾದಗಳಿಂದ ದೂರವಿರಿ, ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು ಣಮೋಕಾರ ಮಂತ್ರ ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-07-19": { 
    title: { en: "Mahavir Swami Garbha Kalyanak", hi: "महावीर स्वामी गर्भ कल्याणक", kn: "ಮಹಾವೀರ ಸ್ವಾಮಿ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The auspicious day the 24th Tirthankar, Lord Mahavir, descended into his mother's womb.", 
      hi: "वह मंगलमय दिन जब २४वें तीर्थंकर भगवान महावीर स्वामी माता के गर्भ में पधारे।", 
      kn: "೨೪ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಮಹಾವೀರ ಸ್ವಾಮಿ ತಾಯಿಯ ಗರ್ಭವನ್ನು ಪ್ರವೇಶಿಸಿದ ಶುಭ ದಿನ." 
    }, 
    type: "kalyanak" 
  },
  "2026-07-20": { 
    title: { en: "Neminath Moksha Kalyanak", hi: "नेमिनाथ मोक्ष कल्याणक", kn: "ನೇಮಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Neminath attained supreme liberation (Nirvana) from Mount Girnar. Offer Nirvana Ladoo today.", 
      hi: "भगवान नेमिनाथ को गिरनार पर्वत से शाश्वत मोक्ष प्राप्त हुआ। आज निर्वाण लाडू अर्पित करें।", 
      kn: "ಭಗವಾನ್ ನೇಮಿನಾಥರಿಗೆ ಗಿರನಾರ್ ಪರ್ವತದಿಂದ ಶಾಶ್ವತ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಇಂದು ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  
  // --- ASHTANHIKA PARVA (JULY SERIES) ---
  "2026-07-21": { 
    title: { en: "Ashtami & Ashtanhika Begins (Day 1)", hi: "अष्टमी और अष्टान्हिका प्रारंभ (दिन 1)", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ ಪ್ರಾರಂಭ (ದಿನ 1)" }, 
    description: { 
      en: "Start of Ashtanhika Parva. Take a vow of absolute Brahmacharya (celibacy). Day 1 Mantra: Om Hreem Nandishwar Sanjnaya Namah.", 
      hi: "अष्टान्हिका महापर्व का प्रारंभ। पूर्ण ब्रह्मचर्य का पालन करें। दिन 1 मंत्र: ॐ ह्रीं नंदीश्वर संज्ञाय नमः।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಆರಂಭ. ಸಂಪೂರ್ಣ ಬ್ರಹ್ಮಚರ್ಯವನ್ನು ಪಾಲಿಸಿ. ದಿನ 1 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ನಂದೀಶ್ವರ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-22": { 
    title: { en: "Ashtanhika (Day 2)", hi: "अष्टान्हिका (दिन 2)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 2)" }, 
    description: { 
      en: "Day 2 of worship. Mantra: Om Hreem Ashtamahavibhuti Sanjnaya Namah.", 
      hi: "आराधना का दूसरा दिन। मंत्र: ॐ ह्रीं अष्टमहाविभूति संज्ञाय नमः।", 
      kn: "ಆರಾಧನೆಯ ಎರಡನೇ ದಿನ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಅಷ್ಟಮಹಾವಿಭೂತಿ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-23": { 
    title: { en: "Ashtanhika (Day 3)", hi: "अष्टान्हिका (दिन 3)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 3)" }, 
    description: { 
      en: "Day 3 of worship. Mantra: Om Hreem Trilokasagara Sanjnaya Namah.", 
      hi: "आराधना का तीसरा दिन। मंत्र: ॐ ह्रीं त्रिलोकसागर संज्ञाय नमः।", 
      kn: "ಆರಾಧನೆಯ ಮೂರನೇ ದಿನ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ತ್ರಿಲೋಕಸಾಗರ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-24": { 
    title: { en: "Ashtanhika (Day 4)", hi: "अष्टान्हिका (दिन 4)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 4)" }, 
    description: { 
      en: "Day 4 of worship. Mantra: Om Hreem Chaturmukha Sanjnaya Namah.", 
      hi: "आराधना का चौथा दिन। मंत्र: ॐ ह्रीं चतुर्मुख संज्ञाय नमः।", 
      kn: "ಆರಾಧನೆಯ ನಾಲ್ಕನೇ ದಿನ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಚತುರ್ಮುಖ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-25": { 
    title: { en: "Ashtanhika (Day 5)", hi: "अष्टान्हिका (दिन 5)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 5)" }, 
    description: { 
      en: "Day 5 of worship. Mantra: Om Hreem Panchamahalakshana Sanjnaya Namah.", 
      hi: "आराधना का पांचवा दिन। मंत्र: ॐ ह्रीं पंचमहालक्षण संज्ञाय नमः।", 
      kn: "ಆರಾಧನೆಯ ಐದನೇ ದಿನ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಪಂಚಮಹಾಲಕ್ಷಣ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-26": { 
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" }, 
    description: { 
      en: "Day 6 of worship. Mantra: Om Hreem Swargasopana Sanjnaya Namah.", 
      hi: "आराधना का छठा दिन। मंत्र: ॐ ह्रीं स्वर्गसोपान संज्ञाय नमः।", 
      kn: "ಆರಾಧನೆಯ ಆರನೇ ದಿನ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸ್ವರ್ಗಸೋಪಾನ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-27": { 
    title: { en: "Ashtanhika (Day 7)", hi: "अष्टान्हिका (दिन 7)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 7)" }, 
    description: { 
      en: "Day 7 of worship. Mantra: Om Hreem Sarvasampatti Sanjnaya Namah.", 
      hi: "आराधना का सातवां दिन। मंत्र: ॐ ह्रीं सर्वसंपत्ति संज्ञाय नमः।", 
      kn: "ಆರಾಧನೆಯ ಏಳನೇ ದಿನ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸರ್ವಸಂಪತ್ತಿ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-28": { 
    title: { en: "Chaturdashi & Ashtanhika (Day 8)", hi: "चतुर्दशी और अष्टान्हिका (दिन 8)", kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 8)" }, 
    description: { 
      en: "Day 8 of Ashtanhika. For this Chaturdashi, strictly fast (Upvas) or take only plain water. Mantra: Om Hreem Indradhwaja Sanjnaya Namah.", 
      hi: "अष्टान्हिका का आठवां दिन। इस चतुर्दशी पर निर्जल या केवल जल का उपवास रखें। मंत्र: ॐ ह्रीं इंद्रध्वज संज्ञाय नमः।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕದ ಎಂಟನೇ ದಿನ. ಈ ಚತುರ್ದಶಿಯಂದು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಉಪವಾಸ ಆಚರಿಸಿ ಅಥವಾ ಕೇವಲ ನೀರು ಸೇವಿಸಿ. ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಇಂದ್ರಧ್ವಜ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-07-29": { 
    title: { en: "Purnima, Ashtanhika Purna & Chaturmas Begins", hi: "पूर्णिमा, अष्टान्हिका पूर्ण और चातुर्मास प्रारंभ", kn: "ಹುಣ್ಣಿಮೆ, ಅಷ್ಟಾಹ್ನಿಕ ಪೂರ್ಣ ಮತ್ತು ಚಾತುರ್ಮಾಸ ಪ್ರಾರಂಭ" }, 
    description: { 
      en: "Conclusion of Ashtanhika Parva and the official beginning of the holy Chaturmas Kal Sthapana.", 
      hi: "अष्टान्हिका महापर्व का समापन और पवित्र चातुर्मास काल की विधिवत स्थापना व शुरुआत।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಸಮಾಪ್ತಿ ಮತ್ತು ಪವಿತ್ರ ಚಾತುರ್ಮಾಸ ಕಾಲದ (ಚಾತುರ್ಮಾಸ ಕಾಲ್ ಸ್ಥಾಪನಾ) ಅಧಿಕೃತ ಆರಂಭ." 
    }, 
    type: "festival" 
  },
  "2026-07-30": { 
    title: { en: "Veer Shasan Jayanti", hi: "वीर शासन जयंती", kn: "ವೀರ ಶಾಸನ ಜಯಂತಿ" }, 
    description: { 
      en: "Yug Parivartan Diwas. The historic day Lord Mahavir delivered his first sermon (Divya Dhwani) in the Samavasaran.", 
      hi: "युग परिवर्तन दिवस। वह ऐतिहासिक दिन जब समवसरण में भगवान महावीर की प्रथम देशना (दिव्य ध्वनि) खिरी थी।", 
      kn: "ಯುಗ ಪರಿವರ್ತನಾ ದಿವಸ. ಸಮವಸರಣದಲ್ಲಿ ಭಗವಾನ್ ಮಹಾವೀರರ ಪ್ರಥಮ ದೇಶನೆ (ದಿವ್ಯ ಧ್ವನಿ) ಮೊಳಗಿದ ಐತಿಹಾಸಿಕ ದಿನ." 
    }, 
    type: "festival" 
  },
  "2026-07-31": { 
    title: { en: "Munisuvratnath Garbha Kalyanak", hi: "मुनिसुव्रतनाथ गर्भ कल्याणक", kn: "ಮುನಿಸುವ್ರತನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Garbha Kalyanak of Lord Munisuvratnath. Reflect on his journey and offer prayers.", 
      hi: "भगवान मुनिसुव्रतनाथ का गर्भ कल्याणक। उनकी जीवन यात्रा का स्मरण करें और पूजा-अर्चना करें।", 
      kn: "ಭಗವಾನ್ ಮುನಿಸುವ್ರತನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಅವರ ಜೀವನ ಪಯಣವನ್ನು ಸ್ಮರಿಸಿ ಮತ್ತು ಪೂಜೆ ಸಲ್ಲಿಸಿ." 
    }, 
    type: "kalyanak" 
  },

  // ================= AUGUST 2026 =================
  "2026-08-06": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Day of self-discipline. Take a strict vow of Hari Tyag (no green vegetables) today and spend an hour reading Jinagam.", 
      hi: "आत्म-अनुशासन का दिन। आज हरी सब्जियों का पूर्ण त्याग (हरी त्याग) करें और एक घंटा जिनागम पढ़ने का नियम लें।", 
      kn: "ಆತ್ಮ-ಶಿಸ್ತಿನ ದಿನ. ಇಂದು ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ (ಹರಿ ತ್ಯಾಗ) ಕಠಿಣ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಜಿನಾಗಮ ಓದಿ." 
    }, 
    type: "tithi" 
  },
  "2026-08-08": { 
    title: { en: "Kunthunath Moksha Kalyanak & Rohini Vrat", hi: "कुंथुनाथ मोक्ष कल्याणक और रोहिणी व्रत", kn: "ಕುಂಥುನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ ಮತ್ತು ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Lord Kunthunath attained Nirvana. Observe Rohini Vrat today for spiritual upliftment and offer Nirvana Ladoo.", 
      hi: "भगवान कुंथुनाथ को मोक्ष की प्राप्ति हुई। आत्मिक उन्नति के लिए आज रोहिणी व्रत का पालन करें और निर्वाण लाडू चढ़ाएं।", 
      kn: "ಭಗವಾನ್ ಕುಂಥುನಾಥರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಆತ್ಮೋದ್ಧಾರಕ್ಕಾಗಿ ಇಂದು ರೋಹಿಣಿ ವ್ರತ ಆಚರಿಸಿ ಮತ್ತು ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-08-11": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Spiritual detox day. Observe Ekashana (eating only one meal) and take a vow to remain completely silent (Maun) for one hour.", 
      hi: "आध्यात्मिक शुद्धि का दिन। आज एकाशन (दिन में एक बार भोजन) करें और एक घंटे का पूर्ण मौन रखने का नियम लें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಶುದ್ಧಿಯ ದಿನ. ಇಂದು ಏಕಾಷನ (ದಿನಕ್ಕೊಮ್ಮೆ ಮಾತ್ರ ಊಟ) ಆಚರಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಸಂಪೂರ್ಣ ಮೌನ ವ್ರತ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-08-12": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "A day for profound internal silence. Focus on meditation, maintain a Sattvic diet, and chant 'Om Namah Siddhebhyah'.", 
      hi: "गहन आंतरिक शांति का दिन। ध्यान पर केंद्रित रहें, सात्विक आहार लें और 'ॐ नमः सिद्धेभ्यः' का निरंतर जाप करें।", 
      kn: "ಗಾಢ ಆಂತರಿಕ ಶಾಂತಿಯ ದಿನ. ಧ್ಯಾನದತ್ತ ಗಮನಹರಿಸಿ, ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು 'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಎಂದು ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-08-14": { 
    title: { en: "Sumatinath Garbha Kalyanak", hi: "सुमतिनाथ गर्भ कल्याणक", kn: "ಸುಮತಿನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The auspicious descent of the 5th Tirthankar, Lord Sumatinath, into the womb. Engage in deep devotion today.", 
      hi: "५वें तीर्थंकर भगवान सुमतिनाथ का मंगलमय गर्भ कल्याणक। आज का दिन गहरी भक्ति और वंदना में व्यतीत करें।", 
      kn: "೫ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಸುಮತಿನಾಥರ ಶುಭ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಇಂದಿನ ದಿನವನ್ನು ಆಳವಾದ ಭಕ್ತಿಯಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-08-15": { 
    title: { en: "Independence Day", hi: "स्वतंत्रता दिवस", kn: "ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ" }, 
    description: { 
      en: "Celebrate the freedom of our nation. Simultaneously, strive for the ultimate freedom of the soul from karmic bonds (Moksha).", 
      hi: "राष्ट्र की स्वतंत्रता का उत्सव मनाएं। साथ ही, कर्म बंधनों से आत्मा की परम स्वतंत्रता (मोक्ष) के लिए भी प्रयास करें।", 
      kn: "ನಮ್ಮ ರಾಷ್ಟ್ರದ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ಆಚರಿಸಿ. ಅದೇ ಸಮಯದಲ್ಲಿ, ಕರ್ಮ ಬಂಧನಗಳಿಂದ ಆತ್ಮದ ಅಂತಿಮ ಸ್ವಾತಂತ್ರ್ಯಕ್ಕಾಗಿ (ಮೋಕ್ಷ) ಶ್ರಮಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-08-18": { 
    title: { en: "Neminath Janma & Tap Kalyanak", hi: "नेमिनाथ जन्म और तप कल्याणक", kn: "ನೇಮಿನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of Lord Neminath. Perform special Abhishek and Jinendra worship today.", 
      hi: "भगवान नेमिनाथ का जन्म और तप (दीक्षा) कल्याणक। आज मंदिर जी जाकर विशेष अभिषेक और जिनेन्द्र आराधना करें।", 
      kn: "ಭಗವಾನ್ ನೇಮಿನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಇಂದು ವಿಶೇಷ ಅಭಿಷೇಕ ಮತ್ತು ಜಿನೇಂದ್ರ ಆರಾಧನೆ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-08-19": { 
    title: { en: "Parshvanath Moksha Kalyanak (Moksha Saptami)", hi: "पार्श्वनाथ मोक्ष कल्याणक (मोक्ष सप्तमी)", kn: "ಪಾರ್ಶ್ವನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ (ಮೋಕ್ಷ ಸಪ್ತಮಿ)" }, 
    description: { 
      en: "Mukut Saptami. The highly revered day Lord Parshvanath attained Nirvana. Offer special prayers and Nirvana Ladoo.", 
      hi: "मुकुट सप्तमी। वह परम पावन दिन जब भगवान पार्श्वनाथ को निर्वाण प्राप्त हुआ था। आज विशेष पूजा और निर्वाण लाडू अर्पित करें।", 
      kn: "ಮುಕುಟ ಸಪ್ತಮಿ. ಭಗವಾನ್ ಪಾರ್ಶ್ವನಾಥರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿಯಾದ ಅತ್ಯಂತ ಪೂಜ್ಯ ದಿನ. ವಿಶೇಷ ಪೂಜೆ ಸಲ್ಲಿಸಿ ಮತ್ತು ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-08-20": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Practice mindfulness. Take a strict vow of Ratri Bhojan Tyag (no eating after sunset) and observe Brahmacharya.", 
      hi: "जागरूकता का अभ्यास करें। आज रात्रि भोजन का पूर्ण त्याग करें और दृढ़ता से ब्रह्मचर्य का पालन करें।", 
      kn: "ಎಚ್ಚರಿಕೆಯ ಅಭ್ಯಾಸ ಮಾಡಿ. ಇಂದು ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ ಕಠಿಣ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಬ್ರಹ್ಮಚರ್ಯ ಆಚರಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-08-27": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Control your senses today. Take a vow of Rasa Tyag by giving up your most craved taste (like sugar, salt, or oil).", 
      hi: "आज अपनी इंद्रियों को नियंत्रित करें। अपने किसी पसंदीदा स्वाद (जैसे मीठा, नमक, या तेल) को छोड़ने का रस त्याग नियम लें।", 
      kn: "ಇಂದು ನಿಮ್ಮ ಇಂದ್ರಿಯಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ. ನಿಮ್ಮ ನೆಚ್ಚಿನ ರುಚಿಯನ್ನು (ಸಿಹಿ, ಉಪ್ಪು ಅಥವಾ ಎಣ್ಣೆ) ಬಿಡುವ ಮೂಲಕ ರಸ ತ್ಯಾಗದ ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-08-28": { 
    title: { en: "Purnima, Raksha Bandhan & Shreyansnath Moksha Kalyanak", hi: "पूर्णिमा, रक्षाबंधन और श्रेयांसनाथ मोक्ष कल्याणक", kn: "ಹುಣ್ಣಿಮೆ, ರಕ್ಷಾ ಬಂಧನ ಮತ್ತು ಶ್ರೇಯಾಂಸನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Shreyansnath attained Moksha. Also, celebrate true 'Raksha' by remembering how Vishnukumar Muni saved 700 Jain monks.", 
      hi: "भगवान श्रेयांसनाथ का मोक्ष कल्याणक। आज विष्णु कुमार मुनि द्वारा ७०० मुनियों की रक्षा के स्मरण के साथ सच्चा रक्षाबंधन मनाएं।", 
      kn: "ಭಗವಾನ್ ಶ್ರೇಯಾಂಸನಾಥರ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ. ಹಾಗೂ, ವಿಷ್ಣುಕುಮಾರ ಮುನಿಗಳು ೭೦೦ ಮುನಿಗಳನ್ನು ರಕ್ಷಿಸಿದ ಸ್ಮರಣೆಯೊಂದಿಗೆ ನಿಜವಾದ ರಕ್ಷಾಬಂಧನವನ್ನು ಆಚರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-08-29": { 
    title: { en: "Solahkaran Vrat Begins", hi: "सोलहकारण व्रत प्रारंभ", kn: "ಸೋಲಹಕಾರಣ ವ್ರತ ಪ್ರಾರಂಭ" }, 
    description: { 
      en: "The beginning of the 32-day Solahkaran Vrat. Reflect deeply on the 16 virtues (Bhavnas) that lead to the Tirthankar status.", 
      hi: "३२-दिवसीय सोलहकारण व्रत का पवित्र प्रारंभ। तीर्थंकर प्रकृति का बंध कराने वाली १६ भावनाओं का गहराई से चिंतन करें।", 
      kn: "೩೨-ದಿನಗಳ ಸೋಲಹಕಾರಣ ವ್ರತದ ಪವಿತ್ರ ಆರಂಭ. ತೀರ್ಥಂಕರ ಪದವಿಗೆ ಕಾರಣವಾಗುವ ೧೬ ಭಾವನೆಗಳನ್ನು ಆಳವಾಗಿ ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "festival" 
  },

  // ================= SEPTEMBER 2026 =================
  "2026-09-03": { 
    title: { en: "Mallinath Garbha Kalyanak", hi: "मल्लिनाथ गर्भ कल्याणक", kn: "ಮಲ್ಲಿನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Descent of the 19th Tirthankar, Lord Mallinath, into the womb. Dedicate time to profound devotion today.", 
      hi: "१९वें तीर्थंकर भगवान मल्लिनाथ का गर्भ कल्याणक। आज का समय गहरी भक्ति और ध्यान में व्यतीत करें।", 
      kn: "೧೯ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಇಂದಿನ ಸಮಯವನ್ನು ಆಳವಾದ ಭಕ್ತಿಯಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-09-04": { 
    title: { en: "Ashtami & Rohini Vrat", hi: "अष्टमी और रोहिणी व्रत", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Observe Rohini Vrat. For Ashtami, take a vow of Ekashana (one meal) and strictly avoid all root and green vegetables.", 
      hi: "रोहिणी व्रत। अष्टमी के लिए आज एकाशन का नियम लें और ज़मीकंद तथा हरी सब्जियों का पूर्ण त्याग करें।", 
      kn: "ರೋಹಿಣಿ ವ್ರತ. ಅಷ್ಟಮಿಯ ಪ್ರಯುಕ್ತ ಏಕಾಷನ (ದಿನಕ್ಕೊಮ್ಮೆ ಊಟ) ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಬೇರು ಹಾಗೂ ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-09-10": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Day of spiritual cleansing. Take a vow to avoid all digital entertainment today and spend an hour in Swadhyay.", 
      hi: "आध्यात्मिक शुद्धि का दिन। आज सभी डिजिटल मनोरंजन का त्याग करें और एक घंटा स्वाध्याय का नियम लें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಶುದ್ಧಿಯ ದಿನ. ಇಂದು ಎಲ್ಲಾ ಡಿಜಿಟಲ್ ಮನರಂಜನೆಯನ್ನು ತ್ಯಜಿಸುವ ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಸ್ವಾಧ್ಯಾಯ ಮಾಡಿ." 
    }, 
    type: "tithi" 
  },
  "2026-09-11": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "Focus entirely on inner peace. Maintain strict Maun (silence) for two hours and chant 'Om Namah Siddhebhyah'.", 
      hi: "आंतरिक शांति पर ध्यान दें। दो घंटे का पूर्ण मौन रखें और 'ॐ नमः सिद्धेभ्यः' का निरंतर जाप करें।", 
      kn: "ಆಂತರಿಕ ಶಾಂತಿಯತ್ತ ಗಮನಹರಿಸಿ. ಎರಡು ಗಂಟೆಗಳ ಕಾಲ ಸಂಪೂರ್ಣ ಮೌನ ವ್ರತ ಪಾಲಿಸಿ ಮತ್ತು 'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಎಂದು ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  
  // --- DAS LAKSHAN PARVA ---
  "2026-09-15": {
    title: { en: "Das Lakshan Begins (Uttam Kshama)", hi: "दशलक्षण पर्व प्रारंभ (उत्तम क्षमा)", kn: "ದಶಲಕ್ಷಣ ಪರ್ವ ಪ್ರಾರಂಭ (ಉತ್ತಮ ಕ್ಷಮಾ)" },
    description: {
      en: "Dharma: Uttam Kshama (Supreme Forgiveness). Let go of anger and resentments. Seek and offer forgiveness to all beings.",
      hi: "धर्म: उत्तम क्षमा। क्रोध और द्वेष का त्याग करें। सभी जीवों से क्षमा मांगें और सबको क्षमा करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಕ್ಷಮಾ (ಶ್ರೇಷ್ಠ ಕ್ಷಮೆ). ಕೋಪ ಮತ್ತು ದ್ವೇಷವನ್ನು ತ್ಯಜಿಸಿ. ಎಲ್ಲಾ ಜೀವಿಗಳಿಂದ ಕ್ಷಮೆ ಕೇಳಿ ಮತ್ತು ಕ್ಷಮಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-16": {
    title: { en: "Das Lakshan (Uttam Mardava)", hi: "दशलक्षण (उत्तम मार्दव)", kn: "ದಶಲಕ್ಷಣ (ಉತ್ತಮ ಮಾರ್ಧವ)" },
    description: {
      en: "Dharma: Uttam Mardava (Supreme Humility). Crush your ego and pride. Recognize that wealth, beauty, and status are temporary.",
      hi: "धर्म: उत्तम मार्दव। अपने अहंकार और मान कषाय का त्याग करें। धन, रूप और पद की नश्वरता को समझें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಮಾರ್ಧವ (ಶ್ರೇಷ್ಠ ವಿನಯ). ಅಹಂಕಾರ ಮತ್ತು ಗರ್ವವನ್ನು ತ್ಯಜಿಸಿ. ಸಂಪತ್ತು, ಸೌಂದರ್ಯ ಮತ್ತು ಸ್ಥಾನಮಾನಗಳು ಅಶಾಶ್ವತವೆಂದು ಅರಿಯಿರಿ."
    },
    type: "festival"
  },
  "2026-09-17": {
    title: { en: "Uttam Arjava & Pushpadantnath Garbha Kalyanak", hi: "उत्तम आर्जव और पुष्पदंतनाथ गर्भ कल्याणक", kn: "ಉತ್ತಮ ಆರ್ಜವ ಮತ್ತು पुष्पदंतनाथ ಗರ್ಭ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Dharma: Uttam Arjava (Supreme Straightforwardness). Align your thoughts, words, and actions. Also, Garbha Kalyanak of Lord Pushpadantnath.",
      hi: "धर्म: उत्तम आर्जव (मायाचारी का त्याग)। मन, वचन और काय की सरलता अपनाएं। साथ ही भगवान पुष्पदंतनाथ का गर्भ कल्याणक।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಆರ್ಜವ (ಶ್ರೇಷ್ಠ ಸರಳತೆ). ಮನ, ಮಾತು ಮತ್ತು ಕೃತಿಗಳಲ್ಲಿ ಏಕತೆ ಇರಲಿ. ಹಾಗೂ ಭಗವಾನ್ ಪುಷ್ಪದಂತನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "festival"
  },
  "2026-09-18": {
    title: { en: "Ashtami & Das Lakshan (Uttam Satya)", hi: "अष्टमी और दशलक्षण (उत्तम सत्य)", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ದಶಲಕ್ಷಣ (ಉತ್ತಮ ಸತ್ಯ)" },
    description: {
      en: "Dharma: Uttam Satya (Supreme Truth). Speak only what is true, beneficial, and pleasant. Ashtami fast is recommended today.",
      hi: "धर्म: उत्तम सत्य। केवल वही बोलें जो सत्य, हितकर और प्रिय हो। आज अष्टमी के दिन उपवास या एकाशन करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಸತ್ಯ (ಶ್ರೇಷ್ಠ ಸತ್ಯ). ಸತ್ಯ, ಹಿತಕರ ಮತ್ತು ಪ್ರಿಯವಾದದ್ದನ್ನು ಮಾತ್ರ ಮಾತನಾಡಿ. ಅಷ್ಟಮಿಯಂದು ಉಪವಾಸ ಮಾಡುವುದು ಸೂಕ್ತ."
    },
    type: "festival"
  },
  "2026-09-19": {
    title: { en: "Uttam Shauch, Sugandh Dashami & Pushpadantnath Moksha Kalyanak", hi: "उत्तम शौच, सुगंध दशमी और पुष्पदंतनाथ मोक्ष कल्याणक", kn: "ಉತ್ತಮ ಶೌಚ, ಸುಗಂಧ ದಶಮಿ ಮತ್ತು ಪುಷ್ಪದಂತನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Dharma: Uttam Shauch (Purity/No Greed). Lord Pushpadantnath attained Moksha today. Offer Dhoop in the temple for Sugandh Dashami.",
      hi: "धर्म: उत्तम शौच (लोभ का त्याग)। भगवान पुष्पदंतनाथ का मोक्ष कल्याणक। सुगंध दशमी पर मंदिर जी में धूप खेवें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಶೌಚ (ಪಾವಿತ್ರ್ಯತೆ/ಲೋಭ ತ್ಯಾಗ). ಭಗವಾನ್ ಪುಷ್ಪದಂತನಾಥರಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಸುಗಂಧ ದಶಮಿಯ ಪ್ರಯುಕ್ತ ಜಿನಮಂದಿರದಲ್ಲಿ ಧೂಪ ಅರ್ಪಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-20": {
    title: { en: "Das Lakshan (Uttam Sanyam)", hi: "दशलक्षण (उत्तम संयम)", kn: "ದಶಲಕ್ಷಣ (ಉತ್ತಮ ಸಂಯಮ)" },
    description: {
      en: "Dharma: Uttam Sanyam (Supreme Restraint). Control your five senses and strictly avoid harming any living beings.",
      hi: "धर्म: उत्तम संयम। अपनी पांचों इंद्रियों पर नियंत्रण रखें और किसी भी जीव को कष्ट न पहुंचाने का दृढ़ संकल्प लें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಸಂಯಮ (ಶ್ರೇಷ್ಠ ಸಂಯಮ). ಪಂಚೇಂದ್ರಿಯಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ ಮತ್ತು ಯಾವುದೇ ಜೀವಿಗೆ ಹಿಂಸೆ ಮಾಡದಿರುವ ಸಂಕಲ್ಪ ಮಾಡಿ."
    },
    type: "festival"
  },
  "2026-09-21": {
    title: { en: "Das Lakshan (Uttam Tap)", hi: "दशलक्षण (उत्तम तप)", kn: "ದಶಲಕ್ಷಣ (ಉತ್ತಮ ತಪ)" },
    description: {
      en: "Dharma: Uttam Tap (Supreme Penance). Undertake austerities and fasting to burn away accumulated karmas.",
      hi: "धर्म: उत्तम तप। संचित कर्मों की निर्जरा के लिए अपनी क्षमता अनुसार उपवास या तपस्या करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ತಪ (ಶ್ರೇಷ್ಠ ತಪಸ್ಸು). ಸಂಚಿತ ಕರ್ಮಗಳನ್ನು ಸುಡಲು ಉಪವಾಸ ಮತ್ತು ತಪಸ್ಸು ಆಚರಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-22": {
    title: { en: "Das Lakshan (Uttam Tyag)", hi: "दशलक्षण (उत्तम त्याग)", kn: "ದಶಲಕ್ಷಣ (ಉತ್ತಮ ತ್ಯಾಗ)" },
    description: {
      en: "Dharma: Uttam Tyag (Supreme Renunciation). Give up internal attachments and donate generously to appropriate causes.",
      hi: "धर्म: उत्तम त्याग। आंतरिक मोह और परिग्रह का त्याग करें, तथा सुपात्र दान दें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ತ್ಯಾಗ (ಶ್ರೇಷ್ಠ ತ್ಯಾಗ). ಆಂತರಿಕ ವ್ಯಾಮೋಹಗಳನ್ನು ತ್ಯಜಿಸಿ ಮತ್ತು ಸತ್ಪಾತ್ರರಿಗೆ ದಾನ ಮಾಡಿ."
    },
    type: "festival"
  },
  "2026-09-23": {
    title: { en: "Das Lakshan (Uttam Akinchanya)", hi: "दशलक्षण (उत्तम आकिंचन्य)", kn: "ದಶಲಕ್ಷಣ (ಉತ್ತಮ ಆಕಿಂಚನ್ಯ)" },
    description: {
      en: "Dharma: Uttam Akinchanya (Supreme Non-Attachment). Realize the absolute truth: 'Nothing in this world belongs to me, except my soul.'",
      hi: "धर्म: उत्तम आकिंचन्य। इस परम सत्य का अनुभव करें: 'इस संसार में मेरी आत्मा के अतिरिक्त मेरा कुछ भी नहीं है।'",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಆಕಿಂಚನ್ಯ (ಶ್ರೇಷ್ಠ ಅನಾಸಕ್ತಿ). 'ಈ ಪ್ರಪಂಚದಲ್ಲಿ ನನ್ನ ಆತ್ಮವನ್ನು ಹೊರತುಪಡಿಸಿ ನನ್ನದು ಯಾವುದೂ ಇಲ್ಲ' ಎಂಬ ಪರಮ ಸತ್ಯವನ್ನು ಅರಿಯಿರಿ."
    },
    type: "festival"
  },
  "2026-09-24": {
    title: { en: "Das Lakshan (Uttam Brahmacharya)", hi: "दशलक्षण (उत्तम ब्रह्मचर्य)", kn: "ದಶಲಕ್ಷಣ (ಉತ್ತಮ ಬ್ರಹ್ಮಚರ್ಯ)" },
    description: {
      en: "Dharma: Uttam Brahmacharya (Supreme Celibacy). Withdraw from physical desires and dwell completely within the pure nature of the soul.",
      hi: "धर्म: उत्तम ब्रह्मचर्य। शारीरिक वासनाओं से दूर रहें और अपनी आत्मा के शुद्ध स्वरूप में रमण करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಬ್ರಹ್ಮಚರ್ಯ (ಶ್ರೇಷ್ಠ ಬ್ರಹ್ಮಚರ್ಯ). ದೈಹಿಕ ಆಸೆಗಳಿಂದ ದೂರವಿರಿ ಮತ್ತು ಆತ್ಮದ ಶುದ್ಧ ಸ್ವರೂಪದಲ್ಲಿ ಲೀನವಾಗಿ."
    },
    type: "festival"
  },
  "2026-09-25": {
    title: { en: "Anant Chaturdashi & Vasupujya Moksha Kalyanak", hi: "अनंत चतुर्दशी और वासुपूज्य मोक्ष कल्याणक", kn: "ಅನಂತ ಚತುರ್ದಶಿ ಮತ್ತು ವಾಸುಪೂಜ್ಯ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Das Lakshan Ends. The highest day of fasting and spiritual devotion. Lord Vasupujya attained Moksha today.",
      hi: "दशलक्षण महापर्व का समापन। उपवास और साधना का सबसे बड़ा दिन। भगवान वासुपूज्य का मोक्ष कल्याणक।",
      kn: "ದಶಲಕ್ಷಣ ಮಹಾಪರ್ವ ಸಮಾಪ್ತಿ. ಉಪವಾಸ ಮತ್ತು ಸಾಧನೆಯ ಅತಿ ದೊಡ್ಡ ದಿನ. ಭಗವಾನ್ ವಾಸುಪೂಜ್ಯರಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ."
    },
    type: "festival"
  },
  "2026-09-26": {
    title: { en: "Purnima & Shodashkaran Ends", hi: "पूर्णिमा और षोडशकारण समापन", kn: "ಹುಣ್ಣಿಮೆ ಮತ್ತು ಷೋಡಶಕಾರಣ ಸಮಾಪ್ತಿ" },
    description: {
      en: "Conclusion of the 32-day Shodashkaran Vrat. Perform concluding Aarti and reflect on the 16 virtues.",
      hi: "३२-दिवसीय षोडशकारण व्रत का समापन। संध्या आरती करें और १६ भावनाओं का अंतिम चिंतन करें।",
      kn: "೩೨-ದಿನಗಳ ಷೋಡಶಕಾರಣ ವ್ರತದ ಸಮಾಪ್ತಿ. ಸಂಜೆ ಆರತಿ ಮಾಡಿ ಮತ್ತು ೧೬ ಭಾವನೆಗಳನ್ನು ಅವಲೋಕಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-27": {
    title: { en: "Kshamavani Parva", hi: "क्षमावाणी पर्व", kn: "ಕ್ಷಮಾವಾಣಿ ಪರ್ವ" },
    description: {
      en: "The Universal Day of Forgiveness. 'Micchami Dukkadam' — May all the evil that has been done be fruitless. Forgive and seek forgiveness.",
      hi: "सार्वभौमिक क्षमा पर्व। 'मिच्छामि दुक्कडम्' — जाने-अनजाने की गई सभी गलतियों के लिए क्षमा मांगें और सबको क्षमा करें।",
      kn: "ಸಾರ್ವತ್ರಿಕ ಕ್ಷಮಾ ಪರ್ವ. 'ಮಿಚ್ಛಾಮಿ ದುಕ್ಕಡಮ್' - ತಿಳಿದೋ-ತಿಳಿಯದೆಯೋ ಮಾಡಿದ ಎಲ್ಲಾ ತಪ್ಪುಗಳಿಗೆ ಕ್ಷಮೆ ಕೇಳಿ ಮತ್ತು ಎಲ್ಲರನ್ನೂ ಕ್ಷಮಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-28": {
    title: { en: "Neminath Garbha Kalyanak", hi: "नेमिनाथ गर्भ कल्याणक", kn: "ನೇಮಿನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Descent of Lord Neminath into the womb. Honor his legacy of immense compassion towards animals.",
      hi: "भगवान नेमिनाथ का गर्भ कल्याणक। पशुओं के प्रति उनकी असीम करुणा और वैराग्य का स्मरण करें।",
      kn: "ಭಗವಾನ್ ನೇಮಿನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಪ್ರಾಣಿಗಳ ಮೇಲಿನ ಅವರ ಅಪಾರ ಕರುಣೆಯನ್ನು ಸ್ಮರಿಸಿ."
    },
    type: "kalyanak"
  },

  // ================= OCTOBER 2026 =================
  "2026-10-01": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "First Rohini Vrat of the month. Keep a fast or observe Ekashana to practice spiritual discipline.", 
      hi: "माह का पहला रोहिणी व्रत। आध्यात्मिक अनुशासन के लिए उपवास या एकाशन का पालन करें।", 
      kn: "ತಿಂಗಳ ಮೊದಲ ರೋಹಿಣಿ ವ್ರತ. ಆಧ್ಯಾತ್ಮಿಕ ಶಿಸ್ತಿಗಾಗಿ ಉಪವಾಸ ಅಥವಾ ಏಕಾಷನ ಪಾಲಿಸಿ." 
    }, 
    type: "festival" 
  },
  "2026-10-02": { 
    title: { en: "Intl. Ahimsa Day", hi: "अंतर्राष्ट्रीय अहिंसा दिवस", kn: "ಅಂತರರಾಷ್ಟ್ರೀಯ ಅಹಿಂಸಾ ದಿನ" }, 
    description: { 
      en: "Celebrate the supreme principle of Ahimsa (Non-Violence). Resolve to practice non-violence in thought, word, and deed today.", 
      hi: "अहिंसा परम धर्म है। आज मन, वचन और कर्म से पूर्ण अहिंसा का पालन करने का दृढ़ संकल्प लें।", 
      kn: "ಅಹಿಂಸೆಯ ಪರಮ ತತ್ವವನ್ನು ಆಚರಿಸಿ. ಇಂದು ಮನ, ಮಾತು ಮತ್ತು ಕೃತಿಯಲ್ಲಿ ಅಹಿಂಸೆಯನ್ನು ಪಾಲಿಸುವ ಸಂಕಲ್ಪ ಮಾಡಿ." 
    }, 
    type: "festival" 
  },
  "2026-10-03": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "A day for self-restraint. Take a vow of Hari Tyag (abstain from all green vegetables) and limit your screen time.", 
      hi: "आत्म-संयम का दिन। आज हरी सब्जियों का त्याग करें (हरी त्याग) और मोबाइल/टीवी का उपयोग कम करने का नियम लें।", 
      kn: "ಆತ್ಮ-ಸಂಯಮದ ದಿನ. ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸುವ (ಹರಿ ತ್ಯಾಗ) ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಸ್ಕ್ರೀನ್ ಸಮಯವನ್ನು ಮಿತಿಗೊಳಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-10-09": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Focus on inner purification. Observe a strict fast (Upvas) or Ekashana, and maintain silence (Maun) for one hour.", 
      hi: "आंतरिक शुद्धि पर ध्यान दें। आज उपवास या एकाशन करें, और कम से कम एक घंटे का मौन व्रत रखें।", 
      kn: "ಆಂತರಿಕ ಶುದ್ಧಿಯತ್ತ ಗಮನಹರಿಸಿ. ಕಟ್ಟುನಿಟ್ಟಾದ ಉಪವಾಸ ಅಥವಾ ಏಕಾಷನ ಆಚರಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಮೌನ ವ್ರತ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-10-10": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "A day of deep internal reflection. Keep a simple, Sattvic diet and chant the Namokar Mantra 108 times.", 
      hi: "गहन आत्म-चिंतन का दिन। सादा और सात्विक आहार लें तथा १०८ बार णमोकार मंत्र का जाप करें।", 
      kn: "ಗಾಢ ಆತ್ಮ-ಚಿಂತನೆಯ ದಿನ. ಸರಳ ಮತ್ತು ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಹಾಗೂ ೧೦೮ ಬಾರಿ ಣಮೋಕಾರ ಮಂತ್ರ ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-10-11": { 
    title: { en: "Padmaprabha Kevalgyan Kalyanak", hi: "पद्मप्रभ केवलज्ञान कल्याणक", kn: "ಪದ್ಮಪ್ರಭ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The supreme moment when the 6th Tirthankar, Lord Padmaprabha, attained Omniscience. Perform Jinendra worship today.", 
      hi: "वह परम पावन क्षण जब छठे तीर्थंकर भगवान पद्मप्रभ को केवलज्ञान की प्राप्ति हुई। आज जिनेन्द्र पूजा करें।", 
      kn: "೬ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಪದ್ಮಪ್ರಭರಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ಪರಮ ಪವಿತ್ರ ಕ್ಷಣ. ಇಂದು ಜಿನೇಂದ್ರ ಪೂಜೆ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-10-18": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Practice strict discipline today. Observe Ratri Bhojan Tyag (no eating after sunset) and follow Brahmacharya.", 
      hi: "आज कड़े अनुशासन का पालन करें। रात्रि भोजन का पूर्ण त्याग करें और ब्रह्मचर्य व्रत का पालन करें।", 
      kn: "ಇಂದು ಕಟ್ಟುನಿಟ್ಟಿನ ಶಿಸ್ತು ಪಾಲಿಸಿ. ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ ಮತ್ತು ಬ್ರಹ್ಮಚರ್ಯ ಆಚರಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-10-19": { 
    title: { en: "Sheetalnath Moksha Kalyanak", hi: "शीतलनाथ मोक्ष कल्याणक", kn: "ಶೀತಲನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Lord Sheetalnath attained absolute liberation (Moksha) from Sammed Shikharji. Offer Nirvana Ladoo at the temple.", 
      hi: "भगवान शीतलनाथ को सम्मेद शिखरजी से मोक्ष प्राप्त हुआ। आज मंदिर जी में निर्वाण लाडू अवश्य चढ़ाएं।", 
      kn: "ಭಗವಾನ್ ಶೀತಲನಾಥರಿಗೆ ಸಮ್ಮೇದ ಶಿಖರಜಿಯಿಂದ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಜಿನಮಂದಿರದಲ್ಲಿ ನಿರ್ವಾಣ ಲಾಡು ಅರ್ಪಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-10-20": { 
    title: { en: "Vijayadashami", hi: "विजयादशमी", kn: "ವಿಜಯದಶಮಿ" }, 
    description: { 
      en: "Celebrate the ultimate victory of the soul over inner karmic enemies. An auspicious day to begin new learning or Swadhyay.", 
      hi: "कर्म रूपी शत्रुओं पर आत्मा की विजय का पर्व। नई विद्या या स्वाध्याय प्रारंभ करने के लिए एक अत्यंत शुभ दिन।", 
      kn: "ಕರ್ಮ ಶತ್ರುಗಳ ಮೇಲೆ ಆತ್ಮದ ಅಂತಿಮ ವಿಜಯವನ್ನು ಆಚರಿಸಿ. ಹೊಸ ವಿದ್ಯೆ ಅಥವಾ ಸ್ವಾಧ್ಯಾಯವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಶುಭ ದಿನ." 
    }, 
    type: "festival" 
  },
  "2026-10-25": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "Control your cravings. Take a vow of Rasa Tyag by giving up your most desired taste (like salt, sugar, or ghee) for the day.", 
      hi: "अपनी इच्छाओं को नियंत्रित करें। आज रस त्याग का नियम लें और अपने किसी एक पसंदीदा स्वाद (नमक, मीठा या घी) का त्याग करें।", 
      kn: "ನಿಮ್ಮ ಆಸೆಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ. ಇಡೀ ದಿನ ನಿಮ್ಮ ನೆಚ್ಚಿನ ರುಚಿಯನ್ನು (ಉಪ್ಪು, ಸಿಹಿ ಅಥವಾ ತುಪ್ಪ) ಬಿಡುವ ಮೂಲಕ ರಸ ತ್ಯಾಗದ ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-10-26": { 
    title: { en: "Sharad Purnima & Anantnath Garbha Kalyanak", hi: "शरद पूर्णिमा और अनंतनाथ गर्भ कल्याणक", kn: "ಶರದ್ ಪೂರ್ಣಿಮಾ ಮತ್ತು ಅನಂತನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Auspicious Sharad Purnima. Also marks the descent of Lord Anantnath into the womb. Spend the evening in devotion.", 
      hi: "पवित्र शरद पूर्णिमा। साथ ही भगवान अनंतनाथ का गर्भ कल्याणक। आज की संध्या जिनेन्द्र भक्ति में बिताएं।", 
      kn: "ಪವಿತ್ರ ಶರದ್ ಪೂರ್ಣಿಮಾ. ಹಾಗೂ ಭಗವಾನ್ ಅನಂತನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಸಂಜೆಯನ್ನು ಭಕ್ತಿಯಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-10-29": { 
    title: { en: "Sambhavnath Garbha Kalyanak & Rohini Vrat", hi: "संभवनाथ गर्भ कल्याणक और रोहिणी व्रत", kn: "ಸಂಭವನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ ಮತ್ತು ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Garbha Kalyanak of the 3rd Tirthankar, Lord Sambhavnath. Observe your second Rohini Vrat of the month today.", 
      hi: "तीसरे तीर्थंकर भगवान संभवनाथ का गर्भ कल्याणक। आत्म-शुद्धि के लिए आज माह का दूसरा रोहिणी व्रत रखें।", 
      kn: "೩ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಸಂಭವನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ. ಆತ್ಮ-ಶುದ್ಧಿಗಾಗಿ ಇಂದು ತಿಂಗಳ ಎರಡನೇ ರೋಹಿಣಿ ವ್ರತ ಆಚರಿಸಿ." 
    }, 
    type: "kalyanak" 
  },

  // ================= NOVEMBER 2026 =================
  "2026-11-02": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Take a vow of self-discipline today. Practice Ekashana (eating one meal) and completely abstain from root vegetables.", 
      hi: "आत्म-अनुशासन का संकल्प लें। आज एकाशन का पालन करें और ज़मीकंद (आलू, प्याज आदि) का पूर्ण रूप से त्याग करें।", 
      kn: "ಇಂದು ಆತ್ಮ-ಶಿಸ್ತಿನ ಸಂಕಲ್ಪ ಮಾಡಿ. ಏಕಾಷನ (ಒಂದು ಊಟ) ಪಾಲಿಸಿ ಮತ್ತು ಬೇರು ತರಕಾರಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-11-07": { 
    title: { en: "Dhanteras", hi: "धनतेरस", kn: "ಧನತ್ರಯೋದಶಿ" }, 
    description: { 
      en: "Worship the 'Divya Dhwani' (Divine Knowledge) of the Tirthankars, which is the true wealth of a soul, rather than material gold.", 
      hi: "तीर्थंकरों की 'दिव्य ध्वनि' (सच्चा ज्ञान) की पूजा करें, जो आत्मा का वास्तविक धन है, न कि भौतिक सोने-चांदी की।", 
      kn: "ತೀರ್ಥಂಕರರ 'ದಿವ್ಯ ಧ್ವನಿಯನ್ನು' (ನಿಜವಾದ ಜ್ಞಾನ) ಪೂಜಿಸಿ, ಇದು ಆತ್ಮದ ನಿಜವಾದ ಸಂಪತ್ತು, ಭೌತಿಕ ಚಿನ್ನ-ಬೆಳ್ಳಿಯಲ್ಲ." 
    }, 
    type: "festival" 
  },
  "2026-11-08": { 
    title: { en: "Chaturdashi (Roop Chaturdashi)", hi: "चतुर्दशी (रूप चतुर्दशी)", kn: "ಚತುರ್ದಶಿ (ರೂಪ ಚತುರ್ದಶಿ)" }, 
    description: { 
      en: "Focus on internal purity. Begin preparations for the upcoming Nirvana Mahotsav of Lord Mahavir. Fasting is recommended.", 
      hi: "आंतरिक पवित्रता पर ध्यान दें। भगवान महावीर के आगामी निर्वाण महोत्सव की तैयारी शुरू करें। उपवास रखना शुभ है।", 
      kn: "ಆಂತರಿಕ ಪಾವಿತ್ರ್ಯತೆಯತ್ತ ಗಮನಹರಿಸಿ. ಭಗವಾನ್ ಮಹಾವೀರರ ಮುಂಬರುವ ನಿರ್ವಾಣ ಮಹೋತ್ಸವಕ್ಕೆ ಸಿದ್ಧತೆ ಪ್ರಾರಂಭಿಸಿ. ಉಪವಾಸ ಮಾಡುವುದು ಶುಭ." 
    }, 
    type: "tithi" 
  },
  "2026-11-10": { 
    title: { en: "Mahavir Moksha Kalyanak (Deepavali)", hi: "महावीर मोक्ष कल्याणक (दीपावली)", kn: "ಮಹಾವೀರ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ (ದೀಪಾವಳಿ)" }, 
    description: { 
      en: "The supreme day Lord Mahavir attained Nirvana. Offer 'Nirvana Ladoo' early morning and light the lamp of true knowledge.", 
      hi: "वह परम पावन दिन जब भगवान महावीर को मोक्ष प्राप्त हुआ था। प्रातः काल 'निर्वाण लाडू' चढ़ाएं और सच्चे ज्ञान का दीपक जलाएं।", 
      kn: "ಭಗವಾನ್ ಮಹಾವೀರರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿಯಾದ ಪರಮ ಪವಿತ್ರ ದಿನ. ಮುಂಜಾನೆ 'ನಿರ್ವಾಣ ಲಾಡು' ಅರ್ಪಿಸಿ ಮತ್ತು ನಿಜವಾದ ಜ್ಞಾನದ ದೀಪ ಬೆಳಗಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-11-11": { 
    title: { en: "Gautam Swami Kevalgyan", hi: "गौतम स्वामी केवलज्ञान", kn: "ಗೌತಮ ಸ್ವಾಮಿ ಕೇವಲಜ್ಞಾನ" }, 
    description: { 
      en: "Gautam Gandhar attained Omniscience (Kevalgyan) upon hearing the news of Lord Mahavir's Nirvana.", 
      hi: "भगवान महावीर के मोक्ष गमन का समाचार सुनकर प्रथम गणधर गौतम स्वामी को केवलज्ञान की प्राप्ति हुई।", 
      kn: "ಭಗವಾನ್ ಮಹಾವೀರರ ನಿರ್ವಾಣದ ಸುದ್ದಿ ಕೇಳಿ ಪ್ರಥಮ ಗಣಧರ ಗೌತಮ ಸ್ವಾಮಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ." 
    }, 
    type: "festival" 
  },
  
  // --- ASHTANHIKA PARVA (NOV SERIES) ---
  "2026-11-17": { 
    title: { en: "Ashtami & Ashtanhika Begins", hi: "अष्टमी और अष्टान्हिका प्रारंभ", kn: "ಅಷ್ಟಮಿ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ ಪ್ರಾರಂಭ" }, 
    description: { 
      en: "The 8-day festival of celestial worship begins. Observe strict Brahmacharya. Day 1 Mantra: Om Hreem Nandishwar Sanjnaya Namah.", 
      hi: "नंदीश्वर द्वीप की वंदना का ८-दिवसीय महापर्व प्रारंभ। पूर्ण ब्रह्मचर्य का पालन करें। दिन 1 मंत्र: ॐ ह्रीं नंदीश्वर संज्ञाय नमः।", 
      kn: "ನಂದೀಶ್ವರ ದ್ವೀಪದ ಆರಾಧನೆಯ ೮-ದಿನಗಳ ಮಹಾಪರ್ವ ಆರಂಭ. ಸಂಪೂರ್ಣ ಬ್ರಹ್ಮಚರ್ಯ ಪಾಲಿಸಿ. ದಿನ 1 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ನಂದೀಶ್ವರ ಸಂಜ್ಞಾಯ ನಮಃ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-11-18": { 
    title: { en: "Ashtanhika (Day 2)", hi: "अष्टान्हिका (दिन 2)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 2)" }, 
    description: { 
      en: "Day 2 of Dev-Shastra-Guru worship. Engage in deep Swadhyay and maintain a Sattvic diet.", 
      hi: "आराधना का दूसरा दिन। देव-शास्त्र-गुरु की पूजा करें, गहन स्वाध्याय करें और सात्विक आहार लें।", 
      kn: "ಆರಾಧನೆಯ ಎರಡನೇ ದಿನ. ದೇವ-ಶಾಸ್ತ್ರ-ಗುರುಗಳ ಪೂಜೆ ಮಾಡಿ, ಆಳವಾದ ಸ್ವಾಧ್ಯಾಯ ಮಾಡಿ ಮತ್ತು ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-11-19": { 
    title: { en: "Ashtanhika (Day 3)", hi: "अष्टान्हिका (दिन 3)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 3)" }, 
    description: { 
      en: "Day 3 of Ashtanhika. Practice Maun (silence) for a designated period to conserve spiritual energy.", 
      hi: "अष्टान्हिका का तीसरा दिन। अपनी आत्मिक ऊर्जा को संरक्षित करने के लिए कुछ समय मौन का अभ्यास करें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕದ ಮೂರನೇ ದಿನ. ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಯನ್ನು ಉಳಿಸಲು ಸ್ವಲ್ಪ ಸಮಯ ಮೌನ ಅಭ್ಯಾಸ ಮಾಡಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-11-20": { 
    title: { en: "Ashtanhika (Day 4)", hi: "अष्टान्हिका (दिन 4)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 4)" }, 
    description: { 
      en: "Midway through the Parva. Strengthen your vows of non-violence and detachment from worldly affairs.", 
      hi: "महापर्व का चौथा दिन। अहिंसा के अपने व्रतों को दृढ़ करें और सांसारिक कार्यों से विरक्ति का भाव रखें।", 
      kn: "ಮಹಾಪರ್ವದ ನಾಲ್ಕನೇ ದಿನ. ಅಹಿಂಸೆಯ ನಿಮ್ಮ ವ್ರತಗಳನ್ನು ಬಲಪಡಿಸಿ ಮತ್ತು ಪ್ರಾಪಂಚಿಕ ವ್ಯವಹಾರಗಳಿಂದ ಅನಾಸಕ್ತಿ ಹೊಂದಿರಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-11-21": { 
    title: { en: "Arnath Kevalgyan Kalyanak & Ashtanhika", hi: "अरनाथ केवलज्ञान कल्याणक और अष्टान्हिका", kn: "ಅರನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ ಮತ್ತು ಅಷ್ಟಾಹ್ನಿಕ" }, 
    description: { 
      en: "Lord Arnath attained Omniscience. Also Day 5 of Ashtanhika. Offer special prayers at the temple.", 
      hi: "भगवान अरनाथ का केवलज्ञान कल्याणक। साथ ही अष्टान्हिका का ५वां दिन। मंदिर जी में विशेष आराधना करें।", 
      kn: "ಭಗವಾನ್ ಅರನಾಥರಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿಯಾದ ದಿನ. ಜೊತೆಗೆ ಅಷ್ಟಾಹ್ನಿಕದ ೫ನೇ ದಿನ. ಜಿನಮಂದಿರದಲ್ಲಿ ವಿಶೇಷ ಪ್ರಾರ್ಥನೆ ಸಲ್ಲಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-11-22": { 
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" }, 
    description: { 
      en: "Day 6 of Ashtanhika. Limit your use of electronic devices and focus entirely on internal reflection.", 
      hi: "अष्टान्हिका का छठा दिन। आज इलेक्ट्रॉनिक उपकरणों का उपयोग सीमित करें और पूरी तरह से आत्म-चिंतन पर ध्यान दें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕದ ಆರನೇ ದಿನ. ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಾಧನಗಳ ಬಳಕೆಯನ್ನು ಮಿತಿಗೊಳಿಸಿ ಮತ್ತು ಸಂಪೂರ್ಣವಾಗಿ ಆಂತರಿಕ ಚಿಂತನೆಯತ್ತ ಗಮನಹರಿಸಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-11-23": { 
    title: { en: "Ashtanhika (Day 7)", hi: "अष्टान्हिका (दिन 7)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 7)" }, 
    description: { 
      en: "Day 7 of celestial worship. Prepare for the conclusion of the fasts. Engage in charity (Daan).", 
      hi: "आराधना का सातवां दिन। कल के समापन की तैयारी करें। अपनी क्षमता अनुसार सुपात्र दान अवश्य दें।", 
      kn: "ಆರಾಧನೆಯ ಏಳನೇ ದಿನ. ನಾಳಿನ ಸಮಾಪ್ತಿಗೆ ಸಿದ್ಧರಾಗಿ. ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ದಾನ ಮಾಡಿ." 
    }, 
    type: "ashtanhika" 
  },
  "2026-11-24": { 
    title: { en: "Chaturdashi, Ashtanhika Ends & Sambhavnath Janma & Tap", hi: "चतुर्दशी, अष्टान्हिका समापन और संभवनाथ जन्म व तप", kn: "ಚತುರ್ದಶಿ, ಅಷ್ಟಾಹ್ನಿಕ ಸಮಾಪ್ತಿ ಮತ್ತು ಸಂಭವನಾಥ ಜನ್ಮ ಹಾಗೂ ತಪ" }, 
    description: { 
      en: "Conclusion of Ashtanhika. Also the Birth and Initiation (Diksha) of Lord Sambhavnath. Observe strict Chaturdashi fasting.", 
      hi: "अष्टान्हिका समापन। भगवान संभवनाथ का जन्म और तप (दीक्षा) कल्याणक। चतुर्दशी के उपलक्ष्य में कठोर उपवास रखें।", 
      kn: "ಅಷ್ಟಾಹ್ನಿಕ ಸಮಾಪ್ತಿ. ಭಗವಾನ್ ಸಂಭವನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಚತುರ್ದಶಿಯ ಪ್ರಯುಕ್ತ ಕಟ್ಟುನಿಟ್ಟಿನ ಉಪವಾಸ ಆಚರಿಸಿ." 
    }, 
    type: "festival" 
  },

  "2026-11-25": { 
    title: { en: "Purnima", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, 
    description: { 
      en: "Auspicious full moon day. Reflect on the spiritual merits gained during the Ashtanhika Parva.", 
      hi: "पवित्र पूर्णिमा का दिन। अष्टान्हिका महापर्व के दौरान अर्जित किए गए आध्यात्मिक पुण्यों का चिंतन करें।", 
      kn: "ಪವಿತ್ರ ಹುಣ್ಣಿಮೆ. ಅಷ್ಟಾಹ್ನಿಕ ಮಹಾಪರ್ವದ ಸಮಯದಲ್ಲಿ ಗಳಿಸಿದ ಆಧ್ಯಾತ್ಮಿಕ ಪುಣ್ಯಗಳನ್ನು ಅವಲೋಕಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-11-26": { 
    title: { en: "Rohini Vrat", hi: "रोहिणी व्रत", kn: "ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "Observance of Rohini Vrat. Keep a fast or take one meal (Ekashana) to practice detachment from physical cravings.", 
      hi: "आत्म-शुद्धि के लिए रोहिणी व्रत का पालन करें। शारीरिक इच्छाओं से विरक्ति के लिए उपवास या एकाशन करें।", 
      kn: "ಆತ್ಮ-ಶುದ್ಧಿಗಾಗಿ ರೋಹಿಣಿ ವ್ರತ ಆಚರಿಸಿ. ದೈಹಿಕ ಆಸೆಗಳಿಂದ ಅನಾಸಕ್ತಿ ಹೊಂದಲು ಉಪವಾಸ ಅಥವಾ ಏಕಾಷನ ಪಾಲಿಸಿ." 
    }, 
    type: "festival" 
  },

  // ================= DECEMBER 2026 =================
  "2026-12-01": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Begin the month with discipline. Take a strict vow of Hari Tyag (abstaining from green leafy vegetables) and perform evening Aarti.", 
      hi: "महीने की शुरुआत अनुशासन के साथ करें। आज हरी सब्जियों का पूर्ण त्याग (हरी त्याग) करें और संध्या आरती में भाग लें।", 
      kn: "ಶಿಸ್ತಿನಿಂದ ತಿಂಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿ. ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸುವ (ಹರಿ ತ್ಯಾಗ) ನಿಯಮ ಪಾಲಿಸಿ ಮತ್ತು ಸಂಜೆ ಆರತಿ ಮಾಡಿ." 
    }, 
    type: "tithi" 
  },
  "2026-12-03": { 
    title: { en: "Mahavir Swami Tap Kalyanak", hi: "महावीर स्वामी तप कल्याणक", kn: "ಮಹಾವೀರ ಸ್ವಾಮಿ ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "The highly auspicious day the 24th Tirthankar, Lord Mahavir, renounced all worldly attachments and took Diksha.", 
      hi: "वह परम मंगलमय दिन जब २४वें तीर्थंकर भगवान महावीर स्वामी ने समस्त सांसारिक मोह त्याग कर दीक्षा ग्रहण की थी।", 
      kn: "೨೪ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಮಹಾವೀರ ಸ್ವಾಮಿ ಪ್ರಾಪಂಚಿಕ ವ್ಯಾಮೋಹವನ್ನು ತ್ಯಜಿಸಿ ದೀಕ್ಷೆ ಪಡೆದ ಅತ್ಯಂತ ಶುಭ ದಿನ." 
    }, 
    type: "kalyanak" 
  },
  "2026-12-07": { 
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, 
    description: { 
      en: "A day for spiritual detox. Observe Ekashana (eating one meal) today and maintain Maun (silence) for one hour.", 
      hi: "आध्यात्मिक शुद्धि का दिन। आज एकाशन (दिन में एक बार भोजन) करें और कम से कम एक घंटे का मौन व्रत रखें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಶುದ್ಧಿಯ ದಿನ. ಇಂದು ಏಕಾಷನ (ದಿನಕ್ಕೊಮ್ಮೆ ಊಟ) ಆಚರಿಸಿ ಮತ್ತು ಒಂದು ಗಂಟೆ ಮೌನ ವ್ರತ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-12-08": { 
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, 
    description: { 
      en: "Focus entirely on inner reflection. Avoid digital distractions, eat a simple Sattvic diet, and chant 'Om Namah Siddhebhyah'.", 
      hi: "पूर्णतः आत्म-चिंतन पर ध्यान केंद्रित करें। डिजिटल उपकरणों से दूर रहें, सात्विक आहार लें और 'ॐ नमः सिद्धेभ्यः' का जाप करें।", 
      kn: "ಸಂಪೂರ್ಣವಾಗಿ ಆತ್ಮ-ಚಿಂತನೆಯತ್ತ ಗಮನಹರಿಸಿ. ಡಿಜಿಟಲ್ ಸಾಧನಗಳಿಂದ ದೂರವಿರಿ, ಸಾತ್ವಿಕ ಆಹಾರ ಸೇವಿಸಿ ಮತ್ತು 'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಎಂದು ಜಪಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-12-09": { 
    title: { en: "Pushpadantnath Janma & Tap Kalyanak", hi: "पुष्पदंतनाथ जन्म और तप कल्याणक", kn: "ಪುಷ್ಪದಂತನಾಥ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Marking the Birth and Initiation (Diksha) of the 9th Tirthankar, Lord Pushpadantnath. Engage in deep devotion today.", 
      hi: "९वें तीर्थंकर भगवान पुष्पदंतनाथ का जन्म और तप (दीक्षा) कल्याणक। आज का दिन गहरी भक्ति और वंदना में व्यतीत करें।", 
      kn: "೯ನೇ ತೀರ್ಥಂಕರ ಭಗವಾನ್ ಪುಷ್ಪದಂತನಾಥರ ಜನ್ಮ ಮತ್ತು ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ಇಂದಿನ ದಿನವನ್ನು ಆಳವಾದ ಭಕ್ತಿಯಲ್ಲಿ ಕಳೆಯಿರಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-12-17": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Practice strict mindfulness. Observe Ratri Bhojan Tyag (no eating after sunset) and follow absolute Brahmacharya today.", 
      hi: "कड़े अनुशासन का अभ्यास करें। आज रात्रि भोजन का पूर्ण त्याग करें और पूर्ण रूप से ब्रह्मचर्य का पालन करें।", 
      kn: "ಕಟ್ಟುನಿಟ್ಟಿನ ಶಿಸ್ತು ಅಭ್ಯಾಸ ಮಾಡಿ. ಇಂದು ರಾತ್ರಿ ಊಟವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತ್ಯಜಿಸಿ ಮತ್ತು ಬ್ರಹ್ಮಚರ್ಯವನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  },
  "2026-12-19": { 
    title: { en: "Arnath Tap Kalyanak", hi: "अरनाथ तप कल्याणक", kn: "ಅರನಾಥ ತಪ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "Tap (Diksha) Kalyanak of Lord Arnath. Reflect on the rigorous austerities undertaken by Digambar Munis to burn karmas.", 
      hi: "भगवान अरनाथ का तप (दीक्षा) कल्याणक। दिगंबर मुनियों की कठोर साधना और तपस्या का गहराई से चिंतन करें।", 
      kn: "ಭಗವಾನ್ ಅರನಾಥರ ತಪ (ದೀಕ್ಷಾ) ಕಲ್ಯಾಣಕ. ದಿಗಂಬರ ಮುನಿಗಳ ಕಠಿಣ ತಪಸ್ಸನ್ನು ಆಳವಾಗಿ ಧ್ಯಾನಿಸಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-12-20": { 
    title: { en: "Mallinath Triple Kalyanak", hi: "मल्लिनाथ तीन कल्याणक", kn: "ಮಲ್ಲಿನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" }, 
    description: { 
      en: "A profoundly rare and auspicious day marking the Janma, Tap, and Kevalgyan Kalyanak of Lord Mallinath.", 
      hi: "एक अत्यंत दुर्लभ और मंगलमय दिन—भगवान मल्लिनाथ का जन्म, तप (दीक्षा) और केवलज्ञान कल्याणक एक ही दिन।", 
      kn: "ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರ ಜನ್ಮ, ತಪ (ದೀಕ್ಷಾ) ಮತ್ತು ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ ಒಟ್ಟಿಗೆ ಬಂದಿರುವ ಅತ್ಯಂತ ಅಪರೂಪದ ಮತ್ತು ಶುಭ ದಿನ." 
    }, 
    type: "kalyanak" 
  },
  "2026-12-23": { 
    title: { en: "Chaturdashi, Purnima, Sambhavnath Tap & Rohini Vrat", hi: "चतुर्दशी, पूर्णिमा, संभवनाथ तप और रोहिणी व्रत", kn: "ಚತುರ್ದಶಿ, ಹುಣ್ಣಿಮೆ, ಸಂಭವನಾಥ ತಪ ಮತ್ತು ರೋಹಿಣಿ ವ್ರತ" }, 
    description: { 
      en: "A highly merged Tithi day. Tap Kalyanak of Lord Sambhavnath. Keep a fast for Rohini Vrat to end the year with pure karma.", 
      hi: "चतुर्दशी और पूर्णिमा एक ही दिन। भगवान संभवनाथ का तप कल्याणक। वर्ष के अंत में आत्म-शुद्धि के लिए रोहिणी व्रत का उपवास रखें।", 
      kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಹುಣ್ಣಿಮೆ ಒಂದೇ ದಿನ. ಭಗವಾನ್ ಸಂಭವನಾಥರ ತಪ ಕಲ್ಯಾಣಕ. ವರ್ಷದ ಕೊನೆಯಲ್ಲಿ ಆತ್ಮ-ಶುದ್ಧಿಗಾಗಿ ರೋಹಿಣಿ ವ್ರತದ ಉಪವಾಸ ಮಾಡಿ." 
    }, 
    type: "kalyanak" 
  },
  "2026-12-31": { 
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, 
    description: { 
      en: "Close the year with spiritual focus. Take a vow of Rasa Tyag by giving up your most desired food or flavor for the day.", 
      hi: "वर्ष का समापन आध्यात्मिक चेतना के साथ करें। आज अपने सबसे पसंदीदा भोजन या स्वाद को छोड़ने का रस त्याग नियम लें।", 
      kn: "ಆಧ್ಯಾತ್ಮಿಕ ಚಿಂತನೆಯೊಂದಿಗೆ ವರ್ಷವನ್ನು ಮುಕ್ತಾಯಗೊಳಿಸಿ. ಇಂದು ನಿಮ್ಮ ನೆಚ್ಚಿನ ಆಹಾರ ಅಥವಾ ರುಚಿಯನ್ನು ಬಿಡುವ ಮೂಲಕ ರಸ ತ್ಯಾಗದ ನಿಯಮ ಪಾಲಿಸಿ." 
    }, 
    type: "tithi" 
  }
}