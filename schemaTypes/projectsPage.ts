import { defineField, defineType } from 'sanity'

export const projectsPage = defineType({
    name: 'projectsPage',
    title: 'Projects Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'label', type: 'string' },
                    { name: 'value', type: 'string' }
                ]
            }]
        })
    ],
})
