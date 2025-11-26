import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCoverLetterPdf } from "@/lib/generateCoverLetterPdf";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    const record = await prisma.coverToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    if (record.used) {
      return NextResponse.json(
        { error: "Link already used" },
        { status: 403 }
      );
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json({ error: "Link expired" }, { status: 410 });
    }

    // Mark token as used (one-time link)
    await prisma.coverToken.update({
      where: { token },
      data: { used: true },
    });

    // Generate the PDF for this company
    const pdfBuffer = await generateCoverLetterPdf(record.companyName);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Cover-Letter-${record.companyName}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Cover letter download error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
