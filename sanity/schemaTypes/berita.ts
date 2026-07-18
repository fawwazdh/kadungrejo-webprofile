import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'berita',
  title: 'Berita Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'judul',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'gambarCover',
      title: 'Gambar Cover',
      type: 'image',
      options: {
        hotspot: true, // Memungkinkan admin memotong (crop) gambar di dashboard
      },
    }),
    defineField({
      name: 'konten',
      title: 'Isi Berita',
      type: 'array',
      of: [{type: 'block'}], // Ini adalah format Rich Text bawaan Sanity
    }),
  ],
})
