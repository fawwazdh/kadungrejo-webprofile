import { MessageCircleQuestion } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Tanya Jawab (FAQ)" };

export const revalidate = 10;

interface FAQ {
  _id: string;
  pertanyaan: string;
  jawaban: string;
}

export default async function FAQPage() {
  // 1. Ambil data FAQ
  const query = '*[_type == "faq"] | order(_createdAt asc)';
  const faqs = await client.fetch<FAQ[]>(query);

  // 2. Ambil gambar background dari Pengaturan Umum CMS
  const bgQuery = '*[_type == "pengaturanUmum"][0] { "url": bgFaq.asset->url }';
  const bgData = await client.fetch<{ url: string | null }>(bgQuery);
  const bgImage = bgData?.url;

  return (
    <div className="pb-24 bg-sage-50 min-h-screen">
      {/* 3. Komponen Header Baru */}
      <PageHeader
        badge="Pusat Bantuan"
        badgeIcon={<MessageCircleQuestion className="h-5 w-5" />}
        title="Pusat Bantuan & FAQ"
        description="Jawaban atas pertanyaan yang paling sering diajukan oleh warga mengenai layanan dan administrasi Desa Kadungrejo."
        bgImage={bgImage}
      />

      <section className="max-w-4xl mx-auto px-6">
        {faqs.length === 0 ? (
          <div className="text-center bg-white py-16 rounded-3xl border border-sage-200 shadow-sm">
            <MessageCircleQuestion className="h-16 w-16 text-sage-300 mx-auto mb-4" />
            <p className="text-sage-600 font-medium">
              Belum ada pertanyaan yang ditambahkan.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item._id}
                className="group bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                <summary className="font-display font-bold text-lg text-sage-900 p-6 cursor-pointer flex justify-between items-center bg-sage-50 group-open:bg-sage-100 transition-colors list-none">
                  <div className="flex items-center gap-3">
                    <MessageCircleQuestion className="h-6 w-6 text-gold-600 shrink-0" />
                    <span className="text-justify leading-snug">
                      {item.pertanyaan}
                    </span>
                  </div>
                  <span className="text-sage-400 group-open:rotate-180 transition-transform ml-4 shrink-0">
                    ▼
                  </span>
                </summary>
                {/* Ditambahkan text-justify agar teks jawaban rata kiri-kanan */}
                <div className="p-6 text-sage-700 bg-white leading-relaxed border-t border-sage-100 text-justify">
                  {item.jawaban}
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
