// src/app/api/teacher/classes/[id]/contents/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contentSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().optional(),
  contentType: z.enum(["VIDEO", "PDF", "PPT", "DOCUMENT"]),
  fileUrl: z.string().url("URL file tidak valid"),
  order: z.number().min(1, "Urutan minimal 1"),
});

export async function POST(
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

    // Verifikasi bahwa kelas ini milik guru yang login
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
    const validatedData = contentSchema.parse(body);

    const newContent = await prisma.classContent.create({
      data: {
        ...validatedData,
        classId: params.id,
      },
    });

    return NextResponse.json({
      ...newContent,
      message: "Materi berhasil ditambahkan"
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create content error:", error);
    
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

export async function GET(
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

    const contents = await prisma.classContent.findMany({
      where: {
        classId: params.id,
        class: {
          teacherId: session.user.id,
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error("Get contents error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}