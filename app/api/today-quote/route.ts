import { NextResponse } from 'next/server';
import { getTodaysQuote } from '@/lib/quoteService';

export async function GET() {
  try {
    const quoteData = getTodaysQuote();

    // 👇 YOUR NEW GITHUB ASSETS URL
    // (Double check this URL matches what GitHub Pages gave you)
    const ASSET_BASE_URL = "https://pratham-1127.github.io/jain-wisdom-assets";

    // Combine them: 
    // Result: https://pratham-1127.github.io/jain-wisdom-assets/images/mahavir.jpg
    const fullImageUrl = `${ASSET_BASE_URL}/images/${quoteData.image}`;

    return NextResponse.json({
      quote: quoteData.text.hi,
      author: quoteData.author.hi,
      imageUrl: fullImageUrl,
      date: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}