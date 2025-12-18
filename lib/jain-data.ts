// lib/jain-data.ts

export type Section = {
  type: "text" | "sacred-card" | "line-meaning" | "paramesthi-grid" | "deep-essay"| "science-breakdown" | "story-mode";
  heading: { en: string; hi: string; kn: string };
  content?: { en: string; hi: string; kn: string };
  lines?: { original: string; meaning: { en: string; hi: string; kn: string } }[];
  items?: any[];
};

export type Chapter = {
  chapterNumber: number;
  chapterTitle: { en: string; hi: string; kn: string };
  sections: Section[];
};

export type Topic = {
  id: string;
  title: { en: string; hi: string; kn: string };
  subtitle: { en: string; hi: string; kn: string };
  chapters: Chapter[];
};

export const jainTopics: Record<string, Topic> = {
  "namokar-mantra": {
    id: "namokar-mantra",
    title: { en: "Namokar Mantra", hi: "णमोकार मंत्र", kn: "ಣಮೋಕಾರ ಮಂತ್ರ" },
    subtitle: { en: "The Maha-Mantra of Jainism", hi: "जैन धर्म का महामंत्र", kn: "ಜೈನ ಧರ್ಮದ ಮಹಾಮಂತ್ರ" },
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: { en: "The Foundation", hi: "मूल स्वरूप और अर्थ", kn: "ಮೂಲ ಸ್ವರೂಪ ಮತ್ತು ಅರ್ಥ" },
        sections: [
          {
            type: "sacred-card",
            heading: { en: "The Main Mantra", hi: "मूल महामंत्र", kn: "ಮೂಲ ಮಹಾಮಂತ್ರ" },
            content: {
              en: "Ṇamō Arihantāṇaṁ\nṆamō Siddhāṇaṁ\nṆamō Āyariyāṇaṁ\nṆamō Uvajjhāyāṇaṁ\nṆamō Lōē Savva Sāhūṇaṁ",
              hi: "णमो अरिहंताणं\nणमो सिद्धाणं\nणमो आयरियाणं\nणमो उवज्झायाणं\nणमो लोए सव्व साहूणं",
              kn: "ಣಮೋ ಅರಿಹಂತಾಣಂ\nಣಮೋ ಸಿದ್ಧಾಣಂ\nಣಮೋ ಆಯರಿಯಾಣಂ\nಣಮೋ ಉವಜ್ಜಾಯಾಣಂ\nಣಮೋ ಲೋಏ ಸವ್ವ ಸಾಹೂಣಂ"
            }
          },
          {
            type: "line-meaning",
            heading: { en: "Line-by-Line Meaning", hi: "पद-क्रम अर्थ", kn: "ಪದ-ಕ್ರಮ ಅರ್ಥ" },
            lines: [
              { original: "Ṇamō Arihantāṇaṁ", meaning: { en: "I bow to the Arihants—the victors who have conquered inner enemies.", hi: "मैं अरिहंतों को नमन करता हूँ—जिन्होंने मोह-राग-द्वेष जैसे आंतरिक शत्रुओं को जीता है।", kn: "ನಾನು ಅರಿಹಂತರಿಗೆ ನಮಸ್ಕರಿಸುತ್ತೇನೆ." } },
              { original: "Ṇamō Siddhāṇaṁ", meaning: { en: "I bow to the Siddhas—the liberated souls who have attained perfection.", hi: "मैं सिद्धों को नमन करता हूँ—जो अष्ट कर्मों से मुक्त होकर सिद्धशिला पर विराजमान हैं।", kn: "ನಾನು ಸಿದ್ಧರಿಗೆ ನಮಸ್ಕರಿಸುತ್ತೇನೆ." } },
              { original: "Ṇamō Āyariyāṇaṁ", meaning: { en: "I bow to the Acharyas—the spiritual leaders who guide the community.", hi: "मैं आचार्यों को नमन करता हूँ—जो पंचाचार का पालन करते हैं और संघ के नायक हैं।", kn: "ನಾನು ಆಚಾರ್ಯರಿಗೆ ನಮಸ್ಕರಿಸುತ್ತೇನೆ." } },
              { original: "Ṇamō Uvajjhāyāṇaṁ", meaning: { en: "I bow to the Upadhyays—the learned preceptors who teach the scriptures.", hi: "मैं उपाध्यायों को नमन करता हूँ—जो स्वयं शास्त्रों के ज्ञाता हैं और दूसरों को ज्ञान देते हैं।", kn: "ನಾನು ಉಪಾಧ್ಯಾಯರಿಗೆ ನಮಸ್ಕರಿಸುತ್ತೇನೆ." } },
              { original: "Ṇamō Lōē Savva Sāhūṇaṁ", meaning: { en: "I bow to all the Sadhus in the universe—the seekers of the soul.", hi: "मैं इस लोक के सभी साधुओं को नमन करता हूँ—जो मोक्ष मार्ग पर निरंतर कार्यरत हैं।", kn: "ನಾನು ಲೋಕದ ಎಲ್ಲಾ ಸಾಧುಗಳಿಗೆ ನಮಸ್ಕರಿಸುತ್ತೇನೆ." } },
            ]
          },
          {
            type: "deep-essay",
            heading: { en: "The Five Paramesthis", hi: "पंच परमेष्ठी परिचय", kn: "ಪಂಚ ಪರಮೇಷ್ಠಿ ಪರಿಚಯ" },
            content: {
              en: "The Namokar Mantra does not name a specific person like Mahavira or Rishabhdev; it bows to the 'Guna' (qualities). \n\n1. Arihants: Souls with a body who have destroyed 4 Ghati Karmas and possess 46 virtues. \n2. Siddhas: Pure souls without a body who have destroyed all 8 Karmas and possess 8 primary virtues. \n3. Acharyas: Leaders of the monkhood who possess 36 virtues. \n4. Upadhyayas: Scriptural teachers with 25 virtues. \n5. Sadhus: Ascetics practicing the 28 primary virtues (Mula-gunas).",
              hi: "णमोकार मंत्र किसी व्यक्ति विशेष को नहीं, बल्कि गुणों को नमन करता है। \n\n१. अरिहंत: जिन्होंने ४ घातिया कर्मों का नाश किया है और ४६ मूल गुणों से युक्त हैं।\n२. सिद्ध: जो अशरीरी हैं, ८ कर्मों से मुक्त हैं और ८ गुणों से युक्त हैं।\n३. आचार्य: जो ३६ गुणों के धारक हैं और संघ का संचालन करते हैं।\n४. उपाध्याय: जो २५ गुणों के धारक हैं और ज्ञान का प्रसार करते हैं।\n५. साधु: जो २८ मूल गुणों का पालन करते हुए आत्म-साधना में लीन हैं।",
              kn: "ಪಂಚ ಪರಮೇಷ್ಠಿಗಳ ವಿವರಣೆ..."
            }
          },
          {
            type: "sacred-card",
            heading: { en: "The Fruit-of-Recitation Verse", hi: "फलश्रुति गाथा", kn: "ಫಲಶ್ರುತಿ ಗಾದೆ" },
            content: {
              en: "Eso Pancha Namokaro,\nSavva Pavappanasano,\nMangalanam ca Savvesim,\nPadhamam Havai Mangalam.",
              hi: "एसो पंच णमोक्कारो,\nसव्व पावप्पणासणो।\nमंगलाणं च सव्वेसिं,\nपढमं हवई मंगलं॥",
              kn: "ಏಸೋ ಪಂಚ ಣಮುಕ್ಕಾರೋ,\nಸವ್ವ ಪಾವಪ್ಪಣಾಸಣೋ।\nಮಂಗಲಾಣಂ ಚ ಸವ್ವೇಸಿಂ,\nಪಢಮಂ ಹವಈ ಮಂಗಲಂ॥"
            }
          },
          {
            type: "line-meaning",
            heading: { en: "Meaning of the Verse", hi: "गाथा का अर्थ", kn: "ಗಾಥೆಯ ಅರ್ಥ" },
            lines: [
              { original: "Eso Pancha Namokaro", meaning: { en: "This five-fold salutation...", hi: "यह पंच-नमस्कार मंत्र (पाँच परमेष्ठियों को नमस्कार)", kn: "ಈ ಪಂಚ ನಮಸ್ಕಾರ ಮಂತ್ರವು" } },
              { original: "Savva Pavappanasano", meaning: { en: "Is the destroyer of all sins.", hi: "सभी पापों का नाश करने वाला है", kn: "ಎಲ್ಲಾ ಪಾಪಗಳನ್ನು ನಾಶಮಾಡುತ್ತದೆ" } },
              { original: "Mangalanam ca Savvesim", meaning: { en: "Among all auspicious things...", hi: "संसार के समस्त मंगलों (शुभ और कल्याणकारी वस्तुओं/विचारों) में", kn: "ಲೋಕದ ಎಲ್ಲಾ ಮಂಗಳಕರ (ಶುಭ) ವಸ್ತುಗಳಲ್ಲೇ ಅಥವಾ ವಿಷಯಗಳಲ್ಲೇ" } },
              { original: "Padhamam Havai Mangalam", meaning: { en: "This is the foremost and supreme auspiciousness.", hi: "यह सबसे प्रथम और सर्वश्रेष्ठ मंगल है।", kn: "ಇದು ಅತ್ಯಂತ ಶ್ರೇಷ್ಠ ಮಂಗಳಕರವಾಗಿದೆ." } },
            ]
          }
        ]
      },
      {
        chapterNumber: 2,
        chapterTitle: { en: "Identity and Attributes", hi: "मंत्र की पहचान और गुण", kn: "ಮಂತ್ರದ ಗುರುತು ಮತ್ತು ಗುಣಗಳು" },
        sections: [
          {
            type: "deep-essay",
            heading: { en: "The 1008 Names", hi: "महामंत्र के १००८ नाम", kn: "ಮಹಾಮಂತ್ರದ ೧೦೦೮ ಹೆಸರುಗಳು" },
            content: {
              en: "According to ancient Jain scriptures, the Namokar Mantra possesses infinite virtues, leading to 1008 distinct names. \n\n* Anadi-Nidhan Mantra: Eternal; it was never created and can never be destroyed.\n* Maha-Mantra: The 'Greatest' as it encompasses the essence of all knowledge.\n* Aparajita Mantra: Invincible; it cannot be defeated by any external or internal obstacles.\n* Mula-Mantra: The root from which the entire tree of Jain philosophy grows.",
              hi: "प्राचीन शास्त्रों के अनुसार, इस मंत्र के गुणों के कारण इसके १००८ नाम हैं। \n\n* अनादि-निधन: इसका न कोई रचयिता है न अंत। यह शाश्वत ब्रह्मांडीय नियम है।\n* महामंत्र: सर्वश्रेष्ठ, क्योंकि यह गुणों की वंदना करता है।\n* अपराजित: जिसे कोई जीत न सके, जो समस्त विघ्नों का नाश करे।\n* मूलमंत्र: वह बीज जिससे संपूर्ण जैन दर्शन का वृक्ष विकसित हुआ है।",
              kn: "೧೦೦೮ ಹೆಸರುಗಳ ವಿವರ..."
            }
          },
          {
            type: "paramesthi-grid",
            heading: { en: "Pancha Paramesthi Attributes", hi: "परमेष्ठी स्वरूप और वर्ण", kn: "ಪರಮೇಷ್ಠಿ ಸ್ವರೂಪ ಮತ್ತು ಬಣ್ಣ" },
            items: [
              { name: {en: "Arihant", hi: "अरिहंत"}, color: "bg-white text-gray-800", desc: {en: "White - Purity", hi: "श्वेत - पूर्ण वीतरागता"} },
              { name: {en: "Siddha", hi: "सिद्ध"}, color: "bg-red-600 text-white", desc: {en: "Red - Infinite Energy", hi: "रक्त - शुद्ध चैतन्य शक्ति"} },
              { name: {en: "Acharya", hi: "आचार्य"}, color: "bg-yellow-500 text-black", desc: {en: "Yellow - Leadership", hi: "पीत - आचार्य पद का गौरव"} },
              { name: {en: "Upadhyay", hi: "उपाध्याय"}, color: "bg-green-600 text-white", desc: {en: "Green - Knowledge", hi: "हरित - शास्त्रों का ज्ञान"} },
              { name: {en: "Sadhu", hi: "साधु"}, color: "bg-blue-700 text-white", desc: {en: "Blue - Detachment", hi: "नील - गहरा वैराग्य"} },
            ]
          },
          {
            type: "deep-essay",
            heading: { en: "Why This Mantra is Eternal and Unique?", hi: "मंत्र की शाश्वतता और विशिष्टता", kn: "ಮಂತ್ರದ ಶಾಶ್ವತತೆ ಮತ್ತು ವಿಶಿಷ್ಟತೆ" },
            content: {
              en: "Eternal (Anadi): The Namokar Mantra is regarded as anādi—beginningless and eternal. Unlike texts composed by historical authors or prophets, it is not understood as a human creation tied to a specific time, place, or individual. In Jain philosophy, the mantra reflects a timeless spiritual principle: the recognition of perfected states of consciousness that lead to liberation (moksha).\n\nThe Namokar Mantra does not originate with any single Tīrthaṅkara of the current time cycle. Rather, it is considered a constant expression of the cosmic moral order (dharma) that governs the soul’s journey across all eras—past, present, and future. As long as souls attain liberation and perfected states exist, the meaning and relevance of the Namokar Mantra remain unchanged. In this sense, the mantra transcends historical cycles and sectarian boundaries.\n\nUnique (Guṇa-vācaka Rather Than Vyakti-vācaka)\nA defining feature of the Namokar Mantra is that it is guṇa-vācaka (attribute-oriented) rather than vyakti-vācaka (person-oriented). While many religious prayers address a specific deity or historical figure, the Namokar Mantra directs reverence toward spiritual states and qualities. It does not sanctify an individual personality, but the level of inner purification and consciousness that such a being represents.\n\nWhen one recites “Namo Arihantāṇam,” the reverence is not offered to a particular person, but to the state of Arihantahood itself—a soul that has destroyed all inner enemies such as attachment, aversion, and ignorance, and has attained perfect knowledge while still embodied. The same principle applies to Siddhas, Āchāryas, Upādhyāyas, and Sādhus: the mantra honors attainments, not identities, making it universal, non-sectarian, and independent of time, place, or lineage.",
              hi: "शाश्वतता (अनादि): यह मंत्र किसी व्यक्ति की रचना नहीं है। यह आत्मा की मुक्ति के मार्ग का प्राकृतिक ध्वनि-क्रम है। यह काल के प्रवाह से परे है।\n\nविशिष्टता: संसार की अधिकांश प्रार्थनाएं 'व्यक्ति-वाचक' होती हैं, लेकिन णमोकार मंत्र 'गुण-वाचक' है। यहाँ व्यक्ति को नहीं, बल्कि उसके भीतर प्रगट हुए 'अरिहंतत्व' या 'सिद्धत्व' को नमन किया जाता है। यही कारण है कि यह मंत्र सार्वभौमिक और पक्षपात रहित है।",
              kn: "ಶಾಶ್ವತತೆ ಮತ್ತು ವಿಶಿಷ್ಟತೆಯ ವಿವರಣೆ..."
            }
          },
          {
            type: "deep-essay",
            heading: { en: "Standalone Mantra Power", hi: "प्रत्येक पद एक स्वतंत्र मंत्र", kn: "ಪ್ರತಿಯೊಂದು ಪದವು ಒಂದು ಸ್ವತಂತ್ರ ಮಂತ್ರ" },
            content: {
              en: "Each word—Arihantanam, Siddhanam, or even the syllable 'Om'—is a complete mantra in itself. \n\n* Om (ॐ): It is a composite of A+A+A+U+M, representing the five Paramesthis.\n* Arihantanam: Reciting just this word invokes the energy of total victory over the self.\nIf a person is in an emergency and cannot recite the whole mantra, reciting a single line or even just 'Namo Siddhanam' provides the same spiritual protection as the whole.",
              hi: "इसका एक-एक पद जैसे 'अरिहंताणं' या 'सिद्धाणं' अपने आप में एक पूर्ण महामंत्र है।\n\n* ॐ: यह पंच परमेष्ठी के नामों के प्रथम अक्षरों (अ+अ+अ+उ+म) से बना साक्षात मंत्र स्वरूप है।\n* शक्ति: आपातकाल में या समय के अभाव में यदि कोई केवल एक पद का भी पूर्ण श्रद्धा से स्मरण करता है, तो उसे संपूर्ण महामंत्र के समान ही आध्यात्मिक संरक्षण प्राप्त होता है।",
              kn: "ಪ್ರತಿಯೊಂದು ಪದದ ಮಹತ್ವ..."
            }
          }
        ]
      },
      // lib/jain-data.ts -> Add these into the 'chapters' array for namokar-mantra

      {
        chapterNumber: 3,
        chapterTitle: { en: "Science and Grammar", hi: "विज्ञान और व्याकरण", kn: "ವಿಜ್ಞಾನ ಮತ್ತು ವ್ಯಾಕರಣ" },
        sections: [
          {
            type: "science-breakdown",
            heading: { en: "The 35 Aksharas (Letters)", hi: "३५ अक्षरों का गणित", kn: "೩೫ ಅಕ್ಷರಗಳ ಗಣಿತ" },
            content: {
              en: "The main mantra consists of exactly 35 letters. In Jain science, these 35 vibrations align with the 35 primary energy channels of the human soul. \n\n1. Namo Arihantanam (7)\n2. Namo Siddhanam (5)\n3. Namo Ayariyanam (7)\n4. Namo Uvajjhayanam (9)\n5. Namo Loe Savva Sahunam (7)\nTotal: 35 Aksharas.",
              hi: "मूल मंत्र में ठीक ३५ अक्षर हैं। जैन विज्ञान के अनुसार, ये ३५ ध्वनियाँ आत्मा की ३५ मुख्य ऊर्जा प्रणालियों के साथ प्रतिध्वनित होती हैं। \n\n१. णमो अरिहंताणं (७ अक्षर)\n२. णमो सिद्धाणं (५ अक्षर)\n३. णमो आयरियाणं (७ अक्षर)\n४. णमो उवज्झायाणं (९ अक्षर)\n५. णमो लोए सव्व साहूणं (७ अक्षर)\nकुल योग: ३५ अक्षर।",
              kn: "೩೫ ಅಕ್ಷರಗಳ ವಿವರಣೆ..."
            }
          },
          {
            type: "text",
            heading: { en: "The 58 Matras (Beats)", hi: "५८ मात्राओं का रहस्य", kn: "೫೮ ಮಾತ್ರೆಗಳ ರಹಸ್ಯ" },
            content: {
              en: "While the letters are 35, the 'Matras' (time-length of sounds) total 58. This specific rhythm creates a 'Chanda' (meter) that calms the nervous system and allows the mind to enter a state of deep 'Samadhi' or focused meditation. This is why the rhythm of the mantra is as important as the words.",
              hi: "अक्षरों की संख्या ३५ है, लेकिन उनकी 'मात्राएँ' (ध्वनि की लंबाई) कुल ५८ हैं। यह विशिष्ट लय एक ऐसा 'छंद' बनाती है जो तंत्रिका तंत्र को शांत करता है और मन को गहरी समाधि में ले जाने में सक्षम बनाता है।",
              kn: "೫೮ ಮಾತ್ರೆಗಳ ರಹಸ್ಯ ವಿವರ..."
            }
          },
          {
            type: "deep-essay",
            heading: { en: "Grammar: The Language of Prakrit", hi: "प्राकृत व्याकरण और विशेषता", kn: "ಪ್ರಾಕೃತ ವ್ಯಾಕರಣದ ವಿಶಿಷ್ಟತೆ" },
            content: {
              en: "The mantra is written in **Ardhamagadhi Prakrit**, the language of the masses during the time of the Tirthankaras. \n\nUnique Feature: Notice there are no verbs like 'Give me' or 'Protect me'. The grammar is purely focused on **'Namo'** (Salutation). By removing the 'self' from the grammar, the mantra automatically shifts the focus from 'Begging' to 'Becoming'. You don't ask the Siddha for something; you bow to the Siddha-state so that you may achieve it yourself.",
              hi: "यह मंत्र **अर्धमागधी प्राकृत** भाषा में है। \n\nविशेषता: ध्यान दें कि इसमें 'मुझे कुछ दो' या 'मेरी रक्षा करो' जैसे कोई क्रिया शब्द नहीं हैं। पूरा व्याकरण केवल **'णमो'** (नमस्कार) पर केंद्रित है। इसमें 'मैं' का अभाव है, जो भक्त को 'याचना' (Begging) से हटाकर 'साधना' (Becoming) की ओर ले जाता है।",
              kn: "ಪ್ರಾಕೃತ ವ್ಯಾಕರಣದ ಮಹತ್ವ..."
            }
          }
        ]
      },
      {
        chapterNumber: 4,
        chapterTitle: { en: "Stories of Mahatmya", hi: "महात्म्य की कथाएँ", kn: "ಮಹಾತ್ಮ್ಯದ ಕಥೆಗಳು" },
        sections: [
          {
            type: "story-mode",
            heading: { en: "The Faith of Anjan Chor(Thief)", hi: "अंजन चोर की कथा", kn: "ಅಂಜನ ಚೋರನ ಕಥೆ" },
            content: {
              en: "Anjan was a notorious thief, but he possessed one quality: Absolute Faith. When he was told that the Namokar Mantra could make a person walk on air, he didn't doubt it for a second. While learned scholars were busy calculating the grammar, Anjan tied a rope, chanted 'Namo Siddhanam', and jumped with total surrender. \n\nResult: Because his faith was 100%, the mantra manifested its power, and he attained sky-walking powers and eventually, spiritual liberation. This story teaches that 'Bhaav' (Intensity of feeling) is more powerful than just 'Shabd' (Words).",
              hi: "अंजन एक कुख्यात चोर था, लेकिन उसके पास एक गुण था: अटूट श्रद्धा। जब उसे बताया गया कि णमोकार मंत्र के प्रभाव से व्यक्ति आकाश में चल सकता है, तो उसने एक क्षण के लिए भी संदेह नहीं किया। जहाँ विद्वान व्याकरण की गणना में लगे थे, अंजन ने रस्सी बांधी, 'णमो सिद्धाणं' कहा और पूर्ण समर्पण के साथ कूद गया। \n\nपरिणाम: उसकी निष्कपट श्रद्धा के कारण मंत्र सिद्ध हो गया और उसने आकाश-गामिनी विद्या प्राप्त की। यह कथा सिखाती है कि 'शब्द' से अधिक 'भाव' बलवान होता है।",
              kn: "ಅಂಜನ ಚೋರನ ಕಥೆ ಮತ್ತು ಸಂದೇಶ..."
            }
          },
          {
            type: "story-mode",
            heading: { en: "The Transformation of the Spear: Seth Sudarshan", hi: "सुलक्षणा सेठ सुदर्शन: शूली से सिंहासन", kn: "ಸೇಠ್ ಸುದರ್ಶನನ ಕಥೆ" },
            content: {
              en: "Seth Sudarshan was falsely accused and sentenced to death by 'Shooli' (impalement on a spear). As the executioner approached, Sudarshan sat in deep meditation, reciting the Namokar Mantra with total equanimity. \n\n**The Miracle:** Just as he was about to be executed, the sharp iron spear transformed into a golden throne, and the execution ground turned into a garden of flowers. This story highlights that the mantra can change the very laws of nature when the devotee's 'Bhav' is pure and undisturbed by fear.",
              hi: "सेठ सुदर्शन पर झूठा आरोप लगाया गया और उन्हें 'शूली' (भाले पर चढ़ाने) की सजा सुनाई गई। जब वध करने वाला पास आया, तो सुदर्शन गहरे ध्यान में बैठ गए और पूर्ण समभाव के साथ णमोकार मंत्र का जाप करने लगे। \n\n**चमत्कार:** जैसे ही उन्हें शूली पर चढ़ाया जाने वाला था, वह तीखा लोहे का भाला एक स्वर्ण सिंहासन में बदल गया। यह कथा सिखाती है कि जब भक्त का भाव निर्मल और निर्भय होता है, तो मंत्र प्रकृति के नियमों को भी बदलने की शक्ति रखता है।",
              kn: "ಸೇಠ್ ಸುದರ್ಶನನ ಕಥೆ ಮತ್ತು ಸಂದೇಶ..."
            }
          },
          {
            type: "story-mode",
            heading: { en: "The Salvation of the Elephant: Padma Kumar", hi: "पद्म कुमार हाथी का उद्धार", kn: "ಪದ್ಮ ಕುಮಾರ ಆನೆಯ ಕಥೆ" },
            content: {
              en: "A royal elephant named Padma Kumar was once trapped in a swamp, dying in immense pain. King Shrenik, seeing the elephant's agony, did not try to pull him out with ropes. Instead, he whispered the Namokar Mantra into the elephant's ear. \n\n**The Result:** Hearing the sacred vibrations, the elephant's mind became calm and he forgot his physical pain. He died with peaceful thoughts and was reborn as a Celestial Being (Deva). This proves that the mantra's power is not limited to humans; it reaches every soul, even in the animal kingdom.",
              hi: "पद्म कुमार नाम का एक हाथी दलदल में फंस गया था और अत्यधिक पीड़ा में मर रहा था। राजा श्रेणिक ने उसे रस्सियों से खींचने के बजाय उसके कान में णमोकार मंत्र सुनाया। \n\n**परिणाम:** मंत्र की ध्वनि सुनते ही हाथी का मन शांत हो गया और वह अपनी शारीरिक पीड़ा भूल गया। वह शांत भाव से मरा और देव गति को प्राप्त हुआ। यह सिद्ध करता है कि मंत्र की शक्ति केवल मनुष्यों तक सीमित नहीं है; यह पशुओं की आत्मा तक भी पहुँचती है।",
              kn: "ಆನೆಯ ಕಥೆ ಮತ್ತು ಸಂದೇಶ..."
            }
          },
          {
            type: "story-mode",
            heading: { en: "The Legend of the Bull: Vrishabha", hi: "बैल का उद्धार और राजा पद्म", kn: "ಬಸವನ ಕಥೆ" },
            content: {
              en: "A bull was once collapsing under the weight of a heavy cart. A passing monk, feeling compassion, recited the Namokar Mantra to the dying animal. The bull died listening to the holy words and was reborn as the Prince of a great kingdom. \n\nHe grew up to remember his past life and the monk who saved his soul. This story is often cited to show that the last thoughts of a dying being, if anchored by the Namokar Mantra, can completely change the trajectory of their next life.",
              hi: "एक बैल भारी बोझे के नीचे दबकर मर रहा था। एक मुनिराज ने दयावश उसे णमोकार मंत्र सुनाया। बैल ने मंत्र सुनते हुए प्राण त्यागे और अगले जन्म में एक राजकुमार के रूप में जन्मा। \n\nयह कथा दर्शाती है कि मृत्यु के समय यदि आत्मा णमोकार मंत्र के आलंबन में हो, तो उसका भविष्य पूरी तरह बदल सकता है।",
              kn: "ಬಸವನ ಕಥೆ ಮತ್ತು ಸಂದೇಶ..."
            }
          }
        ]
      }
    ]
  }
};