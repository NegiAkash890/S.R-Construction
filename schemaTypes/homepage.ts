import { defineField, defineType } from 'sanity'

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string',
        }),
        defineField({
            name: 'heroSubheading',
            title: 'Hero Subheading',
            type: 'string',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
