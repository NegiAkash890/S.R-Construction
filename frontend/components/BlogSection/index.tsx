"use client";
import React from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './BlogSection.module.css';

interface Props {
  data: any[];
}

export default function BlogSection({ data }: Props) {
  return (
    <section className={styles.blogSection} id="blog">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {content?.sections?.blog?.title || "News & Featured Stories"}
          </h2>
          <div className={styles.navArrows}>
            <button className={styles.arrowBtn}>&lt;</button>
            <button className={styles.arrowBtn}>&gt;</button>
          </div>
        </div>
        <div className={styles.blogGrid}>
          {data?.map((post) => (
            <article key={post._id} className={styles.blogCard}>
              <div className={styles.cardBg}>
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(600).height(600).url()}
                    alt={post.title}
                    className={styles.bgImage}
                  />
                )}
                <div className={styles.overlay}></div>
              </div>

              <div className={styles.cardInner}>
                <span className={styles.tag}>Press Release</span>

                <div className={styles.bottomContent}>
                  <span className={styles.date}>
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className={styles.cardTitle}>{post.title}</h3>

                  <div className={styles.cardActions}>
                    <Link href={`/blog/${post.slug?.current}`} className={styles.actionLink}>
                      Read More <BsArrowRight className={styles.icon} />
                    </Link>
                    <button className={styles.actionLink}>
                      Share <BsArrowRight className={styles.shareIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
