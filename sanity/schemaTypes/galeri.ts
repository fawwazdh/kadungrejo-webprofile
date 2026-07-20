import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galeri',
  title: 'Galeri Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul/Caption Foto',
      type: 'string',
    }),
    defineField({
      name: 'gambar',
      title: 'File Foto',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
