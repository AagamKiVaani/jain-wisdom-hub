// app/api/cron/evening-notification/route.ts

import { NextResponse } from 'next/server';
import { getUpcomingTithi } from '@/lib/tithiService'; // Import the helper
import dbConnect from '@/lib/db';
import User from '@/models/User';
import webpush from 'web-push';

// Configure Web Push (Standard Setup)
webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT || "mailto:aagamkivaani@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// Force dynamic so it doesn't cache the result
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // 🔒 1. SECURITY CHECK (Uses the same key as your morning cron)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.AAGAM_CRON_KEY}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();

    // 📅 2. CHECK CALENDAR
    const upcoming = getUpcomingTithi();

    // 🛑 3. IF NOTHING TOMORROW, STOP HERE
    if (!upcoming) {
      console.log("🌑 No Tithi/Kalyanak found for tomorrow. Staying silent.");
      return NextResponse.json({ success: true, message: "No notification needed." });
    }

    const { entry, date } = upcoming;
    console.log(`🚨 Event Found for Tomorrow (${date}): ${entry.title.en}`);
    
    // 🎨 4. PREPARE NOTIFICATION CONTENT
    
    // Icon Selection based on Type
    let iconPrefix = "🌿"; // Default for Tithi/Ashtami
    if (entry.type === 'kalyanak') iconPrefix = "🎉";
    if (entry.type === 'festival') iconPrefix = "✨";
    if (entry.type === 'ashtanhika') iconPrefix = "🌸";

    // Combine Languages for Body (English + Hindi + Kannada)
    // Using new lines (\n) to separate them cleanly on the phone lock screen
    const combinedBody = `${entry.description.en}\n\n${entry.description.hi}\n\n${entry.description.kn}`;

    const notificationPayload = {
      // Title: "🌿 Tomorrow is Ashtami | कल अष्टमी है"
      title: `${iconPrefix} ${entry.title.en} | ${entry.title.hi}`,
      body: combinedBody,
      url: '/calendar', // Or wherever you want them to click
      tag: `tithi-${date}`, // Unique tag ensures they don't get double notifications
      
      // Optional: Add specific images for specific types if you have them
      // image: entry.type === 'kalyanak' ? '/images/kalyanak-hero.jpg' : undefined 
    };

    // 📨 5. SEND TO ALL SUBSCRIBED USERS
    // We fetch ALL users with a subscription
    const users = await User.find({ 'subscription': { $exists: true } });
    
    console.log(`📤 Sending to ${users.length} users...`);

    const notifications = users.map(user => {
      if (user.subscription) {
        return webpush.sendNotification(
          user.subscription,
          JSON.stringify(notificationPayload)
        ).catch(err => {
          // If user deleted the app, remove from DB to keep it clean
          if (err.statusCode === 410 || err.statusCode === 404) {
             console.log(`User ${user._id} subscription expired.`);
             // Optional: await User.updateOne({ _id: user._id }, { $unset: { subscription: 1 } });
          }
        });
      }
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