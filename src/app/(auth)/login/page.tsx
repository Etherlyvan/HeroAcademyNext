"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  LogIn,
  Shield,
  Smartphone,
  Key,
  CheckCircle,
  Bell,
  Users,
  UserCheck
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to get redirect URL based on role
  const getRedirectUrl = async (email: string) => {
    try {
      const response = await fetch("/api/auth/session");
      const session = await response.json();
      
      if (session?.user?.role) {
        switch (session.user.role) {
          case "ADMIN":
            return "/admin/dashboard";
          case "TEACHER":
            return "/teacher/dashboard";
          case "STUDENT":
            return "/student/dashboard";
          default:
            return "/";
        }
      }
      return "/";
    } catch (error) {
      console.error("Error getting session:", error);
      return "/";
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah");
        setIsLoading(false);
      } else {
        // Get redirect URL based on user role
        const redirectUrl = await getRedirectUrl(email);
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      await signIn("google", { 
        callbackUrl: "/student/dashboard" // Default untuk Google login
      });
    } catch (error) {
      setError("Terjadi kesalahan saat login dengan Google");
      setIsLoading(false);
    }
  }

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
            <LogIn className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Masuk Hero Academy
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Masuk ke akun Anda untuk mengakses semua fitur dan melanjutkan perjalanan belajar bersama Hero Academy!
          </p>
        </div>

        {/* Login Features Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Login Aman</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Enkripsi tingkat enterprise untuk melindungi akun Anda
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">Multi-Device</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Akses akun dari berbagai perangkat dengan sinkronisasi otomatis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-lg">Single Sign-On</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Login sekali untuk mengakses semua fitur Hero Academy
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Login Benefits */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Keuntungan Login Hero Academy</CardTitle>
            <CardDescription className="text-lg">
              Fitur eksklusif yang hanya tersedia untuk member yang sudah login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sesi Tersimpan</h4>
                    <p className="text-sm text-muted-foreground">
                      Progress dan hasil analisa tersimpan otomatis
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Personalisasi</h4>
                    <p className="text-sm text-muted-foreground">
                      Rekomendasi belajar yang disesuaikan dengan profil Anda
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Riwayat Lengkap</h4>
                    <p className="text-sm text-muted-foreground">
                      Akses ke semua aktivitas dan pencapaian sebelumnya
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Notifikasi Personal</h4>
                    <p className="text-sm text-muted-foreground">
                      Update khusus berdasarkan minat dan progress Anda
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sinkronisasi Cloud</h4>
                    <p className="text-sm text-muted-foreground">
                      Data tersinkron di semua perangkat secara real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Fitur Premium</h4>
                    <p className="text-sm text-muted-foreground">
                      Akses ke analisa mendalam dan fitur eksklusif
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Komunitas Akses</h4>
                    <p className="text-sm text-muted-foreground">
                      Bergabung dengan diskusi dan forum member
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Support Prioritas</h4>
                    <p className="text-sm text-muted-foreground">
                      Bantuan lebih cepat dari tim Hero Academy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Form Login</CardTitle>
            <CardDescription>
              Masuk dengan email atau Google untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full mb-6"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Masuk dengan Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Atau lanjutkan dengan
                  </span>
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {error && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      className="pl-10 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      disabled={isLoading}
                    />
                    <span className="text-muted-foreground">Ingat saya</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Masuk
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Belum punya akun?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Atau jelajahi fitur Hero Academy terlebih dahulu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hero-ai">
              <Button size="lg" className="px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2" />
                Coba Hero AI
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="px-8 py-4">
                <LogIn className="w-5 h-5 mr-2" />
                Info Pendaftaran
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}