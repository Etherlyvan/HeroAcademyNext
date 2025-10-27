// src/app/student/dashboard/page.tsx
import { requireStudent } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Brain,
  Calendar,
  Play,
  Award
} from "lucide-react";
import Link from "next/link";

async function getStudentStats(userId: string) {
  const [enrollments, submissions, heroAIResults] = await Promise.all([
    prisma.classEnrollment.findMany({
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
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
      take: 4,
    }),
    prisma.assignmentSubmission.findMany({
      where: { studentId: userId },
      include: {
        assignment: {
          include: {
            class: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
      take: 5,
    }),
    prisma.heroAIResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 1,
    }),
  ]);

  const pendingAssignments = await prisma.assignment.findMany({
    where: {
      class: {
        enrollments: {
          some: {
            studentId: userId,
          },
        },
      },
      dueDate: {
        gte: new Date(),
      },
      submissions: {
        none: {
          studentId: userId,
        },
      },
    },
    include: {
      class: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { dueDate: "asc" },
    take: 5,
  });

  return {
    enrollments,
    submissions,
    heroAIResults,
    pendingAssignments,
    totalClasses: enrollments.length,
    totalSubmissions: submissions.length,
    completedAssignments: submissions.filter(s => s.status === "GRADED").length,
  };
}

export default async function StudentDashboard() {
  await requireStudent();
  const session = await auth();
  const stats = await getStudentStats(session!.user.id);

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      SUBMITTED: { label: "Dikumpulkan", color: "bg-blue-100 text-blue-700 border-blue-200" },
      GRADED: { label: "Dinilai", color: "bg-green-100 text-green-700 border-green-200" },
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Selamat Datang, {session?.user.name}!
          </h1>
          <p className="text-muted-foreground">
            Mari lanjutkan perjalanan belajar Anda hari ini
          </p>
        </div>
        <Link href="/student/classes/browse">
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" />
            Jelajahi Kelas
          </Button>
        </Link>
      </div>

      {/* Hero AI Banner */}
      {stats.heroAIResults.length === 0 && (
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 animate-scale-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Kenali Potensi Belajar Anda!</h3>
                <p className="text-primary-foreground/90 mb-4">
                  Mulai analisa dengan Hero AI untuk menemukan gaya belajar dan rekomendasi jurusan yang tepat untuk Anda
                </p>
                <Link href="/hero-ai">
                  <Button variant="secondary" className="gap-2">
                    <Play className="h-4 w-4" />
                    Mulai Hero AI Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                Kelas Aktif
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
                Kelas yang Anda ikuti
            </p>
            </CardContent>
        </Card>

        <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                Tugas Selesai
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            </CardHeader>
            <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
                {stats.completedAssignments}
            </div>
            <p className="text-sm text-muted-foreground">
                Dari {stats.totalSubmissions} total
            </p>
            </CardContent>
        </Card>

        <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                Tugas Pending
            </CardTitle>
            <div className="p-2 rounded-lg bg-orange-50">
                <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            </CardHeader>
            <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
                {stats.pendingAssignments.length}
            </div>
            <p className="text-sm text-muted-foreground">
                Perlu dikerjakan
            </p>
            </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Classes */}
        <Card className="animate-slide-in-left">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Kelas Saya</CardTitle>
                <CardDescription>Kelas yang sedang Anda ikuti</CardDescription>
              </div>
              <Link href="/student/classes">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.enrollments.length > 0 ? (
                stats.enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                          {enrollment.class.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Oleh {enrollment.class.teacher.name}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {enrollment.class._count.contents} materi
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {enrollment.class._count.assignments} tugas
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/student/classes/${enrollment.classId}`}>
                      <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
                        <Play className="h-3 w-3" />
                        Lanjutkan Belajar
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Belum mengikuti kelas
                  </p>
                  <Link href="/student/classes/browse">
                    <Button size="sm" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Jelajahi Kelas
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Assignments */}
        <Card className="animate-slide-in-right">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tugas Mendatang</CardTitle>
                <CardDescription>Deadline yang perlu diperhatikan</CardDescription>
              </div>
              <Link href="/student/assignments">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.pendingAssignments.length > 0 ? (
                stats.pendingAssignments.map((assignment) => {
                  const daysUntilDue = Math.ceil(
                    (new Date(assignment.dueDate).getTime() - new Date().getTime()) / 
                    (1000 * 60 * 60 * 24)
                  );
                  const isUrgent = daysUntilDue <= 3;

                  return (
                    <div
                      key={assignment.id}
                      className={`p-4 rounded-lg border transition-all ${
                        isUrgent 
                          ? 'border-orange-200 bg-orange-50/50' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">
                            {assignment.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {assignment.class.title}
                          </p>
                        </div>
                        {isUrgent && (
                          <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={isUrgent ? 'text-orange-600 font-medium' : 'text-muted-foreground'}>
                          {daysUntilDue === 0 ? 'Hari ini' : 
                           daysUntilDue === 1 ? 'Besok' : 
                           `${daysUntilDue} hari lagi`}
                        </span>
                      </div>
                      <Button 
                        variant={isUrgent ? "default" : "outline"} 
                        size="sm" 
                        className="w-full mt-3"
                      >
                        Kerjakan Sekarang
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Tidak ada tugas yang pending
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Semua tugas sudah diselesaikan! 🎉
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card className="animate-fade-in-up animation-delay-300">
        <CardHeader>
          <CardTitle>Riwayat Pengumpulan</CardTitle>
          <CardDescription>Tugas yang baru saja Anda kumpulkan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.submissions.length > 0 ? (
              stats.submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {submission.assignment.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {submission.assignment.class.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {submission.score && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {submission.score}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          /{submission.assignment.maxScore}
                        </div>
                      </div>
                    )}
                    {getStatusBadge(submission.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Belum ada pengumpulan tugas
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      {stats.heroAIResults.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 animate-fade-in-up animation-delay-400">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>Hero AI Profile</CardTitle>
                <CardDescription>Hasil analisa potensi belajar Anda</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-muted-foreground">Gaya Belajar</span>
                </div>
                <p className="text-lg font-bold text-foreground">Visual Learner</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-muted-foreground">Kecerdasan</span>
                </div>
                <p className="text-lg font-bold text-foreground">Linguistik</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Rekomendasi</span>
                </div>
                <p className="text-lg font-bold text-foreground">Psikologi</p>
              </div>
            </div>
            <Link href="/student/hero-ai">
              <Button variant="outline" className="w-full mt-4 gap-2">
                Lihat Detail Lengkap
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}