// src/lib/auth-utils.ts
import { auth } from "./auth-helper";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}

export async function requireTeacher() {
  const session = await requireAuth();
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}

export async function requireStudent() {
  const session = await requireAuth();
  if (session.user.role !== "STUDENT" && session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}

export function isAdmin(role?: string) {
  return role === "ADMIN";
}

export function isTeacher(role?: string) {
  return role === "TEACHER" || role === "ADMIN";
}

export function isStudent(role?: string) {
  return role === "STUDENT" || role === "ADMIN";
}