import { client } from '@/utils/sanity/client';
import Link from 'next/link';
import { FaGlobe, FaIndustry, FaProjectDiagram, FaNewspaper } from 'react-icons/fa';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds

async function getData() {
    return Promise.all([
        client.fetch(`*[_type == "page"] { title, "slug": slug.current } | order(title asc)`),
        client.fetch(`*[_type == "industry"] { title, "slug": slug.current } | order(title asc)`),
        client.fetch(`*[_type == "project"] { title, "id": _id } | order(title asc)`),
        client.fetch(`*[_type == "blog"] { title, "slug": slug.current } | order(publishedAt desc)`),
    ]);
}

export default async function SitemapPage() {
    const [pages, industries, projects, posts] = await getData();

    const staticLinks = [
        { title: 'Home', href: '/' },
        { title: 'About Us', href: '/about-us' },
        { title: 'Projects', href: '/projects' },
        { title: 'Team', href: '/team' },
        { title: 'Equipments', href: '/equipments' },
    ];

    return (
        <main className={styles.main}>
            <div className="container">
                <h1 className={styles.title}>Sitemap</h1>
                <p className={styles.subtitle}>Overview of our website content and structure</p>

                <div className={styles.grid}>
                    {/* Main Pages */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaGlobe /> Main Pages
                        </h2>
                        <ul className={styles.linkList}>
                            {staticLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href}>{link.title}</Link>
                                </li>
                            ))}
                            {/* Generic Custom Pages */}
                            {pages.map((page: any) => (
                                <li key={page.slug}>
                                    <Link href={`/${page.slug}`}>{page.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Industries */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaIndustry /> Industries
                        </h2>
                        <ul className={styles.linkList}>
                            {industries.map((industry: any) => (
                                <li key={industry.slug}>
                                    <Link href={`/industries/${industry.slug}`}>{industry.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Projects */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaProjectDiagram /> Featured Projects
                        </h2>
                        <ul className={styles.linkList}>
                            {projects.map((project: any) => (
                                <li key={project.id}>
                                    <Link href={`/projects?projectId=${project.id}`}>{project.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* News & Blog */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <FaNewspaper /> News & Insights
                        </h2>
                        <ul className={styles.linkList}>
                            {posts.map((post: any) => (
                                <li key={post.slug}>
                                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
