import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
        defineField({
            name: 'status',
            title: 'Project Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Completed', value: 'completed' },
                    { title: 'Ongoing', value: 'ongoing' },
                ],
                layout: 'radio',
            },
            initialValue: 'completed',
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Project Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'Project End Date',
            type: 'date',
            description: 'Leave empty if ongoing',
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
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
            ]
        }),
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
            type: 'array',
            of: [{ type: 'image' }]
        })
    ],
})
