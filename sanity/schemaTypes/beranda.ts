import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'beranda',
  title: 'Pengaturan Beranda',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Judul Hero (Teks Besar)',
      type: 'string',
      initialValue: 'Desa Kadungrejo',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Deskripsi Hero',
      type: 'text',
      initialValue:
        'Harmoni antara tradisi lokal dan inovasi digital. Menuju desa mandiri, transparan, dan sejahtera untuk seluruh warga.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Background Hero',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'tentangImage1',
      title: 'Gambar Tentang Desa 1 (Kiri)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'tentangImage2',
      title: 'Gambar Tentang Desa 2 (Kanan)',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
