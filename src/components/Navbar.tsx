"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Profil Desa", path: "/profil" },
    { name: "Pemerintahan", path: "/pemerintahan" },
    { name: "FAQ", path: "/faq" },
    { name: "Berita", path: "/berita" },
    { name: "Galeri", path: "/galeri" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-sage-50/90 backdrop-blur-md border-b border-sage-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-sage-700 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-sage-900 tracking-tight">
              Desa Kadungrejo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? "bg-sage-200 text-sage-900"
                    : "text-sage-700 hover:bg-sage-100 hover:text-sage-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Search Icon */}
            <button className="ml-2 p-2 text-sage-600 hover:bg-sage-200 rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button className="p-2 text-sage-600 hover:bg-sage-200 rounded-full">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sage-700 hover:text-sage-900 p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-sage-50 border-t border-sage-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path
                    ? "bg-sage-200 text-sage-900"
                    : "text-sage-700 hover:bg-sage-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
