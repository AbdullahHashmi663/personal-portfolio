import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/auth";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "portfolio_admin_session";
const SESSION_SECRET = process.env.ADMIN_PASSWORD_HASH || "secure_session_secret_9e3727114008f7e8";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(password);

    if (!isValid) {
      // Artificial delay to prevent timing attacks and brute-force probing
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please verify credentials." },
        { status: 401 }
      );
    }

    // Generate signed session token
    const timestamp = Date.now().toString();
    const signature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`admin:${timestamp}`)
      .digest("hex");
    const token = `${timestamp}.${signature}`;

    const res = NextResponse.json({
      success: true,
      message: "Authentication successful.",
    });

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Internal server authentication error." },
      { status: 500 }
    );
  }
}
