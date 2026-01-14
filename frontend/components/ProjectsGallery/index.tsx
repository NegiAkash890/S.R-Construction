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
                <div className={`${styles.imgWrapper} ${styles.cardWrapper}`}>
                  <Image
                    src={urlFor(item.image).width(800).height(600).url()}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.projectImage}
                  />

                  {/* Using a custom class for the overlay to override/extend defaults */}
                  <div className={styles.projectOverlay}>
                    <h3 className={styles.projectTitle}>{item.title}</h3>
                    <span className={styles.projectCategory}>{item.category}</span>

                    <div className={styles.metaGrid}>
                      {item.clientName && (
                          <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>Client:</span>
                            <span>{item.clientName}</span>
                          </div>
                                            )}
                      {item.location && (
                          <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>Location:</span>
                            <span>{item.location}</span>
                          </div>
                                            )}
                      {(item.startDate || item.endDate) && (
                          <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>Date:</span>
                            <span>
                                  {item.startDate ? new Date(item.startDate).getFullYear() : ''}
                                  {item.endDate ? ` - ${new Date(item.endDate).getFullYear()}` : item.startDate ? ' - Present' : ''}
                                </span>
                          </div>
                                            )}
                    </div>

                    {item.status && (
                    <span className={styles.projectStatusBadge}>
                          {item.status}
                        </span>
                                        )}
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
