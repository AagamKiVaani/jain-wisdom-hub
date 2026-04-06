// lib/tithiService.ts
import { tithiCalendar, TithiEntry } from './tithi-calendar';

export function getTodayTithi(): { date: string, entry: TithiEntry } | null {
  const now = new Date();

  // Force strict IST formatting
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: "Asia/Kolkata", 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  
  const formatter = new Intl.DateTimeFormat('en-CA', options); 
  const todayISO = formatter.format(now); 

  console.log(`📅 Checking Calendar for Today (IST): ${todayISO}`);

  if (tithiCalendar[todayISO]) {
    return { 
        date: todayISO, 
        entry: tithiCalendar[todayISO] 
    };
  }

  return null;
}