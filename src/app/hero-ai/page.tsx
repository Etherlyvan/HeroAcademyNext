"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Target,
  Users,
  BookOpen,
  Award,
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle,
  Eye,
  Heart,
  MapPin,
  Calendar,
  FileText,
  MessageCircle,
  Play,
  RotateCcw,
} from "lucide-react";

export default function HeroAI() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  const steps = [
    { id: 0, title: "Welcome", icon: Sparkles },
    { id: 1, title: "Nilai & Misi", icon: Heart },
    { id: 2, title: "Gaya Belajar", icon: BookOpen },
    { id: 3, title: "Kecerdasan", icon: Brain },
    { id: 4, title: "Kepribadian", icon: Users },
    { id: 5, title: "Penjurusan", icon: Target },
    { id: 6, title: "Hero Journey", icon: MapPin },
    { id: 7, title: "Action Plan", icon: Calendar },
    { id: 8, title: "Hasil", icon: Award },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAssessmentComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderWelcomeStep = () => (
    <div className="text-center space-y-8">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
        <Brain className="w-12 h-12 text-primary" />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Halo, aku Hero AI! 🤖</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Aku akan bantu kamu mengenali potensi dan arah hidupmu. Siap memulai perjalanan menjadi pahlawan?
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Apa yang akan kamu dapatkan?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Profil kepribadian lengkap</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Gaya belajar optimal</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Rekomendasi jurusan & karier</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Roadmap pengembangan diri</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button size="lg" onClick={handleNext} className="px-8 py-4">
          <Play className="w-5 h-5 mr-2" />
          Siap Memulai!
        </Button>
        <Button size="lg" variant="outline" className="px-8 py-4">
          <MessageCircle className="w-5 h-5 mr-2" />
          Jelaskan Dulu
        </Button>
      </div>
    </div>
  );

  const renderMissionStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Nilai & Misi Hero</h2>
        <p className="text-muted-foreground">Mari kita mulai dengan mengenal motivasi dan cita-cita kamu</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Refleksi Diri</CardTitle>
          <CardDescription>Jawab pertanyaan berikut untuk menemukan misi hidup kamu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Apa hal yang membuat kamu paling resah di lingkungan sekitar?
            </label>
            <textarea
              className="w-full p-3 border rounded-lg bg-background resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              rows={3}
              placeholder="Ceritakan masalah yang kamu lihat di sekitar..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Jika kamu punya kemampuan super, masalah apa yang ingin kamu selesaikan?
            </label>
            <textarea
              className="w-full p-3 border rounded-lg bg-background resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              rows={3}
              placeholder="Bayangkan jika kamu punya kekuatan untuk mengubah dunia..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Dalam 5 tahun ke depan, kamu ingin jadi apa?
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Profesi atau peran yang kamu impikan..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Kenapa kamu ingin menjadi itu?
            </label>
            <textarea
              className="w-full p-3 border rounded-lg bg-background resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              rows={3}
              placeholder="Apa motivasi terdalam kamu?"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lanjutkan
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderVAKStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-secondary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Gaya Belajar (VAK)</h2>
        <p className="text-muted-foreground">Temukan cara terbaik kamu menyerap informasi</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asesmen Gaya Belajar</CardTitle>
          <CardDescription>Pilih jawaban yang paling menggambarkan diri kamu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              question: "Saya lebih mudah mengingat pelajaran dengan...",
              options: [
                "Melihat gambar dan diagram",
                "Mendengar penjelasan guru",
                "Mencoba langsung atau praktik",
              ],
            },
            {
              question: "Saat membaca buku, saya...",
              options: [
                "Membayangkan adegan dalam pikiran",
                "Membaca keras-keras untuk mendengar",
                "Menulis ulang poin-poin penting",
              ],
            },
            {
              question: "Saya paling suka belajar dari...",
              options: [
                "Video dan infografis",
                "Podcast dan diskusi",
                "Eksperimen dan simulasi",
              ],
            },
          ].map((item, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium text-foreground">{item.question}</p>
              <div className="space-y-2">
                {item.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name={`vak-${index}`} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lanjutkan
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderMultipleIntelligenceStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
          <Brain className="w-8 h-8 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Kecerdasan Majemuk</h2>
        <p className="text-muted-foreground">Temukan kekuatan utama kamu dari 8 jenis kecerdasan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asesmen Kecerdasan Majemuk</CardTitle>
          <CardDescription>
            Beri skor 1-5 untuk setiap pernyataan (1 = tidak sesuai, 5 = sangat sesuai)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { type: "Linguistik", statement: "Saya suka menulis, bercerita, atau membaca dengan ekspresif" },
            { type: "Logika-Matematika", statement: "Saya suka mencari pola, memecahkan teka-teki, atau eksperimen logika" },
            { type: "Visual-Spasial", statement: "Saya bisa membayangkan bentuk, arah, atau desain dengan mudah" },
            { type: "Kinestetik", statement: "Saya belajar lebih cepat dengan melakukan dan bergerak" },
            { type: "Musikal", statement: "Saya mudah mengingat nada, lagu, atau irama" },
            { type: "Interpersonal", statement: "Saya bisa memahami perasaan orang lain dan suka bekerja dalam kelompok" },
            { type: "Intrapersonal", statement: "Saya sering merenung dan mengenal perasaan serta tujuan hidup saya" },
            { type: "Naturalis", statement: "Saya tertarik dengan alam, hewan, atau lingkungan sekitar" },
          ].map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-foreground">{item.statement}</p>
                <span className="text-sm text-muted-foreground">{item.type}</span>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} className="flex items-center space-x-1 cursor-pointer">
                    <input type="radio" name={`mi-${index}`} value={score} className="text-primary" />
                    <span className="text-sm">{score}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lanjutkan
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderDISCStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Kepribadian DISC</h2>
        <p className="text-muted-foreground">Pahami gaya komunikasi dan kerja sama kamu</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asesmen Kepribadian DISC</CardTitle>
          <CardDescription>Pilih jawaban yang paling menggambarkan diri kamu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              question: "Saya suka mengambil keputusan dan memimpin tim",
              type: "Dominance (D)",
            },
            {
              question: "Saya suka berbicara dan menyemangati orang lain",
              type: "Influence (I)",
            },
            {
              question: "Saya sabar, mendengarkan orang lain, dan tidak suka konflik",
              type: "Steadiness (S)",
            },
            {
              question: "Saya suka aturan yang jelas dan memastikan hasil sempurna",
              type: "Compliance (C)",
            },
          ].map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-foreground">{item.question}</p>
                <span className="text-sm text-muted-foreground">{item.type}</span>
              </div>
              <div className="flex space-x-4">
                {["Ya", "Kadang", "Tidak"].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name={`disc-${index}`} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lanjutkan
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderRIASECStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <Target className="w-8 h-8 text-secondary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Penjurusan RIASEC</h2>
        <p className="text-muted-foreground">Temukan jurusan dan karier yang cocok dengan minat kamu</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asesmen Minat Karier</CardTitle>
          <CardDescription>Beri skor 1-5 untuk setiap pernyataan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { type: "Realistic", statement: "Saya suka memperbaiki atau membuat benda secara langsung" },
            { type: "Investigative", statement: "Saya suka memecahkan masalah dan melakukan riset" },
            { type: "Artistic", statement: "Saya suka menggambar, menulis, atau mengekspresikan ide kreatif" },
            { type: "Social", statement: "Saya suka membantu, mengajar, atau mendengarkan orang lain" },
            { type: "Enterprising", statement: "Saya suka mengajak orang, memimpin, atau memulai sesuatu" },
            { type: "Conventional", statement: "Saya suka mengatur data, membuat laporan, dan mengikuti sistem yang rapi" },
          ].map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-foreground">{item.statement}</p>
                <span className="text-sm text-muted-foreground">{item.type}</span>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} className="flex items-center space-x-1 cursor-pointer">
                    <input type="radio" name={`riasec-${index}`} value={score} className="text-primary" />
                    <span className="text-sm">{score}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lanjutkan
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderHeroJourneyStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Hero Journey Mapping</h2>
        <p className="text-muted-foreground">Mari kita buat roadmap perjalanan hero kamu</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary" />
              Awareness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Mengenal diri dan potensi</p>
            <textarea
              className="w-full p-2 border rounded bg-background resize-none text-sm"
              rows={3}
              placeholder="Apa yang sudah kamu ketahui tentang diri sendiri?"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-secondary-foreground" />
              Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Rintangan yang harus dihadapi</p>
            <textarea
              className="w-full p-2 border rounded bg-background resize-none text-sm"
              rows={3}
              placeholder="Apa tantangan terbesar dalam belajar?"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-accent-foreground" />
              Allies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Mentor dan dukungan</p>
            <textarea
              className="w-full p-2 border rounded bg-background resize-none text-sm"
              rows={3}
              placeholder="Siapa yang bisa membantu perjalanan kamu?"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary" />
              Action
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Langkah konkret</p>
            <textarea
              className="w-full p-2 border rounded bg-background resize-none text-sm"
              rows={3}
              placeholder="Apa langkah pertama yang akan kamu lakukan?"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lanjutkan
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderActionPlanStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Action Plan & Try Out</h2>
        <p className="text-muted-foreground">Mari buat rencana konkret untuk mewujudkan impian kamu</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rencana Aksi</CardTitle>
          <CardDescription>Buat target dan langkah-langkah yang bisa kamu mulai minggu ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Target 1 bulan ke depan:</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-background resize-none"
              rows={2}
              placeholder="Apa yang ingin kamu capai dalam 1 bulan?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Langkah kecil minggu ini:</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-background resize-none"
              rows={2}
              placeholder="Apa yang bisa kamu mulai minggu ini?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Indikator keberhasilan:</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-background resize-none"
              rows={2}
              placeholder="Bagaimana kamu tahu bahwa kamu sudah berhasil?"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-primary-foreground">Rekomendasi Hero Academy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <BookOpen className="w-8 h-8 text-primary-foreground mx-auto" />
              <h4 className="font-semibold text-primary-foreground">Kelas Rekomendasi</h4>
              <p className="text-sm text-primary-foreground/80">Berdasarkan gaya belajar kamu</p>
            </div>
            <div className="space-y-2">
              <Target className="w-8 h-8 text-primary-foreground mx-auto" />
              <h4 className="font-semibold text-primary-foreground">Try Out Jurusan</h4>
              <p className="text-sm text-primary-foreground/80">Sesuai minat dan potensi</p>
            </div>
            <div className="space-y-2">
              <Users className="w-8 h-8 text-primary-foreground mx-auto" />
              <h4 className="font-semibold text-primary-foreground">Mentor Tersedia</h4>
              <p className="text-sm text-primary-foreground/80">Ahli di bidang yang kamu minati</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sebelumnya
        </Button>
        <Button onClick={handleNext}>
          Lihat Hasil
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
          <Award className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Hasil Asesmen Hero AI</h2>
        <p className="text-lg text-muted-foreground">Profil lengkap dan rekomendasi personal untuk kamu</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-primary" />
              Mission Statement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-lg font-medium text-primary">
                "Aku ingin menjadi [profesi] agar bisa [dampak positif]"
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-secondary-foreground" />
              Gaya Belajar Dominan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Visual</span>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Auditori</span>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Kinestetik</span>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-accent-foreground" />
              Kecerdasan Teratas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <span className="font-medium">Linguistik</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-secondary-foreground">2</span>
                </div>
                <span className="font-medium">Interpersonal</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent-foreground">3</span>
                </div>
                <span className="font-medium">Logika-Matematika</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Rekomendasi Jurusan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">Psikologi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">Komunikasi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">Sosiologi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-primary-foreground">Roadmap Hero Kamu</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Peta perjalanan pengembangan diri berdasarkan hasil asesmen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-primary-foreground">Awareness</h4>
              <p className="text-xs text-primary-foreground/80">Mengenal diri</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-primary-foreground">Challenge</h4>
              <p className="text-xs text-primary-foreground/80">Menghadapi rintangan</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-primary-foreground">Allies</h4>
              <p className="text-xs text-primary-foreground/80">Membangun jaringan</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-primary-foreground">Action</h4>
              <p className="text-xs text-primary-foreground/80">Langkah konkret</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-primary-foreground">Impact</h4>
              <p className="text-xs text-primary-foreground/80">Mencapai tujuan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-4">
            <FileText className="w-5 h-5 mr-2" />
            Download Laporan Lengkap
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4" onClick={() => setCurrentStep(0)}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Mulai Ulang Asesmen
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/kelas">
            <Button size="lg" variant="secondary" className="px-8 py-4">
              <BookOpen className="w-5 h-5 mr-2" />
              Lihat Kelas Rekomendasi
            </Button>
          </Link>
          <Link href="/try-out">
            <Button size="lg" variant="secondary" className="px-8 py-4">
              <Target className="w-5 h-5 mr-2" />
              Coba Try Out Jurusan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderMissionStep();
      case 2:
        return renderVAKStep();
      case 3:
        return renderMultipleIntelligenceStep();
      case 4:
        return renderDISCStep();
      case 5:
        return renderRIASECStep();
      case 6:
        return renderHeroJourneyStep();
      case 7:
        return renderActionPlanStep();
      case 8:
        return renderResultsStep();
      default:
        return renderWelcomeStep();
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Only show on first step */}
        {currentStep === 0 && (
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        )}

        {/* Progress Bar */}
        {!isAssessmentComplete && (
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Hero AI - Asesmen & Refleksi Diri
              </h1>
              <span className="text-sm text-muted-foreground">
                Langkah {currentStep + 1} dari {steps.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center space-y-1 ${
                      index <= currentStep ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        index <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs text-center leading-tight px-1">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="min-h-[600px]">{renderCurrentStep()}</div>
      </div>
    </div>
  );
}