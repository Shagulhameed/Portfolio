// src/app/admin/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin");

  // Protect the admin routes
  if (!adminCookie || adminCookie.value !== "true") {
    redirect("/admin/admin-login");
  }

  // NO AdminLayout here – layout.tsx already wraps this
  return (
    <div>
      <h1 className="mb-3">Admin Dashboard</h1>
      <p className="text-muted">
        Welcome back, Sha. Use the menu on the left to manage your tools.
      </p>

      <div className="alert alert-info mt-4">
        Tip: Start by sending applications or downloading your cover letters.
      </div>
    </div>
  );
}
