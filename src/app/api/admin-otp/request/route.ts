import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // only your admin email
  if (!email || email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Not allowed" }, { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await prisma.adminOtp.create({
    data: { email, code, expiresAt },
  });

  await resend.emails.send({
    from: "Admin Login <noreply@shagulhameed.site>", // verified sender
    to: email,
    subject: "Your admin login code",
    text: `Your login code is ${code}. It will expire in 5 minutes.`,
  });

  return NextResponse.json({ ok: true });
}
