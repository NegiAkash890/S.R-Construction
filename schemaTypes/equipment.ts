import { defineField, defineType } from 'sanity'

export const equipment = defineType({
    name: 'equipment',
    title: 'Equipment',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Equipment Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'quantity',
            title: 'Quantity',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'specification',
            title: 'Technical Specification',
            type: 'text', // Or array of objects if key-value pairs needed, but simple text or block content is easier for "basic info"
        }),
    ],
})
