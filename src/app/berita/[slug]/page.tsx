import Link from "next/link";
import { CalendarDays, Home, User, Eye, Newspaper } from "lucide-react";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import ViewCounter from "@/components/ViewCounter";

// Menggunakan parameter 'slug', bukan lagi 'id'
type Props = {
  params: Promise<{ slug: string }>;
};

interface DetailBerita {
  _id: string;
  judul: string;
  tanggal: string;
  penulis: string;
  dilihat: number;
  konten: any;
  gambarUrl: string | null;
}

interface BeritaSidebar {
  _id: string;
  judul: string;
  tanggal: string;
  slug: string;
  dilihat: number;
  gambarUrl: string | null;
}

// =========================================================================
// 1. GENERATE METADATA: Untuk Preview WhatsApp, Facebook, dan Google SEO
// =========================================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const query = `*[_type == "berita" && slug.current == $slug][0]{ 
    judul, 
    "deskripsi": array::join(string::split(pt::text(konten), "")[0..150], "") + "...",
    "gambarUrl": gambar.asset->url 
  }`;
  const seoData = await client.fetch(query, { slug });

  if (!seoData) {
    return { title: "Berita Tidak Ditemukan" };
  }

  return {
    // 1. PERBAIKAN DI SINI: Cukup panggil seoData.judul (tanpa | Desa Kadungrejo)
    title: seoData.judul,
    description:
      seoData.deskripsi || "Berita terbaru dari Pemerintah Desa Kadungrejo.",
    openGraph: {
      title: seoData.judul,
      description:
        seoData.deskripsi || "Berita terbaru dari Pemerintah Desa Kadungrejo.",
      url: `https://kadungrejo.desa.id/berita/${slug}`,
      siteName: "Desa Kadungrejo",
      images: seoData.gambarUrl
        ? [
            {
              url: seoData.gambarUrl,
              width: 1200,
              height: 630,
              alt: seoData.judul,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.judul,
      description: seoData.deskripsi,
      images: seoData.gambarUrl ? [seoData.gambarUrl] : [],
    },
  };
}

// =========================================================================
// 2. HALAMAN UTAMA DETAIL BERITA
// =========================================================================
export default async function HalamanDetailBerita({ params }: Props) {
  const { slug } = await params;

  // Query dicari berdasarkan slug.current == $slug
  const queryBerita = `*[_type == "berita" && slug.current == $slug][0]{
    _id, judul, tanggal, penulis, dilihat, konten, "gambarUrl": gambar.asset->url
  }`;

  // Query sidebar juga diperbarui agar mengecualikan slug yang sedang dibuka
  const queryTerbaru = `*[_type == "berita" && slug.current != $slug] | order(tanggal desc)[0...5]{
    _id, judul, tanggal, "slug": slug.current, dilihat, "gambarUrl": gambar.asset->url
  }`;

  // Tambahkan opsi revalidate: 0 agar Next.js selalu menarik data paling live tanpa cache
  const [berita, beritaTerbaru] = await Promise.all([
    client.fetch<DetailBerita>(
      queryBerita,
      { slug },
      { next: { revalidate: 0 } },
    ),
    client.fetch<BeritaSidebar[]>(
      queryTerbaru,
      { slug },
      { next: { revalidate: 0 } },
    ),
  ]);

  if (!berita) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-sage-50">
        <h1 className="text-2xl font-bold text-sage-900 mb-4">
          Berita Tidak Ditemukan
        </h1>
        <Link
          href="/berita"
          className="text-gold-600 font-medium hover:underline"
        >
          Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-sage-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI (KONTEN UTAMA) */}
        <article className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-sage-200 p-6 md:p-10">
          {/* PASANG VIEW COUNTER DI SINI (Otomatis menambah angka di latar belakang) */}
          <ViewCounter id={berita._id} />
          <nav className="flex items-center gap-2 text-sm font-medium text-sage-600 mb-8">
            <Link href="/" className="hover:text-gold-600 transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <span>/</span>
            <Link
              href="/berita"
              className="hover:text-gold-600 transition-colors"
            >
              Berita Desa Kadungrejo
            </Link>
          </nav>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight mb-6">
            {berita.judul}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sage-100 pb-6 mb-8 text-sm text-sage-600 font-medium">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-sage-400" />
                {new Date(berita.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-sage-400" />
                Ditulis oleh{" "}
                <span className="text-sage-900">
                  {berita.penulis || "Administrator"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-sage-400" />
              Dilihat{" "}
              <span className="text-sage-900">{berita.dilihat || 0}</span> kali
            </div>
          </div>

          {berita.gambarUrl && (
            <img
              src={berita.gambarUrl}
              alt={berita.judul}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-10 shadow-sm"
            />
          )}

          {berita.konten ? (
            <div className="prose prose-sage prose-lg max-w-none text-sage-800 leading-relaxed">
              <PortableText value={berita.konten} />
            </div>
          ) : (
            <div className="text-center py-10 bg-sage-50 rounded-2xl border border-dashed border-sage-300">
              <Newspaper className="h-10 w-10 text-sage-300 mx-auto mb-3" />
              <p className="text-sage-500 italic">
                Isi berita belum ditambahkan.
              </p>
            </div>
          )}
        </article>

        {/* KOLOM KANAN (SIDEBAR REKOMENDASI) */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-sage-200 p-6 sticky top-28">
            <h3 className="font-display text-xl font-bold text-sage-900 mb-6 border-b border-sage-100 pb-4">
              Berita Terbaru
            </h3>

            <div className="space-y-6">
              {beritaTerbaru.length === 0 ? (
                <p className="text-sm text-sage-500 text-center">
                  Belum ada berita lain.
                </p>
              ) : (
                beritaTerbaru.map((item) => (
                  <Link
                    href={`/berita/${item.slug || item._id}`}
                    key={item._id}
                    className="group flex gap-4 items-start"
                  >
                    <div className="w-24 h-20 shrink-0 bg-sage-100 rounded-lg overflow-hidden border border-sage-200">
                      {item.gambarUrl ? (
                        <img
                          src={item.gambarUrl}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Newspaper className="h-6 w-6 text-sage-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h4 className="font-display font-bold text-sm text-sage-900 group-hover:text-gold-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {item.judul}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-sage-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.dilihat || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
