import { defineField, defineType } from 'sanity'

export const staffRole = defineType({
    name: 'staffRole',
    title: 'Staff Role',
    type: 'document',
    groups: [
        { name: 'roleInfo', title: 'Role Details' },
        { name: 'display', title: 'Display Settings' },
    ],
    fields: [
        defineField({
            name: 'role',
            title: 'Role / Designation',
            type: 'string',
            validation: rule => rule.required(),
            group: 'roleInfo',
        }),
        defineField({
            name: 'count',
            title: 'Number of Staff',
            type: 'number',
            description: 'E.g. 6, 10, 55',
            validation: rule => rule.min(0),
            group: 'roleInfo',
        }),
        defineField({
            name: 'image',
            title: 'Representative Image',
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
            group: 'roleInfo',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
            group: 'display',
        }),
    ],
    preview: {
        select: {
            title: 'role',
            subtitle: 'count',
            media: 'image',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title,
                subtitle: `${subtitle || 0} Staff Members`,
                media: media,
            }
        },
    },
})
