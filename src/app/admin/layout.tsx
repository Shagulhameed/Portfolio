// src/app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // no sidebar on the login page
  const hideSidebar = pathname === "/admin/admin-login";

  if (hideSidebar) {
    // just render the login page full-width
    return <>{children}</>;
  }

  return (
    <div className="container-fluid admin-shell">
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-9 col-lg-10 admin-main">
          {children}
        </div>
      </div>
    </div>
  );
}
