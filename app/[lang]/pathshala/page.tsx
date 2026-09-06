import React from "react";
import { Metadata } from "next";
import PathshalaClient from "./PathshalaClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: "Digital Pathshala — Interactive Jain Academy for Young Minds",
    hi: "डिजिटल पाठशाला — युवा पीढ़ी के लिए जैन विद्यापीठ",
    kn: "ಡಿಜಿಟಲ್ ಪಾಠಶಾಲೆ — ಯುವ ಜೈನ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ",
  };

  const descriptions: Record<string, string> = {
    en: "The world-class interactive academy teaching kids aged 8–12 the logic, science, and pride of authentic Digambar Jain philosophy.",
    hi: "८-१२ वर्ष के बच्चों के लिए प्रामाणिक दिगंबर जैन सिद्धांतों, वैज्ञानिक नियमों और संस्कारों की आधुनिक डिजिटल पाठशाला।",
    kn: "೮-೧೨ ವರ್ಷದ ಮಕ್ಕಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ಹಾಗೂ ಪ್ರಾಮಾಣಿಕ ದಿಗಂಬರ ಜೈನ ತತ್ವಜ್ಞಾನದ ಡಿಜಿಟಲ್ ಪಾಠಶಾಲೆ.",
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `https://aagamkivaani.org/${lang}/pathshala`,
      siteName: "Aagam Ki Vaani",
      images: [
        {
          url: "/images/resources/posters/decoding_jainism.webp",
          width: 1200,
          height: 630,
          alt: "Digital Pathshala — Aagam Ki Vaani",
        },
      ],
      type: "website",
    },
  };
}

export default async function PathshalaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <PathshalaClient lang={lang} />;
}
