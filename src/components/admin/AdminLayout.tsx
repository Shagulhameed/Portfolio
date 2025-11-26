// src/components/admin/AdminLayout.tsx
import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
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
