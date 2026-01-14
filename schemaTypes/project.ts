import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'details', title: 'Details' },
        { name: 'media', title: 'Media' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
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
            group: 'content',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false,
            group: 'content',
        }),
        defineField({
            name: 'status',
            title: 'Project Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Completed', value: 'completed' },
                    { title: 'In Progress', value: 'in-progress' },
                ],
                layout: 'radio',
            },
            initialValue: 'completed',
            group: 'details',
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'workDescription',
            title: 'Work Description',
            type: 'text',
            rows: 3,
            description: 'Detailed description of the work (e.g., Fire and Steel Door...)',
            group: 'content',
        }),
        defineField({
            name: 'workValue',
            title: 'Work Value (Rs.)',
            type: 'number',
            group: 'details',
        }),
        defineField({
            name: 'location',
            title: 'Locations',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'details',
        }),
        defineField({
            name: 'startDate',
            title: 'Project Start Date',
            type: 'date',
            group: 'details',
        }),
        defineField({
            name: 'endDate',
            title: 'Project End Date',
            type: 'date',
            description: 'Leave empty if ongoing',
            group: 'details',
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
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
            ],
            group: 'media',
        }),
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
            type: 'array',
            of: [{ type: 'image' }],
            group: 'media',
        }),
    ],
})
