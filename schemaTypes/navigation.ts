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
                                    { title: 'Internal Page', value: 'internal' },
                                    { title: 'External / Custom URL', value: 'external' },
                                    { title: 'Section (Scroll)', value: 'section' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'internal',
                        }),
                        defineField({
                            name: 'internalLink',
                            title: 'Internal Page',
                            type: 'reference',
                            to: [{ type: 'page' }, { type: 'homepage' }, { type: 'project' }, { type: 'teamPage' }],
                            hidden: ({ parent }) => parent?.type !== 'internal',
                        }),
                        defineField({
                            name: 'sectionId',
                            title: 'Section ID (without #)',
                            type: 'string',
                            description: 'e.g., about, contact, projects',
                            hidden: ({ parent }) => parent?.type !== 'section',
                        }),
                        defineField({
                            name: 'externalUrl',
                            title: 'URL',
                            type: 'string', // Changed from 'url' to 'string' to allow relative paths if needed, or stick to url but less strict
                            description: 'Full URL (https://...) or relative path (/projects)',
                            hidden: ({ parent }) => parent?.type !== 'external',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            type: 'type',
                            internalSlug: 'internalLink.slug.current',
                            externalUrl: 'externalUrl',
                            sectionId: 'sectionId',
                        },
                        prepare({ title, type, internalSlug, externalUrl, sectionId }: any) {
                            let subtitle = '';
                            if (type === 'internal') subtitle = `Page: /${internalSlug || ''}`;
                            else if (type === 'section') subtitle = `Scroll to: #${sectionId}`;
                            else subtitle = `Link: ${externalUrl}`;

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
