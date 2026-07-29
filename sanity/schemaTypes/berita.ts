import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'berita',
  title: 'Berita',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // ==========================================
    // KOLOM BARU: SLUG (URL SEO-FRIENDLY)
    // ==========================================
    defineField({
      name: 'slug',
      title: 'Slug (URL Berita)',
      type: 'slug',
      description: 'Klik tombol "Generate" untuk membuat URL otomatis dari Judul Berita.',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal',
      type: 'date',
    }),
    defineField({
      name: 'penulis',
      title: 'Penulis',
      type: 'string',
      initialValue: 'Administrator', // Default otomatis diisi Administrator
    }),
    defineField({
      name: 'dilihat',
      title: 'Jumlah Dilihat (Simulasi)',
      type: 'number',
      initialValue: 0,
      description:
        'Untuk sementara, angka ini bisa diisi manual. (Penghitung otomatis butuh integrasi API khusus).',
    }),
    defineField({
      name: 'gambar',
      title: 'Gambar Thumbnail/Cover',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'konten',
      title: 'Konten Berita',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal (Paragraf)', value: 'normal'},
            {title: 'Heading 2 (Sub-Judul Besar)', value: 'h2'},
            {title: 'Heading 3 (Sub-Judul Kecil)', value: 'h3'},
            {title: 'Kutipan (Quote)', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet (Titik)', value: 'bullet'},
            {title: 'Number (Angka)', value: 'number'},
          ],
        },
        // Ini fitur agar CMS bisa upload foto di tengah paragraf berita
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Teks Alternatif (Alt)',
              description: 'Tulis penjelasan singkat gambar ini (Penting untuk SEO).',
            },
          ],
        },
      ],
    }),
  ],
})
