// src/app/teacher/classes/[id]/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Upload,
  ArrowLeft,
  CheckCircle,
  Clock,
  PlayCircle,
  Download,
  Mail,
  MessageCircle,
  Calendar,
  Award,
  BarChart3,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getClassDetail(classId: string, teacherId: string) {
  const classData = await prisma.class.findFirst({
    where: {
      id: classId,
      teacherId,
    },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      enrollments: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          enrolledAt: 'desc',
        },
      },
      contents: {
        orderBy: {
          order: 'asc',
        },
      },
      assignments: {
        include: {
          _count: {
            select: {
              submissions: true,
            },
          },
          submissions: {
            include: {
              student: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!classData) {
    notFound();
  }

  return classData;
}

export default async function ClassDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  await requireTeacher();
  const session = await auth();
  const { id } = await params;
  const classData = await getClassDetail(id, session!.user.id);

  const getStatusBadge = (status: string) => {
    const badges = {
      ACTIVE: { label: "Aktif", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
      DRAFT: { label: "Draft", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Edit },
      ARCHIVED: { label: "Arsip", color: "bg-gray-100 text-gray-700 border-gray-200", icon: BookOpen },
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        <Icon className="h-4 w-4" />
        {badge.label}
      </span>
    );
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <PlayCircle className="h-5 w-5 text-red-600" />;
      case "PDF":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "PPT":
        return <FileText className="h-5 w-5 text-orange-600" />;
      case "DOCUMENT":
        return <FileText className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getSubmissionStats = (assignment: any) => {
    const total = assignment._count.submissions;
    const submitted = assignment.submissions.filter((s: any) => s.status === "SUBMITTED").length;
    const graded = assignment.submissions.filter((s: any) => s.status === "GRADED").length;
    const pending = total - submitted - graded;

    return { total, submitted, graded, pending };
  };

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/teacher/classes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Kelas
          </Button>
        </Link>
      </div>

      {/* Class Info */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{classData.title}</CardTitle>
                {getStatusBadge(classData.status)}
              </div>
              <CardDescription className="text-base">
                {classData.description}
              </CardDescription>
            </div>
            {classData.thumbnail && (
              <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden">
                <img 
                  src={classData.thumbnail} 
                  alt={classData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Siswa Terdaftar</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {classData.enrollments.length}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-secondary-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Materi</span>
              </div>
              <div className="text-2xl font-bold text-secondary-foreground">
                {classData.contents.length}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-accent-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Tugas</span>
              </div>
              <div className="text-2xl font-bold text-accent-foreground">
                {classData.assignments.length}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href={`/teacher/classes/${classData.id}/edit`}>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Kelas
              </Button>
            </Link>
            <Link href={`/teacher/classes/${classData.id}/contents`}>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Kelola Materi
              </Button>
            </Link>
            <Link href={`/teacher/classes/${classData.id}/assignments/new`}>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Buat Tugas Baru
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Students List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Daftar Siswa
                </CardTitle>
                <CardDescription>
                  {classData.enrollments.length} siswa terdaftar
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Undang Siswa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {classData.enrollments.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {classData.enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {enrollment.student.image ? (
                        <Image
                          src={enrollment.student.image}
                          alt={enrollment.student.name || "Student"}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-primary/20"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {enrollment.student.name || "Unnamed Student"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {enrollment.student.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Bergabung: {new Date(enrollment.enrolledAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/teacher/students/${enrollment.student.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
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
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">
                  Belum ada siswa yang mendaftar
                </p>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Undang Siswa
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contents List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Materi Pembelajaran
                </CardTitle>
                <CardDescription>
                  {classData.contents.length} materi tersedia
                </CardDescription>
              </div>
              <Link href={`/teacher/classes/${classData.id}/contents/new`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Materi
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {classData.contents.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {classData.contents.map((content, index) => (
                  <div
                    key={content.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        {getContentTypeIcon(content.contentType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">
                            {content.title}
                          </p>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            #{content.order}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {content.description}
                        </p>
                        <span className="text-xs text-primary">
                          {content.contentType}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">
                  Belum ada materi pembelajaran
                </p>
                <Link href={`/teacher/classes/${classData.id}/contents/new`}>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Materi Pertama
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Daftar Tugas
              </CardTitle>
              <CardDescription>
                {classData.assignments.length} tugas telah dibuat
              </CardDescription>
            </div>
            <Link href={`/teacher/classes/${classData.id}/assignments/new`}>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Buat Tugas Baru
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {classData.assignments.length > 0 ? (
            <div className="space-y-4">
              {classData.assignments.map((assignment) => {
                const stats = getSubmissionStats(assignment);
                const overdue = isOverdue(assignment.dueDate);
                const daysUntilDue = Math.ceil(
                  (new Date(assignment.dueDate).getTime() - new Date().getTime()) / 
                  (1000 * 60 * 60 * 24)
                );

                return (
                  <div
                    key={assignment.id}
                    className={`p-4 rounded-lg border transition-all ${
                      overdue ? 'border-red-200 bg-red-50/30' : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Assignment Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">
                            {assignment.title}
                          </h4>
                          {overdue && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                              <AlertCircle className="h-3 w-3" />
                              Terlambat
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {assignment.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Max Score: {assignment.maxScore}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {stats.total} pengumpulan
                          </span>
                        </div>
                      </div>

                      {/* Submission Stats */}
                      <div className="lg:w-80 space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                            <div className="text-lg font-bold text-yellow-700">
                              {stats.submitted}
                            </div>
                            <div className="text-xs text-yellow-600">Dikumpulkan</div>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-orange-50 border border-orange-200">
                            <div className="text-lg font-bold text-orange-700">
                              {stats.pending}
                            </div>
                            <div className="text-xs text-orange-600">Belum</div>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-green-50 border border-green-200">
                            <div className="text-lg font-bold text-green-700">
                              {stats.graded}
                            </div>
                            <div className="text-xs text-green-600">Dinilai</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/teacher/assignments/${assignment.id}`} className="flex-1">
                            <Button size="sm" className="w-full gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Periksa ({stats.submitted})
                            </Button>
                          </Link>
                          <Link href={`/teacher/assignments/${assignment.id}/edit`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Belum Ada Tugas
              </h3>
              <p className="text-muted-foreground mb-6">
                Mulai dengan membuat tugas pertama untuk siswa
              </p>
              <Link href={`/teacher/classes/${classData.id}/assignments/new`}>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Buat Tugas Pertama
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}