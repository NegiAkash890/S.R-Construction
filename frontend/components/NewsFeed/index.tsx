"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from "@/utils/sanity/client";
import { BsArrowRight, BsChevronDown, BsNewspaper } from 'react-icons/bs';
import styles from './NewsFeed.module.css';

interface Industry {
    _id: string;
    title: string;
    slug: { current: string };
}

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    mainImage: any;
    industry?: Industry;
}

interface NewsFeedProps {
    initialPosts: BlogPost[];
    industries: Industry[];
}

type SortOrder = 'recent' | 'oldest' | 'alphabetical';

export default function NewsFeed({ initialPosts, industries }: NewsFeedProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<SortOrder>('recent');

    const filteredAndSortedPosts = useMemo(() => {
        let result = [...initialPosts];

        // Filter by Industry
        if (selectedIndustry !== 'all') {
            result = result.filter(post => post.industry?._id === selectedIndustry);
        }

        // Sort
        result.sort((a, b) => {
            if (sortOrder === 'recent') {
                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            } else if (sortOrder === 'oldest') {
                return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
            } else if (sortOrder === 'alphabetical') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        return result;
    }, [initialPosts, selectedIndustry, sortOrder]);

    return (
        <div>
            {/* Filter Bar */}
            <div className={styles.filterBar}>
                <div className={styles.filterGroup}>
                    <span className={styles.label}>Filter by:</span>
                    <div className={styles.industryList}>
                        <button
                            className={`${styles.filterButton} ${selectedIndustry === 'all' ? styles.active : ''}`}
                            onClick={() => setSelectedIndustry('all')}
                        >
                            All Industries
                        </button>
                        {industries.map((industry) => (
                            <button
                                key={industry._id}
                                className={`${styles.filterButton} ${selectedIndustry === industry._id ? styles.active : ''}`}
                                onClick={() => setSelectedIndustry(industry._id)}
                            >
                                {industry.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <span className={styles.label}>Sort by:</span>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.sortSelect}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                        >
                            <option value="recent">Most Recent</option>
                            <option value="oldest">Oldest First</option>
                            <option value="alphabetical">Alphabetical (A-Z)</option>
                        </select>
                        <BsChevronDown className={styles.selectIcon} />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className={styles.newsGrid}>
                {filteredAndSortedPosts.length > 0 ? (
                    filteredAndSortedPosts.map((post) => (
                        <article key={post._id} className={styles.newsCard}>
                            <div className={styles.cardImageWrapper}>
                                {post.mainImage && (
                                    <Image
                                        src={urlFor(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className={styles.cardImage}
                                    />
                                )}
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.date}>
                                        {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </span>
                                    {post.industry && (
                                        <span className={styles.industryTag}>{post.industry.title}</span>
                                    )}
                                </div>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                                <Link href={`/news/${post.slug.current}`} className={styles.readMore}>
                                    Read Full Story <BsArrowRight className={styles.arrowIcon} />
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <p>No stories found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
