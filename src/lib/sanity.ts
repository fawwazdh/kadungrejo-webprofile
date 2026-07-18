import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01", // Tanggal API versioning standar Sanity
  useCdn: false, // Set false agar data berita selalu up-to-date saat di-refresh
});
