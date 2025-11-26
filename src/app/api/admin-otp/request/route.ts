import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Invalidate previous OTP
  await prisma.adminOtp.updateMany({
    where: { email, used: false },
    data: { used: true },
  });

  await prisma.adminOtp.create({ data: { email, code, expiresAt, used: false } });

  // Send code to email
  try {
    await resend.emails.send({
      from: "Admin <noreply@shagulhameed.site>", // verified domain
      to: email,
      subject: "Your Admin Login Code",
      text: `Your admin OTP is ${code}. It expires in 5 minutes.`,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
