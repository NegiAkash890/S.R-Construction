// Actually, generic page can be server component.

import { client, urlFor } from '@/utils/sanity/client';
import { PAGE_QUERY } from '@/utils/sanity/queries';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await client.fetch(PAGE_QUERY, { slug });

    if (!page) {
        notFound();
    }

    return (
      <main className={styles.main}>
        {/* Hero Section */}
        {page.heroType === 'image' && page.heroImage && (
        <div className={styles.heroImageContainer}>
          <Image
            src={urlFor(page.heroImage).url()}
            alt={page.heroHeading || page.title}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroHeading}>{page.heroHeading || page.title}</h1>
          </div>
        </div>
            )}

        {page.heroType === 'color' && (
        <div
          className={styles.heroColorContainer}
          style={{ backgroundColor: page.heroColor || '#333' }}
        >
          <h1 className={styles.heroHeading}>{page.heroHeading || page.title}</h1>
        </div>
            )}

        <div className={`container ${styles.container}`}>
          {/* Back Button */}
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>

          {/* Content */}
          <div className={styles.content}>
            {page.content && <PortableText value={page.content} />}
          </div>
        </div>
      </main>
    );
}
