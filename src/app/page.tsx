import Link from "next/link";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Landmark,
  MapPin,
  CalendarDays,
  Camera,
  Leaf,
  Sparkles,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import { client } from "@/lib/sanity";

// --- Tipe Data ---
interface BerandaData {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  tentangImage1Url: string;
  tentangImage2Url: string;
}

interface Berita {
  _id: string;
  judul: string;
  tanggal: string;
  slug: string;
  gambarUrl?: string;
}

interface Galeri {
  _id: string;
  judul: string;
  gambarUrl: string;
}

interface Potensi {
  _id: string;
  judul: string;
  deskripsi: string;
  gambarUrl: string | null;
}

const layanan = [
  {
    icon: ShieldCheck,
    title: "Administrasi Kependudukan",
    desc: "Layanan surat pengantar, KTP, KK, dan akta kelahiran secara cepat, mudah, dan transparan untuk seluruh warga.",
    badge: "Layanan Utama",
  },
  {
    icon: Landmark,
    title: "Transparansi Dana Desa",
    desc: "Akses informasi terbuka untuk publik mengenai laporan penggunaan Anggaran Pendapatan dan Belanja Desa (APBDes).",
    badge: "Akuntabel",
  },
  {
    icon: Users,
    title: "Kesejahteraan & Sosial",
    desc: "Informasi pendataan bantuan sosial, program kesehatan lansia & balita, serta kegiatan pemberdayaan masyarakat.",
    badge: "Masyarakat",
  },
];

export default async function Home() {
  const berandaQuery = `*[_type == "beranda"][0] { 
    heroTitle, heroSubtitle, "heroImageUrl": heroImage.asset->url, 
    "tentangImage1Url": tentangImage1.asset->url, "tentangImage2Url": tentangImage2.asset->url 
  }`;

  const beritaQuery =
    '*[_type == "berita"] | order(tanggal desc)[0...3] { _id, "slug": slug.current, judul, tanggal, "gambarUrl": gambar.asset->url }';

  const galeriQuery =
    '*[_type == "galeri"] | order(_createdAt desc)[0...4] { _id, judul, "gambarUrl": gambar.asset->url }';

  const potensiQuery =
    '*[_type == "potensi"] | order(_createdAt asc) { _id, judul, deskripsi, "gambarUrl": gambar.asset->url }';

  let beranda: BerandaData | null = null;
  let beritaTerbaru: Berita[] = [];
  let galeriData: Galeri[] = [];
  let potensiData: Potensi[] = [];

  try {
    [beranda, beritaTerbaru, galeriData, potensiData] = await Promise.all([
      client.fetch<BerandaData>(berandaQuery),
      client.fetch<Berita[]>(beritaQuery),
      client.fetch<Galeri[]>(galeriQuery),
      client.fetch<Potensi[]>(potensiQuery),
    ]);
  } catch (error) {
    console.error("Gagal mengambil data dari Sanity:", error);
  }

  return (
    <div className="min-h-screen bg-sage-50/70 text-sage-950 overflow-hidden font-sans">
      {/* =========================================================================
          1. HERO SECTION (Desain Modern yang Mudah Dibaca)
      ========================================================================= */}
      <section className="relative pt-4 pb-12 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-sage-300/40 via-gold-300/20 to-sage-400/30 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div
          className="relative min-h-[80vh] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-6 sm:p-12 md:p-16 border border-white/40 shadow-2xl"
          style={{
            backgroundImage: beranda?.heroImageUrl
              ? `linear-gradient(to bottom, rgba(20, 31, 16, 0.55), rgba(15, 23, 12, 0.9)), url(${beranda.heroImageUrl})`
              : "linear-gradient(to bottom, #2c3f22, #182312)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="h-4 w-4 text-gold-400 animate-pulse" />
              <span>Portal Digital Resmi Pemerintah Desa</span>
            </div>
          </div>

          <div className="max-w-3xl my-auto py-10">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 drop-shadow-md">
              {beranda?.heroTitle || "Desa Kadungrejo"}
            </h1>
            {/* Font diperbesar ke text-lg sm:text-xl agar ramah lansia */}
            <p className="text-lg sm:text-xl md:text-2xl text-sage-100 font-medium leading-relaxed max-w-2xl mb-8 drop-shadow">
              {beranda?.heroSubtitle ||
                "Harmoni antara kearifan tradisi lokal dan inovasi pelayanan digital menuju masyarakat desa yang mandiri, transparan, dan sejahtera."}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/kontak"
                className="w-full sm:w-auto text-center bg-gold-500 hover:bg-gold-600 text-sage-950 font-extrabold text-lg py-4 px-8 rounded-full shadow-lg shadow-gold-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Akses Layanan Desa</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/profil"
                className="w-full sm:w-auto text-center bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-lg py-4 px-8 rounded-full border border-white/30 transition-all flex items-center justify-center"
              >
                Kenali Desa Kami
              </Link>
            </div>
          </div>

          {/* Info Widget di Bawah Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/20 text-white">
            <div className="flex items-center gap-3 bg-sage-950/50 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="p-3 rounded-xl bg-gold-400 text-sage-950 font-bold">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-base">100% Digital</div>
                <div className="text-xs sm:text-sm text-sage-200">
                  Pelayanan Surat & Data
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-sage-950/50 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="p-3 rounded-xl bg-sage-400 text-sage-950 font-bold">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-base">Agraris Modern</div>
                <div className="text-xs sm:text-sm text-sage-200">
                  Potensi Alam & UMKM
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-sage-950/50 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="p-3 rounded-xl bg-white text-sage-950 font-bold">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-base">Jam Pelayanan</div>
                <div className="text-xs sm:text-sm text-sage-200">
                  Senin - Jumat (08.00 - 15.00)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. KABAR DESA / BERITA TERBARU (DIPINDAH KE ATAS SINI & TEKS LEBIH BESAR)
      ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-sage-200 pb-6">
          <div>
            <span className="text-sm font-extrabold tracking-widest text-gold-600 uppercase bg-gold-400/15 px-4 py-1.5 rounded-full border border-gold-400/30 mb-3 inline-block">
              Informasi Publik
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-sage-950 tracking-tight">
              Kabar & Berita Desa
            </h2>
          </div>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-base font-extrabold text-sage-900 hover:text-gold-600 transition-colors bg-white px-6 py-3 rounded-full border-2 border-sage-300 shadow-sm shrink-0 group"
          >
            <span>Lihat Seluruh Berita</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beritaTerbaru.length === 0 ? (
            <p className="col-span-full text-sage-800 font-medium text-center py-16 bg-white rounded-3xl border-2 border-sage-200 text-lg">
              Belum ada kabar terbaru yang dipublikasikan saat ini.
            </p>
          ) : (
            beritaTerbaru.map((item) => (
              <Link
                href={`/berita/${item.slug || item._id}`}
                key={item._id}
                className="block group"
              >
                {/* Latar Kartu Berita 100% Putih Pekat agar Super Jelas Dibaca */}
                <article className="bg-white p-5 sm:p-6 rounded-[2rem] border-2 border-sage-200 hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-full aspect-[16/10] bg-sage-200 rounded-2xl overflow-hidden mb-5 relative">
                      {item.gambarUrl ? (
                        <img
                          src={item.gambarUrl}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-sage-800 text-sage-300 font-bold text-sm">
                          Desa Kadungrejo
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-sage-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        Berita
                      </div>
                    </div>

                    {/* Meta tanggal lebih besar & pekat */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-sage-600 mb-3">
                      <span className="text-sage-900 font-bold">
                        Admin Desa
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1.5 text-sage-800">
                        <CalendarDays className="h-4 w-4 text-gold-600" />
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Judul Artikel Diperbesar ke text-xl sm:text-2xl */}
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-sage-950 group-hover:text-gold-600 transition-colors leading-snug line-clamp-2 mb-4">
                      {item.judul}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-sage-200 flex items-center justify-between text-base font-extrabold text-sage-800 group-hover:text-gold-600">
                    <span>Baca selengkapnya</span>
                    <span className="group-hover:translate-x-2 transition-transform text-lg">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* =========================================================================
          3. LAYANAN PRIMA DESA (Teks Deskripsi Diperjelas)
      ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-extrabold tracking-widest text-gold-600 uppercase bg-gold-400/15 px-4 py-1.5 rounded-full border border-gold-400/30 mb-3 inline-block">
            Pelayanan Publik
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-sage-950 tracking-tight">
            Layanan Desa Terintegrasi
          </h2>
          {/* Font deskripsi layanan diperbesar ke text-lg */}
          <p className="mt-4 text-sage-800 text-base sm:text-lg font-medium leading-relaxed">
            Mengutamakan kemudahan, kecepatan, dan transparansi bagi seluruh
            warga Desa Kadungrejo melalui digitalisasi sistem administrasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {layanan.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2rem] border-2 border-sage-200/80 hover:border-sage-400 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-sage-900 text-white flex items-center justify-center shadow-md">
                    <item.icon className="h-8 w-8 text-gold-400" />
                  </div>
                  <span className="text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-900 border border-sage-300">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-sage-950 mb-3">
                  {item.title}
                </h3>
                {/* Deskripsi kartu ramah lansia: text-base (16px), font-medium, warna gelap */}
                <p className="text-sage-800 text-base font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 text-base font-extrabold text-sage-900 hover:text-gold-600 transition-colors pt-4 border-t border-sage-200"
              >
                <span>Ajukan Permohonan</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. TENTANG DESA (Bento Grid - Kontras Lebih Jelas)
      ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white border-2 border-sage-200 rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 text-sage-950 text-sm font-extrabold uppercase tracking-wider border border-sage-300">
                <Leaf className="h-4 w-4 text-sage-700" />
                <span>Profil Singkat</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-sage-950 leading-tight">
                Tumbuh Bersama Kearifan Lokal
              </h2>
              {/* Ukuran paragraf diperbesar ke text-lg */}
              <p className="text-sage-800 font-medium leading-relaxed text-base sm:text-lg">
                Desa Kadungrejo merupakan desa agraris yang menjunjung tinggi
                nilai gotong royong. Dengan potensi alam yang melimpah dan
                sumber daya manusia yang terus berkembang, kami berkomitmen
                menjadi desa percontohan yang mandiri secara ekonomi dan
                terdepan dalam pelayanan digital.
              </p>
              <div className="pt-2">
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-3 bg-sage-900 hover:bg-sage-800 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg transition-all group"
                >
                  <span>Baca Profil Lengkap</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-gold-400" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-3xl overflow-hidden shadow-md relative">
                  {beranda?.tentangImage1Url ? (
                    <img
                      src={beranda.tentangImage1Url}
                      alt="Kegiatan Desa 1"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-sage-200 flex items-center justify-center text-sage-700 font-bold">
                      Foto Desa 1
                    </div>
                  )}
                </div>
                <div className="bg-sage-900 text-white p-6 rounded-3xl shadow-md">
                  <div className="text-3xl font-extrabold text-gold-400 font-display">
                    Gotong
                  </div>
                  <div className="text-base font-semibold text-sage-200 mt-1">
                    Royong Warga
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:pt-8">
                <div className="bg-gold-500 text-sage-950 p-6 rounded-3xl shadow-md">
                  <div className="text-sm font-extrabold uppercase tracking-wider">
                    Visi Utama
                  </div>
                  <div className="text-xl font-extrabold font-display mt-1 leading-snug">
                    "Maju, Mandiri, & Berbudaya"
                  </div>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden shadow-md relative">
                  {beranda?.tentangImage2Url ? (
                    <img
                      src={beranda.tentangImage2Url}
                      alt="Kegiatan Desa 2"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-sage-300 flex items-center justify-center text-sage-800 font-bold">
                      Foto Desa 2
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. POTENSI DESA (Menggunakan Hex Code #142010 dijamin 100% Gelap & Jelas)
      ========================================================================= */}
      <section className="py-20 my-10 bg-[#142010] text-white relative shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b border-gray-700 pb-8">
            <div className="max-w-3xl">
              <span className="text-sm font-extrabold tracking-widest text-[#eab308] uppercase mb-3 block">
                Kemandirian Ekonomi
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Potensi & Unggulan Desa
              </h2>
              <p className="mt-4 text-gray-200 text-base sm:text-lg font-medium leading-relaxed">
                Mengembangkan sumber daya alam lokal dan kreativitas UMKM warga
                untuk mendongkrak perekonomian desa yang berkelanjutan.
              </p>
            </div>
          </div>

          {potensiData.length === 0 ? (
            <p className="text-gray-300 font-medium text-center py-12 bg-[#1a2b15] rounded-3xl border border-gray-700 text-lg">
              Belum ada data potensi desa yang ditambahkan.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {potensiData.map((item) => (
                <div
                  key={item._id}
                  className="bg-white text-[#142010] rounded-[2.5rem] border-4 border-gray-200 hover:border-[#eab308] transition-all duration-300 flex flex-col overflow-hidden shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Foto Unggulan */}
                  <div className="h-60 w-full bg-gray-200 overflow-hidden relative shrink-0">
                    {item.gambarUrl ? (
                      <img
                        src={item.gambarUrl}
                        alt={item.judul}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1a2b15]">
                        <Leaf className="h-12 w-12 text-[#eab308]" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#142010] text-[#eab308] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      Unggulan
                    </div>
                  </div>

                  {/* Bantalan Kartu Lebih Luas Agar Teks Tidak Terpotong */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-white">
                    <div className="mb-6">
                      <h3 className="font-display text-2xl font-extrabold text-[#142010] mb-3 leading-snug">
                        {item.judul}
                      </h3>
                      {/* Deskripsi warna gelap pekat & line-clamp dihapus/diperbesar */}
                      <p className="text-gray-700 text-base font-normal leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-base font-extrabold text-[#142010] group-hover:text-[#eab308]">
                      <span>Eksplorasi Potensi</span>
                      <span className="text-xl font-bold">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. GALERI & LOKASI
      ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-sage-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-extrabold text-gold-600 uppercase tracking-wider block mb-1">
                    Dokumentasi
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-sage-950">
                    Galeri Kegiatan
                  </h2>
                </div>
                <Link
                  href="/galeri"
                  className="p-3.5 rounded-full bg-sage-100 hover:bg-gold-400 text-sage-900 font-bold transition-colors"
                >
                  <Camera className="h-6 w-6" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 my-4">
                {galeriData.length > 0
                  ? galeriData.map((item) => (
                      <div
                        key={item._id}
                        className="relative aspect-square rounded-2xl overflow-hidden shadow-sm"
                      >
                        <img
                          src={item.gambarUrl}
                          alt={item.judul || "Galeri Desa"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  : [1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-sage-200 rounded-2xl"
                      />
                    ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-sage-200 flex justify-end">
              <Link
                href="/galeri"
                className="text-sm font-extrabold text-sage-900 hover:text-gold-600 inline-flex items-center gap-1.5"
              >
                <span>Buka album galeri desa</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-sage-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-extrabold text-gold-600 uppercase tracking-wider block mb-1">
                    Peta Wilayah
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-sage-950">
                    Lokasi Kami
                  </h2>
                </div>
                <div className="p-3.5 rounded-full bg-sage-100 text-sage-900 font-bold">
                  <MapPin className="h-6 w-6 text-gold-600" />
                </div>
              </div>

              <div className="w-full h-[280px] sm:h-[320px] bg-sage-200 rounded-3xl overflow-hidden border-2 border-sage-300 relative shadow-inner">
                <iframe
                  src="https://maps.google.com/maps?q=Desa%20Kadungrejo,%20Kecamatan%20Baureno,%20Bojonegoro&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-sage-200 flex items-center justify-between text-sm text-sage-800 font-bold">
              <span>Kec. Baureno, Kab. Bojonegoro</span>
              <a
                href="https://maps.google.com/?q=Desa+Kadungrejo,+Baureno,+Bojonegoro"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-sage-950 hover:text-gold-600 underline underline-offset-4 inline-flex items-center gap-1.5"
              >
                <span>Buka Google Maps</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}