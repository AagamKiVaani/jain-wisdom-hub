// lib/quoteService.ts
import { quotes } from "@/lib/quotes";

export function getTodaysQuote() {
  const startDate = new Date("2026-01-01").getTime();
  const today = new Date().getTime();
  const msPerDay = 24 * 60 * 60 * 1000;
  
  const daysPassed = Math.floor((today - startDate) / msPerDay);

  // The "Prime Jump" Logic (Deterministic Shuffle)
  const primeJump = 53; 
  const offset = 17; 
  
  // Calculate index
  const index = ((daysPassed * primeJump) + offset) % quotes.length;
  
  // Safety check
  const safeIndex = index < 0 ? 0 : index;

  return quotes[safeIndex];
}