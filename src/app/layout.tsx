import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Definisi Font Bawaan Next.js
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Pemerintah Desa Kadungrejo",
  description: "Portal resmi Pemerintah Desa Kadungrejo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${jakarta.variable} font-sans antialiased bg-sage-50 text-sage-900 flex flex-col min-h-screen`}
      >
        <Navbar />
        {/* Main Content (Area yang berubah-ubah tiap halaman) */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
