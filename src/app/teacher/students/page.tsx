// src/app/teacher/students/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  Filter,
  Mail,
  BookOpen,
  FileText,
  TrendingUp,
  Award,
  Eye,
  MessageCircle,
  BarChart3
} from "lucide-react";
import Image from "next/image";

async function getTeacherStudents(teacherId: string) {
  const enrollments = await prisma.classEnrollment.findMany({
    where: {
      class: {
        teacherId,
      },
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      class: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      enrolledAt: 'desc',
    },
  });

  // Group by student
  const studentsMap = new Map();
  enrollments.forEach(enrollment => {
    const studentId = enrollment.student.id;
    if (!studentsMap.has(studentId)) {
      studentsMap.set(studentId, {
        ...enrollment.student,
        classes: [],
        enrolledAt: enrollment.enrolledAt,
      });
    }
    studentsMap.get(studentId).classes.push(enrollment.class);
  });

  return Array.from(studentsMap.values());
}

async function getStudentStats(teacherId: string) {
  const enrollments = await prisma.classEnrollment.findMany({
    where: {
      class: {
        teacherId,
      },
    },
    select: {
      studentId: true,
    },
  });

  const uniqueStudents = new Set(enrollments.map(e => e.studentId));
  const totalStudents = uniqueStudents.size;

  const submissions = await prisma.assignmentSubmission.findMany({
    where: {
      assignment: {
        teacherId,
      },
    },
  });

  const activeStudents = new Set(
    submissions
      .filter(s => new Date(s.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .map(s => s.studentId)
  ).size;

  return {
    totalStudents,
    activeStudents,
    totalSubmissions: submissions.length,
    averageScore: submissions.filter(s => s.score).length > 0
      ? Math.round(
          submissions.filter(s => s.score).reduce((sum, s) => sum + (s.score || 0), 0) /
          submissions.filter(s => s.score).length
        )
      : 0,
  };
}

export default async function TeacherStudentsPage() {
  await requireTeacher();
  const session = await auth();
  const students = await getTeacherStudents(session!.user.id);
  const stats = await getStudentStats(session!.user.id);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Siswa</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau progress siswa Anda
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Siswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Siswa terdaftar</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Siswa Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Aktif 7 hari terakhir</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pengumpulan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground mt-1">Tugas terkumpul</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rata-rata Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.averageScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Dari semua tugas</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari siswa..."
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

      {/* Students List */}
      {students.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa</CardTitle>
            <CardDescription>
              Semua siswa yang mengikuti kelas Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student: any, index: number) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {student.image ? (
                      <Image
                        src={student.image}
                        alt={student.name || "Student"}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {student.name || "Unnamed Student"}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {student.classes.length} kelas
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      Lihat Progress
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      Kirim Pesan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum Ada Siswa
            </h3>
            <p className="text-muted-foreground mb-6">
              Belum ada siswa yang mendaftar ke kelas Anda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}