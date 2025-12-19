// src/app/teacher/assignments/[id]/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ArrowLeft,
  Calendar,
  Award,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Edit,
  Mail,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getAssignmentDetail(assignmentId: string, teacherId: string) {
  const assignment = await prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      teacherId,
    },
    include: {
      class: {
        select: {
          id: true,
          title: true,
        },
      },
      submissions: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: {
          submittedAt: 'desc',
        },
      },
    },
  });

  if (!assignment) {
    notFound();
  }

  return assignment;
}

export default async function AssignmentDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  await requireTeacher();
  const session = await auth();
  const assignment = await getAssignmentDetail(params.id, session!.user.id);

  const getSubmissionStatusBadge = (status: string) => {
    const badges = {
      PENDING: { label: "Belum Dikerjakan", color: "bg-gray-100 text-gray-700 border-gray-200", icon: Clock },
      SUBMITTED: { label: "Dikumpulkan", color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle },
      GRADED: { label: "Sudah Dinilai", color: "bg-green-100 text-green-700 border-green-200", icon: Award },
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.label}
      </span>
    );
  };

  const submissionStats = {
    total: assignment.submissions.length,
    submitted: assignment.submissions.filter(s => s.status === "SUBMITTED").length,
    graded: assignment.submissions.filter(s => s.status === "GRADED").length,
    pending: assignment.submissions.filter(s => s.status === "PENDING").length,
  };

  const isOverdue = new Date(assignment.dueDate) < new Date();

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/teacher/assignments">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Tugas
          </Button>
        </Link>
      </div>

      {/* Assignment Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                {isOverdue && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                    <AlertCircle className="h-3 w-3" />
                    Overdue
                  </span>
                )}
              </div>
              <CardDescription className="text-base mb-4">
                {assignment.description}
              </CardDescription>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Kelas: {assignment.class.title}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Max Score: {assignment.maxScore}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/teacher/assignments/${assignment.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Tugas
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistik
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Submission Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Siswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissionStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dikumpulkan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{submissionStats.submitted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sudah Dinilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{submissionStats.graded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Belum Dikerjakan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{submissionStats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengumpulan</CardTitle>
          <CardDescription>
            Kelola pengumpulan tugas dari siswa
          </CardDescription>
        </CardHeader>
        <CardContent>
          {assignment.submissions.length > 0 ? (
            <div className="space-y-4">
              {assignment.submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {submission.student.image ? (
                      <Image
                        src={submission.student.image}
                        alt={submission.student.name || "Student"}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {submission.student.name || "Unnamed Student"}
                        </h4>
                        {getSubmissionStatusBadge(submission.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {submission.student.email}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Dikumpulkan: {new Date(submission.submittedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {submission.score !== null && (
                          <span className="flex items-center gap-1 font-medium text-primary">
                            <Award className="h-3 w-3" />
                            Nilai: {submission.score}/{assignment.maxScore}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {submission.fileUrl && (
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    )}
                    <Link href={`/teacher/assignments/${assignment.id}/submissions/${submission.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                        {submission.status === "GRADED" ? "Lihat" : "Nilai"}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Belum Ada Pengumpulan
              </h3>
              <p className="text-muted-foreground">
                Siswa belum mengumpulkan tugas ini
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}