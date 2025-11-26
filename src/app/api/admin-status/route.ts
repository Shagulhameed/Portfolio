import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isAdmin = req.cookies.get("admin")?.value === "true";
  const email = req.cookies.get("adminEmail")?.value ?? null;

  return NextResponse.json({ isAdmin, email });
}
