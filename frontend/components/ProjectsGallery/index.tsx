"use client";

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from "@/utils/sanity/client";
import styles from './ProjectsGallery.module.css';
import ProjectModal from '../ProjectModal';

interface Props {
  data: any[];
}

export default function ProjectsGallery({ data }: Props) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const filteredData = data.filter((item) => {
    if (filter === 'all') return true;

    // Normalize status
    const status = item.status?.toLowerCase() || '';

    if (filter === 'completed') {
      return status === 'completed';
    }

    if (filter === 'ongoing') {
      // Treat various "active" states as ongoing
      return status === 'ongoing' || status === 'in-progress' || status === 'in progress';
    }

    return false;
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
            <div
              key={item._id}
              className={styles.galleryItem}
              onClick={() => setSelectedProject(item)}
            >
              {item.image && (
                <div className={styles.cardInner}>
                  <div className={styles.imageWrapper}>
                    {/* Prefer Client Logo as Main Visual if available (for logo-centric cards) */}
                    {item.client?.logo ? (
                      <div className={styles.logoMainWrapper}>
                        <Image
                          src={urlFor(item.client.logo).url()}
                          alt={item.client.name || item.title}
                          fill
                          className={styles.projectLogoMain}
                        />
                      </div>
                    ) : (
                      item.image && (
                        <Image
                          src={urlFor(item.image).url()}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={styles.projectImage}
                        />
                      )
                    )}
                  </div>

                  {/* Brief Info Content */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.projectTitle}>{item.title}</h3>
                    {/* Location and Timeline hidden on outer card as requested */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>No projects found for this category.</p>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
