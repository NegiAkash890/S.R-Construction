import { client, urlFor } from '@/utils/sanity/client';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import ShareButton from '@/components/ShareButton';
import styles from './page.module.css';

export const revalidate = 60;

export async function generateStaticParams() {
    const posts = await client.fetch(`*[_type == "blog"]{ "slug": slug.current }`);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

async function getPostData(slug: string) {
    const post = await client.fetch(
        `*[_type == "blog" && slug.current == $slug][0]`,
        { slug }
    );
    return post;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/#blog">News</Link>
                <span>/</span>
                <span className={styles.currentCrumb}>{post.title}</span>
            </div>

            <article className={styles.article}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.date}>
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </span>
                        <span className={styles.location}> | Mumbai</span> {/* Placeholder or add location to schema */}
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.shareSection}>
                        <ShareButton title={post.title} />
                    </div>
                </header>

                {post.mainImage && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className={styles.mainImage}
                        />
                    </div>
                )}

                <div className={styles.content}>
                    <PortableText value={post.body} />
                </div>
            </article>
        </main>
    );
}
