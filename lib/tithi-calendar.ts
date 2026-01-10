export type TithiEntry = {
  title: { en: string; hi: string; kn: string };
  description: { en: string; hi: string; kn: string };
  type: 'tithi' | 'kalyanak' | 'festival' | 'ashtanhika';
};

// Key = The ACTUAL Date of the Event (YYYY-MM-DD)
export const tithiCalendar: Record<string, TithiEntry> = {

  // ================= JANUARY 2026 =================
  "2026-01-01": {
    title: { en: "Happy New Year", hi: "नव वर्ष की शुभकामनाएं", kn: "ಹೊಸ ವರ್ಷದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು" },
    description: {
      en: "Start this year with Jin Bhakti. Visit a temple today.",
      hi: "इस वर्ष की शुरुआत जिन भक्ति से करें। आज मंदिर दर्शन अवश्य करें।",
      kn: "ಈ ವರ್ಷವನ್ನು ಜಿನ ಭಕ್ತಿಯೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. ಇಂದು ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ."
    },
    type: "festival"
  },
  "2026-01-02": {
    title: { en: "Abhinandan Nath Kevalgyan", hi: "अभिनंदन नाथ केवलज्ञान", kn: "ಅಭಿನಂದನ ನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is Chaturdashi & Bhagwan Abhinandan Nath's Kevalgyan Kalyanak.",
      hi: "कल चतुर्दशी और भगवान अभिनंदन नाथ का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಚತುರ್ದಶಿ ಹಾಗೂ ಭಗವಾನ್ ಅಭಿನಂದನ ನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-03": {
    title: { en: "Dharmanath Kevalgyan (Hunnime)", hi: "धर्मनाथ केवलज्ञान (पूर्णिमा)", kn: "ಧರ್ಮನಾಥ ಕೇವಲಜ್ಞಾನ (ಹುಣ್ಣಿಮೆ)" },
    description: {
      en: "Full Moon & Kevalgyan Kalyanak of Bhagwan Dharmanath.",
      hi: "पूर्णिमा और भगवान धर्मनाथ का केवलज्ञान कल्याणक।",
      kn: "ಹುಣ್ಣಿಮೆ ಹಾಗೂ ಭಗವಾನ್ ಧರ್ಮನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-05": {
    title: { en: "Mallinath Kevalgyan", hi: "मल्लीनाथ केवलज्ञान", kn: "ಮಲ್ಲಿನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is the Kevalgyan Kalyanak of Bhagwan Mallinath.",
      hi: "कल भगवान मल्लीनाथ का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-11": {
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" },
    description: {
      en: "A day for self-restraint. Avoid green vegetables (Hari Tyag).",
      hi: "संयम का दिन। हरी सब्जियों का त्याग करें।",
      kn: "ಸಂಯಮದ ದಿನ. ಹಸಿರು ತರಕಾರಿಗಳನ್ನು ತ್ಯಜಿಸಿ (ಹರಿ ತ್ಯಾಗ)."
    },
    type: "tithi"
  },
  "2026-01-14": {
    title: { en: "Makar Sankranti", hi: "मकर संक्रांति", kn: "ಮಕರ ಸಂಕ್ರಾಂತಿ" },
    description: {
      en: "A day for 'Dan' (Charity). Support a Goshala or Aushadhalaya.",
      hi: "'दान' का दिन। गौशाला या औषधालय को सहयोग दें।",
      kn: "'ದಾನ' ಶ್ರೇಷ್ಠ. ಇಂದು ಗೋಶಾಲೆ ಅಥವಾ ಔಷಧಾಲಯಕ್ಕೆ ನೆರವು ನೀಡಿ."
    },
    type: "festival"
  },
  "2026-01-17": {
    title: { en: "Sheetalnath Kevalgyan & Parshvanath Janma", hi: "शीतलनाथ केवलज्ञान & पार्श्वनाथ जन्म", kn: "ಶೀತಲನಾಥ ಕೇವಲಜ್ಞಾನ & ಪಾರ್ಶ್ವನಾಥ ಜನ್ಮ" },
    description: {
      en: "Chaturdashi & Two Kalyanaks. Fasting (Upvas) is highly recommended.",
      hi: "चतुर्दशी और दो कल्याणक। उपवास अवश्य करें।",
      kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಎರಡು ಕಲ್ಯಾಣಕಗಳು. ಉಪವಾಸ ಮಾಡುವುದು ಶ್ರೇಷ್ಠ."
    },
    type: "kalyanak"
  },
  "2026-01-18": {
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" },
    description: {
      en: "New Moon. Chant 'Om Namah Siddhebhyah'.",
      hi: "अमावस्या। 'ॐ नमः सिद्धेभ्यः' का जाप करें।",
      kn: "ಅಮಾವಾಸ್ಯೆ. 'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಎಂದು ಜಪಿಸಿ."
    },
    type: "tithi"
  },
  "2026-01-20": {
    title: { en: "Vasupujya Kevalgyan", hi: "वासुपूज्य केवलज्ञान", kn: "ವಾಸುಪೂಜ್ಯ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is the Kevalgyan Kalyanak of Bhagwan Vasupujya.",
      hi: "कल भगवान वासुपूज्य का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ವಾಸುಪೂಜ್ಯರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-22": {
    title: { en: "Vimalnath Janma & Diksha", hi: "विमलनाथ जन्म & दीक्षा", kn: "ವಿಮಲನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Tomorrow is the Janma and Diksha Kalyanak of Bhagwan Vimalnath.",
      hi: "कल भगवान विमलनाथ का जन्म और दीक्षा कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ವಿಮಲನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-23": {
    title: { en: "Vimalnath Kevalgyan", hi: "विमलनाथ केवलज्ञान", kn: "ವಿಮಲನಾಥ ಕೇವಲಜ್ಞಾನ" },
    description: {
      en: "Tomorrow is the Kevalgyan Kalyanak of Bhagwan Vimalnath.",
      hi: "कल भगवान विमलनाथ का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ವಿಮಲನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-26": {
    title: { en: "Republic Day & Ashtami", hi: "गणतंत्र दिवस और अष्टमी", kn: "ಗಣರಾಜ್ಯೋತ್ಸವ ಮತ್ತು ಅಷ್ಟಮಿ" },
    description: {
      en: "Celebrate the Nation and the Soul. Practice Sanyam on Ashtami.",
      hi: "राष्ट्र और आत्मा का उत्सव। अष्टमी पर संयम पालन करें।",
      kn: "ರಾಷ್ಟ್ರ ಮತ್ತು ಆತ್ಮವನ್ನು ಗೌರವಿಸಿ. ಅಷ್ಟಮಿಯಂದು ಸಂಯಮ ಪಾಲಿಸಿ."
    },
    type: "festival"
  },
  "2026-01-28": {
    title: { en: "Ajitnath Diksha", hi: "अजितनाथ दीक्षा", kn: "ಅಜಿತನಾಥ ದೀಕ್ಷಾ" },
    description: {
      en: "Tomorrow is the Diksha Kalyanak of Bhagwan Ajitnath.",
      hi: "कल भगवान अजितनाथ का दीक्षा कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಅಜಿತನಾಥರ ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-30": {
    title: { en: "Abhinandan Nath Janma & Diksha", hi: "अभिनंदन नाथ जन्म & दीक्षा", kn: "ಅಭಿನಂದನ ನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Tomorrow is the Birth and Initiation of Bhagwan Abhinandan Nath.",
      hi: "कल भगवान अभिनंदन नाथ का जन्म और दीक्षा कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಅಭಿನಂದನ ನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-01-31": {
    title: { en: "Dharmanath Janma & Diksha", hi: "धर्मनाथ जन्म & दीक्षा", kn: "ಧರ್ಮನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Chaturdashi & Kalyanak. A perfect day for spiritual growth.",
      hi: "चतुर्दशी और कल्याणक। आध्यात्मिक विकास के लिए उत्तम दिन।",
      kn: "ಚತುರ್ದಶಿ ಮತ್ತು ಕಲ್ಯಾಣಕ. ಆಧ್ಯಾತ್ಮಿಕ ಸಾಧನೆಗೆ ಪವಿತ್ರ ದಿನ."
    },
    type: "kalyanak"
  },

  // ================= FEBRUARY 2026 =================
  "2026-02-01": {
    title: { en: "Purnima (Hunnime)", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" },
    description: {
      en: "Full Moon. Visit a temple and perform Abhisheka.",
      hi: "पूर्णिमा। मंदिर जाएं और अभिषेक करें।",
      kn: "ಹುಣ್ಣಿಮೆ. ದೇವಸ್ಥಾನಕ್ಕೆ ಹೋಗಿ ಅಭಿಷೇಕ ಮಾಡಿ."
    },
    type: "tithi"
  },
  "2026-02-06": {
    title: { en: "Acharya Vidyasagar Punyatithi", hi: "आचार्य विद्यासागर पुण्यतिथि", kn: "ಆಚಾರ್ಯ ವಿದ್ಯಾಸಾಗರ ಪುಣ್ಯತಿಥಿ" },
    description: {
      en: "Remembering Sant Shiromani. Follow his path of simplicity.",
      hi: "संत शिरोमणि का स्मरण। उनके सादगी के मार्ग पर चलें।",
      kn: "ಸಂತ ಶಿರೋಮಣಿ ಆಚಾರ್ಯರ ಸ್ಮರಣೆ. ಅವರ ಸರಳತೆಯ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },
    type: "festival"
  },
  "2026-02-09": {
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" },
    description: {
      en: "Today and tomorrow are both Ashtami. Maintain restraint.",
      hi: "आज और कल दोनों अष्टमी हैं। संयम रखें।",
      kn: "ಇಂದು ಮತ್ತು ನಾಳೆ ಅಷ್ಟಮಿ. ಸಂಯಮ ಪಾಲಿಸಿ."
    },
    type: "tithi"
  },
  "2026-02-14": {
    title: { en: "Sheetalnath Janma & Diksha", hi: "शीतलनाथ जन्म & दीक्षा", kn: "ಶೀತಲನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Tomorrow is the Janma & Diksha Kalyanak of Bhagwan Sheetalnath.",
      hi: "कल भगवान शीतलनाथ का जन्म और दीक्षा कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಶೀತಲನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-02-16": {
    title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" },
    description: {
      en: "A day for fasting and swadhyay.",
      hi: "उपवास और स्वाध्याय का दिन।",
      kn: "ಉಪವಾಸ ಮತ್ತು ಸ್ವಾಧ್ಯಾಯದ ಪವಿತ್ರ ದಿನ."
    },
    type: "tithi"
  },
  "2026-02-17": {
    title: { en: "Adinath Moksha Kalyanak", hi: "आदिनाथ मोक्ष कल्याणक", kn: "ಆದಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Amavasya. The First Tirthankar attained Nirvana from Kailash Parvat.",
      hi: "अमावस्या। प्रथम तीर्थंकर को कैलाश पर्वत से निर्वाण प्राप्त हुआ।",
      kn: "ಅಮಾವಾಸ್ಯೆ. ಪ್ರಥಮ ತೀರ್ಥಂಕರರಿಗೆ ಕೈಲಾಸ ಪರ್ವತದಿಂದ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿಯಾಯಿತು."
    },
    type: "kalyanak"
  },
  "2026-02-20": {
    title: { en: "Arnath Garbha Kalyanak", hi: "अरनाथ गर्भ कल्याणक", kn: "ಅರನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is the Garbha Kalyanak of Bhagwan Arnath.",
      hi: "कल भगवान अरनाथ का गर्भ कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಅರನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-02-22": {
    title: { en: "Mallinath Moksha Kalyanak", hi: "मल्लीनाथ मोक्ष कल्याणक", kn: "ಮಲ್ಲಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow Bhagwan Mallinath attained Nirvana.",
      hi: "कल भगवान मल्लीनाथ को निर्वाण प्राप्त हुआ।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿ."
    },
    type: "kalyanak"
  },
  
  // --- ASHTANHIKA PARVA (8 DAYS, 8 JAPS) ---
  "2026-02-24": {
    title: { en: "Ashtanhika Begins (Day 1)", hi: "अष्टान्हिका प्रारंभ (दिन 1)", kn: "ಅಷ್ಟಾಹ್ನಿಕ ಪ್ರಾರಂಭ (ದಿನ 1)" },
    description: {
      en: "Day 1 Mantra: Om Hreem Nandishwar Sanjnaya Namah",
      hi: "दिन 1 मंत्र: ॐ ह्रीं नंदीश्वर संज्ञाय नमः",
      kn: "ದಿನ 1 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ನಂದೀಶ್ವರ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-02-25": {
    title: { en: "Ashtanhika (Day 2)", hi: "अष्टान्हिका (दिन 2)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 2)" },
    description: {
      en: "Day 2 Mantra: Om Hreem Ashtamahavibhuti Sanjnaya Namah",
      hi: "दिन 2 मंत्र: ॐ ह्रीं अष्टमहाविभूति संज्ञाय नमः",
      kn: "ದಿನ 2 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಅಷ್ಟಮಹಾವಿಭೂತಿ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-02-26": {
    title: { en: "Ashtanhika (Day 3)", hi: "अष्टान्हिका (दिन 3)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 3)" },
    description: {
      en: "Day 3 Mantra: Om Hreem Trilokasagara Sanjnaya Namah",
      hi: "दिन 3 मंत्र: ॐ ह्रीं त्रिलोकसागर संज्ञाय नमः",
      kn: "ದಿನ 3 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ತ್ರಿಲೋಕಸಾಗರ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-02-27": {
    title: { en: "Ashtanhika (Day 4)", hi: "अष्टान्हिका (दिन 4)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 4)" },
    description: {
      en: "Day 4 Mantra: Om Hreem Chaturmukha Sanjnaya Namah",
      hi: "दिन 4 मंत्र: ॐ ह्रीं चतुर्मुख संज्ञाय नमः",
      kn: "ದಿನ 4 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಚತುರ್ಮುಖ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-02-28": {
    title: { en: "Ashtanhika (Day 5)", hi: "अष्टान्हिका (दिन 5)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 5)" },
    description: {
      en: "Day 5 Mantra: Om Hreem Panchamahalakshana Sanjnaya Namah",
      hi: "दिन 5 मंत्र: ॐ ह्रीं पंचमहालक्षण संज्ञाय नमः",
      kn: "ದಿನ 5 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಪಂಚಮಹಾಲಕ್ಷಣ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },

  // ================= MARCH 2026 =================
  "2026-03-01": {
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" },
    description: {
      en: "Day 6 Mantra: Om Hreem Swargasopana Sanjnaya Namah",
      hi: "दिन 6 मंत्र: ॐ ह्रीं स्वर्गसोपान संज्ञाय नमः",
      kn: "ದಿನ 6 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸ್ವರ್ಗಸೋಪಾನ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-03-02": {
    title: { en: "Ashtanhika (Day 7) & Chaturdashi", hi: "अष्टान्हिका (दिन 7)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 7)" },
    description: {
      en: "Day 7 Mantra: Om Hreem Sarvasampatti Sanjnaya Namah",
      hi: "दिन 7 मंत्र: ॐ ह्रीं सर्वसंपत्ति संज्ञाय नमः",
      kn: "ದಿನ 7 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸರ್ವಸಂಪತ್ತಿ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-03-03": {
    title: { en: "Ashtanhika Ends (Hunnime)", hi: "अष्टान्हिका समापन (पूर्णिमा)", kn: "ಅಷ್ಟಾಹ್ನಿಕ ಸಮಾಪ್ತಿ (ಹುಣ್ಣಿಮೆ)" },
    description: {
      en: "Day 8 Mantra: Om Hreem Indradhwaja Sanjnaya Namah. Perform Visarjan.",
      hi: "दिन 8 मंत्र: ॐ ह्रीं इंद्रध्वज संज्ञाय नमः। विसर्जन करें।",
      kn: "ದಿನ 8 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಇಂದ್ರಧ್ವಜ ಸಂಜ್ಞಾಯ ನಮಃ. ವಿಸರ್ಜನೆ ಮಾಡಿ."
    },
    type: "festival"
  },

  "2026-03-07": {
    title: { en: "Padmaprabhu Moksha Kalyanak", hi: "पद्मप्रभु मोक्ष कल्याणक", kn: "ಪದ್ಮಪ್ರಭು ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow Bhagwan Padmaprabhu attained Salvation.",
      hi: "कल भगवान पद्मप्रभु को मोक्ष प्राप्त हुआ।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಪದ್ಮಪ್ರಭುಗಳಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿ."
    },
    type: "kalyanak"
  },
  "2026-03-08": {
    title: { en: "Rangapanchami", hi: "रंगपंचमी", kn: "ರಂಗಪಂಚಮಿ" },
    description: {
      en: "Play with the colors of virtues (Guna), not water. Avoid Himsa.",
      hi: "गुणों के रंगों से खेलें। हिंसा से बचें।",
      kn: "ಗುಣಗಳ ಬಣ್ಣಗಳೊಂದಿಗೆ ಆಟವಾಡಿ. ಹಿಂಸೆಯನ್ನು ತ್ಯಜಿಸಿ."
    },
    type: "festival"
  },
  "2026-03-09": {
    title: { en: "Suparsvanath Kevalgyan", hi: "सुपार्श्वनाथ केवलज्ञान", kn: "ಸುಪಾರ್ಶ್ವನಾಥ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is the Kevalgyan Kalyanak of Bhagwan Suparsvanath.",
      hi: "कल भगवान सुपार्श्वनाथ का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಸುಪಾರ್ಶ್ವನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-03-10": {
    title: { en: "Chandraprabh Keval/Moksha", hi: "चंद्रप्रभ केवल/मोक्ष", kn: "ಚಂದ್ರಪ್ರಭ ಕೇವಲ/ಮೋಕ್ಷ" },
    description: {
      en: "A Double Kalyanak Day for Chandraprabh & Moksha for Suparsvanath.",
      hi: "चंद्रप्रभ भगवान के दो कल्याणक और सुपार्श्वनाथ भगवान का मोक्ष।",
      kn: "ಚಂದ್ರಪ್ರಭರ ಜೋಡಿ ಕಲ್ಯಾಣಕ ಮತ್ತು ಸುಪಾರ್ಶ್ವನಾಥರ ಮೋಕ್ಷ."
    },
    type: "kalyanak"
  },
  "2026-03-11": {
    title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" },
    description: {
      en: "Hari Tyag Day. Practice self-restraint.",
      hi: "हरी त्याग दिवस। आत्म-संयम का पालन करें।",
      kn: "ಹಸಿರು ತ್ಯಾಗ ದಿನ. ಆತ್ಮ ಸಂಯಮ ಪಾಲಿಸಿ."
    },
    type: "tithi"
  },
  "2026-03-12": {
    title: { en: "Pushpadant Garbha Kalyanak", hi: "पुष्पदंत गर्भ कल्याणक", kn: "ಪುಷ್ಪದಂತ ಗರ್ಭ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is the Garbha Kalyanak of Bhagwan Pushpadant.",
      hi: "कल भगवान पुष्पदंत का गर्भ कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಪುಷ್ಪದಂತರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-03-15": {
    title: { en: "Adinath Kevalgyan", hi: "आदिनाथ केवलज्ञान", kn: "ಆದಿನಾಥ ಕೇವಲಜ್ಞಾನ" },
    description: {
      en: "The First Tirthankar attains Omniscience. Also Shreyansnath Janma/Diksha.",
      hi: "प्रथम तीर्थंकर को केवलज्ञान। साथ ही श्रेयांसनाथ जन्म/दीक्षा।",
      kn: "ಪ್ರಥಮ ತೀರ್ಥಂಕರರಿಗೆ ಕೇವಲಜ್ಞಾನ. ಶ್ರೇಯಾಂಸನಾಥರ ಜನ್ಮ/ದೀಕ್ಷಾ."
    },
    type: "kalyanak"
  },
  "2026-03-16": {
    title: { en: "Munisuvratnath Moksha", hi: "मुनिसुव्रतनाथ मोक्ष", kn: "ಮುನಿಸುವ್ರತನಾಥ ಮೋಕ್ಷ" },
    description: {
      en: "Tomorrow Bhagwan Munisuvratnath attained Salvation.",
      hi: "कल भगवान मुनिसुव्रतनाथ को मोक्ष प्राप्त हुआ।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಮುನಿಸುವ್ರತನಾಥರಿಗೆ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿ."
    },
    type: "kalyanak"
  },
  "2026-03-18": {
    title: { en: "Vasupujya Janma & Diksha", hi: "वासुपूज्य जन्म & दीक्षा", kn: "ವಾಸುಪೂಜ್ಯ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Chaturdashi & Two Kalyanaks of Vasupujya Bhagwan.",
      hi: "चतुर्दशी और वासुपूज्य भगवान के दो कल्याणक।",
      kn: "ಚತುರ್ದಶಿ ಮತ್ತು ವಾಸುಪೂಜ್ಯರ ಎರಡು ಕಲ್ಯಾಣಕಗಳು."
    },
    type: "kalyanak"
  },
  "2026-03-19": {
    title: { en: "Yugadi (Gudi Padwa)", hi: "युगादी (गुड़ी पड़वा)", kn: "ಯುಗಾದಿ" },
    description: {
      en: "Amavasya. Lord Rishabhdev taught livelihood skills. A new era.",
      hi: "अमावस्या। भगवान ऋषभदेव ने आजीविका का कौशल सिखाया। नया युग।",
      kn: "ಅಮಾವಾಸ್ಯೆ. ಭಗವಾನ್ ಋಷಭದೇವರು ಜೀವನೋಪಾಯದ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಸಿದ ದಿನ."
    },
    type: "festival"
  },
  "2026-03-21": {
    title: { en: "Kuntunath Kevalgyan", hi: "कुंथुनाथ केवलज्ञान", kn: "ಕುಂತುನಾಥ ಕೇವಲಜ್ಞಾನ" },
    description: {
      en: "Tomorrow is the Kevalgyan Kalyanak of Bhagwan Kuntunath.",
      hi: "कल भगवान कुंथुनाथ का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಕುಂತುನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-03-22": {
    title: { en: "Anantanath Janma & Diksha", hi: "अनंतनाथ जन्म & दीक्षा", kn: "ಅನಂತನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Tomorrow is the Janma & Diksha Kalyanak of Bhagwan Anantanath.",
      hi: "कल भगवान अनंतनाथ का जन्म और दीक्षा कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಅನಂತನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-03-23": {
    title: { en: "Ajitnath Moksha Kalyanak", hi: "अजितनाथ मोक्ष कल्याणक", kn: "ಅಜಿತನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow Bhagwan Ajitnath attained Nirvana from Sammed Shikhar.",
      hi: "कल भगवान अजितनाथ को सम्मेद शिखर से निर्वाण प्राप्त हुआ।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಅಜಿತನಾಥರಿಗೆ ಸಮ್ಮೇದ ಶಿಖರದಿಂದ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿ."
    },
    type: "kalyanak"
  },
  "2026-03-24": {
    title: { en: "Sambhavnath Moksha", hi: "संभवनाथ मोक्ष", kn: "ಸಂಭವನಾಥ ಮೋಕ್ಷ" },
    description: {
      en: "Moksha of Sambhavnath & Diksha of Acharya Shantisagar Ji.",
      hi: "संभवनाथ मोक्ष और आचार्य शांतिसागर जी की दीक्षा।",
      kn: "ಸಂಭವನಾಥ ಮೋಕ್ಷ ಮತ್ತು ಆಚಾರ್ಯ ಶಾಂತಿಸಾಗರ ಜೀ ಅವರ ದೀಕ್ಷಾ ದಿವಸ."
    },
    type: "kalyanak"
  },
  "2026-03-26": {
    title: { en: "Ram Navami & Ashtami", hi: "राम नवमी & अष्टमी", kn: "ರಾಮ ನವಮಿ & ಅಷ್ಟಮಿ" },
    description: {
      en: "Celebrate Lord Rama (Balbhadra). A great Salakapurush.",
      hi: "भगवान राम (बलभद्र) का उत्सव। एक महान शलाकापुरुष।",
      kn: "ಭಗವಾನ್ ರಾಮ (ಬಲಭದ್ರ) ಉತ್ಸವ. ಮಹಾನ್ ಶಲಾಕಾಪುರುಷ."
    },
    type: "festival"
  },
  "2026-03-29": {
    title: { en: "Sumatinath Triple Kalyanak", hi: "सुमतिनाथ तीन कल्याणक", kn: "ಸುಮತಿನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "A Rare Day: Birth, Omniscience, and Salvation of Sumatinath Bhagwan.",
      hi: "दुर्लभ दिन: सुमतिनाथ भगवान का जन्म, केवलज्ञान और मोक्ष।",
      kn: "ಅಪರೂಪದ ದಿನ: ಸುಮತಿನಾಥ ಭಗವಂತರ ಜನ್ಮ, ಕೇವಲಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷ."
    },
    type: "kalyanak"
  },
  "2026-03-31": {
    title: { en: "Mahavir Jayanti", hi: "महावीर जयंती", kn: "ಮಹಾವೀರ ಜಯಂತಿ" },
    description: {
      en: "Janma Kalyanak of the 24th Tirthankar. Live and Let Live.",
      hi: "24वें तीर्थंकर का जन्म कल्याणक। जियो और जीने दो।",
      kn: "24ನೇ ತೀರ್ಥಂಕರರ ಜನ್ಮ ಕಲ್ಯಾಣಕ. ಬದುಕು ಮತ್ತು ಬದುಕಲು ಬಿಡು."
    },
    type: "festival"
  },

  // ================= APRIL 2026 =================
  "2026-04-01": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Observe fasting.", hi: "उपवास रखें।", kn: "ಉಪವಾಸ ಮಾಡಿ." }, type: "tithi" },
  "2026-04-02": {
    title: { en: "Hanuman Jayanti (Hunnime)", hi: "हनुमान जयंती", kn: "ಹನುಮಾನ್ ಜಯಂತಿ" },
    description: {
      en: "Devotion to Hanuman (Kamdev), supreme devotee of Jinendra Bhagwan.",
      hi: "जिनेंद्र भगवान के परम भक्त हनुमान (कामदेव) की भक्ति।",
      kn: "ಜಿನೇಂದ್ರ ಭಗವಂತನ ಪರಮ ಭಕ್ತ ಹನುಮಂತನ (ಕಾಮದೇವ) ಭಕ್ತಿ."
    },
    type: "festival"
  },
  "2026-04-06": { title: { en: "Parshvanath Kevalgyan", hi: "पार्श्वनाथ केवलज्ञान", kn: "ಪಾರ್ಶ್ವನಾಥ ಕೇವಲಜ್ಞಾನ" }, description: { en: "Omniscience of Lord Parshvanath.", hi: "भगवान पार्श्वनाथ का केवलज्ञान।", kn: "ಪಾರ್ಶ್ವನಾಥರ ಕೇವಲಜ್ಞಾನ." }, type: "kalyanak" },
  "2026-04-07": { title: { en: "Chandraprabh Garbha", hi: "चंद्रप्रभ गर्भ", kn: "ಚಂದ್ರಪ್ರಭ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak of Chandraprabh.", hi: "चंद्रप्रभ का गर्भ कल्याणक।", kn: "ಚಂದ್ರಪ್ರಭರ ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-04-10": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Self-restraint day.", hi: "आत्म-संयम दिवस।", kn: "ಆತ್ಮ ಸಂಯಮ ದಿನ." }, type: "tithi" },
  "2026-04-11": { title: { en: "Adinath Janma & Diksha", hi: "आदिनाथ जन्म & दीक्षा", kn: "ಆದಿನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" }, description: { en: "Birth and Initiation of the First Tirthankar.", hi: "प्रथम तीर्थंकर का जन्म और दीक्षा।", kn: "ಪ್ರಥಮ ತೀರ್ಥಂಕರರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ." }, type: "kalyanak" },
  "2026-04-12": { title: { en: "Munisuvratnath Diksha", hi: "मुनिसुव्रतनाथ दीक्षा", kn: "ಮುನಿಸುವ್ರತನಾಥ ದೀಕ್ಷಾ" }, description: { en: "Diksha Kalyanak.", hi: "दीक्षा कल्याणक।", kn: "ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-04-16": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-04-17": { title: { en: "Anantanath Kevalgyan", hi: "अनंतनाथ केवलज्ञान", kn: "ಅನಂತನಾಥ ಕೇವಲಜ್ಞಾನ" }, description: { en: "Amavasya & Kalyanak.", hi: "अमावस्या और कल्याणक।", kn: "ಅಮಾವಾಸ್ಯೆ ಮತ್ತು ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-04-18": { title: { en: "Kuntunath Triple Kalyanak", hi: "कुंथुनाथ तीन कल्याणक", kn: "ಕುಂತುನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" }, description: { en: "Janma, Diksha & Moksha of Kuntunath Bhagwan.", hi: "कुंथुनाथ भगवान का जन्म, दीक्षा और मोक्ष।", kn: "ಕುಂತುನಾಥರ ಜನ್ಮ, ದೀಕ್ಷಾ ಮತ್ತು ಮೋಕ್ಷ." }, type: "kalyanak" },
  "2026-04-19": {
    title: { en: "Akshay Tritiya", hi: "अक्षय तृतीया", kn: "ಅಕ್ಷಯ ತೃತೀಯ" },
    description: {
      en: "Beginning of Dan Tirth. Rishabhdev took Aahar (Sugarcane Juice).",
      hi: "दान तीर्थ का प्रारंभ। भगवान ऋषभदेव ने आहार ग्रहण किया।",
      kn: "ದಾನ ತೀರ್ಥದ ಆರಂಭ. ಭಗವಾನ್ ಋಷಭದೇವರು ಆಹಾರ (ಕಬ್ಬಿನ ಹಾಲು) ಸ್ವೀಕರಿಸಿದರು."
    },
    type: "festival"
  },
  "2026-04-22": { title: { en: "Abhinandan Garbha/Moksha", hi: "अभिनंदन गर्भ/मोक्ष", kn: "ಅಭಿನಂದನ ಗರ್ಭ/ಮೋಕ್ಷ" }, description: { en: "Double Kalyanak.", hi: "दोहरा कल्याणक।", kn: "ಜೋಡಿ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-04-24": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-04-25": { title: { en: "Sumatinath Diksha", hi: "सुमतिनाथ दीक्षा", kn: "ಸುಮತಿನಾಥ ದೀಕ್ಷಾ" }, description: { en: "Diksha Kalyanak.", hi: "दीक्षा कल्याणक।", kn: "ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-04-26": { title: { en: "Mahavir Kevalgyan", hi: "महावीर केवलज्ञान", kn: "ಮಹಾವೀರ ಕೇವಲಜ್ಞಾನ" }, description: { en: "Lord Mahavir attained Omniscience.", hi: "भगवान महावीर को केवलज्ञान प्राप्त हुआ।", kn: "ಭಗವಾನ್ ಮಹಾವೀರರಿಗೆ ಕೇವಲಜ್ಞಾನ ಪ್ರಾಪ್ತಿ." }, type: "kalyanak" },
  "2026-04-30": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Prepare for month end.", hi: "माह के अंत की तैयारी।", kn: "ತಿಂಗಳಾಂತ್ಯದ ತಯಾರಿ." }, type: "tithi" },

  // ================= MAY 2026 =================
  "2026-05-03": {
    title: { en: "Parshvanath Garbha Kalyanak", hi: "पार्श्वनाथ गर्भ कल्याणक", kn: "ಪಾರ್ಶ್ವನಾಥ ಗರ್ಭ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow is the Garbha Kalyanak of Bhagwan Parshvanath.",
      hi: "कल भगवान पार्श्वनाथ का गर्भ कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಪಾರ್ಶ್ವನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-05-10": {
    title: { en: "Acharya Bahubali Punyatithi", hi: "आचार्य बाहुबली पुण्यतिथि", kn: "ಆಚಾರ್ಯ ಬಾಹುಬಲಿ ಪುಣ್ಯತಿಥಿ" },
    description: {
      en: "Remembering the great sacrifice of Acharya Bahubali.",
      hi: "आचार्य बाहुबली के महान त्याग का स्मरण।",
      kn: "ಆಚಾರ್ಯ ಬಾಹುಬಲಿಗಳ ಮಹಾನ್ ತ್ಯಾಗದ ಸ್ಮರಣೆ."
    },
    type: "festival"
  },
  "2026-05-11": {
    title: { en: "Munisuvratnath Kevalgyan", hi: "मुनिसुव्रतनाथ केवलज्ञान", kn: "ಮುನಿಸುವ್ರತನಾಥ ಕೇವಲಜ್ಞಾನ" },
    description: {
      en: "Tomorrow is the Kevalgyan Kalyanak of Bhagwan Munisuvratnath.",
      hi: "कल भगवान मुनिसुव्रतनाथ का केवलज्ञान कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಮುನಿಸುವ್ರತನಾಥರ ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-05-12": {
    title: { en: "Munisuvratnath Janma & Diksha", hi: "मुनिसुव्रतनाथ जन्म & दीक्षा", kn: "ಮುನಿಸುವ್ರತನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Tomorrow is the Birth and Initiation of Bhagwan Munisuvratnath.",
      hi: "कल भगवान मुनिसुव्रतनाथ का जन्म और दीक्षा कल्याणक है।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ಮುನಿಸುವ್ರತನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-05-15": {
    title: { en: "Dharmanath Garbha", hi: "धर्मनाथ गर्भ", kn: "ಧರ್ಮನಾಥ ಗರ್ಭ" },
    description: {
      en: "Chaturdashi. Garbha Kalyanak of Dharmanath Bhagwan",
      hi: "चतुर्दशी। धर्मनाथ भगवान का गर्भ।",
      kn: "ಚತುರ್ದಶಿ. ಧರ್ಮನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ"
    },
    type: "kalyanak"
  },
  "2026-05-16": {
    title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" },
    description: {
      en: "New Moon. A day for inner silence.",
      hi: "अमावस्या। आंतरिक मौन का दिन।",
      kn: "ಅಮಾವಾಸ್ಯೆ. ಆಂತರಿಕ ಮೌನದ ದಿನ."
    },
    type: "tithi"
  },
  "2026-05-23": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-05-30": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Observe Fasting.", hi: "उपवास रखें।", kn: "ಉಪವಾಸ ಮಾಡಿ." }, type: "tithi" },

  // ================= JUNE 2026 =================
  "2026-06-08": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Self-restraint day.", hi: "आत्म-संयम दिवस।", kn: "ಆತ್ಮ ಸಂಯಮ ದಿನ." }, type: "tithi" },
  "2026-06-14": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-06-15": { title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, description: { en: "Chant Namokar Mantra.", hi: "णमोकार मंत्र का जाप करें।", kn: "ಣಮೋಕಾರ ಮಂತ್ರ ಜಪಿಸಿ." }, type: "tithi" },
  "2026-06-16": {
    title: { en: "Acharya Shantisagar Jayanti", hi: "आचार्य शांतिसागर जयंती", kn: "ಆಚಾರ್ಯ ಶಾಂತಿಸಾಗರ ಜಯಂತಿ" },
    description: {
      en: "Birth Anniversary of Prathmacharya Shantisagar Ji Maharaj, who revived the Digambar Muni tradition.",
      hi: "प्रथमाचार्य शांतिसागर जी महाराज की जयंती, जिन्होंने दिगंबर मुनि परंपरा को पुनर्जीवित किया।",
      kn: "ದಿಗಂಬರ ಮುನಿ ಪರಂಪರೆಯನ್ನು ಪುನರುಜ್ಜೀವನಗೊಳಿಸಿದ ಪ್ರಥಮಾಚಾರ್ಯ ಶಾಂತಿಸಾಗರ ಜೀ ಮಹಾರಾಜರ ಜಯಂತಿ."
    },
    type: "festival"
  },
  "2026-06-22": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-06-26": {
    title: { en: "Suparshvanath Triple Kalyanak", hi: "सुपार्श्वनाथ तीन कल्याणक", kn: "ಸುಪಾರ್ಶ್ವನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Janma, Diksha, and Tap Kalyanak of Bhagwan Suparshvanath.",
      hi: "भगवान सुपार्श्वनाथ का जन्म, दीक्षा और तप कल्याणक।",
      kn: "ಭಗವಾನ್ ಸುಪಾರ್ಶ್ವನಾಥರ ಜನ್ಮ, ದೀಕ್ಷಾ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-06-28": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-06-29": {
    title: { en: "Kar Hunnime", hi: "कर पूर्णिमा", kn: "ಕಾರ ಹುಣ್ಣಿಮೆ" },
    description: {
      en: "Full Moon. A day of gratitude to nature and cattle.",
      hi: "पूर्णिमा। प्रकृति और गोधन के प्रति कृतज्ञता का दिन।",
      kn: "ಕಾರ ಹುಣ್ಣಿಮೆ. ಪ್ರಕೃತಿ ಮತ್ತು ಗೋವಿಗೆ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುವ ದಿನ."
    },
    type: "festival"
  },

  // ================= JULY 2026 =================
  "2026-07-06": { title: { en: "Shreyansnath Garbha", hi: "श्रेयांसनाथ गर्भ", kn: "ಶ್ರೇಯಾಂಸನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-07-08": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-07-10": { title: { en: "Vimalnath Garbha", hi: "विमलनाथ गर्भ", kn: "ವಿಮಲನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-07-11": { title: { en: "Anantanath Janma & Tap", hi: "अनंतनाथ जन्म & तप", kn: "ಅನಂತನಾಥ ಜನ್ಮ & ತಪ" }, description: { en: "Birth and Tap Kalyanak.", hi: "जन्म और तप कल्याणक।", kn: "ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-07-13": {
    title: { en: "Shantinath Triple Kalyanak", hi: "शांतिनाथ तीन कल्याणक", kn: "ಶಾಂತಿನಾಥ ತ್ರಿವಳಿ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Chaturdashi. Janma, Tap, and Moksha Kalyanak of Bhagwan Shantinath. A very auspicious day.",
      hi: "चतुर्दशी। भगवान शांतिनाथ का जन्म, तप और मोक्ष कल्याणक। अत्यंत शुभ दिन।",
      kn: "ಚತುರ್ದಶಿ. ಭಗವಾನ್ ಶಾಂತಿನಾಥರ ಜನ್ಮ, ತಪ ಮತ್ತು ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ. ಅತ್ಯಂತ ಶುಭ ದಿನ."
    },
    type: "kalyanak"
  },
  "2026-07-14": {
    title: { en: "Ajitnath Garbha (Amavasya)", hi: "अजितनाथ गर्भ (अमावस्या)", kn: "ಅಜಿತನಾಥ ಗರ್ಭ (ಅಮಾವಾಸ್ಯೆ)" },
    description: {
      en: "Amavasya and Garbha Kalyanak of Bhagwan Ajitnath.",
      hi: "अमावस्या और भगवान अजितनाथ का गर्भ कल्याणक।",
      kn: "ಅಮಾವಾಸ್ಯೆ ಮತ್ತು ಭಗವಾನ್ ಅಜಿತನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-07-19": {
    title: { en: "Shrut Panchami & Mahavir Garbha", hi: "श्रुत पंचमी & महावीर गर्भ", kn: "ಶ್ರುತ ಪಂಚಮಿ & ಮಹಾವೀರ ಗರ್ಭ" },
    description: {
      en: "Worship the Jinvani (Scriptures). The day Shatkhandagam was completed. Also Mahavir Garbha Kalyanak.",
      hi: "जिनवाणी की पूजा करें। इस दिन षट्खंडागम ग्रंथ पूर्ण हुआ था। साथ ही महावीर गर्भ कल्याणक।",
      kn: "ಜಿನವಾಣಿ ಪೂಜೆ. ಷಟ್ಖಂಡಾಗಮ ಗ್ರಂಥ ಪೂರ್ಣಗೊಂಡ ದಿನ. ಹಾಗೂ ಮಹಾವೀರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "festival"
  },
  "2026-07-20": {
    title: { en: "Neminath Moksha Kalyanak", hi: "नेमिनाथ मोक्ष कल्याणक", kn: "ನೇಮಿನಾಥ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ" },
    description: {
      en: "Tomorrow Bhagwan Neminath attained Nirvana from Girnar.",
      hi: "कल भगवान नेमिनाथ को गिरनार से निर्वाण प्राप्त हुआ।",
      kn: "ನಾಳೆ ಭಗವಾನ್ ನೇಮಿನಾಥರಿಗೆ ಗಿರನಾರ್ ಪರ್ವತದಿಂದ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿ."
    },
    type: "kalyanak"
  },
  
  // --- ASHTANHIKA PARVA (JULY SERIES) ---
  "2026-07-21": {
    title: { en: "Ashtanhika Begins (Day 1)", hi: "अष्टान्हिका (दिन 1)", kn: "ಅಷ್ಟಾಹ್ನಿಕ ಪ್ರಾರಂಭ (ದಿನ 1)" },
    description: {
      en: "Ashtami. Day 1 Mantra: Om Hreem Nandishwar Sanjnaya Namah",
      hi: "अष्टमी। दिन 1 मंत्र: ॐ ह्रीं नंदीश्वर संज्ञाय नमः",
      kn: "ಅಷ್ಟಮಿ. ದಿನ 1 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ನಂದೀಶ್ವರ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-22": {
    title: { en: "Ashtanhika (Day 2)", hi: "अष्टान्हिका (दिन 2)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 2)" },
    description: {
      en: "Day 2 Mantra: Om Hreem Ashtamahavibhuti Sanjnaya Namah",
      hi: "दिन 2 मंत्र: ॐ ह्रीं अष्टमहाविभूति संज्ञाय नमः",
      kn: "ದಿನ 2 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಅಷ್ಟಮಹಾವಿಭೂತಿ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-23": {
    title: { en: "Ashtanhika (Day 3)", hi: "अष्टान्हिका (दिन 3)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 3)" },
    description: {
      en: "Day 3 Mantra: Om Hreem Trilokasagara Sanjnaya Namah",
      hi: "दिन 3 मंत्र: ॐ ह्रीं त्रिलोकसागर संज्ञाय नमः",
      kn: "ದಿನ 3 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ತ್ರಿಲೋಕಸಾಗರ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-24": {
    title: { en: "Ashtanhika (Day 4)", hi: "अष्टान्हिका (दिन 4)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 4)" },
    description: {
      en: "Day 4 Mantra: Om Hreem Chaturmukha Sanjnaya Namah",
      hi: "दिन 4 मंत्र: ॐ ह्रीं चतुर्मुख संज्ञाय नमः",
      kn: "ದಿನ 4 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಚತುರ್ಮುಖ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-25": {
    title: { en: "Ashtanhika (Day 5)", hi: "अष्टान्हिका (दिन 5)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 5)" },
    description: {
      en: "Day 5 Mantra: Om Hreem Panchamahalakshana Sanjnaya Namah",
      hi: "दिन 5 मंत्र: ॐ ह्रीं पंचमहालक्षण संज्ञाय नमः",
      kn: "ದಿನ 5 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಪಂಚಮಹಾಲಕ್ಷಣ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-26": {
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" },
    description: {
      en: "Day 6 Mantra: Om Hreem Swargasopana Sanjnaya Namah",
      hi: "दिन 6 मंत्र: ॐ ह्रीं स्वर्गसोपान संज्ञाय नमः",
      kn: "ದಿನ 6 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸ್ವರ್ಗಸೋಪಾನ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-27": {
    title: { en: "Ashtanhika (Day 7)", hi: "अष्टान्हिका (दिन 7)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 7)" },
    description: {
      en: "Day 7 Mantra: Om Hreem Sarvasampatti Sanjnaya Namah",
      hi: "दिन 7 मंत्र: ॐ ह्रीं सर्वसंपत्ति संज्ञाय नमः",
      kn: "ದಿನ 7 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸರ್ವಸಂಪತ್ತಿ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "ashtanhika"
  },
  "2026-07-28": {
    title: { en: "Chaturdashi (Ashtanhika)", hi: "चतुर्दशी (अष्टान्हिका)", kn: "ಚತುರ್ದಶಿ (ಅಷ್ಟಾಹ್ನಿಕ)" },
    description: {
      en: "Chaturdashi. Continue Sadhana. Om Hreem Sarvasampatti Sanjnaya Namah.",
      hi: "चतुर्दशी। साधना जारी रखें।",
      kn: "ಚತುರ್ದಶಿ. ಸಾಧನೆ ಮುಂದುವರಿಸಿ."
    },
    type: "ashtanhika"
  },
  "2026-07-29": {
    title: { en: "Ashtanhika Ends & Guru Purnima", hi: "अष्टान्हिका समापन & गुरु पूर्णिमा", kn: "ಅಷ್ಟಾಹ್ನಿಕ ಸಮಾಪ್ತಿ & ಗುರು ಪೂರ್ಣಿಮಾ" },
    description: {
      en: "Day 8 Mantra: Om Hreem Indradhwaja Sanjnaya Namah. Honor your Guru today.",
      hi: "दिन 8 मंत्र: ॐ ह्रीं इंद्रध्वज संज्ञाय नमः। आज गुरु की वंदना करें।",
      kn: "ದಿನ 8 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಇಂದ್ರಧ್ವಜ ಸಂಜ್ಞಾಯ ನಮಃ. ಇಂದು ಗುರುವಂದನೆ ಮಾಡಿ."
    },
    type: "festival"
  },

  "2026-07-31": {
    title: { en: "Adinath Garbha", hi: "आदिनाथ गर्भ", kn: "ಆದಿನಾಥ ಗರ್ಭ" },
    description: {
      en: "Tomorrow is the Garbha Kalyanak of the First Tirthankar.",
      hi: "कल प्रथम तीर्थंकर का गर्भ कल्याणक है।",
      kn: "ನಾಳೆ ಪ್ರಥಮ ತೀರ್ಥಂಕರರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },

  // ================= AUGUST 2026 =================
  "2026-08-04": { title: { en: "Vasupujya Garbha", hi: "वासुपूज्य गर्भ", kn: "ವಾಸುಪೂಜ್ಯ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-08-06": {
    title: { en: "Vimalnath Moksha & Ashtami", hi: "विमलनाथ मोक्ष & अष्टमी", kn: "ವಿಮಲನಾಥ ಮೋಕ್ಷ & ಅಷ್ಟಮಿ" },
    description: {
      en: "Ashtami. Bhagwan Vimalnath attained Salvation from Sammed Shikhar.",
      hi: "अष्टमी। भगवान विमलनाथ को सम्मेद शिखर से मोक्ष प्राप्त हुआ।",
      kn: "ಅಷ್ಟಮಿ. ಭಗವಾನ್ ವಿಮಲನಾಥರಿಗೆ ಸಮ್ಮೇದ ಶಿಖರದಿಂದ ಮೋಕ್ಷ ಪ್ರಾಪ್ತಿ."
    },
    type: "kalyanak"
  },
  "2026-08-08": { title: { en: "Neminath Janma & Tap", hi: "नेमिनाथ जन्म & तप", kn: "ನೇಮಿನಾಥ ಜನ್ಮ & ತಪ" }, description: { en: "Birth and Tap Kalyanak of Neminath.", hi: "नेमिनाथ भगवान का जन्म और तप कल्याणक।", kn: "ನೇಮಿನಾಥ ಭಗವಂತರ ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-08-11": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-08-12": { title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, description: { en: "Chant 'Om Namah Siddhebhyah'.", hi: "'ॐ नमः सिद्धेभ्यः' का जाप करें।", kn: "'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಜಪಿಸಿ." }, type: "tithi" },
  "2026-08-14": { title: { en: "Sumatinath Garbha", hi: "सुमतिनाथ गर्भ", kn: "ಸುಮತಿನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-08-15": {
    title: { en: "Independence Day", hi: "स्वतंत्रता दिवस", kn: "ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ" },
    description: {
      en: "Celebrate the freedom of the nation. Strive for the ultimate freedom of the soul (Moksha).",
      hi: "राष्ट्र की स्वतंत्रता का उत्सव मनाएं। आत्मा की परम स्वतंत्रता (मोक्ष) के लिए प्रयास करें।",
      kn: "ರಾಷ್ಟ್ರದ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ಆಚರಿಸಿ. ಆತ್ಮದ ಪರಮ ಸ್ವಾತಂತ್ರ್ಯಕ್ಕಾಗಿ (ಮೋಕ್ಷ) ಶ್ರಮಿಸಿ."
    },
    type: "festival"
  },
  "2026-08-17": {
    title: { en: "Nag Panchami", hi: "नाग पंचमी", kn: "ನಾಗ ಪಂಚಮಿ" },
    description: {
      en: "Celebrate Non-Violence. Lord Parshvanath protected the snake couple (Dharanendra-Padmavati).",
      hi: "अहिंसा का उत्सव। भगवान पार्श्वनाथ ने नाग युगल (धरणेंद्र-पद्मावती) की रक्षा की थी।",
      kn: "ಅಹಿಂಸೆಯ ಆಚರಣೆ. ಭಗವಾನ್ ಪಾರ್ಶ್ವನಾಥರು ನಾಗ ದಂಪತಿಗಳನ್ನು (ಧರಣೇಂದ್ರ-ಪದ್ಮಾವತಿ) ರಕ್ಷಿಸಿದ ದಿನ."
    },
    type: "festival"
  },
  "2026-08-19": {
    title: { en: "Parshvanath Moksha (Mukut Saptami)", hi: "पार्श्वनाथ मोक्ष (मुकुट सप्तमी)", kn: "ಪಾರ್ಶ್ವನಾಥ ಮೋಕ್ಷ (ಮುಕುಟ ಸಪ್ತಮಿ)" },
    description: {
      en: "Lord Parshvanath attained Nirvana. A day of great devotion.",
      hi: "भगवान पार्श्वनाथ को निर्वाण प्राप्त हुआ। महान भक्ति का दिन।",
      kn: "ಭಗವಾನ್ ಪಾರ್ಶ್ವನಾಥರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿ. ಮಹಾನ್ ಭಕ್ತಿಯ ದಿನ."
    },
    type: "kalyanak"
  },
  "2026-08-20": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-08-25": {
    title: { en: "Acharya Shantisagar Punyatithi", hi: "आचार्य शांतिसागर पुण्यतिथि", kn: "ಆಚಾರ್ಯ ಶಾಂತಿಸಾಗರ ಪುಣ್ಯತಿಥಿ" },
    description: {
      en: "Samadhi Diwas of Charitra Chakravarti Acharya Shantisagar Ji.",
      hi: "चारित्र चक्रवर्ती आचार्य शांतिसागर जी का समाधि दिवस।",
      kn: "ಚಾರಿತ್ರ ಚಕ್ರವರ್ತಿ ಆಚಾರ್ಯ ಶಾಂತಿಸಾಗರ ಜೀ ಅವರ ಸಮಾಧಿ ದಿವಸ."
    },
    type: "festival"
  },
  "2026-08-27": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-08-28": {
    title: { en: "Raksha Bandhan & Shreyansnath Moksha", hi: "रक्षाबंधन & श्रेयांसनाथ मोक्ष", kn: "ರಕ್ಷಾ ಬಂಧನ & ಶ್ರೇಯಾಂಸನಾಥ ಮೋಕ್ಷ" },
    description: {
      en: "Vishnukumar Muni saved 700 Munis today. True 'Raksha' is protecting Dharma. Also Moksha Kalyanak.",
      hi: "विष्णु कुमार मुनि ने आज 700 मुनियों की रक्षा की थी। धर्म की रक्षा ही सच्ची रक्षा है। साथ ही मोक्ष कल्याणक।",
      kn: "ವಿಷ್ಣುಕುಮಾರ ಮುನಿಗಳು 700 ಮುನಿಗಳನ್ನು ರಕ್ಷಿಸಿದ ದಿನ. ಧರ್ಮ ರಕ್ಷಣೆಯೇ ನಿಜವಾದ ರಕ್ಷಣೆ. ಹಾಗೂ ಶ್ರೇಯಾಂಸನಾಥರ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  },
  "2026-08-30": { title: { en: "Munisuvratnath Garbha", hi: "मुनिसुव्रतनाथ गर्भ", kn: "ಮುನಿಸುವ್ರತನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },

  // ================= SEPTEMBER 2026 =================
  "2026-09-04": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-09-06": { title: { en: "Kuntunath Garbha", hi: "कुंथुनाथ गर्भ", kn: "ಕುಂತುನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-09-10": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-09-11": { title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, description: { en: "Chant 'Om Namah Siddhebhyah'.", hi: "'ॐ नमः सिद्धेभ्यः' का जाप करें।", kn: "'ಓಂ ನಮಃ ಸಿದ್ದೇಭ್ಯಃ' ಜಪಿಸಿ." }, type: "tithi" },

  // --- SHODASHKARAN & DAS LAKSHAN PARVA ---
  "2026-09-12": {
    title: { en: "Shodashkaran Starts (Day 1)", hi: "षोडशकारण प्रारंभ (दर्शन विशुद्धि)", kn: "ಷೋಡಶಕಾರಣ ಪ್ರಾರಂಭ (ದರ್ಶನ ವಿಶುದ್ಧಿ)" },
    description: {
      en: "Bhavana: Darshan Vishuddhi (Purity of Vision). Faith is the foundation of Dharma.",
      hi: "भावना: दर्शन विशुद्धि। सम्यक दर्शन धर्म की नींव है।",
      kn: "ಭಾವನೆ: ದರ್ಶನ ವಿಶುದ್ಧಿ. ಸಮ್ಯಕ್ ದರ್ಶನ ಧರ್ಮದ ಅಡಿಪಾಯ."
    },
    type: "festival"
  },
  "2026-09-13": {
    title: { en: "Shodashkaran (Day 2)", hi: "षोडशकारण (विनय संपन्नता)", kn: "ಷೋಡಶಕಾರಣ (ವಿನಯ ಸಂಪನ್ನತಾ)" },
    description: {
      en: "Bhavana: Vinay Sampannata. Practice humility towards the Dev, Shastra, and Guru.",
      hi: "भावना: विनय संपन्नता। देव, शास्त्र और गुरु के प्रति विनम्रता रखें।",
      kn: "ಭಾವನೆ: ವಿನಯ ಸಂಪನ್ನತಾ. ದೇವ, ಶಾಸ್ತ್ರ ಮತ್ತು ಗುರುಗಳಿಗೆ ವಿನಯ ತೋರಿ."
    },
    type: "festival"
  },
  "2026-09-14": {
    title: { en: "Shodashkaran (Day 3)", hi: "षोडशकारण (शीलव्रतेष्वनतिचार)", kn: "ಷೋಡಶಕಾರಣ (ಶೀಲವ್ರತೇಷ್ವನತಿಚಾರ)" },
    description: {
      en: "Bhavana: Sheelvrateshwanatichar. Observe vows and morality without faults.",
      hi: "भावना: शीलव्रतेष्वनतिचार। व्रतों और शील का निर्दोष पालन करें।",
      kn: "ಭಾವನೆ: ಶೀಲವ್ರತೇಷ್ವನತಿಚಾರ. ವ್ರತ ಮತ್ತು ಶೀಲವನ್ನು ದೋಷವಿಲ್ಲದೆ ಪಾಲಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-15": {
    title: { en: "Das Lakshan Begins (Uttam Kshama)", hi: "दशलक्षण पर्व (उत्तम क्षमा)", kn: "ದಶಲಕ್ಷಣ ಪರ್ವ (ಉತ್ತಮ ಕ್ಷಮಾ)" },
    description: {
      en: "Dharma: Uttam Kshama (Forgiveness). Bhavana: Abhikshana Gyanopayen (Constant pursuit of knowledge).",
      hi: "धर्म: उत्तम क्षमा। भावना: अभीक्ष्ण ज्ञानोपयोग।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಕ್ಷಮಾ. ಭಾವನೆ: ಅಭೀಕ್ಷ್ಣ ಜ್ಞಾನೋಪಯೋಗ."
    },
    type: "festival"
  },
  "2026-09-16": {
    title: { en: "Uttam Mardava & Panchameru", hi: "उत्तम मार्दव & पंचमेरू", kn: "ಉತ್ತಮ ಮಾರ್ಧವ & ಪಂಚಮೇರು" },
    description: {
      en: "Dharma: Uttam Mardava (Humility). Bhavana: Sanveg (Fear of worldly suffering). Crush your ego.",
      hi: "धर्म: उत्तम मार्दव (मान कषाय का त्याग)। भावना: संवेग।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಮಾರ್ಧವ. ಭಾವನೆ: ಸಂವೇಗ. ಅಹಂಕಾರವನ್ನು ತ್ಯಜಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-17": {
    title: { en: "Uttam Arjava & Suparshvanath Garbha", hi: "उत्तम आर्जव & सुपार्श्वनाथ गर्भ", kn: "ಉತ್ತಮ ಆರ್ಜವ & ಸುಪಾರ್ಶ್ವನಾಥ ಗರ್ಭ" },
    description: {
      en: "Dharma: Uttam Arjava (Simplicity/Honesty). Bhavana: Shaktitastyag (Renunciation per capacity).",
      hi: "धर्म: उत्तम आर्जव (माया कषाय का त्याग)। भावना: शक्तितस्त्याग।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಆರ್ಜವ. ಭಾವನೆ: ಶಕ್ತಿತಸ್ತ್ಯಾಗ. ಸರಳತೆಯೇ ಸತ್ಯ."
    },
    type: "festival"
  },
  "2026-09-18": {
    title: { en: "Uttam Satya (Truth)", hi: "उत्तम सत्य", kn: "ಉತ್ತಮ ಸತ್ಯ" },
    description: {
      en: "Dharma: Uttam Satya. Bhavana: Shaktitasap (Austerity per capacity). Speak only beneficial truth.",
      hi: "धर्म: उत्तम सत्य। भावना: शक्तितस्तप। हित-मित-प्रिय वचन बोलें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಸತ್ಯ. ಭಾವನೆ: ಶಕ್ತಿತಸ್ತಪ. ಹಿತ-ಮಿತ-ಪ್ರಿಯ ಸತ್ಯವನ್ನೇ ನುಡಿಯಿರಿ."
    },
    type: "festival"
  },
  "2026-09-19": {
    title: { en: "Uttam Shauch (Contentment)", hi: "उत्तम शौच (पवित्रता)", kn: "ಉತ್ತಮ ಶೌಚ" },
    description: {
      en: "Dharma: Uttam Shauch (Cleanliness of Soul/No Greed). Bhavana: Vayyavratyakaran (Service to Saints).",
      hi: "धर्म: उत्तम शौच (लोभ का त्याग)। भावना: वैयावृत्यकरण (मुनि सेवा)।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಶೌಚ (ಲೋಭ ತ್ಯಾಗ). ಭಾವನೆ: ವೈಯಾವೃತ್ಯಕರಣ (ಮುನಿ ಸೇವೆ)."
    },
    type: "festival"
  },
  "2026-09-20": {
    title: { en: "Uttam Sanyam (Self-Restraint)", hi: "उत्तम संयम", kn: "ಉತ್ತಮ ಸಂಯಮ" },
    description: {
      en: "Dharma: Uttam Sanyam. Bhavana: Arhadbhakti (Devotion to Arihants). Control your senses.",
      hi: "धर्म: उत्तम संयम। भावना: अर्हद्भक्ति। इंद्रियों पर नियंत्रण रखें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಸಂಯಮ. ಭಾವನೆ: ಅರ್ಹದ್ಭಕ್ತಿ. ಇಂದ್ರಿಯ ನಿಗ್ರಹ ಮಾಡಿ."
    },
    type: "festival"
  },
  "2026-09-21": {
    title: { en: "Uttam Tap (Penance)", hi: "उत्तम तप", kn: "ಉತ್ತಮ ತಪ" },
    description: {
      en: "Dharma: Uttam Tap. Bhavana: Acharyabhakti (Devotion to Acharyas). Burn your karmas.",
      hi: "धर्म: उत्तम तप। भावना: आचार्यभक्ति। कर्मों की निर्जरा करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ತಪ. ಭಾವನೆ: ಆಚಾರ್ಯಭಕ್ತಿ. ಕರ್ಮ ನಿರ್ಜರೆ ಮಾಡಿ."
    },
    type: "festival"
  },
  "2026-09-22": {
    title: { en: "Uttam Tyag (Renunciation)", hi: "उत्तम त्याग", kn: "ಉತ್ತಮ ತ್ಯಾಗ" },
    description: {
      en: "Dharma: Uttam Tyag. Bhavana: Bahushrutbhakti (Devotion to Scriptures/Upadhyayas). Give up attachment.",
      hi: "धर्म: उत्तम त्याग। भावना: बहुश्रुतभक्ति। परिग्रह का त्याग करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ತ್ಯಾಗ. ಭಾವನೆ: ಬಹುಶ್ರುತಭಕ್ತಿ. ಮೋಹವನ್ನು ತ್ಯಜಿಸಿ."
    },
    type: "festival"
  },
  "2026-09-23": {
    title: { en: "Uttam Akinchanya (Non-Attachment)", hi: "उत्तम आकिंचन्य", kn: "ಉತ್ತಮ ಆಕಿಂಚನ್ಯ" },
    description: {
      en: "Dharma: Uttam Akinchanya. Bhavana: Pravachan Bhakti (Devotion to Scripture). 'Nothing is mine'.",
      hi: "धर्म: उत्तम आकिंचन्य। भावना: प्रवचन भक्ति। 'मेरा कुछ नहीं है'।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಆಕಿಂಚನ್ಯ. ಭಾವನೆ: ಪ್ರವಚನ ಭಕ್ತಿ. 'ನನ್ನದು ಏನೂ ಇಲ್ಲ'."
    },
    type: "festival"
  },
  "2026-09-24": {
    title: { en: "Uttam Brahmacharya (Chastity)", hi: "उत्तम ब्रह्मचर्य", kn: "ಉತ್ತಮ ಬ್ರಹ್ಮಚರ್ಯ" },
    description: {
      en: "Dharma: Uttam Brahmacharya. Bhavana: Avashyakata Parihani (Non-neglect of duties). Dwell in the Soul.",
      hi: "धर्म: उत्तम ब्रह्मचर्य। भावना: आवश्यक अपरिहाणि। आत्मा में रमण करें।",
      kn: "ಧರ್ಮ: ಉತ್ತಮ ಬ್ರಹ್ಮಚರ್ಯ. ಭಾವನೆ: ಅವಶ್ಯಕ ಅಪರಿಹಾಣಿ. ಆತ್ಮದಲ್ಲಿ ಲೀನವಾಗಿ."
    },
    type: "festival"
  },
  "2026-09-25": {
    title: { en: "Ananta Chaturdashi & Vasupujya Moksha", hi: "अनंत चतुर्दशी & वासुपूज्य मोक्ष", kn: "ಅನಂತ ಚತುರ್ದಶಿ & ವಾಸುಪೂಜ್ಯ ಮೋಕ್ಷ" },
    description: {
      en: "Das Lakshan Ends. The Great Fasting Day. Bhavana: Marga Prabhavana (Promotion of Jain path).",
      hi: "दशलक्षण समापन। महापर्व। भावना: मार्ग प्रभावना। वासुपूज्य भगवान का मोक्ष।",
      kn: "ದಶಲಕ್ಷಣ ಸಮಾಪ್ತಿ. ಮಹಾಪರ್ವ. ಭಾವನೆ: ಮಾರ್ಗ ಪ್ರಭಾವನಾ. ವಾಸುಪೂಜ್ಯರ ಮೋಕ್ಷ ಕಲ್ಯಾಣಕ."
    },
    type: "festival"
  },
  "2026-09-26": {
    title: { en: "Shodashkaran Ends (Hunnime)", hi: "षोडशकारण समापन (पूर्णिमा)", kn: "ಷೋಡಶಕಾರಣ ಸಮಾಪ್ತಿ (ಹುಣ್ಣಿಮೆ)" },
    description: {
      en: "Bhavana: Pravachan Vatsalya (Affection for fellow brethren). Full Moon.",
      hi: "भावना: प्रवचन वात्सल्य (साधर्मियों से प्रेम)। पूर्णिमा।",
      kn: "ಭಾವನೆ: ಪ್ರವಚನ ವಾತ್ಸಲ್ಯ. ಹುಣ್ಣಿಮೆ."
    },
    type: "festival"
  },

  // ================= OCTOBER 2026 =================
  "2026-10-02": {
    title: { en: "Intl Ahimsa Day & Shantinath Garbha", hi: "अहिंसा दिवस & शांतिनाथ गर्भ", kn: "ಅಹಿಂಸಾ ದಿನ & ಶಾಂತಿನಾಥ ಗರ್ಭ" },
    description: {
      en: "Celebrate Non-Violence. Also Garbha Kalyanak of Bhagwan Shantinath.",
      hi: "अहिंसा दिवस। साथ ही भगवान शांतिनाथ का गर्भ कल्याणक।",
      kn: "ಅಹಿಂಸಾ ದಿನಾಚರಣೆ. ಹಾಗೂ ಭಗವಾನ್ ಶಾಂತಿನಾಥರ ಗರ್ಭ ಕಲ್ಯಾಣಕ."
    },
    type: "festival"
  },
  "2026-10-03": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-10-09": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-10-10": { title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, description: { en: "Chant Namokar Mantra.", hi: "णमोकार मंत्र का जाप करें।", kn: "ಣಮೋಕಾರ ಮಂತ್ರ ಜಪಿಸಿ." }, type: "tithi" },
  "2026-10-11": { title: { en: "Neminath Kevalgyan", hi: "नेमिनाथ केवलज्ञान", kn: "ನೇಮಿನಾಥ ಕೇವಲಜ್ಞಾನ" }, description: { en: "Omniscience of Bhagwan Neminath.", hi: "भगवान नेमिनाथ का केवलज्ञान।", kn: "ನೇಮಿನಾಥರ ಕೇವಲಜ್ಞಾನ." }, type: "kalyanak" },
  "2026-10-19": {
    title: { en: "Ayudh Puja & Sheetalnath Moksha", hi: "आयुध पूजा & शीतलनाथ मोक्ष", kn: "ಆಯುಧ ಪೂಜೆ & ಶೀತಲನಾಥ ಮೋಕ್ಷ" },
    description: {
      en: "Worship the 'Shastra' (Scriptures) as the true weapon against Karma. Sheetalnath Moksha.",
      hi: "शास्त्रों की पूजा करें (सच्चे शस्त्र)। शीतलनाथ भगवान का मोक्ष।",
      kn: "ಶಾಸ್ತ್ರ ಪೂಜೆ ಮಾಡಿ (ಕರ್ಮದ ವಿರುದ್ಧ ನಿಜವಾದ ಆಯುಧ). ಶೀತಲನಾಥರ ಮೋಕ್ಷ."
    },
    type: "festival"
  },
  "2026-10-20": {
    title: { en: "Vijay Dashami", hi: "विजय दशमी", kn: "ವಿಜಯ ದಶಮಿ" },
    description: {
      en: "Victory of Soul over Karma. A day to initiate education.",
      hi: "कर्मों पर आत्मा की विजय। विद्या आरंभ करने का दिन।",
      kn: "ಕರ್ಮದ ಮೇಲೆ ಆತ್ಮದ ವಿಜಯ. ವಿದ್ಯಾರಂಭ ಮಾಡಲು ಶುಭ ದಿನ."
    },
    type: "festival"
  },
  "2026-10-25": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-10-26": { title: { en: "Hunnime", hi: "पूर्णिमा", kn: "ಹುಣ್ಣಿಮೆ" }, description: { en: "Full Moon.", hi: "पूर्णिमा।", kn: "ಹುಣ್ಣಿಮೆ." }, type: "tithi" },
  "2026-10-27": { title: { en: "Neminath Garbha", hi: "नेमिनाथ गर्भ", kn: "ನೇಮಿನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },

  // ================= NOVEMBER 2026 =================
  "2026-11-02": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-11-07": {
    title: { en: "Dhanteras", hi: "धनतेरस", kn: "ಧನತ್ರಯೋದಶಿ" },
    description: {
      en: "Worship 'Divya Dhwani' (Divine Knowledge), the true wealth. Not material gold.",
      hi: "दिव्य ध्वनि (सच्चा धन) की पूजा करें, सोने-चांदी की नहीं।",
      kn: "ದಿವ್ಯ ಧ್ವನಿಯನ್ನು (ನಿಜವಾದ ಸಂಪತ್ತು) ಪೂಜಿಸಿ, ಭೌತಿಕ ಚಿನ್ನವನ್ನಲ್ಲ."
    },
    type: "festival"
  },
  "2026-11-08": {
    title: { en: "Narak Chaturdashi", hi: "नरक चतुर्दशी", kn: "ನರಕ ಚತುರ್ದಶಿ" },
    description: {
      en: "Destroy your sinful karmas to avoid Narak Gati. Prepare for Nirvana Utsav.",
      hi: "पाप कर्मों का नाश करें। निर्वाण उत्सव की तैयारी करें।",
      kn: "ಪಾಪ ಕರ್ಮಗಳನ್ನು ನಾಶಮಾಡಿ. ನಿರ್ವಾಣ ಉತ್ಸವಕ್ಕೆ ಸಿದ್ಧರಾಗಿ."
    },
    type: "festival"
  },
  "2026-11-09": {
    title: { en: "Mahavir Moksha (Deepavali)", hi: "महावीर मोक्ष (दीपावली)", kn: "ಮಹಾವೀರ ಮೋಕ್ಷ (ದೀಪಾವಳಿ)" },
    description: {
      en: "Bhagwan Mahavir attained Nirvana. Offer 'Nirvana Ladoo' in temple. Light the lamp of knowledge.",
      hi: "भगवान महावीर को निर्वाण प्राप्त हुआ। मंदिर में 'निर्वाण लाडू' चढ़ाएं। ज्ञान का दीपक जलाएं।",
      kn: "ಭಗವಾನ್ ಮಹಾವೀರರಿಗೆ ನಿರ್ವಾಣ ಪ್ರಾಪ್ತಿ. ದೇವಸ್ಥಾನದಲ್ಲಿ 'ನಿರ್ವಾಣ ಲಾಡು' ಅರ್ಪಿಸಿ. ಜ್ಞಾನದ ದೀಪ ಬೆಳಗಿ."
    },
    type: "kalyanak"
  },

  // --- ASHTANHIKA PARVA (NOV SERIES) ---
  "2026-11-17": {
    title: { en: "Ashtanhika Begins (Day 1)", hi: "अष्टान्हिका (दिन 1)", kn: "ಅಷ್ಟಾಹ್ನಿಕ ಪ್ರಾರಂಭ (ದಿನ 1)" },
    description: { en: "Ashtami. Day 1 Mantra: Om Hreem Nandishwar Sanjnaya Namah", hi: "दिन 1 मंत्र: ॐ ह्रीं नंदीश्वर संज्ञाय नमः", kn: "ದಿನ 1 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ನಂದೀಶ್ವರ ಸಂಜ್ಞಾಯ ನಮಃ" },
    type: "ashtanhika"
  },
  "2026-11-18": {
    title: { en: "Ashtanhika (Day 2)", hi: "अष्टान्हिका (दिन 2)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 2)" },
    description: { en: "Day 2 Mantra: Om Hreem Ashtamahavibhuti Sanjnaya Namah", hi: "दिन 2 मंत्र: ॐ ह्रीं अष्टमहाविभूति संज्ञाय नमः", kn: "ದಿನ 2 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಅಷ್ಟಮಹಾವಿಭೂತಿ ಸಂಜ್ಞಾಯ ನಮಃ" },
    type: "ashtanhika"
  },
  "2026-11-19": {
    title: { en: "Ashtanhika (Day 3)", hi: "अष्टान्हिका (दिन 3)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 3)" },
    description: { en: "Day 3 Mantra: Om Hreem Trilokasagara Sanjnaya Namah", hi: "दिन 3 मंत्र: ॐ ह्रीं त्रिलोकसागर संज्ञाय नमः", kn: "ದಿನ 3 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ತ್ರಿಲೋಕಸಾಗರ ಸಂಜ್ಞಾಯ ನಮಃ" },
    type: "ashtanhika"
  },
  "2026-11-20": {
    title: { en: "Ashtanhika (Day 4)", hi: "अष्टान्हिका (दिन 4)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 4)" },
    description: { en: "Day 4 Mantra: Om Hreem Chaturmukha Sanjnaya Namah", hi: "दिन 4 मंत्र: ॐ ह्रीं चतुर्मुख संज्ञाय नमः", kn: "ದಿನ 4 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಚತುರ್ಮುಖ ಸಂಜ್ಞಾಯ ನಮಃ" },
    type: "ashtanhika"
  },
  "2026-11-21": {
    title: { en: "Arnath Kevalgyan & Ashtanhika", hi: "अरनाथ केवलज्ञान & अष्टान्हिका", kn: "ಅರನಾಥ ಕೇವಲಜ್ಞಾನ & ಅಷ್ಟಾಹ್ನಿಕ" },
    description: {
      en: "Kalyanak & Day 5 Mantra: Om Hreem Panchamahalakshana Sanjnaya Namah",
      hi: "कल्याणक और मंत्र: ॐ ह्रीं पंचमहालक्षण संज्ञाय नमः",
      kn: "ಕಲ್ಯಾಣಕ ಮತ್ತು ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಪಂಚಮಹಾಲಕ್ಷಣ ಸಂಜ್ಞಾಯ ನಮಃ"
    },
    type: "kalyanak"
  },
  "2026-11-22": {
    title: { en: "Ashtanhika (Day 6)", hi: "अष्टान्हिका (दिन 6)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 6)" },
    description: { en: "Day 6 Mantra: Om Hreem Swargasopana Sanjnaya Namah", hi: "दिन 6 मंत्र: ॐ ह्रीं स्वर्गसोपान संज्ञाय नमः", kn: "ದಿನ 6 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸ್ವರ್ಗಸೋಪಾನ ಸಂಜ್ಞಾಯ ನಮಃ" },
    type: "ashtanhika"
  },
  "2026-11-23": {
    title: { en: "Ashtanhika (Day 7)", hi: "अष्टान्हिका (दिन 7)", kn: "ಅಷ್ಟಾಹ್ನಿಕ (ದಿನ 7)" },
    description: { en: "Day 7 Mantra: Om Hreem Sarvasampatti Sanjnaya Namah", hi: "दिन 7 मंत्र: ॐ ह्रीं सर्वसंपत्ति संज्ञाय नमः", kn: "ದಿನ 7 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಸರ್ವಸಂಪತ್ತಿ ಸಂಜ್ಞಾಯ ನಮಃ" },
    type: "ashtanhika"
  },
  "2026-11-24": {
    title: { en: "Ashtanhika Ends (Hunnime)", hi: "अष्टान्हिका समापन (पूर्णिमा)", kn: "ಅಷ್ಟಾಹ್ನಿಕ ಸಮಾಪ್ತಿ (ಹುಣ್ಣಿಮೆ)" },
    description: { en: "Day 8 Mantra: Om Hreem Indradhwaja Sanjnaya Namah. Visarjan.", hi: "दिन 8 मंत्र: ॐ ह्रीं इंद्रध्वज संज्ञाय नमः। विसर्जन।", kn: "ದಿನ 8 ಮಂತ್ರ: ಓಂ ಹ್ರೀಂ ಇಂದ್ರಧ್ವಜ ಸಂಜ್ಞಾಯ ನಮಃ. ವಿಸರ್ಜನೆ." },
    type: "festival"
  },

  "2026-11-25": { title: { en: "Anantanath Garbha", hi: "अनंतनाथ गर्भ", kn: "ಅನಂತನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-11-26": { title: { en: "Anantanath Kevalgyan", hi: "अनंतनाथ केवलज्ञान", kn: "ಅನಂತನಾಥ ಕೇವಲಜ್ಞಾನ" }, description: { en: "Kevalgyan Kalyanak.", hi: "केवलज्ञान कल्याणक।", kn: "ಕೇವಲಜ್ಞಾನ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-11-28": { title: { en: "Sambhavnath Kevalgyan", hi: "संभवनाथ केवलज्ञान", kn: "ಸಂಭವನಾಥ ಕೇವಲಜ್ಞಾನ" }, description: { en: "Omniscience of Sambhavnath.", hi: "भगवान संभवनाथ का केवलज्ञान।", kn: "ಸಂಭವನಾಥರ ಕೇವಲಜ್ಞಾನ." }, type: "kalyanak" },
  "2026-11-29": { title: { en: "Neminath Garbha", hi: "नेमिनाथ गर्भ", kn: "ನೇಮಿನಾಥ ಗರ್ಭ" }, description: { en: "Garbha Kalyanak.", hi: "गर्भ कल्याणक।", kn: "ಗರ್ಭ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },

  // ================= DECEMBER 2026 =================
  "2026-12-01": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-12-06": { title: { en: "Padmaprabh Janma & Tap", hi: "पद्मप्रभु जन्म & तप", kn: "ಪದ್ಮಪ್ರಭು ಜನ್ಮ & ತಪ" }, description: { en: "Birth and Tap Kalyanak.", hi: "जन्म और तप कल्याणक।", kn: "ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-12-07": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-12-08": { title: { en: "Amavasya", hi: "अमावस्या", kn: "ಅಮಾವಾಸ್ಯೆ" }, description: { en: "Chant Namokar Mantra.", hi: "णमोकार मंत्र का जाप करें।", kn: "ಣಮೋಕಾರ ಮಂತ್ರ ಜಪಿಸಿ." }, type: "tithi" },
  "2026-12-09": { title: { en: "Pushpadant Janma & Tap", hi: "पुष्पदंत जन्म & तप", kn: "ಪುಷ್ಪದಂತ ಜನ್ಮ & ತಪ" }, description: { en: "Birth and Tap Kalyanak.", hi: "जन्म और तप कल्याणक।", kn: "ಜನ್ಮ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-12-17": { title: { en: "Ashtami", hi: "अष्टमी", kn: "ಅಷ್ಟಮಿ" }, description: { en: "Hari Tyag.", hi: "हरी त्याग।", kn: "ಹಸಿರು ತ್ಯಾಗ." }, type: "tithi" },
  "2026-12-19": { title: { en: "Arnath Tap", hi: "अरनाथ तप", kn: "ಅರನಾಥ ತಪ" }, description: { en: "Tap Kalyanak.", hi: "तप कल्याणक।", kn: "ತಪ ಕಲ್ಯಾಣಕ." }, type: "kalyanak" },
  "2026-12-20": {
    title: { en: "Mallinath Janma & Diksha", hi: "मल्लीनाथ जन्म & दीक्षा", kn: "ಮಲ್ಲಿನಾಥ ಜನ್ಮ & ದೀಕ್ಷಾ" },
    description: {
      en: "Birth and Initiation of Bhagwan Mallinath.",
      hi: "भगवान मल्लीनाथ का जन्म और दीक्षा।",
      kn: "ಭಗವಾನ್ ಮಲ್ಲಿನಾಥರ ಜನ್ಮ ಮತ್ತು ದೀಕ್ಷಾ."
    },
    type: "kalyanak"
  },
  "2026-12-23": { title: { en: "Chaturdashi", hi: "चतुर्दशी", kn: "ಚತುರ್ದಶಿ" }, description: { en: "Fasting Day.", hi: "उपवास दिवस।", kn: "ಉಪವಾಸ ದಿನ." }, type: "tithi" },
  "2026-12-24": {
    title: { en: "Sambhavnath Tap & Hunnime", hi: "संभवनाथ तप & पूर्णिमा", kn: "ಸಂಭವನಾಥ ತಪ & ಹುಣ್ಣಿಮೆ" },
    description: {
      en: "Full Moon & Tap Kalyanak.",
      hi: "पूर्णिमा और तप कल्याणक।",
      kn: "ಹುಣ್ಣಿಮೆ ಮತ್ತು ತಪ ಕಲ್ಯಾಣಕ."
    },
    type: "kalyanak"
  }
};