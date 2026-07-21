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
      of: [{type: 'block'}],
    }),
  ],
})
