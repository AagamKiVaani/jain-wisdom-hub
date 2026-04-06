import { NextResponse } from 'next/server';
import { getTodayTithi } from '@/lib/tithiService'; // 🟢 Updated Import
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

    // 📅 2. CHECK CALENDAR FOR TODAY (🟢 Updated)
    const todayEvent = getTodayTithi();

    if (!todayEvent) {
      console.log("🌑 No Tithi/Kalyanak found for today.");
      return NextResponse.json({ success: true, message: "No notification needed." });
    }

    const { entry, date } = todayEvent;
    console.log(`🚨 Event Found for Today (${date}): ${entry.title.en}`);
    
    let iconPrefix = "🌿";
    if (entry.type === 'kalyanak') iconPrefix = "🎉";
    if (entry.type === 'festival') iconPrefix = "✨";
    if (entry.type === 'ashtanhika') iconPrefix = "🌸";

    // 📨 3. SEND PERSONALIZED NOTIFICATIONS
    const users = await User.find({ 
        'subscription': { $exists: true },
        'preferences.tithi.enabled': true 
    });
    
    console.log(`📤 Processing ${users.length} users...`);

    const notifications = users.map(user => {
      if (!user.subscription) return;

      const userLang = user.preferences?.tithi?.lang || user.language || 'hi';

      const titles = entry.title as any;
      const descriptions = entry.description as any;

      const finalTitle = titles[userLang] || titles['en'];
      const finalBody = descriptions[userLang] || descriptions['en'];

      const targetUrl = userLang === 'en' ? '/' : `/${userLang}`;

      const userPayload = {
        title: `${iconPrefix} ${finalTitle}`,
        body: finalBody,
        url: targetUrl, 
        tag: `tithi-${date}`, 
        image: entry.type === 'kalyanak' ? '/images/kalyanak-hero.jpg' : undefined
      };

      const options = {
        TTL: 43200, // 🟢 Changed to 12 Hours (If their phone is off all day, don't ping them at midnight)
        Urgency: 'high'
      };

      return webpush.sendNotification(
        user.subscription,
        JSON.stringify(userPayload),
        options
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
    console.error("🔥 Morning Cron Failed:", error); // 🟢 Updated log
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}