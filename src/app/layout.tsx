/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.scss";
import "@/styles/admin/dashboard.scss";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sha Hameed | Full Stack Developer & Product Engineer",
  description:
    "Experienced Full Stack Developer with 5+ years in Angular, React, Node.js, MongoDB, MySQL, AWS, UI/UX, product engineering, and team leadership. Expert in building scalable web apps, enterprise solutions, and modern UI with excellent problem-solving and project management skills.",
  keywords: [
    "Full Stack Developer",
    "Angular Developer",
    "React Developer",
    "Node Developer",
    "JavaScript",
    "TypeScript",
    "MERN Stack",
    "UI/UX Engineer",
    "Product Developer",
    "Tech Lead",
    "Software Engineer",
    "Next.js",
    "Bootstrap",
    "Framer Motion",
    "AWS",
    "Microservices",
    "MongoDB",
    "MySQL",
    "REST API",
    "Interview Ready",
    "Portfolio",
    "Team Leadership",
    "Web Development",
    "Enterprise Applications",
    "Architect Solutions",
    "Problem Solving",
  ],
  icons: {
    icon: "/favicon.png", // must exist in /public/favicon.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* optional extra link, metadata.icons is already enough */}
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="page-root">
        <Navbar />

        <main className="page-main">{children}</main>

        <Footer />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
