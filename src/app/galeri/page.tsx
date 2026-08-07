import { Camera, CalendarDays } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Galeri Desa",
};

// --- Tipe Data (Ditambah property caption) ---
interface GaleriItem {
  _id: string;
  judul: string;
  gambarUrl: string;
  caption: string | null;
  tanggal: string | null;
}

export default async function GaleriPage() {
  // 1. Tarik data galeri aslimu
  const query =
    '*[_type == "galeri"] | order(_createdAt desc) { _id, judul, "gambarUrl": gambar.asset->url, caption, tanggal }';
  const galeriData = await client.fetch<GaleriItem[]>(query);

  // 2. Tarik foto background galeri
  const bgQuery =
    '*[_type == "pengaturanUmum"][0] { "url": bgGaleri.asset->url }';
  const bgData = await client.fetch<{ url: string | null }>(bgQuery);
  const bgImage = bgData?.url;

  return (
    <div className="pb-24 bg-sage-50 min-h-screen">
      {/* 3. KOMPONEN HEADER BARU */}
      <PageHeader
        badge="Dokumentasi Visual"
        badgeIcon={<Camera className="h-5 w-5" />}
        title="Galeri Kegiatan"
        description="Dokumentasi berbagai momen, pembangunan, dan kegiatan kemasyarakatan di lingkungan Desa Kadungrejo."
        bgImage={bgImage}
      />

      {/* Grid Galeri */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {galeriData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-sage-200 shadow-sm">
            <Camera className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-sage-900 mb-2">
              Belum Ada Foto
            </h3>
            <p className="text-sage-500">
              Dokumentasi kegiatan akan segera diperbarui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galeriData.map((item) => (
              // Menggunakan tag <figure> untuk memisahkan foto dan caption
              <figure
                key={item._id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-sage-200 hover:border-gold-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Bagian Foto */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sage-200 shrink-0">
                  <img
                    src={item.gambarUrl}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Badge Tanggal (Jika ada) */}
                  {item.tanggal && (
                    <div className="absolute top-4 left-4 bg-sage-900/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <CalendarDays className="h-3.5 w-3.5 text-gold-400" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  )}
                </div>

                {/* Bagian Keterangan / Caption */}
                <figcaption className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
                  <h3 className="font-display text-xl font-bold text-sage-950 mb-3 leading-snug">
                    {item.judul}
                  </h3>

                  {/* Render Caption hanya jika Admin mengisinya di CMS. Format RATA KIRI-KANAN (text-justify) */}
                  {item.caption && (
                    <p className="text-sage-700 text-sm sm:text-base font-medium leading-relaxed text-justify">
                      {item.caption}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
