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
    ],
})
