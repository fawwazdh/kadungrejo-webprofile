import Link from "next/link";
import { CalendarDays, Newspaper, ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const revalidate = 10;

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
  slug: string;
  gambarUrl?: string;
}

export default async function BeritaPage() {
  // 1. Ambil data berita
  const query =
    '*[_type == "berita"] | order(tanggal desc) { _id, judul, tanggal, "slug": slug.current, "gambarUrl": gambar.asset->url }';
  const daftarBerita = await client.fetch<Berita[]>(query);

  // 2. Ambil gambar background dari Pengaturan Umum CMS
  const bgQuery =
    '*[_type == "pengaturanUmum"][0] { "url": bgBerita.asset->url }';
  const bgData = await client.fetch<{ url: string | null }>(bgQuery);
  const bgImage = bgData?.url;

  return (
    <div className="pb-24 bg-sage-50 min-h-screen">
      {/* 3. Komponen Header Baru */}
      <PageHeader
        badge="Kabar Terbaru"
        badgeIcon={<Newspaper className="h-5 w-5" />}
        title="Berita & Pengumuman"
        description="Kabar terkini, informasi penting, dan agenda kegiatan seputar Desa Kadungrejo."
        bgImage={bgImage}
      />

      <section className="max-w-7xl mx-auto px-6">
        {daftarBerita.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-sage-200 shadow-sm">
            <Newspaper className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <p className="text-sage-600 font-medium">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarBerita.map((item) => (
              <Link
                href={`/berita/${item.slug || item._id}`}
                key={item._id}
                className="group flex"
              >
                <article className="bg-white rounded-3xl shadow-sm border border-sage-200 hover:border-gold-400 hover:shadow-lg transition-all h-full w-full flex flex-col overflow-hidden">
                  {/* Thumbnail Gambar */}
                  {item.gambarUrl ? (
                    <div className="h-48 w-full bg-sage-200 shrink-0 overflow-hidden relative">
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
                    <h2 className="font-display text-xl font-bold text-sage-900 group-hover:text-gold-600 transition-colors line-clamp-3 mb-6 leading-snug text-justify">
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
