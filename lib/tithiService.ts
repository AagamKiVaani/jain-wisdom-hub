// lib/tithiService.ts
import { tithiCalendar, TithiEntry } from './tithi-calendar';

/**
 * Checks if there is a special event TOMORROW.
 * We use IST (Asia/Kolkata) to ensure alignment with the user's calendar.
 */
export function getUpcomingTithi(): { date: string, entry: TithiEntry } | null {
  // 1. Get Current Time
  const now = new Date();
  
  // 2. Add 24 Hours to get "Tomorrow"
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // 3. Format it strictly as YYYY-MM-DD in IST Timezone
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: "Asia/Kolkata", 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  
  // Note: 'en-CA' locale forces the YYYY-MM-DD format we need
  const formatter = new Intl.DateTimeFormat('en-CA', options); 
  const tomorrowISO = formatter.format(tomorrow); 

  console.log(`📅 Checking Calendar for Tomorrow (IST): ${tomorrowISO}`);

  // 4. Look up the date in your data file
  if (tithiCalendar[tomorrowISO]) {
    return { 
        date: tomorrowISO, 
        entry: tithiCalendar[tomorrowISO] 
    };
  }

  return null;
}