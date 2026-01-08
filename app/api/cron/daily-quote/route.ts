import { NextResponse } from 'next/server';
import { getTodaysQuote } from '@/lib/quoteService';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import webpush from 'web-push';

// ⚙️ CONFIGURATION
// Leave empty "" for text-only. Add path "/images/pic.jpg" if you want an image later.
const DAILY_IMAGE: string = "";

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT || "mailto:aagamkivaani@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // 🔒 SECURITY CHECK
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.AAGAM_CRON_KEY}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const quote = getTodaysQuote(); 
    await dbConnect();
    const users = await User.find({ 'preferences.dailyQuote.enabled': true });

    if (users.length === 0) return NextResponse.json({ message: "No subscribers." });

    console.log(`🌅 Sending Quote to ${users.length} users...`);

    const promises = users.map(async (user) => {
      try {
        const userName = user.name || "Punya Atma";
        const lang = (user.preferences?.dailyQuote?.lang as 'en' | 'hi' | 'kn') || 'hi';

        const quoteText = quote.text[lang];
        const quoteAuthor = quote.author[lang];

        let title = "";
        if (lang === 'hi') title = `सुप्रभात ${userName} ☀️`;
        else if (lang === 'kn') title = `ಶುಭೋದಯ ${userName} ☀️`;
        else title = `Suprabhatam ${userName} ☀️`;

        // 📦 PAYLOAD CONSTRUCTION
        // We build the object first, so we can conditionally add the image
        const payloadData: any = {
          title: title,
          body: `${quoteText}\n- ${quoteAuthor}`,
          url: "/", // Opens the app
          tag: "daily-wisdom" // Ensures multiple quotes don't stack up, just replace each other
        };

        // Only add image if you have actually provided one
        if (DAILY_IMAGE && DAILY_IMAGE.trim() !== "") {
            payloadData.image = DAILY_IMAGE;
        }

        await webpush.sendNotification(user.subscription, JSON.stringify(payloadData));

      } catch (err: any) {
        if (err.statusCode === 410) {
          console.log(`User ${user._id} is gone. Deleting...`);
          await User.findByIdAndDelete(user._id);
        } else {
          console.error(`❌ Failed for user ${user._id}:`, err.message);
        }
      }
    });

    await Promise.all(promises);
    return NextResponse.json({ success: true, count: users.length });

  } catch (error: any) {
    console.error("🔥 CRON FAILED:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}