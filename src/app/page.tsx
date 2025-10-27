// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Users,
  Target,
  MessageCircle,
  BarChart3,
  Lightbulb,
  Star,
  ChevronRight,
  Play,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  GraduationCap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Platform Pembelajaran AI Terdepan</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Temukan Potensimu Bersama{" "}
                  <span className="gradient-text">Hero Academy</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Platform pembelajaran berbasis AI yang membantu siswa mengenal potensi diri, belajar efektif, dan mempersiapkan masa depan gemilang.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/hero-ai">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg group">
                    <Brain className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Mulai Hero AI Gratis
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">10,000+</span> siswa bergabung
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <Card className="glass-effect shadow-2xl">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center animate-pulse">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Hero AI Assistant</h3>
                      <p className="text-sm text-primary flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Online & Siap Membantu
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 animate-slide-in-left">
                    <p className="text-sm">
                      👋 Halo! Saya Hero AI. Mari kita analisa potensi belajar kamu! Ceritakan tentang gaya belajar yang kamu sukai.
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 ml-8 animate-slide-in-right animation-delay-200">
                    <p className="text-sm">
                      Saya lebih suka belajar dengan visual dan praktek langsung 📚
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 animate-slide-in-left animation-delay-400">
                    <p className="text-sm">
                      Perfect! Kamu adalah tipe <span className="font-semibold text-primary">Visual-Kinesthetic learner</span>. Saya rekomendasikan kelas AI & Robotik untuk kamu! 🚀
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Fitur Unggulan</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Kenapa Memilih Hero Academy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Platform pembelajaran yang menggabungkan teknologi AI dengan pendekatan edukatif untuk hasil maksimal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Analisa mendalam dengan teknologi AI untuk memahami gaya belajar dan potensi unik Anda",
                color: "from-red-500 to-orange-500",
                delay: "0",
              },
              {
                icon: Target,
                title: "Personalisasi Maksimal",
                description: "Rekomendasi belajar yang disesuaikan dengan profil, minat, dan tujuan karir Anda",
                color: "from-purple-500 to-pink-500",
                delay: "100",
              },
              {
                icon: Users,
                title: "Guru Berpengalaman",
                description: "Belajar dari praktisi dan akademisi terbaik di bidangnya",
                color: "from-orange-500 to-red-500",
                delay: "200",
              },
              {
                icon: BookOpen,
                title: "Materi Berkualitas",
                description: "Konten pembelajaran yang terstruktur, up-to-date, dan mudah dipahami",
                color: "from-green-500 to-emerald-500",
                delay: "300",
              },
              {
                icon: Shield,
                title: "Data Aman",
                description: "Keamanan dan privasi data Anda adalah prioritas utama kami",
                color: "from-indigo-500 to-blue-500",
                delay: "400",
              },
              {
                icon: Globe,
                title: "Akses Fleksibel",
                description: "Belajar kapan saja, di mana saja, dari perangkat apa saja",
                color: "from-pink-500 to-rose-500",
                delay: "500",
              },
            ].map((feature, index) => (
              <Card 
                key={index}
                className="card-hover group animate-scale-in"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <CardHeader>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hero AI Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Kenali Dirimu Lewat Hero AI
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Asisten pintar berbasis AI yang membantu menganalisa karakter dan potensi dengan teknologi terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Analisa SWOT Pribadi",
                description: "Temukan kekuatan, kelemahan, peluang, dan tantangan dalam belajar",
              },
              {
                icon: Brain,
                title: "Gaya Belajar VAK",
                description: "Identifikasi metode belajar yang paling efektif untuk kamu",
              },
              {
                icon: BarChart3,
                title: "Kecerdasan Majemuk",
                description: "Kenali 8 jenis kecerdasan dan potensi terbaikmu",
              },
              {
                icon: Lightbulb,
                title: "Rekomendasi Jurusan",
                description: "Saran jurusan dan universitas sesuai minat dan bakat",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-primary-foreground/10 backdrop-blur-md border-primary-foreground/20 hover:bg-primary-foreground/15 hover:border-primary-foreground/40 transition-all group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-primary-foreground text-lg">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up animation-delay-400">
            <Link href="/hero-ai">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-shadow">
                <MessageCircle className="w-5 h-5 mr-2" />
                Coba Hero AI Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-primary-foreground/80 mt-4 text-sm">
              ✨ Gratis tanpa perlu login • 100% Aman & Privat
            </p>
          </div>
        </div>
      </section>

      {/* Kelas Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Belajar dengan Mentor Terbaik
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kelas online interaktif dari guru dan praktisi AI terpilih dengan kurikulum yang disesuaikan dengan kebutuhan masa depan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:border-primary">
                <CardHeader>
                  <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <BookOpen className="w-16 h-16 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Masa Depan Pendidikan</CardTitle>
                  <CardDescription>
                    Bagaimana masa depan pendidikan akan berubah dengan teknologi AI?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      Dr. Rekyan & Drs. Suryanto
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      12 minggu • 3x seminggu
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      4.9 (127 reviews)
                    </div>
                  </div>
                  <Button className="w-full">
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/kelas">
              <Button size="lg" variant="outline" className="px-8 py-4">
                Lihat Semua Kelas
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Try Out Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold">
                  Uji Kemampuanmu Lewat Try Out Hero
                </h2>
                <p className="text-xl text-gray-300">
                  Simulasi ujian UTBK dan diagnostik gaya belajar dengan analisa otomatis dari AI untuk membantu kamu mempersiapkan diri dengan lebih baik.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span>Simulasi UTBK dengan soal terbaru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-green-400" />
                  </div>
                  <span>Analisa mendalam hasil ujian</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>Tracking progress belajar</span>
                </div>
              </div>

              <Link href="/try-out">
                <Button size="lg" className="px-8 py-4 text-lg bg-primary hover:bg-primary/90">
                  <Target className="w-5 h-5 mr-2" />
                  Ikuti Try Out Gratis
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-center">Dashboard Hasil Try Out</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">85</div>
                      <div className="text-sm text-blue-700">Skor TPS</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">78</div>
                      <div className="text-sm text-green-700">Skor TKA</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Matematika</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-20 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-red-600">83%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bahasa Indonesia</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-18 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-orange-600">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bahasa Inggris</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-22 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-emerald-600">92%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-start space-x-3">
                      <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-indigo-700">AI Insight</div>
                        <div className="text-sm text-muted-foreground">
                          Kamu unggul di Bahasa Inggris! Fokus latihan di Matematika untuk hasil yang lebih optimal.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              AI yang Tumbuh Bersama Kamu
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Hero Academy akan terus mengembangkan fitur AI yang mampu memadukan analisa diri dan materi pelajaran sekolah. Teknologi pembelajaran adaptif yang berkembang seiring dengan progress belajar kamu.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-primary/5 backdrop-blur-md rounded-xl p-6 border border-primary/20">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Personalisasi Cerdas
                </h3>
                <p className="text-muted-foreground">
                  AI yang memahami gaya belajar dan menyesuaikan materi secara real-time
                </p>
              </div>

              <div className="bg-primary/5 backdrop-blur-md rounded-xl p-6 border border-primary/20">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Adaptive Learning
                </h3>
                <p className="text-muted-foreground">
                  Sistem yang berkembang dan beradaptasi dengan kemajuan belajar kamu
                </p>
              </div>

              <div className="bg-primary/5 backdrop-blur-md rounded-xl p-6 border border-primary/20">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Future Ready
                </h3>
                <p className="text-muted-foreground">
                  Mempersiapkan kamu dengan keterampilan yang dibutuhkan masa depan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Siap Memulai Perjalanan Belajar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Bergabunglah dengan ribuan siswa yang sudah menemukan potensi terbaik mereka
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-shadow">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Daftar Gratis Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/hero-ai">
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Coba Hero AI Dulu
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              🎉 Gratis selamanya untuk fitur dasar • Tidak perlu kartu kredit
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}