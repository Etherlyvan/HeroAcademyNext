// src/app/teacher/classes/[id]/contents/new/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { ContentForm } from "@/components/teacher/content-form";
import { notFound } from "next/navigation";

async function getClassInfo(classId: string, teacherId: string) {
  const classData = await prisma.class.findFirst({
    where: {
      id: classId,
      teacherId,
    },
    select: {
      id: true,
      title: true,
      status: true,
    },
  });

  if (!classData) {
    notFound();
  }

  return classData;
}

export default async function NewContentPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  await requireTeacher();
  const session = await auth();
  const classData = await getClassInfo(params.id, session!.user.id);

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tambah Materi Baru</h1>
        <p className="text-muted-foreground">
          Tambahkan materi pembelajaran untuk kelas: <span className="font-medium">{classData.title}</span>
        </p>
      </div>

      <ContentForm classId={params.id} />
    </div>
  );
}