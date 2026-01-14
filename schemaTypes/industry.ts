import { defineField, defineType } from 'sanity'

export const industry = defineType({
    name: 'industry',
    title: 'Industry',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'offerings',
            title: 'Our Offerings',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'stats',
            title: 'Proven Track Record Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string', title: 'Label' }),
                        defineField({ name: 'value', type: 'string', title: 'Value' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
            ],
        }),
    ],
})
