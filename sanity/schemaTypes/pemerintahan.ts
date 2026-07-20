import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pemerintahan',
  title: 'Perangkat Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jabatan',
      title: 'Jabatan',
      type: 'string',
      description: 'Contoh: Kepala Desa, Sekretaris Desa, Kepala Dusun, dll',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto Profil',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'urutan',
      title: 'Urutan Tampil (Angka)',
      type: 'number',
      description: 'Gunakan angka. 1 untuk Kepala Desa, 2 untuk Sekdes, dst agar urutannya rapi.',
    }),
  ],
})
