import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'profil',
  title: 'Pengaturan Profil Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'sejarah',
      title: 'Sejarah Desa',
      type: 'text',
      description: 'Gunakan tombol enter untuk paragraf baru.',
    }),
    defineField({
      name: 'visi',
      title: 'Visi',
      type: 'text',
    }),
    defineField({
      name: 'misi',
      title: 'Misi',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tambahkan setiap poin misi satu per satu.',
    }),
    defineField({
      name: 'luasWilayah',
      title: 'Luas Wilayah',
      type: 'string',
    }),
    defineField({
      name: 'topografi',
      title: 'Topografi',
      type: 'string',
    }),
    defineField({
      name: 'ketinggian',
      title: 'Ketinggian (mdpl)',
      type: 'string',
    }),
    defineField({
      name: 'totalPenduduk',
      title: 'Total Penduduk',
      type: 'string',
    }),
    defineField({
      name: 'jumlahKk',
      title: 'Jumlah Kepala Keluarga',
      type: 'string',
    }),
    defineField({
      name: 'mataPencaharian',
      title: 'Mata Pencaharian Utama',
      type: 'string',
    }),
  ],
})
