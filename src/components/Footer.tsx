import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-100 py-12 border-t-4 border-gold-500">
      <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-justify">
        <div>
          <h3 className="font-display text-2xl font-bold text-white mb-4">
            Desa Kadungrejo
          </h3>
          <p className="text-sm text-sage-300 leading-relaxed">
            Portal informasi resmi Pemerintah Desa Kadungrejo. Wujud
            transparansi dan digitalisasi layanan untuk masyarakat yang lebih
            terhubung dan mandiri.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Kontak
          </h4>
          <ul className="space-y-3 text-sm text-sage-300">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-gold-500" /> Jl. Raya
              Kadungrejo No. 1, Kec. Contoh, Kab. Contoh, 60000
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-500" /> (0341) 000-000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-500" /> info@kadungrejo.desa.id
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Akses Cepat
          </h4>
          <ul className="space-y-2 text-sm text-sage-300">
            <li>
              <Link
                href="/profil"
                className="hover:text-gold-400 transition-colors"
              >
                Profil Desa
              </Link>
            </li>
            <li>
              <Link
                href="/layanan"
                className="hover:text-gold-400 transition-colors"
              >
                Layanan Mandiri
              </Link>
            </li>
            <li>
              <Link
                href="/berita"
                className="hover:text-gold-400 transition-colors"
              >
                Berita & Pengumuman
              </Link>
            </li>
            <li>
              <Link
                href="/pemerintahan"
                className="hover:text-gold-400 transition-colors"
              >
                Struktur Pemerintahan
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-sage-800 text-center">
        <p className="text-xs text-sage-400">
          © {new Date().getFullYear()} Pemerintah Desa Kadungrejo. Seluruh hak
          cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
