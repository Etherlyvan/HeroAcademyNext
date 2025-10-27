// src/app/teacher/classes/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Search, 
  Filter,
  Plus,
  Users,
  FileText,
  Eye,
  Edit,
  Settings,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Trash2,
  Archive,
  PlayCircle
} from "lucide-react";
import Link from "next/link";
import { DeleteClassButton, ArchiveClassButton } from "@/components/teacher/class-action-buttons";

async function getTeacherClasses(teacherId: string) {
  return await prisma.class.findMany({
    where: { teacherId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          enrollments: true,
          contents: true,
          assignments: true,
        },
      },
    },
  });
}

async function getClassStats(teacherId: string) {
  const [total, approved, pending, rejected, active, draft, archived, totalStudents, totalAssignments] = await Promise.all([
    prisma.class.count({ where: { teacherId } }),
    prisma.class.count({ where: { teacherId, approvalStatus: "APPROVED" } }),
    prisma.class.count({ where: { teacherId, approvalStatus: "PENDING" } }),
    prisma.class.count({ where: { teacherId, approvalStatus: "REJECTED" } }),
    prisma.class.count({ where: { teacherId, status: "ACTIVE" } }),
    prisma.class.count({ where: { teacherId, status: "DRAFT" } }),
    prisma.class.count({ where: { teacherId, status: "ARCHIVED" } }),
    prisma.classEnrollment.count({
      where: { class: { teacherId } },
    }),
    prisma.assignment.count({ where: { teacherId } }),
  ]);

  return { total, approved, pending, rejected, active, draft, archived, totalStudents, totalAssignments };
}

export default async function TeacherClassesPage() {
  await requireTeacher();
  const session = await auth();
  const classes = await getTeacherClasses(session!.user.id);
  const stats = await getClassStats(session!.user.id);

  const getApprovalBadge = (approvalStatus: string) => {
    const badges = {
      PENDING: { 
        label: "Menunggu Review", 
        color: "bg-yellow-100 text-yellow-700 border-yellow-200", 
        icon: Clock 
      },
      APPROVED: { 
        label: "Disetujui", 
        color: "bg-green-100 text-green-700 border-green-200", 
        icon: CheckCircle 
      },
      REJECTED: { 
        label: "Ditolak", 
        color: "bg-red-100 text-red-700 border-red-200", 
        icon: XCircle 
      },
    };
    const badge = badges[approvalStatus as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      ACTIVE: { label: "Aktif", color: "bg-green-100 text-green-700 border-green-200", icon: PlayCircle },
      DRAFT: { label: "Draft", color: "bg-gray-100 text-gray-700 border-gray-200", icon: Edit },
      ARCHIVED: { label: "Arsip", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Archive },
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

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Kelas Saya</h1>
          <p className="text-muted-foreground">
            Kelola kelas yang Anda ajar
          </p>
        </div>
        <Link href="/teacher/classes/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajukan Kelas Baru
          </Button>
        </Link>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Informasi Persetujuan Kelas
              </h4>
              <p className="text-sm text-blue-700">
                Setiap kelas baru yang Anda buat harus disetujui oleh admin terlebih dahulu. 
                Anda dapat mengelola kelas setelah mendapat persetujuan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Kelas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Semua kelas</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disetujui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground mt-1">Kelas disetujui</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Menunggu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Perlu review</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Siswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Siswa terdaftar</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tugas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalAssignments}</div>
            <p className="text-xs text-muted-foreground mt-1">Tugas dibuat</p>
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
      {classes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls, index) => {
            const isApproved = cls.approvalStatus === "APPROVED";
            const isPending = cls.approvalStatus === "PENDING";
            const isRejected = cls.approvalStatus === "REJECTED";

            return (
              <Card 
                key={cls.id} 
                className={`card-hover animate-scale-in ${
                  isRejected ? 'border-red-200 bg-red-50/30' : 
                  isPending ? 'border-yellow-200 bg-yellow-50/30' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {cls.thumbnail ? (
                      <img 
                        src={cls.thumbnail} 
                        alt={cls.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="line-clamp-2 min-h-[3.5rem] text-lg">
                      {cls.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getApprovalBadge(cls.approvalStatus)}
                    {isApproved && getStatusBadge(cls.status)}
                  </div>
                  <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                    {cls.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    {isApproved && (
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-center gap-1 text-primary mb-1">
                            <Users className="h-3 w-3" />
                            <span className="text-sm font-bold">{cls._count.enrollments}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Siswa</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-center gap-1 text-secondary-foreground mb-1">
                            <BookOpen className="h-3 w-3" />
                            <span className="text-sm font-bold">{cls._count.contents}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Materi</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-center gap-1 text-accent-foreground mb-1">
                            <FileText className="h-3 w-3" />
                            <span className="text-sm font-bold">{cls._count.assignments}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Tugas</p>
                        </div>
                      </div>
                    )}

                    {/* Status Messages */}
                    {isPending && (
                      <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <p className="text-xs text-yellow-700 text-center">
                          Kelas Anda sedang dalam proses review oleh admin
                        </p>
                      </div>
                    )}

                    {isRejected && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-xs text-red-700 text-center">
                          Kelas ditolak. Silakan revisi dan ajukan kembali
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {isApproved ? (
                        <>
                          <Link href={`/teacher/classes/${cls.id}`}>
                            <Button className="w-full gap-2" size="sm">
                              <Settings className="h-4 w-4" />
                              Kelola Kelas
                            </Button>
                          </Link>
                          <div className="grid grid-cols-3 gap-2">
                            <Link href={`/teacher/classes/${cls.id}/edit`}>
                              <Button variant="outline" size="sm" className="gap-1 w-full">
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                            </Link>
                            <ArchiveClassButton classId={cls.id} currentStatus={cls.status} />
                            <DeleteClassButton classId={cls.id} />
                          </div>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" className="w-full gap-2" disabled>
                            <Clock className="h-4 w-4" />
                            {isPending ? "Menunggu Persetujuan" : "Tidak Dapat Dikelola"}
                          </Button>
                          {isRejected && (
                            <Link href={`/teacher/classes/${cls.id}/edit`}>
                              <Button variant="outline" size="sm" className="gap-1 w-full">
                                <Edit className="h-3 w-3" />
                                Revisi Kelas
                              </Button>
                            </Link>
                          )}
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
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum Ada Kelas
            </h3>
            <p className="text-muted-foreground mb-6">
              Ajukan kelas pertama Anda untuk mulai mengajar
            </p>
            <Link href="/teacher/classes/new">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Ajukan Kelas Pertama
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}