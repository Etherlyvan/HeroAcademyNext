import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Construction,
  Clock,
  Bell,
  CheckCircle,
  Users,
  BookOpen,
  Brain,
  Zap,
  ArrowLeft,
} from "lucide-react";

export default function Kelas() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Construction className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kelas Online Hero Academy
          </h1>

          <div className="inline-flex items-center bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">Segera Hadir</span>
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Kami sedang mempersiapkan pengalaman belajar online yang luar biasa untuk Anda. Kelas-kelas berkualitas tinggi dengan mentor terbaik akan segera tersedia!
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Kelas AI & Robotik</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pelajari teknologi AI dan robotik dengan praktek langsung dari para ahli
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">Persiapan UTBK</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Strategi jitu dan latihan intensif untuk menghadapi UTBK dengan percaya diri
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-lg">Literasi Digital</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Kuasai keterampilan digital essential untuk era modern dan masa depan
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* What's Coming */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Apa yang Sedang Kami Persiapkan?</CardTitle>
            <CardDescription className="text-lg">
              Fitur-fitur canggih yang akan membuat pengalaman belajar Anda lebih efektif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Kelas Interaktif Live</h4>
                    <p className="text-sm text-muted-foreground">
                      Belajar langsung dengan mentor dan berinteraksi real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Materi Terintegrasi AI</h4>
                    <p className="text-sm text-muted-foreground">
                      Konten pembelajaran yang dipersonalisasi sesuai gaya belajar
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sertifikat Resmi</h4>
                    <p className="text-sm text-muted-foreground">
                      Dapatkan sertifikat yang diakui industri
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Komunitas Belajar</h4>
                    <p className="text-sm text-muted-foreground">
                      Bergabung dengan komunitas pelajar dan mentor
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Progress Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Pantau kemajuan belajar dengan analisa mendalam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Akses Seumur Hidup</h4>
                    <p className="text-sm text-muted-foreground">
                      Materi kelas dapat diakses kapan saja selamanya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Signup */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl text-primary-foreground">
              Jadilah yang Pertama Tahu!
            </CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Daftarkan email Anda untuk mendapatkan notifikasi saat kelas online Hero Academy resmi diluncurkan
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <Button variant="secondary" className="px-6 py-3">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </div>

            <div className="flex items-center justify-center mt-6 text-sm text-primary-foreground/80">
              <Users className="w-4 h-4 mr-2" />
              <span>Lebih dari 1,000+ siswa sudah mendaftar</span>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Sementara menunggu kelas online, jelajahi fitur Hero AI yang sudah tersedia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hero-ai">
              <Button size="lg" className="px-8 py-4">
                <Brain className="w-5 h-5 mr-2" />
                Coba Hero AI
              </Button>
            </Link>
            <Link href="/try-out">
              <Button size="lg" variant="outline" className="px-8 py-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Try Out Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}