import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role / Company',
            type: 'string',
        }),
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
