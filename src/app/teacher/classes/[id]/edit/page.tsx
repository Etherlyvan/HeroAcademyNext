// src/app/teacher/classes/[id]/edit/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { ClassForm } from "@/components/teacher/class-form";
import { notFound } from "next/navigation";

async function getClass(classId: string, teacherId: string) {
  const classData = await prisma.class.findFirst({
    where: {
      id: classId,
      teacherId,
    },
  });

  if (!classData) {
    notFound();
  }

  return classData;
}

export default async function EditClassPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  await requireTeacher();
  const session = await auth();
  const { id } = await params;
  const classData = await getClass(id, session!.user.id);

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Kelas</h1>
        <p className="text-muted-foreground">
          Perbarui informasi kelas Anda
        </p>
      </div>

      <ClassForm initialData={classData} />
    </div>
  );
}