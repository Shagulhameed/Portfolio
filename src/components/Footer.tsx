"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="footer-section">
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Compact Social */}
        <div className="footer-social">
          <Link href="mailto:yourmail@example.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </Link>
          <Link href="https://github.com/yourgithubid" target="_blank" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </Link>
          <Link href="https://linkedin.com/in/yourlinkedinid" target="_blank" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </Link>
        </div>

        {/* Small Footer Text */}
        <div className="footer-text">
          © {new Date().getFullYear()} Shagul Hameed — All Rights Reserved.
        </div>
      </motion.div>
    </footer>
  );
}
