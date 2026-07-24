import Link from "next/link";
import { CalendarDays, Newspaper, ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

// 1. TAMBAHKAN METADATA STATIS UNTUK HALAMAN INDEKS BERITA
export const metadata: Metadata = {
  title: "Berita & Pengumuman | Desa Kadungrejo",
  description:
    "Kabar terkini, pengumuman resmi, dan agenda kegiatan terbaru dari Pemerintah Desa Kadungrejo.",
  openGraph: {
    title: "Berita & Pengumuman | Desa Kadungrejo",
    description: "Kabar terkini dan informasi penting seputar Desa Kadungrejo.",
    type: "website",
  },
};

interface Berita {
  _id: string;
  judul: string;
  tanggal: string;
  slug: string; // Ditambahkan tipe slug
  gambarUrl?: string;
}

export default async function BeritaPage() {
  // 2. QUERY DIPERBARUI: Mengambil "slug": slug.current
  const query =
    '*[_type == "berita"] | order(tanggal desc) { _id, judul, tanggal, "slug": slug.current, "gambarUrl": gambar.asset->url }';
  const daftarBerita = await client.fetch<Berita[]>(query);

  return (
    <div className="pb-24">
      <section className="bg-sage-900 text-sage-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
            Berita & Pengumuman
          </h1>
          <p className="text-lg text-sage-200">
            Kabar terkini dan informasi penting seputar Desa Kadungrejo.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        {daftarBerita.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <p className="text-sage-600">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarBerita.map((item) => (
              /* 3. LINK DIPERBARUI: Menggunakan item.slug, bukan item._id */
              <Link
                href={`/berita/${item.slug || item._id}`}
                key={item._id}
                className="group flex"
              >
                <article className="bg-white rounded-3xl shadow-sm border border-sage-200 hover:border-gold-400 hover:shadow-lg transition-all h-full w-full flex flex-col overflow-hidden">
                  {/* Thumbnail Gambar */}
                  {item.gambarUrl ? (
                    <div className="h-48 w-full bg-sage-200 shrink-0 overflow-hidden">
                      <img
                        src={item.gambarUrl}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-sage-100 flex items-center justify-center shrink-0">
                      <Newspaper className="h-10 w-10 text-sage-300" />
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-sm font-medium text-sage-500 mb-4 bg-sage-50 w-fit px-3 py-1 rounded-full">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h2 className="font-display text-xl font-bold text-sage-900 group-hover:text-gold-600 transition-colors line-clamp-3 mb-6">
                      {item.judul}
                    </h2>
                    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-sage-700 group-hover:text-sage-900">
                      Baca Selengkapnya{" "}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
