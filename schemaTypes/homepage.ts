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
        { name: 'safety', title: 'Safety Section' },
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
        defineField({
            name: 'industriesDescription',
            title: 'Industries Section Description',
            type: 'text',
            group: 'industries',
            initialValue: 'Powering progress across the energy spectrum — from hydrocarbons and offshore wind to clean energy and carbon solutions. L&T Energy delivers end-to-end EPC and technology-driven solutions that enable global energy transition with efficiency, reliability, and sustainability at the core.',
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
        defineField({
            name: 'processSteps',
            title: 'Process Steps',
            type: 'array',
            group: 'process',
            of: [{
                type: 'object',
                fields: [
                    { name: 'number', type: 'string', title: 'Step Number (e.g. 01)' },
                    { name: 'title', type: 'string', title: 'Step Title' },
                    { name: 'description', type: 'text', title: 'Description' },
                ]
            }]
        }),

        // --- Safety & Certifications ---
        defineField({
            name: 'safetyTitle',
            title: 'Safety Section Title',
            type: 'string',
            group: 'safety',
            initialValue: 'Safety & Standards',
        }),
        defineField({
            name: 'safetySubheading',
            title: 'Safety Subheading',
            type: 'string',
            group: 'safety',
            initialValue: 'Commitment to excellence and zero-compromise safety.',
        }),
        defineField({
            name: 'safetyCertifications',
            title: 'Certifications',
            type: 'array',
            group: 'safety',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', type: 'string', title: 'Certification Title' },
                    { name: 'description', type: 'string', title: 'Brief Description' },
                    { name: 'iconName', type: 'string', title: 'Icon Name (e.g. award, shield, hat, leaf)' },
                ]
            }]
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
