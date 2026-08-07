import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galeri',
  title: 'Galeri Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul / Nama Kegiatan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gambar',
      title: 'Foto / Gambar',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    // ==========================================
    // KOLOM BARU: KETERANGAN GAMBAR (CAPTION)
    // ==========================================
    defineField({
      name: 'caption',
      title: 'Keterangan Gambar (Caption)',
      type: 'text',
      description: 'Tulis cerita singkat tentang foto ini (Opsional).',
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal Kegiatan',
      type: 'date',
    }),
  ],
})
