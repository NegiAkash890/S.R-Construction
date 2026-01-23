import { defineField, defineType } from 'sanity'

export const lead = defineType({
    name: 'lead',
    title: 'Leads',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'mobile',
            title: 'Mobile Number',
            type: 'string',
        }),
        defineField({
            name: 'projectType',
            title: 'Project Type',
            type: 'string',
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Converted', value: 'converted' },
                    { title: 'Lost', value: 'lost' },
                ],
            },
            initialValue: 'new',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'projectType',
        },
    },
})
