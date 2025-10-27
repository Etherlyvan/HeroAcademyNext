// src/app/student/assignments/page.tsx
import { requireStudent } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  Award,
  TrendingUp,
  BookOpen
} from "lucide-react";
import Link from "next/link";

async function getStudentAssignments(studentId: string) {
  const enrollments = await prisma.classEnrollment.findMany({
    where: { studentId },
    select: { classId: true },
  });

  const classIds = enrollments.map(e => e.classId);

  const assignments = await prisma.assignment.findMany({
    where: {
      classId: { in: classIds },
    },
    orderBy: { dueDate: 'asc' },
    include: {
      class: {
        select: {
          id: true,
          title: true,
        },
      },
      submissions: {
        where: { studentId },
        select: {
          id: true,
          status: true,
          score: true,
          feedback: true,
          submittedAt: true,
          gradedAt: true,
        },
      },
    },
  });

  return assignments;
}

async function getAssignmentStats(studentId: string) {
  const enrollments = await prisma.classEnrollment.findMany({
    where: { studentId },
    select: { classId: true },
  });

  const classIds = enrollments.map(e => e.classId);

  const [totalAssignments, submissions] = await Promise.all([
    prisma.assignment.count({
      where: { classId: { in: classIds } },
    }),
    prisma.assignmentSubmission.findMany({
      where: { studentId },
      include: {
        assignment: true,
      },
    }),
  ]);

  const submitted = submissions.filter(s => s.status !== "PENDING").length;
  const graded = submissions.filter(s => s.status === "GRADED").length;
  const pending = totalAssignments - submitted;

  const averageScore = graded > 0
    ? Math.round(
        submissions
          .filter(s => s.score !== null)
          .reduce((sum, s) => sum + (s.score || 0), 0) / graded
      )
    : 0;

  return {
    totalAssignments,
    submitted,
    graded,
    pending,
    averageScore,
  };
}

export default async function StudentAssignmentsPage() {
  await requireStudent();
  const session = await auth();
  const assignments = await getStudentAssignments(session!.user.id);
  const stats = await getAssignmentStats(session!.user.id);

  const getSubmissionStatus = (assignment: any) => {
    const submission = assignment.submissions[0];
    if (!submission) return { status: "PENDING", label: "Belum Dikerjakan", color: "bg-gray-100 text-gray-700 border-gray-200" };
    
    if (submission.status === "GRADED") {
      return { status: "GRADED", label: "Sudah Dinilai", color: "bg-green-100 text-green-700 border-green-200" };
    }
    if (submission.status === "SUBMITTED") {
      return { status: "SUBMITTED", label: "Menunggu Penilaian", color: "bg-blue-100 text-blue-700 border-blue-200" };
    }
    return { status: "PENDING", label: "Belum Dikerjakan", color: "bg-gray-100 text-gray-700 border-gray-200" };
  };

  const isOverdue = (dueDate: Date, submission: any) => {
    if (submission) return false;
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const days = Math.ceil(
      (new Date(dueDate).getTime() - new Date().getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tugas Saya</h1>
        <p className="text-muted-foreground">
          Kelola dan kerjakan tugas dari semua kelas Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tugas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssignments}</div>
            <p className="text-xs text-muted-foreground mt-1">Semua tugas</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Belum Dikerjakan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Perlu dikerjakan</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sudah Dikumpulkan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
            <p className="text-xs text-muted-foreground mt-1">Tugas terkumpul</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sudah Dinilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.graded}</div>
            <p className="text-xs text-muted-foreground mt-1">Selesai dinilai</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rata-rata Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.averageScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Dari {stats.graded} tugas</p>
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
                placeholder="Cari tugas..."
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

      {/* Assignments List */}
      {assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment, index) => {
            const submission = assignment.submissions[0];
            const status = getSubmissionStatus(assignment);
            const overdue = isOverdue(assignment.dueDate, submission);
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            const isUrgent = daysUntilDue <= 3 && daysUntilDue >= 0 && !submission;

            return (
              <Card 
                key={assignment.id}
                className={`card-hover animate-scale-in ${
                  overdue ? 'border-red-200 bg-red-50/50' : 
                  isUrgent ? 'border-orange-200 bg-orange-50/50' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Assignment Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {assignment.title}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            {status.status === "GRADED" && <CheckCircle className="h-3 w-3" />}
                            {status.status === "SUBMITTED" && <Clock className="h-3 w-3" />}
                            {status.status === "PENDING" && <AlertCircle className="h-3 w-3" />}
                            {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {assignment.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {assignment.class.title}
                        </span>
                        <span className={`flex items-center gap-1 ${overdue ? 'text-red-600 font-medium' : isUrgent ? 'text-orange-600 font-medium' : ''}`}>
                          <Calendar className="h-4 w-4" />
                          Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          Max Score: {assignment.maxScore}
                        </span>
                      </div>

                      {/* Submission Info */}
                      {submission && (
                        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Dikumpulkan:</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(submission.submittedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          {submission.score !== null && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Nilai:</span>
                                <span className="text-lg font-bold text-primary">
                                  {submission.score} / {assignment.maxScore}
                                </span>
                              </div>
                              {submission.feedback && (
                                <div className="pt-2 border-t border-border">
                                  <p className="text-sm font-medium mb-1">Feedback:</p>
                                  <p className="text-sm text-muted-foreground">
                                    {submission.feedback}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="lg:w-48 space-y-3">
                      {!submission ? (
                        <>
                          {overdue ? (
                            <div className="p-4 rounded-lg bg-red-100 border border-red-200 text-center">
                              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                              <p className="text-sm font-medium text-red-700">
                                Terlambat
                              </p>
                              <p className="text-xs text-red-600">
                                {Math.abs(daysUntilDue)} hari yang lalu
                              </p>
                            </div>
                          ) : isUrgent ? (
                            <div className="p-4 rounded-lg bg-orange-100 border border-orange-200 text-center">
                              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                              <p className="text-sm font-medium text-orange-700">
                                Segera!
                              </p>
                              <p className="text-xs text-orange-600">
                                {daysUntilDue === 0 ? 'Hari ini' : 
                                 daysUntilDue === 1 ? 'Besok' : 
                                 `${daysUntilDue} hari lagi`}
                              </p>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                              <p className="text-sm font-medium text-primary">
                                {daysUntilDue} hari lagi
                              </p>
                            </div>
                          )}
                          <Button className="w-full gap-2">
                            <Upload className="h-4 w-4" />
                            Kerjakan Tugas
                          </Button>
                        </>
                      ) : (
                        <>
                          {submission.status === "GRADED" && submission.score !== null && (
                            <div className="p-4 rounded-lg bg-green-100 border border-green-200 text-center">
                              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                              <p className="text-2xl font-bold text-green-700">
                                {submission.score}
                              </p>
                              <p className="text-xs text-green-600">
                                dari {assignment.maxScore}
                              </p>
                            </div>
                          )}
                          <Button variant="outline" className="w-full gap-2">
                            <Eye className="h-4 w-4" />
                            Lihat Detail
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum Ada Tugas
            </h3>
            <p className="text-muted-foreground mb-6">
              Belum ada tugas yang tersedia dari kelas Anda
            </p>
            <Link href="/student/classes">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Lihat Kelas Saya
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}