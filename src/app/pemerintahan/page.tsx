import { Award, UserCircle, Users } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Struktur Pemerintahan" };

export const revalidate = 10;

interface Perangkat {
  _id: string;
  nama: string;
  jabatan: string;
  fotoUrl: string | null;
}

export default async function PemerintahanPage() {
  // 1. Ambil data perangkat desa
  const query =
    '*[_type == "pemerintahan"] | order(urutan asc) { _id, nama, jabatan, "fotoUrl": foto.asset->url }';
  const perangkatDesa = await client.fetch<Perangkat[]>(query);

  // 2. Ambil gambar background dari Pengaturan Umum CMS
  const bgQuery =
    '*[_type == "pengaturanUmum"][0] { "url": bgPemerintahan.asset->url }';
  const bgData = await client.fetch<{ url: string | null }>(bgQuery);
  const bgImage = bgData?.url;

  return (
    <div className="pb-24 bg-sage-50 min-h-screen">
      {/* 3. Komponen Header Baru */}
      <PageHeader
        badge="Aparatur Desa"
        badgeIcon={<Users className="h-5 w-5" />}
        title="Struktur Pemerintahan"
        description="Mengenal susunan organisasi dan para pelayan masyarakat yang berdedikasi membangun Desa Kadungrejo."
        bgImage={bgImage}
      />

      <section className="max-w-7xl mx-auto px-6">
        {perangkatDesa.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-3xl border border-sage-200 shadow-sm">
            <UserCircle className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-sage-900 mb-2">
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
                className={`group bg-white rounded-3xl overflow-hidden shadow-sm border ${index === 0 ? "border-gold-400 shadow-gold-500/10" : "border-sage-200"} hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col`}
              >
                <div className="relative aspect-[3/4] bg-sage-100 overflow-hidden flex items-center justify-center shrink-0">
                  {person.fotoUrl ? (
                    <img
                      src={person.fotoUrl}
                      alt={person.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <UserCircle className="h-24 w-24 text-sage-300" />
                  )}

                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-sage-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Award className="h-3 w-3" /> Pimpinan
                    </div>
                  )}
                </div>

                <div className="p-6 text-center flex-grow flex flex-col justify-center">
                  <h3 className="font-display text-xl font-bold text-sage-900 mb-1 leading-snug">
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
