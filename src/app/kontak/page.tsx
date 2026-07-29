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
          <div className="bg-white p-8 rounded-2xl border border-sage-200 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-sage-900 mb-4">
              Butuh Bantuan Cepat?
            </h3>
            <p className="text-sage-600 mb-8">
              Silakan hubungi admin pelayanan desa kami secara langsung melalui
              WhatsApp untuk respon yang lebih cepat.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Kadungrejo,%20saya%20ingin%20bertanya..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Hubungi via WhatsApp
            </a>
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
