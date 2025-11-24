/* eslint-disable @next/next/no-page-custom-font */
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.scss";

import Navbar from "@/components/Navbar";
import Script from "next/script";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "Advanced portfolio with Next.js, Bootstrap, and Framer Motion",
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
      </head>
      <body className="page-root">
        <Navbar />

        {/* this is the flex-growing area */}
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
