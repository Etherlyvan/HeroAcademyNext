// src/app/teacher/layout.tsx
import { requireTeacher } from "@/lib/auth-utils";
import Link from "next/link";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Users,
  Settings,
  ChevronRight
} from "lucide-react";

const teacherNavItems = [
  { href: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/classes", label: "Kelas Saya", icon: BookOpen },
  { href: "/teacher/assignments", label: "Tugas", icon: FileText },
  { href: "/teacher/students", label: "Siswa", icon: Users },
  { href: "/teacher/settings", label: "Pengaturan", icon: Settings },
];

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireTeacher();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-card border-r border-border">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground">Teacher Panel</h2>
              <p className="text-sm text-muted-foreground">Hero Academy</p>
            </div>
            <nav className="flex-1 px-2 space-y-1">
              {teacherNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                  <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <main className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}