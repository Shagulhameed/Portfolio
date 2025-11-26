import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/prisma"; // We'll fix this if path differs

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, email } = body;

    if (!companyName || !email) {
      return NextResponse.json(
        { error: "companyName and email are required" },
        { status: 400 }
      );
    }

    // Generate secure random token
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // ⏳ Token valid for 1 hour

    // Save to DB
    await prisma.coverToken.create({
      data: {
        token,
        companyName,
        email,
        expiresAt,
      },
    });

    // Send URL
    return NextResponse.json({
      link: `${process.env.NEXT_PUBLIC_BASE_URL}/cover-letter/${token}`,
    });
  } catch (error) {
    console.error("Error generating cover letter token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
