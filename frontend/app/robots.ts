import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/studio/', // Disallow Sanity Studio route if it's hosted on same domain
        },
        sitemap: 'https://www.studio-sr-construction.com/sitemap.xml',
    };
}
