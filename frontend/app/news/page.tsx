import { client } from '@/utils/sanity/client';
import NewsFeed from '@/components/NewsFeed';

export const revalidate = 60; // Revalidate every minute

async function getData() {
    const posts = await client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      industry->{
        _id,
        title,
        slug
      }
    }
  `);

    const industries = await client.fetch(`
    *[_type == "industry"] | order(title asc) {
      _id,
      title,
      slug
    }
  `);

    return { posts, industries };
}

export const metadata = {
    title: 'News & Stories | S.R. Construction',
    description: 'Latest updates, project highlights, and news from S.R. Construction.',
};

export default async function NewsPage() {
    const { posts, industries } = await getData();

    return (
        <main>
            {/* Simple Hero */}
            <div style={{
                padding: '8rem 0 4rem',
                background: 'var(--slate-900)',
                color: 'white',
                marginBottom: '0'
            }}>
                <div className="container">
                    <span style={{
                        color: 'var(--primary-color)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                        display: 'block'
                    }}>
                        Updates & Insights
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: 0, textTransform: 'capitalize' }}>News Headline</h1>
                </div>
            </div>

            <div style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <NewsFeed initialPosts={posts} industries={industries} />
                </div>
            </div>
        </main>
    );
}
