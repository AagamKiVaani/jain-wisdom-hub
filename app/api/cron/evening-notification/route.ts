import { NextResponse } from 'next/server';
import { getUpcomingTithi } from '@/lib/tithiService';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import webpush from 'web-push';

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT || "mailto:test@test.com",
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
    // Fetch users who have a subscription
    const users = await User.find({ 'subscription': { $exists: true } });
    
    console.log(`📤 Processing ${users.length} users...`);

    const notifications = users.map(user => {
      if (!user.subscription) return;

      // 🧠 SMART LANGUAGE LOGIC (Database Check)
      // We look for 'preferences.language' in the User Object.
      // If it's missing, we default to 'en' (English).
      // Make sure your DB stores it as 'en', 'hi', or 'kn'.
      const userLang = user.preferences?.language || 'en';

      // Access the translations dynamically
      const titles = entry.title as any;
      const descriptions = entry.description as any;

      // Select the text based on the user's DB preference
      // Fallback to English if that specific translation is empty
      const finalTitle = titles[userLang] || titles['en'];
      const finalBody = descriptions[userLang] || descriptions['en'];

      // 🔗 SMART URL
      // Open the app in their preferred language (e.g., /hi or /kn)
      const targetUrl = userLang === 'en' ? '/' : `/${userLang}`;

      // Create Payload just for THIS user
      const userPayload = {
        title: `${iconPrefix} ${finalTitle}`,
        body: finalBody,
        url: targetUrl, 
        tag: `tithi-${date}`,
        image: entry.type === 'kalyanak' ? '/images/kalyanak-hero.jpg' : undefined
      };

      // Send
      return webpush.sendNotification(
        user.subscription,
        JSON.stringify(userPayload)
      ).catch(err => {
        if (err.statusCode === 410 || err.statusCode === 404) {
             console.log(`User ${user._id} subscription expired/invalid.`);
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