// src/app/teacher/dashboard/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  FileText,
  Clock,
  TrendingUp,
  Plus,
  Eye,
  Edit
} from "lucide-react";
import Link from "next/link";

async function getTeacherStats(userId: string) {
  try {
    const [classes, assignments, totalStudents] = await Promise.all([
      prisma.class.findMany({
        where: { teacherId: userId },
        include: {
          _count: {
            select: {
              enrollments: true,
              assignments: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.assignment.findMany({
        where: { teacherId: userId },
        include: {
          class: {
            select: {
              title: true,
            },
          },
          _count: {
            select: {
              submissions: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.classEnrollment.count({
        where: {
          class: {
            teacherId: userId,
          },
        },
      }),
    ]);

    return {
      classes,
      assignments,
      totalStudents,
      totalClasses: classes.length,
      totalAssignments: assignments.length,
    };
  } catch (error) {
    console.error("Error fetching teacher stats:", error);
    return {
      classes: [],
      assignments: [],
      totalStudents: 0,
      totalClasses: 0,
      totalAssignments: 0,
    };
  }
}

export default async function TeacherDashboard() {
  await requireTeacher();
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  const stats = await getTeacherStats(session.user.id);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Selamat Datang, {session?.user.name}!
          </h1>
          <p className="text-muted-foreground">
            Dashboard guru Hero Academy
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/teacher/classes/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Buat Kelas
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Kelas
            </CardTitle>
            <div className="p-2 rounded-lg bg-red-50">
              <BookOpen className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.totalClasses}
            </div>
            <p className="text-sm text-muted-foreground">
              Kelas yang Anda ajar
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Siswa
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-50">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.totalStudents}
            </div>
            <p className="text-sm text-muted-foreground">
              Siswa terdaftar
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tugas
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-50">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.totalAssignments}
            </div>
            <p className="text-sm text-muted-foreground">
              Tugas yang dibuat
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Classes */}
        <Card className="animate-slide-in-left">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Kelas Terbaru</CardTitle>
                <CardDescription>Kelas yang Anda ajar</CardDescription>
              </div>
              <Link href="/teacher/classes">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.classes.length > 0 ? (
                stats.classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {cls.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {cls.description}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        cls.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                        cls.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {cls.status === 'ACTIVE' ? 'Aktif' :
                         cls.status === 'DRAFT' ? 'Draft' : 'Arsip'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {cls._count.enrollments} siswa
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {cls._count.assignments} tugas
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link href={`/teacher/classes/${cls.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
                          Lihat
                        </Button>
                      </Link>
                      <Link href={`/teacher/classes/${cls.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Belum ada kelas
                  </p>
                  <Link href="/teacher/classes/new">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Buat Kelas Pertama
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card className="animate-slide-in-right">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tugas Terbaru</CardTitle>
                <CardDescription>Tugas yang perlu diperiksa</CardDescription>
              </div>
              <Link href="/teacher/assignments">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.assignments.length > 0 ? (
                stats.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {assignment.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {assignment.class.title}
                        </p>
                      </div>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {assignment._count.submissions} pengumpulan
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Periksa Tugas
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Belum ada tugas
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}