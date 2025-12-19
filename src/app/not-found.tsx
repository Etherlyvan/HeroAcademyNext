"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Home,
  Search,
  ArrowLeft,
  Brain,
  BookOpen,
  Target,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 rounded-full mb-6">
            <div className="text-6xl font-bold text-primary">404</div>
          </div>

          <div className="flex justify-center items-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Halaman Tidak Ditemukan
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL yang dimasukkan salah.
          </p>
        </div>

        {/* Suggestions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Apa yang bisa Anda lakukan?
            </CardTitle>
            <CardDescription>
              Beberapa saran untuk melanjutkan perjalanan belajar Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-left space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Periksa URL</h4>
                    <p className="text-sm text-muted-foreground">
                      Pastikan alamat yang diketik sudah benar
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Kembali ke Beranda</h4>
                    <p className="text-sm text-muted-foreground">
                      Mulai dari halaman utama Hero Academy
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Coba Fitur Lain</h4>
                    <p className="text-sm text-muted-foreground">
                      Jelajahi Hero AI atau Try Out yang tersedia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Hubungi Kami</h4>
                    <p className="text-sm text-muted-foreground">
                      Tim support siap membantu Anda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="px-8 py-4">
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Halaman Sebelumnya
            </Button>
          </div>

          {/* Popular Pages */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Halaman Populer
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/hero-ai">
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Hero AI</h4>
                    <p className="text-sm text-muted-foreground">
                      Analisa potensi belajar
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/try-out">
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Try Out</h4>
                    <p className="text-sm text-muted-foreground">
                      Simulasi ujian UTBK
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/kelas">
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Kelas Online
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Belajar dengan mentor
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-primary mr-2" />
            <span className="font-semibold text-primary">Hero Academy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            "Setiap kesalahan adalah kesempatan untuk belajar. Mari kembali ke jalur yang benar dan terus berkembang bersama Hero Academy!"
          </p>
        </div>
      </div>
    </div>
  );
}