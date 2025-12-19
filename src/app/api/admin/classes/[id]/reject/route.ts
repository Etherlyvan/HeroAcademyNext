// src/app/api/admin/classes/[id]/reject/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { reason } = body;

    const { id } = await params;
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        approvalStatus: "REJECTED",
      },
    });

    // TODO: Kirim notifikasi ke guru dengan alasan penolakan

    return NextResponse.json({
      message: "Kelas ditolak",
      class: updatedClass,
    });
  } catch (error) {
    console.error("Reject class error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}