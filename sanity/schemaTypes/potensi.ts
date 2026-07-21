import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'potensi',
  title: 'Potensi Desa',
  type: 'document',
  fields: [
    defineField({name: 'judul', title: 'Judul Potensi', type: 'string'}),
    defineField({name: 'deskripsi', title: 'Deskripsi Singkat', type: 'text'}),
    defineField({name: 'gambar', title: 'Foto Potensi', type: 'image', options: {hotspot: true}}),
  ],
})
