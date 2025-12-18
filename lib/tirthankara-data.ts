export type Tirthankara = {
  id: number;
  name: { en: string; hi: string; kn: string };
  symbol: { en: string; hi: string; kn: string; icon: string };
  color: string; // The specific aura color
  placeOfNirvana: { en: string; hi: string; kn: string };
  height: string;
  age: string;
};

export const tirthankaras: Tirthankara[] = [
  {
    id: 1,
    name: { en: "Bhagwan Rishabhdev", hi: "भगवान ऋषभदेव", kn: "ಭಗವಾನ್ ವೃಷಭದೇವ" },
    symbol: { en: "Bull", hi: "ಬೈಲ್ (वृषभ)", kn: "ವೃಷಭ", icon: "🐂" },
    color: "bg-yellow-500",
    placeOfNirvana: { en: "Mount Ashtapad", hi: "अष्टापद कैलाश", kn: "ಅಷ್ಟಾಪದ" },
    height: "500 Dhanush",
    age: "84 Lakh Purva"
  },
  {
    id: 23,
    name: { en: "Bhagwan Parshwanath", hi: "भगवान पार्श्वनाथ", kn: "ಭಗವಾನ್ ಪಾರ್ಶ್ವನಾಥ" },
    symbol: { en: "Serpent", hi: "सर्प", kn: "ಸರ್ಪ", icon: "🐍" },
    color: "bg-green-600",
    placeOfNirvana: { en: "Sammed Shikharji", hi: "सम्मेद शिखरजी", kn: "ಸಮ್ಮೇದ ಶಿಖರಜಿ" },
    height: "9 Hands",
    age: "100 Years"
  },
  {
    id: 24,
    name: { en: "Bhagwan Mahavira", hi: "भगवान महावीर", kn: "ಭಗವಾನ್ ಮಹಾವೀರ" },
    symbol: { en: "Lion", hi: "सिंह", kn: "ಸಿಂಹ", icon: "🦁" },
    color: "bg-yellow-600",
    placeOfNirvana: { en: "Pawapuri", hi: "पावापुरी", kn: "ಪಾವಾಪುರಿ" },
    height: "7 Hands",
    age: "72 Years"
  }
  // We will add the rest as we go!
];