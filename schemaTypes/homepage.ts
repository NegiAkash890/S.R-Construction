import { defineField, defineType } from 'sanity'

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'clients', title: 'Clients Section' },
        { name: 'industries', title: 'Industries Section' },
        { name: 'projects', title: 'Projects Section' },
        { name: 'equipment', title: 'Equipment Section' },
        { name: 'process', title: 'Process Section' },
        { name: 'blog', title: 'Blog Section' },
        { name: 'faq', title: 'FAQ Section' },
        { name: 'sections', title: 'Legacy / Misc' }, // Keep for safety if needed, though we move fields
    ],
    fields: [
        // --- Hero Section ---
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading (Fallback / Static)',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroPhrases',
            title: 'Hero Typewriter Phrases',
            description: 'Add multiple phrases to cycle through. If empty, uses the Heading above.',
            type: 'array',
            of: [{ type: 'string' }],
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

        // --- Clients Section ---
        defineField({
            name: 'clientsTitle',
            title: 'Clients Section Title',
            type: 'string',
            group: 'clients', // Moved from 'sections'
        }),

        // --- Industries Section ---
        defineField({
            name: 'industriesTitle',
            title: 'Industries Section Title',
            type: 'string',
            group: 'industries',
            initialValue: 'Industries We Serve',
        }),

        // --- Projects Section ---
        defineField({
            name: 'projectsTitle',
            title: 'Projects Section Title',
            type: 'string',
            group: 'projects',
            initialValue: 'Featured Projects',
        }),

        // --- Equipment Section ---
        defineField({
            name: 'equipmentTitle',
            title: 'Equipment Section Title',
            type: 'string',
            group: 'equipment', // Moved from 'sections'
        }),

        // --- Process Section ---
        defineField({
            name: 'processTitle',
            title: 'Process Section Title',
            type: 'string',
            group: 'process',
            initialValue: 'How We Work',
        }),

        // --- Blog Section ---
        defineField({
            name: 'blogTitle',
            title: 'Blog Section Title',
            type: 'string',
            group: 'blog', // Moved from 'sections'
        }),

        // --- FAQ Section ---
        defineField({
            name: 'faqTitle',
            title: 'FAQ Section Title',
            type: 'string',
            group: 'faq',
            initialValue: 'Frequently Asked Questions',
        }),
    ],
})
