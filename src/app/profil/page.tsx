import { Target, Lightbulb, Map, Users, History, TreePine } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil & Sejarah",
};

// --- Tipe Data ---
interface ProfilData {
  sejarah: string;
  visi: string;
  misi: string[];
  luasWilayah: string;
  topografi: string;
  ketinggian: string;
  totalPenduduk: string;
  jumlahKk: string;
  mataPencaharian: string;
}

export default async function ProfilPage() {
  // Tarik data profil (ambil dokumen pertama index ke-[0])
  const query = '*[_type == "profil"][0]';
  const data = await client.fetch<ProfilData>(query);

  // Data Default (jika CMS masih kosong/belum di-publish)
  const defaultMisi = [
    "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat dan transparan.",
    "Memberdayakan ekonomi kerakyatan melalui pengembangan UMKM dan BUMDes.",
    "Membangun dan memelihara infrastruktur desa yang merata dan berkelanjutan.",
  ];

  const misiList = data?.misi && data.misi.length > 0 ? data.misi : defaultMisi;

  return (
    <div className="pb-24">
      {/* 1. Header Profil */}
      <section className="bg-sage-900 text-sage-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
            Profil Desa Kadungrejo
          </h1>
          <p className="text-lg text-sage-200">
            Mengenal lebih dekat sejarah, visi, misi, dan potensi yang membangun
            fondasi kehidupan warga Desa Kadungrejo.
          </p>
        </div>
      </section>

      {/* 2. Sejarah Desa */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-sage-100 p-8 rounded-full">
              <History className="h-32 w-32 text-sage-700" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="font-display text-3xl font-bold text-sage-900 mb-6">
              Sejarah Desa
            </h2>
            <div className="text-sage-700 space-y-4 leading-relaxed whitespace-pre-wrap">
              {data?.sejarah ||
                "Sejarah desa belum ditambahkan di sistem. Silakan isi melalui dashboard admin."}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="bg-sage-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-sage-900">
              Visi & Misi
            </h2>
            <p className="mt-4 text-sage-600">
              Arah dan tujuan pembangunan Desa Kadungrejo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Visi */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gold-500/20 p-4 rounded-2xl">
                  <Lightbulb className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-sage-900">
                  Visi
                </h3>
              </div>
              <p className="text-xl font-medium text-sage-800 leading-relaxed italic">
                "
                {data?.visi ||
                  "Terwujudnya Desa Kadungrejo yang Mandiri, Sejahtera, Asri, dan Berbudaya melalui Tata Kelola Pemerintahan yang Transparan dan Inovatif."}
                "
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-sage-100 p-4 rounded-2xl">
                  <Target className="h-8 w-8 text-sage-700" />
                </div>
                <h3 className="font-display text-2xl font-bold text-sage-900">
                  Misi
                </h3>
              </div>
              <ul className="space-y-4 text-sage-700">
                {misiList.map((misiItem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-sage-200 text-sage-800 font-bold px-3 py-1 rounded-lg text-sm">
                      {index + 1}
                    </span>
                    <p>{misiItem}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Kondisi Geografis & Demografi */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div className="bg-sage-800 p-10 rounded-3xl text-sage-50 relative overflow-hidden group">
          <Map className="absolute -bottom-10 -right-10 h-64 w-64 text-sage-700 opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TreePine className="h-6 w-6 text-gold-400" /> Geografis
            </h3>
            <ul className="space-y-3 text-sage-200">
              <li className="flex justify-between border-b border-sage-700 pb-2">
                <span>Luas Wilayah</span>{" "}
                <span className="font-semibold text-white">
                  {data?.luasWilayah || "450 Hektar"}
                </span>
              </li>
              <li className="flex justify-between border-b border-sage-700 pb-2">
                <span>Topografi</span>{" "}
                <span className="font-semibold text-white">
                  {data?.topografi || "Dataran Rendah"}
                </span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Ketinggian</span>{" "}
                <span className="font-semibold text-white">
                  {data?.ketinggian || "15 mdpl"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-sage-50 p-10 rounded-3xl border border-sage-200 relative overflow-hidden group shadow-sm">
          <Users className="absolute -bottom-10 -right-10 h-64 w-64 text-sage-200 opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold text-sage-900 mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-sage-700" /> Demografi
            </h3>
            <ul className="space-y-3 text-sage-700">
              <li className="flex justify-between border-b border-sage-200 pb-2">
                <span>Total Penduduk</span>{" "}
                <span className="font-bold text-sage-900">
                  {data?.totalPenduduk || "± 4.500 Jiwa"}
                </span>
              </li>
              <li className="flex justify-between border-b border-sage-200 pb-2">
                <span>Kepala Keluarga</span>{" "}
                <span className="font-bold text-sage-900">
                  {data?.jumlahKk || "1.250 KK"}
                </span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Mata Pencaharian</span>{" "}
                <span className="font-bold text-sage-900">
                  {data?.mataPencaharian || "Petani"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
