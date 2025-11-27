"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type AdminProfile = {
  isAdmin: boolean;
  email: string | null;
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const [firstName, setFirstName] = useState("Admin");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/admin-profile");
        if (!res.ok) return;
        const data: AdminProfile = await res.json();

        if (data.email) {
          setEmail(data.email);
          const localPart = data.email.split("@")[0];
          const name =
            localPart.charAt(0).toUpperCase() + localPart.slice(1);
          setFirstName(name);
        }
      } catch (e) {
        console.warn("Failed to load admin profile", e);
      }
    };

    loadProfile();
  }, []);

  const itemClass = (href: string) =>
    `sidebar-item ${pathname === href ? "active" : ""}`;

  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="avatar">{firstName.charAt(0)}</div>
        <div className="user-info">
          <div className="user-name">{firstName}</div>
          {email && <div className="user-email">{email}</div>}
        </div>
      </div>

<nav className="sidebar-menu">
  <Link href="/admin/dashboard" className={itemClass("/admin/dashboard")}>
    🏠 Dashboard
  </Link>
  
  <Link href="/admin/apply-admin" className={itemClass("/admin/apply-admin")}>
    📧 Send Applications
  </Link>

  <Link
    href="/admin/cover-letter-download"
    className={itemClass("/admin/cover-letter-download")}
  >
    📄 Cover Letters
  </Link>

  <Link 
    href="/admin/projects/" 
    className={itemClass("/admin/projects/")}
  >
    📦 Project Upload
  </Link>
</nav>

    </aside>
  );
}
