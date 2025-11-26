import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";
import { DEFAULT_YEARS_EXPERIENCE } from "@/lib/profileConfig";

function buildBody(company: string) {
  return `
I have worked with international clients from the USA and Canada, delivering full-stack solutions using React, Angular, NestJS, Oracle, MySQL and MongoDB. I have hands-on experience in building D3.js-based org charts (SanDisk company), setting up Tableau data sources and integrations for embedded analytics, automating tasks using shell scripts on Linux, and managing secure deployments with SSL, Docker setup, and cloud hosting (AWS/GCP).

I also have strong experience in database management (RDBMS/DBMS), including schema design, query optimization and handling large datasets. My work has often involved secure data handling with role-based access control and audit logging—critical for banking and enterprise systems.

On the frontend side, I have optimized Next.js applications for performance through code-splitting, API response tuning, caching strategies and Lighthouse-driven improvements, ensuring fast, responsive user experiences even with complex data visualizations.

In addition to full-stack development, I specialize in UI/UX and branding design using Figma, Adobe Illustrator and Photoshop (logos, banners and web visuals), which helps me deliver interfaces that are both technically solid and visually consistent.

I am based in Chennai, Tamil Nadu, India, and am open to relocation and visa sponsorship for international roles. I would welcome the opportunity to contribute to ${company} and discuss how my experience aligns with your business goals.
`;
}

export async function generateCoverLetterPdf(
  company: string,
  yearsExperience: string = DEFAULT_YEARS_EXPERIENCE
): Promise<Buffer> {
  const safeCompany = company.trim() || "your company";

  // Use jsPDF built-in font "times"
  const FONT = "times"; // normal
  const FONT_BOLD = "times"; // bold style

  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;
  const maxWidth = pageWidth - margin * 2;
  const headerColor = { r: 18, g: 63, b: 148 }; // #123F94

  // ===== HEADER =====
  doc.setFont(FONT_BOLD, "bold");
  doc.setFontSize(20);
  doc.setTextColor(headerColor.r, headerColor.g, headerColor.b);
  doc.text("Shagul Hameed", centerX, margin + 10, { align: "center" });

  doc.setFont(FONT, "normal");
  doc.setFontSize(11);
  doc.text(
    "Chennai, Tamil Nadu, India  |  +91 8760209035",
    centerX,
    margin + 30,
    { align: "center" }
  );
  doc.text(
    "shagulhameed032@gmail.com  |  shagulhameed.site",
    centerX,
    margin + 48,
    { align: "center" }
  );

  doc.setDrawColor(headerColor.r, headerColor.g, headerColor.b);
  doc.line(margin, margin + 54, pageWidth - margin, margin + 54);

  let cursorY = margin + 80;

  // ===== DATE =====
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  doc.setFont(FONT, "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(dateStr, margin, cursorY);
  cursorY += 24;

  // ===== ADDRESS BLOCK =====
  const addressLines = [
    "Hiring Manager",
    safeCompany,
    "Human Resources Department",
  ];
  addressLines.forEach((line) => {
    doc.text(line, margin, cursorY);
    cursorY += 16;
  });

  cursorY += 12;

  // ===== SUBJECT =====
  doc.setFont(FONT_BOLD, "bold");
  doc.text(
    `RE: Full Stack Developer Position – ${safeCompany}`,
    margin,
    cursorY
  );
  cursorY += 24;

  // ===== GREETING =====
  doc.setFont(FONT, "normal");
  doc.text("Dear Hiring Manager,", margin, cursorY);
  cursorY += 24;

  // ===== FIRST PARAGRAPH (partial bold, with yearsExperience) =====
  doc.setFontSize(11);

  const before = "I am writing to express my interest in the ";
  const roleText = `Full Stack Developer position at ${safeCompany}`;
  const mid = " With over ";
  const yearsText = yearsExperience;
  const rest =
    " of experience delivering modern, scalable and high-performance enterprise web applications using React, Angular, Node.js, Next.js, NestJS and cloud platforms (AWS/GCP), I believe my skills are a strong match for your engineering team.";

  let x = margin;

  doc.setFont(FONT, "normal");
  doc.text(before, x, cursorY);
  x += doc.getTextWidth(before);

  doc.setFont(FONT_BOLD, "bold");
  doc.text(roleText, x, cursorY);

  cursorY += 18;

  doc.setFont(FONT, "normal");
  doc.text(mid, margin, cursorY);
  x = margin + doc.getTextWidth(mid);

  doc.setFont(FONT_BOLD, "bold");
  doc.text(yearsText, x, cursorY);
  x += doc.getTextWidth(yearsText);

  doc.setFont(FONT, "normal");
  const restLines = doc.splitTextToSize(rest, maxWidth - (x - margin));
  if (restLines.length > 0) {
    doc.text(restLines[0], x, cursorY);
    cursorY += 16;
    for (let i = 1; i < restLines.length; i++) {
      doc.text(restLines[i], margin, cursorY);
      cursorY += 16;
    }
  } else {
    cursorY += 16;
  }

  cursorY += 8;

  // ===== BODY PARAGRAPHS =====
  const bodyParagraphs = buildBody(safeCompany).split("\n\n");

  bodyParagraphs.forEach((para) => {
    const trimmed = para.trim();
    if (!trimmed) return;
    const lines = doc.splitTextToSize(trimmed, maxWidth);
    lines.forEach((line) => {
      if (cursorY > pageHeight - margin - 120) return;
      doc.text(line, margin, cursorY);
      cursorY += 16;
    });
    cursorY += 8;
  });

  cursorY += 16;
  doc.text("Thank you for considering my application.", margin, cursorY);
  cursorY += 24;
  doc.text("Yours sincerely,", margin, cursorY);
  cursorY += 40;

  // ===== SIGNATURE (optional) =====
  try {
    const sigPath = path.join(process.cwd(), "public", "signature-shagul.png");
    const imgBuffer = fs.readFileSync(sigPath);
    const imgData = `data:image/png;base64,${imgBuffer.toString("base64")}`;
    doc.addImage(imgData, "PNG", margin, cursorY - 30, 120, 50);
  } catch {
    // ignore if missing
  }

  cursorY += 50;
  doc.setFont(FONT_BOLD, "bold");
  doc.setFontSize(12);
  doc.text("Shagul Hameed", margin, cursorY);

  // ===== FOOTER =====
  const footerY = pageHeight - margin + 18;
  doc.setDrawColor(headerColor.r, headerColor.g, headerColor.b);
  doc.line(margin, footerY - 18, pageWidth - margin, footerY - 18);

  doc.setFont(FONT, "normal");
  doc.setFontSize(9);
  doc.setTextColor(headerColor.r, headerColor.g, headerColor.b);
  doc.text("https://shagulhameed.site", margin, footerY);
  doc.text("Cover Letter", pageWidth - margin, footerY, { align: "right" });

  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
