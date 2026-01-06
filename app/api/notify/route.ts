import { NextResponse } from "next/server";
import webpush from "web-push";
import dbConnect from "@/lib/db";
import User from "@/models/User";

// 1. Configure Web Push with your Keys
webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT || "mailto:aagamkivaani@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, message, image, category, language, password } = body;

    // 🔒 SIMPLE SECURITY: Check a hardcoded password
    if (password !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    console.log(`🔍 Searching for: Category=${category}, Lang=${language}`);

    // 2. Find Target Audience
    // Example: "Find users where preferences.dailyQuote.enabled is true AND preferences.dailyQuote.lang is 'hi'"
    const query = {
      [`preferences.${category}.enabled`]: true,
      [`preferences.${category}.lang`]: language,
    };

    const users = await User.find(query);
    console.log(`Found ${users.length} users for ${category} in ${language}`);

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found for this category." });
    }

    // 3. Send Notifications in Parallel
    const notificationPayload = JSON.stringify({
      title,
      body: message,
      image,
      url: "/", // You can make this dynamic later
    });

    const promises = users.map((user) =>
      webpush
        .sendNotification(user.subscription, notificationPayload)
        .catch((err) => {
          // If 410 (Gone), the user uninstalled the PWA or blocked us.
          if (err.statusCode === 410) {
            console.log(`User ${user._id} is gone. Deleting...`);
            User.findByIdAndDelete(user._id); // Cleanup dead users
          } else {
            console.error("❌ SEND FAILURE:", err.statusCode, err.body);
          }
        })
    );

    await Promise.all(promises);

    return NextResponse.json({ success: true, count: users.length });

  } catch (error) {
    console.error("Notification Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}