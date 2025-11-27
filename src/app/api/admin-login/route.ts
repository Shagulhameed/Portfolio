import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // 🔐 Check if email has admin access
  const adminAccess = await prisma.adminAccess.findFirst({
    where: { email, isActive: true },
  });

  if (!adminAccess) {
    return NextResponse.json(
      { error: "You do not have access to this admin page." },
      { status: 403 }
    );
  }

  // 💡 Generate OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Invalidate previous OTP
  await prisma.adminOtp.updateMany({
    where: { email, used: false },
    data: { used: true },
  });

  // Create new OTP
  await prisma.adminOtp.create({ data: { email, code, expiresAt, used: false } });

  // 📧 Send email
  try {
    await resend.emails.send({
      from: "Admin <noreply@shagulhameed.site>",
      to: email,
      subject: "Your Admin Login OTP",
      text: `Your OTP is ${code}. It expires in 5 minutes.`,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "OTP sent to your admin email." });
}
