"use client";

import { useEffect, useRef } from "react";

export default function ViewCounter({ id }: { id: string }) {
  // Gembok tunggal: Hanya menahan double-trigger dari React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!id || hasFetched.current) return;

    // Langsung tutup gembok agar di mode Dev lokal hanya nambah +1 (bukan +2)
    hasFetched.current = true;

    // Catatan: Gembok sessionStorage dimatikan sementara agar mudah dites oleh developer
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch((err) => console.error("Gagal mencatat view:", err));
  }, [id]);

  return null;
}
