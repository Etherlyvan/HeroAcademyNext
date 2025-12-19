// src/app/api/teacher/classes/[id]/archive/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const archiveSchema = z.object({
  status: z.enum(["ACTIVE", "ARCHIVED"]),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const classData = await prisma.class.findFirst({
      where: {
        id,
        teacherId: session.user.id,
      },
    });

    if (!classData) {
      return NextResponse.json(
        { error: "Kelas tidak ditemukan" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { status } = archiveSchema.parse(body);

    const updatedClass = await prisma.class.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      message: status === "ARCHIVED" ? "Kelas berhasil diarsipkan" : "Kelas berhasil diaktifkan kembali",
      class: updatedClass,
    });
  } catch (error: any) {
    console.error("Archive class error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}