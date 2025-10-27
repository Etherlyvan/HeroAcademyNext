// src/app/api/teacher/classes/[id]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const classSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  thumbnail: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const classData = await prisma.class.findFirst({
      where: {
        id: params.id,
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
    const validatedData = classSchema.parse(body);

    const updatedClass = await prisma.class.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        thumbnail: validatedData.thumbnail || null,
      },
    });

    return NextResponse.json(updatedClass);
  } catch (error: any) {
    console.error("Update class error:", error);
    
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const classData = await prisma.class.findFirst({
      where: {
        id: params.id,
        teacherId: session.user.id,
      },
    });

    if (!classData) {
      return NextResponse.json(
        { error: "Kelas tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.class.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Kelas berhasil dihapus" });
  } catch (error) {
    console.error("Delete class error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}