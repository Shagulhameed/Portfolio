"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function Navbar() {
  const pathname = usePathname();            // 👈 current route
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [istTime, setIstTime] = useState("");
  const [userTime, setUserTime] = useState("");
  const [userZoneId, setUserZoneId] = useState("");
   const [isAdmin, setIsAdmin] = useState(false);  
  

  // helper to build link class
  const linkClass = (href: string) =>
    `nav-link nav-link-pill ${pathname === href ? "active" : ""}`;

  // ---- time + theme effects (your existing logic, shortened) ----
  useEffect(() => {
    const detectedZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
    setUserZoneId(detectedZone);

    const updateTimes = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
      setIstTime(`${ist} | IST`);

      const baseUser = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZone: detectedZone,
      });
      const withZoneName = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZone: detectedZone,
        timeZoneName: "short",
      });
      const parts = withZoneName.split(" ");
      const shortZone = parts[1] || detectedZone;
      setUserTime(`${baseUser} | ${shortZone}`);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(
      "portfolio-theme"
    ) as Theme | null;
    const initial: Theme =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(initial);
    document.documentElement.setAttribute("data-bs-theme", initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

// ---- check admin status from server ----
// inside Navbar component
useEffect(() => {
  let cancelled = false;

  const checkAdmin = async () => {
    try {
      const res = await fetch("/api/admin-status", { method: "GET" });
      if (!res.ok) return;
      const data = await res.json();
      if (!cancelled) {
        setIsAdmin(!!data.isAdmin);
      }
    } catch (e) {
      console.warn("Failed to check admin status", e);
    }
  };

  checkAdmin();
}, [pathname]);   // re-run after navigation



const handleLogout = async () => {
  try {
    await fetch("/api/admin-logout", { method: "POST" });
  } catch (e) {
    console.warn("Logout failed", e);
  }

  setIsAdmin(false);        // update UI immediately
  window.location.href = "/"; // force full reload (status will be false)
};


  return (
    <motion.nav
      className="navbar navbar-expand-lg glass-navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-inner container d-flex align-items-center">
        {/* LEFT label */}
        {/* <div className="navbar-left d-none d-md-flex flex-column me-3">
          <span className="navbar-meta">TIME ZONE</span>
          <span className="fw-semibold">Asia/Kolkata (IST)</span>
        </div> */}

        {/* mobile toggler */}
        <button
          className="navbar-toggler d-lg-none ms-1"
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER – links */}
        <div
          className={`collapse navbar-collapse navbar-center ${
            isOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/experience" className={linkClass("/experience")}>
                Experience
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/projects" className={linkClass("/projects")}>
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={linkClass("/contact")}>
                Contact
              </Link>
            </li>
<li className="nav-item position-relative">
  <Link href="/#blog" className="nav-link nav-link-pill">
    BLOG
  </Link>
  <span className="coming-soon-label">COMING SOON</span>
</li>


          </ul>
        </div>

        {/* RIGHT – time + theme */}
        <div className="navbar-right d-flex align-items-center gap-3 ms-auto">
          <div className="navbar-time navbar-time-desktop fw-semibold small">
            {userZoneId === "Asia/Kolkata" ? (
              istTime
            ) : (
              <>
                You&nbsp;{userTime}
                <span className="time-separator"> • </span>
                Me&nbsp;{istTime}
              </>
            )}
          </div>

          <div className="navbar-time navbar-time-mobile fw-semibold small">
            {istTime}
          </div>

          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline-secondary theme-toggle-btn"
            type="button"
          >
            <span>{theme === "dark" ? "🌙" : "☀️"}</span>
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
        {/* 👇 ONLY login + logout here */}
     {!isAdmin ? (
  <Link href="/admin-login">
    <button className="btn btn-sm btn-outline-secondary theme-toggle-btn">
      🔐 Login
    </button>
  </Link>
) : (
  <>
    {/* <Link href="/dashboard">
      <button className="btn btn-primary btn-sm fw-semibold">
        Dashboard
      </button>
    </Link> */}
    <button
      className="btn btn-outline-danger btn-sm fw-semibold"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
)}


        </div>
      </div>
    </motion.nav>
  );
}
