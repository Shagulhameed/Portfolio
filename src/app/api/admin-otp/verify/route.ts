import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  // 🔐 Ensure this email still has admin access
  const adminAccess = await prisma.adminAccess.findFirst({
    where: { email, isActive: true },
  });

  if (!adminAccess) {
    return NextResponse.json(
      { error: "You no longer have admin access." },
      { status: 403 }
    );
  }

  const now = new Date();
  const record = await prisma.adminOtp.findFirst({
    where: { email, used: false, expiresAt: { gt: now } },
    orderBy: { createdAt: "desc" },
  });

  if (!record || record.code !== code) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  await prisma.adminOtp.update({
    where: { id: record.id },
    data: { used: true },
  });

  const res = NextResponse.json({ ok: true });

  // Set cookies
  res.cookies.set("admin", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4,
  });

  res.cookies.set("adminEmail", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4,
  });

  return res;
}
