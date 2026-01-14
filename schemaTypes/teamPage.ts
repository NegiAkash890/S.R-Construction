import { defineField, defineType } from 'sanity'

export const teamPage = defineType({
    name: 'teamPage',
    title: 'Team Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Qualified & Experienced Staffs',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            initialValue: 'Our strength lies in our dedicated team of professionals.',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            initialValue: { current: 'team' }, // Default slug
            validation: (Rule) => Rule.required(),
        }),
    ],
})
