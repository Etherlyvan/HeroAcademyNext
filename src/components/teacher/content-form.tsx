// src/components/teacher/content-form.tsx
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
  AlertCircle,
  FileText,
  PlayCircle
} from "lucide-react";
import Link from "next/link";

interface ContentFormProps {
  classId: string;
  initialData?: {
    id: string;
    title: string;
    description?: string;
    contentType: string;
    fileUrl: string;
    order: number;
  };
}

export function ContentForm({ classId, initialData }: ContentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    contentType: initialData?.contentType || "PDF",
    fileUrl: initialData?.fileUrl || "",
    order: initialData?.order || 1,
  });

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = initialData 
        ? `/api/teacher/classes/${classId}/contents/${initialData.id}`
        : `/api/teacher/classes/${classId}/contents`;
      
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
          ? "Materi berhasil diperbarui" 
          : "Materi berhasil ditambahkan"
      );

      setTimeout(() => {
        router.push(`/teacher/classes/${classId}/contents`);
        router.refresh();
      }, 1500);
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const contentTypes = [
    { value: "VIDEO", label: "Video", icon: PlayCircle, description: "File video pembelajaran" },
    { value: "PDF", label: "PDF", icon: FileText, description: "Dokumen PDF" },
    { value: "PPT", label: "PowerPoint", icon: FileText, description: "Presentasi PowerPoint" },
    { value: "DOCUMENT", label: "Dokumen", icon: FileText, description: "Dokumen lainnya" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {isEditing ? "Edit Materi" : "Tambah Materi Baru"}
            </CardTitle>
            <Link href={`/teacher/classes/${classId}/contents`}>
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
            <Label htmlFor="title">Judul Materi *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Pengenalan Konsep AI"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Materi</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-input rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Jelaskan tentang materi ini dan apa yang akan dipelajari siswa..."
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentType">Jenis Materi *</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.contentType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value={type.value}
                      checked={formData.contentType === type.value}
                      onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                      className="sr-only"
                      disabled={isLoading}
                    />
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">URL File atau Upload *</Label>
            <div className="flex gap-2">
              <Input
                id="fileUrl"
                type="url"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                placeholder="https://example.com/file.pdf"
                required
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="button" variant="outline" disabled={isLoading}>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Masukkan URL file atau upload file dari komputer Anda
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Urutan Materi *</Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
              placeholder="1"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Urutan tampilan materi dalam kelas (angka kecil akan muncul lebih dulu)
            </p>
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
                  {isEditing ? "Perbarui Materi" : "Tambah Materi"}
                </>
              )}
            </Button>
            <Link href={`/teacher/classes/${classId}/contents`}>
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