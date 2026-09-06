import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "@/lib/store";
import { queryOne } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json({ success: false, message: "Email and message are required." }, { status: 400 });
    }

    const msgName = name || "Anonymous Visitor";
    const msgSubject = subject || "Portfolio Contact Inquiry";

    let savedMsg: any = null;

    // 1. Insert into online Supabase PostgreSQL messages table
    if (process.env.DATABASE_URL) {
      try {
        savedMsg = await queryOne(
          `INSERT INTO public.messages (name, email, subject, message)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [msgName, email, msgSubject, message]
        );
      } catch (dbErr) {
        console.warn("Could not insert message directly into Supabase:", dbErr);
      }
    }

    // 2. Mirror into local store fallback
    const localMsg = addMessage({
      name: msgName,
      email,
      subject: msgSubject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: savedMsg || localMsg,
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, message: "Failed to send message. Please try again." }, { status: 500 });
  }
}
