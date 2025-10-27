// src/app/teacher/settings/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Mail,
  Save,
  Camera
} from "lucide-react";
import Image from "next/image";

export default async function TeacherSettingsPage() {
  await requireTeacher();
  const session = await auth();

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola profil dan preferensi akun Anda
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profil Guru</CardTitle>
          </div>
          <CardDescription>
            Kelola informasi profil Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center gap-6">
            <div className="relative">
              {session?.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Teacher"}
                  width={100}
                  height={100}
                  className="rounded-full ring-4 ring-primary/20"
                />
              ) : (
                <div className="w-25 h-25 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Foto Profil</h3>
              <p className="text-sm text-muted-foreground mb-3">
                JPG, PNG atau GIF. Maksimal 2MB
              </p>
              <Button size="sm" variant="outline">
                Upload Foto
              </Button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input 
                id="name" 
                defaultValue={session?.user.name || ""} 
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                defaultValue={session?.user.email || ""} 
                placeholder="guru@heroacademy.com"
                disabled
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="08123456789"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full p-3 border border-input rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Ceritakan tentang diri Anda, pengalaman mengajar, dan keahlian..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expertise">Keahlian/Spesialisasi</Label>
            <Input 
              id="expertise" 
              placeholder="Contoh: AI & Machine Learning, Matematika, Bahasa Indonesia"
            />
          </div>

          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Keamanan</CardTitle>
          </div>
          <CardDescription>
            Kelola keamanan akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Password Saat Ini</Label>
            <Input 
              id="current-password" 
              type="password"
              placeholder="Masukkan password saat ini"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Password Baru</Label>
              <Input 
                id="new-password" 
                type="password"
                placeholder="Masukkan password baru"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Password</Label>
              <Input 
                id="confirm-password" 
                type="password"
                placeholder="Konfirmasi password baru"
              />
            </div>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifikasi</CardTitle>
          </div>
          <CardDescription>
            Kelola preferensi notifikasi Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Siswa Baru Mendaftar</p>
              <p className="text-sm text-muted-foreground">
                Notifikasi saat ada siswa baru di kelas Anda
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Tugas Dikumpulkan</p>
              <p className="text-sm text-muted-foreground">
                Notifikasi saat siswa mengumpulkan tugas
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Pesan Baru</p>
              <p className="text-sm text-muted-foreground">
                Notifikasi saat ada pesan dari siswa
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Ringkasan Mingguan</p>
              <p className="text-sm text-muted-foreground">
                Terima laporan aktivitas kelas setiap minggu
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Simpan Preferensi
          </Button>
        </CardContent>
      </Card>

      {/* Email Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Preferensi Email</CardTitle>
          </div>
          <CardDescription>
            Kelola email yang Anda terima
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-muted-foreground">
                Tips mengajar dan update fitur terbaru
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Promosi & Event</p>
              <p className="text-sm text-muted-foreground">
                Informasi tentang event dan promosi khusus
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>

          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Simpan Preferensi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}