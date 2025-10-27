import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Clock,
  Bell,
  CheckCircle,
  Users,
  BookOpen,
  Brain,
  Award,
  TrendingUp,
  ArrowLeft,
  Timer,
  FileText,
} from "lucide-react";

export default function Tryout() {
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
            <Target className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Try Out Hero Academy
          </h1>

          <div className="inline-flex items-center bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">Segera Hadir</span>
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sistem try out canggih dengan teknologi AI untuk simulasi UTBK dan diagnostik gaya belajar sedang dalam tahap pengembangan. Bersiaplah untuk pengalaman ujian yang revolusioner!
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Simulasi UTBK</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simulasi ujian UTBK dengan soal terbaru dan sistem penilaian yang akurat
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">Analisa AI</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analisa mendalam hasil ujian dengan rekomendasi belajar dari AI
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pantau perkembangan kemampuan dan identifikasi area yang perlu ditingkatkan
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Try Out Features */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Fitur Try Out yang Akan Hadir</CardTitle>
            <CardDescription className="text-lg">
              Pengalaman try out yang komprehensif dengan teknologi AI terdepan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Soal UTBK Terkini</h4>
                    <p className="text-sm text-muted-foreground">
                      Bank soal yang selalu diperbarui sesuai standar UTBK terbaru
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Timer Realistis</h4>
                    <p className="text-sm text-muted-foreground">
                      Simulasi waktu ujian yang sama persis dengan UTBK asli
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Analisa SWOT Pribadi</h4>
                    <p className="text-sm text-muted-foreground">
                      Identifikasi kekuatan dan kelemahan dalam setiap mata pelajaran
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Ranking Nasional</h4>
                    <p className="text-sm text-muted-foreground">
                      Bandingkan hasil dengan peserta try out lainnya se-Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Diagnostik Gaya Belajar</h4>
                    <p className="text-sm text-muted-foreground">
                      Temukan metode belajar yang paling efektif untuk kamu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Rekomendasi Jurusan</h4>
                    <p className="text-sm text-muted-foreground">
                      Saran jurusan kuliah berdasarkan hasil dan minat kamu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Laporan Detail</h4>
                    <p className="text-sm text-muted-foreground">
                      Analisa mendalam dengan grafik dan insight yang mudah dipahami
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Rencana Belajar AI</h4>
                    <p className="text-sm text-muted-foreground">
                      Jadwal belajar personal yang dibuat khusus oleh AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Dashboard */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Preview Dashboard Hasil</CardTitle>
            <CardDescription>
              Tampilan dashboard yang akan menampilkan hasil try out Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">85</div>
                  <div className="text-sm text-muted-foreground">Skor TPS</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-foreground">78</div>
                  <div className="text-sm text-muted-foreground">Skor TKA</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent-foreground">15</div>
                  <div className="text-sm text-muted-foreground">Ranking</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">A</div>
                  <div className="text-sm text-muted-foreground">Grade</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Analisa Per Mata Pelajaran</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Matematika</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">83%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bahasa Indonesia</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-14 h-2 bg-secondary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bahasa Inggris</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-18 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-primary">AI Insight</div>
                      <div className="text-sm text-muted-foreground">
                        Kamu unggul di Bahasa Inggris! Fokus latihan di Matematika untuk hasil yang lebih optimal. Rekomendasi: 2 jam/hari latihan soal.
                      </div>
                    </div>
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
              Daftar untuk Try Out Gratis!
            </CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Jadilah yang pertama mencoba sistem try out revolusioner Hero Academy
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
                <Target className="w-4 h-4 mr-2" />
                Daftar Sekarang
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm text-primary-foreground/80">
              <div className="flex items-center justify-center">
                <Users className="w-4 h-4 mr-2" />
                <span>2,500+ pendaftar</span>
              </div>
              <div className="flex items-center justify-center">
                <Timer className="w-4 h-4 mr-2" />
                <span>Try out gratis selamanya</span>
              </div>
              <div className="flex items-center justify-center">
                <Award className="w-4 h-4 mr-2" />
                <span>Sertifikat digital</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Sementara menunggu try out online, manfaatkan fitur Hero AI untuk analisa potensi belajar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hero-ai">
              <Button size="lg" className="px-8 py-4">
                <Brain className="w-5 h-5 mr-2" />
                Analisa dengan Hero AI
              </Button>
            </Link>
            <Link href="/kelas">
              <Button size="lg" variant="outline" className="px-8 py-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Lihat Kelas Online
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}