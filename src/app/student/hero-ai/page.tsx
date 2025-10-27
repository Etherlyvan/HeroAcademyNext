// src/app/student/hero-ai/page.tsx
import { requireStudent } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Play,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  Heart,
  BarChart3,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

async function getHeroAIResults(userId: string) {
  return await prisma.heroAIResult.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function StudentHeroAIPage() {
  await requireStudent();
  const session = await auth();
  const results = await getHeroAIResults(session!.user.id);
  const latestResult = results[0];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hero AI</h1>
          <p className="text-muted-foreground">
            Analisa potensi belajar dan rekomendasi personal untuk Anda
          </p>
        </div>
        <Link href="/hero-ai">
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            {latestResult ? 'Mulai Analisa Baru' : 'Mulai Hero AI'}
          </Button>
        </Link>
      </div>

      {latestResult ? (
        <>
          {/* Latest Result Summary */}
          <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Hasil Analisa Terakhir</CardTitle>
                    <CardDescription>
                      {new Date(latestResult.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Link href="/hero-ai">
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Ulang Analisa
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <CardTitle>Mission Statement</CardTitle>
              </div>
              <CardDescription>Pernyataan misi hidup Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-lg font-medium text-primary leading-relaxed">
                  {latestResult.missionStatement}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Style (VAK) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Gaya Belajar (VAK)</CardTitle>
              </div>
              <CardDescription>Cara terbaik Anda menyerap informasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(latestResult.learningStyle as any).map(([key, value]: [string, any]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">{key}</span>
                      <span className="text-sm text-muted-foreground">{value}%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Intelligence Type */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle>Kecerdasan Majemuk</CardTitle>
              </div>
              <CardDescription>Jenis kecerdasan dominan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(latestResult.intelligenceType as any).slice(0, 5).map(([key, value]: [string, any], index) => (
                  <div 
                    key={key}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground capitalize">{key}</p>
                      <p className="text-sm text-muted-foreground">Skor: {value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality (DISC) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Kepribadian DISC</CardTitle>
              </div>
              <CardDescription>Gaya komunikasi dan kerja Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(latestResult.personality as any).map(([key, value]: [string, any]) => {
                  const colors = {
                    D: 'bg-red-100 text-red-700 border-red-200',
                    I: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                    S: 'bg-green-100 text-green-700 border-green-200',
                    C: 'bg-blue-100 text-blue-700 border-blue-200',
                  };
                  return (
                    <div 
                      key={key}
                      className={`text-center p-6 rounded-lg border ${colors[key as keyof typeof colors]}`}
                    >
                      <div className="text-3xl font-bold mb-2">{key}</div>
                      <div className="text-2xl font-bold mb-1">{value}%</div>
                      <p className="text-xs">
                        {key === 'D' && 'Dominance'}
                        {key === 'I' && 'Influence'}
                        {key === 'S' && 'Steadiness'}
                        {key === 'C' && 'Compliance'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Career Path (RIASEC) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle>Rekomendasi Jurusan & Karier</CardTitle>
              </div>
              <CardDescription>Jalur karier yang cocok dengan minat Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(latestResult.careerPath as any).map(([key, value]: [string, any]) => (
                  <div 
                    key={key}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground capitalize">{key}</h4>
                      <span className="text-sm font-medium text-primary">{value.score}%</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {value.recommendations?.map((rec: string, idx: number) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hero Journey */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Hero Journey</CardTitle>
              </div>
              <CardDescription>Peta perjalanan pengembangan diri Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(latestResult.heroJourney as any).map(([key, value]: [string, any]) => (
                  <div 
                    key={key}
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <h4 className="font-semibold text-foreground capitalize mb-2">{key}</h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <CardTitle>Action Plan</CardTitle>
              </div>
              <CardDescription>Rencana aksi untuk mencapai tujuan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(latestResult.actionPlan as any).map(([key, value]: [string, any]) => (
                  <div 
                    key={key}
                    className="p-4 rounded-lg border border-border"
                  >
                    <h4 className="font-semibold text-foreground capitalize mb-2">{key}</h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* History */}
          {results.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Analisa</CardTitle>
                <CardDescription>
                  Semua hasil analisa Hero AI Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.slice(1).map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            Analisa Hero AI
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(result.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Lihat
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-gradient-to-br from-primary/10 via-background to-background">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Belum Ada Hasil Analisa
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mulai perjalanan mengenal diri Anda dengan Hero AI. Temukan gaya belajar, kecerdasan dominan, dan rekomendasi jurusan yang tepat untuk masa depan Anda.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Gaya Belajar</h4>
                <p className="text-sm text-muted-foreground">
                  Temukan cara belajar yang paling efektif
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Kecerdasan</h4>
                <p className="text-sm text-muted-foreground">
                  Kenali potensi kecerdasan Anda
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Rekomendasi</h4>
                <p className="text-sm text-muted-foreground">
                  Dapatkan saran jurusan & karier
                </p>
              </div>
            </div>
            <Link href="/hero-ai">
              <Button size="lg" className="gap-2 px-8 py-6 text-lg">
                <Sparkles className="h-5 w-5" />
                Mulai Hero AI Sekarang
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}