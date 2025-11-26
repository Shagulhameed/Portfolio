import { NextResponse, NextRequest } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const { email } = await req.json();

  await resend.emails.send({
    from: "admin@shagulhameed.site",
    to: email,
    subject: "OTP Verification",
    html: "<p>Your OTP is: 123456</p>",
  });

  return NextResponse.json({ success: true });
}
