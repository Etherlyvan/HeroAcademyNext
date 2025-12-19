// src/components/teacher/content-action-buttons.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";

export function DeleteContentButton({ 
  classId, 
  contentId 
}: { 
  classId: string; 
  contentId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus materi ini? Tindakan ini tidak dapat dibatalkan!")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/teacher/classes/${classId}/contents/${contentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus materi");
      }

      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus materi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      size="sm"
      variant="ghost"
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