"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Shield, PhoneCall, MapPin } from "lucide-react";

// Tipe data untuk menampung kiriman dari Sanity
interface Pengaturan {
  namaDesa?: string;
  kecamatan?: string;
  kabupaten?: string;
  logoUrl?: string | null;
}

export default function Navbar({ pengaturan }: { pengaturan?: Pengaturan | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Berita & Kabar", href: "/berita" },
    { name: "Profil Desa", href: "/profil" },
    { name: "Galeri", href: "/galeri" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#e8ede6]/95 backdrop-blur-md border-b border-[#c8d4c4] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between w-full h-20">
          
          {/* LOGO & NAMA DESA DINAMIS DARI SANITY CMS */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 max-w-[70%] sm:max-w-none">
            {pengaturan?.logoUrl ? (
              <img
                src={pengaturan.logoUrl}
                alt="Logo Desa"
                className="w-11 h-11 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[#142010] flex items-center justify-center text-[#eab308] font-bold shadow-md shrink-0">
                <Shield className="h-6 w-6 fill-current" />
              </div>
            )}
            
            <div className="truncate">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wide block leading-none text-[#142010] truncate">
                Desa {pengaturan?.namaDesa || "Kadungrejo"}
              </span>
              <span className="text-xs text-[#4a6342] font-semibold mt-1 block truncate">
                Kec. {pengaturan?.kecamatan || "Baureno"}, Kab. {pengaturan?.kabupaten || "Bojonegoro"}
              </span>
            </div>
          </Link>

          {/* Menu Desktop (Layar PC) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-base font-bold text-[#2c3f22] hover:text-[#142010] hover:bg-[#d0dcd0] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/kontak"
              className="ml-4 bg-[#142010] hover:bg-[#2c3f22] text-[#eab308] font-extrabold px-6 py-2.5 rounded-full transition-all shadow-md flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Kontak</span>
            </Link>
          </nav>

          {/* Tombol Mobile Hamburger */}
          <div className="flex md:hidden items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-3 rounded-xl bg-[#142010] text-[#eab308] hover:bg-[#2c3f22] font-black shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#142010]"
              aria-label="Buka Menu"
            >
              {isOpen ? (
                <X className="h-7 w-7 stroke-[3]" />
              ) : (
                <Menu className="h-7 w-7 stroke-[3]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Dropdown Menu HP */}
      {isOpen && (
        <div className="md:hidden bg-[#142010] border-t border-[#2c3f22] px-4 pt-4 pb-6 space-y-2 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3.5 rounded-xl text-lg font-bold text-white bg-[#20331a] hover:bg-[#eab308] hover:text-[#142010] transition-all"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-[#2c3f22]">
            <Link
              href="/kontak"
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#eab308] hover:bg-yellow-500 text-[#142010] font-black py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
            >
              <PhoneCall className="h-6 w-6" />
              <span>Pusat Layanan Desa</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
