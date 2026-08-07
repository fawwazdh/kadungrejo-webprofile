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
            <>
              {/* Tambahkan text-justify di sini untuk rata kiri-kanan */}
              <div className="prose prose-sage prose-lg max-w-none text-sage-800 leading-relaxed text-justify">
                <PortableText
                  value={berita.konten}
                  components={{
                    types: {
                      image: ({ value }: any) => {
                        if (!value?.asset?._ref) return null;
                        const ref = value.asset._ref;
                        const [_file, id, dimension, extension] =
                          ref.split("-");
                        const url = `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${id}-${dimension}.${extension}`;
                        return (
                          // Menggunakan tag <figure> dan <figcaption> sebagai standar caption berita
                          <figure className="my-10 rounded-2xl overflow-hidden shadow-md bg-white border border-sage-200 flex flex-col">
                            <img
                              src={url}
                              alt={value.alt || "Dokumentasi Berita Kadungrejo"}
                              className="w-full h-auto object-cover"
                            />

                            {/* Jika admin mengisi caption, maka teks ini akan muncul di bawah foto */}
                            {value.caption && (
                              <figcaption className="text-center text-sm font-semibold text-sage-600 py-3 px-4 bg-sage-50 border-t border-sage-200">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      },
                    },
                  }}
                />
              </div>

              {/* FITUR TOMBOL SHARE MEDSOS */}
              <div className="flex items-center gap-4 py-8 border-y border-sage-200 my-10">
                <span className="text-sm font-bold text-sage-600 uppercase tracking-wider">
                  Bagikan Artikel:
                </span>

                {/* Tombol WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(berita.judul)}%20%0Ahttps://kadungrejo.desa.id/berita/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-500 text-white rounded-full hover:scale-110 transition-transform shadow-md"
                  title="Bagikan ke WhatsApp"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>

                {/* Tombol Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://kadungrejo.desa.id/berita/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-md"
                  title="Bagikan ke Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Tombol Twitter/X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=https://kadungrejo.desa.id/berita/${slug}&text=${encodeURIComponent(berita.judul)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-md"
                  title="Bagikan ke X"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </>
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
