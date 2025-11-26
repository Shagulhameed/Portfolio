// src/app/apply-admin/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ApplyAdminClient from "./ApplyAdminClient";

export const dynamic = "force-dynamic";

export default async function ApplyAdminPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin");

  if (!adminCookie || adminCookie.value !== "true") {
    redirect("/admin-login");
  }

  return (
    <AdminLayout>
      <ApplyAdminClient />
    </AdminLayout>
  );
}
