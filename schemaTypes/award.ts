import { defineField, defineType } from 'sanity'

export const award = defineType({
    name: 'award',
    title: 'Award',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Award Title',
            type: 'string',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Award Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
