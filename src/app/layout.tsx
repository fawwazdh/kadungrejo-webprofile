import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { MapPin, Phone, Mail, Search } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// =========================================================================
// OPTIMASI SEO GLOBAL (Template Judul, Keywords, & OpenGraph)
// =========================================================================
export const metadata: Metadata = {
  // metadataBase wajib ada agar sistem preview gambar/link di WA & Google bekerja sempurna
  metadataBase: new URL("https://kadungrejo.desa.id"), // Nanti bisa diganti dengan domain asli desa saat online
  title: {
    default: "Desa Kadungrejo - Kec. Baureno, Kab. Bojonegoro",
    template: "%s | Desa Kadungrejo", // %s akan otomatis diganti nama halaman (misal: "Profil | Desa Kadungrejo")
  },
  description:
    "Portal resmi Pemerintah Desa Kadungrejo, Kecamatan Baureno, Kabupaten Bojonegoro, Jawa Timur. Mewujudkan pemerintahan yang transparan, akuntabel, inovatif, dan melayani masyarakat.",
  keywords: [
    "Desa Kadungrejo",
    "Kadungrejo",
    "Baureno",
    "Bojonegoro",
    "Jawa Timur",
    "Website Desa",
    "Portal Desa",
    "Pemerintahan Desa",
    "Layanan Warga",
  ],
  authors: [{ name: "Pemerintah Desa Kadungrejo" }],
  openGraph: {
    title: "Desa Kadungrejo - Kec. Baureno, Kab. Bojonegoro",
    description:
      "Portal resmi Pemerintah Desa Kadungrejo. Pusat informasi, layanan publik, berita terbaru, dan potensi desa.",
    url: "https://kadungrejo.desa.id",
    siteName: "Portal Resmi Desa Kadungrejo",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Kadungrejo - Kec. Baureno, Kab. Bojonegoro",
    description:
      "Portal resmi Pemerintah Desa Kadungrejo, Kecamatan Baureno, Kabupaten Bojonegoro.",
  },
};

interface Pengaturan {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  logoUrl: string | null;
  deskripsiFooter: string;
  alamat: string;
  telepon: string;
  email: string;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // PENGAMAN: Gunakan try...catch agar web tidak crash saat offline/error
  let pengaturan: Pengaturan | null = null;

  try {
    const query =
      '*[_type == "pengaturanUmum"][0] { ..., "logoUrl": logo.asset->url }';
    pengaturan = await client.fetch<Pengaturan>(query);
  } catch (error) {
    console.error(
      "Gagal mengambil data pengaturan dari Sanity (Cek koneksi internet):",
      error
    );
    // Web akan otomatis menggunakan teks fallback (Desa Kadungrejo) di bawah
  }

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil Desa", href: "/profil" },
    { name: "Pemerintahan", href: "/pemerintahan" },
    { name: "FAQ", href: "/faq" },
    { name: "Berita", href: "/berita" },
    { name: "Galeri", href: "/galeri" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <html lang="id">
      <body className={inter.className}>
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-[#e8efe9] border-b border-sage-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Logo & Nama Desa Dinamis */}
            <Link href="/" className="flex items-center gap-4 group">
              {pengaturan?.logoUrl ? (
                <img
                  src={pengaturan.logoUrl}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="bg-sage-800 text-white p-2.5 rounded-xl">
                  <MapPin className="h-7 w-7" />
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="font-display font-extrabold text-xl md:text-2xl text-sage-900 group-hover:text-sage-700 transition-colors">
                  Desa {pengaturan?.namaDesa || "Kadungrejo"}
                </h1>
                <p className="text-xs md:text-sm font-medium text-sage-600">
                  Kec. {pengaturan?.kecamatan || "Baureno"}, Kab.{" "}
                  {pengaturan?.kabupaten || "Bojonegoro"}
                </p>
              </div>
            </Link>

            {/* Menu Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-sage-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-gold-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button className="text-sage-700 hover:text-sage-900">
                <Search className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </header>

        {/* KONTEN UTAMA */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER DINAMIS */}
        <footer className="bg-sage-900 text-sage-200 py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-gold-500" />
                <h3 className="font-display font-bold text-white text-2xl">
                  Desa {pengaturan?.namaDesa || "Kadungrejo"}
                </h3>
              </div>
              <p className="text-sage-300 leading-relaxed mb-6">
                {pengaturan?.deskripsiFooter ||
                  "Website resmi pemerintah desa untuk mewujudkan transparansi informasi dan pelayanan publik yang lebih baik."}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">
                Hubungi Kami
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sage-400 shrink-0 mt-0.5" />
                  <span>{pengaturan?.alamat || "Jl. Raya Desa No. 1"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-sage-400" />
                  <span>{pengaturan?.telepon || "(0341) 000-000"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-sage-400" />
                  <span>{pengaturan?.email || "info@desa.id"}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">
                Tautan Cepat
              </h4>
              <ul className="space-y-3">
                {navLinks.slice(1, 6).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-gold-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-sage-800 text-center text-sm text-sage-500">
            &copy; {new Date().getFullYear()} Pemerintah Desa{" "}
            {pengaturan?.namaDesa || "Kadungrejo"}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}