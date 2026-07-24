import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID berita tidak ditemukan" },
        { status: 400 },
      );
    }

    // Buat client khusus yang memiliki hak akses menulis (menggunakan Token rahasia)
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false, // Wajib false agar langsung tercatat ke database utama
    });

    // Perintahkan Sanity untuk menambah kolom 'dilihat' sebanyak +1
    const updatedBerita = await writeClient
      .patch(id)
      .inc({ dilihat: 1 }) // inc = increment (tambah 1)
      .commit();

    return NextResponse.json({
      status: "sukses",
      totalViews: updatedBerita.dilihat,
    });
  } catch (error) {
    console.error("Gagal menambah view counter:", error);
    return NextResponse.json(
      { error: "Gagal memproses view counter" },
      { status: 500 },
    );
  }
}
