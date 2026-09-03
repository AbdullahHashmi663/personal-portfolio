import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json({ success: false, message: "Email and message are required." }, { status: 400 });
    }

    const savedMsg = addMessage({
      name: name || "Anonymous Visitor",
      email,
      subject: subject || "Portfolio Contact Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: savedMsg,
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, message: "Failed to send message. Please try again." }, { status: 500 });
  }
}
