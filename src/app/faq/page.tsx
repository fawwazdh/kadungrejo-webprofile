import { MessageCircleQuestion } from "lucide-react";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Tanya Jawab (FAQ)" };

export const revalidate = 10;

interface FAQ {
  _id: string;
  pertanyaan: string;
  jawaban: string;
}

export default async function FAQPage() {
  const query = '*[_type == "faq"] | order(_createdAt asc)';
  const faqs = await client.fetch<FAQ[]>(query);

  return (
    <div className="pb-24">
      <section className="bg-sage-900 text-sage-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
            Pusat Bantuan & FAQ
          </h1>
          <p className="text-lg text-sage-200">
            Jawaban atas pertanyaan yang paling sering diajukan oleh warga Desa
            Kadungrejo.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-6">
        {faqs.length === 0 ? (
          <p className="text-center text-sage-600">
            Belum ada pertanyaan yang ditambahkan.
          </p>
        ) : (
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item._id}
                className="group bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                <summary className="font-display font-bold text-lg text-sage-900 p-6 cursor-pointer flex justify-between items-center bg-sage-50 group-open:bg-sage-100 transition-colors list-none">
                  <div className="flex items-center gap-3">
                    <MessageCircleQuestion className="h-5 w-5 text-gold-600 shrink-0" />
                    {item.pertanyaan}
                  </div>
                  <span className="text-sage-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="p-6 text-sage-700 bg-white leading-relaxed border-t border-sage-100">
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
