import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ (Tanya Jawab)',
  type: 'document',
  fields: [
    defineField({
      name: 'pertanyaan',
      title: 'Pertanyaan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jawaban',
      title: 'Jawaban',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
