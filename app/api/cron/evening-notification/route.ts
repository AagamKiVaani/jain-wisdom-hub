// path: app/api/cron/tithi/route.ts (or wherever your tithi cron lives)
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
    // FIX: Only fetch users who have explicitly ENABLED Tithi notifications
    const users = await User.find({ 
        'subscription': { $exists: true },
        'preferences.tithi.enabled': true 
    });
    
    console.log(`📤 Processing ${users.length} users...`);

    const notifications = users.map(user => {
      if (!user.subscription) return;

      // 🧠 SMART LANGUAGE LOGIC (FIXED)
      // 1. Try Tithi-specific preference
      // 2. Try Global App language
      // 3. Default to Hindi (hi)
      const userLang = user.preferences?.tithi?.lang || user.language || 'hi';

      // Access the translations dynamically
      const titles = entry.title as any;
      const descriptions = entry.description as any;

      // Select text. Fallback to English if specific lang translation is missing.
      const finalTitle = titles[userLang] || titles['en'];
      const finalBody = descriptions[userLang] || descriptions['en'];

      // 🔗 SMART URL
      const targetUrl = userLang === 'en' ? '/' : `/${userLang}`;

      const userPayload = {
        title: `${iconPrefix} ${finalTitle}`,
        body: finalBody,
        url: targetUrl, 
        // Tag is date-specific, preventing it from overwriting Daily Quotes
        tag: `tithi-${date}`, 
        image: entry.type === 'kalyanak' ? '/images/kalyanak-hero.jpg' : undefined
      };

      const options = {
        TTL: 86400, // 86400 seconds = 24 Hours
        Urgency: 'high'
      };

      return webpush.sendNotification(
        user.subscription,
        JSON.stringify(userPayload),
        options
      ).catch(err => {
        if (err.statusCode === 410 || err.statusCode === 404) {
             console.log(`User ${user._id} subscription expired/invalid.`);
             // Optional: await User.findByIdAndUpdate(user._id, { $unset: { subscription: 1 } });
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