import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Feedback from "@/models/Feedback";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 🟢 Destructure new fields
    const { name, email, liked, disliked, improvement, message } = body;

    // Validation: Only message is strictly required now
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    await Feedback.create({
      name: name || "Anonymous",
      email,
      liked,
      disliked,
      improvement,
      message,
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("Feedback Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}