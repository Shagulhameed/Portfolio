import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCoverLetterPdf } from "@/lib/generateCoverLetterPdf";
import { Resend } from "resend";
import fs from "fs";
import { DEFAULT_YEARS_EXPERIENCE } from "@/lib/profileConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

type TemplateType = "global" | "india";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    console.log("[send-applications] Raw body:", body);

    const companies: { name: string; email: string; role?: string }[] =
      body?.companies || [];
    const templateType: TemplateType =
      body?.templateType === "india" ? "india" : "global";

    const yearsExperienceRaw =
      typeof body?.yearsExperience === "string"
        ? body.yearsExperience
        : "";
    const yearsExperience =
      yearsExperienceRaw.trim() || DEFAULT_YEARS_EXPERIENCE;

    if (!Array.isArray(companies) || companies.length === 0) {
      return NextResponse.json(
        { error: "companies[] is required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      console.error("[send-applications] Missing RESEND env vars");
      return NextResponse.json(
        { error: "Resend API configuration missing" },
        { status: 500 }
      );
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.SITE_URL || "https://shagulhameed.site"
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const results: any[] = [];

    // Read resume once
    const resumePath = `${process.cwd()}/public/resume.pdf`;
    const resumeBuffer = fs.readFileSync(resumePath);

    for (const company of companies) {
      const companyName = company.name?.trim();
      const toEmail = company.email?.trim();
      const roleTitle = company.role?.trim() || "Full Stack Developer";

      if (!companyName || !toEmail) {
        console.warn("[send-applications] Skipping invalid row:", company);
        continue;
      }

      console.log(
        `[send-applications] Preparing Resend email for ${companyName} -> ${toEmail}`
      );

      // Store token (even if not used in email body right now)
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      const tokenRecord = await prisma.coverToken.create({
        data: {
          token: crypto.randomUUID(),
          companyName,
          email: toEmail,
          expiresAt,
        },
      });

      const downloadLink = `${baseUrl}/cover-letter/${tokenRecord.token}`;
      console.log(`[send-applications] Token stored at ${downloadLink}`);

      // Generate cover-letter PDF with same yearsExperience
      const pdfBuffer = await generateCoverLetterPdf(
        companyName,
        yearsExperience
      );

      const subject = `Application – ${roleTitle} – ${companyName}`;

      // --------------------------
      // Choose email template text
      // --------------------------
      let textBody: string;

      if (templateType === "india") {
        // 🇮🇳 India recruiter template
        textBody = `
Dear Hiring Manager,

I hope you are doing well.

Please find attached my resume and a tailored cover letter for the ${roleTitle} position at ${companyName}.

With over ${yearsExperience} of experience designing and building scalable web applications using React, Angular, Node.js, Next.js, NestJS and cloud platforms (AWS/GCP), I am confident that I can contribute effectively to your engineering team.

I am currently based in Chennai, Tamil Nadu and available to join on short notice, as per your requirement.

Thank you for your time and consideration.

Best regards,
Shagul Hameed
Chennai, India
+91 8760209035
shagulhameed032@gmail.com
https://shagulhameed.site
`.trim();
      } else {
        // 🌍 Global / international recruiter template
        textBody = `
Dear Hiring Manager,

I hope you are doing well.

Please find attached my resume and a tailored cover letter for the ${roleTitle} position at ${companyName}.

With over ${yearsExperience} of experience designing and building scalable enterprise web applications using React, Angular, Node.js, Next.js, NestJS and cloud technologies (AWS/GCP), I am confident that I can contribute effectively to your engineering team.

I am based in Chennai, Tamil Nadu, India, and am open to relocation and visa sponsorship for international roles. I would welcome the opportunity to contribute to Sangavi Appa Company and discuss how my experience aligns with your business goals.

Thank you for your time and consideration.

Best regards,
Shagul Hameed
Chennai, India
+91 8760209035
shagulhameed032@gmail.com
https://shagulhameed.site
`.trim();
      }

      try {
        // ⚠ While domain is not verified, send ONLY to your own Gmail for testing.
        // Keep FROM as your verified domain (eg. send@shagulhameed.site).
        const to =
          process.env.NODE_ENV === "production"
            ? toEmail
            : "shagulhameed032@gmail.com";

        console.log(
          `[send-applications] Sending from ${process.env.EMAIL_FROM} to ${to} using template=${templateType}, years=${yearsExperience}`
        );

        const response = await resend.emails.send({
          from: process.env.EMAIL_FROM!, // must be on your verified domain
          to,
          subject,
          text: textBody,
          attachments: [
            {
              filename: `Cover-Letter-${companyName}.pdf`,
              content: pdfBuffer.toString("base64"),
            },
            {
              filename: "resume.pdf",
              content: resumeBuffer.toString("base64"),
            },
          ],
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        console.log(`[send-applications] Email SENT (Resend) → ${to}`);
        results.push({
          company: companyName,
          email: to,
          id: response.data?.id,
        });
      } catch (err: any) {
        console.error(
          `[send-applications] Resend FAILED for ${toEmail}:`,
          err
        );
        results.push({
          company: companyName,
          email: toEmail,
          error: err?.message || "Resend sending failed",
        });
      }
    }

    return NextResponse.json({ ok: true, results }, { status: 200 });
  } catch (err) {
    console.error("[send-applications] Top-level error:", err);
    return NextResponse.json(
      { error: "Internal server error (see logs)" },
      { status: 500 }
    );
  }
}
