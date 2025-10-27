// src/app/admin/hero-ai/page.tsx
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  CheckCircle,
  XCircle
} from "lucide-react";

async function getHeroAIStats() {
  const [totalQuestions, totalResults, activeQuestions, categories] = await Promise.all([
    prisma.heroAIQuestion.count(),
    prisma.heroAIResult.count(),
    prisma.heroAIQuestion.count({ where: { isActive: true } }),
    prisma.heroAIQuestion.groupBy({
      by: ['category'],
      _count: true,
    }),
  ]);

  return { totalQuestions, totalResults, activeQuestions, categories };
}

async function getQuestions() {
  return await prisma.heroAIQuestion.findMany({
    orderBy: [
      { category: 'asc' },
      { order: 'asc' },
    ],
  });
}

async function getRecentResults() {
  return await prisma.heroAIResult.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
}

export default async function AdminHeroAIPage() {
  await requireAdmin();
  const stats = await getHeroAIStats();
  const questions = await getQuestions();
  const recentResults = await getRecentResults();

  const categoryLabels: Record<string, string> = {
    mission: "Nilai & Misi",
    vak: "Gaya Belajar (VAK)",
    intelligence: "Kecerdasan Majemuk",
    disc: "Kepribadian DISC",
    riasec: "Penjurusan RIASEC",
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Kelola Hero AI</h1>
          <p className="text-muted-foreground">
            Manajemen pertanyaan dan hasil analisa Hero AI
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Pertanyaan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pertanyaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pertanyaan Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeQuestions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Analisa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalResults}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kategori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Pertanyaan per Kategori</CardTitle>
          <CardDescription>Jumlah pertanyaan di setiap kategori</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.categories.map((cat) => (
              <div key={cat.category} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{categoryLabels[cat.category] || cat.category}</span>
                  <span className="text-2xl font-bold text-primary">{cat._count}</span>
                </div>
                <div className="text-sm text-muted-foreground">pertanyaan</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Pertanyaan</CardTitle>
              <CardDescription>Kelola pertanyaan Hero AI</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {categoryLabels[question.category] || question.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Urutan: {question.order}
                    </span>
                    {question.isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        <XCircle className="h-3 w-3" />
                        Nonaktif
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {question.question}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hasil Analisa Terbaru</CardTitle>
              <CardDescription>10 analisa Hero AI terbaru</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Lihat Statistik
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {result.user.name || result.user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(result.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Lihat Detail
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}