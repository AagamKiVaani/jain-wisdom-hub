import { NextResponse } from 'next/server';
import { getTomorrowsQuote } from '@/lib/quoteServiceAutomator'; 

export async function GET() {
  try {
    // 1. Get TOMORROW'S Quote Object
    const quoteData = getTomorrowsQuote();

    // 2. Construct the Image URL (Exact same logic as daily route)
    const ASSET_BASE_URL = "https://pratham-1127.github.io/jain-wisdom-assets";
    const fullImageUrl = `${ASSET_BASE_URL}/images/${quoteData.image}`;

    // 3. Return the JSON
    return NextResponse.json({
      quote: quoteData.text.hi,
      author: quoteData.author.hi,
      imageUrl: fullImageUrl,
      // Optional: Tag it so you know this came from the "Tomorrow" endpoint
      context: "Automator Future Quote", 
      date: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}