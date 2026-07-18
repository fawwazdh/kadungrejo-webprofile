import Link from "next/link";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Landmark,
  Leaf,
  Map,
  MapPin,
  Store,
  CalendarDays,
  Camera,
} from "lucide-react";
import { client } from "@/lib/sanity";

// --- Tipe Data ---
interface Berita {
  _id: string;
  judul: string;
  tanggal: string;
}

// --- Data Statis ---
const layanan = [
  {
    icon: ShieldCheck,
    title: "Administrasi Kependudukan",
    desc: "Layanan surat pengantar, KTP, dan KK.",
  },
  {
    icon: Landmark,
    title: "Transparansi Dana",
    desc: "Laporan penggunaan Anggaran Pendapatan Desa.",
  },
  {
    icon: Users,
    title: "Layanan Sosial",
    desc: "Pendataan bansos dan program kesejahteraan.",
  },
];

const potensi = [
  {
    icon: Leaf,
    title: "Pertanian & Perkebunan",
    desc: "Penghasil padi dan hasil bumi berkualitas tinggi.",
  },
  {
    icon: Store,
    title: "UMKM Lokal",
    desc: "Pusat kerajinan tangan dan makanan khas desa.",
  },
  {
    icon: Map,
    title: "Pariwisata Alam",
    desc: "Destinasi wisata sawah terasering dan sungai bersih.",
  },
];

export default async function Home() {
  const query =
    '*[_type == "berita"] | order(tanggal desc)[0...3] { _id, judul, tanggal }';
  const beritaTerbaru = await client.fetch<Berita[]>(query);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative bg-sage-800 text-sage-50 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596404988457-377038e1e793?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 text-gold-400 text-sm font-medium border border-gold-500/30 mb-6">
            Selamat Datang di Portal Resmi
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Desa Kadungrejo
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-sage-200 mb-10">
            Harmoni antara tradisi lokal dan inovasi digital. Menuju desa
            mandiri, transparan, dan sejahtera untuk seluruh warga.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/layanan"
              className="bg-gold-500 hover:bg-gold-600 text-sage-900 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Layanan Warga
            </Link>
            <Link
              href="/profil"
              className="bg-sage-700 hover:bg-sage-600 text-white font-bold py-3 px-6 rounded-lg border border-sage-500 transition-colors"
            >
              Kenali Desa
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEKILAS TENTANG DESA */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900 mb-6">
            Tumbuh Bersama Kearifan Lokal
          </h2>
          <p className="text-sage-700 leading-relaxed mb-4">
            Desa Kadungrejo adalah desa agraris yang menjunjung tinggi semangat
            gotong royong. Dengan potensi alam yang melimpah dan SDM yang terus
            berkembang, kami berkomitmen menjadi desa percontohan di tingkat
            kabupaten.
          </p>
          <p className="text-sage-700 leading-relaxed mb-8">
            Portal ini hadir sebagai jembatan komunikasi antara pemerintah desa
            dan masyarakat, memastikan setiap informasi tersampaikan dengan
            cepat, akurat, dan transparan.
          </p>
          <Link
            href="/profil"
            className="inline-flex items-center gap-2 text-sage-700 font-semibold hover:text-sage-900 group"
          >
            Baca Profil Lengkap{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-sage-200 h-48 rounded-2xl"></div>{" "}
          {/* Placeholder Gambar */}
          <div className="bg-sage-300 h-48 rounded-2xl mt-8"></div>{" "}
          {/* Placeholder Gambar */}
        </div>
      </section>

      {/* 3. LAYANAN DESA */}
      <section className="bg-sage-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-sage-900">
              Layanan Prima
            </h2>
            <p className="mt-4 text-sage-600">
              Pelayanan publik yang mudah, cepat, dan terdigitalisasi.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {layanan.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-sage-100 hover:-translate-y-1 transition-transform"
              >
                <div className="bg-sage-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="h-7 w-7 text-sage-700" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-sage-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POTENSI DESA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-sage-900">
              Potensi Desa
            </h2>
            <p className="mt-2 text-sage-600">
              Mendorong kemandirian ekonomi dari sumber daya lokal.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {potensi.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-sage-800 p-8 h-64 flex flex-col justify-end border border-sage-700 hover:border-gold-500 transition-colors"
            >
              <item.icon className="h-8 w-8 text-gold-400 mb-4 opacity-80" />
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sage-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BERITA & PENGUMUMAN (Tarik dari Sanity) */}
      <section className="bg-sage-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-sage-900">
                Kabar Desa
              </h2>
              <p className="mt-2 text-sage-600">
                Informasi dan pengumuman terbaru.
              </p>
            </div>
            <Link
              href="/berita"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-900"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {beritaTerbaru.length === 0 ? (
              <p className="col-span-full text-sage-600">
                Belum ada kabar terbaru.
              </p>
            ) : (
              beritaTerbaru.map((item) => (
                <Link
                  href={`/berita/${item._id}`}
                  key={item._id}
                  className="block group"
                >
                  <article className="bg-white p-6 rounded-2xl shadow-sm border border-sage-200 hover:border-sage-400 transition-colors h-full flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-medium text-sage-500 mb-4">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="font-display text-lg font-bold text-sage-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {item.judul}
                    </h3>
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. GALERI & PETA DESA */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Galeri Singkat */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-2xl font-bold text-sage-900">
              Galeri Kegiatan
            </h2>
            <Link href="/galeri" className="text-sage-600 hover:text-sage-900">
              <Camera className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* 4 Kotak Placeholder Gambar */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-sage-200 rounded-xl hover:opacity-80 cursor-pointer transition-opacity"
              ></div>
            ))}
          </div>
        </div>

        {/* Peta Desa */}
        <div>
          <h2 className="font-display text-2xl font-bold text-sage-900 mb-8">
            Lokasi Kami
          </h2>
          <div className="w-full h-[400px] bg-sage-200 rounded-2xl overflow-hidden border border-sage-300 flex items-center justify-center">
            {/* Nantinya di sini diisi iframe Google Maps */}
            <p className="text-sage-600 font-medium flex flex-col items-center gap-2">
              <MapPin className="h-8 w-8 text-sage-500" />
              Embed Google Maps Desa Kadungrejo
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
