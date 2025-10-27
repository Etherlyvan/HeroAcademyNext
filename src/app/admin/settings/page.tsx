// src/app/admin/settings/page.tsx
import { requireAdmin } from "@/lib/auth-utils";
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
  Database,
  Mail,
  Globe,
  Palette,
  Save,
  RefreshCw
} from "lucide-react";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const session = await auth();

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola pengaturan sistem Hero Academy
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profil Admin</CardTitle>
          </div>
          <CardDescription>
            Kelola informasi profil admin Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                placeholder="admin@heroacademy.com"
                disabled
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full p-3 border border-input rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Ceritakan tentang diri Anda..."
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
            Kelola keamanan akun dan sistem
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
            Kelola preferensi notifikasi sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">User Baru Mendaftar</p>
              <p className="text-sm text-muted-foreground">
                Notifikasi saat ada user baru yang mendaftar
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Kelas Baru Dibuat</p>
              <p className="text-sm text-muted-foreground">
                Notifikasi saat guru membuat kelas baru
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Laporan Mingguan</p>
              <p className="text-sm text-muted-foreground">
                Terima laporan statistik setiap minggu
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

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle>Sistem</CardTitle>
          </div>
          <CardDescription>
            Pengaturan sistem dan maintenance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Nama Aplikasi</Label>
              <Input 
                id="app-name" 
                defaultValue="Hero Academy"
                placeholder="Nama aplikasi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-url">URL Aplikasi</Label>
              <Input 
                id="app-url" 
                defaultValue="https://heroacademy.com"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Email Support</Label>
            <Input 
              id="support-email" 
              type="email"
              defaultValue="support@heroacademy.com"
              placeholder="support@example.com"
            />
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Simpan Pengaturan
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset ke Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle>Tampilan</CardTitle>
          </div>
          <CardDescription>
            Kustomisasi tampilan aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 rounded-lg border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="w-full h-20 bg-gradient-to-br from-white to-gray-100 rounded mb-2"></div>
                <p className="text-sm font-medium">Light</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors">
                <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                <p className="text-sm font-medium">Dark</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-colors">
                <div className="w-full h-20 bg-gradient-to-br from-white via-gray-100 to-gray-800 rounded mb-2"></div>
                <p className="text-sm font-medium">Auto</p>
              </button>
            </div>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Terapkan Tema
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Tindakan yang memerlukan perhatian khusus
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50 bg-destructive/5">
            <div>
              <p className="font-medium">Reset Database</p>
              <p className="text-sm text-muted-foreground">
                Hapus semua data dan kembalikan ke kondisi awal
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Reset
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50 bg-destructive/5">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground">
                Export semua data sistem untuk backup
              </p>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}