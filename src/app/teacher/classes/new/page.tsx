// src/app/teacher/classes/new/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { ClassForm } from "@/components/teacher/class-form";

export default async function NewClassPage() {
  await requireTeacher();

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Buat Kelas Baru</h1>
        <p className="text-muted-foreground">
          Isi informasi kelas yang akan Anda ajar
        </p>
      </div>

      <ClassForm />
    </div>
  );
}