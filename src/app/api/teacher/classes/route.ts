// src/app/api/teacher/classes/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const classSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  thumbnail: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = classSchema.parse(body);

    // Buat kelas dengan status PENDING approval
    const newClass = await prisma.class.create({
      data: {
        ...validatedData,
        thumbnail: validatedData.thumbnail || null,
        teacherId: session.user.id,
        approvalStatus: "PENDING", // Menunggu persetujuan admin
        status: "DRAFT", // Status awal selalu DRAFT
      },
    });

    return NextResponse.json({
      ...newClass,
      message: "Kelas berhasil dibuat dan menunggu persetujuan admin"
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create class error:", error);
    
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