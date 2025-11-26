// src/app/cover-letter-download/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import CoverLetterDownload from "@/components/CoverLetterDownload";

export const dynamic = "force-dynamic";

export default async function CoverLetterDownloadPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin");
  if (!adminCookie || adminCookie.value !== "true") {
    redirect("/admin-login");
  }

  return (
    <AdminLayout>
      <h1 className="mb-3">Cover Letter Download</h1>
      <CoverLetterDownload />
    </AdminLayout>
  );
}
