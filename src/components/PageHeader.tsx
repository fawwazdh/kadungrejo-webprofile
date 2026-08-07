import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  badge: string;
  badgeIcon?: React.ReactNode;
  bgImage?: string | null;
}

export default function PageHeader({
  title,
  description,
  badge,
  badgeIcon,
  bgImage,
}: PageHeaderProps) {
  return (
    <section className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-b-[2.5rem] lg:rounded-b-[4rem] overflow-hidden mb-12 shadow-2xl">
      {/* 1. Latar Belakang Gambar (Dari CMS) */}
      {bgImage ? (
        <img
          src={bgImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Warna fallback jika admin belum upload foto
        <div className="absolute inset-0 w-full h-full bg-[#142010]" />
      )}

      {/* 2. Gradasi Gelap (Dari kiri pekat ke kanan transparan) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1207] via-[#142010]/80 to-transparent" />
      {/* Overlay tambahan agar teks putih tetap terbaca meski fotonya terang */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 3. Konten Teks */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in">
          {/* Badge Emas */}
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            {badgeIcon && <span className="text-[#eab308]">{badgeIcon}</span>}
            <span className="text-[#eab308] font-bold tracking-widest uppercase text-sm sm:text-base">
              {badge}
            </span>
          </div>

          {/* Judul Halaman */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>

          {/* Deskripsi (Otomatis Rata Kiri-Kanan / Justify) */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl text-justify drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
