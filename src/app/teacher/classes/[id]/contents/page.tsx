// src/app/teacher/classes/[id]/contents/page.tsx
import { requireTeacher } from "@/lib/auth-utils";
import { auth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  ArrowLeft,
  PlayCircle,
  FileText,
  Move,
  Clock
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getClassContents(classId: string, teacherId: string) {
  const classData = await prisma.class.findFirst({
    where: {
      id: classId,
      teacherId,
    },
    select: {
      id: true,
      title: true,
      status: true,
    },
  });

  if (!classData) {
    notFound();
  }

  const contents = await prisma.classContent.findMany({
    where: { classId },
    orderBy: { order: 'asc' },
  });

  return { classData, contents };
}

export default async function ClassContentsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  await requireTeacher();
  const session = await auth();
  const { id } = await params;
  const { classData, contents } = await getClassContents(id, session!.user.id);

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <PlayCircle className="h-5 w-5 text-red-600" />;
      case "PDF":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "PPT":
        return <FileText className="h-5 w-5 text-orange-600" />;
      case "DOCUMENT":
        return <FileText className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getContentTypeBadge = (type: string) => {
    const badges = {
      VIDEO: { label: "Video", color: "bg-red-100 text-red-700 border-red-200" },
      PDF: { label: "PDF", color: "bg-blue-100 text-blue-700 border-blue-200" },
      PPT: { label: "PowerPoint", color: "bg-orange-100 text-orange-700 border-orange-200" },
      DOCUMENT: { label: "Dokumen", color: "bg-green-100 text-green-700 border-green-200" },
    };
    const badge = badges[type as keyof typeof badges];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/teacher/classes/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Detail Kelas
          </Button>
        </Link>
      </div>

      {/* Class Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Materi: {classData.title}</CardTitle>
              <CardDescription>
                Kelola semua materi pembelajaran untuk kelas ini
              </CardDescription>
            </div>
            <Link href={`/teacher/classes/${id}/contents/new`}>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Materi Baru
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari materi..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Contents List */}
      {contents.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Daftar Materi ({contents.length})</CardTitle>
            <CardDescription>
              Drag untuk mengubah urutan materi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contents.map((content, index) => (
                <div
                  key={content.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                >
                  {/* Drag Handle */}
                  <div className="cursor-move text-muted-foreground hover:text-primary">
                    <Move className="h-5 w-5" />
                  </div>

                  {/* Order Number */}
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{content.order}</span>
                  </div>

                  {/* Content Type Icon */}
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getContentTypeIcon(content.contentType)}
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">
                        {content.title}
                      </h4>
                      {getContentTypeBadge(content.contentType)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {content.description || "Tidak ada deskripsi"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Dibuat: {new Date(content.createdAt).toLocaleDateString('id-ID')}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Diperbarui: {new Date(content.updatedAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Link href={`/teacher/classes/${id}/contents/${content.id}/edit`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            <BookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Belum Ada Materi
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Mulai dengan menambahkan materi pembelajaran pertama untuk kelas ini. 
              Anda bisa upload video, PDF, PowerPoint, atau dokumen lainnya.
            </p>
            <Link href={`/teacher/classes/${id}/contents/new`}>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Tambah Materi Pertama
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}