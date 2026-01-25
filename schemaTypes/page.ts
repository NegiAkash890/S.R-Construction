import { defineField, defineType } from 'sanity'

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
            name: 'heroType',
            title: 'Hero Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Color', value: 'color' },
                ],
                layout: 'radio',
            },
            initialValue: 'image',
        }),
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            hidden: ({ document }) => document?.heroType !== 'image',
        }),
        defineField({
            name: 'heroColor',
            title: 'Hero Color',
            type: 'string',
            description: 'Hex color code. Default is Slate 900 (#0F172A) to match navbar.',
            initialValue: '#0F172A',
            hidden: ({ document }) => document?.heroType !== 'color',
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
