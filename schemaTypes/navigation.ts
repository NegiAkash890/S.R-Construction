import { defineField, defineType } from 'sanity'

export const navigation = defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Menu Name',
            type: 'string',
            description: 'e.g., Header Menu, Footer Menu',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Navigation Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'type',
                            title: 'Link Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Internal', value: 'internal' },
                                    { title: 'External', value: 'external' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'internal',
                        }),
                        defineField({
                            name: 'internalLink',
                            title: 'Internal Link',
                            type: 'reference',
                            to: [{ type: 'page' }, { type: 'homepage' }, { type: 'project' }],
                            hidden: ({ parent }) => parent?.type !== 'internal',
                        }),
                        defineField({
                            name: 'externalUrl',
                            title: 'External URL',
                            type: 'url',
                            hidden: ({ parent }) => parent?.type !== 'external',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            type: 'type',
                            internalSlug: 'internalLink.slug.current',
                            externalUrl: 'externalUrl',
                        },
                        prepare({ title, type, internalSlug, externalUrl }) {
                            const subtitle = type === 'internal' ? `Internal: /${internalSlug || ''}` : `External: ${externalUrl}`;
                            return {
                                title,
                                subtitle,
                            };
                        },
                    },
                },
            ],
        }),
    ],
})
