import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "portfolio_admin_session";
const SESSION_SECRET = process.env.ADMIN_PASSWORD_HASH || "secure_session_secret_9e3727114008f7e8";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get(SESSION_COOKIE_NAME);
    if (!cookie || !cookie.value) {
      return NextResponse.json({ authenticated: false });
    }

    const [timestamp, signature] = cookie.value.split(".");
    if (!timestamp || !signature) {
      return NextResponse.json({ authenticated: false });
    }

    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`admin:${timestamp}`)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedSig, "hex");

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ authenticated: false });
    }

    // Check expiration (7 days)
    const ageMs = Date.now() - parseInt(timestamp, 10);
    if (ageMs > 1000 * 60 * 60 * 24 * 7) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out." });
  res.cookies.delete(SESSION_COOKIE_NAME);
  return res;
}
