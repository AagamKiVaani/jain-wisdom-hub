import PdfAuthWrapper from "./PdfAuthWrapper";
import { fetchNotes } from "@/lib/notesService";

export default async function AdminPdfGeneratorPage() {
  const notes = await fetchNotes();
  return <PdfAuthWrapper notes={notes} />;
}
