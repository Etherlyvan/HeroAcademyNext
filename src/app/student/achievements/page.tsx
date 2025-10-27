// src/app/student/achievements/page.tsx
import { requireStudent } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Award, 
  Trophy,
  Star,
  Target,
  TrendingUp,
  BookOpen,
  FileText,
  CheckCircle,
  Zap,
  Crown,
  Medal,
  Flame
} from "lucide-react";

async function getStudentAchievements(studentId: string) {
  const [enrollments, submissions, heroAIResults] = await Promise.all([
    prisma.classEnrollment.count({
      where: { studentId },
    }),
    prisma.assignmentSubmission.findMany({
      where: { studentId },
      include: {
        assignment: true,
      },
    }),
    prisma.heroAIResult.count({
      where: { userId: studentId },
    }),
  ]);

  const completedAssignments = submissions.filter(s => s.status === "GRADED").length;
  const totalScore = submissions
    .filter(s => s.score !== null)
    .reduce((sum, s) => sum + (s.score || 0), 0);
  const averageScore = completedAssignments > 0 ? Math.round(totalScore / completedAssignments) : 0;
  const perfectScores = submissions.filter(
    s => s.score === s.assignment.maxScore
  ).length;

  return {
    enrollments,
    completedAssignments,
    totalSubmissions: submissions.length,
    averageScore,
    perfectScores,
    heroAIResults,
  };
}

export default async function StudentAchievementsPage() {
  await requireStudent();
  const session = await auth();
  const stats = await getStudentAchievements(session!.user.id);

  const achievements = [
    {
      id: 1,
      title: "First Step",
      description: "Menyelesaikan tugas pertama",
      icon: CheckCircle,
      unlocked: stats.completedAssignments >= 1,
      progress: Math.min(stats.completedAssignments, 1),
      total: 1,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      title: "Dedicated Learner",
      description: "Bergabung dengan 3 kelas",
      icon: BookOpen,
      unlocked: stats.enrollments >= 3,
      progress: Math.min(stats.enrollments, 3),
      total: 3,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Mendapat nilai sempurna",
      icon: Star,
      unlocked: stats.perfectScores >= 1,
      progress: Math.min(stats.perfectScores, 1),
      total: 1,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Assignment Master",
      description: "Menyelesaikan 10 tugas",
      icon: FileText,
      unlocked: stats.completedAssignments >= 10,
      progress: Math.min(stats.completedAssignments, 10),
      total: 10,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: 5,
      title: "Top Performer",
      description: "Rata-rata nilai di atas 85",
      icon: Trophy,
      unlocked: stats.averageScore >= 85,
      progress: Math.min(stats.averageScore, 85),
      total: 85,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: 6,
      title: "Self Discovery",
      description: "Menyelesaikan Hero AI",
      icon: Target,
      unlocked: stats.heroAIResults >= 1,
      progress: Math.min(stats.heroAIResults, 1),
      total: 1,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      id: 7,
      title: "Consistent",
      description: "Mengumpulkan 20 tugas",
      icon: Flame,
      unlocked: stats.totalSubmissions >= 20,
      progress: Math.min(stats.totalSubmissions, 20),
      total: 20,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: 8,
      title: "Excellence",
      description: "Mendapat 5 nilai sempurna",
      icon: Crown,
      unlocked: stats.perfectScores >= 5,
      progress: Math.min(stats.perfectScores, 5),
      total: 5,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pencapaian</h1>
        <p className="text-muted-foreground">
          Pantau progress dan pencapaian belajar Anda
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Progress Keseluruhan</CardTitle>
                <CardDescription className="text-base">
                  {unlockedCount} dari {totalAchievements} pencapaian terbuka
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">
                {Math.round((unlockedCount / totalAchievements) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Selesai</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Kelas Diikuti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enrollments}</div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Tugas Selesai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedAssignments}</div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Rata-rata Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.averageScore}</div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Star className="h-4 w-4" />
              Nilai Sempurna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.perfectScores}</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Semua Pencapaian</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card 
                key={achievement.id}
                className={`card-hover animate-scale-in ${
                  achievement.unlocked 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'opacity-60'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked 
                        ? achievement.bgColor 
                        : 'bg-muted'
                    }`}>
                      <Icon className={`h-7 w-7 ${
                        achievement.unlocked 
                          ? achievement.color 
                          : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {achievement.progress} / {achievement.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          achievement.unlocked 
                            ? 'bg-primary' 
                            : 'bg-muted-foreground'
                        }`}
                        style={{ 
                          width: `${(achievement.progress / achievement.total) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Motivational Card */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-8 text-center">
          <Zap className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Terus Semangat!</h3>
          <p className="text-primary-foreground/90 mb-4">
            Kamu sudah membuka {unlockedCount} pencapaian. 
            Tinggal {totalAchievements - unlockedCount} lagi untuk membuka semua!
          </p>
          <p className="text-sm text-primary-foreground/80">
            "Setiap pencapaian adalah langkah menuju kesuksesan yang lebih besar"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}