import { defineField, defineType } from 'sanity'

export const faq = defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Used to sort the FAQs (lower numbers appear first)',
        }),
    ],
    preview: {
        select: {
            title: 'question',
            subtitle: 'answer',
        },
    },
})
