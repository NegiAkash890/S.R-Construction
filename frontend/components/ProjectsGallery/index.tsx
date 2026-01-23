"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { urlFor } from "@/utils/sanity/client";
import { BsArrowUpRight } from 'react-icons/bs';
import styles from './ProjectsGallery.module.css';
import ProjectModal from '../ProjectModal';

interface Props {
  data: any[];
}

export default function ProjectsGallery({ data }: Props) {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<'date' | 'client' | 'value'>('date'); // New Sort State
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('projectId');

  useEffect(() => {
    if (projectId && data) {
      const foundProject = data.find(p => p._id === projectId);
      if (foundProject) {
        setSelectedProject(foundProject);
      }
    } else {
      setSelectedProject(null);
    }
  }, [projectId, data]);

  const handleProjectClick = (project: any) => {
    router.push(`/projects?projectId=${project._id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    router.push('/projects', { scroll: false });
    setSelectedProject(null);
  };

  // 1. Filter Data
  const filteredData = data.filter((item) => {
    if (filter === 'all') return true;
    const status = item.status?.toLowerCase() || '';

    // Status filters
    if (filter === 'completed') return status === 'completed';
    if (filter === 'ongoing') return status === 'ongoing' || status === 'in-progress' || status === 'in progress';

    // Industry filters
    if (item.industry?.slug?.current === filter) return true;

    return false;
  });

  // 2. Sort Data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === 'client') {
      return (a.clientName || '').localeCompare(b.clientName || '');
    }
    if (sort === 'value') {
      return (b.workValue || 0) - (a.workValue || 0); // Descending Value
    }
    // Default: Date (Newest First)
    const dateA = new Date(a.endDate || a.startDate || 0).getTime();
    const dateB = new Date(b.endDate || b.startDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <section className={styles.gallerySection}>
      <div className="container">

        {/* Control Bar: Filter & Sort */}
        <div className={styles.controlBar}>

          {/* Filter Buttons (Expanded) */}
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'ongoing' ? styles.active : ''}`}
              onClick={() => setFilter('ongoing')}
            >
              Ongoing
            </button>
            <div className={styles.divider} style={{ width: '1px', background: 'var(--slate-300)', margin: '0 0.5rem' }} />
            <button
              className={`${styles.filterBtn} ${filter === 'power-energy' ? styles.active : ''}`}
              onClick={() => setFilter('power-energy')}
            >
              Power
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'oil-gas' ? styles.active : ''}`}
              onClick={() => setFilter('oil-gas')}
            >
              Oil & Gas
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'fertilizers-chemicals' ? styles.active : ''}`}
              onClick={() => setFilter('fertilizers-chemicals')}
            >
              Fertilizers
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'steel-metals' ? styles.active : ''}`}
              onClick={() => setFilter('steel-metals')}
            >
              Steel
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'other-infrastructure' ? styles.active : ''}`}
              onClick={() => setFilter('other-infrastructure')}
            >
              Other Infra
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel}>Sort By:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className={styles.selectInput}
            >
              <option value="date">Newest First</option>
              <option value="client">Client Name (A-Z)</option>
              <option value="value">Project Value (High-Low)</option>
            </select>
          </div>
        </div>

        <div className={styles.galleryGrid}>
          {sortedData.map((item) => {
            const displayImageUrl = item.gallery?.[0]
              ? urlFor(item.gallery[0]).url()
              : (item.image ? urlFor(item.image).url() : null);

            return (
              <div
                key={item._id}
                className={styles.galleryItem}
                onClick={() => handleProjectClick(item)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.imageWrapper}>
                    {displayImageUrl ? (
                      <Image
                        src={displayImageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.projectImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3 }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                          <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.textWrapper}>
                      <span className={styles.clientName}>{item.clientName || 'Client Name'}</span>
                      <h3 className={styles.projectTitle}>{item.title}</h3>
                    </div>
                    <div className={styles.actionIcon}>
                      <BsArrowUpRight />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {
          sortedData.length === 0 && (
            <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>No projects found for this category.</p>
          )
        }

        < ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />

      </div >
    </section >
  );
}
