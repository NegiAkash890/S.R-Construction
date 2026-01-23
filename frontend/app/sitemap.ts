import { MetadataRoute } from 'next';
import { client } from '@/utils/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.studio-sr-construction.com';

    // Static routes
    const routes = [
        '',
        '/projects',
        '/team',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Fetch dynamic routes
    const [posts, industries, pages] = await Promise.all([
        client.fetch(`*[_type == "blog"] { "slug": slug.current, _updatedAt }`),
        client.fetch(`*[_type == "industry"] { "slug": slug.current, _updatedAt }`),
        client.fetch(`*[_type == "page"] { "slug": slug.current, _updatedAt }`)
    ]);

    const postRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const industryRoutes = industries.map((industry: any) => ({
        url: `${baseUrl}/industries/${industry.slug}`,
        lastModified: new Date(industry._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const genericPageRoutes = pages.map((page: any) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        ...routes,
        ...postRoutes,
        ...industryRoutes,
        ...genericPageRoutes,
    ];
}
