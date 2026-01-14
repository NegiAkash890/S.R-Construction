"use client";

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from "@/utils/sanity/client";
import styles from './ProjectsGallery.module.css';

interface Props {
  data: any[];
}

export default function ProjectsGallery({ data }: Props) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');

  const filteredData = data.filter((item) => {
    if (filter === 'all') return true;
    // Handle cases where projectStatus might be undefined by treating them as completed or filtering them out depending on preference.
    // Here we'll assume undefined = completed for backward compatibility or just check strict match
    return item.status === filter;
  });

  return (
    <section className={styles.gallerySection}>
      <div className="container">

        <div className={styles.filterContainer}>
          <button
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'ongoing' ? styles.active : ''}`}
            onClick={() => setFilter('ongoing')}
          >
            Ongoing
          </button>
        </div>

        <div className={styles.galleryGrid}>
          {filteredData.map((item) => (
            <div key={item._id} className={styles.galleryItem}>
              {item.image && (
                <div className={styles.cardInner}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={urlFor(item.image).width(800).height(600).url()}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.projectImage}
                    />
                    {item.status && (
                      <span className={`${styles.statusBadge} ${styles[item.status.toLowerCase()]}`}>
                        {item.status}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <span className={styles.projectCategory}>{item.category}</span>
                    <h3 className={styles.projectTitle}>{item.title}</h3>

                    <div className={styles.metaInfo}>
                      {item.location && (
                        <span className={styles.metaItem}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          {item.location}
                        </span>
                      )}
                      {(item.startDate || item.endDate) && (
                        <span className={styles.metaItem}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {item.startDate ? new Date(item.startDate).getFullYear() : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>No projects found for this category.</p>
        )}

      </div>
    </section>
  );
}
