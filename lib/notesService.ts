import { Note } from "@/app/[lang]/resources/components/NotesClient";

// A fallback array for when the Google Sheet is empty or not yet configured.
const FALLBACK_NOTES: Note[] = [
  // DECODING JAINISM SERIES
  { id: "dj1", series: "Decoding Jainism", title: "Volume 1", youtubeLink: "https://youtu.be/xa0TnCmFIBY?si=sHoAPBS0l0kLzu3X", driveFileId: "", description: "The Core Framework of Jainism" },
  { id: "dj2", series: "Decoding Jainism", title: "Volume 2", youtubeLink: "https://youtu.be/-LdG2vmm-A4?si=PFth5UC1imYME82b", driveFileId: "", description: "The Science of Karma - Karma Siddhanta" },
  { id: "dj3", series: "Decoding Jainism", title: "Volume 3", youtubeLink: "https://youtu.be/c91XTYPx-rw?si=kvRwVqnQNU7fsAE3", driveFileId: "", description: "Math Beyond Infinity - Jain Mathematics" },
  { id: "dj4", series: "Decoding Jainism", title: "Volume 4", youtubeLink: "https://youtu.be/5pS0rnfsM5I?si=rPBMkvglfGebes4K", driveFileId: "", description: "Akash Dravya - The Space" },
  { id: "dj5", series: "Decoding Jainism", title: "Volume 5", youtubeLink: "https://youtu.be/tCUdVcgU_Jk?si=mOIw79u3-2zgimfm", driveFileId: "", description: "Kaal Dravya - The Time" },
  { id: "dj6", series: "Decoding Jainism", title: "Volume 6", youtubeLink: "https://youtu.be/XTEROfnKQ4U?si=cfvrKZeYAchimJY1", driveFileId: "", description: "Leshya - The Color on your Soul" },
];

// Dynamically generate the exact folder structure for Tatvarth Series
const tatvarthAdhyays = [
  { name: "Introduction", count: 3, prefix: "Intro Video" },
  { name: "Adhyay 1", count: 33, prefix: "Sutra" },
  { name: "Adhyay 2", count: 53, prefix: "Sutra" },
  { name: "Adhyay 3", count: 39, prefix: "Sutra" },
  { name: "Adhyay 4", count: 42, prefix: "Sutra" },
  { name: "Adhyay 5", count: 42, prefix: "Sutra" },
  { name: "Adhyay 6", count: 27, prefix: "Sutra" },
  { name: "Adhyay 7", count: 39, prefix: "Sutra" },
  { name: "Adhyay 8", count: 26, prefix: "Sutra" },
  { name: "Adhyay 9", count: 47, prefix: "Sutra" },
  { name: "Adhyay 10", count: 9, prefix: "Sutra" },
];

let tatvarthIdCounter = 1;
tatvarthAdhyays.forEach(adhyay => {
  for (let i = 1; i <= adhyay.count; i++) {
    FALLBACK_NOTES.push({
      id: `ts${tatvarthIdCounter++}`,
      series: "Tatvarth Series",
      section: adhyay.name,
      title: `${adhyay.prefix} ${i}`,
      youtubeLink: "",
      driveFileId: "",
      description: "Video and Notes coming soon."
    });
  }
});

// Env variable will be read inside the function to prevent caching issues

export async function fetchNotes(): Promise<Note[]> {
  const url = process.env.GOOGLE_SHEETS_CSV_URL || "";
  
  if (!url) {
    console.log("No Google Sheets CSV URL provided. Using fallback data.");
    return FALLBACK_NOTES;
  }

  try {
    // Append a unique timestamp to force Google's CDN to give us the freshest data immediately
    const cacheBusterUrl = url.includes('?') 
      ? `${url}&t=${Date.now()}` 
      : `${url}?t=${Date.now()}`;

    const res = await fetch(cacheBusterUrl, { 
      cache: "no-store",
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch notes: ${res.statusText}`);
    }

    const csvText = await res.text();
    const parsedNotes = parseCSV(csvText);
    // Allow an empty sheet to actually clear the website data
    return parsedNotes;
  } catch (error) {
    console.error("Error fetching notes from Google Sheets:", error);
    return FALLBACK_NOTES;
  }
}

// A simple CSV parser. Assumes the first row is the header:
// Series, Section, Title, Description, YoutubeLink, DriveFileId
function parseCSV(csv: string): Note[] {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return []; // No data rows

  const notes: Note[] = [];
  
  // Skip the header (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const row: string[] = [];
    let curr = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"' && line[j+1] === '"') {
        curr += '"';
        j++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(curr.trim());
        curr = '';
      } else {
        curr += char;
      }
    }
    row.push(curr.trim());
    
    // Only add if there is an actual Series name, AND it is not commented out
    const seriesName = row[0]?.trim();
    if (row.length >= 3 && seriesName && !seriesName.startsWith('//') && !seriesName.startsWith('#')) {
      notes.push({
        id: `note-${i}`,
        series: seriesName,
        section: row[1]?.trim() || "",
        title: row[2]?.trim() || "",
        description: row[3]?.trim() || "",
        youtubeLink: row[4]?.trim() || "",
        driveFileId: row[5]?.trim() || "",
      });
    }
  }

  return notes;
}
