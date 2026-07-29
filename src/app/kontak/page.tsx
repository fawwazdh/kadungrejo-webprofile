import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Hubungi Kami" };

export const revalidate = 10;

export default function KontakPage() {
  return (
    <div className="pb-24 bg-sage-50 min-h-screen">
      {/* Header Halaman */}
      <section className="bg-sage-900 text-sage-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Hubungi Kami
          </h1>
          <p className="text-lg text-sage-200 max-w-2xl mx-auto">
            Pemerintah Desa Kadungrejo selalu terbuka untuk mendengar aspirasi,
            pertanyaan, dan masukan dari Anda.
          </p>
        </div>
      </section>

      {/* Info & Form Kontak */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Kolom Kiri: Informasi Kontak */}
          <div>
            <h2 className="font-display text-3xl font-bold text-sage-900 mb-6">
              Informasi Kontak
            </h2>
            <p className="text-sage-700 leading-relaxed mb-10">
              Silakan kunjungi kantor balai desa kami pada jam kerja
              operasional, atau hubungi kami melalui kontak yang tersedia di
              bawah ini.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-gold-500/20 p-3 rounded-xl shrink-0">
                  <MapPin className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sage-900 mb-1">
                    Alamat Balai Desa
                  </h3>
                  <p className="text-sage-600 leading-relaxed">
                    Jl. Raya Kadungrejo No. 1, RT 01 / RW 02
                    <br />
                    Kec. Contoh, Kab. Contoh
                    <br />
                    Jawa Timur, 60000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sage-200 p-3 rounded-xl shrink-0">
                  <Phone className="h-6 w-6 text-sage-800" />
                </div>
                <div>
                  <h3 className="font-bold text-sage-900 mb-1">
                    Telepon & WhatsApp
                  </h3>
                  <p className="text-sage-600">
                    (0341) 000-000 <br /> +62 812-3456-7890 (Layanan Warga)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sage-200 p-3 rounded-xl shrink-0">
                  <Mail className="h-6 w-6 text-sage-800" />
                </div>
                <div>
                  <h3 className="font-bold text-sage-900 mb-1">Email Resmi</h3>
                  <p className="text-sage-600">info@kadungrejo.desa.id</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sage-200 p-3 rounded-xl shrink-0">
                  <Clock className="h-6 w-6 text-sage-800" />
                </div>
                <div>
                  <h3 className="font-bold text-sage-900 mb-1">
                    Jam Operasional
                  </h3>
                  <p className="text-sage-600">
                    Senin - Kamis : 08.00 - 15.00 WIB
                    <br />
                    Jumat : 08.00 - 11.00 WIB
                    <br />
                    Sabtu & Minggu : Libur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Kirim Pesan */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-sage-200">
            <h2 className="font-display text-2xl font-bold text-sage-900 mb-6">
              Kirim Pesan
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-semibold text-sage-900 mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 rounded-xl bg-sage-50 border border-sage-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="kontak"
                  className="block text-sm font-semibold text-sage-900 mb-2"
                >
                  Email / No. HP
                </label>
                <input
                  type="text"
                  id="kontak"
                  placeholder="Untuk balasan pesan"
                  className="w-full px-4 py-3 rounded-xl bg-sage-50 border border-sage-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan"
                  className="block text-sm font-semibold text-sage-900 mb-2"
                >
                  Pesan Anda
                </label>
                <textarea
                  id="pesan"
                  rows={5}
                  placeholder="Tuliskan pertanyaan atau masukan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-sage-50 border border-sage-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full bg-sage-800 hover:bg-sage-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Send className="h-5 w-5" />
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Peta Lokasi (Full Width) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[450px] bg-sage-200 rounded-3xl overflow-hidden border border-sage-300 relative shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=Desa%20Kadungrejo,%20Kecamatan%20Baureno,%20Bojonegoro&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
