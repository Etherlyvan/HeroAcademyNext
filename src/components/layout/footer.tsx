import Link from "next/link";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">H</span>
              </div>
              <span className="text-xl font-bold text-white">Hero Academy</span>
            </div>
            <p className="text-gray-400">
              Platform pembelajaran AI yang membantu siswa dan guru mencapai
              potensi terbaik mereka.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tentang</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Fitur</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/hero-ai" className="hover:text-white transition-colors">
                  Hero AI
                </Link>
              </li>
              <li>
                <Link href="/kelas" className="hover:text-white transition-colors">
                  Kelas Online
                </Link>
              </li>
              <li>
                <Link href="/try-out" className="hover:text-white transition-colors">
                  Try Out
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Analisa Belajar
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-300 hover:text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
              >
                <Youtube className="w-5 h-5 text-gray-300 hover:text-destructive-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="text-center text-white">
          <p>&copy; 2025 Hero Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}