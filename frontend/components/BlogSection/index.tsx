"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { urlFor } from "@/utils/sanity/client";
import LoadingLink from "@/components/LoadingLink";

import styles from './BlogSection.module.css';

interface Props {
  data: any[];
  title?: string;
}

export default function BlogSection({ data, title }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [data]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth / (window.innerWidth < 768 ? 1 : 3);

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.blogSection} id="blog">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {title || "News & Featured Stories"}
          </h2>
          <div className={styles.navArrows}>
            <button
              className={`${styles.arrowBtn} ${!canScrollLeft ? styles.disabled : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            >
              <BsArrowLeft />
            </button>
            <button
              className={`${styles.arrowBtn} ${!canScrollRight ? styles.disabled : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div
          className={styles.sliderContainer}
          ref={scrollRef}
          onScroll={checkScrollButtons}
        >
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
                <div className={styles.overlay} />
              </div>

              <div className={styles.cardInner}>


                <div className={styles.bottomContent}>
                  <span className={styles.date}>
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className={styles.cardTitle}>{post.title}</h3>

                  <div className={styles.cardActions}>
                    <LoadingLink href={`/news/${post.slug?.current}`} className={styles.actionLink}>
                      Read More
                      {' '}
                      <BsArrowRight className={styles.icon} />
                    </LoadingLink>

                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* See More Card */}
          <Link href="/news" className={styles.seeMoreCard}>
            <div className={styles.seeMoreContent}>
              <span className={styles.seeMoreText}>See More<br />Stories</span>
              <div className={styles.seeMoreIconWrapper}>
                <BsArrowRight className={styles.seeMoreIcon} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
