// src/app/api/teacher/classes/[id]/contents/[contentId]/route.ts
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; contentId: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, contentId } = await params;
    const content = await prisma.classContent.findFirst({
      where: {
        id: contentId,
        classId: id,
        class: {
          teacherId: session.user.id,
        },
      },
    });

    if (!content) {
      return NextResponse.json(
        { error: "Materi tidak ditemukan" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validatedData = contentSchema.parse(body);

    const updatedContent = await prisma.classContent.update({
      where: { id: contentId },
      data: validatedData,
    });

    return NextResponse.json({
      ...updatedContent,
      message: "Materi berhasil diperbarui"
    });
  } catch (error: any) {
    console.error("Update content error:", error);
    
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
  { params }: { params: Promise<{ id: string; contentId: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, contentId } = await params;
    const content = await prisma.classContent.findFirst({
      where: {
        id: contentId,
        classId: id,
        class: {
          teacherId: session.user.id,
        },
      },
    });

    if (!content) {
      return NextResponse.json(
        { error: "Materi tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.classContent.delete({
      where: { id: contentId },
    });

    return NextResponse.json({ 
      message: "Materi berhasil dihapus" 
    });
  } catch (error) {
    console.error("Delete content error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}