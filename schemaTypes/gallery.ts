import { defineField, defineType } from 'sanity'

export const gallery = defineType({
    name: 'gallery',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Residential', value: 'residential' },
                    { title: 'Commercial', value: 'commercial' },
                    { title: 'Industrial', value: 'industrial' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
    ],
})
