import { Award, UserCircle } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Struktur Pemerintahan" };

// --- Tipe Data ---
interface Perangkat {
  _id: string;
  nama: string;
  jabatan: string;
  fotoUrl: string | null;
}

export default async function PemerintahanPage() {
  // Menarik data dari Sanity, diurutkan berdasarkan angka 'urutan' dari terkecil ke terbesar
  const query =
    '*[_type == "pemerintahan"] | order(urutan asc) { _id, nama, jabatan, "fotoUrl": foto.asset->url }';
  const perangkatDesa = await client.fetch<Perangkat[]>(query);

  return (
    <div className="pb-24">
      {/* Header Halaman */}
      <section className="bg-sage-900 text-sage-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
            Struktur Pemerintahan
          </h1>
          <p className="text-lg text-sage-200">
            Mengenal para pelayan masyarakat yang berdedikasi membangun Desa
            Kadungrejo.
          </p>
        </div>
      </section>

      {/* Grid Perangkat Desa */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {perangkatDesa.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl border border-sage-200">
            <UserCircle className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-sage-900">
              Data Belum Tersedia
            </h2>
            <p className="text-sage-600">
              Belum ada data perangkat desa yang ditambahkan dari dashboard
              admin.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {perangkatDesa.map((person, index) => (
              <div
                key={person._id}
                className={`group bg-white rounded-3xl overflow-hidden shadow-sm border ${index === 0 ? "border-gold-400 shadow-gold-500/10" : "border-sage-200"} hover:shadow-lg hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Area Foto */}
                <div className="relative aspect-[3/4] bg-sage-100 overflow-hidden flex items-center justify-center">
                  {person.fotoUrl ? (
                    <img
                      src={person.fotoUrl}
                      alt={person.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <UserCircle className="h-24 w-24 text-sage-300" />
                  )}

                  {/* Badge khusus untuk urutan pertama (Kepala Desa) */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-sage-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Award className="h-3 w-3" /> Pimpinan
                    </div>
                  )}
                </div>

                {/* Area Nama & Jabatan */}
                <div className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold text-sage-900 mb-1">
                    {person.nama}
                  </h3>
                  <p className="text-sm font-semibold text-gold-600 uppercase tracking-wider">
                    {person.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
