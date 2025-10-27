// src/app/admin/dashboard/page.tsx
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  FileText,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";

async function getStats() {
  const [
    totalUsers,
    totalClasses,
    totalStudents,
    totalTeachers,
    totalAssignments,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.class.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TEACHER" } }),
    prisma.assignment.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalUsers,
    totalClasses,
    totalStudents,
    totalTeachers,
    totalAssignments,
    recentUsers,
  };
}

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await getStats();

  const statCards = [
    {
        title: "Total User",
        value: stats.totalUsers,
        icon: Users,
        description: "Semua pengguna terdaftar",
        color: "text-red-600",           // Merah
        bgColor: "bg-red-50",
        trend: "+12%",
        trendUp: true,
    },
    {
        title: "Total Kelas",
        value: stats.totalClasses,
        icon: BookOpen,
        description: "Kelas yang tersedia",
        color: "text-green-600",
        bgColor: "bg-green-50",
        trend: "+8%",
        trendUp: true,
    },
    {
        title: "Siswa Aktif",
        value: stats.totalStudents,
        icon: GraduationCap,
        description: "Siswa terdaftar",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        trend: "+15%",
        trendUp: true,
    },
    {
        title: "Guru",
        value: stats.totalTeachers,
        icon: Users,
        description: "Guru terdaftar",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        trend: "+5%",
        trendUp: true,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Selamat datang di panel administrasi Hero Academy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="card-hover animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">{stat.description}</span>
                <span className={`ml-2 flex items-center ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              User Terbaru
            </CardTitle>
            <CardDescription>5 pengguna yang baru mendaftar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                      user.role === 'TEACHER' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {user.role === 'ADMIN' ? 'Admin' :
                       user.role === 'TEACHER' ? 'Guru' : 'Siswa'}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(user.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Aksi cepat untuk admin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left group">
                <Users className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-sm">Tambah User</p>
                <p className="text-xs text-muted-foreground">Buat user baru</p>
              </button>
              <button className="p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-left group">
                <BookOpen className="h-6 w-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-sm">Buat Kelas</p>
                <p className="text-xs text-muted-foreground">Kelas baru</p>
              </button>
              <button className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left group">
                <FileText className="h-6 w-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-sm">Hero AI</p>
                <p className="text-xs text-muted-foreground">Kelola soal</p>
              </button>
              <button className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left group">
                <Activity className="h-6 w-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-sm">Laporan</p>
                <p className="text-xs text-muted-foreground">Lihat statistik</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}