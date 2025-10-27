// src/app/api/admin/classes/[id]/approve/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const updatedClass = await prisma.class.update({
      where: { id: params.id },
      data: {
        approvalStatus: "APPROVED",
      },
    });

    return NextResponse.json({
      message: "Kelas berhasil disetujui",
      class: updatedClass,
    });
  } catch (error) {
    console.error("Approve class error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}