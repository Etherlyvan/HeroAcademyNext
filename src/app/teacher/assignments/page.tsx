// src/app/teacher/assignments/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Filter,
  Plus,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Eye,
  Edit,
  BarChart3
} from "lucide-react";
import Link from "next/link";

async function getTeacherAssignments(teacherId: string) {
  return await prisma.assignment.findMany({
    where: { teacherId },
    orderBy: { createdAt: "desc" },
    include: {
      class: {
        select: {
          id: true,
          title: true,
          status: true,
        },
      },
      _count: {
        select: {
          submissions: true,
        },
      },
      submissions: {
        select: {
          status: true,
        },
      },
    },
  });
}

async function getAssignmentStats(teacherId: string) {
  const assignments = await prisma.assignment.findMany({
    where: { teacherId },
    include: {
      submissions: true,
    },
  });

  const total = assignments.length;
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submissions.length, 0);
  const pendingGrading = assignments.reduce(
    (sum, a) => sum + a.submissions.filter(s => s.status === "SUBMITTED").length, 
    0
  );
  const graded = assignments.reduce(
    (sum, a) => sum + a.submissions.filter(s => s.status === "GRADED").length, 
    0
  );

  return { total, totalSubmissions, pendingGrading, graded };
}

export default async function TeacherAssignmentsPage() {
  await requireTeacher();
  const session = await auth();
  const assignments = await getTeacherAssignments(session!.user.id);
  const stats = await getAssignmentStats(session!.user.id);

  const getSubmissionStats = (assignment: any) => {
    const total = assignment._count.submissions;
    const submitted = assignment.submissions.filter((s: any) => s.status === "SUBMITTED").length;
    const graded = assignment.submissions.filter((s: any) => s.status === "GRADED").length;
    const pending = assignment.submissions.filter((s: any) => s.status === "PENDING").length;

    return { total, submitted, graded, pending };
  };

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tugas</h1>
          <p className="text-muted-foreground">
            Kelola tugas dan penilaian siswa
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Buat Tugas Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tugas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Tugas dibuat</p>
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
              Perlu Dinilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingGrading}</div>
            <p className="text-xs text-muted-foreground mt-1">Menunggu penilaian</p>
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
            const submissionStats = getSubmissionStats(assignment);
            const overdue = isOverdue(assignment.dueDate);
            const daysUntilDue = Math.ceil(
              (new Date(assignment.dueDate).getTime() - new Date().getTime()) / 
              (1000 * 60 * 60 * 24)
            );

            return (
              <Card 
                key={assignment.id}
                className="card-hover animate-scale-in"
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
                          {overdue && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                              <AlertCircle className="h-3 w-3" />
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {assignment.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {assignment.class.title}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          Max Score: {assignment.maxScore}
                        </span>
                      </div>

                      {/* Submission Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress Pengumpulan</span>
                          <span className="font-medium">
                            {submissionStats.total} / {submissionStats.total} siswa
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ 
                              width: submissionStats.total > 0 
                                ? `${(submissionStats.total / submissionStats.total) * 100}%` 
                                : '0%' 
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Stats & Actions */}
                    <div className="lg:w-64 space-y-4">
                      {/* Submission Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                          <div className="text-lg font-bold text-yellow-700">
                            {submissionStats.submitted}
                          </div>
                          <div className="text-xs text-yellow-600">Dikumpulkan</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-orange-50 border border-orange-200">
                          <div className="text-lg font-bold text-orange-700">
                            {submissionStats.pending}
                          </div>
                          <div className="text-xs text-orange-600">Pending</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                          <div className="text-lg font-bold text-green-700">
                            {submissionStats.graded}
                          </div>
                          <div className="text-xs text-green-600">Dinilai</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button className="w-full gap-2" size="sm">
                          <CheckCircle className="h-4 w-4" />
                          Periksa Tugas ({submissionStats.submitted})
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-3 w-3" />
                            Detail
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </div>
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
              Mulai dengan membuat tugas pertama untuk siswa Anda
            </p>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Buat Tugas Pertama
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}