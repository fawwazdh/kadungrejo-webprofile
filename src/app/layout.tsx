import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { MapPin, Phone, Mail } from "lucide-react";
// 1. IMPORT NAVBAR SUDAH ADA
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// =========================================================================
// OPTIMASI SEO GLOBAL (Template Judul, Keywords, & OpenGraph)
// =========================================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://kadungrejo.desa.id"),
  title: {
    default: "Desa Kadungrejo - Kec. Baureno, Kab. Bojonegoro",
    template: "%s | Desa Kadungrejo",
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
  let pengaturan: Pengaturan | null = null;

  try {
    const query =
      '*[_type == "pengaturanUmum"][0] { ..., "logoUrl": logo.asset->url }';
    pengaturan = await client.fetch<Pengaturan>(query);
  } catch (error) {
    console.error(
      "Gagal mengambil data pengaturan dari Sanity (Cek koneksi internet):",
      error,
    );
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
        {/* 2. TAG <header> LAMA DIHAPUS DAN DIGANTI DENGAN INI: */}
        <Navbar pengaturan={pengaturan} />

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
