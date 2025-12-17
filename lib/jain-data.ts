// lib/jain-data.ts

export type Topic = {
  id: string;
  title: { en: string; hi: string; kn: string };
  description: { en: string; hi: string; kn: string };
  content: { en: string; hi: string; kn: string }; // We will use simple text for now
  videoUrl?: string;
};

export const jainTopics: Record<string, Topic> = {
  "namokar-mantra": {
    id: "namokar-mantra",
    title: { 
      en: "Namokar Mantra", 
      hi: "णमोकार मंत्र", 
      kn: "ನಮೋಕಾರ ಮಂತ್ರ" 
    },
    description: {
      en: "The most significant mantra in Jainism.",
      hi: "जैन धर्म का सबसे महत्वपूर्ण मंत्र।",
      kn: "ಜೈನ ಧರ್ಮದ ಅತ್ಯಂತ ಮಹತ್ವದ ಮಂತ್ರ."
    },
    content: {
      en: "The Ṇamōkāra Mantra is a prayer of deep respect for beings who are more spiritually advanced than we are...",
      hi: "णमोकार मंत्र उन प्राणियों के लिए गहरे सम्मान की प्रार्थना है जो हमसे अधिक आध्यात्मिक रूप से उन्नत हैं...",
      kn: "ನಮೋಕಾರ ಮಂತ್ರವು ನಮಗಿಂತ ಹೆಚ್ಚು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಮುಂದುವರಿದ ಜೀವಿಗಳಿಗೆ ಆಳವಾದ ಗೌರವದ ಪ್ರಾರ್ಥನೆಯಾಗಿದೆ..."
    },
    videoUrl: "https://www.youtube.com/embed/your-video-id"
  },
  "ahimsa": {
    id: "ahimsa",
    title: { en: "Ahimsa", hi: "अहिंसा", kn: "ಅಹಿಂಸೆ" },
    description: { en: "Non-violence in thought, word, and deed.", hi: "मन, वचन और कर्म से अहिंसा।", kn: "ಆಲೋಚನೆ, ಮಾತು ಮತ್ತು ಕೃತಿಯಲ್ಲಿ ಅಹಿಂಸೆ." },
    content: { en: "Ahimsa is the highest dharma...", hi: "अहिंसा परमो धर्म...", kn: "ಅಹಿಂಸೆಯೇ ಪರಮ ಧರ್ಮ..." }
  }
};