import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Target,
  Users,
  Brain,
  BookOpen,
  Award,
  Lightbulb,
  Globe,
  Sparkles,
  Star,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Tentang <span className="text-primary">Hero Academy</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Hero Academy adalah platform pembelajaran inovatif yang menggabungkan teknologi AI dengan pendekatan edukatif untuk membantu siswa dan guru mencapai potensi terbaik mereka.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-primary-foreground">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-primary-foreground/90 text-lg leading-relaxed">
                Memberdayakan setiap individu dengan teknologi AI untuk mengenal potensi diri, belajar dengan efektif, dan mempersiapkan masa depan yang gemilang melalui pendidikan yang personal dan adaptif.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-secondary text-secondary-foreground">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl text-secondary-foreground">Visi Kami</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-secondary-foreground/90 text-lg leading-relaxed">
                Menjadi platform pembelajaran AI terdepan di Indonesia yang mengubah cara siswa dan guru berinteraksi dengan pendidikan, menciptakan generasi yang siap menghadapi tantangan masa depan.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Prinsip-prinsip yang memandu setiap langkah Hero Academy dalam menciptakan pengalaman belajar terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Inovasi AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Menggunakan teknologi AI terdepan untuk personalisasi pembelajaran
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-lg">Empati</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Memahami kebutuhan unik setiap siswa dan guru dalam perjalanan belajar
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Kualitas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Berkomitmen memberikan konten dan pengalaman pembelajaran berkualitas tinggi
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Kolaborasi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Membangun komunitas belajar yang saling mendukung dan menginspirasi
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Story */}
        <Card className="mb-20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Cerita Hero Academy</CardTitle>
            <CardDescription className="text-lg">
              Perjalanan kami dalam menciptakan revolusi pendidikan dengan AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hero Academy lahir dari visi untuk mengubah cara siswa dan guru berinteraksi dengan pendidikan. Kami percaya bahwa setiap individu memiliki potensi unik yang dapat dimaksimalkan dengan pendekatan pembelajaran yang tepat.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-primary">2024</div>
                  <h4 className="font-semibold text-foreground">Didirikan</h4>
                  <p className="text-sm text-muted-foreground">
                    Hero Academy didirikan dengan misi menghadirkan AI untuk pendidikan Indonesia
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <h4 className="font-semibold text-foreground">Pengguna</h4>
                  <p className="text-sm text-muted-foreground">
                    Siswa dan guru yang telah merasakan manfaat teknologi AI kami
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <h4 className="font-semibold text-foreground">Kepuasan</h4>
                  <p className="text-sm text-muted-foreground">
                    Tingkat kepuasan pengguna terhadap analisa dan rekomendasi AI
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tim Hero Academy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dibalik Hero Academy, ada tim passionate yang berdedikasi untuk menghadirkan inovasi pendidikan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Research Team</CardTitle>
                <CardDescription>Para ahli AI dan machine learning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tim peneliti AI yang mengembangkan algoritma pembelajaran adaptif dan analisa personal
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">Education Experts</CardTitle>
                <CardDescription>Pakar pendidikan dan kurikulum</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Guru berpengalaman dan ahli kurikulum yang merancang konten pembelajaran berkualitas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Tech Innovators</CardTitle>
                <CardDescription>Developer dan UI/UX designer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tim teknologi yang menciptakan pengalaman digital yang intuitif dan menyenangkan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Impact */}
        <Card className="bg-primary text-primary-foreground mb-20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary-foreground mb-4">
              Dampak Kami
            </CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Kontribusi Hero Academy dalam dunia pendidikan Indonesia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">10,000+</div>
                <p className="text-primary-foreground/80">Siswa Terbantu</p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">500+</div>
                <p className="text-primary-foreground/80">Guru Bermitra</p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">1,000+</div>
                <p className="text-primary-foreground/80">Analisa Selesai</p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">85%</div>
                <p className="text-primary-foreground/80">Peningkatan Hasil</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Makes Us Different */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Apa yang Membuat Kami Berbeda?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hero Academy menghadirkan pendekatan unik dalam dunia pendidikan Indonesia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    AI-Powered Learning
                  </h3>
                  <p className="text-muted-foreground">
                    Teknologi AI yang memahami gaya belajar individual dan memberikan rekomendasi yang tepat untuk setiap siswa.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                  <Target className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Fokus pada Potensi
                  </h3>
                  <p className="text-muted-foreground">
                    Tidak hanya mengajar, tapi membantu siswa mengenal dan mengembangkan potensi unik mereka.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                  <Lightbulb className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Pembelajaran Adaptif
                  </h3>
                  <p className="text-muted-foreground">
                    Sistem yang berkembang dan menyesuaikan diri dengan progress dan kebutuhan setiap pengguna.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Data Privacy
                  </h3>
                  <p className="text-muted-foreground">
                    Keamanan dan privasi data pengguna adalah prioritas utama dalam setiap fitur yang kami kembangkan.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                  <Star className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Kualitas Mentor
                  </h3>
                  <p className="text-muted-foreground">
                    Berkolaborasi dengan guru terbaik dan praktisi AI berpengalaman untuk memberikan pembelajaran berkualitas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                  <Globe className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aksesibilitas
                  </h3>
                  <p className="text-muted-foreground">
                    Membuat pendidikan berkualitas dapat diakses oleh semua kalangan di seluruh Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-secondary-foreground">
              Mari Berkolaborasi!
            </CardTitle>
            <CardDescription className="text-secondary-foreground/80 text-lg">
              Bergabunglah dengan misi kami untuk mengubah dunia pendidikan Indonesia
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-6">
              <p className="text-secondary-foreground/90 max-w-2xl mx-auto">
                Apakah Anda seorang guru yang ingin berkolaborasi? Atau institusi pendidikan yang tertarik dengan teknologi AI? Mari berdiskusi tentang bagaimana Hero Academy dapat membantu!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Hubungi Tim Kami
                </Button>
                <Link href="/hero-ai">
                  <Button
                    size="lg"
                    className="px-8 py-4 bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Coba Hero AI
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}