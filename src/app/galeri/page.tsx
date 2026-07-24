import { Camera, Image as ImageIcon } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Galeri Kegiatan" };

// --- Tipe Data ---
interface Galeri {
  _id: string;
  judul: string;
  gambarUrl: string | null;
}

export default async function GaleriPage() {
  // Menarik semua foto dari Sanity, diurutkan dari yang paling baru di-upload
  const query =
    '*[_type == "galeri"] | order(_createdAt desc) { _id, judul, "gambarUrl": gambar.asset->url }';
  const fotoGaleri = await client.fetch<Galeri[]>(query);

  return (
    <div className="pb-24 bg-sage-50 min-h-screen">
      {/* Header Halaman */}
      <section className="bg-sage-900 text-sage-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Camera className="h-12 w-12 text-gold-500 mx-auto mb-6 opacity-80" />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Galeri Desa
          </h1>
          <p className="text-lg text-sage-200 max-w-2xl mx-auto">
            Kumpulan momen, kegiatan, dan keindahan alam yang terekam di Desa
            Kadungrejo.
          </p>
        </div>
      </section>

      {/* Grid Foto Galeri */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {fotoGaleri.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-3xl border border-sage-200 shadow-sm max-w-2xl mx-auto">
            <ImageIcon className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-sage-900 mb-2">
              Album Masih Kosong
            </h2>
            <p className="text-sage-600">
              Belum ada foto yang diunggah ke galeri melalui dashboard admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fotoGaleri.map((item) => (
              <div
                key={item._id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-sage-200 cursor-pointer shadow-sm border border-sage-200 hover:shadow-xl transition-all duration-300"
              >
                {item.gambarUrl ? (
                  <>
                    {/* Gambar utama dengan efek zoom saat di-hover */}
                    <img
                      src={item.gambarUrl}
                      alt={item.judul || "Foto Galeri Desa"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* Overlay gradien gelap di bagian bawah agar teks mudah dibaca */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sage-900/90 via-sage-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Teks Judul Foto yang muncul dari bawah saat di-hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white font-display font-bold text-lg leading-tight drop-shadow-md">
                        {item.judul || "Tanpa Judul"}
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-sage-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
