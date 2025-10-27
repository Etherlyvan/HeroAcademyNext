// src/app/api/auth/session/route.ts
import { auth } from "@/lib/auth-helper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    return NextResponse.json(session);
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}

export const runtime = 'nodejs';