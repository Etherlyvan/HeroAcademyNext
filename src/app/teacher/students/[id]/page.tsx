// src/app/teacher/students/[id]/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail,
  Calendar,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  BarChart3,
  Eye
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getStudentDetail(studentId: string, teacherId: string) {
  // Cek apakah siswa ini ada di kelas yang diajar guru ini
  const enrollment = await prisma.classEnrollment.findFirst({
    where: {
      studentId,
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
          bio: true,
          phone: true,
          createdAt: true,
        },
      },
      class: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!enrollment) {
    notFound();
  }

  // Ambil semua kelas yang diikuti siswa dari guru ini
  const studentClasses = await prisma.classEnrollment.findMany({
    where: {
      studentId,
      class: {
        teacherId,
      },
    },
    include: {
      class: {
        select: {
          id: true,
          title: true,
          status: true,
        },
      },
    },
  });

  // Ambil semua tugas dan submission dari siswa ini
  const assignments = await prisma.assignment.findMany({
    where: {
      teacherId,
      class: {
        enrollments: {
          some: {
            studentId,
          },
        },
      },
    },
    include: {
      class: {
        select: {
          title: true,
        },
      },
      submissions: {
        where: {
          studentId,
        },
      },
    },
    orderBy: {
      dueDate: 'desc',
    },
  });

  return {
    student: enrollment.student,
    studentClasses,
    assignments,
  };
}

export default async function StudentDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  await requireTeacher();
  const session = await auth();
  const { student, studentClasses, assignments } = await getStudentDetail(params.id, session!.user.id);

  const getSubmissionStats = () => {
    const total = assignments.length;
    const submitted = assignments.filter(a => a.submissions.length > 0).length;
    const graded = assignments.filter(a => a.submissions.length > 0 && a.submissions[0].status === "GRADED").length;
    const scores = assignments
      .filter(a => a.submissions.length > 0 && a.submissions[0].score !== null)
      .map(a => a.submissions[0].score!);
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;

    return { total, submitted, graded, averageScore };
  };

  const stats = getSubmissionStats();

  const getSubmissionStatusBadge = (assignment: any) => {
    const submission = assignment.submissions[0];
    if (!submission) {
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200">Belum Dikerjakan</span>;
    }
    
    if (submission.status === "GRADED") {
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">Dinilai</span>;
    }
    if (submission.status === "SUBMITTED") {
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-blue-100 text-blue-700 border-blue-200">Dikumpulkan</span>;
    }
    return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-700 border-yellow-200">Pending</span>;
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/teacher/students">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Siswa
          </Button>
        </Link>
      </div>

      {/* Student Profile */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              {student.image ? (
                <Image
                  src={student.image}
                  alt={student.name || "Student"}
                  width={80}
                  height={80}
                  className="rounded-full ring-4 ring-primary/20"
                />
              ) : (
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">
                  {student.name || "Unnamed Student"}
                </CardTitle>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {student.email}
                  </div>
                  {student.phone && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {student.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Bergabung: {new Date(student.createdAt).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Kirim Pesan
              </Button>
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Laporan Detail
              </Button>
            </div>
          </div>
        </CardHeader>
        {student.bio && (
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Bio</h4>
              <p className="text-sm text-muted-foreground">{student.bio}</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kelas Diikuti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentClasses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tugas Dikumpulkan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
            <p className="text-xs text-muted-foreground">dari {stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sudah Dinilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.graded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rata-rata Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.averageScore}</div>
          </CardContent>
        </Card>
      </div>

      {/* Classes and Assignments */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Kelas yang Diikuti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentClasses.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {enrollment.class.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Status: {enrollment.class.status}
                      </p>
                    </div>
                  </div>
                  <Link href={`/teacher/classes/${enrollment.class.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Riwayat Tugas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {assignments.map((assignment) => {
                const submission = assignment.submissions[0];
                const overdue = !submission && new Date(assignment.dueDate) < new Date();

                return (
                  <div
                    key={assignment.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      overdue ? 'border-red-200 bg-red-50/30' : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {assignment.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {assignment.class.title}
                        </p>
                      </div>
                      {getSubmissionStatusBadge(assignment)}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                      </span>
                      {submission?.score && (
                        <span className="font-medium text-primary">
                          Nilai: {submission.score}/{assignment.maxScore}
                        </span>
                      )}
                    </div>
                    
                    {submission?.feedback && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                        <p className="font-medium mb-1">Feedback:</p>
                        <p className="text-muted-foreground">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}