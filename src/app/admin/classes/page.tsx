// src/app/admin/classes/page.tsx - Update dengan approval management
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Search, 
  Filter,
  MoreVertical,
  Plus,
  Users,
  FileText,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { ApproveClassButton, RejectClassButton } from "@/components/admin/class-approval-buttons";

async function getClasses() {
  return await prisma.class.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
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

async function getClassStats() {
  const [total, approved, pending, rejected, active, draft, archived] = await Promise.all([
    prisma.class.count(),
    prisma.class.count({ where: { approvalStatus: "APPROVED" } }),
    prisma.class.count({ where: { approvalStatus: "PENDING" } }),
    prisma.class.count({ where: { approvalStatus: "REJECTED" } }),
    prisma.class.count({ where: { status: "ACTIVE" } }),
    prisma.class.count({ where: { status: "DRAFT" } }),
    prisma.class.count({ where: { status: "ARCHIVED" } }),
  ]);

  return { total, approved, pending, rejected, active, draft, archived };
}

export default async function AdminClassesPage() {
  await requireAdmin();
  const classes = await getClasses();
  const stats = await getClassStats();

  const getApprovalBadge = (approvalStatus: string) => {
    const badges = {
      PENDING: { label: "Menunggu Review", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
      APPROVED: { label: "Disetujui", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
      REJECTED: { label: "Ditolak", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
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
      ACTIVE: { label: "Aktif", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
      DRAFT: { label: "Draft", color: "bg-gray-100 text-gray-700 border-gray-200", icon: Edit },
      ARCHIVED: { label: "Arsip", color: "bg-gray-100 text-gray-700 border-gray-200", icon: BookOpen },
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Kelas</h1>
          <p className="text-muted-foreground">
            Manajemen dan persetujuan kelas di Hero Academy
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Kelas Baru
        </Button>
      </div>

      {/* Pending Approval Alert */}
      {stats.pending > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">
                  Ada {stats.pending} Kelas Menunggu Persetujuan
                </h4>
                <p className="text-sm text-yellow-700">
                  Silakan review dan setujui/tolak kelas yang diajukan guru.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Kelas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disetujui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Menunggu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ditolak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kelas Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Draft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Arsip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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

      {/* Classes List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kelas</CardTitle>
          <CardDescription>
            Semua kelas yang tersedia di Hero Academy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classes.map((cls, index) => {
              const isPending = cls.approvalStatus === "PENDING";
              const isApproved = cls.approvalStatus === "APPROVED";
              const isRejected = cls.approvalStatus === "REJECTED";

              return (
                <div
                  key={cls.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all animate-scale-in ${
                    isPending ? 'border-yellow-200 bg-yellow-50/30' :
                    isRejected ? 'border-red-200 bg-red-50/30' :
                    'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-medium text-foreground truncate">
                          {cls.title}
                        </h4>
                        {getApprovalBadge(cls.approvalStatus)}
                        {isApproved && getStatusBadge(cls.status)}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {cls.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Guru: {cls.teacher.name}
                        </span>
                        {isApproved && (
                          <>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {cls._count.enrollments} siswa
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {cls._count.contents} materi
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {cls._count.assignments} tugas
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isPending && (
                      <>
                        <ApproveClassButton classId={cls.id} />
                        <RejectClassButton classId={cls.id} />
                      </>
                    )}
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      Lihat
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    {!isPending && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}