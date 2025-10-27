// src/components/admin/class-approval-buttons.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export function ApproveClassButton({ classId }: { classId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    if (!confirm("Apakah Anda yakin ingin menyetujui kelas ini?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/classes/${classId}/approve`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Gagal menyetujui kelas");
      }

      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan saat menyetujui kelas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleApprove}
      disabled={isLoading}
      size="sm"
      className="gap-1 bg-green-600 hover:bg-green-700"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      Setujui
    </Button>
  );
}

export function RejectClassButton({ classId }: { classId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleReject = async () => {
    const reason = prompt("Alasan penolakan (opsional):");
    if (reason === null) return; // User cancelled

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/classes/${classId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error("Gagal menolak kelas");
      }

      router.refresh();
    } catch (error) {
      alert("Terjadi kesalahan saat menolak kelas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReject}
      disabled={isLoading}
      size="sm"
      variant="destructive"
      className="gap-1"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
      Tolak
    </Button>
  );
}