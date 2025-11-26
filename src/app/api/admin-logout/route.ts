import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ ok: true });

  // ❌ remove admin auth cookie
  res.cookies.set("admin", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",          // must match login cookie
    maxAge: 0,          // delete now
  });

  // ❌ remove stored email
  res.cookies.set("adminEmail", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",          // must match login cookie
    maxAge: 0,
  });

  return res;
}
