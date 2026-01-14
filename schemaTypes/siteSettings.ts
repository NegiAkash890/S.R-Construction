import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'logo',
            title: 'Logo Text/Image',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'tagline',
            title: 'Footer Tagline',
            type: 'text',
        }),
        defineField({
            name: 'copyright',
            title: 'Copyright Text',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'platform', type: 'string' },
                    { name: 'url', type: 'url' }
                ]
            }]
        })
    ],
})
