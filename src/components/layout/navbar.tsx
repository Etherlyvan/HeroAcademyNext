// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  LogOut, 
  User as UserIcon,
  GraduationCap,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavItems = () => {
    // Jika belum login, tampilkan menu publik
    if (!session?.user) {
      return [
        { path: "/", label: "Beranda", icon: null },
        { path: "/hero-ai", label: "Hero AI", icon: null },
        { path: "/kelas", label: "Kelas", icon: null },
        { path: "/try-out", label: "Try Out", icon: null },
        { path: "/tentang-kami", label: "Tentang Kami", icon: null },
      ];
    }

    // Jika sudah login, tidak perlu menu navigasi karena sudah ada di sidebar
    return [];
  };

  const navItems = getNavItems();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const getNavLinkClass = (path: string) => {
    return `font-medium transition-colors px-3 py-2 rounded-md flex items-center gap-2 ${
      isActive(path)
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
    }`;
  };

  const getMobileNavLinkClass = (path: string) => {
    return `block px-4 py-3 text-base font-medium transition-colors flex items-center gap-3 ${
      isActive(path)
        ? "text-primary bg-primary/10 border-l-4 border-primary"
        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
    }`;
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getRoleBadge = (role?: string) => {
    if (!role) return null;
    
    const badges = {
      ADMIN: { label: "Admin", color: "bg-red-500" },
      TEACHER: { label: "Guru", color: "bg-blue-500" },
      STUDENT: { label: "Siswa", color: "bg-green-500" },
      GUEST: { label: "Tamu", color: "bg-gray-500" },
    };

    const badge = badges[role as keyof typeof badges];
    if (!badge) return null;

    return (
      <span className={`text-xs px-2 py-0.5 rounded-full text-white ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getDashboardLink = () => {
    if (!session?.user) return null;
    
    const role = session.user.role;
    const dashboardLinks = {
      ADMIN: { path: "/admin/dashboard", label: "Admin Panel", icon: LayoutDashboard },
      TEACHER: { path: "/teacher/dashboard", label: "Dashboard Guru", icon: LayoutDashboard },
      STUDENT: { path: "/student/dashboard", label: "Dashboard Siswa", icon: LayoutDashboard },
    };

    return dashboardLinks[role as keyof typeof dashboardLinks] || null;
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">Hero Academy</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const dashboardLink = getDashboardLink();

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-background/80 backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href={session?.user ? (dashboardLink?.path || "/") : "/"} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">Hero Academy</span>
          </Link>

          {/* Desktop Navigation - Hanya tampil jika belum login */}
          {!session?.user && (
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={getNavLinkClass(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Auth Buttons / User Info */}
          <div className="hidden lg:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
                <div className="w-20 h-9 bg-muted animate-pulse rounded-md"></div>
              </div>
            ) : session?.user ? (
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted/50">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium max-w-[150px] truncate">
                      {session.user.name || session.user.email}
                    </span>
                    {getRoleBadge(session.user.role)}
                  </div>
                </div>
                
                <Button variant="outline" onClick={handleSignOut} size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Keluar
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="gap-2">
                    <UserIcon className="w-4 h-4" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border animate-in slide-in-from-top-5">
            {/* Menu navigasi hanya tampil jika belum login */}
            {!session?.user && navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={getMobileNavLinkClass(item.path)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className={`px-4 space-y-3 ${!session?.user ? 'pt-4 border-t border-border' : ''}`}>
              {status === "loading" ? (
                <div className="w-full h-9 bg-muted animate-pulse rounded-md"></div>
              ) : session?.user ? (
                <>
                  {/* User Profile Card */}
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-medium">
                        {session.user.name || "User"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {session.user.email}
                      </span>
                      {getRoleBadge(session.user.role)}
                    </div>
                  </div>

                  {/* Dashboard Link untuk Mobile */}
                  {dashboardLink && (
                    <Link 
                      href={dashboardLink.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <dashboardLink.icon className="w-4 h-4" />
                        {dashboardLink.label}
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <UserIcon className="w-4 h-4" />
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Daftar
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}