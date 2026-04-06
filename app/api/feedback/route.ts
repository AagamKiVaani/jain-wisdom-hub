// api/feedback/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Feedback from "@/models/Feedback";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 🟢 Added 'subject' to capture the dropdown value from your frontend
    const { name, email, subject, liked, disliked, improvement, message } = body;

    // Validation: Only message is strictly required now
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // 1. Save to Database
    await Feedback.create({
      name: name || "Anonymous",
      email,
      subject, // Save the dropdown type to DB
      liked,
      disliked,
      improvement,
      message,
    });

    // 2. Send Telegram Notification
    // We wrap this in a separate try-catch so if Telegram's API is temporarily down, 
    // it doesn't break the user's submission or throw an error on the frontend.
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        // Format the message nicely using HTML
        const telegramText = `
🚨 <b>New App Feedback!</b>

<b>Name:</b> ${name || "Anonymous"}
<b>Email:</b> ${email || "Not provided"}
<b>Type:</b> ${subject || "General"}

<b>Message:</b>
${message}
`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramText,
            parse_mode: "HTML", // Allows bold tags
          }),
        });
      }
    } catch (telegramError) {
      console.error("Failed to send Telegram alert:", telegramError);
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("Feedback Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}