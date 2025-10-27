// src/app/student/classes/page.tsx
import { requireStudent } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  FileText,
  Play,
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

async function getStudentClasses(userId: string) {
  return await prisma.classEnrollment.findMany({
    where: { studentId: userId },
    include: {
      class: {
        include: {
          teacher: {
            select: {
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              contents: true,
              assignments: true,
              enrollments: true,
            },
          },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });
}

export default async function StudentClassesPage() {
  await requireStudent();
  const session = await auth();
  const enrollments = await getStudentClasses(session!.user.id);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Kelas Saya</h1>
          <p className="text-muted-foreground">
            {enrollments.length} kelas yang Anda ikuti
          </p>
        </div>
        <Link href="/student/classes/browse">
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" />
            Jelajahi Kelas Baru
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari kelas..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Classes Grid */}
      {enrollments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment, index) => (
            <Card 
              key={enrollment.id} 
              className="card-hover animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="line-clamp-2 min-h-[3.5rem]">
                  {enrollment.class.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {enrollment.class.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Teacher Info */}
                  <div className="flex items-center gap-2">
                    {enrollment.class.teacher.image ? (
                      <Image
                        src={enrollment.class.teacher.image}
                        alt={enrollment.class.teacher.name || "Teacher"}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {enrollment.class.teacher.name}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {enrollment.class._count.contents} materi
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {enrollment.class._count.enrollments} siswa
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/student/classes/${enrollment.classId}`}>
                    <Button className="w-full gap-2">
                      <Play className="h-4 w-4" />
                      Lanjutkan Belajar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum Ada Kelas
            </h3>
            <p className="text-muted-foreground mb-6">
              Mulai perjalanan belajar Anda dengan mengikuti kelas pertama
            </p>
            <Link href="/student/classes/browse">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Jelajahi Kelas
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}