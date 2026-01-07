// app/api/notify/route.ts
import { NextResponse } from "next/server";
import webpush from "web-push";
import dbConnect from "@/lib/db";
import User from "@/models/User";

// 1. Safe Configuration
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error("❌ CRITICAL: VAPID Keys are missing in Environment Variables!");
}

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT || "mailto:aagamkivaani@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, message, image, category, language, password, url } = body;

    console.log("📨 API Received Request:", { title, category, language });

    // 🔒 Security Check
    if (password !== process.env.ADMIN_SECRET) {
      console.warn("⛔ Unauthorized Access Attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🛡️ Data Safety Check
    if (!title || !message) {
      console.error("❌ Error: Title or Message is missing.");
      return NextResponse.json({ error: "Title and Message are required" }, { status: 400 });
    }

    await dbConnect();

    // 2. Find Audience
    const query = {
      [`preferences.${category}.enabled`]: true,
      [`preferences.${category}.lang`]: language,
    };

    const users = await User.find(query);
    console.log(`👥 Found ${users.length} users for ${category} in ${language}`);

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found for this category." });
    }

    // 3. Send Notifications
    const promises = users.map((user) => {
      const userName = user.name || "Punya Atma";

      // ⚠️ Personalization: Swap {{name}} with real name
      const safeTitle = (title || "").replace(/{{name}}/g, userName);
      const safeMessage = (message || "").replace(/{{name}}/g, userName);

      const payload = JSON.stringify({
        title: safeTitle,
        body: safeMessage,
        image,        // Passes the Big Image URL
        url: url || "/" // Passes the Deep Link
      });

      return webpush
        .sendNotification(user.subscription, payload)
        .catch((err) => {
          if (err.statusCode === 410) {
            console.log(`User ${user._id} is gone. Deleting...`);
            User.findByIdAndDelete(user._id);
          } else {
            console.error("❌ SEND FAILURE:", err.statusCode);
          }
        });
    });

    await Promise.all(promises);

    return NextResponse.json({ success: true, count: users.length });

  } catch (error: any) {
    console.error("🔥 SERVER CRASH:", error.message, error.stack);
    return NextResponse.json({ error: "Internal Server Error: " + error.message }, { status: 500 });
  }
}