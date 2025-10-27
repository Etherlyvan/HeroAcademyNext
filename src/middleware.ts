// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  const { pathname } = request.nextUrl;

  // Allow all auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Redirect logged-in users from homepage to their dashboard
  if (pathname === "/") {
    if (token) {
      const role = token.role as string;
      let dashboardUrl = "/";
      
      switch (role) {
        case "ADMIN":
          dashboardUrl = "/admin/dashboard";
          break;
        case "TEACHER":
          dashboardUrl = "/teacher/dashboard";
          break;
        case "STUDENT":
          dashboardUrl = "/student/dashboard";
          break;
      }
      
      if (dashboardUrl !== "/") {
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    }
  }

  // Redirect logged-in users from login/register pages to their dashboard
  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      const role = token.role as string;
      let dashboardUrl = "/";
      
      switch (role) {
        case "ADMIN":
          dashboardUrl = "/admin/dashboard";
          break;
        case "TEACHER":
          dashboardUrl = "/teacher/dashboard";
          break;
        case "STUDENT":
          dashboardUrl = "/student/dashboard";
          break;
      }
      
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  }

  // Redirect logged-in users from public pages to their dashboard
  const publicPages = ["/hero-ai", "/kelas", "/try-out", "/tentang-kami"];
  if (publicPages.includes(pathname) && token) {
    const role = token.role as string;
    let dashboardUrl = "/";
    
    switch (role) {
      case "ADMIN":
        dashboardUrl = "/admin/dashboard";
        break;
      case "TEACHER":
        dashboardUrl = "/teacher/dashboard";
        break;
      case "STUDENT":
        // Student masih bisa akses Hero AI
        if (pathname === "/hero-ai") {
          return NextResponse.next();
        }
        dashboardUrl = "/student/dashboard";
        break;
    }
    
    if (dashboardUrl !== "/" && pathname !== "/hero-ai") {
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Teacher routes
  if (pathname.startsWith("/teacher")) {
    if (!token || (token.role !== "TEACHER" && token.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Student routes
  if (pathname.startsWith("/student")) {
    if (!token || (token.role !== "STUDENT" && token.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Hero AI results - require login
  if (pathname.startsWith("/hero-ai/results")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};