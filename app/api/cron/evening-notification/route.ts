// app/api/cron/evening-notification/route.ts

import { NextResponse } from 'next/server';
import { getUpcomingTithi } from '@/lib/tithiService';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import webpush from 'web-push';

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT || "mailto:aagamkivaani@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // 🔒 1. SECURITY CHECK
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.AAGAM_CRON_KEY}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();

    // 📅 2. CHECK CALENDAR FOR TOMORROW
    const upcoming = getUpcomingTithi();

    if (!upcoming) {
      console.log("🌑 No Tithi/Kalyanak found for tomorrow.");
      return NextResponse.json({ success: true, message: "No notification needed." });
    }

    const { entry, date } = upcoming;
    console.log(`🚨 Event Found for Tomorrow (${date}): ${entry.title.en}`);
    
    // Icon Selection
    let iconPrefix = "🌿";
    if (entry.type === 'kalyanak') iconPrefix = "🎉";
    if (entry.type === 'festival') iconPrefix = "✨";
    if (entry.type === 'ashtanhika') iconPrefix = "🌸";

    // 📨 3. SEND PERSONALIZED NOTIFICATIONS
    // We fetch users with subscription AND their preferences
    const users = await User.find({ 'subscription': { $exists: true } });
    
    console.log(`📤 Preparing to send to ${users.length} users...`);

    const notifications = users.map(user => {
      if (!user.subscription) return;

      // --- 🧠 SMART LANGUAGE LOGIC ---
      // 1. Get User's Language (Default to 'en')
      // Ensure your DB saves it as 'en', 'hi', or 'kn'. 
      // If you save as 'english', you might need a small mapper here.
      const userLang = user.preferences?.language || 'en';

      // 2. Select Text based on Language
      // We use 'as any' to allow dynamic key access safely
      const titles = entry.title as any;
      const descriptions = entry.description as any;

      // Fallback to English if the specific language is missing in the data file
      const finalTitle = titles[userLang] || titles['en'];
      const finalBody = descriptions[userLang] || descriptions['en'];

      // 3. Create Custom Payload for THIS User
      const userPayload = {
        title: `${iconPrefix} ${finalTitle}`,
        body: finalBody, // Only shows the single preferred language!
        url: '/calendar',
        tag: `tithi-${date}`,
        image: entry.type === 'kalyanak' ? '/images/kalyanak-hero.jpg' : undefined
      };

      // 4. Send
      return webpush.sendNotification(
        user.subscription,
        JSON.stringify(userPayload)
      ).catch(err => {
        if (err.statusCode === 410 || err.statusCode === 404) {
             console.log(`User ${user._id} subscription expired.`);
        }
      });
    });

    await Promise.all(notifications);

    return NextResponse.json({ 
        success: true, 
        count: users.length, 
        event: entry.title.en 
    });

  } catch (error: any) {
    console.error("🔥 Evening Cron Failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}