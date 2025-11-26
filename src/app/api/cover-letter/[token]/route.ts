import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCoverLetterPdf } from "@/lib/generateCoverLetterPdf";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  const record = await prisma.coverToken.findUnique({
    where: { token },
  });

  if (!record) {
    return new NextResponse("Cover letter not found", { status: 404 });
  }

  const pdf = await generateCoverLetterPdf(record.companyName);

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cover-letter-${token}.pdf"`,
    },
  });
}
