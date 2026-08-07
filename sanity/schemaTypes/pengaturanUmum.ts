import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pengaturanUmum',
  title: 'Pengaturan Header & Footer',
  type: 'document',
  fields: [
    defineField({name: 'namaDesa', title: 'Nama Desa', type: 'string', initialValue: 'Kadungrejo'}),
    defineField({name: 'kecamatan', title: 'Kecamatan', type: 'string', initialValue: 'Baureno'}),
    defineField({
      name: 'kabupaten',
      title: 'Kabupaten',
      type: 'string',
      initialValue: 'Bojonegoro',
    }),
    defineField({name: 'logo', title: 'Logo Desa', type: 'image', options: {hotspot: true}}),
    defineField({name: 'deskripsiFooter', title: 'Deskripsi Singkat (Untuk Footer)', type: 'text'}),
    defineField({name: 'alamat', title: 'Alamat Lengkap (Untuk Footer)', type: 'string'}),
    defineField({name: 'telepon', title: 'Nomor Telepon/WA (Untuk Footer)', type: 'string'}),
    defineField({name: 'email', title: 'Email Desa (Untuk Footer)', type: 'string'}),
    defineField({
      name: 'bgBerita',
      title: 'Background Banner Halaman Berita',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bgPemerintahan',
      title: 'Background Banner Halaman Pemerintahan',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bgProfil',
      title: 'Background Banner Halaman Profil',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bgGaleri',
      title: 'Background Banner Halaman Galeri',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bgFaq',
      title: 'Background Banner Halaman FAQ',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
