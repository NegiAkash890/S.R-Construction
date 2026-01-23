import { defineField, defineType } from 'sanity'

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'sections', title: 'Section Titles' },
    ],
    fields: [
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroSubheading',
            title: 'Hero Subheading',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'ctaPrimary',
            title: 'Primary CTA Text',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'ctaPrimaryLink',
            title: 'Primary CTA Link',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'ctaSecondary',
            title: 'Secondary CTA Text',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'ctaSecondaryLink',
            title: 'Secondary CTA Link',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            group: 'hero',
        }),
        defineField({
            name: 'clientsTitle',
            title: 'Clients Section Title',
            type: 'string',
            group: 'sections',
        }),
        defineField({
            name: 'blogTitle',
            title: 'Blog Section Title',
            type: 'string',
            group: 'sections',
        }),
        defineField({
            name: 'equipmentTitle',
            title: 'Equipment Section Title',
            type: 'string',
            group: 'sections',
        }),
    ],
})
