// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming data
    const body = await req.json();
    const { subscription, preferences, name, language } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    // 2. Connect to Database
    await dbConnect();

    // 3. Update (Upsert) Logic
    // If user exists (same browser endpoint), update them. If not, create new.
    const user = await User.findOneAndUpdate(
      { "subscription.endpoint": subscription.endpoint }, // Find by unique ID
      {
        $set: {
            subscription, // Update keys in case they rotated
            preferences,  // Save the new settings
            name,         // Update name if provided
            language,     // Update UI language
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true } // Create if doesn't exist
    );

    return NextResponse.json({ message: "Subscription saved!", userId: user._id }, { status: 201 });

  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ "subscription.endpoint": endpoint });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      name: user.name, 
      preferences: user.preferences 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}