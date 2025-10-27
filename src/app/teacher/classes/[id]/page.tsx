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
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
            where: {
              status: "SUBMITTED",
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
  params: { id: string } 
}) {
  await requireTeacher();
  const session = await auth();
  const classData = await getClassDetail(params.id, session!.user.id);

  const getStatusBadge = (status: string) => {
    const badges = {
      ACTIVE: { label: "Aktif", color: "bg-green-100 text-green-700 border-green-200" },
      DRAFT: { label: "Draft", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      ARCHIVED: { label: "Arsip", color: "bg-gray-100 text-gray-700 border-gray-200" },
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <PlayCircle className="h-5 w-5" />;
      case "PDF":
      case "DOCUMENT":
        return <FileText className="h-5 w-5" />;
      case "PPT":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/teacher/classes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>

      {/* Class Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{classData.title}</CardTitle>
                {getStatusBadge(classData.status)}
              </div>
              <CardDescription className="text-base">
                {classData.description}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Link href={`/teacher/classes/${classData.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Kelas
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Pengaturan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Siswa</span>
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
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link href={`/teacher/classes/${classData.id}/students`}>
          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Kelola Siswa</h3>
              <p className="text-sm text-muted-foreground">
                {classData.enrollments.length} siswa
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/teacher/classes/${classData.id}/contents`}>
          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
              <h3 className="font-semibold">Kelola Materi</h3>
              <p className="text-sm text-muted-foreground">
                {classData.contents.length} materi
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/teacher/classes/${classData.id}/assignments`}>
          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-accent-foreground mx-auto mb-2" />
              <h3 className="font-semibold">Kelola Tugas</h3>
              <p className="text-sm text-muted-foreground">
                {classData.assignments.length} tugas
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="card-hover cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">Diskusi Kelas</h3>
            <p className="text-sm text-muted-foreground">
              Segera hadir
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Students List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Siswa</CardTitle>
                <CardDescription>
                  {classData.enrollments.length} siswa terdaftar
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah
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
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {enrollment.student.name || "Unnamed Student"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {enrollment.student.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  Belum ada siswa yang mendaftar
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contents List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Materi Pembelajaran</CardTitle>
                <CardDescription>
                  {classData.contents.length} materi tersedia
                </CardDescription>
              </div>
              <Link href={`/teacher/classes/${classData.id}/contents/new`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah
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
                        <p className="font-medium text-sm truncate">
                          {content.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {content.contentType}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
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
              <CardTitle>Daftar Tugas</CardTitle>
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
                const pendingSubmissions = assignment.submissions.length;
                return (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {assignment.title}
                        </h4>
                        {pendingSubmissions > 0 && (
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                            {pendingSubmissions} perlu dinilai
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {assignment._count.submissions} pengumpulan
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Lihat
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
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