import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DonateClient from "./DonateClient";

export const metadata: Metadata = {
  title: "Support Us | Aagam Ki Vaani",
  description: "Support our mission to spread Jain wisdom.",
};

const translations = {
  en: {
    back: "Back to Home",
    preTitle: "Support The Mission",
    titleStart: "Empower",
    titleHighlight: "Dharma",
    desc: "Your contribution helps us keep the wisdom of Tirthankaras accessible to all. Choose a way to support that feels right for you.",
    oneTime: "One Time Support",
    subscription: "Monthly Support",
    oneTimeTitle: "Make a One-Time Offering",
    oneTimeDesc: "Support our ongoing efforts with a single contribution of any amount you prefer.",
    oneTimeBtn: "Proceed to Payment",
    mostPopular: "Divine Impact",
    subscribeBtn: "Support Monthly",
    tiers: [
      { name: "Aagam Ally", price: "108", desc: "A beautiful starting contribution towards Dharm Prabhavana." },
      { name: "Ratnatray Patron", price: "306", desc: "Help us reach more souls with the teachings of Tirthankaras." },
      { name: "Aagam Sanrakshak", price: "504", desc: "Fuel our mission to bring Jain wisdom to the digital age." },
      { name: "Dharm Prabhavak", price: "1008", desc: "Make a profound impact on our ongoing Dharm Prabhavana activities." },
    ],
    faq: {
      title: "Frequently Asked Questions",
      q1: "Where exactly does my contribution go?",
      a1Intro: "100% of your support goes directly towards our Dharm Prabhavana activities. You are directly funding:",
      a1Points: [
        "✨ High-End Visual Storytelling: Bringing the stories of Jainism, including the much-awaited 'The Jain Ramayan', to life with breathtaking visuals.",
        "🎵 Musical Devotion: Producing high-quality audio and visuals for Stotras, Stavans, and Bhakti songs.",
        "📚 Deep-Dive Swadhyay Series: Creating rich series like Tatvarth Sutra and 'Decoding Jainism'.",
        "🧒 Next-Gen Pathshala: Building interactive Pathshala series tailored for children of all age groups.",
        "🌐 Hub R&D: Continuous research, development, and hosting of this Aagam Ki Vaani platform.",
        "🚀 AI & Tech Innovation: Funding the advanced AI tools required to generate this cutting-edge content."
      ],
      a1Outro: "There is so much more on the horizon, and every single rupee helps us bring the wisdom of the Tirthankaras to the modern digital age."
    }
  },
  hi: {
    back: "मुख्य पृष्ठ पर जाएं",
    preTitle: "मिशन का समर्थन करें",
    titleStart: "धर्म को",
    titleHighlight: "सशक्त करें",
    desc: "आपका योगदान तीर्थंकरों के ज्ञान को सभी के लिए सुलभ बनाए रखने में हमारी मदद करता है। समर्थन का वह तरीका चुनें जो आपके लिए सही हो।",
    oneTime: "एकमुश्त सहायता",
    subscription: "मासिक सहयोग",
    oneTimeTitle: "एकमुश्त भेंट दें",
    oneTimeDesc: "अपनी पसंद की किसी भी राशि के एकल योगदान के साथ हमारे चल रहे प्रयासों का समर्थन करें।",
    oneTimeBtn: "भुगतान के लिए आगे बढ़ें",
    mostPopular: "परम प्रभावना",
    subscribeBtn: "मासिक सहयोग करें",
    tiers: [
      { name: "आगम सहयोगी", price: "108", desc: "धर्म प्रभावना की दिशा में एक सुंदर प्रारंभिक योगदान।" },
      { name: "रत्नत्रय संरक्षक", price: "306", desc: "तीर्थंकरों की वाणी को अधिक आत्माओं तक पहुँचाने में मदद करें।" },
      { name: "आगम संरक्षक", price: "504", desc: "जैन ज्ञान को डिजिटल युग में लाने के हमारे मिशन को शक्ति दें।" },
      { name: "धर्म प्रभावक", price: "1008", desc: "हमारी धर्म प्रभावना गतिविधियों पर गहरा प्रभाव डालें।" },
    ],
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      q1: "मेरा योगदान वास्तव में कहाँ उपयोग होता है?",
      a1Intro: "आपका 100% समर्थन सीधे हमारी धर्म प्रभावना गतिविधियों में जाता है। आप प्रत्यक्ष रूप से इन्हें संभव बना रहे हैं:",
      a1Points: [
        "✨ उच्च-स्तरीय दृश्य कहानी: बहुप्रतीक्षित 'जैन रामायण' सहित जैन धर्म की कहानियों को लुभावने दृश्यों के साथ जीवंत करना।",
        "🎵 संगीतमय भक्ति: स्तोत्र, स्तवन और भक्ति गीतों के लिए उच्च गुणवत्ता वाले ऑडियो और दृश्य तैयार करना।",
        "📚 गहन स्वाध्याय श्रृंखला: तत्त्वार्थ सूत्र और 'डिकोडिंग जैनिज्म' जैसी समृद्ध श्रृंखलाएं बनाना।",
        "🧒 नेक्स्ट-जेन पाठशाला: सभी आयु वर्ग के बच्चों के लिए इंटरैक्टिव पाठशाला श्रृंखला का निर्माण।",
        "🌐 हब R&D: इस आगम की वाणी प्लेटफॉर्म का निरंतर अनुसंधान, विकास और होस्टिंग।",
        "🚀 AI और तकनीकी नवाचार: इस अत्याधुनिक सामग्री को उत्पन्न करने के लिए आवश्यक उन्नत AI उपकरणों का वित्तपोषण।"
      ],
      a1Outro: "भविष्य में और भी बहुत कुछ है, और आपका हर एक रुपया तीर्थंकरों के ज्ञान को आधुनिक डिजिटल युग में लाने में हमारी मदद करता है।"
    }
  },
  kn: {
    back: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    preTitle: "ಮಿಷನ್ ಅನ್ನು ಬೆಂಬಲಿಸಿ",
    titleStart: "ಧರ್ಮವನ್ನು",
    titleHighlight: "ಸಶಕ್ತಗೊಳಿಸಿ",
    desc: "ತೀರ್ಥಂಕರರ ಜ್ಞಾನವನ್ನು ಎಲ್ಲರಿಗೂ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡಲು ನಿಮ್ಮ ಕೊಡುಗೆ ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ನಿಮಗೆ ಸರಿಯೆನಿಸುವ ಬೆಂಬಲದ ಮಾರ್ಗವನ್ನು ಆರಿಸಿ.",
    oneTime: "ಒಂದು ಬಾರಿಯ ಬೆಂಬಲ",
    subscription: "ಮಾಸಿಕ ಕೊಡುಗೆ",
    oneTimeTitle: "ಒಂದು ಬಾರಿಯ ಕಾಣಿಕೆ ನೀಡಿ",
    oneTimeDesc: "ನಿಮ್ಮ ಆಯ್ಕೆಯ ಯಾವುದೇ ಮೊತ್ತದ ಏಕ ಕೊಡುಗೆಯೊಂದಿಗೆ ನಮ್ಮ ನಿರಂತರ ಪ್ರಯತ್ನಗಳನ್ನು ಬೆಂಬಲಿಸಿ.",
    oneTimeBtn: "ಪಾವತಿಗೆ ಮುಂದುವರಿಯಿರಿ",
    mostPopular: "ಮಹಾನ್ ಪ್ರಭಾವ",
    subscribeBtn: "ಮಾಸಿಕ ಕೊಡುಗೆ ನೀಡಿ",
    tiers: [
      { name: "ಆಗಮ ಸಹಯೋಗಿ", price: "108", desc: "ಧರ್ಮ ಪ್ರಭಾವನೆಯತ್ತ ಒಂದು ಸುಂದರವಾದ ಆರಂಭಿಕ ಕೊಡುಗೆ." },
      { name: "ರತ್ನತ್ರಯ ಪೋಷಕ", price: "306", desc: "ತೀರ್ಥಂಕರರ ಬೋಧನೆಗಳನ್ನು ಹೆಚ್ಚು ಆತ್ಮಗಳಿಗೆ ತಲುಪಿಸಲು ಸಹಾಯ ಮಾಡಿ." },
      { name: "ಆಗಮ ಸಂರಕ್ಷಕ", price: "504", desc: "ಜೈನ ಜ್ಞಾನವನ್ನು ಡಿಜಿಟಲ್ ಯುಗಕ್ಕೆ ತರುವ ನಮ್ಮ ಮಿಷನ್ ಅನ್ನು ಶಕ್ತಗೊಳಿಸಿ." },
      { name: "ಧರ್ಮ ಪ್ರಭಾವಕ", price: "1008", desc: "ನಮ್ಮ ಧರ್ಮ ಪ್ರಭಾವನಾ ಚಟುವಟಿಕೆಗಳ ಮೇಲೆ ಆಳವಾದ ಪ್ರಭಾವ ಬೀರಿ." },
    ],
    faq: {
      title: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      q1: "ನನ್ನ ಕೊಡುಗೆ ನಿಖರವಾಗಿ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ?",
      a1Intro: "ನಿಮ್ಮ 100% ಬೆಂಬಲವು ನೇರವಾಗಿ ನಮ್ಮ ಧರ್ಮ ಪ್ರಭಾವನಾ ಚಟುವಟಿಕೆಗಳಿಗೆ ಹೋಗುತ್ತದೆ. ನೀವು ನೇರವಾಗಿ ಇವುಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತಿದ್ದೀರಿ:",
      a1Points: [
        "✨ ಉನ್ನತ-ಮಟ್ಟದ ದೃಶ್ಯ ಕಥೆ: ಬಹುನಿರೀಕ್ಷಿತ 'ಜೈನ ರಾಮಾಯಣ' ಸೇರಿದಂತೆ ಜೈನ ಧರ್ಮದ ಕಥೆಗಳನ್ನು ಅದ್ಭುತ ದೃಶ್ಯಗಳೊಂದಿಗೆ ಜೀವಂತಗೊಳಿಸುವುದು.",
        "🎵 ಸಂಗೀತಮಯ ಭಕ್ತಿ: ಸ್ತೋತ್ರಗಳು, ಸ್ತವನಗಳು ಮತ್ತು ಭಕ್ತಿ ಗೀತೆಗಳಿಗಾಗಿ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಆಡಿಯೋ ಮತ್ತು ದೃಶ್ಯಗಳನ್ನು ನಿರ್ಮಿಸುವುದು.",
        "📚 ಆಳವಾದ ಸ್ವಾಧ್ಯಾಯ ಸರಣಿ: ತತ್ವಾರ್ಥ ಸೂತ್ರ ಮತ್ತು 'ಡಿಕೋಡಿಂಗ್ ಜೈನಿಸಂ' ನಂತಹ ಶ್ರೀಮಂತ ಸರಣಿಗಳನ್ನು ರಚಿಸುವುದು.",
        "🧒 ನೆಕ್ಸ್ಟ್-ಜೆನ್ ಪಾಠಶಾಲೆ: ಎಲ್ಲಾ ವಯಸ್ಸಿನ ಮಕ್ಕಳಿಗಾಗಿ ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಪಾಠಶಾಲಾ ಸರಣಿಯನ್ನು ನಿರ್ಮಿಸುವುದು.",
        "🌐 ಹಬ್ R&D: ಈ ಆಗಮ್ ಕೀ ವಾಣಿ ವೇದಿಕೆಯ ನಿರಂತರ ಸಂಶೋಧನೆ, ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಹೋಸ್ಟಿಂಗ್.",
        "🚀 AI ಮತ್ತು ತಾಂತ್ರಿಕ ನಾವೀನ್ಯತೆ: ಈ ಅತ್ಯಾಧುನಿಕ ವಿಷಯವನ್ನು ರಚಿಸಲು ಅಗತ್ಯವಿರುವ ಸುಧಾರಿತ AI ಪರಿಕರಗಳಿಗೆ ಧನಸಹಾಯ ಮಾಡುವುದು."
      ],
      a1Outro: "ಭವಿಷ್ಯದಲ್ಲಿ ಇನ್ನೂ ಅನೇಕ ಯೋಜನೆಗಳಿವೆ, ಮತ್ತು ನಿಮ್ಮ ಪ್ರತಿಯೊಂದು ರೂಪಾಯಿಯು ತೀರ್ಥಂಕರರ ಜ್ಞಾನವನ್ನು ಆಧುನಿಕ ಡಿಜಿಟಲ್ ಯುಗಕ್ಕೆ ತರಲು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ."
    }
  }
};

export default async function DonatePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 px-6 bg-zinc-50 dark:bg-black relative overflow-x-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-5xl mx-auto flex justify-start mb-8 z-20 relative">
         <Link 
            href={`/${lang}`} 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity hover:text-rose-500 text-gray-900 dark:text-white"
        >
            <ArrowLeft size={16} /> {t.back}
        </Link>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center w-full mb-12">
        <span className="text-rose-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
          {t.preTitle}
        </span>
        
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-6 ${isIndic ? 'leading-normal py-2' : 'leading-none'}`}>
          {t.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">{t.titleHighlight}</span>
        </h1>
        
        <p className={`text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${isIndic ? 'leading-loose font-medium' : 'leading-relaxed'}`}>
           {t.desc}
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-20 flex-grow">
         <DonateClient t={t} lang={lang} isIndic={isIndic} />
      </div>
    </div>
  );
}
