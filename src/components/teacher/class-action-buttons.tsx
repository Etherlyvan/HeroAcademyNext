// src/components/teacher/class-action-buttons.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Archive, Trash2, Loader2 } from "lucide-react";

export function ArchiveClassButton({ 
  classId, 
  currentStatus 
}: { 
  classId: string; 
  currentStatus: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isArchived = currentStatus === "ARCHIVED";

  const handleArchive = async () => {
    const action = isArchived ? "mengaktifkan kembali" : "mengarsipkan";
    if (!confirm(`Apakah Anda yakin ingin ${action} kelas ini?`)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/teacher/classes/${classId}/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status: isArchived ? "ACTIVE" : "ARCHIVED" 
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengubah status kelas");
      }

      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan saat mengubah status kelas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleArchive}
      disabled={isLoading}
      size="sm"
      variant="outline"
      className="gap-1"
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Archive className="h-3 w-3" />
      )}
    </Button>
  );
}

export function DeleteClassButton({ classId }: { classId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan!")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/teacher/classes/${classId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus kelas");
      }

      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus kelas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      size="sm"
      variant="outline"
      className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Trash2 className="h-3 w-3" />
      )}
    </Button>
  );
}