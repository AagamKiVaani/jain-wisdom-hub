import { quotes } from "@/lib/quotes";

export function getTomorrowsQuote() {
  const startDate = new Date("2026-01-01").getTime();
  
  // 1. Get "Tomorrow's" Date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Jump +1 Day
  
  const targetTime = tomorrow.getTime();
  const msPerDay = 24 * 60 * 60 * 1000;
  
  // 2. Calculate days passed up to TOMORROW
  const daysPassed = Math.floor((targetTime - startDate) / msPerDay) + 1;

  // 3. The "Prime Jump" Logic (kept identical to preserve sync)
  const primeJump = 53; 
  const offset = 17; 
  
  // Calculate index
  const index = ((daysPassed * primeJump) + offset) % quotes.length;
  
  // Safety check
  const safeIndex = index < 0 ? 0 : index;

  return quotes[safeIndex];
}