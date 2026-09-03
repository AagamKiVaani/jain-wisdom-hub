// ============================================================================
// DIGAMBAR JAIN CANONICAL GUARDRAIL ENGINE
// Strictly restricts all doctrinal, theological, and scriptural content
// to authentic Digambar Jain Shastras and Aagams.
// ============================================================================

export interface CanonicalSource {
  title: string;
  author: string;
  language: "Prakrit" | "Sanskrit" | "Apabhramsha" | "Dhundhari" | "Hindi";
  classification: "Prathamanuyoga" | "Karananuyoga" | "Charnanuyoga" | "Dravyanuyoga";
  description: string;
}

export const DIGAMBAR_CANONICAL_TEXTS: CanonicalSource[] = [
  // --- Dravyanuyoga (Philosophy & Metaphysics) ---
  {
    title: "Samayasāra",
    author: "Acharya Kundkund",
    language: "Prakrit",
    classification: "Dravyanuyoga",
    description: "Supreme treatise on the pure soul (Shuddhatma), Nishchaya Naya, and liberation."
  },
  {
    title: "Pravachanasāra",
    author: "Acharya Kundkund",
    language: "Prakrit",
    classification: "Dravyanuyoga",
    description: "Core doctrine of knowledge (Jnāna), knowable (Jneya), and conduct (Chāritra)."
  },
  {
    title: "Niyamasāra",
    author: "Acharya Kundkund",
    language: "Prakrit",
    classification: "Dravyanuyoga",
    description: "Essential rules for inner right belief, right knowledge, and right conduct."
  },
  {
    title: "Panchāstikāyasāra",
    author: "Acharya Kundkund",
    language: "Prakrit",
    classification: "Dravyanuyoga",
    description: "The five cosmic existences (Jiva, Pudgala, Dharma, Adharma, Akasha) and Kaal."
  },
  {
    title: "Tattvārtha Sūtra & Sarvārthasiddhi",
    author: "Acharya Umaswami / Acharya Pujyapada",
    language: "Sanskrit",
    classification: "Dravyanuyoga",
    description: "Foundational 10 chapters on Jain epistemology, cosmology, and liberation."
  },
  {
    title: "Āptamīmānsā / Devāgam Stotra",
    author: "Acharya Samantabhadra",
    language: "Sanskrit",
    classification: "Dravyanuyoga",
    description: "Definitive logical treatise on Anekantavada and the true omniscient Arihant."
  },
  {
    title: "Mokshamārga Prakāshaka",
    author: "Pandit Todarmalji",
    language: "Dhundhari",
    classification: "Dravyanuyoga",
    description: "Illuminator of the path to liberation, refuting misconceptions and illusions."
  },

  // --- Karananuyoga (Cosmology & Karma Mathematics) ---
  {
    title: "Shatkhandāgama & Dhavalā Teeka",
    author: "Acharya Pushpadanta, Bhutabali & Virasena",
    language: "Prakrit",
    classification: "Karananuyoga",
    description: "The primary surviving Digambar scripture on karma bondage, gunasthanas, and soul states."
  },
  {
    title: "Gommatasāra (Jīvakānda & Karmakānda)",
    author: "Acharya Nemichandra Siddhanta Chakravarti",
    language: "Prakrit",
    classification: "Karananuyoga",
    description: "Exhaustive exposition of 14 Gunasthanas, 14 Marganasthanas, and Karma Prakritis."
  },
  {
    title: "Trilokasāra & Jambūdvīpa-prajñapti",
    author: "Acharya Nemichandra Siddhanta Chakravarti",
    language: "Prakrit",
    classification: "Karananuyoga",
    description: "Digambar cosmic geography: Urdhva Loka, Madhya Loka, and Adho Loka."
  },
  {
    title: "Tiloyapannatti",
    author: "Acharya Yativrishabha",
    language: "Prakrit",
    classification: "Karananuyoga",
    description: "Ancient cosmographical descriptions of the universe, Kalchakra, and Tirthankars."
  },

  // --- Charnanuyoga (Conduct & Ethics) ---
  {
    title: "Ratnakaranda Shrāvakāchāra",
    author: "Acharya Samantabhadra",
    language: "Sanskrit",
    classification: "Charnanuyoga",
    description: "Ethical manual for householders: 12 vows (Vratas), Sallekhana, and Samyaktva."
  },
  {
    title: "Purushārthasiddhyupāya",
    author: "Acharya Amritachandra",
    language: "Sanskrit",
    classification: "Charnanuyoga",
    description: "The definitive analysis of Ahimsa, spiritual effort, and ethical conduct."
  },
  {
    title: "Mūlāchāra",
    author: "Acharya Vattakera",
    language: "Prakrit",
    classification: "Charnanuyoga",
    description: "Fundamental 28 root qualities (Mool Gunas) of Digambar Jain monks (Munis)."
  },

  // --- Prathamanuyoga (History & Biographies) ---
  {
    title: "Mahāpurāna (Ādipurāna & Uttarapurāna)",
    author: "Acharya Jinasena & Acharya Gunabhadra",
    language: "Sanskrit",
    classification: "Prathamanuyoga",
    description: "The life histories of the 63 Shalaka Purushas (24 Tirthankaras, 12 Chakravartins, etc.)."
  },
  {
    title: "Padmapurāna (Jain Ramayana)",
    author: "Acharya Ravisena",
    language: "Sanskrit",
    classification: "Prathamanuyoga",
    description: "Authentic Digambar account of Rama (Padma), Lakshmana, and Ravana."
  },
  {
    title: "Harivamshapurāna",
    author: "Acharya Jinasena (Punnata)",
    language: "Sanskrit",
    classification: "Prathamanuyoga",
    description: "Digambar account of 22nd Tirthankar Neminath, Krishna, and Balarama."
  }
];

export const DIGAMBAR_CANONICAL_RULES = `
MANDATORY DIGAMBAR SCRIPTURAL RULES:
1. TRADITION: Only Digambar Jain canon and Acharyas are authoritative.
2. ICONOGRAPHY & NATURE OF TIRTHANKAR:
   - Digambar iconography: Unadorned, unclad, peaceful, eyes half-open/closed in introspective meditation (Nasagra drishti).
   - 19th Tirthankar Mallinath is Mallinath Bhagwan (a male king who renounced the kingdom to attain Omniscience and Moksha).
   - Kevalis (Arihants) are free from hunger (Kavalahara), thirst, disease, sleep, and physical fatigue.
   - Omniscience (Kevala Jnana) and Moksha in the same birth are attained strictly through total renunciation (Digambaratva).
3. CITATION MANDATE:
   - Any theological concept, Devanagari verse, quote, or narrative must cite its exact Digambar source text, author, and reference chapter/gatha/sutra.
   - Never invent or fabricate quotes.
   - If an authentic Sanskrit/Prakrit verse is quoted, its translation must match the authentic Digambar Teeka (commentary).
`;

/**
 * Validates whether a proposed content piece complies with Digambar guidelines.
 */
export function validateDigambarContent(text: string): { valid: boolean; reason?: string } {
  const lowercase = text.toLowerCase();

  // Prohibited cross-tradition keywords that contradict Digambar Aagams
  const forbiddenTerms = [
    { term: "shvetambara", reason: "Refers to non-Digambar sectarian traditions" },
    { term: "swetambar", reason: "Refers to non-Digambar sectarian traditions" },
    { term: "mallinath was a female", reason: "Contradicts Digambar Mahapurana" },
    { term: "female tirthankar", reason: "Contradicts Digambar canonical tradition" },
    { term: "kevali eats food", reason: "Digambar Aagams hold Kevalis do not take morsel food (kavalahara)" },
  ];

  for (const item of forbiddenTerms) {
    if (lowercase.includes(item.term)) {
      return {
        valid: false,
        reason: `Rejected: Contains prohibited concept '${item.term}' (${item.reason}). Must follow pure Digambar tradition.`
      };
    }
  }

  return { valid: true };
}
