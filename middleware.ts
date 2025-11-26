import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/apply-admin", "/api/send-applications"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    const isAdmin = req.cookies.get("admin")?.value === "true";
    if (!isAdmin) {
      const loginUrl = new URL("/apply-login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/apply-admin/:path*", "/api/send-applications/:path*"],
};
