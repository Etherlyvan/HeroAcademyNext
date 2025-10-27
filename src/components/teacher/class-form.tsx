// src/components/teacher/class-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  ArrowLeft,
  Loader2,
  Upload,
  X,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface ClassFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    status: string;
    approvalStatus: string;
  };
}

export function ClassForm({ initialData }: ClassFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    thumbnail: initialData?.thumbnail || "",
    status: initialData?.status || "DRAFT",
  });

  const isEditing = !!initialData;
  const isRejected = initialData?.approvalStatus === "REJECTED";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = initialData 
        ? `/api/teacher/classes/${initialData.id}`
        : "/api/teacher/classes";
      
      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Terjadi kesalahan");
      }

      setSuccess(
        isEditing 
          ? "Kelas berhasil diperbarui" 
          : "Kelas berhasil diajukan dan menunggu persetujuan admin"
      );

      setTimeout(() => {
        router.push("/teacher/classes");
        router.refresh();
      }, 1500);
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Info Banner for New Class */}
      {!isEditing && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Persetujuan Admin Diperlukan
                </h4>
                <p className="text-sm text-blue-700">
                  Kelas yang Anda buat akan direview oleh admin terlebih dahulu. 
                  Anda akan dapat mengelola kelas setelah mendapat persetujuan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Banner for Rejected Class */}
      {isRejected && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">
                  Kelas Ditolak - Perlu Revisi
                </h4>
                <p className="text-sm text-red-700">
                  Silakan perbaiki kelas Anda sesuai feedback admin dan ajukan kembali.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {isEditing ? "Edit Informasi Kelas" : "Ajukan Kelas Baru"}
            </CardTitle>
            <Link href="/teacher/classes">
              <Button variant="ghost" size="sm" type="button">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Batal
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {success}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Judul Kelas *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Pengenalan AI & Machine Learning"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Kelas *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-input rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={6}
              placeholder="Jelaskan tentang kelas ini, apa yang akan dipelajari siswa, dan tujuan pembelajaran..."
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status Kelas *</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            >
              <option value="DRAFT">Draft (Belum Dipublikasi)</option>
              <option value="ACTIVE">Aktif (Siswa Bisa Mendaftar)</option>
              <option value="ARCHIVED">Arsip (Tidak Aktif)</option>
            </select>
            <p className="text-xs text-muted-foreground">
              Status ini akan aktif setelah kelas disetujui admin
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Kelas (Opsional)</Label>
            <div className="flex gap-2">
              <Input
                id="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://example.com/image.jpg"
                disabled={isLoading}
              />
              <Button type="button" variant="outline" disabled={isLoading}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            {formData.thumbnail && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, thumbnail: "" })}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {isEditing ? "Perbarui Kelas" : "Ajukan Kelas"}
                </>
              )}
            </Button>
            <Link href="/teacher/classes">
              <Button type="button" variant="outline" disabled={isLoading}>
                Batal
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}